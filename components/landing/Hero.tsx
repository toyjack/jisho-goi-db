import Link from "next/link";
import React from "react";

function Hero() {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: `url("/images/hero-bg.png")`,
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-base-100">
        <div className="max-w-lg">
          <h1 className="mb-5 text-5xl font-bold">辞書語彙データベース</h1>
          <p className="mb-5">
            <Link
              className="link link-hover"
              href={"https://kaken.nii.ac.jp/ja/grant/KAKENHI-PROJECT-21H00529"}
              target="_blank"
            >
              『色葉字類抄』の語彙研究および総合データベースの構築（科研費21H00529）
            </Link>
            、 
            <Link
              className="link link-hover"
              href={"https://kaken.nii.ac.jp/ja/grant/KAKENHI-PROJECT-21K18364"}
              target="_blank"
            >
              異種古辞書間におけるデータ連携モデルの構築（科研費21K18364）
            </Link>、
            <Link
              className="link link-hover"
              href={"https://www.inamori-f.or.jp/inamori_grants_list/2021"}
              target="_blank"
            >
              日本初の国語辞書『色葉字類抄』に採録された漢籍出典語彙の院政期における使用状況（2021年度稲盛研究助成）
            </Link>
          </p>
          <a className="btn btn-primary" href="#databases">
            データベース一覧
          </a>
        </div>
      </div>
    </div>
  );
}

export default Hero;
