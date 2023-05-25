import { Manifest } from "@iiif/presentation-2";

async function IiifViewer({
  manifestUrl,
  page,
}: {
  manifestUrl: string;
  page?: number;
}) {

  const manifestData =  await fetch(manifestUrl)
  const manifestJson = await manifestData.json() as Manifest;

  const tile = manifestJson.sequences[0].canvases[0].images[0].resource.service["@id"];


  return <div className="flex flex-col">
    {manifestUrl}
    {tile}
    {JSON.stringify(manifestJson)}
  </div>;
}

export default IiifViewer