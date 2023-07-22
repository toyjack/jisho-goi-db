import { prisma } from "@/lib/prisma";
import { Wamyouruijyusho } from "@prisma/client";

export interface KwrsWhere {
  entry?: string;
  definition?: string;
  maki?: string;
  bu?: string;
  type?: string;
}

export async function kwrsFindmany(where: KwrsWhere){
  const result = await prisma.wamyouruijyusho.findMany({
    where:{
      entry:{contains:where.entry as string},
      definition:{contains:where.definition as string},
      maki:{contains:where.maki as string},
      bu:{contains:where.bu as string},
      type:{contains:where.type as string},
    }
  });
  return {
    query: where,
    count: result.length,
    data: result,
  };
}

export async function kwrsFindOneById(id:number){
  const result = await prisma.wamyouruijyusho.findUnique({
    where:{id}
  });
  return result;
}