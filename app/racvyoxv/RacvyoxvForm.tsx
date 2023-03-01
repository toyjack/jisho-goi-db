"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import FormTextInput from "../../components/common/FormTextInput";

function RacvyoxvForm() {
  const [term, setTerm] = useState("");
  const  [kanjiPairLength, setKanjiPairLength] = useState("");
  

  let params = {
    term,
    kanji_pair_length: kanjiPairLength,
  };

  const notEmptyQuery = Object.fromEntries(
    Object.entries(params).filter(([_, v]) => v != "")
  );

  const query = new URLSearchParams(notEmptyQuery);

  const router = useRouter();

  function handleSearchBtn() {
    router.push(`/racvyoxv/results?${query}`);
  }

  return (
    <div>
      <FormTextInput
        labelLeftUppon="見出し語"
        labelRightBottom="ひらがなまたは漢字"
        inputValue={term}
        getInputValue={setTerm}
      />

      <FormTextInput
        labelLeftUppon="熟語字数"
        labelRightBottom="アラビア数字"
        inputValue={kanjiPairLength}
        getInputValue={setKanjiPairLength}
      />
      
      <div className="pt-6 form-control w-full max-w-xs flex flex-col items-center justify-center">
        <button className="btn btn-wide btn-primary" onClick={handleSearchBtn}>
          検索
        </button>
      </div>
    </div>
  );
}

export default RacvyoxvForm;
