"use client";
import OpenSeadragon from "openseadragon";
import { useEffect } from "react";

function Osd({
  manifestUrl,
  page = 0,
  className="w-full h-96",
}: {
  manifestUrl: string[];
  page?: number;
  className?: string;
}) {
  const randomId = Math.random().toString(32).substring(2);
  useEffect(() => {
    const viewer = OpenSeadragon({
      id: randomId,
      prefixUrl: "https://openseadragon.github.io/openseadragon/images/",
      tileSources: manifestUrl,
      sequenceMode: true,
      initialPage: page,
      showReferenceStrip: true,
      showNavigator: true,
      showRotationControl: true,
      showHomeControl: true,
      showFullPageControl: true,
      showSequenceControl: true,
      showZoomControl: true,
      showFlipControl: true,
    });
    return () => {
      viewer.destroy();
    };
  }, [manifestUrl, page, randomId]);
  return (
    <div>
      <div className={className} id={randomId}>
        Osd
      </div>
    </div>
  );
}

export default Osd;
