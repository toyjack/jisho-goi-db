import Link from "next/link";

async function getData(searchParams: { [key: string]: string }) {
  const notEmptyQuery = Object.fromEntries(
    Object.entries(searchParams).filter(([_, v]) => v != "")
  );
  const query = new URLSearchParams(notEmptyQuery);

  const url = `${process.env.API_ROOT}/api/bunmeibon/search?${query}`;

  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("データが見つかりませんでした。");
  }
  return res.json();
}

const tableHeader = [
  // { label: "ID", field: "bunmei_id", type: "text" },
  { label: "NDLリンク", field: "ndl_link", type: "button" },
  { label: "語頭記号", field: "gotou", type: "text" },
  // { label: "見出し語", field: "entry", type: "text" },
  { label: "見出し語原表記", field: "entry_original", type: "text" },
  // { label: "語形", field: "gokei", type: "text" },
  { label: "語形原表記", field: "gokei_original", type: "text" },
  { label: "声点", field: "shouten", type: "text" },
  { label: "左傍訓", field: "left_kun", type: "text" },
  { label: "注", field: "defination", type: "text" },
  { label: "項目種別", field: "item_type", type: "text" },
  { label: "部", field: "bu", type: "text" },
  { label: "門", field: "mon", type: "text" },
  // { label: "影印本番号", field: "page", type: "text" },
  // { label: "行数", field: "line", type: "text" },
  // { label: "備考", field: "remark", type: "text" },
];

function getLoc(id: string, url: string) {
  const [page, line, col] = id.split("_");
  console.log(id);
  // https://dl.ndl.go.jp/pid/1286982/1/3
  const [_, __, ___, ____, _____, ______, koma] = url.split("/");
  const sayu = Number(page) % 2 === 1 ? "左" : "右";

  return `${Number(koma)}コマ${sayu}${line}行${col}番目`;
}

async function BunmeiResultsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string };
}) {
  const results = await getData(searchParams!);

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
                <th key={header.label} className="w-1">{header.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {results.map((result: any, index: number) => (
              <tr key={result.bunmei_id}>
                {/* <th>{index + 1}</th> */}
                <th>
                  {getLoc(result.bunmei_id, result.ndl_link)}
                  {/* <GetLoc id={result.ghtz_id} url={result.ndl_link} /> */}
                </th>
                {tableHeader.map((header) => (
                  <td key={header.label} >
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
    </div>
  );
}

export default BunmeiResultsPage;
