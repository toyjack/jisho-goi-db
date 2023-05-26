import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";


export interface JiruishoFindManyQuery {
  entry?: string | null;
  hen?: string | null;
  bu?: string | null;
  onkun?: string | null;
  char_count?: string | null;
  gokei_search_original?: string | null;
  definition?: string | null;
}


export async function jiruishoFindmany(query:JiruishoFindManyQuery){
  const where: Prisma.JiruishoWhereInput = {
    AND: [
      {
        entry: {
          contains: query.entry || undefined,
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
      {
        gokei_search_original: {
          contains: query.gokei_search_original || undefined,
        },
      },
      // TODO: fix typo
      {
        defination: {
          contains: query.definition || undefined,
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