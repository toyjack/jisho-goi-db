import TinaManualComponent from "@/components/tina/manual";
import client from "@/tina/__generated__/client";

async function JiruishoPage() {
  const result = await client.queries.manual({
    relativePath: "jiruisho.mdx",
  });

  return (
    <div className="px-4 pb-8">
      <TinaManualComponent {...result} />
    </div>
  );
}

export default JiruishoPage;
