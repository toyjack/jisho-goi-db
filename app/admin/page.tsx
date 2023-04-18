"use client";

import { useSession, signIn, signOut } from "next-auth/react";

function DashboardIndexPage() {
  const { data } = useSession();

  return (
    <div>
      <button className="btn" onClick={() => signIn()}>
        Sign in
      </button>
      <button className="btn" onClick={() => signOut()}>
        Sign out
      </button>
      <p>{data?.user?.name}</p>
      <p>{data?.user?.email}</p>
      <p>{}</p>
    </div>
  );
}

export default DashboardIndexPage;
