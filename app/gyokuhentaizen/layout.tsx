import React from "react";
import GyokuhentaizenForm from "@/components/forms/GyokuhentaizenForm";

function GyokuhentaizenLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="p-10">
        <h2 className="text-3xl font-bold">
          【試行版】増続大広益会玉篇大全データベース
        </h2>
      </div>
      <label
        htmlFor="drawer"
        className="block h-auto w-auto btn btn-primary drawer-button lg:hidden"
      >
        Open drawer
      </label>

      <div className="drawer drawer-mobile h-max">
        <input id="drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">{children}</div>
        <div className="drawer-side min-h-screen">
          <label htmlFor="drawer" className="drawer-overlay"></label>
          <div className="menu p-4 w-80 bg-base-200 text-base-content">
            <GyokuhentaizenForm />
          </div>
        </div>
      </div>
    </>
  );
}

export default GyokuhentaizenLayout;
