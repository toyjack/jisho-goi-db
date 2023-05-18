import Osd from "./Osd";
import { Manifest, Collection } from "@iiif/presentation-2";

type Props = {
  manifestUrl: string;
  page?: number;
};



export default async function IiifViewer({ manifestUrl, page }: Props) {
  const manifestData = await fetch(manifestUrl);
  const manifest = (await manifestData.json()) as Manifest;

  // const tiles = manifest.sequences[0].map((canvas:any)=>{
  //   return canvas.images[0].resource.service["@id"]+"/info.json"
  // })

  const tiles = manifest.sequences.map((sequence) =>
    sequence.canvases.map((canvas) =>
      canvas.images.map((image) => image.resource.service["@id"]+"/info.json")
    )
  ).flat().flat();
  return (
    <>
      {/* <div>
        <pre>{JSON.stringify(tiles, null, 2)}</pre>
      </div> */}
      <Osd tiles={tiles} />
    </>
  );
}
