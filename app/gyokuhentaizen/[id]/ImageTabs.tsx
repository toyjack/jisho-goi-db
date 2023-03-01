"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import IiifViewer from "@/components/iiif/Viewer";

function getWasedaPageUrl(ghtz_id: string) {
  const [maki, page, line, num_in_line] = ghtz_id.split("_");
  const wasedaMaki = String(Number(maki)).padStart(4, "0");
  const wasedaPage = String(Number(page.slice(0, -1)) + 1).padStart(4, "0");
  // https://archive.wul.waseda.ac.jp/kosho/bunko31/bunko31_e0853/bunko31_e0853_0001/bunko31_e0853_0001_p0026.jpg
  // https://archive.wul.waseda.ac.jp/kosho/bunko31/bunko31_e0853/bunko31_e0853_0002/bunko31_e0853_0002_p0002.jpg
  return `https://archive.wul.waseda.ac.jp/kosho/bunko31/bunko31_e0853/bunko31_e0853_${wasedaMaki}/bunko31_e0853_${wasedaMaki}_p${wasedaPage}.jpg`;
}

function getNdlImageUrl(ghtz_id: string) {
  const [maki, page, line, num_in_line] = ghtz_id.split("_");
  // https://dl.ndl.go.jp/api/iiif/3440912/R0000003/full/full/0/default.jpg
  // 25 -3 = 22
  const ndlPage = String(Number(page.slice(0, -1)) - 22).padStart(7, "0");
  return `https://dl.ndl.go.jp/api/iiif/3440912/R${ndlPage}/full/full/0/default.jpg`;
}

function getNdlPageUrl(ghtz_id: string) {
  const [maki, page, line, num_in_line] = ghtz_id.split("_");
  // https://dl.ndl.go.jp/pid/3440912/1/3
  const ndlPage = String(Number(page.slice(0, -1)) - 22).padStart(7, "0");

  return `https://dl.ndl.go.jp/pid/3440912/1/${ndlPage}`;
}
// http://localhost:3000/images/gyokuhentaizen/vol_2/1_25a.png
function getFujimotoImageUrl(ghtz_id: string) {
  const [maki, page, line, num_in_line] = ghtz_id.split("_");
  const fujimotoMaki = String(Number(maki) + 1);
  return `/images/gyokuhentaizen/vol_${fujimotoMaki}/${maki}_${page}.png`;
}

