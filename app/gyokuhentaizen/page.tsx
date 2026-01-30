import GyokuhentaizenManual from "@/content/manuals/gyokuhentaizen.mdx";

export function generateMetadata() {
  return {
    title: '玉篇大全',
    description: '増続大広益会玉篇大全データベースの使用説明書',
  };
}

function GyokuhentaizenPage() {
  return (
    <div className="px-4 pb-8">
      <GyokuhentaizenManual />
    </div>
  );
}

export default GyokuhentaizenPage;
