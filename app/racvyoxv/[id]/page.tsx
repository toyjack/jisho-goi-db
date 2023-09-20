import IiifViewer from "@/components/iiif/Viewer";
import BackButton from "@/components/ui/BackButton";
import { racvyoxvFindOne } from "@/db/racvyoxv";
import Link from "next/link";

const tableHeader = [
  { label: "ID", field: "id" },
  { label: "代表字頭記号", field: "group_entry" },
  { label: "所在（笠間頁）", field: "page" },
  { label: "頁内行数", field: "line" },
  { label: "Gallica URL", field: "gallica" },
  { label: "頭音", field: "initial_on" },
  { label: "代表字", field: "entry" },
  { label: "熟語", field: "kanji_pair" },
  { label: "訓（左傍）", field: "ruby_left_first" },
  { label: "訓（左傍）", field: "ruby_left_remains" },
  { label: "音（右傍）", field: "ruby_right_first" },
  { label: "音（右傍）", field: "ruby_right_remains" },
  { label: "備考", field: "remark" },
  { label: "日国", field: "nikkoku1_entry" },
  { label: "日国URL", field: "nikkoku1_url" },
  // { label: "日国1", field: "nikkoku1_entry" },
  // { label: "日国1 URL", field: "nikkoku1_url" },
  // { label: "日国2", field: "nikkoku2_entry" },
  // { label: "日国2 URL", field: "nikkoku2_url" },
  // { label: "日国3", field: "nikkoku3_entry" },
  // { label: "日国3 URL", field: "nikkoku3_url" },
  // { label: "日国4", field: "nikkoku4_entry" },
  // { label: "日国4 URL", field: "nikkoku4_url" },
  // { label: "日国5", field: "nikkoku5_entry" },
  // { label: "日国5 URL", field: "nikkoku5_url" },
  // { label: "日国6", field: "nikkoku6_entry" },
  // { label: "日国6 URL", field: "nikkoku6_url" },
  // { label: "日国7", field: "nikkoku7_entry" },
  // { label: "日国7 URL", field: "nikkoku7_url" },
];

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
              <th>辞書内ID（仮）</th>
              <td>{result.id}</td>
            </tr>
            <tr>
              <th>代表字頭記号</th>
              <td>{result.group_entry}</td>
            </tr>
            <tr>
              <th>部</th>
              <td>{result.initial_on}</td>
            </tr>
            <tr>
              <th>代表字</th>
              <td>{result.entry}</td>
            </tr>
            <tr>
              <th>熟語</th>
              <td>{result.kanji_pair}</td>
            </tr>
            <tr>
              <th>訓（左傍）</th>
              <td>{result.ruby_left_first}</td>
            </tr>
            <tr>
              <th>訓（左傍）</th>
              <td>{result.ruby_left_remains}</td>
            </tr>
            <tr>
              <th>音（右傍）</th>
              <td>{result.ruby_right_first}</td>
            </tr>
            <tr>
              <th>音（右傍）</th>
              <td>{result.ruby_right_remains}</td>
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
                  href={result.nikkoku1_url as string}
                  target="_blank"
                  className="link link-hover"
                >
                  {result.nikkoku1_url}
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

      <div className="divider"></div>
      <h2 className="text-xl font-bold py-4">画像</h2>
      <div>
        <IiifViewer manifestUrl={gallicaManifest} page={page - 1} />
      </div>
    </div>
  );
}

export default RacvyoxvItemPage;
