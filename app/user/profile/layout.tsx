import { ProfileRoute } from '@/constants/profileRoute'
import Link from 'next/link'
import React from 'react'

function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto">
      <div className="p-4 m-2 bg-base-100">
        <h1 className="text-base-content text-3xl">
          <Link href="/user/profile">ユーザー情報</Link>
        </h1>
      </div>

      <div className="flex">
        <div className="basis-1/4">
          <ul className="p-2 m-2 menu bg-base-200 rounded-box">
            <li>
              <h2 className="menu-title">
                <Link href="/user/profile">ユーザー情報</Link>
              </h2>
              <ul>
                {ProfileRoute.map((route) => (
                  <li key={route.label}>
                    <Link href={route.path}>{route.label}</Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>

        <div className="basis-3/4 overflow-x-auto">{children}</div>
      </div>
    </div>
  )
}

export default ProfileLayout