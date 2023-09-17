"use client";

import TextInput from "@/components/common/TextInput";
import React from "react";
import { useForm } from "react-hook-form";

type Props = {
  maki?: string;
  hen?: string;
  bu?: string;
  word_in_maeda?: string;
  word_in_kurokawa?: string;
  annotation?: string;
};

function JiruishoChushakuUpdateItemModal({
  word_in_maeda,
  word_in_kurokawa,
  annotation,
}: Props) {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data:any) => {
    console.log(data);
  };
  return (
    <div className="modal-box">
      <h3 className="font-bold text-lg">新規作成</h3>
      <p className="py-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            labelLeftUppon="見出し語（前田）"
            defaultValue={word_in_maeda as string}
            name="word_in_maeda"
            register={register}
          />
        </form>
      </p>
      <div className="modal-action">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn">閉じる</button>
        </form>
      </div>
    </div>
  );
}

export default JiruishoChushakuUpdateItemModal;
