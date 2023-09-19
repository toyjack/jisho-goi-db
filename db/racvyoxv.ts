import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export interface RacvyoxvFindManyQuery {
  entry?: string | null;
  kanji_pair_length?: Number;
  bu?: string | null;
  furigana?: string | null;
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
              contains: query.entry,
            },
          },
          {
            entry: {
              contains: query.entry,
            },
          },
          
        ],
      },
      {
        kanji_pair_length: query.kanji_pair_length,
      },
      {
        initial_on: query.bu,
      },
      {
        OR:[
          {
            ruby_left_first: {
              contains: query.furigana,
            },
          },
          {
            ruby_left_remains: {
              contains: query.furigana,
            },
          },
          {
            ruby_right_first: {
              contains: query.furigana,
            },
          },
          {
            ruby_right_remains: {
              contains: query.furigana,
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
    count: resutls[0],
    data: resutls[1],
  };

  return response;
}