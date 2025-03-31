import Shukai2023 from "@/components/landing/Shukai";
import Shukai202201Section from "@/components/landing/Shukai-2022";
import Shukai2024Section from "@/components/landing/Shukai-2024";
import Shukai202409 from "@/components/landing/Shukai-202409";
// import client from "@/tina/__generated__/client";

async function NewsPage() {
  // const newsResponse = await client.queries.newsConnection({
  //   last:1
  // })
  // const allNews = newsResponse.data.newsConnection.edges?.map(news => {
  //   return {
  //     title: news?.node?.title,
  //     date: news?.node?.date,
  //     url: news?.node?._sys.filename,
  //     relativePath: news?.node?._sys.relativePath,
  //     news: news?.node
  //   }
  // })

  // const lastNews = allNews![0].news

  // TODO on working
  return (
    <>
      <Shukai202409 />
      <div className="divider"></div>
      <Shukai2024Section />
      <div className="divider"></div>
      <Shukai2023 />
      <div className="divider"></div>
      <Shukai202201Section />
    </>
  );
}

export default NewsPage