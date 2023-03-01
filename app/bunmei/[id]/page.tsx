import IiifViewer from "@/components/iiif/Viewer";
import BackButton from "@/components/ui/BackButton";
import Link from "next/link";

async function getData(id: string) {
  const url = `${process.env.API_ROOT}/api/bunmeibon/${id}`;

  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("データが見つかりませんでした。");
  }

  return res.json();
}

const tableHeader = [
  // { label: "ID", field: "bunmei_id", type: "text" },
  { label: "語頭記号", field: "gotou", type: "text" },
  // { label: "見出し語", field: "entry", type: "text" },
  { label: "見出し語原表記", field: "entry_original", type: "text" },
  // { label: "語形", field: "gokei", type: "text" },
  { label: "語形原表記", field: "gokei_original", type: "text" },
  { label: "声点", field: "shouten_original", type: "text" },
  { label: "左傍訓", field: "left_kun_original", type: "text" },
  { label: "注", field: "defination", type: "text" },
  { label: "項目種別", field: "item_type", type: "text" },
  { label: "部", field: "bu", type: "text" },
  { label: "門", field: "mon", type: "text" },
  { label: "影印本番号", field: "page", type: "text" },
  { label: "行数", field: "line", type: "text" },
  { label: "NDLリンク", field: "ndl_link", type: "button" },
  // { label: "備考", field: "remark", type: "text" },
];

async function BunmeiItemPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const result = await getData(id);

  const [_,__,___,____,ndlId,_____,canvasNum] = result.ndl_link.split('/')
  const manifestUrl = `https://dl.ndl.go.jp/api/iiif/${ndlId}/manifest.json`;

  const CellBlock = ({
    label,
    value,
    type,
  }: {
    label: string;
    value: string;
    type: string;
  }) => {
    if (type === "button" && value) {
      return (
        <Link href={value || ""} target="_blank" className="btn btn-primary">
          {label}
        </Link>
      );
    }
    return <>{value}</>;
  };

  return (
    <div className="p-4">
      <div className="p-2">
        <BackButton />
      </div>

      <h2 className="text-xl font-bold">テキストデータ</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>フィールド</th>
              <th>内容</th>
            </tr>
          </thead>
          <tbody>
            {tableHeader.map((header) => (
              <tr key={header.field}>
                <th>{header.label}</th>
                <td className="whitespace-normal">
                  <CellBlock
                    label={header.label}
                    value={result[header.field]}
                    type={header.type}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-xl font-bold py-4">画像データ</h2>

      <div className="overflow-x-auto">
        <IiifViewer manifestUrl={manifestUrl} page={Number(canvasNum)-1} />
      </div>
    </div>
  );
}

export default BunmeiItemPage;
