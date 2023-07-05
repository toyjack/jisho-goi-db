import { prisma } from "@/lib/prisma";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token) return NextResponse.json({
    error: "You must be sign in to view the protected content on this page.",
  });

  const allUsersData = await prisma.user.findMany();
  const allUsers = allUsersData.map((user) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  });
  return NextResponse.json(allUsers);
}
