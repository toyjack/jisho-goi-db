import Script from "next/script";

function GalleryRootPage() {
  return (
    <>
      <Script src="https://jpsearch.go.jp/assets/js/wp.bundle.js"></Script>
      <div
        className="jps"
        data-lang="ja"
        data-cur="eyJpZCI6IjEzajF4YWVhNzNnYzAiLCJ0aXRsZSI6eyJqYSI6IuODhuOCueODiCJ9LCJjdXJhdGlvblR5cGUiOiJOT1RFIiwicGFydHMiOlt7InR5cGUiOiJqcHMtY3VyYXRpb24tdGV4dCIsImphIjp7Im9wcyI6W3siaW5zZXJ0IjoiXG4ifV19LCJlbiI6eyJvcHMiOlt7Imluc2VydCI6IlxuIn1dfSwiY3BpZCI6ImhtN3A3b2N3eSJ9LHsiY3BpZCI6Ind5d3VnaHNvOCIsInR5cGUiOiJqcHMtY3VyYXRpb24tbGlzdCIsInZpZXdUeXBlIjoiYnVsbGV0IiwiY3NJZCI6Impwcy1jcm9zcyIsIm9wZW5BY3Rpb25UeXBlIjoibW9kYWwiLCJwYXJ0cyI6W3siaWQiOiJkaWdubC0yNTQzNzA1IiwiY3BpZCI6IjhvMmkwM3I2diIsInR5cGUiOiJqcHMtY3VyYXRpb24tbGlzdC1pdGVtIiwiaW1hZ2UiOnsiaW1nVHlwZSI6IklJSUYiLCJtYW5pZmVzdFVybCI6Imh0dHBzOi8vd3d3LmRsLm5kbC5nby5qcC9hcGkvaWlpZi8yNTQzNzA1L21hbmlmZXN0Lmpzb24iLCJpbmZvSnNvblVybCI6Imh0dHBzOi8vZGwubmRsLmdvLmpwL2FwaS9paWlmLzI1NDM3MDUvUjAwMDAwMDEvaW5mby5qc29uIn0sIm5vdGUiOnsiamEiOnsib3BzIjpbeyJpbnNlcnQiOiJcbiJ9XX0sImVuIjp7Im9wcyI6W3siaW5zZXJ0IjoiXG4ifV19fX1dfV19"
      ></div>
    </>
  );
}

export default GalleryRootPage;
