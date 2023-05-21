"use client"
import dynamic from "next/dynamic";
import  OpenSeadragon,{ Options } from "openseadragon";
import { useEffect, useState } from "react";

export interface OsdProps {
  tiles: string[];
}
function Osd({tiles}: OsdProps) {

  const randomId = Math.random().toString(36).substring(7);
  const [viewer, setViewer]= useState<OpenSeadragon.Viewer | null>(null);

  const initViewer = () => {
    viewer && viewer.destroy();
    setViewer(OpenSeadragon({
      id: randomId,
      sequenceMode: true,
      // tileSources: tiles,
    }))
  }

  useEffect(() => {
    initViewer();
    return () => {
      viewer?.destroy();
    };
  }, [])

  return (
    <>
      <div id={randomId} className="w-full h-96 relative bg-inherit"></div>
      <pre>{JSON.stringify(tiles, null, 2)}</pre>
    </>
  );
}

export default Osd