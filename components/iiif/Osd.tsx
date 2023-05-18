"use client"
import OpenSeadragon, { Options } from "openseadragon";
import { useEffect } from "react";

export interface OsdProps {
  tiles: string[];
}
function Osd({tiles}: OsdProps) {
  const randomId = Math.random().toString(36).substring(7);

  const options: Options = {
    sequenceMode: true,
    id: randomId,
    tileSources: tiles,
  };

  useEffect(() => {
    const viewer = OpenSeadragon(options);
    return () => {
      viewer.destroy();
    };
  }, [options]);


  return (
    <>
      <div>OSD</div>
      <div>
        <div id={randomId} className="w-full h-full z-0 relative"></div>
      </div>
    </>
  );
}

export default Osd