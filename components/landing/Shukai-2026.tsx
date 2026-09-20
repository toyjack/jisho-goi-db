import Image from "next/image";
import Link from "next/link";
import shukaiPoster from "/public/images/poster-20260911.png";

function Shukai2026Section() {
  return (
    <div className="hero min-h-screen bg-base-100">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <Link href={shukaiPoster.src} target="_blank">
          <Image
            src={shukaiPoster}
            className="max-w-sm rounded-lg shadow-2xl"
            alt="poster-2026"
          />
        </Link>
        <div>
          <h1 className="text-5xl font-bold">
            研究集会 <br />
            「日本語研究の構想—辞書・音義・漢字音—」
          </h1>
          <p className="py-6">
            開催日: <span className="text-red-600 font-bold">2026年9月11日（金）13:00-18:00 </span> <br />
            開催地: 文南楼116室（対面のみ） <br />
            お問い合わせ: akari[atmark]tsinghua.edu.cn <br />
            共催：清華大学外文系、公益財団法人古代学協会、名古屋大学人文学研究科、名古屋大学高等研究院、Tokai Pathways to Global Excellence（T-GEx）
          </p>
          <p className="py-3">
            発表レポート：<Link href="/pdf/20260911学会レポート.pdf" className="link link-info link-hover">ダウンロード</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Shukai2026Section