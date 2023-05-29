"use client";
import { useRouter } from "next/navigation";
import { radicalList } from "@/utils/radicalList";
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

function GyokuhentaizenForm() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const onSubmit = (data: FormData) => {
    const notEmptyQuery = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v != "")
    );
    const query = new URLSearchParams(notEmptyQuery);
    router.push(`/gyokuhentaizen/results?${query}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
          {radicalList.map((radical) => (
            <option value={radical.radical} key={radical.radical}>
              {radical.label}
            </option>
          ))}
        </select>
      </div>

      <TextInput
        labelLeftUppon="残画数"
        labelRightBottom="アラビア数字"
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
          <option disabled selected value="" hidden>
            巻を選択してください
          </option>
          {[1].map((maki) => (
            <option value={maki} key={maki}>
              {maki}
            </option>
          ))}
        </select>
      </div>

      <TextInput
        labelLeftUppon="丁"
        labelRightBottom="アラビア数字"
        placeholder="丁を入力してください"
        name={"tyo"}
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

export default GyokuhentaizenForm;
