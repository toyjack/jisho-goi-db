import TinaManualComponent from "@/components/tina/manual";
import client from "@/tina/__generated__/client";

async function BunmeiPage() {
  const result = await client.queries.manual({
    relativePath: "bunmei.mdx",
  });

  return (
    <div className="prose max-w-none px-4 pb-8">
      <TinaManualComponent {...result} />
    </div>
  );
}

export default BunmeiPage;
