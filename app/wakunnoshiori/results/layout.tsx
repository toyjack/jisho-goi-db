import Manual from "@/markdown/WakunnosioriManual.mdx";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="md:p-4">
      {children}

      <div className="divider">
        <h4>本データベースについて</h4>
      </div>
      <article className="max-w-none prose mx-auto p-4">
        <Manual />
      </article>
    </div>
  );
}

export default layout;
