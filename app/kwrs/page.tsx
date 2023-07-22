import Shikouban from '@/components/ui/Shikouban'
import KwrsManual from '@/markdown/KwrsManual.mdx'

function WamyoshoHome() {
  return (
    <div className="px-4 pb-8">
      <Shikouban />

      <article className="max-w-none prose mx-auto p-4">
        <KwrsManual />
      </article>
    </div>
  )
}

export default WamyoshoHome