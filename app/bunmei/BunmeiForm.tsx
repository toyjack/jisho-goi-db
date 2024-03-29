"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import TextInput from "@/components/common/TextInput";

interface FormData {
  entry?: string;
  gokei?: string;
  leftWakun?: string;
  shouten?: string;
  definition?: string;
}

const mon = [
  "天地",
  "家屋",
  "時節",
  "草木",
  "神祇",
  "人倫",
  "人名",
  "官位",
  "気形",
  "支体",
  "飲食",
  "絹布",
  "器財",
  "光彩",
  "数量",
  "態藝",
];

function BunmeiForm() {
  const searchParams = useSearchParams();
  const entry = searchParams?.get("entry");
  const gokei = searchParams?.get("gokei");
  const leftWakun = searchParams?.get("leftWakun");
  const shouten = searchParams?.get("shouten");
  const def = searchParams?.get("definition");

  const router = useRouter();

  type FormData = {
    entry: string;
    gokei: string;
    leftWakun: string;
    shouten: string;
    definition: string;
    no_kundoku: string;
  };

  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      entry: entry|| "",
      gokei: gokei || "",
      leftWakun: leftWakun || "",
      shouten: shouten || "",
      definition: def || "",
      no_kundoku: "false",
    },
  });

  const onSubmit = (data: FormData) => {
    const notEmptyQuery = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v != "")
    );
    const query = new URLSearchParams(notEmptyQuery);
    router.push(`/bunmei/results?${query}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        labelLeftUppon="見出し語"
        labelRightBottom="漢字"
        name="entry"
        register={register}
      />

      <TextInput
        labelLeftUppon="見出し語の語形（右傍）"
        labelRightBottom="カタカナ（仮名遣いは原本通り）"
        name="gokei"
        register={register}
      />

      <TextInput
        labelLeftUppon="音訓（左傍）"
        labelRightBottom="カタカナ（原表記）"
        name="left_kun"
        register={register}
      />

      <TextInput
        labelLeftUppon="声点"
        labelRightBottom="平、東、上、去、入、○（○はなし）"
        name={"shouten"}
        register={register}
      />

      <TextInput
        labelLeftUppon="注文"
        labelRightBottom="カタカナまたは漢字"
        name={"definition"}
        register={register}
      />

      <div className="divider"></div>

      <div className="form-control">
        <label className="cursor-pointer label">
          <span className="label-text">検索対象から漢文訓読項目を除外</span>
          <input
            type="checkbox"
            className="toggle toggle-primary"
            {...register("no_kundoku")}
          />
        </label>
      </div>

      <div className="pt-6 form-control w-full max-w-xs flex flex-col items-center justify-center">
        <button type="submit" className="btn btn-wide btn-primary">
          検索
        </button>
      </div>
    </form>
  );
}

export default BunmeiForm;
