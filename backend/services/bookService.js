import prisma from "../lib/prisma.js";

export async function getBooksByUser(userId) {
  return prisma.book.findMany({
    where: { userId },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      genres: true,
    },
  });
}

export async function createBook(userId, data) {
  return prisma.book.create({
    data: {
      ...data,
      userId,
      genres: {
        create: data.genres.map((name) => ({ name })),
      },
    },
    include: {
      genres: true,
    },
  });
}

export async function updateBook(userId, bookId, data) {
  return prisma.book.update({
    where: {
      id: bookId,
      userId,
    },
    data: {
      ...data,
      genres: {
        deleteMany: {},
        create: data.genres.filter(Boolean).map((genre) => ({ name: genre })),
      },
    },
    include: {
      genres: true,
    },
  });
}

export async function deleteBook(userId, bookId) {
  return prisma.book.deleteMany({
    where: {
      id: bookId,
      userId,
    },
  });
}
