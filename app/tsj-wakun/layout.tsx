import Link from "next/link";
import { Suspense } from "react";
import TsjWakunForm from "./TsjWakunForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "新撰字鏡和訓データベース - [辞書語彙データベース]",
  description: "新撰字鏡和訓データベース検索システム",
};

function TsjWakunLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto h-full">
      <div className="p-10">
        <h2 className="text-3xl font-bold">
          <Link href="/tsj-wakun">新撰字鏡和訓データベース</Link>
          <span className="badge badge-lg badge-secondary ml-2">試行版</span>
          <span className="badge badge-lg badge-primary ml-2">2026年2月</span>
        </h2>
      </div>

      <label
        htmlFor="drawer"
        className="h-auto w-full btn btn-primary drawer-button lg:hidden"
      >
        検索パネルを開く
      </label>

      <div className="drawer lg:drawer-open h-max">
        <input id="drawer" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content">{children}</div>

        <div className="drawer-side min-h-screen">
          <label htmlFor="drawer" className="drawer-overlay"></label>
          <div className="rounded-lg p-4 w-80 bg-base-200 text-base-content z-10">
            <Suspense fallback={<div>loading...</div>}>
              <TsjWakunForm />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TsjWakunLayout;
