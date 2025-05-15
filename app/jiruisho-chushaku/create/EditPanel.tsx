"use client";

import { useState } from "react";
import { createJiruishoChushaku } from "./actions";

export default function EditPanel({ targetId, chushaku }: { targetId: number; chushaku?: string }) {
  const [note, setNote] = useState<string>(chushaku || "");

  return (
    <div>
      <h2>注釈内容</h2>
      <form action={createJiruishoChushaku}>
        <input type="hidden" name="jiurishoId" value={targetId} />
        <textarea
          placeholder="注釈内容"
          className="textarea textarea-bordered textarea-lg w-full max-w-xs"
          value={note}
          name="note"
          onChange={(e) => setNote(e.target.value)}
        ></textarea>
        <div className="pt-6 form-control w-full max-w-xs flex flex-col items-center justify-center">
          <button className="btn btn-wide btn-primary" type="submit">
            保存
          </button>
        </div>
      </form>
    </div>
  );
}
