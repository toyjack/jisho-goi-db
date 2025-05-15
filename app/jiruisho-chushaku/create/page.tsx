import { authOptions } from "@/lib/nextauth-options";
import { getServerSession } from "next-auth";
import React from "react";
import CreateForm from "./CreateForm";

export default async function CreateChushakuPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl">ログインしてください</h1>
      </div>
    );
  }
  if (session.user.role !== "ADMIN") {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl">管理者権限が必要です</h1>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-lg font-bold">注釈新規作成</h2>
      <div>
        <label className="input input-bordered flex items-center gap-2">
          ID
          <input type="text" className="grow" placeholder="IDの数字を入力" />
        </label>
      </div>
      <CreateForm />
    </div>
  );
}
