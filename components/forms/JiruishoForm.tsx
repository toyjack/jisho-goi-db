"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import FormTextInput from "../common/FormTextInput";

function JiruishoForm() {
  const [entry, setEntry] = useState("");
  const [shouten, setShouten] = useState("");
  const [hen, setHen] = useState("");
  const [bu, setBu] = useState("");
  const [onkun, setOnkun] = useState("");
  const [charCount, setCharCount] = useState("");
  const [gokeiCurrent , setGokeiCurrent] = useState("");
  const [gokeiOriginal, setGokeiOriginal] = useState("");
  const [defination, setDefination] = useState("");

  const params = {
    entry,
    gokei_search_current: gokeiCurrent,
    gokei_search_original: gokeiOriginal,
    defination,
    shouten,
    hen,
    bu,
    onkun,
    char_count: charCount,
  };
  const query = new URLSearchParams(params);

  const router = useRouter();

  function handleSearchBtn() {
    router.push(`/jiruisho/results?${query}`);
  }

  return (
    <div>
      <FormTextInput
        labelLeftUppon="見出し語"
        labelRightBottom="漢字"
        inputValue={entry}
        getInputValue={setEntry}
      />
      <FormTextInput
        labelLeftUppon="語形（現代仮名遣い）"
        labelRightBottom="カタカナ"
        inputValue={gokeiCurrent}
        getInputValue={setGokeiCurrent}
      />
      <FormTextInput
        labelLeftUppon="語形（原表記）"
        labelRightBottom="カタカナ"
        inputValue={gokeiOriginal}
        getInputValue={setGokeiOriginal}
      />

      <FormTextInput
        labelLeftUppon="註文"
        labelRightBottom="カタカナまたは漢字"
        inputValue={defination}
        getInputValue={setDefination}
      />

      <div className="divider"></div>

      <FormTextInput
        labelLeftUppon="声点"
        labelRightBottom="..."
        inputValue={shouten}
        getInputValue={setShouten}
      />

      <FormTextInput
        labelLeftUppon="篇"
        labelRightBottom="カタカナ"
        inputValue={hen}
        getInputValue={setHen}
      />

      <FormTextInput
        labelLeftUppon="部"
        labelRightBottom="漢字"
        inputValue={bu}
        getInputValue={setBu}
      />

      <FormTextInput
        labelLeftUppon="音訓"
        labelRightBottom="「音」または「訓」"
        inputValue={onkun}
        getInputValue={setOnkun}
      />

      <FormTextInput
        labelLeftUppon="字数"
        labelRightBottom="アラビア数字"
        inputValue={charCount}
        getInputValue={setCharCount}
      />

      <div className="pt-6 form-control w-full max-w-xs flex flex-col items-center justify-center">
        <button className="btn btn-wide btn-primary" onClick={handleSearchBtn}>
          検索
        </button>
      </div>
    </div>
  );
}

export default JiruishoForm;
