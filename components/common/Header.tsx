"use client";

import Link from "next/link";
import Image from "next/image";
import { NavLink, navMenu } from "@/constants/nav-menu";
import { Database } from "@/constants/db-menu";
import RegisterButton from "../ui/RegisterButton";
import LogoutButton from "../ui/LogoutButton";
import LoginButton from "../ui/LoginButton";
import { useSession } from "next-auth/react";

function NavMenuItem({ item }: { item: NavLink | Database[] }) {
  const closeDbMenu = () => {
    const elem = document.activeElement as HTMLElement;
    if (elem) {
      elem?.blur();
    }
  };

  if (Array.isArray(item)) {
    return (
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost rounded-btn">
          全文データベース
          <ArrowDownIcon />
        </label>
        <ul
          tabIndex={0}
          className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4"
        >
          {item.map((database) => (
            <li key={database.title}>
              <Link href={database.url} prefetch={false} onClick={closeDbMenu}>
                {database.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <Link
      href={item.url as string}
      prefetch={false}
      className="btn btn-ghost rounded-btn"
    >
      {item.title}
    </Link>
  );
}

function ArrowDownIcon() {
  return (
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
}

function MobileMenu() {
  return (
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
        {navMenu.flat().map((item) => (
          <li key={item.title}>
            <Link href={item.url} prefetch={false}>
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </details>
  );
}

function CommonHeader() {
  const { data: session } = useSession();
  const headerTitle = "辞書語彙データベース"

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
          {navMenu.map((item, index) => (
            <NavMenuItem item={item} key={index} />
          ))}
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
              <div className="flex space-x-4">
                <LoginButton />
                <RegisterButton />
              </div>
            )}
          </div>
          {/* mobile menu */}
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}

export default CommonHeader;
