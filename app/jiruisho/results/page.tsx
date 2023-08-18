import { jiruishoFindmany, JiruishoFindManyQuery } from "@/db/jiruisho";
import Link from "next/link";

const tableHeader = [
  "見出し語",
  "声点",
  "所属篇",
  "所属部",
  "前田本所在",
  "前田本画像URL",
  "黒川本所在",
  "黒川本画像URL",
  "音訓",
  "文字数",
  "語形",
  "注文",
  "作成者注",
];

async function JiruishoResultsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string };
}) {
  if (!searchParams) return <div>検索結果がありません</div>;
  // entry=&gokei_search_current=ア&=&defination=&shouten=&hen=&bu=&onkun=&char_count=
  const query: JiruishoFindManyQuery = {
    entry: searchParams.entry,
    gokei_search_current: searchParams.gokei_search_current,
    gokei_search_original: searchParams.gokei_search_original,
    definition: searchParams.definition,
    shouten: searchParams.shouten,
    bu: searchParams.bu,
    hen: searchParams.hen,
    onkun: searchParams.onkun,
    char_count: searchParams.char_count,
  };
  const { count, data: results } = await jiruishoFindmany(query);

  return (
    <>
      <div className="divider">
        <h2>検索結果：{count}件</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              {tableHeader.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {results.map((result: any, index: number) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>
                  <Link
                    href={`/jiruisho/${result.id}`}
                    className="link link-hover"
                  >
                    {result.entry}
                  </Link>
                </td>
                <td>{result.shouten}</td>
                <td>{result.hen}</td>
                <td>{result.bu}</td>
                <td>{result.maeda_loc}</td>
                <td>
                  <Link
                    href={result.maeda_ndl_url || ""}
                    target="_blank"
                    className="btn btn-primary"
                  >
                    NDLページ
                  </Link>
                </td>
                <td>{result.kurokawa_loc}</td>
                <td>
                  <Link
                    href={result.kurokawa_ndl_url || ""}
                    target="_blank"
                    className="btn btn-primary"
                  >
                    NDLページ
                  </Link>
                </td>
                <td>{result.onkun}</td>
                <td>{result.char_count}</td>
                <td>{result.gokei_display}</td>
                <td>{result.defination}</td>

                <td>{result.remark}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default JiruishoResultsPage;
