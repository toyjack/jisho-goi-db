"use client";

import TextInput from "@/components/common/TextInput";
import React from "react";
import { useForm } from "react-hook-form";
import { createItem } from "./actions";

type Props = {
  maki?: string;
  hen?: string;
  bu?: string;
  word_in_maeda?: string;
  word_in_kurokawa?: string;
  annotation?: string;
};

function CreateItemModal({
  word_in_maeda,
  word_in_kurokawa,
  annotation,
}: Props) {
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data:any) => {
    console.log(data);
    await createItem(data);
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
          <TextInput
            labelLeftUppon="見出し語（黒川）"
            defaultValue={word_in_kurokawa as string}
            name="word_in_kurokawa"
            register={register}
          />
          <TextInput
            labelLeftUppon="注釈"
            defaultValue={annotation as string}
            name="annotation"
            register={register}
          />
          <input type="submit" value="新規作成" className="btn btn-primary" />
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

export default CreateItemModal;
