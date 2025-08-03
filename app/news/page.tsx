import Shukai2023 from "@/components/landing/Shukai";
import Shukai202201Section from "@/components/landing/Shukai-2022";
import Shukai2024Section from "@/components/landing/Shukai-2024";
import Shukai202409 from "@/components/landing/Shukai-202409";

export function generateMetadata() {
  return {
    title: 'お知らせ',
    description: '辞書語彙データベースの最新お知らせ',
  };
}

function NewsPage() {
  return (
    <>
      <Shukai202409 />
      <div className="divider"></div>
      <Shukai2024Section />
      <div className="divider"></div>
      <Shukai2023 />
      <div className="divider"></div>
      <Shukai202201Section />
    </>
  );
}

export default NewsPage