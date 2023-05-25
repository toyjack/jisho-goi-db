"use client";

import Osd from "./Osd";
import { useEffect, useState } from "react";
import { getTiles } from "@/lib/getTiles";

type Props = {
  manifestUrl: string;
  page?: number;
};

export default function IiifViewer({ manifestUrl, page }: Props) {
  const [tiles, setTiles] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const newTiles = await getTiles(manifestUrl);
      setTiles(newTiles);
    })();
  }, [manifestUrl]);

  return (
    <div className="w-full">
      <Osd manifestUrl={tiles} page={page} />
    </div>
  );
}
