import Link from "next/link";

async function getData(searchParams: { [key: string]: string }) {
  const notEmptyQuery = Object.fromEntries(
    Object.entries(searchParams).filter(([_, v]) => v != "")
  );

  const query = new URLSearchParams(notEmptyQuery);
  const url = `${process.env.API_ROOT}/api/jiruisho/search?${query}`;

  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("データが見つかりませんでした。");
  }
  return res.json();
}

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
  const results = await getData(searchParams!);

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
    </div>
  );
}

export default JiruishoResultsPage;
