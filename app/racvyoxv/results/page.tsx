import Link from "next/link";

async function getData(searchParams: { [key: string]: string }) {
  const query = new URLSearchParams(searchParams);
  const url = `${process.env.API_ROOT}/api/racvyoxv/search?${query}`;

  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("データが見つかりませんでした。");
  }
  return res.json();
}

const tableHeader = [
  "page",
  "line",
  "initial_on",
  "entry",
  "kanji_pair",
  "ruby_left_first",
  "ruby_left_remains",
  "ruby_right_first",
  "ruby_right_remains",
  "remark",
  "group_entry",
  "gallica",
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
                <th>
                  <Link
                    href={`/racvyoxv/${result.id}`}
                    className="link link-hover"
                  >
                    {index + 1}
                  </Link>
                </th>
                {tableHeader.map((header, index) => (
                  <td key={index}>{result[header]}</td>
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
