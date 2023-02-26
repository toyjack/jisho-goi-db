import Link from "next/link";

async function getData(
  entry: string | undefined,
  jion: string | undefined,
  wakun: string | undefined,
  radical: string | undefined,
  strokes: string | undefined,
  maki: string | undefined,
  tyo: string | undefined
) {
  const params = {
    database: "gyokuhentaizen",
    entry: entry || "",
    jion: jion || "",
    wakun: wakun || "",
    radical: radical || "",
    remain_strokes: strokes || "",
  };
  const query = new URLSearchParams(params);
  // const url = `https://jisho-goi-nestjs.kojisho.com/api/search?${query}`;
  const url = `https://portal.kojisho.com/api/v1/gyokuhentaizen/search?${query}`;
  // const url = `http://localhost:8000/api/v1/gyokuhentaizen/search?${query}`;
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
  searchParams?: { [key: string]: string | undefined };
}) {
  const entry = searchParams?.entry;
  const jion = searchParams?.jion;
  const wakun = searchParams?.wakun;
  const radical = searchParams?.radical;
  const strokes = searchParams?.strokes;
  const maki = searchParams?.maki;
  const tyo = searchParams?.tyo;

  const results = await getData(entry, jion, wakun, radical, strokes, maki, tyo);

  function getWord(wordStr: string) {
    if (wordStr == "") return;
    return wordStr.split("；").map((word) => {
      return (
        <span key={word} className="px-2 mx-1 badge badge-lg badge-primary">
          {word}
        </span>
      );
    });
  }

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
              <th>部首</th>
              <th>字音（右）</th>
              <th>字音（左）</th>
              <th>和訓</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result: any, index: number) => (
              <tr key={result.ghtz_id}>
                <th>{index + 1}</th>
                <td>
                  <Link
                    href={"/gyokuhentaizen/" + result.ghtz_id}
                    className="kbd"
                    >
                    {result.entry}
                  </Link>
                </td>
                    <td>{result.radical}</td>
                <td>{getWord(result.jion_r || "")}</td>
                <td>{getWord(result.jion_l || "")}</td>
                <td>{getWord(result.wakun || "")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GyokuhentaizenResults;
