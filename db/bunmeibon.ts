import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export interface BunmeibonFindManyQuery {
  entry?: string | null;
  gokei?: string | null;
  shouten?: string | null;
  left_kun?: string | null;
  definition?: string | null;
}


export async function bunmeibonFindUnique(bunmeiId: string) {
  const result = await prisma.bunmeiSetsuyoshu.findUnique({
    where: {
      bunmei_id: bunmeiId,
    },
  });
  return result;
}

export async function bunmeibonFindMany(query: BunmeibonFindManyQuery) {
  const where: Prisma.BunmeiSetsuyoshuWhereInput = {
    entry: {
      contains: query.entry || undefined,
    },
    gokei: {
      contains: query.gokei || undefined,
    },
    shouten: {
      contains: query.shouten || undefined,
    },
    left_kun: {
      contains: query.left_kun || undefined,
    },
    defination: {
      contains: query.definition || undefined,
    },
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