import BunmeibonManaul from "@/markdown/BunmeibonManual.mdx";
import Shikouban from "@/components/ui/Shikouban";
async function BunmeiPage() {
  return (
    <div className="px-4 pb-8">
      <Shikouban />

      <article className="max-w-none prose mx-auto p-4">
        <BunmeibonManaul />
      </article>
    </div>
  );
}

export default BunmeiPage;
