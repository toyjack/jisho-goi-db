import Link from "next/link";
import NewsListPanel from "./NewsListPanel";

async function getAllNews() {
  const url = `https://strapi.kojisho.com/api/blogs`;

  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("データが見つかりませんでした。");
  }
  return res.json();
}

async function NewsLayout({
  children, 
}: {
  children: React.ReactNode;
}) {
  const news = await getAllNews();
  
  return (
    <div className="container mx-auto">
      <div className="p-10">
        <h2 className="text-3xl font-bold">
          <Link href="/news">お知らせ</Link>
        </h2>
        {JSON.stringify(news)}
      </div>

      <label
        htmlFor="drawer"
        className="px-2 h-auto w-full btn btn-primary drawer-button lg:hidden"
      >
        検索パネルを開く
      </label>

      <div className="drawer drawer-mobile h-max">
        <input id="drawer" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content">{children}</div>

        <div className="drawer-side min-h-screen">
          <label htmlFor="drawer" className="drawer-overlay"></label>
          <div className="menu p-4 w-80 bg-base-200 text-base-content z-10">
            <NewsListPanel />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsLayout;
