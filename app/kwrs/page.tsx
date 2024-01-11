import TinaManualComponent from '@/components/tina/manual';
import Shikouban from '@/components/ui/Shikouban'
import KwrsManual from '@/markdown/KwrsManual.mdx'
import client from '@/tina/__generated__/client';

async function WamyoshoHome() {
  let result = await client.queries.manual({
    relativePath: "kwrs.mdx",
  });

  return (
    <div className="px-4 pb-8">
      <TinaManualComponent {...result} />
    </div>
    // <div className="px-4 pb-8">
    //   <Shikouban />

    //   <article className="max-w-none prose mx-auto p-4">
    //     <KwrsManual />
    //   </article>
    // </div>
  )
}

export default WamyoshoHome