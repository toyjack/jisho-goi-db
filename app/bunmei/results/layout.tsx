import ManualMarkdown from "@/components/markdown/manual-markdown";
import { prisma } from "@/lib/prisma";

async function BunmeiResultLayout({children}: {children: React.ReactNode}) {
  const manual = await prisma.dBManual.findUnique({
    where: { name: "bunmeibon" },
  });

  return (
    <div className="md:p-4">
      {children}

      <div className="divider">
        <h4>本データベースについて</h4>
      </div>

      <ManualMarkdown markdownData={manual?.article as string} />
    </div>
  )
}

export default BunmeiResultLayout