import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export interface RacvyoxvFindManyQuery {
  term?: string | null;
  kanji_pair_length: string | null;
}

export async function racvyoxvFindMany(query: RacvyoxvFindManyQuery){
  const where: Prisma.RacvyoxvWhereInput = {
    AND: [
      {
        OR: [
          {
            kanji_pair: {
              contains: query.term || undefined,
            },
          },
          {
            entry: {
              contains: query.term || undefined,
            },
          },
          {
            ruby_left_first: {
              contains: query.term || undefined,
            },
          },
          {
            ruby_left_remains: {
              contains: query.term || undefined,
            },
          },
          {
            ruby_right_first: {
              contains: query.term || undefined,
            },
          },
          {
            ruby_right_remains: {
              contains: query.term || undefined,
            },
          },
        ],
      },
      {
        kanji_pair_length: query.kanji_pair_length || undefined,
      },
    ],
  };
  const resutls = await prisma.$transaction([
    prisma.racvyoxv.count({ where }),
    prisma.racvyoxv.findMany({ where }),
  ]);

  const response = {
    query,
    count: resutls[0],
    data: resutls[1],
  };

  return response;
}