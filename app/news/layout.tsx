import Link from "next/link";
import NewsListPanel from "./NewsListPanel";

async function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="container mx-auto">
      <div className="p-10">
        <h2 className="text-3xl font-bold">
          <Link href="/news">お知らせ</Link>
        </h2>
      </div>

      <label
        htmlFor="drawer"
        className="px-2 h-auto w-full btn btn-primary drawer-button lg:hidden"
      >
        お知らせリストを開く
      </label>

      <div className="drawer lg:drawer-open h-max">
        <input id="drawer" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content">{children}</div>

        <div className="drawer-side min-h-screen">
          <label htmlFor="drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 bg-base-200 text-base-content z-10">
{/* TODO */}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default NewsLayout;
