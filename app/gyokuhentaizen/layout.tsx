import Link from "next/link";
import GyokuhentaizenForm from "@/app/gyokuhentaizen/GyokuhentaizenForm";
import { Suspense } from "react";

function GyokuhentaizenLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto h-full">
      <div className="p-10">
        <h2 className="text-3xl font-bold">
          <Link href="/gyokuhentaizen">増続大広益会玉篇大全データベース</Link>
          <span className="badge badge-lg">全文公開試行版</span>
          <span className="badge badge-lg badge-secondary">v2025-03</span>
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
          <div className="menu p-4 w-80 bg-base-200 text-base-content z-10">
            <Suspense fallback={<div>loading...</div>}>
              <GyokuhentaizenForm />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GyokuhentaizenLayout;
