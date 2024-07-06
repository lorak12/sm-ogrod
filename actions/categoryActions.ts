"use server";
import prisma from "@/lib/prisma";
import { categorySchema } from "@/schemas/schemas";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function getCategories() {
  const categories = await prisma.category.findMany();
  revalidatePath("/");
  return categories;
}

export async function getCategory(id: string) {
  const category = await prisma.category.findUnique({
    where: {
      id: id,
    },
  });
  revalidatePath("/");
  return category;
}

export async function createCategory(data: z.infer<typeof categorySchema>) {
  const validation = categorySchema.safeParse(data);
  if (!validation.success) {
    throw new NextResponse("Error creating category", { status: 403 });
  }
  await prisma.category.create({
    data: {
      name: data.name,
      description: data.description,
    },
  });
  revalidatePath("/");
}

export async function updateCategory(
  id: string,
  data: z.infer<typeof categorySchema>
) {
  const validation = categorySchema.safeParse(data);
  if (!validation.success) {
    throw new NextResponse("Error updating category", { status: 403 });
  }
  await prisma.category.update({
    where: {
      id: id,
    },
    data: {
      name: data.name,
      description: data.description,
    },
  });
  revalidatePath("/");
}

export async function deleteCategory(id: string) {
  await prisma.$transaction(async (prisma) => {
    const category = await prisma.category.findUnique({
      where: {
        id: id,
      },
    });

    if (!category) {
      throw new NextResponse("Error deleting category", { status: 403 });
    }

    await prisma.product.updateMany({
      where: {
        categoryId: id,
      },
      data: {
        categoryId: "Brak Kategorii",
      },
    });

    await prisma.category.delete({
      where: {
        id: id,
      },
    });
  });
  revalidatePath("/");
}
