import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export interface JiruishoFindManyQuery {
  entry?: string | null;
  gokei_search?: string | null;
  definition?: string | null;
  shouten?: string | null;
  hen?: string | null;
  bu?: string | null;
  onkun?: string | null;
  char_count?: string | null;
  ndl_url?: string | null;
}

export async function jiruishoFindOne(id: string) {
  const result = await prisma.jiruisho.findUnique({
    where: { id: Number(id) },
    include:{
      chushaku: true
    }
  });
  return result;
}

export async function jiruishoFindmany(query: JiruishoFindManyQuery) {
  const where: Prisma.JiruishoWhereInput = {
    AND: [
      {
        entry: {
          contains: query.entry || undefined,
        },
      },
      {
        OR: [
          {
            gokei_search_current: {
              contains: query.gokei_search || undefined,
            },
          },
          {
            gokei_search_original: {
              contains: query.gokei_search || undefined,
            },
          },
        ],
      },
      {
        OR: [
          {
            maeda_ndl_url: {
              contains: query.ndl_url || undefined,
            },
          },
          {
            kurokawa_ndl_url: {
              contains: query.ndl_url || undefined,
            },
          },
        ],
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


export async function countItemsByField(
  field: keyof JiruishoFindManyQuery,
  value: string
) {
  const where: Prisma.JiruishoWhereInput = {
    [field]: {
      contains: value,
    },
  };

  const count = await prisma.jiruisho.count({ where });
  return count;
}