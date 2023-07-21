import IiifViewer from "@/components/iiif/Viewer";
import { hzwmFindOneById } from "@/db/hzwm"

async function HzwmItemPage({params}:{params: {id: string}}) {
  const result = await hzwmFindOneById(params.id)
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

      <div>
        <h2>Image View</h2>
        <p>on working</p>
        <IiifViewer
          manifestUrl={"https://dl.ndl.go.jp/api/iiif/2555536/manifest.json"}
          page={Number(1)}
        />
      </div>
    </div>
  );
}

export default HzwmItemPage