"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import FormTextInput from "../common/FormTextInput";

export default function WakunnosioriForm() {
  const [entry, setEntry] = useState("");
  const [definition, setDefinition] = useState("");

  let params = {
    entry,
    definition,
  };

  const notEmptyQuery = Object.fromEntries(
    Object.entries(params).filter(([_, v]) => v != "")
  );

  const query = new URLSearchParams(notEmptyQuery);

  const router = useRouter();

  function handleSearchBtn() {
    router.push(`/wakunnoshiori/results?${query}`);
  }

  return (
    <div>
      <FormTextInput
        labelLeftUppon="見出し語"
        labelRightBottom="ひらがな"
        inputValue={entry}
        getInputValue={setEntry}
      />

      <FormTextInput
        labelLeftUppon="語釈"
        labelRightBottom="ひらがなまたは漢字"
        inputValue={definition}
        getInputValue={setDefinition}
      />

      <div className="pt-6 form-control w-full max-w-xs flex flex-col items-center justify-center">
        <button className="btn btn-wide btn-primary" onClick={handleSearchBtn}>
          検索
        </button>
      </div>
    </div>
  );
}
