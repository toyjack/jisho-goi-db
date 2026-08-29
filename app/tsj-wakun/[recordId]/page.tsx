import { getTsjWakun, TsjWakunPart } from "@/db/tsj_wakun";
import BackButton from "@/components/ui/BackButton";

const HDIC_VIEWER_BASE_URL = "https://viewer.hdic.jp/tsj2";
const NIKKOKU_PERSONAL_BASE_URL = "https://japanknowledge.com/psnl/display/?lid=";
const NIKKOKU_LIBRARY_BASE_URL = "https://japanknowledge.com/library/display/?lid=";

// wakunParts の表示順・ラベルは 2026-05-22 打合せ記録の指示どおり
// （倭訓栞ID は非表示、臨川本所在は享和本所在の直上）。
const wakunPartFieldOrder: Array<{ key: keyof TsjWakunPart; label: string }> = [
  { key: "wakunId", label: "ID" },
  { key: "entryText", label: "見出し語（天治本）" },
  { key: "entryTypeRaw", label: "種別（単字/異体字/熟語）" },
  { key: "definitionManyogana", label: "和訓（天治本万葉仮名）" },
  { key: "readingHistoricalKana", label: "和訓語形（かな形）" },
  { key: "readingKanaKanji", label: "読み（かな/漢字）" },
  { key: "kyowaEntryText", label: "見出し語（享和本）" },
  { key: "kyowaManyogana", label: "和訓（享和本万葉仮名）" },
  { key: "rinsenLocation", label: "臨川本所在" },
  { key: "kyowaLocation", label: "享和本所在" },
  { key: "zhangPage", label: "新撰字鏡校注所在" },
  { key: "partOfSpeechRaw", label: "品詞" },
  { key: "charCountRaw", label: "漢字数" },
  { key: "kanaCharCountRaw", label: "和訓仮名字数" },
  { key: "remarks", label: "備考" },
];

async function TsjWakunItemPage({ params }: { params: { recordId: string } }) {
  const { data, error } = await getTsjWakun(params.recordId);

  if (error) {
    return (
      <div className="p-4">
        <BackButton />
        <div className="alert alert-error mt-4">
          <span>データの取得中にエラーが発生しました: {error.message}</span>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-4">
        <BackButton />
        <div className="alert alert-warning mt-4">
          <span>データが見つかりませんでした。</span>
        </div>
      </div>
    );
  }

  const hdicViewerUrl = `${HDIC_VIEWER_BASE_URL}/${data.recordId}`;

  return (
    <div className="p-4">
      <div className="p-2 flex items-center gap-4">
        <BackButton />
        <a
          href={hdicViewerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="link link-hover"
        >
          HDICビューアで見る
        </a>
      </div>

      <h2 className="text-xl font-bold mb-2">見出し語（天治本・字形バリアント込み）</h2>
      <p className="mb-4">{data.normalized.headword}</p>

      {data.normalized.definition && (
        <>
          <h2 className="text-xl font-bold mb-2">定義</h2>
          <p className="mb-4">{data.normalized.definition}</p>
        </>
      )}

      {data.content.wakunParts.map((part) => (
        <div key={part.partId} className="mb-8">
          <h2 className="text-xl font-bold mb-4">和訓データ</h2>

          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>フィールド</th>
                  <th>内容</th>
                </tr>
              </thead>
              <tbody>
                {wakunPartFieldOrder.map(({ key, label }) => (
                  <tr key={key}>
                    <th>{label}</th>
                    <td>{part[key] !== null && part[key] !== "" ? String(part[key]) : "-"}</td>
                  </tr>
                ))}
                <tr>
                  <th>日国用例</th>
                  <td>
                    {part.nikkokuStatusRaw || "-"}
                    {/* 実データでは "listed" "no entry" "✓ゆづ"（✓+読み）等の値が確認できたが、
                        天治本/享和本のどちらの用例かを示す完全なステータス一覧はまだ調査中
                        （docs/TSJ_WAKUN_DEV_PLAN.md の P1 参照）。マッピング確定後に整形表示へ置き換える。 */}
                  </td>
                </tr>
                <tr>
                  <th>日国ID</th>
                  <td>
                    {part.nikkokuId && part.nikkokuId !== "N/A" ? (
                      <div className="flex gap-4">
                        <span>{part.nikkokuId}</span>
                        <a
                          href={`${NIKKOKU_PERSONAL_BASE_URL}${part.nikkokuId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link link-hover"
                        >
                          個人版
                        </a>
                        <a
                          href={`${NIKKOKU_LIBRARY_BASE_URL}${part.nikkokuId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link link-hover"
                        >
                          図書館版
                        </a>
                      </div>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ))}

      {data.content.navigationResources.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">画像</h2>
          <ul className="list-disc list-inside">
            {data.content.navigationResources.map((resource, index) => (
              <li key={index}>
                {resource.volume}：
                <a
                  href={resource.ndlUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link link-hover mr-4"
                >
                  NDL
                </a>
                <a
                  href={resource.nijlUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link link-hover"
                >
                  NIJL
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default TsjWakunItemPage;
