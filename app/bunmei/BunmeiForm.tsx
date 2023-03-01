"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import FormTextInput from "../../components/common/FormTextInput";

const mon = [
  "天地",
  "家屋",
  "時節",
  "草木",
  "神祇",
  "人倫",
  "人名",
  "官位",
  "気形",
  "支体",
  "飲食",
  "絹布",
  "器財",
  "光彩",
  "数量",
  "態藝",
];

function BunmeiForm() {

  // ID;
  // 語頭記号;
  const [gotou, setGotou] = useState("");
  // 見出し語;
  const [entry, setEntry] = useState("");
  // 見出し語原表記;
  const [entryOriginal, setEntryOriginal] = useState("");
  // 語形;
  const [gokei, setGokei] = useState("");
  // 語形原表記;
  const [gokeiOriginal, setGokeiOriginal] = useState("");
  // 声点;
  const [shouten, setShouten] = useState("");
  // 左傍訓;
  const [leftWakun, setLeftWakun] = useState("");
  // 注;
  const [def, setDef] = useState("");
  // 項目種別;
  const [itemType, setItemType] = useState("");
  // 部;
  const [bu, setBu] = useState("");
  // 門;
  const [mon, setMon] = useState("");
  // ページ数;
  const [page, setPage] = useState("");
  // 行数;
  const [line, setLine] = useState("");
  // リンク;
  // 備考;

  const params = {
    entry,
    gokei,
    shouten,
    leftWakun,
    def,
    gotou,
    // entryOriginal,
    // gokeiOriginal,
    itemType,
    bu,
    mon,
    page,
    line,
  };

  const notEmptyQuery = Object.fromEntries(
    Object.entries(params).filter(([_, v]) => v != "")
  );
  const query = new URLSearchParams(notEmptyQuery);

  const router = useRouter();

  function handleSearchBtn() {
    router.push(`/bunmei/results?${query}`);
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
        labelLeftUppon="見出し語の語形（右傍）"
        labelRightBottom="カタカナ（仮名遣いは原本通り）"
        inputValue={gokei}
        getInputValue={setGokei}
      />


      <FormTextInput
        labelLeftUppon="音訓（左傍）"
        labelRightBottom="カタカナ（原表記）"
        inputValue={leftWakun}
        getInputValue={setLeftWakun}
      />


      <FormTextInput
        labelLeftUppon="声点"
        labelRightBottom="平、東、上、去、入、○（○はなし）"
        inputValue={shouten}
        getInputValue={setShouten}
      />

      <div className="divider"></div>

      <FormTextInput
        labelLeftUppon="注文"
        labelRightBottom="カタカナまたは漢字"
        inputValue={def}
        getInputValue={setDef}
      />

      <div className="pt-6 form-control w-full max-w-xs flex flex-col items-center justify-center">
        <button className="btn btn-wide btn-primary" onClick={handleSearchBtn}>
          検索
        </button>
      </div>
    </div>
  );
}

export default BunmeiForm;
