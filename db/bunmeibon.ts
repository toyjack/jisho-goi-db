import { prisma } from "@/lib/prisma";
import { BunmeiSetsuyoshu, Prisma } from "@prisma/client";

export interface BunmeibonFindManyQuery {
  entry?: string | null;
  gokei?: string | null;
  shouten?: string | null;
  left_kun?: string | null;
  definition?: string | null;
  no_kundoku?: boolean | null;
}

export async function bunmeibonFindUnique(
  bunmeiId: string
): Promise<BunmeiSetsuyoshu | null> {
  const result = await prisma.bunmeiSetsuyoshu.findUnique({
    where: {
      bunmei_id: bunmeiId,
    },
  });
  return result;
}

export async function bunmeibonFindMany(query: BunmeibonFindManyQuery) {
  const where: Prisma.BunmeiSetsuyoshuWhereInput = {
    AND: [
      {
        entry: {
          contains: query.entry || undefined,
        },
      },
      {
        gokei: {
          contains: query.gokei || undefined,
        },
      },
      {
        shoten: {
          contains: query.shouten || undefined,
        },
      },
      {
        left_kun: {
          contains: query.left_kun || undefined,
        },
      },
      {
        definition: {
          contains: query.definition || undefined,
        },
      },
    ],
    OR: [
      {
        item_type: {
          not: query.no_kundoku ? "漢文訓読" : null,
        },
      },
      {
        item_type: null,
      },
    ],
  };

  const resutls = await prisma.$transaction([
    prisma.bunmeiSetsuyoshu.count({ where }),
    prisma.bunmeiSetsuyoshu.findMany({ where }),
  ]);

  return {
    query: {},
    count: resutls[0],
    data: resutls[1],
  };
}
