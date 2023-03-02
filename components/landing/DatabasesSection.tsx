import Image from "next/image";
import Link from "next/link";

function DatabasesSection() {
  const databases = [
    {
      title: "色葉字類抄",
      url: "/jiruisho",
      description: "姓氏部・名字部",
      image: "/images/jiruisho_logo.png",
    },
    {
      title: "落葉集",
      url: "/racvyoxv",
      description: "イ部・ロ部、ハ部の一部",
      image: "/images/no_image.png",
    },
    {
      title: "和訓栞",
      url: "/wakunnoshiori",
      description: "公開予定",
      image: "/images/wakun_logo.png",
    },
    {
      title: "文明本節用集",
      url: "/bunmei",
      description: "イ部",
      image: "/images/bunmeibon_logo.png",
    },
    {
      title: "増続大広益会玉篇大全",
      url: "/gyokuhentaizen",
      description: "巻一",
      image: "/images/gyokutaizen_logo.png",
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
                    <Image
                      src={dataset.image}
                      alt={dataset.title}
                      width={200}
                      height={200}
                    />
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

        <p className="p-4 text-xs">
          一部の写真は「
          <Link href="https://dl.ndl.go.jp/" target={"_blank"} className="link link-hover">
            国立国会図書館デジタルコレクション
          </Link>
          」から転載したものです。
        </p>
      </div>
    </div>
  );
}

export default DatabasesSection;
