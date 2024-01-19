import client from "@/tina/__generated__/client";
import TinaManualComponent from "@/components/tina/manual";

async function GyokuhentaizenPage() {
  const result = await client.queries.manual({
    relativePath: "gyokuhentaizen.mdx",
  });
  return (
    <div className="px-4 pb-8">
      <TinaManualComponent {...result} />
    </div>
  );
}

export default GyokuhentaizenPage;
