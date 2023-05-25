"use client";

import IiifViewer from "@/components/iiif/Viewer";
import { useState } from "react";

interface ImageData {
  tabTitle: string;
  manifestUrl: string;
  page: number;
}

export default function JiruishoImageTab({ data }: { data: ImageData[] }) {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <>
      <div className="tabs">
        {data.map((tab, index) => (
          <div
            key={index}
            className={`tab tab-lifted ${
              index == activeTab ? "tab-active" : ""
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab.tabTitle}
          </div>
        ))}
      </div>
      <div>
        {data.map((tab, index) => (
          <div
            key={index}
            className={`${activeTab === index ? "block" : "hidden"}`}
          >
            <IiifViewer manifestUrl={tab.manifestUrl} page={tab.page - 1} />
          </div>
        ))}
      </div>
    </>
  );
}
