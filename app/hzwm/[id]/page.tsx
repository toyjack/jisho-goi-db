import IiifViewer from "@/components/iiif/Viewer";
import { hzwmFindOneById } from "@/db/hzwm";
import Link from "next/link";

async function HzwmItemPage({ params }: { params: { id: string } }) {
  const result = await hzwmFindOneById(params.id);
  // HW_A_15a_7_1 -> 15a
  const choAndSide = params.id.split("_")[2];
  const cho = Number(choAndSide.slice(0, -1));
  const side = choAndSide.slice(-1) === "a" ? 0 : 1;
  // for ndl: https://dl.ndl.go.jp/pid/2538099
  const koma = Number(cho) + Number(side) + 11;
  const ndl_web = `https://dl.ndl.go.jp/pid/2538099/1/${String(koma)}`;
  const ndl_manifest = `https://dl.ndl.go.jp/api/iiif/2538099/manifest.json`;
  return (
    <div>
      <div className="max-w-lg">
        <table className="table">
          <tbody>
            <tr>
              <th>所在</th>
              <td>{result?.location}</td>
            </tr>
            <tr>
              <th>見出し</th>
              <td>
                <span className="kbd">{result?.entry}</span>
              </td>
            </tr>
            <tr>
              <th>和名</th>
              <td>{result?.readings}</td>
            </tr>
            <tr>
              <th>本文</th>
              <td>{result?.definition}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="divider">画像</div>

      <div className="flex flex-col gap-4">
        <IiifViewer manifestUrl={ndl_manifest} page={koma - 1} />

        <div className="flex flex-col gap-2">
          <div>
            NDL Web Page:
            <Link href={ndl_web} target="_blank" className="link link-hover">
              {ndl_web}
            </Link>
          </div>
          <div>
            NDL Manifest:
            <Link
              href={ndl_manifest}
              target="_blank"
              className="link link-hover"
            >
              {ndl_manifest}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HzwmItemPage;
