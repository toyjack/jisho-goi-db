"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function searchJiruisho(formData: FormData) {
  const id = formData.get("id")?.toString();
  const word = formData.get("word")?.toString();
  const definition = formData.get("definition")?.toString();

  const searchParams = new URLSearchParams();
  if (id) searchParams.append("id", id);
  if (word) searchParams.append("word", word);
  if (definition) searchParams.append("definition", definition);
  const query = searchParams.toString();
  redirect(`/jiruisho/results?${query}`);
}

export async function getJiruishoById(id: number) {
  const result = await prisma.jiruisho.findUnique({
    where: {
      id: id,
    },
    include: {
      chushaku: true,
    },
  });
  return result;
}

export async function createJiruishoChushaku(formData: FormData) {
  const jiurishoId = formData.get("jiurishoId")?.toString();
  const note = formData.get("note")?.toString();

  // use upsert to create or update the chushaku
  await prisma.jiruishoChushaku.upsert({
    where:{
      jiruisho_id: Number(jiurishoId)
    },
    update: {
      annotation: note,
    },
    create: {
      annotation: note || "",
      // TODO: add word_in_kurokawa and word_in_maeda
      word_in_kurokawa: "",
      word_in_maeda: "",
      jiruisho: {
        connect: {
          id: Number(jiurishoId),
        },
      },
    }
  });
  

  revalidatePath("/jiruisho-chushaku");
  redirect(`/jiruisho-chushaku/create?id=${jiurishoId}`);
}
