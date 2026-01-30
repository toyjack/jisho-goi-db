import HzwmManual from "@/content/manuals/hzwm.mdx";

export function generateMetadata() {
  return {
    title: '本草和名データベース',
    description: '本草和名データベースの使用説明書',
  };
}

export default function HzwmPage() {
  return (
    <div className="px-4 pb-8">
      <HzwmManual />
    </div>
  );
}
