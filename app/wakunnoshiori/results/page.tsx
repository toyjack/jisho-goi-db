import Link from "next/link";
import {wakunnoshioriFindMany} from '@/db/wakunnosiori'
interface Defination {
  id: number;
  defination: string;
  index: number;
  entry_id: number;
}

const tableHeader = [
  { label: "見出し語", field: "entry", type: "text" },
  { label: "語釈", field: "definations", type: "text_array" },
  { label: "NDLリンク", field: "ndl_url", type: "button" },
  // { label: "日国", field: "nikkoku", type: "text" },
  { label: "所在", field: "location", type: "text" },
];

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
    const text = value.map(v=>v.defination).join("");
    return <>{text}</>;
  }
  if (url) return <Link href={url}>{value as string}</Link>;
  return <>{value}</>;
};

export default async function WakunnoshioriResultsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string };
}) {
  const entry = searchParams?.entry || "";
  const definitions  = searchParams?.definitions || "";
  const {data:results} = await wakunnoshioriFindMany(searchParams!);

  return (
    <div className="md:p-4">
      <div className="divider">
        <h2>検索結果：{results.length}件</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              {tableHeader.map((header) => (
                <th key={header.label}>{header.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {results.map((result: any, index: number) => (
              <tr key={result.id}>
                <th>{index + 1}</th>
                {tableHeader.map((header) => (
                  <td key={header.label} className="whitespace-normal">
                    <CellBlock
                      label={header.label}
                      value={result[header.field]}
                      type={header.type}
                      url={`/wakunnoshiori/${result.id}`}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
