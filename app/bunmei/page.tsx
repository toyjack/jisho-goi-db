import ManualMarkdown from "@/markdown/BunmeibonManual.mdx";
async function BunmeiPage() {

  return (
    <div className="prose max-w-none px-4 pb-8">
      <ManualMarkdown />
    </div>
  );
}

export default BunmeiPage;
