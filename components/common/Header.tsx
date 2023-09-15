"use client";

import Link from "next/link";
import Image from "next/image";
import { databaseList, navList } from "@/constants/navList";
import LogoutButton from "../ui/LogoutButton";
import LoginButton from "../ui/LoginButton";
import { useSession } from "next-auth/react";
import { useState } from "react";

function CommonHeader() {
  const { data: session, status } = useSession();
  const headerTitle =
    "辞書語彙データベース" +
    (process.env.IS_DEV === "true" ? "（検証用）" : "");

  const closeDbMenu = () => {
    const elem = document.activeElement as HTMLElement;
    if(elem){
      elem?.blur();
    }
  };

  const ArrowDownIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-4 h-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
  return (
    <header>
      <div className="navbar bg-base-200">
        <div className="navbar-start">
          <a className="flex btn btn-ghost normal-case text-xl" href="/">
            <div className="w-16 p-2">
              <Image src="/images/logo.png" alt="" width="250" height="160" />
            </div>
            <div>{headerTitle}</div>
          </a>
        </div>

        <div className="navbar-center hidden md:flex">
          <Link href="/news" className="btn btn-ghost rounded-btn">
            過去のお知らせ
          </Link>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost rounded-btn">
              全文データベース<ArrowDownIcon />
            </label>
            <ul
              tabIndex={0}
              className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4"
            >
              {databaseList.map((database) => (
                <li key={database.title}>
                  <Link
                    href={database.url}
                    prefetch={false}
                    onClick={closeDbMenu}
                  >
                    {database.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <Link href="/gallery" className="btn btn-ghost rounded-btn">
            画像ギャラリー
          </Link>

          {/* <ul className="menu menu-horizontal px-1 bg-base-200">
            <li>
              <Link href="/news">過去のお知らせ</Link>
            </li>
            <li></li>
            <li>
              <details open={isDbMenuOpen}>
                <summary>全文データベース</summary>
                <ul className="p-2  text-base z-10">
                  {databaseList.map((database) => (
                    <li key={database.title}>
                      <Link
                        href={database.url}
                        prefetch={false}
                        onClick={closeDbMenu}
                      >
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
          </ul> */}
        </div>

        <div className="navbar-end">
          <div className="px-2 hidden lg:block">
            {session ? (
              <div className="flex gap-2">
                <Link className="btn btn-secondary" href="/user/profile">
                  プロファイル
                </Link>
                {session.user.role === "ADMIN" && (
                  <Link className="btn btn-info" href="/admin">
                    管理
                  </Link>
                )}
                <LogoutButton />
              </div>
            ) : (
              <LoginButton />
            )}
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

export default CommonHeader;
