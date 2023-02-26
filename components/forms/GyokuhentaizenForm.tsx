"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

import { radicalList } from "@/utils/radicalList";

import FormTextInput from "../common/FormTextInput";

function GyokuhentaizenForm() {
  const searchParams = useSearchParams();
  const [entry, setEntry] = useState(searchParams.get("entry") || "");
  const [jion, setJion] = useState(searchParams.get("jion") || "");
  const [wakun, setWakun] = useState(searchParams.get("wakun") || "");
  const [radical, setRadical] = useState(searchParams.get("radical") || "");
  const [strokes, setStrokes] = useState(searchParams.get("strokes") || "");
  const [maki, setMaki] = useState(searchParams.get("maki") || "");
  const [tyo, setTyo] = useState(searchParams.get("tyo") || "");

  const params = { entry, jion, wakun, radical, strokes, maki, tyo };
  const query = new URLSearchParams(params);

  const router = useRouter();

  function handleSearchBtn() {
    router.push(`/gyokuhentaizen/results?${query}`);
  }

  function handleDisplayBtn() {}

  return (
    <>
      <FormTextInput
        labelLeftUppon="掲出字"
        labelRightBottom="1文字"
        placeholder="掲出字を入力してください"
        inputValue={entry}
        getInputValue={setEntry}
      />
      <FormTextInput
        labelLeftUppon="字音"
        labelRightBottom="カタカナ／原本の表記"
        placeholder="字音を入力してください"
        inputValue={jion}
        getInputValue={setJion}
      />
      <FormTextInput
        labelLeftUppon="和訓"
        labelRightBottom="カタカナ／原本の表記"
        placeholder="和訓を入力してください"
        inputValue={wakun}
        getInputValue={setWakun}
      />

      <div className="divider"></div>

      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">部首</span>
        </label>
        <select
          className="select select-bordered"
          value={radical}
          onChange={(e) => setRadical(e.target.value)}
        >
          <option disabled value="">
            部首を選択してください
          </option>
          {radicalList.map((radical) => (
            <option value={radical.radical} key={radical.radical}>
              {radical.label}
            </option>
          ))}
        </select>
      </div>

      <FormTextInput
        labelLeftUppon="残画数"
        labelRightBottom="アラビア数字"
        placeholder="残り画数を入力してください"
        inputValue={strokes}
        getInputValue={setStrokes}
      />

      {/* <div className="form-control w-full max-w-xs flex flex-col items-center justify-center pt-6">
        <button className="btn btn-wide" onClick={handleDisplayBtn}>
          表示／絞る
        </button>
      </div> */}

      <div className="divider"></div>

      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">巻</span>
        </label>
        <select
          className="select select-bordered"
          value={maki}
          onChange={(e) => {
            setMaki(e.target.value);
          }}
        >
          <option disabled selected value="" hidden>
            巻を選択してください
          </option>
          {[1].map((maki) => (
            <option value={maki} key={maki}>
              {maki}
            </option>
          ))}
        </select>
      </div>

      <FormTextInput
        labelLeftUppon="丁"
        labelRightBottom="アラビア数字"
        placeholder="丁を入力してください"
        inputValue={tyo}
        getInputValue={setTyo}
      />

      {/* <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">丁</span>
        </label>
        <select className="select select-bordered" ref={remainstrokeRef}>
          <option disabled selected value="default" hidden>
            丁を選択してください
          </option>
          {[0, 1, 2].map((stroke) => (
            <option value={stroke} key={stroke}>
              {stroke}
            </option>
          ))}
        </select>
      </div> */}

      <div className="pt-6 form-control w-full max-w-xs flex flex-col items-center justify-center">
        <button className="btn btn-wide btn-primary" onClick={handleSearchBtn}>
          検索
        </button>
      </div>
    </>
  );
}

export default GyokuhentaizenForm;
