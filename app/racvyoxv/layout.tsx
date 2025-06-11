import Link from "next/link";
import RacvyoxvForm from "@/app/racvyoxv/RacvyoxvForm";

function JiruishoLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto">
      <div className="p-10">
        <h2 className="text-3xl font-bold">
          <Link href="/racvyoxv">落葉集データベース</Link>
          <span className="badge badge-lg">試行版</span>
          <span className="badge badge-lg badge-secondary">v2025-06</span>
        </h2>
      </div>
      <label
        htmlFor="drawer"
        className="px-2 h-auto w-full btn btn-primary drawer-button lg:hidden"
      >
        検索パネルを開く
      </label>

      <div className="drawer lg:drawer-open h-max">
        <input id="drawer" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content">{children}</div>

        <div className="drawer-side min-h-screen">
          <label htmlFor="drawer" className="drawer-overlay"></label>
          <div className="menu p-4 w-80 bg-base-200 text-base-content z-10">
            <RacvyoxvForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default JiruishoLayout