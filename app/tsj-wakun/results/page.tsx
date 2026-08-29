import { NO_QUERY_MESSAGE, searchTsjWakun, TsjWakunResultRow, TsjWakunSearchParams } from "@/db/tsj_wakun";
import Link from "next/link";

async function TsjWakunResultsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const { data, error } = await searchTsjWakun(
    (searchParams ?? {}) as TsjWakunSearchParams
  );

  if (error && error.message === NO_QUERY_MESSAGE) {
    return (
      <div className="p-4">
        <div className="alert alert-info">
          <span>{NO_QUERY_MESSAGE}</span>
        </div>
      </div>
    );
  }

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
              <th>見出し語（天治本）</th>
              <th>和訓（天治本）</th>
              <th>和訓（天治本万葉仮名）</th>
              <th>見出し語（享和本）</th>
              <th>新撰字鏡校注所在</th>
            </tr>
          </thead>
          <tbody>
            {results.map((item: TsjWakunResultRow, index: number) => (
              <tr key={item.wakunId}>
                <th>{index + 1}</th>
                <td>{item.wakunId}</td>
                <td>
                  <Link href={"/tsj-wakun/" + item.recordId} className="kbd">
                    {item.entryText}
                  </Link>
                </td>
                <td>{item.readingKanaKanji}</td>
                <td>{item.definitionManyogana}</td>
                <td>{item.kyowaEntryText}</td>
                <td>{item.rinsenLocation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TsjWakunResultsPage;
