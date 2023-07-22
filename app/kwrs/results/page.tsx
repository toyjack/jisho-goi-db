import { KwrsWhere, kwrsFindmany } from "@/db/kwrs";
import {  Wamyouruijyusho } from "@prisma/client";
import Link from "next/link";

async function KwrsResultsPage({ searchParams }: { searchParams: KwrsWhere }) {
  const findManyResult = await kwrsFindmany(searchParams);
  return (
    <div className="md:p-4 w-full">
      <div className="divider">
        <h2>検索結果：{findManyResult.count}件</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>巻</th>
              <th>部</th>
              <th>類・具・国郡等</th>
              <th></th>
              <th>所在</th>
              <th>見出し語</th>
              <th>注文</th>
            </tr>
          </thead>
          <tbody>
            {findManyResult.data.map((item: Wamyouruijyusho, index: number) => (
              <tr key={item.id}>
                <th>{index + 1}</th>
                <td>{item.maki}</td>
                <td>{item.bu}</td>
                <td>{item.type}</td>
                <td>{item.type2}</td>
                <th>{item.page}</th>
                <td>
                  <Link href={"/kwrs/" + item.id} className="kbd">
                    {item.entry}
                  </Link>
                </td>

                <td>{item.definition}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default KwrsResultsPage;
