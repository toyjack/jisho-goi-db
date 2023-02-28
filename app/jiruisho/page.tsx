import Shikouban from "@/components/common/Shikouban";
import JiruishoManual from "@/markdown/JiruishoManual.mdx";

function JiruishoPage() {
  return (
    <div className="px-4 pb-8">
      <Shikouban />

      <article className="max-w-none prose mx-auto p-4">
        <JiruishoManual />
      </article>
    </div>
  );
}

export default JiruishoPage;
