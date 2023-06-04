import { prisma } from "@/lib/prisma";
import { Jiruisho, Prisma } from "@prisma/client";

export interface JiruishoFindManyQuery {
  entry?: string | null;
  gokei_search_current?: string | null;
  gokei_search_original?: string | null;
  definition?: string | null;
  shouten?: string | null;
  hen?: string | null;
  bu?: string | null;
  onkun?: string | null;
  char_count?: string | null;
}

export async function jiruishoFindOne(id: string) {
  const result = await prisma.jiruisho.findUnique({
    where: { id: Number(id) },
  });
  return result;
}

export async function jiruishoFindmany(query: Partial<Jiruisho>) {
  const where: Prisma.JiruishoWhereInput = {
    AND: [
      {
        entry: {
          contains: query.entry || undefined,
        },
      },
      {
        gokei_search_current: {
          contains: query.gokei_search_current || undefined,
        },
      },
      {
        gokei_search_original: {
          contains: query.gokei_search_original || undefined,
        },
      },
      {
        definition: {
          contains: query.definition || undefined,
        },
      },

      {
        shouten: {
          contains: query.shouten || undefined,
        },
      },
      {
        hen: {
          contains: query.hen || undefined,
        },
      },
      {
        bu: {
          contains: query.bu || undefined,
        },
      },
      {
        onkun: {
          contains: query.onkun || undefined,
        },
      },
      {
        char_count: {
          contains: query.char_count || undefined,
        },
      },
    ],
  };
  const resutls = await prisma.$transaction([
    prisma.jiruisho.count({ where }),
    prisma.jiruisho.findMany({ where }),
  ]);

  const response = {
    query,
    count: resutls[0],
    data: resutls[1],
  };

  return response;
}
