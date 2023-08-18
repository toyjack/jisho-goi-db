import {
  gyokuhentaizenFindMany,
  GyokuhentaizenFindManyQuery,
} from "@/db/gyokuhentaizen";
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
  const query: GyokuhentaizenFindManyQuery = {
    entry,
    jion,
    wakun,
    radical,
    remain_strokes: strokes,
    maki,
    tyo,
  };

  const results = await gyokuhentaizenFindMany(query);

  return results;
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

  const { data: results } = await getData(
    entry,
    jion,
    wakun,
    radical,
    strokes,
    maki,
    tyo
  );

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
    <>
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
    </>
  );
}

export default GyokuhentaizenResults;
