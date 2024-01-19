import TinaManualComponent from "@/components/tina/manual";
import client from "@/tina/__generated__/client";
export default async function WakunnosioriPage() {
  const result = await client.queries.manual({
    relativePath: "wakunnoshiori.mdx",
  });
  return (
    <div className="px-4 pb-8">
      <TinaManualComponent {...result} />
    </div>
  );
}
