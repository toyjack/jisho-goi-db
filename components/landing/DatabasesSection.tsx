import React from "react";

function DatabasesSection() {
  const databases = [
    {
      title: "色葉字類抄",
      url: "/irohajiruisho",
      description: "公開中",
      image: "https://placeimg.com/640/480/arch",
    },
    {
      title: "落葉集",
      url: "/databases/kuzushiji",
      description: "公開予定",
      image: "https://placeimg.com/640/480/arch",
    },
    {
      title: "和訓栞",
      url: "/datasets/syozo-gallery",
      description: "公開予定",
      image: "https://placeimg.com/640/480/arch",
    },
    {
      title: "文明本節用集",
      url: "/datasets/saigai",
      description: "公開予定",
      image: "https://placeimg.com/640/480/arch",
    },
    {
      title: "増続大広益会玉篇大全",
      url: "/gyokuhentaizen",
      description: "公開予定",
      image: "/images/gyokuhentaizen/vol_2/1_25b.png",
    },
  ];

  return (
    <div
      id="databases"
      className="hero bg-base-100 min-h-screen mx-auto max-w-full"
    >
      <div className="hero-content flex flex-col">
        <div className="flex flex-col px-4 mt-32">
          <div className="p-5 flex flex-col">
            <h2 className="text-5xl md:text-6xl px-4">データベース</h2>
            <p className="px-5 text-base">公開テキストデータベース</p>
          </div>

          <div className="flex flex-row gap-3">
            {databases.map((dataset) => {
              return (
                <div
                  className="card card-compact w-full bg-base-100 shadow-xl"
                  key={dataset.title}
                >
                  <figure>
                    <img src={dataset.image} alt={dataset.title} />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">{dataset.title}</h2>
                    <p>{dataset.description}</p>
                    <div className="card-actions justify-end">
                      <a href={dataset.url} className="btn btn-primary">
                        詳細
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DatabasesSection;
