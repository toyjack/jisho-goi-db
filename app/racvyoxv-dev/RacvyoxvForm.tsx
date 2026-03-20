"use client";
import Select from "@/components/common/Select";
import TextInput from "@/components/common/TextInput";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

interface FormData {
  term?: string;
  kanjiPairLength?: string;
}

function RacvyoxvForm() {
  const searchParams = useSearchParams()
 
  const entry = searchParams.get('entry') || "";
  const bu = searchParams.get('bu') || "";
  const onyomi = searchParams.get('onyomi') || "";
  const kunyomi = searchParams.get('kunyomi') || "";
  const henmei = searchParams.get('henmei') || "";

  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const onSubmit = (data: FormData) => {
    const notEmptyQuery = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v != "")
    );
    const query = new URLSearchParams(notEmptyQuery);
    router.push(`/racvyoxv-dev/results?${query}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        labelLeftUppon="見出し語"
        labelRightBottom="漢字"
        name={"entry"}
        defaultValue={entry}
        register={register}
      />

      <Select
        labelLeftUppon="篇名"
        name={"henmei"}
        register={register}
        defaultValue={henmei}
        options={[
          { value: "", label: "全て" },
          { value: "本篇", label: "本篇" },
          { value: "小玉篇", label: "小玉篇" },
          { value: "色葉字集", label: "色葉字集" },
        ]}
      />

      <TextInput
        labelLeftUppon="部"
        labelRightBottom="ひらがな"
        name={"bu"}
        register={register}
        defaultValue={bu}
      />

      <TextInput
        labelLeftUppon="読み（音読み）"
        labelRightBottom="ひらがな（原本表記）"
        name={"onyomi"}
        register={register}
        defaultValue={onyomi}
      />

      <TextInput
        labelLeftUppon="読み（訓読み）"
        labelRightBottom="ひらがな（原本表記）"
        name={"kunyomi"}
        register={register}
        defaultValue={kunyomi}

      />

      <div className="pt-6 form-control w-full max-w-xs flex flex-col items-center justify-center">
        <button className="btn btn-wide btn-primary" type="submit">
          検索
        </button>
      </div>
    </form>
  );
}

export default RacvyoxvForm;
