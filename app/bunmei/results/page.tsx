import { bunmeibonFindMany, BunmeibonFindManyQuery } from "@/db/bunmeibon";
import Link from "next/link";

const tableHeader = [
  // { label: "ID", field: "bunmei_id", type: "text" },
  { label: "NDLリンク", field: "ndl_link", type: "button" },
  { label: "語頭記号", field: "gotou", type: "text" },
  // { label: "見出し語", field: "entry", type: "text" },
  { label: "見出し語原表記", field: "entry_original", type: "text" },
  // { label: "語形", field: "gokei", type: "text" },
  { label: "語形原表記", field: "gokei_original", type: "text" },
  { label: "声点", field: "shoten_original", type: "text" },
  { label: "左傍訓", field: "left_kun_original", type: "text" },
  { label: "注", field: "definition", type: "text" },
  { label: "項目種別", field: "item_type", type: "text" },
  { label: "部", field: "bu", type: "text" },
  { label: "門", field: "mon", type: "text" },
  // { label: "影印本番号", field: "page", type: "text" },
  // { label: "行数", field: "line", type: "text" },
  // { label: "備考", field: "remark", type: "text" },
];

function getLoc(id: string, url: string) {
  const [page, line, col] = id.split("_");
  // https://dl.ndl.go.jp/pid/1286982/1/3
  const [_, __, ___, ____, _____, ______, koma] = url.split("/");
  const sayu = Number(page) % 2 === 1 ? "左" : "右";

  return `${Number(koma)}コマ${sayu}${line}行${col}番目`;
}

async function BunmeiResultsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const query: BunmeibonFindManyQuery = {
    entry: searchParams.entry,
    gokei: searchParams.gokei,
    shouten: searchParams.shouten,
    left_kun: searchParams.left_kun,
    definition: searchParams.definition,
    no_kundoku: searchParams.no_kundoku==="true" ? true : false,
  };
  const results = await bunmeibonFindMany(query);
  console.log(results)

  const CellBlock = ({
    label,
    value,
    type,
    url,
  }: {
    label: string;
    value: string;
    type: string;
    url?: string;
  }) => {
    if (type === "button" && value) {
      return (
        <Link href={value || ""} target="_blank" className="btn btn-primary">
          {label}
        </Link>
      );
    }
    if (url) return <Link href={url}>{value}</Link>;
    return <>{value}</>;
  };

  return (
    <>
      <div className="divider">
        <h2>検索結果：{results.count}件</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              {tableHeader.map((header) => (
                <th key={header.label} className="w-1">
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {results.data.map((result: any, index: number) => (
              <tr key={result.bunmei_id}>
                {/* <th>{index + 1}</th> */}
                <th>
                  {getLoc(result.bunmei_id, result.ndl_link)}
                  {/* <GetLoc id={result.ghtz_id} url={result.ndl_link} /> */}
                </th>
                {tableHeader.map((header) => (
                  <td key={header.label}>
                    <CellBlock
                      label={header.label}
                      value={result[header.field]}
                      type={header.type}
                      url={`/bunmei/${result.bunmei_id}`}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default BunmeiResultsPage;
