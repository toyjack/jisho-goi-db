export interface ModuleContract {
  name: string;
  resultsPath: string;
  // 「必ず何らかの結果がヒットする」ことだけを保証するクエリ。
  // 特定の見出し語に依存すると実データの変更でテストが壊れるため、
  // 空文字列の contains マッチ（＝全件ヒット）を基本方針とする。
  knownQuery: Record<string, string>;
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
    resultRowLinkSelector: "table tbody tr a[href^='/jiruisho/']",
    detailLabelText: "見出し語",
  },
  {
    name: "Racvyoxv",
    resultsPath: "/racvyoxv/results",
    knownQuery: { entry: "" },
    resultRowLinkSelector: "table tbody tr a[href^='/racvyoxv/']",
    detailLabelText: "見出し語",
  },
];
