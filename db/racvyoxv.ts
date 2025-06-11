import { prisma } from "@/lib/prisma";
import { Prisma, Racvyoxv } from "@prisma/client";

export interface RacvyoxvFindManyQuery {
  entry?: string | null;
  kanji_pair_length?: string;
  bu?: string | null;
  onyomi?: string | null;
  kunyomi?: string | null;
}

export async function racvyoxvFindOne(id: string) {
  const result = await prisma.racvyoxv.findUnique({
    where: { id },
  });
  return result;
}

export async function racvyoxvFindMany(query: RacvyoxvFindManyQuery) {
  console.log(query);
  const where: Prisma.RacvyoxvWhereInput = {
    AND: [
      {
        entry: {
          contains: query.entry as string,
        },
      },
      {
        entry_length: Number(query.kanji_pair_length) || undefined,
      },
      {
        bu: query.bu,
      },
      {
        kun: {
          contains: query.kunyomi as string,
        },
      },
      {
        on: {
          contains: query.onyomi as string,
        },
      },
    ],
  };
  const resutls = await prisma.$transaction([
    prisma.racvyoxv.count({ where }),
    prisma.racvyoxv.findMany({ where }),
  ]);

  const response = {
    query,
    count: resutls[0] as number,
    data: resutls[1] as Racvyoxv[],
  };

  return response;
}
