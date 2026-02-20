import Image from "next/image";
import Link from "next/link";
import shukaiPoster from "/public/images/shukai-2025.png";

function Shukai2025Section() {
  return (
    <div className="hero min-h-screen bg-base-100">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <Link href={shukaiPoster.src} target="_blank">
          <Image
            src={shukaiPoster}
            className="max-w-sm rounded-lg shadow-2xl"
            alt="poster-2022"
          />
        </Link>
        <div>
          <h1 className="text-5xl font-bold">
            研究集会 <br />
            古辞書・漢字音研究とデータベース2025
          </h1>
          <p className="py-6">
            開催日: <span className="text-red-600 font-bold">2026年3月1日（日）13:00～16:30 </span> <br />
            開催地: 【オンライン】Zoom　 <br />
            参加申込： <Link href={"https://forms.microsoft.com/r/BmUpxquwwp"} className="link link-info link-hover">https://forms.microsoft.com/r/BmUpxquwwp</Link> <br />
            お問い合わせ: akari[atmark]tsinghua.edu.cn
          </p>
        </div>
      </div>
    </div>
  );
}

export default Shukai2025Section