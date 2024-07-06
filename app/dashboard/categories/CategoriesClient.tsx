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

function CategoriesClient({ categories }: { categories: any[] }) {
  const [clientCategories, setClientCategories] = useState(categories);

  useEffect(() => {
    const channel = supabase
      .channel("schema-db-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "Category",
        },
        (payload) => {
          switch (payload.eventType) {
            case "INSERT":
              setClientCategories((prevCategories: any) => [
                ...prevCategories,
                payload.new,
              ]);
              break;

            case "UPDATE":
              setClientCategories((prevCategories: any) =>
                prevCategories.map((product: any) =>
                  product.id === payload.old.id ? payload.new : product
                )
              );
              break;

            case "DELETE":
              setClientCategories((prevCategories: any) =>
                prevCategories.filter(
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
              <BreadcrumbPage>Kategorie</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Button asChild className="gap-2">
          <Link href="/dashboard/categories/new">
            Dodaj Kategorie <CirclePlus className="w-4 h-4" />
          </Link>
        </Button>
      </div>
      <DataTable columns={columns} data={clientCategories} filter="name" />
    </div>
  );
}

export default CategoriesClient;
