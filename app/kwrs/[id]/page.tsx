import IiifViewer from "@/components/iiif/Viewer";
import BackButton from "@/components/ui/BackButton";
import { kwrsFindOneById } from "@/db/kwrs";
import Link from "next/link";

interface ImageData {
  tabTitle: string;
  manifestUrl: string;
  page: number;
}

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

  // TODO: 画像データの取得
  // https://dl.ndl.go.jp/pid/2606770
  const manifestUrl = "https://dl.ndl.go.jp/api/iiif/2544216/manifest.json";
  const page = 1;

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
      <div className="">
        <IiifViewer manifestUrl={manifestUrl} page={page} className="h-screen w-full " />
      </div>
    </div>
  );
}
