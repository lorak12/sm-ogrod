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
});

export const categorySchema = z.object({
  name: z.string().min(1, { message: "Nazwa jest wymagana" }),
  description: z.string().min(1, { message: "Opis jest wymagany" }),
});
