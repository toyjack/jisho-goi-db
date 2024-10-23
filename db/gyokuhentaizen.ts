import { prisma } from "@/lib/prisma";
// import { redis } from "@/lib/redis";
import { Prisma, Gyokuhentaizen } from "@prisma/client";

export interface GyokuhentaizenFindManyQuery extends Partial<Gyokuhentaizen> {
  entry?: string | null;
  jion?: string | null;
  maki?: string | null;
  tyo?: string | null;
}

export async function gyokuhentaizenFindOne(ghtz_id: string) {
  const result = await prisma.gyokuhentaizen.findUnique({
    where: {
      ghtz_id: ghtz_id,
    },
  });
  return result;
}

export async function gyokuhentaizenFindMany(
  query: GyokuhentaizenFindManyQuery
) {
  let ghtz_id: string | undefined = "";
  if (query.maki) {
    ghtz_id += query.maki;
    if (query.tyo) {
      ghtz_id += "_" + query.tyo;
    }
  } else {
    ghtz_id = undefined;
  }

  const where: Prisma.GyokuhentaizenWhereInput = {
    AND: [
      {
        entry: query.entry,
      },
      {
        OR: [
          {
            jion_r: {
              contains: query.jion || undefined,
            },
          },
          {
            jion_l: {
              contains: query.jion || undefined,
            },
          },
        ],
      },
      {
        OR:[
          {
            wakun: {
              contains: query.wakun || undefined,
            },
          }
        ]
      },
      { radical: query.radical },
      { remain_strokes: query.remain_strokes },
      {
        ghtz_id: {
          startsWith: ghtz_id,
        },
      },
    ],
  };

  // const key = JSON.stringify(`gyokuhentaizenFindMany:${JSON.stringify(where)}`);
  // const cached = await redis.get(key);

  let results: [number, Gyokuhentaizen[]];

  // if (cached) {
  // results = cached as [number, Gyokuhentaizen[]];
  // console.log("used cache:", key);
  // } else {
  results = await prisma.$transaction([
    prisma.gyokuhentaizen.count({ where }),
    prisma.gyokuhentaizen.findMany({ where }),
  ]);

  // const cacheValue = JSON.stringify(results);
  //   await redis.set(key, cacheValue);
  //   // console.log("cached:", key);
  // }

  const response = {
    query,
    count: results[0],
    data: results[1],
  };

  return response;
}
