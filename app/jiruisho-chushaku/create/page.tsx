import { authOptions } from "@/lib/nextauth-options";
import { getServerSession } from "next-auth";
import React from "react";
import SearchForm from "./SearchForm";
import { getJiruishoById } from "./actions";
import Link from "next/link";
import TargePanel from "./TargePanel";
import EditPanel from "./EditPanel";

export default async function CreateChushakuPage({
  searchParams,
}: {
  searchParams: {
    id?: string;
  };
}) {
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

  const jiruishoId = searchParams.id;
  let results;
  if (jiruishoId) {
    results = await getJiruishoById(Number(jiruishoId));
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-bold">注釈新規作成</h2>
      <div>
        <SearchForm />
      </div>
      {results && (
        <div >
          <div>
            <TargePanel result={results} />
          </div>
          <div>
            <EditPanel targetId={results.id} chushaku={results.chushaku?.annotation} />
          </div>
        </div>
      )}
    </div>
  );
}
