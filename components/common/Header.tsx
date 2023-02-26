import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

function CommonHeader() {

  const databaseList = [
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
      url: "/bunmei",
    },
    {
      title: "増続大広益会玉篇大全",
      url: "/gyokuhentaizen",
    },
  ];

  const navList = [
    {
      title: "お知らせ",
      url: "/news",
    },
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
      url: "/bunmei",
    },
    {
      title: "増続大広益会玉篇大全",
      url: "/gyokuhentaizen",
    },
    {
      title: "画像ギャラリー",
      url: "/gallery",
    },
    {
      title: "本サイトについて",
      url: "/about",
    },
  ];

  return (
    <header>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <a className="btn btn-ghost normal-case text-xl" href="/">
            <div className="w-10 p-2">
              <Image src="/images/logo.png" alt="" width="80" height="80" />
            </div>
            辞書語彙データベース
          </a>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/news">お知らせ</Link>
            </li>
            <li tabIndex={0}>
              <a className="justify-between">
                全文データベース
                <svg
                  className="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                </svg>
              </a>
              <ul className="p-2 bg-base-200 z-10">
                {databaseList.map((database) => (
                  <li key={database.title}>
                    <Link href={database.url}>{database.title}</Link>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <Link href="/gallery">画像ギャラリー</Link>
            </li>
            <li>
              <Link href="/about">本サイトについて</Link>
            </li>
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
                  <Link href={item.url}>{item.title}</Link>
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