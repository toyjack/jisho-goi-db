import { hzwmFindMany } from "@/db/hzwm";
import { Hzwm } from "@prisma/client";
import Link from "next/link";

async function HzwmResultsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const findManyResult = await hzwmFindMany(
    searchParams as unknown as Partial<Hzwm>
  );
  return (
    <>
      <div className="divider">
        <h2>検索結果：{findManyResult.count}件</h2>
      </div>

      <div className="relative overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>所在</th>
              <th>掲出字</th>
              <th>和名</th>
              <th>本文</th>
            </tr>
          </thead>
          <tbody>
            {findManyResult.data.map((item: Hzwm, index: number) => (
              <tr key={item.id}>
                <th>{index + 1}</th>
                <th>{item.location}</th>
                <td>
                  <Link href={"/hzwm/" + item.id} className="kbd">
                    {item.entry}
                  </Link>
                </td>
                <td>{item.readings}</td>
                <td>{item.definition}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default HzwmResultsPage;
