import TinaManualComponent from "@/components/tina/manual";
import client from "@/tina/__generated__/client";

async function RacvyoxvResultLayout({ children }: { children: React.ReactNode }) {
  const result = await client.queries.manual({
    relativePath: "racvyoxv.mdx",
  });

  return (
    <div className="md:p-4">
      {children}

      <div className="divider">
        <h4>本データベースについて</h4>
      </div>
      <article className="max-w-none prose mx-auto p-4">
        <div className="px-4 pb-8">
          <TinaManualComponent {...result} />
        </div>
      </article>
    </div>
  );
}

export default RacvyoxvResultLayout;
