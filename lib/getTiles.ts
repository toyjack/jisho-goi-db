import { Manifest } from "@iiif/presentation-2";

export async function getTiles(manifestUrl: string) {
  const manifest = await fetch(manifestUrl);
  const manifestJson = (await manifest.json()) as Manifest;

  const tiles = manifestJson.sequences
    .map((sequence) =>
      sequence.canvases.map((canvas) =>
        canvas.images.map(
          // @ts-ignore
          (image) => image.resource.service["@id"] + "/info.json"
        )
      )
    )
    .flat()
    .flat();

  return tiles;
}
