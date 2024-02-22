import Image from "next/image";
import Link from "next/link";
import shukaiPoster from "/public/images/forum2024-1.jpg";

function Shukai2024Section() {
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
            フォーラム <br />
            古辞書・漢字音とデータベース2024
          </h1>
          <p className="py-6">
            開催日: <span className="text-red-600 font-bold">2024年3月10日（日）13:00～16:30 （北京時間CST）</span> <br />
            開催地: 【オンライン】Zoom　【現地】清華大学文南楼116　（参加無料）） <br />
            お問い合わせ: liuguanwei2013[atmark]gmail.com
          </p>
          <Link
            href="https://forms.office.com/r/KESQnWXqW8"
            className="btn btn-primary "
            target={"_blank"}
          >
            参加申し込み
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Shukai2024Section