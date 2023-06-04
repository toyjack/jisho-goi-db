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
              <th>読み</th>
              <td>{result?.readings}</td>
            </tr>
            <tr>
              <th>本文</th>
              <td>{result?.definition}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>Image</div>
    </div>
  );
}

export default HzwmItemPage