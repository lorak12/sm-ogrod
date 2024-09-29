"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Check,
  ChevronsUpDown,
  CircleCheck,
  CircleMinus,
  CirclePlus,
  CircleX,
  PlusCircle,
  Send,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { categorySchema, productFormSchema } from "@/schemas/schemas";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { statuses } from "@/components/ui/constants";
import { createCategory } from "@/actions/categoryActions";
import { createProduct } from "@/actions/productActions";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UploadImageButton from "@/components/ui/upload-image-button";

export default function ProductForm({ categories }: { categories: any[] }) {
  const router = useRouter();

  const form = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      details: [
        {
          name: "",
          value: "",
        },
      ],
      images: [],
    },
  });

  const categoryForm = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "details",
  });

  async function onCategoryFormSubmit(data: z.infer<typeof categorySchema>) {
    try {
      await createCategory(data);
      toast({
        title: "Kategoria została stworzona",
        action: <CircleCheck className="w-4 h-4 text-green-500" />,
      });
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

  async function onSubmit(data: z.infer<typeof productFormSchema>) {
    try {
      await createProduct(data);
      toast({
        title: "Produkt został stworzony",
        action: <CircleCheck className="w-4 h-4 text-green-500" />,
      });
      router.push("/dashboard/products");
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
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Zdjęcia</FormLabel>
              <FormControl>
                <UploadImageButton
                  imageDisplay={true}
                  value={field.value.map((image) => image.url)}
                  disabled={field.disabled}
                  onChange={(url) => field.onChange([...field.value, { url }])}
                  onRemove={(url) =>
                    field.onChange([
                      ...field.value.filter((current) => current.url != url),
                    ])
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nazwa</FormLabel>
              <FormControl>
                <Input placeholder="Huśtawka..." {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Kategoria</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? categories.find(
                            (category) => category.id === field.value
                          )?.name
                        : "Wybierz kategorie"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandList>
                      <CommandInput placeholder="Szukaj..." />
                      <CommandEmpty>Brak kategorii</CommandEmpty>
                      <CommandGroup>
                        <CommandItem>
                          <Dialog>
                            <DialogTrigger asChild>
                              <button className="relative flex cursor-default select-none items-center rounded-sm text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50">
                                <CirclePlus className="mr-2 h-4 w-4" />
                                Dodaj kategorie
                              </button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                              <DialogHeader>
                                <DialogTitle>Dodaj kategorie</DialogTitle>
                              </DialogHeader>
                              <div className="grid gap-4 pt-4">
                                <Form {...categoryForm}>
                                  <form
                                    onSubmit={categoryForm.handleSubmit(
                                      onCategoryFormSubmit
                                    )}
                                    className="space-y-8"
                                  >
                                    <FormField
                                      control={categoryForm.control}
                                      name="name"
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel>Nazwa </FormLabel>
                                          <FormControl>
                                            <Input
                                              placeholder="Huśtawki..."
                                              {...field}
                                            />
                                          </FormControl>

                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                    <FormField
                                      control={categoryForm.control}
                                      name="description"
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel>Opis</FormLabel>
                                          <FormControl>
                                            <Textarea
                                              placeholder="..."
                                              {...field}
                                            />
                                          </FormControl>

                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />

                                    <DialogFooter>
                                      <DialogClose asChild>
                                        <Button type="submit">Utwórz</Button>
                                      </DialogClose>
                                    </DialogFooter>
                                  </form>
                                </Form>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </CommandItem>
                        {categories.map((category) => (
                          <CommandItem
                            value={category.id}
                            key={category.id}
                            onSelect={() => {
                              form.setValue("categoryId", category.id);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                category.id === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {category.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>
                Wybierz kategorie do której należy produkt lub stwórz nową.
              </FormDescription>
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
                <Textarea placeholder="Opis produktu" {...field} />
              </FormControl>
              <FormDescription>
                This is the product description.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cena</FormLabel>
              <FormControl>
                <Input placeholder="0" type="number" {...field} />
              </FormControl>
              <FormDescription>This is the product price.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Wybierz status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {statuses.map((status) => (
                    <SelectItem value={status.value} key={status.value}>
                      <div className="flex">
                        <status.icon className="w-4 h-4 mr-2" />
                        {status.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
        <Card>
          <CardHeader>
            <CardTitle>Szczegóły</CardTitle>
            <CardDescription>
              Tabelka zawierająca np. wymiary lub dostępne dodatki
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Szczegóły</TableHead>
                  <TableHead>Nazwa wartości</TableHead>
                  <TableHead>Wartość</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fields.map((field, index: number) => (
                  <TableRow key={field.id} className="h-[100px]">
                    <TableCell className="font-semibold">{index + 1}</TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name={`details.${index}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <Input {...field} placeholder="Szerokość..." />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name={`details.${index}.value`}
                        render={({ field }) => (
                          <FormItem>
                            <Input {...field} placeholder="200 cm" />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="gap-1"
                        type="button"
                        onClick={() => (index > 0 ? remove(index) : null)}
                      >
                        <CircleMinus className="h-3.5 w-3.5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="justify-center border-t p-4">
            <Button
              size="sm"
              variant="ghost"
              type="button"
              className="gap-1"
              onClick={() => append({ name: "", value: "" })}
            >
              <PlusCircle className="h-3.5 w-3.5" />
              Dodaj wiersz
            </Button>
          </CardFooter>
        </Card>

        <Button type="submit" className="gap-2">
          Gotowe <Send className="w-4 h-4" />
        </Button>
      </form>
    </Form>
  );
}
