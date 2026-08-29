import { getHdicRecord, searchHdic, HdicApiError } from "@/lib/hdic-api/client";

const TSJ_DATASET_ID = "tsj";

// hdicviewer-rebuild の TSJ_wakun.tsv 由来。1条目（recordId）に 0〜N 件ぶら下がる。
export interface TsjWakunPart {
  tsjId: string;
  partId: string;
  wakunId: string;
  remarks: string;
  charCount: number;
  charCountRaw: string;
  entryText: string;
  entryType: string;
  entryTypeRaw: string;
  nikkokuId: string;
  zhangPage: string;
  kanaCharCount: number;
  kanaCharCountRaw: string;
  kyowaLocation: string;
  kyowaEntryText: string;
  kyowaManyogana: string;
  rinsenLocation: string;
  partOfSpeechRaw: string;
  partOfSpeechCategory: string;
  nikkokuStatusRaw: string;
  nikkokuStatusCategory: string;
  readingKanaKanji: string;
  definitionManyogana: string;
  readingHistoricalKana: string;
}

export interface TsjNavigationResource {
  volume: string;
  rinsenPage: string;
  volumeLeaf: string;
  ndlUrl: string;
  nijlUrl: string;
}

export interface TsjRecordNormalized {
  headword: string;
  definition: string;
  reading: string[];
}

export interface TsjRecordContent {
  wakunParts: TsjWakunPart[];
  zhangLeiPage: string;
  definitionRemarks: string;
  navigationResources: TsjNavigationResource[];
}

export interface TsjRecordDetail {
  datasetId: string;
  recordId: string;
  normalized: TsjRecordNormalized;
  content: TsjRecordContent;
}

export interface TsjWakunSearchParams {
  entry_text?: string;
  reading_kana_kanji?: string;
  def_manyogana?: string;
  kyowa_entry_text?: string;
  entry_type?: string;
  pos_category?: string;
  char_count?: string;
  kana_count?: string;
  // チェックボックスの値。react-hook-form + URLSearchParams を経由すると文字列 "true" になる
  variant_search?: string;
}

export interface TsjWakunResultRow extends TsjWakunPart {
  recordId: string;
}

// hdicviewer-rebuild の /api/v1/search は q が必須で、複数フィールドの AND 検索に対応していない
// （db/tsj_wakun.ts が Supabase 直結だった頃は4つの検索欄をそれぞれ ilike で AND していた）。
// そのため入力された最初の1欄だけを実クエリとして送る。
const TEXT_FIELD_PRIORITY: Array<{
  key: keyof TsjWakunSearchParams;
  field: "headword" | "reading" | "all";
}> = [
  { key: "entry_text", field: "headword" },
  { key: "reading_kana_kanji", field: "reading" },
  { key: "def_manyogana", field: "all" },
  { key: "kyowa_entry_text", field: "all" },
];

// フォールバック時（下記 matchesAnyWakunPart 参照）に、検索対象フィールドの実値で
// クライアント側絞り込みをするためのアクセサ。TEXT_FIELD_PRIORITY の key と対応させる。
const ACTIVE_FIELD_ACCESSOR: Record<
  "entry_text" | "reading_kana_kanji" | "def_manyogana" | "kyowa_entry_text",
  (part: TsjWakunPart) => string
> = {
  entry_text: (part) => part.entryText,
  reading_kana_kanji: (part) => part.readingKanaKanji,
  def_manyogana: (part) => part.definitionManyogana,
  kyowa_entry_text: (part) => part.kyowaEntryText,
};

export const NO_QUERY_MESSAGE = "検索語を入力してください";

