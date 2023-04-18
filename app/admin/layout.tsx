"use client"

import Link from 'next/link'
import { SessionProvider } from "next-auth/react";

function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <div className="container mx-auto">
        <div className="p-10">
          <h2 className="text-3xl font-bold">
            <Link href="/admin">管理システム</Link>
          </h2>
        </div>
        <label
          htmlFor="drawer"
          className="px-2 h-auto w-full btn btn-primary drawer-button lg:hidden"
        >
          管理メニューを開く
        </label>

        <div className="drawer drawer-mobile h-max">
          <input id="drawer" type="checkbox" className="drawer-toggle" />

          <div className="drawer-content">{children}</div>

          <div className="drawer-side min-h-screen">
            <label htmlFor="drawer" className="drawer-overlay"></label>
            <div className="menu p-4 w-80 bg-base-200 text-base-content z-10">
              <ul className="menu p-2 rounded-box">
                <li className="menu-title">
                  <span>管理</span>
                </li>
                <li>
                  <Link href="/admin/news">お知らせ</Link>
                </li>
                <li>
                  <Link href="/admin/manuals">各DB説明文</Link>
                </li>
                <li className="menu-title">
                  <span>その他</span>
                </li>
                <li className="disabled">
                  <a>パスワード変更</a>
                </li>
                <li>
                  <Link href="/api/auth/signout">ログアウト</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </SessionProvider>
  );
}

export default DashboardLayout