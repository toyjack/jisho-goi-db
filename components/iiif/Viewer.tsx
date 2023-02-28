"use client";
import Script from "next/script";

export default function IiifViewer({manifestUrl, page}:{manifestUrl: string, page?: number}){
  return (
    <>
      <div id="uv" 
      style={{height:600}}
      ></div>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/tify@0.28.1/dist/tify.css"
      />
      <Script src="https://cdn.jsdelivr.net/npm/tify@0.28.1/dist/tify.js" 
        onLoad={() => {
          // @ts-ignore
          new Tify({
            container: "#uv",
            manifestUrl: manifestUrl,
            pages: [page || 1],
          });
        }}
      />
    </>
  );
}