import Image from "next/image";
import Link from "next/link";
import React from "react";

import shukaiPoster from "/public/images/202409a.jpg";
import shukaiPoster2 from "/public/images/202409b.jpg";

export default function Shukai202409() {
  return (
    <div className="hero min-h-screen bg-base-100">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="carousel carousel-center bg-neutral rounded-box max-w-md space-x-4 p-4">
          <div className="carousel-item">
            <Link href={shukaiPoster.src} target="_blank">
              <Image
                src={shukaiPoster}
                className="max-w-sm rounded-lg shadow-2xl"
                alt="poster-2022"
              />
            </Link>
          </div>
          <div className="carousel-item">
            <Link href={shukaiPoster2.src} target="_blank">
              <Image
                src={shukaiPoster2}
                className="max-w-sm rounded-lg shadow-2xl"
                alt="poster-2022"
              />
            </Link>
          </div>
        </div>
        <div>
          <h1 className="text-5xl font-bold">
            シンポジウム <br />
            「字典・詞典の研究―回顧と展望―」
          </h1>
          <p className="py-6">
            開催日:{" "}
            <span className="text-red-600 font-bold">
            2024年9月19日（木）10:00～18:25 ／9月20日（金）10:00～18:15（いずれも日本時間）
            </span>
            <br />
            開催地: 【オンライン】Zoom　【現地】清華大学　（参加無料）
            <br />
            お問い合わせ: a4.ohshima[atmark]gmail.com
          </p>
          

          <div className="flex flex-row flex-wrap gap-4">
          <Link
            href="https://forms.office.com/r/Qp5q3Q8M7a"
            className="btn btn-primary basis-1/3"
            target={"_blank"}
          >
            参加申し込み（日本語）
          </Link>
          <Link
            href="https://forms.office.com/r/siM8qYmfAt"
            className="btn btn-info basis-1/3"
            target={"_blank"}
          >
            申请参会（中文）
          </Link>
          </div>

          
        </div>
      </div>
    </div>
  );
}
