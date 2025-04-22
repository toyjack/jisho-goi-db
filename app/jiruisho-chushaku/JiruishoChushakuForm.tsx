"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import TextInput from "../../components/common/TextInput";

interface FormData {
  word_in_maeda?: string;
  word_in_kurokawa?: string;
  annotation?: string;
}

function JiruishoChushakuForm() {
  const searchParams = useSearchParams()
  const initialValues = {
    word_in_maeda: searchParams.get("word_in_maeda") || "",
    word_in_kurokawa: searchParams.get("word_in_kurokawa") || "",
    annotation: searchParams.get("annotation") || "",
  };
  const { word_in_maeda, word_in_kurokawa, annotation } = initialValues;
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data:FormData) => {
    const notEmptyQuery = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v != "")
    );
    const query = new URLSearchParams(notEmptyQuery);
    router.push(`/jiruisho-chushaku/results?${query}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        labelLeftUppon="見出し語（前田）"
        labelRightBottom=""
        name={"word_in_maeda"}
        defaultValue={word_in_maeda}
        register={register}
      />
      <TextInput
        labelLeftUppon="見出し語（黒川）"
        labelRightBottom=""
        name={"word_in_kurokawa"}
        defaultValue={word_in_kurokawa}
        register={register}
      />
      <TextInput
        labelLeftUppon="注釈"
        labelRightBottom=""
        name={"annotation"}
        defaultValue={annotation}
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

export default JiruishoChushakuForm;
