import { AdminRoute } from "@/constants/adminRoute";
import { authOptions } from "@/lib/nextauth-options";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

async function AdminLayout({ children }: { children: React.ReactNode }) {
  // 管理者認証
  const session = await getServerSession(authOptions);
  if (!session) redirect("/api/auth/signin");

  if (session.user.role !== "ADMIN")
    return (
      <div className="container mx-auto">
        <div className="flex w-full p-4 m-4">
          <h1 className="text-3xl font-bold">管理者権限がありません</h1>
        </div>
      </div>
    );

  return (
    <div className="container mx-auto">
      <div className="p-4 m-2 bg-base-100">
        <h1 className="text-base-content text-3xl">
          <Link href="/admin">管理システム</Link>
        </h1>
      </div>

      <div className="flex">
        <div className="basis-1/4">
          <ul className="p-2 m-2 menu bg-base-200 rounded-box">
            <li>
              <h2 className="menu-title">
                <Link href="/admin">管理システム</Link>
              </h2>
              <ul>
                {AdminRoute.map((route) => (
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
  );
}

export default AdminLayout;
