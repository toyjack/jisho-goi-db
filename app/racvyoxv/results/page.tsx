import { racvyoxvFindMany } from "@/db/racvyoxv";
import Link from "next/link";

const tableHeader = [
  // { label: "ID", field: "id" },
  { label: "代表字頭記号", field: "group_entry", type: "text" },
  { label: "頭音", field: "initial_on", type: "text" },
  { label: "代表字", field: "entry", type: "text" },
  { label: "熟語", field: "kanji_pair", type: "text" },
  { label: "訓（左傍）", field: "ruby_left_first", type: "text" },
  { label: "訓（左傍）", field: "ruby_left_remains", type: "text" },
  { label: "音（右傍）", field: "ruby_right_first", type: "text" },
  { label: "音（右傍）", field: "ruby_right_remains", type: "text" },
  { label: "備考", field: "remark", type: "text" },
  { label: "所在（笠間頁）", field: "page", type: "text" },
  { label: "頁内行数", field: "line", type: "text" },
  { label: "Gallica URL", field: "gallica", type: "button" },
  { label: "日国1", field: "nikkoku1_entry", type: "text" },
  { label: "日国1 URL", field: "nikkoku1_url", type: "button" },
  { label: "日国2", field: "nikkoku2_entry", type: "text" },
  { label: "日国2 URL", field: "nikkoku2_url", type: "button" },
  { label: "日国3", field: "nikkoku3_entry", type: "text" },
  { label: "日国3 URL", field: "nikkoku3_url", type: "button" },
  { label: "日国4", field: "nikkoku4_entry", type: "text" },
  { label: "日国4 URL", field: "nikkoku4_url", type: "button" },
  { label: "日国5", field: "nikkoku5_entry", type: "text" },
  { label: "日国5 URL", field: "nikkoku5_url", type: "button" },
  { label: "日国6", field: "nikkoku6_entry", type: "text" },
  { label: "日国6 URL", field: "nikkoku6_url", type: "button" },
  { label: "日国7", field: "nikkoku7_entry", type: "text" },
  { label: "日国7 URL", field: "nikkoku7_url", type: "button" },
];


async function JiruishoResultsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string };
}) {
  const term = searchParams?.term || "";
  const kanji_pair_length= searchParams?.kanji_pair_length || "";
  
  const {data:results} = await racvyoxvFindMany({ term, kanji_pair_length });

  const CellBlock = ({label, value, type }: {label:string, value: string; type: string }) => {
    if (type === "button" && value) {
      return (
        <Link href={value || ""} target="_blank" className="btn btn-primary">{label}</Link>
      );
    }
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
              {tableHeader.map((header, index) => (
                <th key={index}>{header.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {results.map((result: any, index: number) => (
              <tr key={index}>
                <th>
                  <Link
                    href={`/racvyoxv/${result.id}`}
                    className="link link-hover"
                  >
                    {index + 1}
                  </Link>
                </th>
                {tableHeader.map((header, index) => (
                  <td key={index}>
                    <CellBlock label={header.label} value={result[header.field]} type={header.type} />
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

export default JiruishoResultsPage;
