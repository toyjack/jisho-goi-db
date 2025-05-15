"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import TextInput from "../../components/common/TextInput";

interface FormData {
  entry?: string;
  gokei_search_current?: string;
  gokei_search_original?: string;
  definition?: string;
  shouten?: string;
  hen?: string;
  bu?: string;
  onkun?: string;
  char_count?: string;
}

function JiruishoForm() {
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data:FormData) => {
    const notEmptyQuery = Object.fromEntries(
      Object.entries(data).filter(([, v]) => v != "")
    );
    const query = new URLSearchParams(notEmptyQuery);
    router.push(`/jiruisho/results?${query}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        labelLeftUppon="見出し語"
        labelRightBottom="漢字"
        name={"entry"}
        register={register}
      />
      <TextInput
        labelLeftUppon="語形（現代仮名遣い）"
        labelRightBottom="カタカナ"
        name={"gokei_search_current"}
        register={register}
      />
      <TextInput
        labelLeftUppon="語形（原表記）"
        labelRightBottom="カタカナ"
        name={"gokei_search_original"}
        register={register}
      />

      <TextInput
        labelLeftUppon="註文"
        labelRightBottom="カタカナまたは漢字"
        name={"definition"}
        register={register}
      />

      <div className="divider"></div>

      <TextInput
        labelLeftUppon="声点"
        labelRightBottom="..."
        name={"shouten"}
        register={register}
      />

      <TextInput
        labelLeftUppon="篇"
        labelRightBottom="カタカナ"
        name={"hen"}
        register={register}
      />

      <TextInput
        labelLeftUppon="部"
        labelRightBottom="漢字"
        name={"bu"}
        register={register}
      />

      <TextInput
        labelLeftUppon="音訓"
        labelRightBottom="「音」または「訓」"
        name={"onkun"}
        register={register}
      />

      <TextInput
        labelLeftUppon="字数"
        labelRightBottom="アラビア数字"
        name={"char_count"}
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

export default JiruishoForm;
