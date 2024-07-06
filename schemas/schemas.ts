import { z } from "zod";

export const detailSchema = z.object({
  name: z.string().min(1, { message: "Nazwa jest wymagana" }),
  value: z.string().min(1, { message: "Wartość jest wymagana" }),
});

export const productFormSchema = z.object({
  name: z
    .string({ message: "Wymagane" })
    .min(1, { message: "Nazwa jest wymagana" }),
  description: z
    .string({ message: "Wymagane" })
    .min(1, { message: "Opus jest wymagany" }), // opis
  price: z.coerce
    .number({ message: "Wymagane" })
    .nonnegative({ message: "Cena musi być liczbą nieujemną" }), // cena
  status: z
    .string({ message: "Wymagane" })
    .min(1, { message: "Status jest wymagany" }), // status: publiczny, niepubliczny, wycofany, wstrzymany itp.
  categoryId: z
    .string({ message: "Wymagane" })
    .min(1, { message: "ID kategorii jest wymagane" }),
  details: z.array(detailSchema),
  images: z.object({ url: z.string() }).array(),
});

export const categorySchema = z.object({
  name: z.string().min(1, { message: "Nazwa jest wymagana" }),
  description: z.string().min(1, { message: "Opis jest wymagany" }),
});

export const searchSchema = z.object({
  name: z.string().optional(),
  categoryId: z.string().optional(),
  maxPrice: z.coerce.number().optional(),
  minPrice: z.coerce.number().optional(),
});

export const reviewSchema = z.object({
  name: z.string().min(1, { message: "Nazwa jest wymagana" }),
  surname: z.string().min(1, { message: "Nazwisko jest wymagane" }),
  email: z.string().min(1, { message: "Email jest wymagany" }),
  stars: z.coerce
    .number()
    .min(0, { message: "Ocena jest wymagana" })
    .nonnegative({ message: "Ocena musi być liczbą nieujemną" }),
  content: z.string().min(1, { message: "Treść jest wymagana " }),
  productId: z.string().optional(),
});