function GyokuhentaizenImageTabs({ ghtz_id }: { ghtz_id: string }) {
  const [activeTab, setActiveTab] = useState(0);

  const [maki, page, line, num_in_line] = ghtz_id.split("_");
  // https://dl.ndl.go.jp/pid/3440912/1/3
  const ndlPage = String(Number(page.slice(0, -1)) - 22).padStart(7, "0");

  const tabList = ["NDL", "底本（早稲田）", "藤本"];

  const imageWidth = 600;
  const imageHeight = 400;

  const Tabs = () => {
    return (
      <div className="tabs">
        {tabList.map((tab, index) => {
          return (
            <a
              key={index}
              className={`tab tab-lifted ${
                index == activeTab ? "tab-active" : ""
              }`}
              onClick={() => setActiveTab(index)}
            >
              {tab}
            </a>
          );
        })}
      </div>
    );
  };

  const wasedaMetas = [
    {
      label: "所蔵・公開",
      text: "早稲田大学図書館　古典籍総合データベース",
      url: "https://www.wul.waseda.ac.jp/kotenseki/index.html",
    },
    { label: "画像ファイル", text: getWasedaPageUrl(ghtz_id), url: getWasedaPageUrl(ghtz_id) },
    {
      label: "巻ページ",
      text: "https://archive.wul.waseda.ac.jp/kosho/bunko31/bunko31_e0853/bunko31_e0853_0001/bunko31_e0853_0001.html",
      url: "https://archive.wul.waseda.ac.jp/kosho/bunko31/bunko31_e0853/bunko31_e0853_0001/bunko31_e0853_0001.html",
    },
    {
      label: "底本",
      text: "https://www.wul.waseda.ac.jp/kotenseki/html/bunko31/bunko31_e0853/index.html",
      url: "https://www.wul.waseda.ac.jp/kotenseki/html/bunko31/bunko31_e0853/index.html",
    },
    {
      label: "利用事項",
      text: "https://www.waseda.jp/library/user/using-images/",
      url: "https://www.waseda.jp/library/user/using-images/",
    },
  ];

  const ndlMetas = [
    {
      label: "所蔵・公開",
      text: "国立国会図書館デジタルコレクション",
      url: "https://dl.ndl.go.jp/",
    },
    {
      label: "画像ファイル",
      text: getNdlImageUrl(ghtz_id),
      url: getNdlImageUrl(ghtz_id),
    },
    {
      label: "巻ページ",
      text: "https://dl.ndl.go.jp/pid/3440912/1/3",
      url: "https://dl.ndl.go.jp/pid/3440912/1/3",
    },
    {
      label: "利用事項",
      text: "https://www.ndl.go.jp/jp/use/",
      url: "https://www.ndl.go.jp/jp/use/",
    },
  ];

  const fujimotoMetas = [
    {
      label: "所蔵・公開",
      text: "藤本灯",
      url: "#",
    },
    {
      label: "画像ファイル",
      text: getFujimotoImageUrl(ghtz_id),
      url: getFujimotoImageUrl(ghtz_id),
    },
    {
      label: "巻ページ",
      text: "",
      url: "#",
    },
    {
      label: "利用事項",
      text: "",
      url: "#",
    },
  ];

  const ImageMetaTable = ({
    metas,
  }: {
    metas: { label: string; text: string; url:string }[];
  }) => {
    return (
      <div className="overflow-x-auto pt-4">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>URL</th>
            </tr>
          </thead>
          <tbody>
            {metas.map((meta, index) => {
              return (
                <tr key={index}>
                  <th>{meta.label}</th>
                  <td>
                    <Link
                      href={meta.url}
                      className="link link-hover"
                      target="_blank"
                    >
                      {meta.text}
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  const TabPanels = () => {
    return (
      <div className="h-full">
        {/* NDL */}
        {activeTab === 0 && (
          <IiifViewer
            manifestUrl={"https://dl.ndl.go.jp/api/iiif/3440912/manifest.json"}
            page={Number(ndlPage)}
          />
        )}
        <div className={`tab-panel h-full ${activeTab === 0 ? "block" : "hidden"}`}>
          {/* <Link href={getNdlPageUrl(ghtz_id)} target="_blank" className="link">
            <Image
              src={getNdlImageUrl(ghtz_id)}
              alt="ndl"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
              width={imageWidth}
              height={imageHeight}
            />
          </Link> */}

          <ImageMetaTable metas={ndlMetas} />
        </div>

        {/* 早稲田本 */}
        <div className={`tab-panel ${activeTab === 1 ? "block" : "hidden"}`}>
          <Link
            href={getWasedaPageUrl(ghtz_id)}
            target="_blank"
            className="link"
          >
            <Image
              src={getWasedaPageUrl(ghtz_id)}
              alt="waseda"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
              width={imageWidth}
              height={imageHeight}
            />
          </Link>

          <ImageMetaTable metas={wasedaMetas} />
        </div>

        {/* 藤本 */}
        <div className={`tab-panel ${activeTab === 2 ? "block" : "hidden"}`}>
          <Link
            href={getFujimotoImageUrl(ghtz_id)}
            target="_blank"
            className="link"
          >
            <Image
              src={getFujimotoImageUrl(ghtz_id)}
              alt="fujimoto"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
              width={imageWidth}
              height={imageHeight}
            />
          </Link>

          <ImageMetaTable metas={fujimotoMetas} />
        </div>
      </div>
    );
  };

  return (
    <div>
      <Tabs />

      <TabPanels />
    </div>
  );
}

export default GyokuhentaizenImageTabs;
