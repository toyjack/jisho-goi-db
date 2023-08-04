import { databaseList } from "@/constants/navList";
import Image from "next/image";
import Link from "next/link";

function DatabasesSection() {
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

          <div className="flex flex-col md:flex-row md:flex-wrap gap-6 md:m-4 md:p-10">
            {databaseList.map((dataset) => {
              return (
                <div
                  className="card card-compact w-64 h-96 bg-base-100 shadow-xl"
                  key={dataset.title}
                >
                  <figure className="avatar">
                    <div className="w-64 h-64">
                      <Image
                        src={dataset.image}
                        alt={dataset.title}
                        fill
                      />
                    </div>
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">{dataset.title}</h2>
                    <p>{dataset.description}</p>
                    <div className="card-actions justify-end">
                      <Link href={dataset.url} className="btn btn-primary">
                        詳細
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <p className="p-4 text-xs">
          一部の写真は「
          <Link
            href="https://dl.ndl.go.jp/"
            target={"_blank"}
            className="link link-hover"
          >
            国立国会図書館デジタルコレクション
          </Link>
          」、「
          <Link href="https://gallica.bnf.fr/" target={"_blank"} className="link link-hover">
            BNF Gallica
          </Link>
          」から転載したものです。
        </p>
      </div>
    </div>
  );
}

export default DatabasesSection;
