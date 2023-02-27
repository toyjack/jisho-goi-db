import Link from "next/link";

async function getData(searchParams: { [key: string]: string  }){
  const notEmptyQuery = Object.fromEntries(
    Object.entries(searchParams).filter(([_, v]) => v != "")
  );
  const query = new URLSearchParams(notEmptyQuery);
  
  const url = `${process.env.API_ROOT}/api/bunmei/search?${query}`;

  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("データが見つかりませんでした。");
  }
  return res.json();
}

async function BunmeiResultsPage({
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
              <th>ID</th>
              <th>語頭記号</th>
              <th>見出し語</th>
              <th>見出し語原表記</th>
              <th>語形</th>
              <th>語形原表記</th>
              <th>声点</th>
              <th>左傍訓</th>
              <th>注</th>
              <th>項目種別</th>
              <th>部</th>
              <th>門</th>
              <th>ページ数</th>
              <th>行数</th>
              <th>リンク</th>
              <th>備考</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result: any, index: number) => (
              <tr key={result.ghtz_id}>
                <th>{index + 1}</th>
                <td>
                  <Link href={`/bunmei/${result.bunmei_id}`} className="link link-hover">
                    {result.bunmei_id}
                  </Link>
                </td>
                <td>{result.gotou}</td>
                <td>{result.entry}</td>
                <td>{result.entry_original}</td>
                <td>{result.gokei}</td>
                <td>{result.gokei_original}</td>
                <td>{result.shouten}</td>
                <td>{result.left_kun}</td>
                <td>{result.defination}</td>
                <td>{result.item_type}</td>
                <td>{result.bu}</td>
                <td>{result.mon}</td>
                <td>{result.page}</td>
                <td>{result.line}</td>
                <td>
                  <Link
                    href={result.ndl_link}
                    target="_blank"
                    className="link link-hover"
                  >
                    {result.ndl_link}
                  </Link>
                </td>
                <td>{result.remark}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BunmeiResultsPage