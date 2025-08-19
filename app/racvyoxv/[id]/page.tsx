import IiifViewer from "@/components/iiif/Viewer";
import BackButton from "@/components/ui/BackButton";
import { racvyoxvFindOne } from "@/db/racvyoxv";
import Link from "next/link";

async function RacvyoxvItemPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const result = await racvyoxvFindOne(id);
  if (!result) return <div>データが見つかりませんでした。</div>;

  // https://gallica.bnf.fr/view3if/ga/ark:/12148/btv1b10508396b/f17
  const gallicaId = result.gallica!.split("/").slice(5, 8).join("/"); //ark:/12148/btv1b10508396b
  // https://gallica.bnf.fr/iiif/ark:/12148/btv1b10508396b/manifest.json
  const gallicaManifest = `https://gallica.bnf.fr/iiif/${gallicaId}/manifest.json`;
  const page = parseInt(result.page!) + 12;
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
              <td>{result.id}</td>
            </tr>
            {/* <tr>
              <th>代表字頭記号</th>
              <td>{result.group_entry}</td>
            </tr> */}
            <tr>
              <th>部</th>
              <td>{result.bu}</td>
            </tr>
            <tr>
              <th>見出し語</th>
              <td>{result.entry}</td>
            </tr>
            
            <tr>
              <th>代表字の訓読み</th>
              <td>
                {result.kun?.split(";")[0]}
              </td>
            </tr>
            <tr>
              <th>2字目以降の訓読み</th>
              <td>{result.kun?.split(";").slice(1).join("、")}</td>
            </tr>
            <tr>
              <th>代表字の音読み</th>
              <td>{result.on?.split(";")[0]}</td>
            </tr>
            <tr>
              <th>2字目以降の音読み</th>
              <td>{result.on?.split(";").slice(1).join("、")}</td>
              </tr>
            <tr>
              <th>所在（笠間頁）</th>
              <td>{result.page}</td>
            </tr>
            <tr>
              <th>頁内行数</th>
              <td>{result.line}</td>
            </tr>
            <tr>
              <th>Gallica URL</th>
              <td>
                <Link
                  href={result.gallica as string}
                  target="_blank"
                  className="link link-hover"
                >
                  {result.gallica}
                </Link>
              </td>
            </tr>

            <tr>
              <th>日国</th>
              <td>{result.nikkoku1_entry}</td>
            </tr>
            <tr>
              <th>日国URL</th>
              <td>
                <Link
                  href={result.nikkoku1_url || ""}
                  target="_blank"
                  className="link link-hover"
                >
                  {result.nikkoku1_url}
                </Link>
              </td>
            </tr>

            {result.nikkoku2_entry && result.nikkoku2_url && (
              <>
                <tr>
                  <th>日国2</th>
                  <td>{result.nikkoku2_entry}</td>
                </tr>
                <tr>
                  <th>日国2 URL</th>
                  <td>
                    <Link
                      href={result.nikkoku2_url as string}
                      target="_blank"
                      className="link link-hover"
                    >
                      {result.nikkoku2_url}
                    </Link>
                  </td>
                </tr>
              </>
            )}
            {result.nikkoku3_entry && result.nikkoku3_url && (
              <>
                <tr>
                  <th>日国3</th>
                  <td>{result.nikkoku3_entry}</td>
                </tr>
                <tr>
                  <th>日国3 URL</th>
                  <td>
                    <Link
                      href={result.nikkoku3_url as string}
                      target="_blank"
                      className="link link-hover"
                    >
                      {result.nikkoku3_url}
                    </Link>
                  </td>
                </tr>
              </>
            )}
            {result.nikkoku4_entry && result.nikkoku4_url && (
              <>
                <tr>
                  <th>日国4</th>
                  <td>{result.nikkoku4_entry}</td>
                </tr>
                <tr>
                  <th>日国4 URL</th>
                  <td>
                    <Link
                      href={result.nikkoku4_url as string}
                      target="_blank"
                      className="link link-hover"
                    >
                      {result.nikkoku4_url}
                    </Link>
                  </td>
                </tr>
              </>
            )}
            {result.nikkoku5_entry && result.nikkoku5_url && (
              <>
                <tr>
                  <th>日国5</th>
                  <td>{result.nikkoku5_entry}</td>
                </tr>
                <tr>
                  <th>日国5 URL</th>
                  <td>
                    <Link
                      href={result.nikkoku5_url as string}
                      target="_blank"
                      className="link link-hover"
                    >
                      {result.nikkoku5_url}
                    </Link>
                  </td>
                </tr>
              </>
            )}
            {result.nikkoku6_entry && result.nikkoku6_url && (
              <>
                <tr>
                  <th>日国6</th>
                  <td>{result.nikkoku6_entry}</td>
                </tr>
                <tr>
                  <th>日国6 URL</th>
                  <td>
                    <Link
                      href={result.nikkoku6_url as string}
                      target="_blank"
                      className="link link-hover"
                    >
                      {result.nikkoku6_url}
                    </Link>
                  </td>
                </tr>
              </>
            )}
            {result.nikkoku7_entry && result.nikkoku7_url && (
              <>
                <tr>
                  <th>日国7</th>
                  <td>{result.nikkoku7_entry}</td>
                </tr>
                <tr>
                  <th>日国7 URL</th>
                  <td>
                    <Link
                      href={result.nikkoku7_url as string}
                      target="_blank"
                      className="link link-hover"
                    >
                      {result.nikkoku7_url}
                    </Link>
                  </td>
                </tr>
              </>
            )}
            {result.nikkoku8_entry && result.nikkoku8_url && (
              <>
                <tr>
                  <th>日国8</th>
                  <td>{result.nikkoku8_entry}</td>
                </tr>
                <tr>
                  <th>日国8 URL</th>
                  <td>
                    <Link
                      href={result.nikkoku8_url as string}
                      target="_blank"
                      className="link link-hover"
                    >
                      {result.nikkoku8_url}
                    </Link>
                  </td>
                </tr>
              </>
            )}
        

            <tr>
              <th>備考</th>
              <td>{result.remark}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="divider"></div>
      <h2 className="text-xl font-bold py-4">画像</h2>
      <div>
        <IiifViewer manifestUrl={gallicaManifest} page={page - 1} />
      </div>
    </div>
  );
}

export default RacvyoxvItemPage;
