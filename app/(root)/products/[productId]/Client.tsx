"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Expand } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import { Eye } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProductWithDetailsAndCategory } from "@/types/types";

function Client({ product }: { product: ProductWithDetailsAndCategory }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
    setIsDialogOpen(true);
  };

  return (
    <main className="px-12 py-6 min-h-screen grid grid-cols-3 gap-10">
      <div className="col-span-2 flex flex-col items-center gap-1 border p-6 rounded-md">
        <div className="relative h-2/3 w-[calc(100%-106px)]">
          <div
            className="relative w-full h-full cursor-pointer group"
            onClick={() => handleImageClick(product.images[0].url)}
          >
            <Image
              className="rounded-lg object-cover"
              src={product.images[0].url}
              alt={product.name}
              fill
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex justify-center items-center transition-all duration-300">
              <Expand className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-all duration-300" />
            </div>
          </div>
        </div>
        <div className="mx-12 w-[calc(100%-92px)]">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent className="mx-1">
              {product.images.map((image, index) => (
                <CarouselItem
                  key={index}
                  className="md:basis-1/2 lg:basis-1/3 relative h-[300px]"
                >
                  <div
                    className="relative w-full h-full cursor-pointer group"
                    onClick={() => handleImageClick(image.url)}
                  >
                    <Image
                      className="rounded-lg object-cover p-1"
                      src={image.url}
                      alt={product.name}
                      fill
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex justify-center items-center transition-all duration-300">
                      <Expand className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
      <Card className="h-fit">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {product.name} <Badge>{product.category.name}</Badge>
          </CardTitle>
          <CardDescription>
            <span className="flex justify-between w-full">
              <span className="font-semibold text-lg text-foreground">
                Cena: {formatPrice(product.price)}
              </span>
              <span className="flex gap-2 items-center">
                <Eye className="w-4 h-4" />
                {product.views}
              </span>
            </span>
          </CardDescription>
          <CardContent className="p-0 m-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nazwa wartości</TableHead>
                  <TableHead>Wartość</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {product.details.map((detail) => (
                  <TableRow key={detail.id} className="h-[100px]">
                    <TableCell>{detail.name}</TableCell>
                    <TableCell>{detail.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </CardHeader>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Podgląd</DialogTitle>
          </DialogHeader>
          {selectedImage && (
            <Image
              src={selectedImage}
              alt="Selected"
              width={800}
              height={600}
              className="object-cover w-full h-full"
            />
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
}

export default Client;
