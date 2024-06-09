"use server";
import prisma from "@/lib/prisma";
import { productFormSchema } from "@/schemas/schemas";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function getProducts() {
  const products = await prisma.product.findMany({
    include: {
      category: true,
    },
  });

  revalidatePath("/");
  return products;
}

export async function getProduct(id: string) {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
    },
  });
  revalidatePath("/");
  return product;
}

export async function createProduct(data: z.infer<typeof productFormSchema>) {
  const validation = productFormSchema.safeParse(data);
  if (!validation.success) {
    return new NextResponse("Error creating product", { status: 403 });
  }
  await prisma.product.create({
    data: {
      name: data.name,
      description: data.description,
      price: data.price,
      status: data.status,
      views: 0,
      category: {
        connect: {
          id: data.categoryId,
        },
      },
    },
    include: {
      category: true,
    },
  });
  revalidatePath("/");
}

export async function updateProduct(
  id: string,
  data: z.infer<typeof productFormSchema>
) {
  const validation = productFormSchema.safeParse(data);
  if (!validation.success) {
    return new NextResponse("Error updating product", { status: 403 });
  }
  await prisma.product.update({
    where: {
      id,
    },
    data: {
      name: data.name,
      description: data.description,
      price: data.price,
      status: data.status,
      category: {
        connect: {
          id: data.categoryId,
        },
      },
    },
    include: {
      category: true,
    },
  });
  revalidatePath("/");
}

export async function deleteProduct(id: string) {
  await prisma.product.delete({
    where: {
      id,
    },
  });
  revalidatePath("/");
}
