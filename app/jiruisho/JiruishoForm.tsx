"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import TextInput from "../../components/common/TextInput";
import Select from "@/components/common/Select";
import { buOptions, henOptions, makiOptions, onkunOptions } from "./results/constants";

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
  ndl_maki?: string;
  ndl_page?: string;
}

function JiruishoForm() {
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: FormData) => {
    const arr = ["onkun", "bu", "hen","ndl_maki"] as Partial<keyof FormData>[];

    for (const key of arr) {
      if (data[key] === "すべて") {
        data[key] = "";
      }
    }

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
        labelLeftUppon="語形"
        labelRightBottom="カナ（清濁不問・現代仮名遣い可）"
        name={"gokei_search"}
        register={register}
      />

      <TextInput
        labelLeftUppon="注文"
        labelRightBottom="カタカナまたは漢字"
        name={"definition"}
        register={register}
      />

      <div className="divider"></div>

      <TextInput
        labelLeftUppon="声点"
        name={"shouten"}
        register={register}
      />

      <Select
        labelLeftUppon="篇"
        name={"hen"}
        register={register}
        options={henOptions}
      />

      <Select
        labelLeftUppon="部"
        name={"bu"}
        register={register}
        options={buOptions}
      />

      <Select
        labelLeftUppon="語種"
        name={"onkun"}
        register={register}
        options={onkunOptions}
      />

      <TextInput
        labelLeftUppon="字数"
        labelRightBottom="アラビア数字"
        name={"char_count"}
        register={register}
      />

      <div className="divider"></div>

      <Select
        labelLeftUppon="所在巻"
        name={"ndl_maki"}
        register={register}
        options={makiOptions}
      />
      <TextInput
        labelLeftUppon="所在ページ"
        labelRightBottom="アラビア半角数字"
        name={"ndl_page"}
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
