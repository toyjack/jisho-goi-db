import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const where:Prisma.GyokuhentaizenWhereInput = {
      AND: [
        {
          entry: {
            contains: searchParams.get("entry") || undefined,
          },
        },
        {
          OR: [
            {
              jion_r: {
                contains: searchParams.get("jion") || undefined,
              },
            },
            {
              jion_l: {
                contains: searchParams.get("jion") || undefined,
              },
            },
          ],
        },
        {
          wakun: {
            contains: searchParams.get("wakun") || undefined,
          },
        },
        { radical: searchParams.get("radical") || undefined },
        { remain_strokes: searchParams.get("remain_strokes") || undefined },
        {
          ghtz_id: {
            startsWith: searchParams.get("ghtz_id") || undefined,
          },
        },
      ],
  };
  const resutls = await prisma.$transaction([
    prisma.gyokuhentaizen.count({ where }),
    prisma.gyokuhentaizen.findMany({ where }),
  ]);

  const response = {
    query: searchParams.toString(),
    count: resutls[0],
    data: resutls[1],
  };

  return NextResponse.json(response);
}
