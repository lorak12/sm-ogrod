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
      details: true,
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
      details: true,
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

  await prisma.$transaction(async (prisma) => {
    const product = await prisma.product.create({
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
        details: true,
      },
    });

    await prisma.detail.createMany({
      data: data.details.map((detail) => ({
        name: detail.name,
        value: detail.value,
        productId: product.id,
      })),
    });

    return product;
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
  await prisma.$transaction(async (prisma) => {
    const product = await prisma.product.update({
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
        details: true,
      },
    });

    await prisma.detail.deleteMany({
      where: {
        productId: id,
      },
    });

    await prisma.detail.createMany({
      data: data.details.map((detail) => ({
        name: detail.name,
        value: detail.value,
        productId: product.id,
      })),
    });
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

export async function getActiveProducts(searchParams: { name?: string, categoryId?: string, maxPrice?: number, minPrice?: number }){
  const { name, categoryId, maxPrice, minPrice } = searchParams;

  const products = await prisma.product.findMany({
    where: {
    status: "public",
    ...(name && { name: { contains: name, mode: 'insensitive' } }),
    ...(categoryId && { categoryId: categoryId }),
    ...(maxPrice && { price: { lte: Number(maxPrice) } }),
    ...(minPrice && { price: { gte: Number(minPrice) } }),
  },
    include: {
      category: true,
      details: true,
    }
  });

  revalidatePath("/");
  return products;
}


export async function updateProductViews(id: string){
  await prisma.product.update({
    where: {
      id
    },
    data: {
      views: {
        increment: 1
      }
    }
  })
  revalidatePath("/");
}