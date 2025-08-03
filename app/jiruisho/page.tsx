import JiruishoManual from "@/content/manuals/jiruisho.mdx";

export function generateMetadata() {
  return {
    title: '三巻本色葉字類抄',
    description: '三巻本色葉字類抄データベースの使用説明書',
  };
}

function JiruishoPage() {
  return (
    <div className="px-4 pb-8">
      <JiruishoManual />
    </div>
  );
}

export default JiruishoPage;
