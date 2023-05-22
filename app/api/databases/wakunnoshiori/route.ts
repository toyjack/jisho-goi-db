import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  console.log(searchParams);
  const query: Prisma.Wakunnosiori_EntryWhereInput = {
    AND: [
      {
        entry: {
          contains: searchParams.get("entry") || undefined,
        },
      },
      {
        definations: {
          some: {
            defination:{
              contains: searchParams.get("definitions") || undefined,
            }
          },
        },
      },
    ],
  };
  const resutls = await prisma.$transaction([
    prisma.wakunnosiori_Entry.count({ where: query }),
    prisma.wakunnosiori_Entry.findMany({
      where: query,
      include: { definations: true },
    }),
  ]);
  const response = {
    query: searchParams.toString(),
    count: resutls[0],
    data: resutls[1],
  };
  return NextResponse.json(response);
}
