import Link from "next/link";
import React, { Suspense } from "react";
import JiruishoChushakuForm from "./JiruishoChushakuForm";

function JiruishoChushakuLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto">
      <div className="p-10">
        <h2 className="text-3xl font-bold">
          <Link href="/jiruisho-chushaku">色葉字類抄注釈データベース</Link>
          <span className="badge badge-lg badge-secondary">v2023-09</span>
        </h2>
      </div>
      <label
        htmlFor="drawer"
        className="px-2 h-auto w-full btn btn-primary drawer-button lg:hidden"
      >
        検索パネルを開く
      </label>

      <div className="drawer lg:drawer-open">
        <input id="drawer" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content">
          <div className="sm:p-4 sm:m-2">{children}</div>
        </div>

        <div className="drawer-side min-h-screen">
          <label htmlFor="drawer" className="drawer-overlay"></label>
          <div className="menu p-4 w-80 bg-base-200 text-base-content z-10 sm:rounded-md">
            <Suspense fallback={<div>Loading...</div>}>
              <JiruishoChushakuForm />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JiruishoChushakuLayout;
