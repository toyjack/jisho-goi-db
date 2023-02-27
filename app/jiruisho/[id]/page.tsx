import BackButton from "@/components/common/BackButton";
import Link from "next/link";

async function getData(id: string) {
  const url = `${process.env.API_ROOT}/api/jiruisho/${id}`;

  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("データが見つかりませんでした。");
  }

  return res.json();
}

async function JiruishoItemPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const result = await getData(id);

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
              <th>前田本所在</th>
              <td>{result.maeda_loc}</td>
            </tr>
            <tr>
              <th>前田本NDLリンク</th>
              <td>
                <Link
                  href={result.maeda_ndl_url}
                  target="_blank"
                  className="link link-hover"
                >
                  {result.maeda_ndl_url}
                </Link>
              </td>
            </tr>
            <tr>
              <th>黒川本所在</th>
              <td>{result.kurokawa_loc}</td>
            </tr>
            <tr>
              <th>黒川本NDLリンク</th>
              <td>
                <Link
                  href={result.kurokawa_ndl_url}
                  target="_blank"
                  className="link link-hover"
                >
                  {result.kurokawa_ndl_url}
                </Link>
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
              <th>語形原表記</th>
              <td>{result.gokei_display}</td>
            </tr>

            <tr>
              <th>註文</th>
              <td>{result.defination}</td>
            </tr>
            

            <tr>
              <th>備考</th>
              <td>{result.remark}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default JiruishoItemPage;
