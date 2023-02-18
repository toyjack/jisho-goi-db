import React from "react";
import BackButton from "@/components/common/BackButton";
// https://portal.kojisho.com/api/v1/gyokuhentaizen/1_50b_2_2
async function getData(id: string) {
  const url = `https://portal.kojisho.com/api/v1/gyokuhentaizen/${id}`;
  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("データが見つかりませんでした。");
  }

  return res.json();
}

async function GyokuhentaizenItemPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const result = await getData(id);

  function getLocation(ghtz_id: string) {
    const [maki, page, line, num_in_line] = ghtz_id.split("_");
    const tyo = page.slice(0, -1);
    const uraomote = page.slice(-1) == "a" ? "表" : "裏";
    return `巻${maki}、${tyo}丁${uraomote}、${line}行${num_in_line}字目`;
  }

  function getWord(wordStr: string) {
    if (wordStr == "") return;
    return wordStr.split("；").map((word) => {
      return (
        <span key={word} className="px-2 mx-1 badge badge-lg badge-primary">
          {word}
        </span>
      );
    });
  }
  return (
    <div className="p-4">
      <div className="p-2">
        <BackButton />
      </div>
      <div className="text-xl">
        <p>
          辞書内ID：<span className="font-bold">{result.ghtz_id}</span>
        </p>
        <h2>
          掲出字：
          <span className="kbd">{result.entry}</span>
        </h2>
        <p>
          部首：<span className="font-bold">{result.radical}</span>
        </p>
        <p>
          残り画数：<span className="font-bold">{result.remain_strokes}</span>
        </p>
        <p>
          所在：<span className="font-bold">{getLocation(result.ghtz_id)}</span>
        </p>
        <p>
          字音（右）：
          <span className="font-bold">{getWord(result.jion_r || "")}</span>
        </p>
        <p>
          字音（左）：
          <span className="font-bold">{getWord(result.jion_l || "")}</span>
        </p>
        <p>
          和訓：<span className="font-bold">{getWord(result.wakun || "")}</span>
        </p>
      </div>
      <div className="divider"></div>
      画像
    </div>
  );
}

export default GyokuhentaizenItemPage;
