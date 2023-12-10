"use client";
import TextInput from "@/components/common/TextInput";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { KwrsMenu } from "./kwrs-menu";

interface FormData {
  entry?: string;
  defination?: string;
}

export default function KwrsForm() {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const searchParams = useSearchParams()

  const [makiList, setMakiList] = useState<string[]>([]);
  const [buList, setBuList] = useState<string[]>([]);
  const [typeList, setTypeList] = useState<string[]>([]);

  // TODO: ここで初期値を設定する
  const [maki, setMaki] = useState(searchParams?.get("maki") || "");
  const [bu, setBu] = useState(searchParams?.get("bu") || "");
  const [type, setType] = useState(searchParams?.get("type") || "");
 

  const onSubmit = (data: FormData) => {
    const notEmptyQuery = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v != "")
    );
    const query = new URLSearchParams(notEmptyQuery);
    router.push(`/kwrs/results?${query}`);
  };



  useEffect(() => {
    setMakiList(
      Array.from(
        new Set(
          KwrsMenu.map((maki) => {
            return maki.maki;
          })
        )
      )
    );
  }, []);

  useEffect(() => {
    setBuList(
      Array.from(
        new Set(
          KwrsMenu.filter((item) => item.maki == maki).map((bu) => {
            return bu.bu;
          })
        )
      )
    );
  }, [maki]);

  useEffect(() => {
    setTypeList(
      Array.from(
        new Set(
          KwrsMenu.filter((item) => item.bu == bu).map((type) => {
            return type.type;
          })
        )
      )
    );
  }, [bu]);



  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        labelLeftUppon="見出し語"
        labelRightBottom="漢字"
        name={"entry"}
        register={register}
        defaultValue={searchParams?.get("entry") || ""}
      />

      <TextInput
        labelLeftUppon="注文"
        labelRightBottom="漢字"
        name={"definition"}
        register={register}
        defaultValue={searchParams?.get("definition") || ""}
      />

      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">巻</span>
          <span className="label-text-alt"></span>
        </label>
        <select
          className="select select-bordered"
          value={maki}
          {...register("maki",{
            onChange: (e) => setMaki(e.target.value)
          })}
        >
          <option value={""}>（選択なし）</option>
          {makiList.map((maki) => {
            return <option value={maki} key={maki}>{maki}</option>;
          })}
        </select>
      </div>

      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">部</span>
          <span className="label-text-alt">巻を先に選んでください</span>
        </label>
        <select
          className="select select-bordered"
          value={bu}
          {...register("bu", {
            onChange: (e) => setBu(e.target.value)
          })}
        >
          <option value={""}>（選択なし）</option>
          {buList.map((item) => {
            return <option value={item} key={item}>{item}</option>;
          })}
        </select>
      </div>

      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">類・具・国郡等</span>
          <span className="label-text-alt">部を先に選んでください</span>
        </label>
        <select
          className="select select-bordered"
          value={type}
          {...register("type",{
            onChange: (e) => setType(e.target.value)
          })}
        >
          <option value={""}>（選択なし）</option>
          {typeList.map((item) => {
            return <option value={item} key={item}>{item}</option>;
          })}
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
