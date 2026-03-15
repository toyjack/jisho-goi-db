import IiifViewer from "@/components/iiif/Viewer";
import BackButton from "@/components/ui/BackButton";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

async function RacvyoxvDevItemPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const supabase = await createClient();
  const { data: result, error } = await supabase
    .from("racvyoxv_shogyokuhen")
    .select("*")
    .eq("ID", id)
    .single();
  if (!result) return <div>データが見つかりませんでした。</div>;

  const page = parseInt(result["国書DB所在"]?.split("/").slice(-1)[0] || "1") || 1;

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
              <td>{result["ID"]}</td>
            </tr>
            {/* <tr>
              <th>代表字頭記号</th>
              <td>{result.group_entry}</td>
            </tr> */}
            <tr>
              <th>部</th>
              <td>{result["部"]}</td>
            </tr>
            <tr>
              <th>代表字</th>
              <td>{result["代表字"]}</td>
            </tr>
            
            <tr>
              <th>代表字の訓読み</th>
              <td>
                {result["訓読み(左傍1字目)"]}
              </td>
            </tr>

            <tr>
              <th>代表字の音読み</th>
              <td>{result["音読み(右傍1字目)"]}</td>
            </tr>

            <tr>
              <th>頁内行数</th>
              <td>{result["行数"]}</td>
            </tr>
            <tr>
              <th>国書DB</th>
              <td>
                <Link
                  href={result["国書DB所在"] as string}
                  target="_blank"
                  className="link link-hover"
                >
                  {result["国書DB所在"]}
                </Link>
              </td>
            </tr>

            <tr>
              <th>備考</th>
              <td>{result["備考"]}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="divider"></div>
      <h2 className="text-xl font-bold py-4">画像（国書DB）</h2>
      <div>
        <IiifViewer manifestUrl={"https://kokusho.nijl.ac.jp/biblio/100415167/manifest"} page={page - 1} />
      </div>
    </div>
  );
}

export default RacvyoxvDevItemPage;
