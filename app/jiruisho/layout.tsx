import JiruishoForm from "@/app/jiruisho/JiruishoForm";
import Link from "next/link";

function JiruishoLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto">
    <div className="p-10">
      <h2 className="text-3xl font-bold">
        <Link href="/jiruisho">色葉字類抄データベース</Link>
        <span className="badge badge-lg">試行版</span>
        <span className="badge badge-lg badge-secondary">v2023-02</span>
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

      <div className="drawer-content">{children}</div>

      <div className="drawer-side min-h-screen">
        <label htmlFor="drawer" className="drawer-overlay"></label>
        <div className="menu p-4 w-80 bg-base-200 text-base-content z-10">
          <JiruishoForm />
        </div>
      </div>
    </div>
  </div>
  );
}

export default JiruishoLayout