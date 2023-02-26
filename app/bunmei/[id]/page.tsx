import BackButton from "@/components/common/BackButton";
import Link from "next/link";
import Image from "next/image";

async function getData(id: string) {
  const url = `${process.env.API_ROOT}/api/bunmei/${id}`;

  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("データが見つかりませんでした。");
  }

  return res.json();
}

async function BunmeiItemPage({ params }: { params: { id: string } }) {
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
              <th>辞書内ID</th>
              <td>{result.bunmei_id}</td>
            </tr>
            <tr>
              <th>語頭記号</th>
              <td>{result.gotou}</td>
            </tr>
            <tr>
              <th>見出し語</th>
              <td>{result.entry}</td>
            </tr>
            <tr>
              <th>見出し語原表記</th>
              <td>{result.entry_original}</td>
            </tr>
            <tr>
              <th>語形</th>
              <td>{result.gokei}</td>
            </tr>
            <tr>
              <th>語形原表記</th>
              <td>{result.gokei_original}</td>
            </tr>
            <tr>
              <th>声点</th>
              <td>{result.shouten}</td>
            </tr>
            <tr>
              <th>左傍訓</th>
              <td>{result.left_kun}</td>
            </tr>
            <tr>
              <th>注</th>
              <td>{result.defination}</td>
            </tr>
            <tr>
              <th>項目種別</th>
              <td>{result.item_type}</td>
            </tr>
            <tr>
              <th>部</th>
              <td>{result.bu}</td>
            </tr>
            <tr>
              <th>門</th>
              <td>{result.mon}</td>
            </tr>
            <tr>
              <th>ページ数</th>
              <td>{result.page}</td>
            </tr>
            <tr>
              <th>行数</th>
              <td>{result.line}</td>
            </tr>
            <tr>
              <th>リンク</th>
              <td>
                <Link
                  href={result.ndl_link}
                  target="_blank"
                  className="link link-hover"
                >
                  {result.ndl_link}
                </Link>
              </td>
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

export default BunmeiItemPage;
