"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import FormTextInput from "../common/FormTextInput";

function RacvyoxvForm() {
  const [entry, setEntry] = useState("");
  const [ruby, setRuby] = useState("");
  const [page, setPage] = useState("");
  const [ line, setLine ] = useState("");
  const [initialOn, setInitialOn] = useState("");
  const [kanjiPair, setKanjiPair] = useState("");
  const [remark, setRemark] = useState("");
  const [groupEntry, setGroupEntry] = useState("");

  let params = {
    entry,
    ruby,
    page,
    line,
    initial_on:initialOn,
    kanji_pair:kanjiPair,
    remark,
    group_entry:groupEntry,
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
        labelLeftUppon="頭文字"
        labelRightBottom="ひらがな・1文字"
        inputValue={initialOn}
        getInputValue={setInitialOn}
      />
      <FormTextInput
        labelLeftUppon="見出し語"
        labelRightBottom="漢字"
        inputValue={entry}
        getInputValue={setEntry}
      />
      <FormTextInput
        labelLeftUppon="ルビー"
        labelRightBottom="ひらがな"
        inputValue={ruby}
        getInputValue={setRuby}
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
