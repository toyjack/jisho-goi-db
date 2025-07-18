import { racvyoxvFindMany } from "@/db/racvyoxv";
import Link from "next/link";

const tableHeader = [
  // { label: "ID", field: "id" },
  { label: "部", field: "bu", type: "text" },
  { label: "見出し語", field: "entry", type: "text" },
  { label: "訓読み", field: "kun", type: "block" },
  { label: "音読み", field: "on", type: "block" },
  { label: "備考", field: "remark", type: "text" },
  { label: "Gallica画像", field: "gallica", type: "button" },
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

async function JiruishoResultsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string };
}) {
  const entry = searchParams?.entry;
  const kanji_pair_length = searchParams?.kanjiPairLength;
  const bu = searchParams?.bu;
  const onyomi = searchParams?.onyomi;
  const kunyomi = searchParams?.kunyomi;

  const { data: results } = await racvyoxvFindMany({
    entry,
    kanji_pair_length,
    bu,
    onyomi,
    kunyomi
  });

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
      return (
        <div className="flex gap-1">
          {value ? value.split(";").map((line, index) => (
            <span key={index} className="kbd">{line}</span>
          )) : "なし"}
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
                    href={`/racvyoxv/${result.id}`}
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

export default JiruishoResultsPage;
