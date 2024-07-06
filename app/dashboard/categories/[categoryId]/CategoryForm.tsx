"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { CircleCheck, CircleX, Send } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { Category } from "@prisma/client";
import { categorySchema } from "@/schemas/schemas";
import { createCategory, updateCategory } from "@/actions/categoryActions";

export default function CategoryForm({
  initialData,
}: {
  initialData: Category | null;
}) {
  const router = useRouter();

  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: { ...initialData },
  });

  async function onSubmit(data: z.infer<typeof categorySchema>) {
    try {
      if (initialData) {
        await updateCategory(initialData.id, data);
        toast({
          title: "Kategoria została zaktualizowana",
          action: <CircleCheck className="w-4 h-4 text-green-500" />,
        });
      } else {
        await createCategory(data);
        toast({
          title: "Kategoria została stworzona",
          action: <CircleCheck className="w-4 h-4 text-green-500" />,
        });
      }
      router.push("/dashboard/categories");
      router.refresh();
    } catch (error: any) {
      toast({
        title: "Coś poszło nie tak",
        variant: "destructive",
        action: <CircleX className="w-4 h-4 text-white" />,
      });
      console.error(error);
      throw new Error(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nazwa</FormLabel>
              <FormControl>
                <Input placeholder="Altany..." {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Opis</FormLabel>
              <FormControl>
                <Textarea placeholder="Opis kategorii" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="gap-2">
          Gotowe <Send className="w-4 h-4" />
        </Button>
      </form>
    </Form>
  );
}
