import GyokuhentaizenManual from "@/markdown/GyokuhentaizenManual.mdx";

function GyokuhentaizenResultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="md:p-4">
      {children}

      <div className="divider">
        <h4>本データベースについて</h4>
      </div>

      <article className="max-w-none prose mx-auto p-4">
        <GyokuhentaizenManual />
      </article>
    </div>
  );
}

export default GyokuhentaizenResultLayout;
