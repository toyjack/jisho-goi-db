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
              href={"https://kaken.nii.ac.jp/ja/grant/KAKENHI-PROJECT-25K21858"}
              target="_blank"
            >
              辞書語彙と文章語彙の重なりについての通時的研究（科研費25K21858）
            </Link>
            <Link
              className="link link-hover"
              href={"https://kaken.nii.ac.jp/ja/grant/KAKENHI-PROJECT-25K00466"}
              target="_blank"
            >
              古辞書コーパスの構築―通時語彙検索の実現を目指して―（科研費25K00466）
            </Link>
            <Link
              className="link link-hover"
              href={"https://kaken.nii.ac.jp/ja/grant/KAKENHI-PROJECT-24K16080"}
              target="_blank"
            >
              日本古辞書ポータルサイトの開発による公開研究資源の高度利用（科研費24K16080）
            </Link>
            <span className="text">
              「清华大学大学自主科研计画文科專项经费·基研究專项(W01)《色叶字类抄》为中心的日本古辞书研究与数据库建设」（2023THZWJC31·藤本灯）
            </span>
            、
            <Link
              className="link link-hover"
              href={"https://kaken.nii.ac.jp/ja/grant/KAKENHI-PROJECT-23K20465"}
              target="_blank"
            >
              『色葉字類抄』の語彙研究および総合データベースの構築（科研費23K20465、21H00529）
            </Link>
            、
            <Link
              className="link link-hover"
              href={"https://kaken.nii.ac.jp/ja/grant/KAKENHI-PROJECT-21K18364"}
              target="_blank"
            >
              異種古辞書間におけるデータ連携モデルの構築（科研費21K18364）
            </Link>
            、
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
