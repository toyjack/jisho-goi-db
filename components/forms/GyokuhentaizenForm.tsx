'use client';
import {useRef, useState} from 'react'
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const radicalList = [
  {
    radical: "一",
    stroke_count: "1",
    label: "[1画]一",
  },
  {
    radical: "丨",
    stroke_count: "1",
    label: "[1画]丨",
  },
  {
    radical: "丶",
    stroke_count: "1",
    label: "[1画]丶",
  },
  {
    radical: "丿",
    stroke_count: "1",
    label: "[1画]丿",
  },
  {
    radical: "乙",
    stroke_count: "1",
    label: "[1画]乙",
  },
  {
    radical: "亅",
    stroke_count: "1",
    label: "[1画]亅",
  },
  {
    radical: "二",
    stroke_count: "2",
    label: "[2画]二",
  },
  {
    radical: "亠",
    stroke_count: "2",
    label: "[2画]亠",
  },
  {
    radical: "人",
    stroke_count: "2",
    label: "[2画]人",
  },
  {
    radical: "儿",
    stroke_count: "2",
    label: "[2画]儿",
  },
  {
    radical: "入",
    stroke_count: "2",
    label: "[2画]入",
  },
  {
    radical: "八",
    stroke_count: "2",
    label: "[2画]八",
  },
  {
    radical: "冂",
    stroke_count: "2",
    label: "[2画]冂",
  },
  {
    radical: "冖",
    stroke_count: "2",
    label: "[2画]冖",
  },
  {
    radical: "冫",
    stroke_count: "2",
    label: "[2画]冫",
  },
  {
    radical: "几",
    stroke_count: "2",
    label: "[2画]几",
  },
  {
    radical: "凵",
    stroke_count: "2",
    label: "[2画]凵",
  },
  {
    radical: "刀",
    stroke_count: "2",
    label: "[2画]刀",
  },
  {
    radical: "力",
    stroke_count: "2",
    label: "[2画]力",
  },
  {
    radical: "勹",
    stroke_count: "2",
    label: "[2画]勹",
  },
  {
    radical: "匕",
    stroke_count: "2",
    label: "[2画]匕",
  },
  {
    radical: "匚",
    stroke_count: "2",
    label: "[2画]匚",
  },
  {
    radical: "匸",
    stroke_count: "2",
    label: "[2画]匸",
  },
  {
    radical: "十",
    stroke_count: "2",
    label: "[2画]十",
  },
  {
    radical: "卜",
    stroke_count: "2",
    label: "[2画]卜",
  },
  {
    radical: "卩",
    stroke_count: "2",
    label: "[2画]卩",
  },
  {
    radical: "厂",
    stroke_count: "2",
    label: "[2画]厂",
  },
  {
    radical: "厶",
    stroke_count: "2",
    label: "[2画]厶",
  },
  {
    radical: "又",
    stroke_count: "2",
    label: "[2画]又",
  },
  {
    radical: "口",
    stroke_count: "3",
    label: "[3画]口",
  },
  {
    radical: "囗",
    stroke_count: "3",
    label: "[3画]囗",
  },
  {
    radical: "土",
    stroke_count: "3",
    label: "[3画]土",
  },
  {
    radical: "士",
    stroke_count: "3",
    label: "[3画]士",
  },
  {
    radical: "夂",
    stroke_count: "3",
    label: "[3画]夂",
  },
  {
    radical: "夊",
    stroke_count: "3",
    label: "[3画]夊",
  },
  {
    radical: "夕",
    stroke_count: "3",
    label: "[3画]夕",
  },
  {
    radical: "大",
    stroke_count: "3",
    label: "[3画]大",
  },
  {
    radical: "女",
    stroke_count: "3",
    label: "[3画]女",
  },
  {
    radical: "子",
    stroke_count: "3",
    label: "[3画]子",
  },
  {
    radical: "宀",
    stroke_count: "3",
    label: "[3画]宀",
  },
  {
    radical: "寸",
    stroke_count: "3",
    label: "[3画]寸",
  },
  {
    radical: "小",
    stroke_count: "3",
    label: "[3画]小",
  },
  {
    radical: "尢",
    stroke_count: "3",
    label: "[3画]尢",
  },
  {
    radical: "尸",
    stroke_count: "3",
    label: "[3画]尸",
  },
  {
    radical: "屮",
    stroke_count: "3",
    label: "[3画]屮",
  },
  {
    radical: "山",
    stroke_count: "3",
    label: "[3画]山",
  },
  {
    radical: "巛",
    stroke_count: "3",
    label: "[3画]巛",
  },
  {
    radical: "工",
    stroke_count: "3",
    label: "[3画]工",
  },
  {
    radical: "己",
    stroke_count: "3",
    label: "[3画]己",
  },
  {
    radical: "巾",
    stroke_count: "3",
    label: "[3画]巾",
  },
  {
    radical: "干",
    stroke_count: "3",
    label: "[3画]干",
  },
  {
    radical: "幺",
    stroke_count: "3",
    label: "[3画]幺",
  },
  {
    radical: "广",
    stroke_count: "3",
    label: "[3画]广",
  },
  {
    radical: "廴",
    stroke_count: "3",
    label: "[3画]廴",
  },
  {
    radical: "廾",
    stroke_count: "3",
    label: "[3画]廾",
  },
  {
    radical: "弋",
    stroke_count: "3",
    label: "[3画]弋",
  },
  {
    radical: "弓",
    stroke_count: "3",
    label: "[3画]弓",
  },
  {
    radical: "彐",
    stroke_count: "3",
    label: "[3画]彐",
  },
  {
    radical: "彡",
    stroke_count: "3",
    label: "[3画]彡",
  },
  {
    radical: "彳",
    stroke_count: "3",
    label: "[3画]彳",
  },
  {
    radical: "心",
    stroke_count: "4",
    label: "[4画]心",
  },
  {
    radical: "戈",
    stroke_count: "4",
    label: "[4画]戈",
  },
  {
    radical: "戶",
    stroke_count: "4",
    label: "[4画]戶",
  },
  {
    radical: "手",
    stroke_count: "4",
    label: "[4画]手",
  },
  {
    radical: "支",
    stroke_count: "4",
    label: "[4画]支",
  },
  {
    radical: "攴",
    stroke_count: "4",
    label: "[4画]攴",
  },
  {
    radical: "文",
    stroke_count: "4",
    label: "[4画]文",
  },
  {
    radical: "斗",
    stroke_count: "4",
    label: "[4画]斗",
  },
  {
    radical: "斤",
    stroke_count: "4",
    label: "[4画]斤",
  },
  {
    radical: "方",
    stroke_count: "4",
    label: "[4画]方",
  },
  {
    radical: "无",
    stroke_count: "4",
    label: "[4画]无",
  },
  {
    radical: "日",
    stroke_count: "4",
    label: "[4画]日",
  },
  {
    radical: "曰",
    stroke_count: "4",
    label: "[4画]曰",
  },
  {
    radical: "月",
    stroke_count: "4",
    label: "[4画]月",
  },
  {
    radical: "木",
    stroke_count: "4",
    label: "[4画]木",
  },
  {
    radical: "欠",
    stroke_count: "4",
    label: "[4画]欠",
  },
  {
    radical: "止",
    stroke_count: "4",
    label: "[4画]止",
  },
  {
    radical: "歹",
    stroke_count: "4",
    label: "[4画]歹",
  },
  {
    radical: "殳",
    stroke_count: "4",
    label: "[4画]殳",
  },
  {
    radical: "毋",
    stroke_count: "4",
    label: "[4画]毋",
  },
  {
    radical: "比",
    stroke_count: "4",
    label: "[4画]比",
  },
  {
    radical: "毛",
    stroke_count: "4",
    label: "[4画]毛",
  },
  {
    radical: "氏",
    stroke_count: "4",
    label: "[4画]氏",
  },
  {
    radical: "气",
    stroke_count: "4",
    label: "[4画]气",
  },
  {
    radical: "水",
    stroke_count: "4",
    label: "[4画]水",
  },
  {
    radical: "火",
    stroke_count: "4",
    label: "[4画]火",
  },
  {
    radical: "爪",
    stroke_count: "4",
    label: "[4画]爪",
  },
  {
    radical: "父",
    stroke_count: "4",
    label: "[4画]父",
  },
  {
    radical: "爻",
    stroke_count: "4",
    label: "[4画]爻",
  },
  {
    radical: "爿",
    stroke_count: "4",
    label: "[4画]爿",
  },
  {
    radical: "片",
    stroke_count: "4",
    label: "[4画]片",
  },
  {
    radical: "牙",
    stroke_count: "4",
    label: "[4画]牙",
  },
  {
    radical: "牛",
    stroke_count: "4",
    label: "[4画]牛",
  },
  {
    radical: "犬",
    stroke_count: "4",
    label: "[4画]犬",
  },
  {
    radical: "玄",
    stroke_count: "5",
    label: "[5画]玄",
  },
  {
    radical: "玉",
    stroke_count: "5",
    label: "[5画]玉",
  },
  {
    radical: "瓜",
    stroke_count: "5",
    label: "[5画]瓜",
  },
  {
    radical: "瓦",
    stroke_count: "5",
    label: "[5画]瓦",
  },
  {
    radical: "甘",
    stroke_count: "5",
    label: "[5画]甘",
  },
  {
    radical: "生",
    stroke_count: "5",
    label: "[5画]生",
  },
  {
    radical: "用",
    stroke_count: "5",
    label: "[5画]用",
  },
  {
    radical: "田",
    stroke_count: "5",
    label: "[5画]田",
  },
  {
    radical: "疋",
    stroke_count: "5",
    label: "[5画]疋",
  },
  {
    radical: "疒",
    stroke_count: "5",
    label: "[5画]疒",
  },
  {
    radical: "癶",
    stroke_count: "5",
    label: "[5画]癶",
  },
  {
    radical: "白",
    stroke_count: "5",
    label: "[5画]白",
  },
  {
    radical: "皮",
    stroke_count: "5",
    label: "[5画]皮",
  },
  {
    radical: "皿",
    stroke_count: "5",
    label: "[5画]皿",
  },
  {
    radical: "目",
    stroke_count: "5",
    label: "[5画]目",
  },
  {
    radical: "矛",
    stroke_count: "5",
    label: "[5画]矛",
  },
  {
    radical: "矢",
    stroke_count: "5",
    label: "[5画]矢",
  },
  {
    radical: "石",
    stroke_count: "5",
    label: "[5画]石",
  },
  {
    radical: "示",
    stroke_count: "5",
    label: "[5画]示",
  },
  {
    radical: "禸",
    stroke_count: "5",
    label: "[5画]禸",
  },
  {
    radical: "禾",
    stroke_count: "5",
    label: "[5画]禾",
  },
  {
    radical: "穴",
    stroke_count: "5",
    label: "[5画]穴",
  },
  {
    radical: "立",
    stroke_count: "5",
    label: "[5画]立",
  },
  {
    radical: "竹",
    stroke_count: "6",
    label: "[6画]竹",
  },
  {
    radical: "米",
    stroke_count: "6",
    label: "[6画]米",
  },
  {
    radical: "糸",
    stroke_count: "6",
    label: "[6画]糸",
  },
  {
    radical: "缶",
    stroke_count: "6",
    label: "[6画]缶",
  },
  {
    radical: "网",
    stroke_count: "6",
    label: "[6画]网",
  },
  {
    radical: "羊",
    stroke_count: "6",
    label: "[6画]羊",
  },
  {
    radical: "羽",
    stroke_count: "6",
    label: "[6画]羽",
  },
  {
    radical: "老",
    stroke_count: "6",
    label: "[6画]老",
  },
  {
    radical: "而",
    stroke_count: "6",
    label: "[6画]而",
  },
  {
    radical: "耒",
    stroke_count: "6",
    label: "[6画]耒",
  },
  {
    radical: "耳",
    stroke_count: "6",
    label: "[6画]耳",
  },
  {
    radical: "聿",
    stroke_count: "6",
    label: "[6画]聿",
  },
  {
    radical: "肉",
    stroke_count: "6",
    label: "[6画]肉",
  },
  {
    radical: "臣",
    stroke_count: "6",
    label: "[6画]臣",
  },
  {
    radical: "自",
    stroke_count: "6",
    label: "[6画]自",
  },
  {
    radical: "至",
    stroke_count: "6",
    label: "[6画]至",
  },
  {
    radical: "臼",
    stroke_count: "6",
    label: "[6画]臼",
  },
  {
    radical: "舌",
    stroke_count: "6",
    label: "[6画]舌",
  },
  {
    radical: "舛",
    stroke_count: "6",
    label: "[6画]舛",
  },
  {
    radical: "舟",
    stroke_count: "6",
    label: "[6画]舟",
  },
  {
    radical: "艮",
    stroke_count: "6",
    label: "[6画]艮",
  },
  {
    radical: "色",
    stroke_count: "6",
    label: "[6画]色",
  },
  {
    radical: "艸",
    stroke_count: "6",
    label: "[6画]艸",
  },
  {
    radical: "虍",
    stroke_count: "6",
    label: "[6画]虍",
  },
  {
    radical: "虫",
    stroke_count: "6",
    label: "[6画]虫",
  },
  {
    radical: "血",
    stroke_count: "6",
    label: "[6画]血",
  },
  {
    radical: "行",
    stroke_count: "6",
    label: "[6画]行",
  },
  {
    radical: "衣",
    stroke_count: "6",
    label: "[6画]衣",
  },
  {
    radical: "襾",
    stroke_count: "6",
    label: "[6画]襾",
  },
  {
    radical: "見",
    stroke_count: "7",
    label: "[7画]見",
  },
  {
    radical: "角",
    stroke_count: "7",
    label: "[7画]角",
  },
  {
    radical: "言",
    stroke_count: "7",
    label: "[7画]言",
  },
  {
    radical: "谷",
    stroke_count: "7",
    label: "[7画]谷",
  },
  {
    radical: "豆",
    stroke_count: "7",
    label: "[7画]豆",
  },
  {
    radical: "豕",
    stroke_count: "7",
    label: "[7画]豕",
  },
  {
    radical: "豸",
    stroke_count: "7",
    label: "[7画]豸",
  },
  {
    radical: "貝",
    stroke_count: "7",
    label: "[7画]貝",
  },
  {
    radical: "赤",
    stroke_count: "7",
    label: "[7画]赤",
  },
  {
    radical: "走",
    stroke_count: "7",
    label: "[7画]走",
  },
  {
    radical: "足",
    stroke_count: "7",
    label: "[7画]足",
  },
  {
    radical: "身",
    stroke_count: "7",
    label: "[7画]身",
  },
  {
    radical: "車",
    stroke_count: "7",
    label: "[7画]車",
  },
  {
    radical: "辛",
    stroke_count: "7",
    label: "[7画]辛",
  },
  {
    radical: "辰",
    stroke_count: "7",
    label: "[7画]辰",
  },
  {
    radical: "辵",
    stroke_count: "7",
    label: "[7画]辵",
  },
  {
    radical: "邑",
    stroke_count: "7",
    label: "[7画]邑",
  },
  {
    radical: "酉",
    stroke_count: "7",
    label: "[7画]酉",
  },
  {
    radical: "釆",
    stroke_count: "7",
    label: "[7画]釆",
  },
  {
    radical: "里",
    stroke_count: "7",
    label: "[7画]里",
  },
  {
    radical: "金",
    stroke_count: "8",
    label: "[8画]金",
  },
  {
    radical: "長",
    stroke_count: "8",
    label: "[8画]長",
  },
  {
    radical: "門",
    stroke_count: "8",
    label: "[8画]門",
  },
  {
    radical: "阜",
    stroke_count: "8",
    label: "[8画]阜",
  },
  {
    radical: "隶",
    stroke_count: "8",
    label: "[8画]隶",
  },
  {
    radical: "隹",
    stroke_count: "8",
    label: "[8画]隹",
  },
  {
    radical: "雨",
    stroke_count: "8",
    label: "[8画]雨",
  },
  {
    radical: "靑",
    stroke_count: "8",
    label: "[8画]靑",
  },
  {
    radical: "非",
    stroke_count: "8",
    label: "[8画]非",
  },
  {
    radical: "面",
    stroke_count: "9",
    label: "[9画]面",
  },
  {
    radical: "革",
    stroke_count: "9",
    label: "[9画]革",
  },
  {
    radical: "韋",
    stroke_count: "9",
    label: "[9画]韋",
  },
  {
    radical: "韭",
    stroke_count: "9",
    label: "[9画]韭",
  },
  {
    radical: "音",
    stroke_count: "9",
    label: "[9画]音",
  },
  {
    radical: "頁",
    stroke_count: "9",
    label: "[9画]頁",
  },
  {
    radical: "風",
    stroke_count: "9",
    label: "[9画]風",
  },
  {
    radical: "飛",
    stroke_count: "9",
    label: "[9画]飛",
  },
  {
    radical: "食",
    stroke_count: "9",
    label: "[9画]食",
  },
  {
    radical: "首",
    stroke_count: "9",
    label: "[9画]首",
  },
  {
    radical: "香",
    stroke_count: "9",
    label: "[9画]香",
  },
  {
    radical: "馬",
    stroke_count: "10",
    label: "[10画]馬",
  },
  {
    radical: "骨",
    stroke_count: "10",
    label: "[10画]骨",
  },
  {
    radical: "高",
    stroke_count: "10",
    label: "[10画]高",
  },
  {
    radical: "髟",
    stroke_count: "10",
    label: "[10画]髟",
  },
  {
    radical: "鬥",
    stroke_count: "10",
    label: "[10画]鬥",
  },
  {
    radical: "鬯",
    stroke_count: "10",
    label: "[10画]鬯",
  },
  {
    radical: "鬲",
    stroke_count: "10",
    label: "[10画]鬲",
  },
  {
    radical: "鬼",
    stroke_count: "10",
    label: "[10画]鬼",
  },
  {
    radical: "魚",
    stroke_count: "11",
    label: "[11画]魚",
  },
  {
    radical: "鳥",
    stroke_count: "11",
    label: "[11画]鳥",
  },
  {
    radical: "鹵",
    stroke_count: "11",
    label: "[11画]鹵",
  },
  {
    radical: "鹿",
    stroke_count: "11",
    label: "[11画]鹿",
  },
  {
    radical: "麥",
    stroke_count: "11",
    label: "[11画]麥",
  },
  {
    radical: "麻",
    stroke_count: "11",
    label: "[11画]麻",
  },
  {
    radical: "黃",
    stroke_count: "12",
    label: "[12画]黃",
  },
  {
    radical: "黍",
    stroke_count: "12",
    label: "[12画]黍",
  },
  {
    radical: "黑",
    stroke_count: "12",
    label: "[12画]黑",
  },
  {
    radical: "黹",
    stroke_count: "12",
    label: "[12画]黹",
  },
  {
    radical: "黽",
    stroke_count: "13",
    label: "[13画]黽",
  },
  {
    radical: "鼎",
    stroke_count: "13",
    label: "[13画]鼎",
  },
  {
    radical: "鼓",
    stroke_count: "13",
    label: "[13画]鼓",
  },
  {
    radical: "鼠",
    stroke_count: "13",
    label: "[13画]鼠",
  },
  {
    radical: "鼻",
    stroke_count: "14",
    label: "[14画]鼻",
  },
  {
    radical: "齊",
    stroke_count: "14",
    label: "[14画]齊",
  },
  {
    radical: "齒",
    stroke_count: "15",
    label: "[15画]齒",
  },
  {
    radical: "龍",
    stroke_count: "16",
    label: "[16画]龍",
  },
  {
    radical: "龜",
    stroke_count: "16",
    label: "[16画]龜",
  },
  {
    radical: "龠",
    stroke_count: "17",
    label: "[17画]龠",
  },
];

