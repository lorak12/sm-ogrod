import { z } from "zod";

export const productFormSchema = z.object({
  name: z.string().min(1, { message: "Nazwa jest wymagana" }),
  description: z.string(), // opis
  price: z.coerce
    .number()
    .nonnegative({ message: "Cena musi być liczbą nieujemną" }), // cena
  status: z.string().min(1, { message: "Status jest wymagany" }), // status: publiczny, niepubliczny, wycofany, wstrzymany itp.
  categoryId: z.string().min(1, { message: "ID kategorii jest wymagane" }),
});

export const categorySchema = z.object({
  name: z.string().min(1, { message: "Nazwa jest wymagana" }),
  description: z.string().min(1, { message: "Opis jest wymagany" }),
});
