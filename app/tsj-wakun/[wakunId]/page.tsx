import { getTsjWakun } from "@/db/tsj_wakun";
import BackButton from "@/components/ui/BackButton";

const fieldLabels: { [key: string]: string } = {
  sj_w_id: "ID",
  entry_text: "見出し語",
  entry_type: "見出し種別",
  reading_kana_kanji: "読み（かな/漢字）",
  reading_historical_kana: "読み（歴史的仮名）",
  def_manyogana: "万葉仮名定義",
  kyowa_entry_text: "享和本見出し",
  kyowa_manyogana: "享和本万葉仮名",
  kyowa_loc: "享和本所在",
  rinsen_loc: "臨川本所在",
  zhang_page: "張ページ",
  tsj_id: "倭訓栞ID",
  nikkoku_id: "日国ID",
  nikkoku_example_check: "日国例チェック",
  remarks: "備考",
};

async function TsjWakunItemPage({ params }: { params: { wakunId: string } }) {
  const { data, error } = await getTsjWakun(params.wakunId);

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

  return (
    <div className="p-4">
      <div className="p-2">
        <BackButton />
      </div>

      <h2 className="text-xl font-bold mb-4">テキストデータ</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>フィールド</th>
              <th>内容</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(data).map(([key, value]) => (
              <tr key={key}>
                <th>{fieldLabels[key] || key}</th>
                <td>{value !== null ? String(value) : "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TsjWakunItemPage;
