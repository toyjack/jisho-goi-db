import Image from "next/image";
import Link from "next/link";
import shukaiPoster from "/public/images/2022kenkyukai.png";

function ShukaiSection() {
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
            古辞書・漢字音研究とデータベース2022
          </h1>
          <p className="py-6">
            開催日: <span className="text-red-600 font-bold">2023 年 3月 4 日（土）9:45～17:00</span> <br />
            開催地: ZOOMによるリモート開催（参加無料） <br />
            お問い合わせ: liuguanwei2013[atmark]gmail.com
          </p>
          <Link
            href="https://forms.office.com/r/53e51hfaN2"
            className="btn btn-primary"
            target={"_blank"}
          >
            参加申し込み
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ShukaiSection