import { prisma } from "@/lib/prisma";
import { Hzwm } from "@prisma/client";

export async function hzwmFindMany(where: Partial<Hzwm>){
  const result = await prisma.hzwm.findMany({
    where:{
      entry:{contains:where.entry || undefined},
      definition:{contains:where.definition || undefined},
      readings:{contains:where.readings || undefined},
    }
  });
  return {
    query: where,
    count: result.length,
    data: result,
  };
}

export async function hzwmFindOneById(id:string){
  const result = await prisma.hzwm.findUnique({
    where:{id}
  });
  return result;
}