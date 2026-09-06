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

// TSJ_entries.tsv 由来の字形位置情報。和訓が一件も無い記録（後述 buildNoWakunRow 参照）で
// 「新撰字鏡校注所在」の代替として使う。
export interface TsjPosition {
  partId: string;
  entry: string;
  rinsenLocation: string;
}

export interface TsjRecordContent {
  wakunParts: TsjWakunPart[];
  positions: TsjPosition[];
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
  // true: この記録には和訓行（wakunParts）が一件も無い（例："先" s1202b601）。
  // 元データ（TSJ_wakun.tsv）側にまだ「和訓なし」を示す行が追加されていないため、
  // 見出し語検索でこの記録自体を拾えるよう合成した行であることを示すフラグ。
  hasNoWakun?: boolean;
}

// 和訓が一件も無い記録用の合成行。見出し語（entry_text）検索でだけ使う
// （和訓・万葉仮名・享和本見出しはいずれも wakunParts 側のデータなので、
// 和訓が無い記録はそもそもそれらのフィールドでは検索にヒットしようがない）。
function buildNoWakunRow(record: TsjRecordDetail): TsjWakunResultRow {
  const position = record.content.positions?.[0];
  return {
    tsjId: record.recordId,
    partId: record.recordId,
    wakunId: record.recordId,
    remarks: "",
    charCount: 0,
    charCountRaw: "",
    entryText: record.normalized.headword,
    entryType: "",
    entryTypeRaw: "",
    nikkokuId: "",
    zhangPage: record.content.zhangLeiPage ?? "",
    kanaCharCount: 0,
    kanaCharCountRaw: "",
    kyowaLocation: "",
    kyowaEntryText: "",
    kyowaManyogana: "",
    rinsenLocation: position?.rinsenLocation ?? "",
    partOfSpeechRaw: "",
    partOfSpeechCategory: "",
    nikkokuStatusRaw: "",
    nikkokuStatusCategory: "",
    readingKanaKanji: "",
    definitionManyogana: "",
    readingHistoricalKana: "",
    recordId: record.recordId,
    hasNoWakun: true,
  };
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

// カタカナ→ひらがなの変換（Unicode のカタカナ範囲 U+30A1-U+30F6 を -0x60 シフト）。
// 漢字・記号はそのまま素通りする。
function katakanaToHiragana(text: string): string {
  return text.replace(/[ァ-ヶ]/g, (ch) =>
    String.fromCharCode(ch.charCodeAt(0) - 0x60)
  );
}

// フォールバック時（下記 matchesAnyWakunPart 参照）に、検索対象フィールドの実値で
// クライアント側絞り込みをするためのアクセサ。TEXT_FIELD_PRIORITY の key と対応させる。
// readingKanaKanji は「アケヌ（曉）」のようにカタカナ＋漢字で格納されている一方、
// 検索窓は「平仮名」表記を案内している（結果表示自体はカタカナのまま）。
// ひらがなで入力されたクエリがそのままだと一致しないため、フィールド・クエリの両方を
// ひらがなに正規化してから比較する（カタカナ入力もこれで従来通り一致する）。
const ACTIVE_FIELD_ACCESSOR: Record<
  "entry_text" | "reading_kana_kanji" | "def_manyogana" | "kyowa_entry_text",
  (part: TsjWakunPart) => string
> = {
  entry_text: (part) => part.entryText,
  reading_kana_kanji: (part) => katakanaToHiragana(part.readingKanaKanji),
  def_manyogana: (part) => part.definitionManyogana,
  kyowa_entry_text: (part) => part.kyowaEntryText,
};

export const NO_QUERY_MESSAGE = "検索語を入力してください";

// posCategory の下位区分（TsjWakunForm.tsx 参照）は API に対応するカテゴリがないため、
// "<posCategory>:<sub>" の複合値を「API に渡す posCategory」と「partOfSpeechRaw の部分一致文字列」に分解する。
const POS_SUB_RAW_INCLUDES: Record<string, string> = {
  "noun-phrase": "名詞句",
  "verb-phrase": "動詞句",
  definition: "定義",
};

function parsePosCategoryParam(value: string | undefined): {
  apiPosCategory: string | undefined;
  rawIncludes: string | undefined;
} {
  if (!value) return { apiPosCategory: undefined, rawIncludes: undefined };
  const [base, sub] = value.split(":");
  return { apiPosCategory: base, rawIncludes: sub ? POS_SUB_RAW_INCLUDES[sub] : undefined };
}

// 漢字数・和訓仮名字数のプルダウンは末尾だけ「N以上」の開区間（例："6+"）を許容する。
// 開区間は実データの上限が確認しきれていないための保険であり、API の charCount/kanaCount は
// 完全一致にしか対応していないため、開区間のときは API には渡さずクライアント側で下限判定する。
function parseCountParam(value: string | undefined): {
  apiValue: number | undefined;
  min: number | undefined;
} {
  if (!value) return { apiValue: undefined, min: undefined };
  if (value.endsWith("+")) {
    return { apiValue: undefined, min: Number(value.slice(0, -1)) };
  }
  return { apiValue: Number(value), min: undefined };
}

export async function searchTsjWakun(
  terms: TsjWakunSearchParams
): Promise<{ data: TsjWakunResultRow[] | null; error: Error | null }> {
  const active = TEXT_FIELD_PRIORITY.find(({ key }) => terms[key]);
  if (!active) {
    return { data: null, error: new Error(NO_QUERY_MESSAGE) };
  }

  const { apiPosCategory, rawIncludes } = parsePosCategoryParam(terms.pos_category);
  const charCountFilter = parseCountParam(terms.char_count);
  const kanaCountFilter = parseCountParam(terms.kana_count);
  // 和訓（天治本）の実データはひらがな（readingHistoricalKana）で持っているため、
  // カタカナで入力された場合も検索できるよう API に渡す前にひらがなへ正規化する
  // （API 自体がカタカナ入力ではこのフィールドをヒットさせないことを実測済み）。
  const queryText =
    active.key === "reading_kana_kanji"
      ? katakanaToHiragana(terms[active.key] as string)
      : (terms[active.key] as string);

  try {
    const searchResult = await searchHdic({
      dataset: TSJ_DATASET_ID,
      q: queryText,
      match: "contains",
      characterMode: terms.variant_search === "true" ? "variants" : "literal",
      field: active.field,
      entryType: terms.entry_type,
      posCategory: apiPosCategory,
      charCount: charCountFilter.apiValue,
      kanaCount: kanaCountFilter.apiValue,
      limit: 20,
    });

    const matchedPartIdsByRecord = new Map(
      searchResult.data.map((hit) => [hit.recordId, new Set(hit.matchedPartIds)])
    );
    const recordIds = Array.from(matchedPartIdsByRecord.keys());

    const records = await Promise.all(
      recordIds.map((recordId) => getHdicRecord<TsjRecordDetail>(TSJ_DATASET_ID, recordId))
    );

    const fieldAccessor = ACTIVE_FIELD_ACCESSOR[active.key as keyof typeof ACTIVE_FIELD_ACCESSOR];
    // characterMode: "variants" のときはヒットした実際の文字がクエリ文字列と異なりうるため、
    // 下記のリテラル部分一致フィルタは適用できない（API が variant ヒットの実際の一致文字を
    // part 単位で返してこないため、クライアント側で異体字判定できない・既知の限界）。
    const isLiteralMode = terms.variant_search !== "true";
    // 種別・品詞・字数は wakunParts（和訓行）側のデータなので、和訓が一件も無い記録には
    // そもそも適用しようがない。これらの絞り込みが指定されているときは合成行を出さない。
    const hasWakunPartFilters = Boolean(
      terms.entry_type || terms.pos_category || terms.char_count || terms.kana_count
    );

    const rows: TsjWakunResultRow[] = [];
    for (const { data: record } of records) {
      if (record.content.wakunParts.length === 0) {
        // 和訓が一件も無い記録（例："先" s1202b601）。元データにまだ「和訓なし」の
        // 行が追加されていないため、見出し語検索でだけこの記録自体を合成行として拾う。
        const shouldShowNoWakunRow =
          active.key === "entry_text" &&
          !hasWakunPartFilters &&
          (!isLiteralMode || record.normalized.headword.includes(queryText));
        if (shouldShowNoWakunRow) {
          rows.push(buildNoWakunRow(record));
        }
        continue;
      }
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
        if (rawIncludes && !part.partOfSpeechRaw.includes(rawIncludes)) continue;
        if (charCountFilter.min !== undefined && part.charCount < charCountFilter.min) continue;
        if (kanaCountFilter.min !== undefined && part.kanaCharCount < kanaCountFilter.min) continue;
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
