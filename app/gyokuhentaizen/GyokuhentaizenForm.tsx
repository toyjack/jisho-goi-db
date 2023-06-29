"use client";
import { useRouter } from "next/navigation";
import { radicalList } from "@/utils/radicalList";
import { useForm } from "react-hook-form";
import TextInput from "@/components/common/TextInput";
import { gyokuhentaizenMakiTyo } from "@/constants/gyokuhentaizen_maki_tyo";

interface FormData {
  entry?: string;
  jion?: string;
  wakun?: string;
  radical?: string;
  strokes?: string;
  maki?: string;
  tyo?: string;
}

function GyokuhentaizenForm() {
  const { register, watch, handleSubmit } = useForm({
    defaultValues: {
      radical: "",
      maki: "",
      tyo: "",
    },
  });
  const watchMaki = watch("maki");
  const router = useRouter();

  const onSubmit = (data: FormData) => {
    const notEmptyQuery = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v != "")
    );
    const query = new URLSearchParams(notEmptyQuery);
    router.push(`/gyokuhentaizen/results?${query}`);
  };

  return (
    <form className="h-max" onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        labelLeftUppon="掲出字"
        labelRightBottom="1文字"
        placeholder="掲出字を入力してください"
        name={"entry"}
        register={register}
      />
      <TextInput
        labelLeftUppon="字音"
        labelRightBottom="カタカナ／原本の表記"
        placeholder="字音を入力してください"
        name={"jion"}
        register={register}
      />
      <TextInput
        labelLeftUppon="和訓"
        labelRightBottom="カタカナ／原本の表記"
        placeholder="和訓を入力してください"
        name={"wakun"}
        register={register}
      />

      <div className="divider"></div>

      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">部首</span>
        </label>
        <select className="select select-bordered" {...register("radical")}>
          <option disabled value="">
            部首を選択してください
          </option>
          <option value="">（空）</option>
          {radicalList.map((radical) => (
            <option value={radical.radical} key={radical.radical}>
              {radical.label}
            </option>
          ))}
        </select>
      </div>

      <TextInput
        labelLeftUppon="残画数"
        labelRightBottom="半角アラビア数字"
        placeholder="残り画数を入力してください"
        name={"strokes"}
        register={register}
      />

      <div className="divider"></div>

      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">巻</span>
        </label>
        <select className="select select-bordered" {...register("maki")}>
          <option disabled value="" hidden>
            巻を選択してください
          </option>
          <option value="">（空）</option>
          {gyokuhentaizenMakiTyo.map((item) => (
            <option value={item.maki} key={item.maki}>
              {item.maki_kan}
            </option>
          ))}
        </select>
      </div>

      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">丁</span>
        </label>
        <select className="select select-bordered" {...register("tyo")}>
          <option disabled value="" hidden>
            丁を選択してください
          </option>
          <option value="">（空）</option>
          {gyokuhentaizenMakiTyo
            .find((item) => item.maki === watchMaki)
            ?.pages.map((item) => (
              <option value={item} key={item}>
                {item.replace("a","表").replace("b","裏")}
              </option>
            ))}
        </select>
      </div>

      <div className="pt-6 form-control w-full max-w-xs flex flex-col items-center justify-center">
        <button className="btn btn-wide btn-primary" type="submit">
          検索
        </button>
      </div>
    </form>
  );
}

export default GyokuhentaizenForm;
