import { prisma } from "@/lib/prisma";
import ResultTable from "./ResultTable";

export const revalidate = 0

async function JiruishoChushakuHome() {
  const allData = await prisma.jiruishoChushaku.findMany({
    include: {
      jiruisho: true,
    },
  });
  return (
    <div>
      <ResultTable data={allData} />
    </div>
  );
}

export default JiruishoChushakuHome;
