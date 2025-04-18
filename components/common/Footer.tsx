import Image from "next/image";
import { dbMenu } from "@/constants/db-menu";
function CommonFooter() {
  const links = [
    {
      title: "テキストデータベース",
      items: dbMenu,
    },
    {
      title: "画像ギャラリー",
      items: [],
    },
    {
      title: "管理用",
      items: [
        {
          title: "管理システム",
          url: "/admin",
        },
        {
          title: "ページ内容編集",
          url: "/tina-admin/index.html",
        },
      ],
    },
  ];

  return (
    <footer className="border-t border-gray-200 dark:border-slate-800 bg-base-200 text-base-content">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-12 gap-4 gap-y-8 sm:gap-8 py-8 md:py-12">
          <div className="col-span-12 lg:col-span-4">
            <div className="mb-2">
              <a
                className="inline-block font-bold text-xl"
                href="https://jisho-goi.kojisho.com/"
              >
                <Image
                  src="/images/logo.png"
                  alt="logo"
                  height={80}
                  width={80}
                />
                辞書語彙データベース
              </a>
            </div>
          </div>
          {links.map(({ title, items }) => (
            <div className="col-span-6 md:col-span-3 lg:col-span-2" key={title}>
              <div className="footer-title mb-2">{title}</div>
              {items && Array.isArray(items) && items.length > 0 && (
                <ul className="text-sm">
                  {items.map(({ title, url }) => (
                    <li className="mb-2" key={title}>
                      <a className="link link-hover" href={url}>
                        {title}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className="md:flex md:items-center md:justify-between py-6 md:py-8">
          <div className="text-sm text-gray-700 mr-4 dark:text-slate-400 text-center md:text-left">
            <p>
              © 2022-2024{" "}
              <a
                href="https://jisho-goi.kojisho.com/gyokuhentaizen"
                className="link link-hover"
              >
                辞書語彙データベース
              </a>
            </p>
            <p>
              原則として, このサイトの内容物は
              <a
                href="https://creativecommons.org/licenses/by-nc/4.0/deed.ja"
                className="link link-hover"
                target="_blank"
                rel="noreferrer"
              >
                クリエイティブ・コモンズ 表示 - 非営利 - 継承 4.0 国際 (CC
                BY-NC-SA 4.0) ライセンス
              </a>
              の下に提供されています。
            </p>
            <p>公開物のライセンスは各ページをご参照ください。</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default CommonFooter;
