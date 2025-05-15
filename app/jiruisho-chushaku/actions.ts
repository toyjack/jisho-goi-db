"use server";

import { prisma } from "@/lib/prisma";
import { JiruishoChushaku } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function getAllItems() {
  const items = await prisma.jiruishoChushaku.findMany({
    include: {
      jiruisho: true,
    },
  });
  return items;
}

export async function createItem(data: JiruishoChushaku) {
  try {
    await prisma.jiruishoChushaku.create({
      data,
    });
  } catch (error) {
    console.error("Error creating item:", error);
    throw new Error("Failed to create item");
  }

  revalidatePath("/jiruisho-chushaku");
}

export async function updateItem(id: number, data: Partial<JiruishoChushaku>) {
  try {
    await prisma.jiruishoChushaku.update({
      where: { id },
      data,
    });
  } catch (error) {
    console.error("Error updating item:", error);
    throw new Error("Failed to update item");
  }

  revalidatePath("/jiruisho-chushaku");
}

export async function deleteItem(id: number) {
  try {
    await prisma.jiruishoChushaku.delete({
      where: { id },
    });
  } catch (error) {
    console.error("Error deleting item:", error);
    throw new Error("Failed to delete item");
  }

  revalidatePath("/jiruisho-chushaku");
}

export async function getItem(id: number) {
  const item = await prisma.jiruishoChushaku.findUnique({
    where: { id },
  });
  return item;
}

