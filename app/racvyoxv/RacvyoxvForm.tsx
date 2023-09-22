"use client";
import TextInput from "@/components/common/TextInput";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface FormData {
  term?: string;
  kanjiPairLength?: string;
}

function RacvyoxvForm() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const onSubmit = (data: FormData) => {
    const notEmptyQuery = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v != "")
    );
    const query = new URLSearchParams(notEmptyQuery);
    router.push(`/racvyoxv/results?${query}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        labelLeftUppon="見出し語"
        labelRightBottom="漢字のみ"
        name={"entry"}
        register={register}
      />

      <TextInput
        labelLeftUppon="熟語字数"
        labelRightBottom="半角アラビア数字"
        name={"kanjiPairLength"}
        register={register}
      />

      <TextInput
        labelLeftUppon="部"
        labelRightBottom="ひらがな"
        name={"bu"}
        register={register}
      />

      <TextInput
        labelLeftUppon="読み"
        labelRightBottom="ひらがな（原本表記）"
        name={"furigana"}
        register={register}
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
