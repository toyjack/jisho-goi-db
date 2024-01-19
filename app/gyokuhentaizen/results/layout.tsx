import TinaManualComponent from "@/components/tina/manual";
import client from "@/tina/__generated__/client";

async function GyokuhentaizenResultLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const result = await client.queries.manual({
    relativePath: "gyokuhentaizen.mdx",
  });

  return (
    <div className="md:p-4">
      {children}

      <div className="divider">
        <h4>本データベースについて</h4>
      </div>

      <TinaManualComponent {...result} />
    </div>
  );
}

export default GyokuhentaizenResultLayout;
