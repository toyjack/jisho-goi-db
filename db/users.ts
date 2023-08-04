import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";
import { hash } from "bcrypt";

export async function userFindMany() {
  const allUsers = await prisma.user.findMany();
  return allUsers;
}

export async function userFindOne(id: string) {
  const result = await prisma.user.findUnique({
    where: { id },
  });
  return result;
}

export async function userDeleteById(id: string) {
  const result = await prisma.user.delete({
    where: { id },
  });
  return result;
}

export async function userCreate(data: Partial<User>) {
  const name = data.name;
  const email = data.email as string;
  const hashedPwd = await hash(data.password as string, 10);
  const role = data.role;
  const createdAt = new Date();

  const result = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPwd,
      role,
      createdAt,
    },
  });
  return result;
}
