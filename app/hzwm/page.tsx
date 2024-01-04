import Blocks from "@/components/tina/blocks";
import { client } from "@/tina/__generated__/client";

export default async function HzwmPage() {
  let result = await client.queries.manual({
    relativePath: "hzwm.md",
  });

  if (result.errors) {
    return (
      <div>
        {result.errors.map((error) => {
          return <div key={error.message}>{error.message}</div>;
        })}
      </div>
    );
  }

  result = JSON.parse(JSON.stringify(result));

  return (
    <div className="px-4 pb-8">
      <Blocks {...result} />
    </div>
  );
}
