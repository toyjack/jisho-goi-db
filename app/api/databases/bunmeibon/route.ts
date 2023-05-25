import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const where: Prisma.BunmeiSetsuyoshuWhereInput = {
    entry: {
      contains: searchParams.get("entry") || undefined,
    },
    gokei: {
      contains: searchParams.get("gokei") || undefined,
    },
    shouten: {
      contains: searchParams.get("shouten") || undefined,
    },
    left_kun: {
      contains: searchParams.get("left_kun") || undefined,
    },
    defination: {
      contains: searchParams.get("def") || undefined,
    },
  };
  const resutls = await prisma.$transaction([
    prisma.bunmeiSetsuyoshu.count({ where }),
    prisma.bunmeiSetsuyoshu.findMany({ where }),
  ]);

  const response = {
    query: searchParams.toString(),
    count: resutls[0],
    data: resutls[1],
  };

  return NextResponse.json(response);
}
