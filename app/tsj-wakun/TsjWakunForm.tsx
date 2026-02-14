"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import TextInput from "@/components/common/TextInput";

interface FormData {
  entry_text?: string;
  reading_kana_kanji?: string;
  def_manyogana?: string;
  kyowa_entry_text?: string;
}

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
        labelLeftUppon="見出し語"
        labelRightBottom="漢字"
        placeholder="見出しを入力してください"
        name={"entry_text"}
        register={register}
      />
      <TextInput
        labelLeftUppon="読み"
        labelRightBottom="かな/漢字"
        placeholder="読みを入力してください"
        name={"reading_kana_kanji"}
        register={register}
      />
      <TextInput
        labelLeftUppon="万葉仮名"
        labelRightBottom="定義"
        placeholder="万葉仮名を入力してください"
        name={"def_manyogana"}
        register={register}
      />
      <TextInput
        labelLeftUppon="享和本見出し"
        labelRightBottom="漢字"
        placeholder="享和本見出しを入力してください"
        name={"kyowa_entry_text"}
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

export default TsjWakunForm;
