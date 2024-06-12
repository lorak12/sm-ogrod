"use client";
import { createCategory } from "@/actions/categoryActions";
import { updateProduct } from "@/actions/productActions";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { statuses } from "@/components/ui/constants";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { toast } from "@/components/ui/use-toast";
import { categorySchema, productFormSchema } from "@/schemas/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Check,
  ChevronLeft,
  ChevronsUpDown,
  CircleCheck,
  CirclePlus,
  CircleX,
  PlusCircle,
  Upload,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Category } from "@prisma/client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function Client({
  product,
  categories,
}: {
  product: any;
  categories: Category[];
}) {
  const status = statuses.find((status) => status.value === product.status);

  const router = useRouter();

  const form = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: product.name,
      description: product.description,
      price: product.price,
      status: product.status,
      categoryId: product.categoryId,
    },
  });

  const categoryForm = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      description: "",
    },
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
      await updateProduct(product.id, data);

      toast({
        title: "Produkt został zaktualizowany",
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
    <div className="flex flex-1 flex-col gap-4  lg:gap-6 ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard/products">
                  Produkty
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{product.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="grid flex-1 auto-rows-max gap-4">
            <div className="flex items-center gap-4">
              <Link href="/dashboard/products">
                <Button variant="outline" size="icon" className="h-7 w-7">
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Back</span>
                </Button>
              </Link>
              <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                {product.name}
              </h1>
              <Badge variant="outline" className="ml-auto sm:ml-0">
                {status?.label}
              </Badge>
            </div>
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                <Card x-chunk="dashboard-07-chunk-0">
                  <CardHeader>
                    <CardTitle>Szczegóły produktu</CardTitle>
                    <CardDescription>
                      Edytuj opis, nazwe, dodawaj zdjęcia oraz więcej.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nazwa</FormLabel>
                            <FormControl>
                              <Input placeholder="shadcn" {...field} />
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
                              <Textarea
                                placeholder="Opis produktu"
                                {...field}
                              />
                            </FormControl>
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
                            <FormDescription>
                              This is the product price.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
                <Card x-chunk="dashboard-07-chunk-1">
                  <CardHeader>
                    <CardTitle>Stock</CardTitle>
                    <CardDescription>
                      Lipsum dolor sit amet, consectetur adipiscing elit
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">SKU</TableHead>
                          <TableHead>Stock</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead className="w-[100px]">Size</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-semibold">
                            GGPC-001
                          </TableCell>
                          <TableCell>
                            <Label htmlFor="stock-1" className="sr-only">
                              Stock
                            </Label>
                            <Input
                              id="stock-1"
                              type="number"
                              defaultValue="100"
                            />
                          </TableCell>
                          <TableCell>
                            <Label htmlFor="price-1" className="sr-only">
                              Price
                            </Label>
                            <Input
                              id="price-1"
                              type="number"
                              defaultValue="99.99"
                            />
                          </TableCell>
                          <TableCell>
                            <ToggleGroup
                              type="single"
                              defaultValue="s"
                              variant="outline"
                            >
                              <ToggleGroupItem value="s">S</ToggleGroupItem>
                              <ToggleGroupItem value="m">M</ToggleGroupItem>
                              <ToggleGroupItem value="l">L</ToggleGroupItem>
                            </ToggleGroup>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-semibold">
                            GGPC-002
                          </TableCell>
                          <TableCell>
                            <Label htmlFor="stock-2" className="sr-only">
                              Stock
                            </Label>
                            <Input
                              id="stock-2"
                              type="number"
                              defaultValue="143"
                            />
                          </TableCell>
                          <TableCell>
                            <Label htmlFor="price-2" className="sr-only">
                              Price
                            </Label>
                            <Input
                              id="price-2"
                              type="number"
                              defaultValue="99.99"
                            />
                          </TableCell>
                          <TableCell>
                            <ToggleGroup
                              type="single"
                              defaultValue="m"
                              variant="outline"
                            >
                              <ToggleGroupItem value="s">S</ToggleGroupItem>
                              <ToggleGroupItem value="m">M</ToggleGroupItem>
                              <ToggleGroupItem value="l">L</ToggleGroupItem>
                            </ToggleGroup>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-semibold">
                            GGPC-003
                          </TableCell>
                          <TableCell>
                            <Label htmlFor="stock-3" className="sr-only">
                              Stock
                            </Label>
                            <Input
                              id="stock-3"
                              type="number"
                              defaultValue="32"
                            />
                          </TableCell>
                          <TableCell>
                            <Label htmlFor="price-3" className="sr-only">
                              Stock
                            </Label>
                            <Input
                              id="price-3"
                              type="number"
                              defaultValue="99.99"
                            />
                          </TableCell>
                          <TableCell>
                            <ToggleGroup
                              type="single"
                              defaultValue="s"
                              variant="outline"
                            >
                              <ToggleGroupItem value="s">S</ToggleGroupItem>
                              <ToggleGroupItem value="m">M</ToggleGroupItem>
                              <ToggleGroupItem value="l">L</ToggleGroupItem>
                            </ToggleGroup>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardFooter className="justify-center border-t p-4">
                    <Button size="sm" variant="ghost" className="gap-1">
                      <PlusCircle className="h-3.5 w-3.5" />
                      Add Variant
                    </Button>
                  </CardFooter>
                </Card>
                <div className="flex gap-4">
                  <Card className="max-w-[50%]">
                    <CardHeader>
                      <CardTitle>Kategoria produktu</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6 sm:grid-cols-3">
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
                                        "w-[400px] justify-between",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      {field.value
                                        ? categories.find(
                                            (category) =>
                                              category.id === field.value
                                          )?.name
                                        : "Wybierz kategorie"}
                                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-[400px] p-0">
                                  <Command>
                                    <CommandList>
                                      <CommandInput placeholder="Szukaj..." />
                                      <CommandEmpty>
                                        Brak kategorii
                                      </CommandEmpty>
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
                                                <DialogTitle>
                                                  Dodaj kategorie
                                                </DialogTitle>
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
                                                      control={
                                                        categoryForm.control
                                                      }
                                                      name="name"
                                                      render={({ field }) => (
                                                        <FormItem>
                                                          <FormLabel>
                                                            Nazwa{" "}
                                                          </FormLabel>
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
                                                      control={
                                                        categoryForm.control
                                                      }
                                                      name="description"
                                                      render={({ field }) => (
                                                        <FormItem>
                                                          <FormLabel>
                                                            Opis
                                                          </FormLabel>
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
                                                        <Button type="submit">
                                                          Utwórz
                                                        </Button>
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
                                              form.setValue(
                                                "categoryId",
                                                category.id
                                              );
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

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="w-full">
                    <CardHeader>
                      <CardTitle>Archiwizacja produktów</CardTitle>
                      <CardDescription>
                        Jeżeli kliknięte produkt nie wyświetla się już na
                        stronie.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div></div>
                      <Button size="sm" variant="secondary">
                        Archiwizuj produkt
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
              <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                <Card x-chunk="dashboard-07-chunk-3">
                  <CardHeader>
                    <CardTitle>Product Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Status</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Wybierz status" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {statuses.map((status) => (
                                  <SelectItem value={status.value}>
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
                    </div>
                  </CardContent>
                </Card>

                <Card
                  className="overflow-hidden"
                  x-chunk="dashboard-07-chunk-4"
                >
                  <CardHeader>
                    <CardTitle>Zdjęcia produktu</CardTitle>
                    <CardDescription>
                      Dodawaj i usuwaj zdjęcia produktu
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-2">
                      <Image
                        alt="Product image"
                        className="aspect-square w-full rounded-md object-cover"
                        height="300"
                        src="/placeholder.svg"
                        width="300"
                      />
                      <div className="grid grid-cols-3 gap-2">
                        <button>
                          <Image
                            alt="Product image"
                            className="aspect-square w-full rounded-md object-cover"
                            height="84"
                            src="/placeholder.svg"
                            width="84"
                          />
                        </button>
                        <button>
                          <Image
                            alt="Product image"
                            className="aspect-square w-full rounded-md object-cover"
                            height="84"
                            src="/placeholder.svg"
                            width="84"
                          />
                        </button>
                        <button className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
                          <Upload className="h-4 w-4 text-muted-foreground" />
                          <span className="sr-only">Upload</span>
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle>Zapisz zmiany</CardTitle>
                    <CardDescription>
                      Zapisz zmiany wprowadzone w formularzu
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button size="sm" type="submit">
                      Aktualizuj produkt
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default Client;
