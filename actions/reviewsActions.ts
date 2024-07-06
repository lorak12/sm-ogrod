"use server";

import prisma from "@/lib/prisma";
import { reviewSchema } from "@/schemas/schemas";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function getReviews() {
  const reviews = await prisma.review.findMany();
  revalidatePath("/");
  return reviews;
}

export async function getReview(id: string) {
  const review = await prisma.review.findUnique({
    where: {
      id: id,
    },
  });
  revalidatePath("/");
  return review;
}

export async function createReview(data: z.infer<typeof reviewSchema>) {
  const validation = reviewSchema.safeParse(data);
  if (!validation.success) {
    throw new NextResponse("Error creating review", { status: 403 });
  }
  await prisma.review.create({
    data: {
      ...data,
      productId: data.productId ? data.productId : null,
    },
  });
  revalidatePath("/");
}

export async function deleteReview(id: string) {
  await prisma.review.delete({
    where: {
      id: id,
    },
  });
  revalidatePath("/");
}
