import { prisma } from "@/lib/prisma";
import React from "react";
import ResultTable from "../ResultTable";

async function JiruishoChushakuResultsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string };
}) {
  const results = await prisma.jiruishoChushaku.findMany({
    where: {
      jiruisho:{
        entry:{
          contains: searchParams?.entry,
        }
      },
      annotation: {
        contains: searchParams?.annotation,
      },
    },
    include: {
      jiruisho: true,
    },
  });

  return (
    <div>
      <ResultTable data={results} />
    </div>
  );
}

export default JiruishoChushakuResultsPage;
