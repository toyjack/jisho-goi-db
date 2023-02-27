import BackButton from "@/components/common/BackButton";
import Link from "next/link";

async function getData(id: string) {
  const url = `${process.env.API_ROOT}/api/racvyoxv/${id}`;

  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("データが見つかりませんでした。");
  }

  return res.json();
}

const tableHeader = [
  "page",
  "line",
  "initial_on",
  "entry",
  "kanji_pair",
  "ruby_left_first",
  "ruby_left_remains",
  "ruby_right_first",
  "ruby_right_remains",
  "remark",
  "group_entry",
  "gallica",
];

async function RacvyoxvItemPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const result = await getData(id);

  console.log(result)

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
            {tableHeader.map((header, index) => (
              <tr key={index}>
                <th>{header}</th>
                <td>{result[header]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RacvyoxvItemPage;
