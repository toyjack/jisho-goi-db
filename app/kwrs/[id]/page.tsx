import IiifViewer from "@/components/iiif/Viewer";
import BackButton from "@/components/ui/BackButton";
import { kwrsFindOneById } from "@/db/kwrs";
import Link from "next/link";
import { kwrsManifest } from "@/constants/kwrs-manifest";

export default async function KwrsItemPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const result = await kwrsFindOneById(Number(id));
  if (!result) {
    return <div>データが見つかりませんでした。</div>;
  }
  // "巻11"　→　11
  const vol=Number(result.maki?.replace("巻",""));
  // "1丁表7行目" → 1
  const cho=Number(result.page?.split("丁")[0]);
  // "1丁表7行目" 表/裏 
  const side=result.page?.split("丁")[1][0]==="表"?0:1;

  const manifestUrl = kwrsManifest.find((m) => m.vol === vol && m.cho===cho && m.side===side)?.ndl_manifest;
  const koma = kwrsManifest.find((m) => m.vol === vol && m.cho===cho && m.side===side)?.ndl_page as number;
  const ndl_page = kwrsManifest.find((m) => m.vol === vol && m.cho===cho && m.side===side)?.web;

  return (
    <div className="p-4">
      <div className="p-2">
        <BackButton />
      </div>

      <h2 className="text-xl font-bold">テキストデータ</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>フィールド</th>
              <th>内容</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>辞書内ID（仮）</th>
              <td>{result.id}</td>
            </tr>
            <tr>
              <th>見出し語</th>
              <td>
                <span className="kbd font-bold">{result.entry}</span>
              </td>
            </tr>
            <tr>
              <th>巻</th>
              <td>{result.maki}</td>
            </tr>
            <tr>
              <th>頁</th>
              <td>{result.page}</td>
            </tr>
            <tr>
              <th>所在部</th>
              <td>
                <Link
                  href={"/kwrs/results?bu=" + result.bu}
                  className="link link-hover"
                >
                  {result.bu}
                </Link>
              </td>
            </tr>
            <tr>
              <th>類・具・国郡等</th>
              <td>
                <Link
                  href={`/kwrs/results?type=${result.type}&type2=${result.type2}`}
                  className="link link-hover"
                >
                  {result.type + " " + result.type2}
                </Link>
              </td>
            </tr>

            <tr>
              <th>註文</th>
              <td className="font-bold">{result.definition}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="divider"></div>
      <h2 className="text-xl font-bold py-4">画像</h2>
      <div className="flex flex-col">
        <pre>
          {vol} {cho} {side}
          <p>
            <a href={manifestUrl}>manifest</a>
            <a href={ndl_page}>ndl_page</a>
          </p>
        </pre>
        <IiifViewer manifestUrl={manifestUrl as string} page={koma-1} />
      </div>
    </div>
  );
}
