import { Jiruisho } from "@prisma/client";
import Link from "next/link";
import React from "react";

function TargePanel({ result }: { result: Jiruisho }) {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>篇</th>
            <th>部</th>
            <th>見出し語</th>
            <th>註文</th>
            <th>項目URL</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{result.hen}</td>
            <td>{result.bu}</td>
            <td>{result.entry}</td>
            <td>{result.definition}</td>
            <td>
              <Link
                href={`/jiruisho/${result.id}`}
                className="text-blue-500 hover:underline"
              >
                {`/jiruisho/${result.id}`}
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default TargePanel;
