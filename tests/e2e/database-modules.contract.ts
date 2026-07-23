export interface ModuleContract {
  name: string;
  resultsPath: string;
  // 「必ず何らかの結果がヒットする」ことだけを保証するクエリ。
  // 特定の見出し語に依存すると実データの変更でテストが壊れるため、
  // 空文字列の contains マッチ（＝全件ヒット）を基本方針とする。
  knownQuery: Record<string, string>;
  // 「該当なし」を確認するためのクエリで使うフィールド名。
  // モジュールごとに検索対象フィールド名が異なる（entry / entry_text 等）ため、
  // 存在しないフィールド名を渡すと ORM/クライアントによってはエラーになりかねない。
  noResultQueryField: string;
  // 結果一覧の各行（詳細ページへのリンクを含む要素）を指すセレクタ。
  resultRowLinkSelector: string;
  // 詳細ページで「空であってはならない」ことを確認するテキスト（見出し語のラベルなど）。
  detailLabelText: string;
}

export const moduleContracts: ModuleContract[] = [
  {
    name: "Jiruisho",
    resultsPath: "/jiruisho/results",
    knownQuery: { entry: "" },
    noResultQueryField: "entry",
    resultRowLinkSelector: "table tbody tr a[href^='/jiruisho/']",
    detailLabelText: "見出し語",
  },
  {
    name: "Racvyoxv",
    resultsPath: "/racvyoxv/results",
    knownQuery: { entry: "" },
    noResultQueryField: "entry",
    resultRowLinkSelector: "table tbody tr a[href^='/racvyoxv/']",
    detailLabelText: "見出し語",
  },
  {
    name: "Bunmei",
    resultsPath: "/bunmei/results",
    // entry は contains マッチ（db/bunmeibon.ts）なので空文字列で全件ヒット。
    knownQuery: { entry: "" },
    noResultQueryField: "entry",
    resultRowLinkSelector: "table tbody tr a[href^='/bunmei/']",
    // 詳細ページで「見出し語」ラベルはコメントアウトされている（app/bunmei/[id]/page.tsx:9）。
    // ページ共通の見出しである「テキストデータ」で代用する。
    detailLabelText: "テキストデータ",
  },
  {
    name: "Gyokuhentaizen",
    resultsPath: "/gyokuhentaizen/results",
    // 注意：entry は完全一致（db/gyokuhentaizen.ts:36 `entry: query.entry`）。
    // 空文字列を渡すと `entry: ""` の完全一致になり0件になり得るため、
    // クエリ自体を付けない（＝undefined のまま）ことで「絞り込みなし」を意味させる。
    knownQuery: {},
    noResultQueryField: "entry",
    resultRowLinkSelector: "table tbody tr a[href^='/gyokuhentaizen/']",
    // このモジュールでは見出し字のラベルが「見出し語」ではなく「掲出字」（app/gyokuhentaizen/[id]/page.tsx:49）。
    detailLabelText: "掲出字",
  },
  {
    name: "Hzwm",
    resultsPath: "/hzwm/results",
    knownQuery: { entry: "" },
    noResultQueryField: "entry",
    resultRowLinkSelector: "table tbody tr a[href^='/hzwm/']",
    // このモジュールのラベルは「見出し語」ではなく「見出し」（app/hzwm/[id]/page.tsx:25）。
    detailLabelText: "見出し",
  },
  {
    name: "Kwrs",
    resultsPath: "/kwrs/results",
    knownQuery: { entry: "" },
    noResultQueryField: "entry",
    resultRowLinkSelector: "table tbody tr a[href^='/kwrs/']",
    detailLabelText: "見出し語",
  },
  {
    name: "Wakunnoshiori",
    resultsPath: "/wakunnoshiori/results",
    knownQuery: { entry: "" },
    noResultQueryField: "entry",
    resultRowLinkSelector: "table tbody tr a[href^='/wakunnoshiori/']",
    detailLabelText: "見出し語",
  },
  {
    name: "TsjWakun",
    resultsPath: "/tsj-wakun/results",
    // 唯一 Prisma を経由せず Supabase client を直接使うモジュール（db/tsj_wakun.ts）。
    // 空文字列は searchTsjWakun 内で「値なし」として無視されるため、
    // 他の contains 系モジュールと同様に空文字列で全件ヒットになる。
    // 検索対象フィールドは entry ではなく entry_text。
    knownQuery: { entry_text: "" },
    // searchTsjWakun は Supabase の .ilike(key, ...) を使うため、
    // 存在しない列名を渡すとエラーになる。他モジュールと違い entry ではなく
    // 実在する列名 entry_text を使う必要がある。
    noResultQueryField: "entry_text",
    resultRowLinkSelector: "table tbody tr a[href^='/tsj-wakun/']",
    detailLabelText: "見出し語",
  },
];
