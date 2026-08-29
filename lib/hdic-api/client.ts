// toyjack/hdicviewer-rebuild の公開 API（/api/v1）クライアント。
// エンドポイント・レスポンス形状は同リポジトリの apps/api/src/api-v1/*.ts で定義されている。

const REQUEST_TIMEOUT_MS = 3000; // API 側の締切（2000ms）にネットワーク往復分の余裕を足した値

export interface ApiV1Meta {
  apiVersion: "v1";
  datasetVersions: Record<string, string>;
}

export interface ApiV1Page {
  nextCursor: string | null;
  hasMore: boolean;
  total?: number;
  estimatedTotal?: number;
}

export interface ApiV1Envelope<T> {
  data: T;
  meta: ApiV1Meta;
  links?: Record<string, string>;
}

export interface ApiV1CollectionEnvelope<T> {
  data: T[];
  meta: ApiV1Meta;
  links: Record<string, string>;
  page: ApiV1Page;
}

export interface ApiV1Problem {
  type: string;
  title: string;
  status: number;
  detail?: string;
  instance?: string;
  code: string;
  requestId: string;
  errors?: unknown[];
}

export class HdicApiError extends Error {
  status: number;
  problem: ApiV1Problem;

  constructor(status: number, problem: ApiV1Problem) {
    super(problem.detail ?? problem.title);
    this.name = "HdicApiError";
    this.status = status;
    this.problem = problem;
  }
}

function getBaseUrl(): string {
  const baseUrl = process.env.HDIC_API_BASE_URL;
  if (!baseUrl) {
    throw new Error("HDIC_API_BASE_URL が設定されていません");
  }
  return baseUrl;
}

async function hdicFetch<T>(
  path: string,
  params?: Record<string, string | number | undefined>
): Promise<T> {
  const url = new URL(path, getBaseUrl());
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== "") {
        url.searchParams.set(key, String(value));
      }
    }
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const res = await fetch(url, { signal: controller.signal, cache: "no-store" });
    const rawBody = await res.text();
    let body: unknown;
    try {
      body = JSON.parse(rawBody);
    } catch {
      // API サーバーが落ちている/デプロイ中だと素の "404 Not Found" のような
      // プレーンテキストが返ってくることがある。JSON.parse の解読不能なエラーで
      // 落とすより、原因が API 側にあるとわかる形にして投げる。
      throw new Error(
        `hdicviewer-rebuild API から不正な応答（HTTP ${res.status}）: ${rawBody.slice(0, 200)}`
      );
    }
    if (!res.ok) {
      throw new HdicApiError(res.status, body as ApiV1Problem);
    }
    return body as T;
  } finally {
    clearTimeout(timeout);
  }
}

export interface HdicSearchContext {
  partKey: string | null;
  fieldRole: string;
  text: string;
}

export interface HdicSearchHit {
  datasetId: string;
  recordId: string;
  fieldRoles: string[];
  matchedPartIds: string[];
  context: HdicSearchContext[];
}

export interface HdicSearchParams {
  dataset: string;
  q: string;
  match?: "exact" | "prefix" | "contains";
  // "variants" は現状 TSJ のみ対応（異体字関係で query 文字を展開して検索する）
  characterMode?: "literal" | "variants";
  field?: "all" | "headword" | "definition" | "reading";
  // 以下は TSJ データセット専用のフィルタ（apps/api/src/api-v1/search-routes.ts）
  entryType?: string;
  charCount?: number;
  kanaCount?: number;
  posCategory?: string;
  limit?: number;
  cursor?: string;
}

export function searchHdic(
  params: HdicSearchParams
): Promise<ApiV1CollectionEnvelope<HdicSearchHit>> {
  return hdicFetch("/api/v1/search", {
    dataset: params.dataset,
    q: params.q,
    match: params.match,
    characterMode: params.characterMode,
    field: params.field,
    entryType: params.entryType,
    charCount: params.charCount,
    kanaCount: params.kanaCount,
    posCategory: params.posCategory,
    limit: params.limit,
    cursor: params.cursor,
  });
}

export function getHdicRecord<T = unknown>(
  datasetId: string,
  recordId: string
): Promise<ApiV1Envelope<T>> {
  return hdicFetch(
    `/api/v1/datasets/${encodeURIComponent(datasetId)}/records/${encodeURIComponent(recordId)}`
  );
}
