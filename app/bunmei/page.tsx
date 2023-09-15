import ManualMarkdown from "@/components/markdown/manual-markdown";
import { prisma } from "@/lib/prisma";
async function BunmeiPage() {
  const manual = await prisma.dBManual.findUnique({
    where: { name: "bunmeibon" },
  });
  return (
    <div className="px-4 pb-8">
      <ManualMarkdown markdownData={manual?.article as string} />
    </div>
  );
}

export default BunmeiPage;
