import Link from "next/link";

function NewsListPanel({ allNews }: { allNews?: any[] }) {

  return <>
    {allNews?.map((news, index) => {
      return (
        <li key={index} >
          <Link href={"#"} className="flex flex-col items-start">
            <span className="text-left">{news.title}</span>
            <small className="self-end">{(new Date(news.date).toLocaleDateString())}</small></Link>
        </li>
      )
    })}
  </>;
}

export default NewsListPanel;
