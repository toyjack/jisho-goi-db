"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import TextInput from "../../components/common/TextInput";

interface FormData {
  entry?: string;
  annotation?: string;
}

function JiruishoChushakuForm() {
  const searchParams = useSearchParams()
  const initialValues = {
    entry: searchParams.get("entry") || "",
    annotation: searchParams.get("annotation") || "",
  };
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
        labelLeftUppon="見出し語"
        labelRightBottom=""
        name={"entry"}
        defaultValue={initialValues.entry}
        register={register}
      />
      <TextInput
        labelLeftUppon="注釈"
        labelRightBottom=""
        name={"annotation"}
        defaultValue={initialValues.annotation}
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
