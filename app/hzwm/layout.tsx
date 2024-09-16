import Link from "next/link";
import { Suspense } from "react";
import HzwmForm from "./HzwmForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "本草和名データベース - [辞書語彙データベース]",
  description:
    "クリエイティブ・コモンズ・ライセンスの表示 - 非営利 - 継承 4.0 国際（CC BY-NC-SA 4.0）相当の条件で提供しています。",
};

function HzwmLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto h-full">
      <div className="p-10">
        <h2 className="text-3xl font-bold">
          <Link href="/hzwm">本草和名データベース</Link>

          {/* <span className="badge badge-lg">試行版</span> */}

          <span className="badge badge-lg badge-secondary">v2023-08</span>
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
              <HzwmForm />
            </Suspense>
          </div>
        </div>

      </div>
    </div>
  );
}

export default HzwmLayout;
