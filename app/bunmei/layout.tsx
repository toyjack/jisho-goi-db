import Link from "next/link";
import GyokuhentaizenForm from "@/components/forms/GyokuhentaizenForm";
import BunmeiForm from "@/components/forms/BunmeiForm";

function GyokuhentaizenLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto">
      <div className="p-10">
        <h2 className="text-3xl font-bold">
          <Link href="/gyokuhentaizen">文明本節用集データベース</Link>
          <span className="badge badge-lg">試行版</span>
          <span className="badge badge-lg badge-secondary">v2023-02</span>
        </h2>
      </div>
      <label
        htmlFor="drawer"
        className="block h-auto w-auto btn btn-primary drawer-button lg:hidden"
      >
        検索パネルを開く
      </label>

      <div className="drawer drawer-mobile h-max">
        <input id="drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">{children}</div>
        <div className="drawer-side min-h-screen">
          <label htmlFor="drawer" className="drawer-overlay"></label>
          <div className="menu p-4 w-80 bg-base-200 text-base-content z-10">
            <BunmeiForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default GyokuhentaizenLayout;
