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

function ReviewsClient({ reviews }: { reviews: any[] }) {
  const [clientReviews, setClientReviews] = useState(reviews);

  useEffect(() => {
    const channel = supabase
      .channel("schema-db-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "Review",
        },
        (payload) => {
          switch (payload.eventType) {
            case "INSERT":
              setClientReviews((prevReviews: any) => [
                ...prevReviews,
                payload.new,
              ]);
              break;

            case "UPDATE":
              setClientReviews((prevReviews: any) =>
                prevReviews.map((product: any) =>
                  product.id === payload.old.id ? payload.new : product
                )
              );
              break;

            case "DELETE":
              setClientReviews((prevReviews: any) =>
                prevReviews.filter(
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
              <BreadcrumbPage>Opinie</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <DataTable columns={columns} data={clientReviews} filter="name" />
    </div>
  );
}

export default ReviewsClient;
