import BunmeibonManaul from "@/markdown/BunmeibonManual.mdx";

function BunmeiResultLayout({children}: {children: React.ReactNode}) {
  return (
    <div className="md:p-4">
      {children}

      <div className="divider">
        <h4>本データベースについて</h4>
      </div>

      <article className="max-w-none prose mx-auto p-4">
        <BunmeibonManaul />
      </article>
    </div>
  )
}

export default BunmeiResultLayout