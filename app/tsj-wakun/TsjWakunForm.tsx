"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import TextInput from "@/components/common/TextInput";
import Select from "@/components/common/Select";

interface FormData {
  entry_text?: string;
  reading_kana_kanji?: string;
  def_manyogana?: string;
  kyowa_entry_text?: string;
  entry_type?: string;
  pos_category?: string;
  char_count?: string;
  kana_count?: string;
  variant_search?: boolean;
}

const entryTypeOptions = [
  { value: "", label: "指定なし" },
  { value: "single-character", label: "単字" },
  { value: "variant", label: "異体字" },
  { value: "compound", label: "熟語" },
];

// hdicviewer-rebuild API の posCategory（英語）と会議記録の品詞選択肢のベストエフォートな対応。
// 「名詞（名詞句）」「連語（名詞句/動詞句/定義文）」は API の posCategory 自体には無いため、
// "<posCategory>:<sub>" という複合値にして db/tsj_wakun.ts 側で
// posCategory（API に渡す）と partOfSpeechRaw の部分一致（クライアント側で絞り込む）に分解する。
const posCategoryOptions = [
  { value: "", label: "指定なし" },
  { value: "noun", label: "名詞" },
  { value: "noun:noun-phrase", label: "名詞（名詞句）" },
  { value: "verb", label: "動詞" },
  { value: "adjective", label: "形容詞" },
  { value: "adjectival-verb", label: "形容動詞" },
  { value: "adverb", label: "副詞" },
  { value: "interjection", label: "感動詞" },
  { value: "prefix", label: "接頭辞" },
  { value: "phrase", label: "連語" },
  { value: "phrase:noun-phrase", label: "連語（名詞句）" },
  { value: "phrase:definition", label: "連語（定義文）" },
  { value: "phrase:verb-phrase", label: "連語（動詞句）" },
  { value: "not-applicable", label: "なし" },
];

// 漢字数：実データ（hdicviewer-rebuild API 実測）では 1〜5 の範囲に収まるが、
// 未知の大きな値も拾えるよう最後だけ「N以上」の開区間にする（db/tsj_wakun.ts でクライアント側フィルタ）。
const charCountOptions = [
  { value: "", label: "指定なし" },
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
  { value: "6+", label: "6以上" },
];

// 和訓仮名字数：実データでは 1〜19 まで確認済み（大半は 2〜6）。同様に末尾だけ開区間にする。
const kanaCountOptions = [
  { value: "", label: "指定なし" },
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
  { value: "6", label: "6" },
  { value: "7", label: "7" },
  { value: "8", label: "8" },
  { value: "9", label: "9" },
  { value: "10", label: "10" },
  { value: "11+", label: "11以上" },
];

function TsjWakunForm() {
  const { register, handleSubmit } = useForm<FormData>();
  const router = useRouter();

  const onSubmit = (data: FormData) => {
    const notEmptyQuery = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v != "")
    );
    const query = new URLSearchParams(notEmptyQuery);
    router.push(`/tsj-wakun/results?${query}`);
  };

  return (
    <form className="h-max" onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        labelLeftUppon="見出し語（天治本）"
        labelRightBottom="漢字"
        placeholder="見出しを入力してください"
        name={"entry_text"}
        register={register}
      />
      <TextInput
        labelLeftUppon="和訓（天治本）"
        labelRightBottom="平仮名"
        placeholder="読みを入力してください"
        name={"reading_kana_kanji"}
        register={register}
      />
      <TextInput
        labelLeftUppon="和訓（天治本万葉仮名）"
        labelRightBottom="漢字"
        placeholder="万葉仮名を入力してください"
        name={"def_manyogana"}
        register={register}
      />
      <TextInput
        labelLeftUppon="見出し語（享和本）"
        labelRightBottom="漢字"
        placeholder="享和本見出しを入力してください"
        name={"kyowa_entry_text"}
        register={register}
      />
      <Select
        labelLeftUppon="種別"
        name="entry_type"
        register={register}
        options={entryTypeOptions}
      />
      <Select
        labelLeftUppon="品詞"
        name="pos_category"
        register={register}
        options={posCategoryOptions}
      />
      <Select
        labelLeftUppon="漢字数"
        name="char_count"
        register={register}
        options={charCountOptions}
      />
      <Select
        labelLeftUppon="和訓仮名字数"
        name="kana_count"
        register={register}
        options={kanaCountOptions}
      />

      <div className="form-control w-full max-w-xs pt-2">
        <label className="label cursor-pointer justify-start gap-2">
          <input
            type="checkbox"
            className="checkbox"
            {...register("variant_search")}
          />
          <span className="label-text">異体字も検索（旧字体・新字体等）</span>
        </label>
      </div>

      <div className="pt-6 form-control w-full max-w-xs flex flex-col items-center justify-center">
        <button className="btn btn-wide btn-primary" type="submit">
          検索
        </button>
      </div>
    </form>
  );
}

export default TsjWakunForm;
