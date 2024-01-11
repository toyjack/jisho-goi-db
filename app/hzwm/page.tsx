import TinaManualComponent from "@/components/tina/manual";
import { client } from "@/tina/__generated__/client";

export default async function HzwmPage() {
  const result = await client.queries.manual({
    relativePath: "hzwm.mdx",
  });

  return (
    <div className="px-4 pb-8">
      <TinaManualComponent {...result} />
    </div>
  );
}
