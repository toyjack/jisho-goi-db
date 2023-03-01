"use client";
// @ts-nocheck
import { useEffect } from "react";
// @ts-ignore
import mirador from "mirador";

export default function IiifViewer({manifestUrl, page}:{manifestUrl: string, page?: number}){
  useEffect(() => {
    mirador.viewer({
      id: "iiif-viewer",
      language: "ja",
      window: {
        allowClose: false,
        defaultSideBarPanel: "attribution",
        sideBarOpenByDefault: false,
        allowFullscreen: true,
        allowMaximize: false,
      },
      windows: [
        {
          manifestId: manifestUrl,
          canvasIndex: page || 1,
        },
      ],
      workspaceControlPanel: {
        enabled: false, // Remove extra workspace settings
      },
    });
  }, [manifestUrl, page]);

  return (
    <div className="relative h-96">
      <div id="iiif-viewer" />
    </div>
  );
}