import { racvyoxvFindOne } from "@/db/racvyoxv";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request:Request, {params}:{params:{id:string}}) {
  const result = await racvyoxvFindOne(params.id);
  return NextResponse.json(result);
}