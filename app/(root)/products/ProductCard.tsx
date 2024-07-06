"use client";
import { updateProductViews } from "@/actions/productActions";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import { Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string;
    views: number;
    status: string;
    price: number;
    category: {
      id: string;
      name: string;
      description: string;
      createdAt: Date;
      updatedAt: Date;
    };
    images: {
      id: string;
      url: string;
      createdAt: Date;
      updatedAt: Date;
    }[];
    createdAt: Date;
    updatedAt: Date;
  };
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.id}`}
      onClick={async () => await updateProductViews(product.id)}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {product.name} <Badge>{product.category.name}</Badge>
          </CardTitle>
          <CardDescription>
            <span className="flex justify-between w-full">
              {formatPrice(product.price)}
              <span className="flex gap-2 items-center">
                <Eye className="w-4 h-4" />
                {product.views}
              </span>
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent className="relative min-h-[300px] mx-6 mb-6">
          <Image
            src={product.images[0]?.url ?? "/about1.jpg"}
            alt={product.name}
            fill
            className="rounded-md object-cover"
          />
        </CardContent>
      </Card>
    </Link>
  );
}

export default ProductCard;
