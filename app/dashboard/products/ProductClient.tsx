"use client";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

function ProductClient({ products }: { products: any[] }) {
  const [clientProducts, setClientProducts] = useState(products);

  useEffect(() => {
    const channel = supabase
      .channel("schema-db-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "Product",
        },
        (payload) => {
          switch (payload.eventType) {
            case "INSERT":
              setClientProducts((prevProducts: any) => [
                ...prevProducts,
                payload.new,
              ]);
              break;

            case "UPDATE":
              setClientProducts((prevProducts: any) =>
                prevProducts.map((product: any) =>
                  product.id === payload.old.id ? payload.new : product
                )
              );
              break;

            case "DELETE":
              setClientProducts((prevProducts: any) =>
                prevProducts.filter(
                  (product: any) => product.id !== payload.old.id
                )
              );
              break;

            default:
              break;
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  return (
    <div className="flex flex-1 flex-col gap-4  lg:gap-6 ">
      <div className="flex justify-between">
        <Breadcrumb>
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
              <BreadcrumbPage>Produkty</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Button asChild className="gap-2">
          <Link href="/dashboard/products/new">
            Dodaj Produkt <CirclePlus className="w-4 h-4" />
          </Link>
        </Button>
      </div>
      <DataTable columns={columns} data={clientProducts} filter="name" />
    </div>
  );
}

export default ProductClient;
