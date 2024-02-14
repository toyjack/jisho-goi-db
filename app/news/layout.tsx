import Link from "next/link";
import NewsListPanel from "./NewsListPanel";
import { client } from "@/tina/__generated__/client";

async function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // BUG 数指定しないとデータ取得できない
  const newsResponse = await client.queries.newsConnection({
    first:999
  })
  const allNews = newsResponse.data.newsConnection.edges?.map(news => {
    return {
      title: news?.node?.title,
      date: news?.node?.date,
      url: news?.node?._sys.filename,
    }
  })

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
        検索パネルを開く
      </label>

      <div className="drawer lg:drawer-open h-max">
        <input id="drawer" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content">{children}</div>

        <div className="drawer-side min-h-screen">
          <label htmlFor="drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 bg-base-200 text-base-content z-10">
            <NewsListPanel allNews={allNews} />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default NewsLayout;
