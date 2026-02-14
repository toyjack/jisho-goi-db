import { searchTsjWakun } from "@/db/tsj_wakun";
import { Database } from "@/lib/supabase/type";
import Link from "next/link";

type TsjWakunRow = Database["public"]["Tables"]["tsj_wakun"]["Row"];

async function TsjWakunResultsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const { data, error } = await searchTsjWakun(
    searchParams as unknown as Partial<TsjWakunRow>
  );

  if (error) {
    return (
      <div className="p-4">
        <div className="alert alert-error">
          <span>検索中にエラーが発生しました: {error.message}</span>
        </div>
      </div>
    );
  }

  const results = data || [];

  return (
    <>
      <div className="divider">
        <h2>検索結果：{results.length}件</h2>
      </div>

      <div className="relative overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>ID</th>
              <th>見出し語</th>
              <th>読み</th>
              <th>万葉仮名</th>
              <th>享和本見出し</th>
              <th>所在</th>
            </tr>
          </thead>
          <tbody>
            {results.map((item: TsjWakunRow, index: number) => (
              <tr key={item.sj_w_id}>
                <th>{index + 1}</th>
                <td>{item.sj_w_id}</td>
                <td>
                  <Link href={"/tsj-wakun/" + item.sj_w_id} className="kbd">
                    {item.entry_text}
                  </Link>
                </td>
                <td>{item.reading_kana_kanji}</td>
                <td>{item.def_manyogana}</td>
                <td>{item.kyowa_entry_text}</td>
                <td>{item.kyowa_loc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TsjWakunResultsPage;
