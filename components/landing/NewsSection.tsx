import React from 'react'

function NewsSection() {
  const news = [
    {
      title: "お知らせ1",
      date: "2021/01/01",
    },
    {
      title: "開発版の公開",
      date: "2022/02/14",
    },
  ];
  return (
    <div className="hero h-full bg-base-200">
      <div className="hero-content flex-col lg:flex-row">
        <div>
          <div className="mt-10 mb-20 flex flex-col lg:flex-row">
            <div className="flex min-w-1/4 flex-col text-left">
              <h3 className="text-2xl font-bold">最新のお知らせ</h3>
            </div>
            <div className="divider lg:divider-horizontal"></div>
            <div className="flex-1 w-full flex-col text-left">
              <ul>
                {news.map((item) => (
                  <>
                    <li key={item.title}>
                      <h5 className="text-3xl">{item.title}</h5>
                      <h6 className="text-xl">{item.date}</h6>
                    </li>
                    <div className=" divider"></div>
                  </>
                ))}
                <li>
                  <a href="/news" className="link link-hover">
                    すべてのお知らせ
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsSection