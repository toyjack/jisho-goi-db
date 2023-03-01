import Shikouban from "@/components/ui/Shikouban";
import Manual from "@/markdown/WakunnosioriManual.mdx";
export default function WakunnosioriPage() {
   return (
     <div className="px-4 pb-8">
       <Shikouban />

       <article className="max-w-none prose mx-auto p-4">
         <Manual />
       </article>
     </div>
   );
}