function GyokuhentaizenForm() {
  const searchParams = useSearchParams();
  // TODO: read state from query params
  const entryRef = useRef(null);
  const onkunRef = useRef(null);
  const radicalRef = useRef(null);
  const remainstrokeRef = useRef(null);

  const [entry, setEntry]= useState(searchParams.get("entry") || "");
  const [onkun, setOnkun]= useState(searchParams.get("onkun") || "");

  const router = useRouter();

  function handleSearchBtn(){
    router.push(`/gyokuhentaizen/results?entry=${entryRef.current?.value}&onkun=${onkunRef.current.value}`)
  }

  function handleDisplayBtn(){}

  return (
    <>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">掲出字</span>
          {/* <span className="label-text-alt">Alt label</span> */}
        </label>
        <input
          type="text"
          placeholder="掲出字を入力してください"
          className="input input-bordered w-full max-w-xs"
          ref={entryRef}
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
        />
        <label className="label">
          <span className="label-text-alt"></span>
          <span className="label-text-alt">1文字</span>
        </label>
      </div>

      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">音・訓</span>
          {/* <span className="label-text-alt">Alt label</span> */}
        </label>
        <input
          type="text"
          placeholder="漢字音または和訓を入力してください"
          className="input input-bordered w-full max-w-xs"
          ref={onkunRef}
          value={onkun}
          onChange={(e) => setOnkun(e.target.value)}
        />
        <label className="label">
          <span className="label-text-alt"></span>
          <span className="label-text-alt">歴史仮名遣い</span>
        </label>
      </div>

      <div className="pt-6 form-control w-full max-w-xs flex flex-col items-center justify-center">
        <button className="btn btn-wide btn-primary" onClick={handleSearchBtn}>検索</button>
      </div>

      {/* <div className="divider"></div>

      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">部首</span>
        </label>
        <select className="select select-bordered" ref={radicalRef}>
          <option disabled selected value="">
            部首を選択してください
          </option>
          {radicalList.map((radical) => (
            <option value={radical.radical} key={radical.radical}>
              {radical.label}
            </option>
          ))}
        </select>
      </div>

      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">残り画数</span>
        </label>
        <select className="select select-bordered" ref={remainstrokeRef}>
          <option disabled selected value="">
            残り画数を選択してください
          </option>
          {radicalList.map((radical) => (
            <option value={radical.radical} key={radical.radical}>
              {radical.label}
            </option>
          ))}
        </select>
      </div>

      <div className="form-control w-full max-w-xs flex flex-col items-center justify-center pt-6">
        <button className="btn btn-wide" onClick={handleDisplayBtn}>表示／絞る</button>
      </div>

      <div className="divider"></div> */}
    </>
  );
}

export default GyokuhentaizenForm