import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const where: Prisma.RacvyoxvWhereInput = {
    AND: [
      {
        OR: [
          {
            kanji_pair: {
              contains: searchParams.get("term") || undefined,
            },
          },
          {
            entry: {
              contains: searchParams.get("term") || undefined,
            },
          },
          {
            ruby_left_first: {
              contains: searchParams.get("term") || undefined,
            },
          },
          {
            ruby_left_remains: {
              contains: searchParams.get("term") || undefined,
            },
          },
          {
            ruby_right_first: {
              contains: searchParams.get("term") || undefined,
            },
          },
          {
            ruby_right_remains: {
              contains: searchParams.get("term") || undefined,
            },
          },
        ],
      },
      {
        kanji_pair_length: searchParams.get("kanji_pair_length") || undefined,
      },
    ],
  };
  const resutls = await prisma.$transaction([
    prisma.racvyoxv.count({ where }),
    prisma.racvyoxv.findMany({ where }),
  ]);

  const response = {
    query: searchParams.toString(),
    count: resutls[0],
    data: resutls[1],
  };

  return NextResponse.json(response);
}