export async function searchTsjWakun(
  terms: TsjWakunSearchParams
): Promise<{ data: TsjWakunResultRow[] | null; error: Error | null }> {
  const active = TEXT_FIELD_PRIORITY.find(({ key }) => terms[key]);
  if (!active) {
    return { data: null, error: new Error(NO_QUERY_MESSAGE) };
  }

  try {
    const searchResult = await searchHdic({
      dataset: TSJ_DATASET_ID,
      q: terms[active.key] as string,
      match: "contains",
      characterMode: terms.variant_search === "true" ? "variants" : "literal",
      field: active.field,
      entryType: terms.entry_type,
      posCategory: terms.pos_category,
      charCount: terms.char_count ? Number(terms.char_count) : undefined,
      kanaCount: terms.kana_count ? Number(terms.kana_count) : undefined,
      limit: 20,
    });

    const matchedPartIdsByRecord = new Map(
      searchResult.data.map((hit) => [hit.recordId, new Set(hit.matchedPartIds)])
    );
    const recordIds = Array.from(matchedPartIdsByRecord.keys());

    const records = await Promise.all(
      recordIds.map((recordId) => getHdicRecord<TsjRecordDetail>(TSJ_DATASET_ID, recordId))
    );

    const queryText = terms[active.key] as string;
    const fieldAccessor = ACTIVE_FIELD_ACCESSOR[active.key as keyof typeof ACTIVE_FIELD_ACCESSOR];
    // characterMode: "variants" のときはヒットした実際の文字がクエリ文字列と異なりうるため、
    // 下記のリテラル部分一致フィルタは適用できない（API が variant ヒットの実際の一致文字を
    // part 単位で返してこないため、クライアント側で異体字判定できない・既知の限界）。
    const isLiteralMode = terms.variant_search !== "true";

    const rows: TsjWakunResultRow[] = [];
    for (const { data: record } of records) {
      const matchedIds = matchedPartIdsByRecord.get(record.recordId);
      // matchedPartIds は record 単位のヒットを wakunParts[] の partId に紐付けようとするが、
      // その紐付けは信頼できない：kyowa_entry_text/def_manyogana は API に専用の field 指定が
      // なく field=all で投げているため、record 直下の注釈・校異コメント（definitionRemarks
      // 相当、和訓行とは無関係な漢文注記）がヒットしても、たまたま record に紐づく wakunPart の
      // partId が matchedPartIds に紛れ込むことがある（実例：s0207a602 を「乱」で検索すると、
      // 校異注記の「攪乱」に反応して sj_w00445 が matchedPartIds に入るが、その行の実際の
      // kyowaEntryText は「乱」を含まない）。ID が一致しても、検索対象フィールドの実値に
      // クエリ文字列が含まれない行は結果に含めない。以前はここを ID 一致のみで判定し、
      // ID が一切一致しない場合は「全件表示」にフォールバックしていたため、クエリと無関係な
      // 同一レコード内の他の和訓行まで大量に混ざり込んでいた（実際に報告されたバグ）。
      const matchesAnyWakunPart =
        matchedIds && record.content.wakunParts.some((part) => matchedIds.has(part.partId));
      for (const part of record.content.wakunParts) {
        const idMatches = !matchesAnyWakunPart || matchedIds!.has(part.partId);
        if (!idMatches) continue;
        if (isLiteralMode && !fieldAccessor(part).includes(queryText)) continue;
        rows.push({ ...part, recordId: record.recordId });
      }
    }

    return { data: rows, error: null };
  } catch (err) {
    if (err instanceof HdicApiError) {
      return { data: null, error: new Error(err.problem.detail ?? err.problem.title) };
    }
    return { data: null, error: err as Error };
  }
}

export async function getTsjWakun(
  recordId: string
): Promise<{ data: TsjRecordDetail | null; error: Error | null }> {
  try {
    const { data } = await getHdicRecord<TsjRecordDetail>(TSJ_DATASET_ID, recordId);
    return { data, error: null };
  } catch (err) {
    if (err instanceof HdicApiError) {
      if (err.status === 404) {
        return { data: null, error: null };
      }
      return { data: null, error: new Error(err.problem.detail ?? err.problem.title) };
    }
    return { data: null, error: err as Error };
  }
}
