import prisma from "../lib/prisma.js";

export async function findUserByEmail(email) {
  return prisma.user.findUnique({
    where: { email },
  });
}

export async function createUser({ email, password }) {
  return prisma.user.create({
    data: {
      email,
      password,
    },
  });
}

export async function findUserById(id) {
  return prisma.user.findUnique({
    where: { id },
  });
}
