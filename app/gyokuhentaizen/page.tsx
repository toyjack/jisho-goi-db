import GyokuhentaizenManual from "@/markdown/GyokuhentaizenManual.mdx";
import Shikouban from "@/components/common/Shikouban";

function GyokuhentaizenPage() {
  return (
    <div className="px-4 pb-8">
      <Shikouban />

      <article className="max-w-none prose mx-auto p-4">
        <GyokuhentaizenManual />
      </article>
    </div>
  );
}

export default GyokuhentaizenPage;
