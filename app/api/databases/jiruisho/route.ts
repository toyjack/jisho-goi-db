import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const where: Prisma.JiruishoWhereInput = {
    AND: [
      {
        entry: {
          contains: searchParams.get("entry") || undefined,
        },
      },
      {
        hen: {
          contains: searchParams.get("hen") || undefined,
        },
      },
      {
        bu: {
          contains: searchParams.get("bu") || undefined,
        },
      },
      {
        onkun: {
          contains: searchParams.get("onkun") || undefined,
        },
      },
      {
        char_count: {
          contains: searchParams.get("char_count") || undefined,
        },
      },
      {
        gokei_search_original: {
          contains: searchParams.get("gokei_search_original") || undefined,
        },
      },
      // TODO: fix typo
      {
        defination: {
          contains: searchParams.get("definition") || undefined,
        },
      },
    ],
  };
  const resutls = await prisma.$transaction([
    prisma.jiruisho.count({ where }),
    prisma.jiruisho.findMany({ where }),
  ]);

  const response = {
    query: searchParams.toString(),
    count: resutls[0],
    data: resutls[1],
  };

  return NextResponse.json(response);
}
