import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export interface WakunnoshioriFindManyQuery {
  entry?: string | null;
  definitions?: string | null;
}

export async function wakunnoshioriFindOne(id: string) {
  const result = await prisma.wakunnosiori_Entry.findUnique({
    where: { id: Number(id) },
  });
  return result;
}

export async function wakunnoshioriFindMany(query:WakunnoshioriFindManyQuery){
  
  const where: Prisma.Wakunnosiori_EntryWhereInput = {
    AND: [
      {
        entry: {
          contains: query.entry || undefined,
        },
      },
      {
        definitions: {
          some: {
            definition: {
              contains: query.definitions || undefined,
            },
          },
        },
      },
    ],
  };
  const resutls = await prisma.$transaction([
    prisma.wakunnosiori_Entry.count({ where }),
    prisma.wakunnosiori_Entry.findMany({
      where,
      include: { definitions: true },
    }),
  ]);
  const response = {
    query,
    count: resutls[0],
    data: resutls[1],
  };

  const temp = await prisma.wakunnosiori_Entry.findMany({
    where:{
      entry:{
        contains: query.entry || undefined,
      }
    },
    include: { definitions: true },
  })
  console.log(temp)

  return response;
}