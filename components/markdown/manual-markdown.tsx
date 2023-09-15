import { prisma } from "@/lib/prisma";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

async function ManualMarkdown({markdownData}:{markdownData: string}) {
  const licenseMarkdown = await prisma.dBManual.findUnique({
    where: { name: "cclicense" },
  });
  const generalMarkdown = await prisma.dBManual.findUnique({
    where: { name: "general" },
  });

  return (
      <article className="max-w-none prose mx-auto p-4">
        {/* @ts-ignore */}
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>
          {markdownData}
        </ReactMarkdown>
        {/* @ts-ignore */}
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>
          {generalMarkdown?.article as string}
        </ReactMarkdown>
        {/* @ts-ignore */}
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>
          {licenseMarkdown?.article as string}
        </ReactMarkdown>
      </article>
  );
}

export default ManualMarkdown;
