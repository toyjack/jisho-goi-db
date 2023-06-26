import Link from 'next/link';
import Image from 'next/image';
import { databaseList, navList } from '@/utils/navList';

function CommonHeader() {

  return (
    <header>
      <div className="navbar bg-base-200">
        <div className="navbar-start">
          <a className="btn btn-ghost normal-case text-xl" href="/">
            <div className="w-16 p-2">
              <Image src="/images/logo.png" alt="" width="250" height="160" />
            </div>
            辞書語彙データベース
          </a>
        </div>

        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal px-1 bg-base-200">
            <li>
              <Link href="/news">お知らせ</Link>
            </li>
            <li tabIndex={0}>
              <details>
                <summary>全文データベース</summary>
                <ul className="p-2  text-base z-10">
                  {databaseList.map((database) => (
                    <li key={database.title}>
                      <Link href={database.url} prefetch={false}>
                        {database.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            </li>
            <li>
              <Link href="/gallery">画像ギャラリー</Link>
            </li>
            {/* <li>
              <Link href="/about">本サイトについて</Link>
            </li> */}
          </ul>
        </div>

        <div className="navbar-end">
          <div className="px-2 hidden lg:block">
            <Link href="/admin" className="btn btn-secondary">
              管理
            </Link>
          </div>

          {/* mobile menu */}
          <details className="dropdown dropdown-end z-10">
            <summary className="m-1 btn md:hidden">
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
            </summary>
            <ul className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">
              {navList.map((item) => (
                <li key={item.title}>
                  <Link href={item.url} prefetch={false}>
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </details>
        </div>
      </div>
    </header>
  );
}

export default CommonHeader