import Shikouban from '@/components/ui/Shikouban';
import HzwmManual from '@/markdown/HzwmManual.mdx';

function HzwmPage() {
 return (
   <div className="px-4 pb-8">
     <Shikouban />

     <article className="max-w-none prose mx-auto p-4">
       <HzwmManual />
     </article>
   </div>
 );
}

export default HzwmPage