import Image from "next/image";
import Link from "next/link";
import shukaiPoster from "/public/images/2022-1.png";

function Shukai202201Section() {
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
            シンポジウム <br />
            古辞書・漢字音研究と人文情報学
          </h1>
          <p className="py-6">
            開催日: <span className="text-red-600 font-bold">2022年3月10日</span> <br />
            開催地: 【オンライン】Zoom　（参加無料） <br />
            お問い合わせ: liuguanwei2013[atmark]gmail.com
          </p>
          
        </div>
      </div>
    </div>
  );
}

export default Shukai202201Section