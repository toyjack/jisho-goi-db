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
      word_in_kurokawa: {
        contains: searchParams?.word_in_kurokawa || undefined,
      },

      word_in_maeda: {
        contains: searchParams?.word_in_maeda || undefined,
      },

      annotation: {
        contains: searchParams?.annotation || undefined,
      },
    },
  });

  return (
    <div>
      <ResultTable data={results} />
    </div>
  );
}

export default JiruishoChushakuResultsPage;
