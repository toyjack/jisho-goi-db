import BunmeiManual from "@/content/manuals/bunmei.mdx";

export function generateMetadata() {
  return {
    title: '文明本節用集',
    description: '文明本節用集データベースの使用説明書',
  };
}

function BunmeiPage() {
  return (
    <div className="prose max-w-none px-4 pb-8">
      <BunmeiManual />
    </div>
  );
}

export default BunmeiPage;
