import BackButton from "@/components/ui/BackButton";
import GyokuhentaizenImageTabs from "@/app/gyokuhentaizen/[id]/ImageTabs";
import { gyokuhentaizenFindOne } from "@/db/gyokuhentaizen";

function getLocation(ghtz_id: string) {
  const [maki, page, line, num_in_line] = ghtz_id.split("_");
  const tyo = page.slice(0, -1);
  const uraomote = page.slice(-1) == "a" ? "表" : "裏";
  return `巻${maki}、${tyo}丁${uraomote}、${line}行${num_in_line}字目`;
}

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

async function GyokuhentaizenItemPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const result = await gyokuhentaizenFindOne(id);

  if (!result) return <>error</>;

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
              <td>{result.ghtz_id}</td>
            </tr>
            <tr>
              <th>掲出字</th>
              <td>{result.entry}</td>
            </tr>
            {result.ids && (
              <tr>
                <th>掲出字IDS</th>
                <td>{result.ids}</td>
              </tr>
            )}
            <tr>
              <th>部首</th>
              <td>{result.radical}</td>
            </tr>
            <tr>
              <th>残り画数</th>
              <td>{result.remain_strokes}</td>
            </tr>
            <tr>
              <th>所在</th>
              <td>{getLocation(result.ghtz_id)}</td>
            </tr>
            <tr>
              <th>字音（右）</th>
              <td>{getWord(result.jion_r || "")}</td>
            </tr>
            <tr>
              <th>字音（左）</th>
              <td>{getWord(result.jion_l || "")}</td>
            </tr>
            <tr>
              <th>和訓</th>
              <td>{getWord(result.wakun || "")}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="divider py-4"></div>
      <h2 className="text-xl font-bold py-4">画像</h2>
      <GyokuhentaizenImageTabs ghtz_id={result.ghtz_id} />
    </div>
  );
}

export default GyokuhentaizenItemPage;
