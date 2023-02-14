import React from 'react'

function CommonHeader() {

  const navList = [
    {
      title: "色葉字類抄",
      url: "/irohojiruisho",
    },
    {
      title: "落葉集",
      url: "/rakuyoshu",
    },
    {
      title: "和訓栞",
      url: "/wakunnoshiori",
    },
    {
      title: "文明本節用集",
      url: "/setsuyoshu",
    },
    {
      title: "増続大広益会玉篇大全",
      url: "/gyokuhentaizen",
    },
    {
      title: "本サイトについて",
      url: "/about",
    },
    {
      title: "お知らせ",
      url: "/news",
    },
  ];

  return (
    <header>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <a className="btn btn-ghost normal-case text-xl" href="/">
            <div className="w-10 p-2">
              <img src="/images/logo.png" alt="" width="80" height="80" />
            </div>
            辞書語彙データベース
          </a>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {navList.map((item) => (
              <li key={item.title}>
                <a href={item.url}>{item.title}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="navbar-end">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                ></path>
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navList.map((item) => (
                <li key={item.title}>
                  <a href={item.url}>{item.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

export default CommonHeader