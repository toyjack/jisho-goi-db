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
    where: { id: Number(id) },
  });
  return result;
}

export async function racvyoxvFindMany(query: RacvyoxvFindManyQuery){
  console.log(query);
  const where: Prisma.RacvyoxvWhereInput = {
    AND: [
      {
        OR: [
          {
            kanji_pair: {
              contains: query.entry as string,
            },
          },
          {
            entry: {
              contains: query.entry as string,
            },
          },
          
        ],
      },
      {
        kanji_pair_length: query.kanji_pair_length as string,
      },
      {
        initial_on: query.bu,
      },
      {
        OR:[
          {
            ruby_left_first: {
              contains: query.kunyomi as string,
            },
          },
          {
            ruby_left_remains: {
              contains: query.kunyomi as string,
            },
          },
        ]
      },
      {
        OR:[
          {
            ruby_right_first: {
              contains: query.onyomi as string,
            },
          },
          {
            ruby_right_remains: {
              contains: query.onyomi as string,
            },
          },
        ]
      }
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