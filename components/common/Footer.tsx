import React from 'react'

function CommonFooter() {
  const links = [
    {
      title: "テキストデータベース",
      items: [{
        title: "色葉字類抄",
        href: "/irohajiruisho",
      },
    {
      title: "落葉集",
      href: "/datasets/kuzushiji",
    }]
    },
    {
      title: "画像リンク",
      items: []
      
    },
    
  ];
  const social = [
    {
      label: "Twitter",
      icon: "tabler:brand-twitter",
      href: "https://twitter.com/UTokyo_HI",
    },
    // { label: 'RSS', icon: 'tabler:rss', href: getRelativeLink('/rss.xml') },
    // {
    //   label: "Github",
    //   icon: "tabler:brand-github",
    //   href: "https://github.com/lab-hi",
    // },
  ];
  return (
    <footer
  className="border-t border-gray-200 dark:border-slate-800 bg-base-200 text-base-content"
>
  <div className="max-w-6xl mx-auto px-4 sm:px-6">
    <div className="grid grid-cols-12 gap-4 gap-y-8 sm:gap-8 py-8 md:py-12">
      <div className="col-span-12 lg:col-span-4">
        <div className="mb-2">
          <a
            className="inline-block font-bold text-xl"
            href="https://www.hi.u-tokyo.ac.jp/"
          >
            <img src="/images/logo_banner.png" alt="" />
          </a>
        </div>
       
      </div>
      {
        links.map(({ title, items }) => (
          <div className="col-span-6 md:col-span-3 lg:col-span-2" key={title}>
            <div className="footer-title mb-2">{title}</div>
            {items && Array.isArray(items) && items.length > 0 && (
              <ul className="text-sm">
                {items.map(({ title, href }) => (
                  <li className="mb-2" key={title}>
                    <a className="link link-hover" href={href}>
                      {title}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))
      }
    </div>

    <div className="md:flex md:items-center md:justify-between py-6 md:py-8">
      {/* <ul className="flex mb-4 md:order-1 -ml-2 md:ml-4 md:mb-0">
        {
          social.map(({ label, href, icon }) => (
            <li>
              <a
                className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 inline-flex items-center"
                aria-label={label}
                href={href}
              >
                <Icon name={icon} className="w-8 h-8" />
              </a>
            </li>
          ))
        }
      </ul> */}

      <div
        className="text-sm text-gray-700 mr-4 dark:text-slate-400 text-center md:text-left"
      >
        <p>© 2022-2023 <a href="https://www.hi.u-tokyo.ac.jp/" className="link link-hover">辞書語彙データベース</a></p>
        <p>
          注があるものを除いて, このサイトの内容物は<a
            href="https://creativecommons.org/licenses/by/4.0/deed.ja"
            className="link link-hover"
            target="_blank" rel="noreferrer">クリエイティブ・コモンズ 表示 4.0 ライセンス</a
          >の下に提供されています。
        </p>
        <p>公開物のライセンスは各自のページにご参照ください。</p>
      </div>
    </div>
  </div>
</footer>
  )
}

export default CommonFooter