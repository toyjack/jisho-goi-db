"use client";

import React, { useEffect, useState } from "react";
import TextInput from "@/components/common/TextInput";
import { useForm } from "react-hook-form";
import { getItem, updateItem } from "./actions";

function EditModal({ id }: { id: number }) {
  const { register, handleSubmit } = useForm();
  const [wordInMaeda, setWordInMaeda] = useState("");
  const [wordInKurokawa, setWordInKurokawa] = useState("");
  const [annotation, setAnnotation] = useState("");

  const onSubmit = async (data: any) => {
    await updateItem(id, data);
  };

  useEffect(() => {
    (async () => {
      if (id === 0) return null;

      const item = await getItem(id);
      if (!item) return null;
      setWordInMaeda(item.word_in_maeda);
      setWordInKurokawa(item.word_in_kurokawa);
      setAnnotation(item.annotation);
    })();
  }, [id]);

  return (
    <div className="modal-box">
      <h3 className="font-bold text-lg">新規作成</h3>
      <p className="py-4">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            labelLeftUppon="見出し語（前田）"
            defaultValue={wordInMaeda as string}
            name="word_in_maeda"
            register={register}
          />
          <TextInput
            labelLeftUppon="見出し語（黒川）"
            defaultValue={wordInKurokawa as string}
            name="word_in_kurokawa"
            register={register}
          />
          <label className="form-control">
            <div className="label">
              <span className="label-text">注釈</span>
            </div>
            <textarea
              className="textarea textarea-bordered min-h-full"
              placeholder="注釈"
              defaultValue={annotation}
              {...register("annotation")}
            ></textarea>
          </label>

          <input type="submit" value="更新" className="btn btn-primary" />
        </form>
      </p>
    </div>
  );
}

export default EditModal;
