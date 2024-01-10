import TinaManualComponent from "@/components/tina/manual";
import { client } from "@/tina/__generated__/client";

export default async function HzwmPage() {
  let result = await client.queries.manual({
    relativePath: "hzwm.mdx",
  });

  result = JSON.parse(JSON.stringify(result));

  return (
    <div className="px-4 pb-8">
      <TinaManualComponent {...result} />
    </div>
  );
}
