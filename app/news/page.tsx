import ShukaiSection from "@/components/landing/Shukai";
import client from "@/tina/__generated__/client";

async function NewsPage() {
  const newsResponse = await client.queries.newsConnection({
    last:1
  })
  const allNews = newsResponse.data.newsConnection.edges?.map(news => {
    return {
      title: news?.node?.title,
      date: news?.node?.date,
      url: news?.node?._sys.filename,
      relativePath: news?.node?._sys.relativePath,
      news: news?.node
    }
  })

  const lastNews = allNews![0].news

  // TODO on working
  return (
    <>
      {/* <pre>
        {JSON.stringify(lastNews, null, 2)}
      </pre> */}
      <ShukaiSection />
    </>
  );
}

export default NewsPage