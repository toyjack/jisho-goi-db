"use server";

import { prisma } from "@/lib/prisma";
import { JiruishoChushaku } from "@prisma/client";

export async function createItem(data:JiruishoChushaku){
  const item = await prisma.jiruishoChushaku.create({
    data
  });
  return item;
}

export async function updateItem(id:number, data:Partial<JiruishoChushaku>){
  const item = await prisma.jiruishoChushaku.update({
    where: { id },
    data
  });
  return item;
}

export async function deleteItem(id:number){
  const item = await prisma.jiruishoChushaku.delete({
    where: { id }
  });
  return item;
}

export async function getItem(id: number){
  const item = await prisma.jiruishoChushaku.findUnique({
    where: { id }
  });
  return item;
}

