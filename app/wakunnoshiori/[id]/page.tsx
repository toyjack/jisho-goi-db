import Link from "next/link";
import BackButton from "@/components/common/BackButton";
import WakunoshioriImageTabs from "@/components/wakunnoshiori/ImageTabs";

interface Defination {
  id: number;
  defination: string;
  index: number;
  entry_id: number;
}

async function getData(id: string) {
  const url = `${process.env.API_ROOT}/api/wakunnoshiori/${id}`;

  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("データが見つかりませんでした。");
  }

  return res.json();
}
const tableHeader = [
  { label: "見出し語", field: "entry", type: "text" },
  { label: "語釈", field: "definations", type: "text_array" },
  { label: "NDLリンク", field: "ndl_url", type: "button" },
  // { label: "日国", field: "nikkoku", type: "text" },
  { label: "所在", field: "page", type: "text" },
  { label: "行数", field: "location", type: "text" },
];

function handleDefination(definations: any) {
  if (typeof definations === "string" || definations instanceof String) return definations;
    return definations.map((defination: any) => defination.defination).join("");
}

const CellBlock = ({
  label,
  value,
  type,
  url,
}: {
  label: string;
  value: string | Defination[];
  type: string;
  url?: string;
}) => {
  if (type === "button" && value && typeof value === "string") {
    return (
      <Link href={value || ""} target="_blank" className="btn btn-primary">
        {label}
      </Link>
    );
  }
  if (type === "text_array" && Array.isArray(value)) {
    const text = value.map((v) => v.defination).join("");
    return <>{text}</>;
  }
  if (url) return <Link href={url}>{value as string}</Link>;
  return <>{value}</>;
};

export default async function WakunnoshioriItemPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const result = await getData(id);

  return (
    <div className="p-4">
      <div className="p-2">
        <BackButton />
      </div>

      <h2 className="text-xl font-bold">テキストデータ</h2>

      <div className="overflow-x-auto">
        <table className="table table-compact w-full">
          <thead>
            <tr>
              <th>フィールド</th>
              <th>内容</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>辞書内ID（仮）</th>
              <td>{result.id}</td>
            </tr>
            {tableHeader.map((header, index) => (
              <tr key={index}>
                <th>{header.label}</th>
                <td className="whitespace-normal">
                  <CellBlock
                    label={header.label}
                    value={result[header.field]}
                    type={header.type}
                  />
                  {/* {handleDefination(result[header.field])} */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="divider py-4"></div>

      <h2 className="text-xl font-bold">画像</h2>
      <WakunoshioriImageTabs location={result.page} ndl_url={result.ndl_url}/>
     
      {/* */}
    </div>
  );
}
