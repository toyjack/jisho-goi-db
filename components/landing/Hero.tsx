import React from "react";

function Hero() {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: `url("https://kokugo.l.u-tokyo.ac.jp/data/renrinoume/001/jpg/rrum001-003.jpg")`,
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-base-100">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">辞書語彙データベース</h1>
          <p className="mb-5">
            科研費プロジェクト：
            『色葉字類抄』の語彙研究および総合データベースの構築
            異種古辞書間におけるデータ連携モデルの構築
          </p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
