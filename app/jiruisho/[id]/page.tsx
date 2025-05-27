import BackButton from "@/components/ui/BackButton";
import { countItemsByField, jiruishoFindOne } from "@/db/jiruisho";
import Link from "next/link";
import JiruishoImageTab from "./ImageTab";

interface ImageData {
  tabTitle: string;
  manifestUrl: string;
  page: number;
}

async function JiruishoItemPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const result = await jiruishoFindOne(id);
  if (!result) {
    return <div>データが見つかりませんでした。</div>;
  }

  const countItemInBu = await countItemsByField(
    "bu",
    result.bu || ""
  );
  
  const countItemInHen = await countItemsByField(
    "hen",
    result.hen || ""
  );

  let tabData: ImageData[] = [];

  if (result.maeda_ndl_url) {
    const [_, __, ___, ____, ndlId, _____, canvasNum] =
      result.maeda_ndl_url.split("/");
    tabData.push({
      tabTitle: "前田本",
      manifestUrl: `https://dl.ndl.go.jp/api/iiif/${ndlId}/manifest.json`,
      page: Number(canvasNum),
    });
  }

  if (result.kurokawa_ndl_url) {
    const [_, __, ___, ____, ndlId, _____, canvasNum] =
      result.kurokawa_ndl_url.split("/");
    tabData.push({
      tabTitle: "黒川本",
      manifestUrl: `https://dl.ndl.go.jp/api/iiif/${ndlId}/manifest.json`,
      page: Number(canvasNum),
    });
  }

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
              <td>{result.entry}</td>
            </tr>
            <tr>
              <th>語形原表記</th>
              <td>{result.gokei_display}</td>
            </tr>
            <tr>
              <th>注文</th>
              <td>{result.definition}</td>
            </tr>

            <tr>
              <th>声点</th>
              <td>{result.shouten}</td>
            </tr>
            <tr>
              <th>所在篇</th>
              <td>{result.hen}</td>
            </tr>
            <tr>
              <th>所在部</th>
              <td>{result.bu}</td>
            </tr>

            <tr>
              <th>所在篇の項目数</th>
              <td>{countItemInHen}</td>
            </tr>

            <tr>
              <th>所在部の項目数</th>
              <td>{countItemInBu}</td>
            </tr>

            <tr>
              <th>前田本所在</th>
              <td>{result.maeda_loc}</td>
            </tr>
            <tr>
              <th>前田本NDLリンク</th>
              <td>
                {result.maeda_ndl_url && (
                  <Link
                    href={result.maeda_ndl_url}
                    target="_blank"
                    className="btn btn-primary"
                  >
                    NDLページ
                  </Link>
                )}
              </td>
            </tr>
            <tr>
              <th>黒川本所在</th>
              <td>{result.kurokawa_loc}</td>
            </tr>
            <tr>
              <th>黒川本NDLリンク</th>
              <td>
                {result.kurokawa_ndl_url && (
                  <Link
                    href={result.kurokawa_ndl_url}
                    target="_blank"
                    className="btn btn-primary"
                  >
                    NDLページ
                  </Link>
                )}
              </td>
            </tr>
            <tr>
              <th>音訓</th>
              <td>{result.onkun}</td>
            </tr>
            <tr>
              <th>文字数</th>
              <td>{result.char_count}</td>
            </tr>

            <tr>
              <th>備考</th>
              <td>{result.remark}</td>
            </tr>

            {result.chushaku && (
              <tr>
                <th>注釈</th>
                <td>{result.chushaku.annotation}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="divider"></div>
      <h2 className="text-xl font-bold py-4">画像</h2>
      <div>
        <JiruishoImageTab data={tabData} />
      </div>
    </div>
  );
}

export default JiruishoItemPage;
