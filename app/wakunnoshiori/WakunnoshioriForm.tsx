"use client";
import TextInput from "@/components/common/TextInput";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface FormData {
  entry?: string;
  defination?: string;
}

export default function WakunnosioriForm() {
const router = useRouter();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: FormData) => {
    const notEmptyQuery = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v != "")
    );
    const query = new URLSearchParams(notEmptyQuery);
    router.push(`/wakunnoshiori/results?${query}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        labelLeftUppon="見出し語"
        labelRightBottom="ひらがな"
        name={"entry"}
        register={register}
      />

      <TextInput
        labelLeftUppon="語釈"
        labelRightBottom="ひらがなまたは漢字"
        name={"defination"}
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
