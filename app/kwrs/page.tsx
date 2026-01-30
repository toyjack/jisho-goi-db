import KwrsManual from "@/content/manuals/kwrs.mdx";

export function generateMetadata() {
  return {
    title: '古活字版和名類聚抄',
    description: '古活字版和名類聚抄データベースの使用説明書',
  };
}

function WamyoshoHome() {
  return (
    <div className="px-4 pb-8">
      <KwrsManual />
    </div>
  );
}

export default WamyoshoHome;
