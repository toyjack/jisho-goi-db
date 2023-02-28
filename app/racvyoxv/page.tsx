import Shikouban from "@/components/common/Shikouban";
import RacvyoxvManual from "@/markdown/RacvyoxvManual.mdx"

function RacvyoxvPage() {
  return (
    <div className="px-4 pb-8">
      <Shikouban />

      <article className="max-w-none prose mx-auto p-4">
        <RacvyoxvManual />
      </article>
    </div>
  );
}

export default RacvyoxvPage;