import { racvyoxvFindMany } from "@/db/racvyoxv";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

const tableHeader = [
  // { label: "ID", field: "id" },
  { label: "部", field: "部", type: "text" },
  { label: "代表字", field: "代表字", type: "text" },
  { label: "訓読み", field: "訓読み(左傍1字目)", type: "block" },
  { label: "音読み", field: "音読み(右傍1字目)", type: "block" },
  { label: "備考", field: "備考", type: "text" },
  { label: "国書DB", field: "国書DB所在", type: "button" },
  // { label: "所在（笠間頁）", field: "page", type: "text" },
  // { label: "頁内行数", field: "line", type: "text" },
  // { label: "Gallica URL", field: "gallica", type: "button" },
  // { label: "日国1", field: "nikkoku1_entry", type: "text" },
  // { label: "日国1 URL", field: "nikkoku1_url", type: "button" },
  // { label: "日国2", field: "nikkoku2_entry", type: "text" },
  // { label: "日国2 URL", field: "nikkoku2_url", type: "button" },
  // { label: "日国3", field: "nikkoku3_entry", type: "text" },
  // { label: "日国3 URL", field: "nikkoku3_url", type: "button" },
  // { label: "日国4", field: "nikkoku4_entry", type: "text" },
  // { label: "日国4 URL", field: "nikkoku4_url", type: "button" },
  // { label: "日国5", field: "nikkoku5_entry", type: "text" },
  // { label: "日国5 URL", field: "nikkoku5_url", type: "button" },
  // { label: "日国6", field: "nikkoku6_entry", type: "text" },
  // { label: "日国6 URL", field: "nikkoku6_url", type: "button" },
  // { label: "日国7", field: "nikkoku7_entry", type: "text" },
  // { label: "日国7 URL", field: "nikkoku7_url", type: "button" },
];

async function RacvyoxvDevResultPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string };
}) {
  const entry = searchParams?.entry;
  const bu = searchParams?.bu;
  const onyomi = searchParams?.onyomi;
  const kunyomi = searchParams?.kunyomi;

  const supabase = await createClient();

  // const { data: results } = await racvyoxvFindMany({
  //   entry,
  //   kanji_pair_length,
  //   bu,
  //   onyomi,
  //   kunyomi
  // });

  const { data: results, error } = await supabase
    .from("racvyoxv_shogyokuhen")
    .select("*")
    .like("代表字", `%${entry || ""}%`)
    .like("部", `%${bu || ""}%`)
    .like(`"音読み(右傍1字目)"`, `%${onyomi || ""}%`)
    .like(`"訓読み(左傍1字目)"`, `%${kunyomi || ""}%`);

  if (error) {
    console.error("Error fetching data:", error);
    return <div>データの取得中にエラーが発生しました。</div>;
  }

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

    if (type === "block") {
      // value = uniq(value.split(";")).join("; ");
      return (
        <div className="flex gap-1">
          {value
            }
        </div>
      );
    }
    return <>{value}</>;
  };

  return (
    <>
      <div className="divider">
        <h2>検索結果：{results.length}件</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>詳細</th>
              {tableHeader.map((header, index) => (
                <th key={index}>{header.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {results.map((result: any, index: number) => (
              <tr key={index} className="hover">
                <th>{index + 1}</th>
                <td>
                  <Link
                    href={`/racvyoxv-dev/${result.ID}`}
                    className="btn btn-secondary"
                  >
                    詳細
                  </Link>
                </td>
                {tableHeader.map((header, index) => (
                  <td key={index}>
                    <CellBlock
                      label={header.label}
                      value={result[header.field]}
                      type={header.type}
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

export default RacvyoxvDevResultPage;
