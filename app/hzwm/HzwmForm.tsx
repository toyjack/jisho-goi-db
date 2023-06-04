"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import TextInput from "@/components/common/TextInput";

interface FormData {
  entry?: string;
  jion?: string;
  wakun?: string;
  radical?: string;
  strokes?: string;
  maki?: string;
  tyo?: string;
}

function HzwmForm() {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      radical: "",
      maki: "",
    },
  });
  const router = useRouter();

  const onSubmit = (data: FormData) => {
    const notEmptyQuery = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v != "")
    );
    const query = new URLSearchParams(notEmptyQuery);
    router.push(`/hzwm/results?${query}`);
  };

  return (
    <form className="h-max" onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        labelLeftUppon="見出し"
        labelRightBottom="漢字"
        placeholder="見出しを入力してください"
        name={"entry"}
        register={register}
      />
      <TextInput
        labelLeftUppon="本文"
        labelRightBottom="漢字／原本の表記"
        placeholder="本文を入力してください"
        name={"definition"}
        register={register}
      />
      <TextInput
        labelLeftUppon="読み"
        labelRightBottom="ひらがな"
        placeholder="読みを入力してください"
        name={"readings"}
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

export default HzwmForm;
