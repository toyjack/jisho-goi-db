import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React from "react";

import shukaiPoster from "/public/images/202409a.jpg";
import shukaiPoster2 from "/public/images/202409b.jpg";
import posterJp01 from "/public/images/202409-jp01.jpg"
import posterJp02 from "/public/images/202409-jp02.jpg"
import posterJp03 from "/public/images/202409-jp03.jpg"
import posterEnd from "/public/images/202409-end.jpg"

export default function Shukai202409() {
  const posters = [shukaiPoster, shukaiPoster2
    , posterJp01, posterJp02, posterJp03, posterEnd
  ]
  const posterItem= (image:StaticImageData) => {
    return (
      <div className="carousel-item">
            <Link href={image.src} target="_blank">
              <Image
                src={image}
                className="max-w-sm rounded-lg shadow-2xl"
                alt="poster"
              />
            </Link>
          </div>)
  }
  return (
    <div className="hero min-h-screen bg-base-100">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="carousel carousel-center bg-neutral rounded-box max-w-md space-x-4 p-4">
          {posters.map(posterItem)}
        </div>
        <div>
          <h1 className="text-5xl font-bold">
            シンポジウム <br />
            「字典・詞典の研究―回顧と展望―」
          </h1>
          <p className="py-6">
            開催日:{" "}
            <span className="text-red-600 font-bold">
              2024年9月19日（木）10:00～18:25
              ／9月20日（金）10:00～18:15（いずれも日本時間）
            </span>
            <br />
            開催地: 【オンライン】Zoom　【現地】清華大学　（参加無料）
            <br />
            お問い合わせ: a4.ohshima[atmark]gmail.com
          </p>

          <div className="grid grid-cols-2 gap-4">
            <Link
              href="https://forms.office.com/r/Qp5q3Q8M7a"
              className="btn btn-error"
              target={"_blank"}
            >
              参加申し込み（日本語）
            </Link>
            <Link
              href="https://forms.office.com/r/siM8qYmfAt"
              className="btn btn-info"
              target={"_blank"}
            >
              申请参会（中文）
            </Link>
          </div>
          <div className="pt-4 grid grid-cols-2 gap-4">
            <a href={"/pdf/202409-poster-jp.pdf"} download className="btn btn-outline btn-error">チラシをダウンロード</a>
            <a href={"/pdf/202409-poster-cn.pdf"} download className="btn btn-outline btn-info">中文版海报下载</a>
          </div>
        </div>
      </div>
    </div>
  );
}
