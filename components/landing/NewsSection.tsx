import React from 'react'

function NewsSection() {
  const news = [
    {
      title:"落葉集データセットを公開しました（https://doi.org/10.5281/zenodo.16892693）",
      date:"2025/08/18"
    },
    {
      title:"文明本節用集のチリヌルヲ部を検索システム上で追加公開しました",
      date:"2025/3/31"
    },
    {
      title: "増続大広益会玉篇大全の巻六〜巻十一を検索システム上で追加、全文公開しました",
      date: "2025/3/31",
    },
    {
      title: "本草和名と古活字版和名類聚抄の全文テキストデータ （附：和名索引）データセットを公開しました（https://dataset.kojisho.com/hzwm-kwrs-wamyo-dataset）",
      date: "2025/2/28",
    },
    {
      title: "増続大広益会玉篇大全の巻二〜巻五を検索システム上で追加公開しました",
      date: "2024/10/13",
    },
    {
      title:"文明本節用集のロハニホヘト部を検索システム上で追加公開しました",
      date:"2023/11/18"
    },
    {
      title:"本草和名を検索システム上で全文公開しました",
      date:"2023/6/4"
    },
    {
      title:"色葉字類抄注釈データベース内部閲覧を追加しました",
      date:"2023/9/23"
    },
    {
      title:"古活字版和名類聚抄を検索システム上で全文公開しました",
      date:"2023/7/23"
    },
    {
      title: "落葉集本篇を検索システム上で全文公開しました",
      date: "2023/05/18",
    },
    {
      title: "本データベース検索システム・プロトタイプ版の公開開始（色葉字類抄／姓氏部・名字部、落葉集／イ部・ロ部、文明本節用集／イ部、増続大広益会玉篇大全／巻一）",
      date: "2023/03/03",
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
                  <div key={item.title}>
                    <li>
                      <h5 className="text-xl">{item.title}</h5>
                      <h6 className="text-md">{item.date}</h6>
                    </li>
                    <div className=" divider"></div>
                  </div>
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