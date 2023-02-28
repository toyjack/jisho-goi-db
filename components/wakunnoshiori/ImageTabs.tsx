"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import IiifViewer from "../iiif/Viewer";

export default function WakunoshioriImageTabs({location,ndl_url}:{location:string, ndl_url:string}) {
  const [activeTab, setActiveTab] = useState(0);
  const tabList = ["NDL", "藤本"];

  const fujimotoImage = `/images/wakunnoshiori/wakunnoshiori_a/wakunnoshiori-${location}.png`;
  const [_, __, ___, ____, ndlId, _____, page] = ndl_url.split("/");
  const ndlIiifurl = `https://dl.ndl.go.jp/api/iiif/${ndlId}/manifest.json`;

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

  return (
    <>
      <Tabs />

      <div>
        <div className={`tab-panel ${activeTab === 0 ? "block" : "hidden"}`}>
          <IiifViewer manifestUrl={ndlIiifurl} page={Number(page) || 1} />

        </div>
        <div className={`tab-panel ${activeTab === 1 ? "block" : "hidden"}`}>
          <div className="text-base-content font-bold">藤本灯所蔵画像</div>
          <Link href={fujimotoImage}>
            <Image src={fujimotoImage} alt="画像" width={300} height={300} />
          </Link>
        </div>
      </div>
    </>
  );
}
