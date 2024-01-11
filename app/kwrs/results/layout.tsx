import TinaManualComponent from "@/components/tina/manual";
import client from "@/tina/__generated__/client";

async function layout({ children }: { children: React.ReactNode }) {
  const result = await client.queries.manual({
    relativePath: "hzwm.mdx",
  });
  
  return (
    <div className="md:p-4">
      {children}

      <div className="divider">
        <h4>本データベースについて</h4>
      </div>
      <div className="px-4 pb-8">
        <TinaManualComponent {...result} />
      </div>
    </div>
  );
}

export default layout;
