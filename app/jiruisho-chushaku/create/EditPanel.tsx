"use client";

import { useState } from "react";
import { createJiruishoChushaku } from "./actions";

export default function EditPanel({
  targetId,
  chushaku,
}: {
  targetId: number;
  chushaku?: string;
}) {
  const [note, setNote] = useState<string>(chushaku || "");

  return (
    <div className="flex flex-col gap-4 w-full">
      <h2>注釈内容</h2>
      <form action={createJiruishoChushaku} className="flex flex-col gap-4">
        <input type="hidden" name="jiurishoId" value={targetId} />
        <textarea
          placeholder="注釈内容"
          className="textarea textarea-primary bg-base-100 textarea-bordered textarea-lg w-full min-h-64"
          value={note}
          name="note"
          onChange={(e) => setNote(e.target.value)}
        ></textarea>
        <div className="flex justify-end">
          <button className="btn btn-wide btn-primary" type="submit">
            保存
          </button>
        </div>
      </form>
    </div>
  );
}
