"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import FormTextInput from "../../components/common/FormTextInput";

export default function WakunnosioriForm() {
  const [entry, setEntry] = useState("");
  const [defination, setDefination] = useState("");

  let params = {
    entry,
    defination,
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
        inputValue={defination}
        getInputValue={setDefination}
      />

      <div className="pt-6 form-control w-full max-w-xs flex flex-col items-center justify-center">
        <button className="btn btn-wide btn-primary" onClick={handleSearchBtn}>
          検索
        </button>
      </div>
    </div>
  );
}
