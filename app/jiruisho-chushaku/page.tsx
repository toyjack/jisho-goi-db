import React from "react";
import ResultTable from "./ResultTable";
import { getAllItems } from "./actions";

async function JiruishoChushakuHome() {
  const allData = await getAllItems();
  return (
    <div>
      <ResultTable data={allData} />
    </div>
  );
}

export default JiruishoChushakuHome;
