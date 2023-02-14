import React from "react";
async function getData(entry: string | undefined, onkun: string | undefined) {
  const params = { entry: entry || "", onkun: onkun || "" };
  const query = new URLSearchParams(params);
  const url = `https://portal.kojisho.com/api/v1/gyokuhentaizen/search?${query}`;
  console.log(url);
  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("データが見つかりませんでした。");
  }

  return res.json();
}

async function GyokuhentaizenResults({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const entry = searchParams?.entry;
  const onkun = searchParams?.onkun;

  const results = await getData(entry, onkun);

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
              <th>掲出字</th>
              <th>字音（右）</th>
              <th>字音（左）</th>
              <th>和訓</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result: any, index: number) => (
              <tr key={result.ghtz_id}>
                <th>{index+1}</th>
                <td>{result.entry}</td>
                <td>{result.jion_r}</td>
                <td>{result.jion_l}</td>
                <td>{result.wakun}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GyokuhentaizenResults;
