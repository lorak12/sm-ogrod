import {
  getMostViewedProductsByDate,
  getProducts,
} from "@/actions/productActions";
import { getLastReviews } from "@/actions/reviewsActions";
import { ViewsChart } from "@/components/charts/views-chart";
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
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Eye } from "lucide-react";
import Link from "next/link";

async function Page() {
  const products = await getProducts();
  const popularProducts = await getMostViewedProductsByDate(new Date());
  const lastReviews = await getLastReviews();

  return (
    <div className="flex flex-1 flex-col gap-4  lg:gap-6 ">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {products.length > 0 ? (
        <div className="flex flex-col gap-8">
          <ViewsChart />
          <div className="grid grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Popularne Produkty</CardTitle>
                <CardDescription>Ostatnie 7 dni</CardDescription>
              </CardHeader>
              <CardContent className="flex gap-4">
                {popularProducts.map((product) => (
                  <Link
                    href={`/dashboard/products/view/${product.id}`}
                    key={product.id}
                    className="border rounded-md p-4 flex items-center justify-between gap-2 w-1/2 hover:bg-primary/5 transition"
                  >
                    <span className="flex items-center gap-2">
                      {product.name}
                      <Badge>{product.category.name}</Badge>
                    </span>

                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {product.views}
                    </span>
                  </Link>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Ostatnie opinie</CardTitle>
                <CardDescription>Ostatnie 7 dni</CardDescription>
              </CardHeader>
              <CardContent className="flex gap-4">
                {lastReviews.map((review) => (
                  <Link
                    href={`/dashboard/reviews/${review.id}`}
                    key={review.id}
                    className="border rounded-md p-4 flex items-center justify-between gap-2 w-1/2 hover:bg-primary/5 transition"
                  >
                    <span className="flex items-center gap-2">
                      {review.name} {review.surname}
                    </span>

                    <span className="flex items-center gap-1">
                      {review.email}
                    </span>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </div>
          <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
            <div className="flex flex-col items-center gap-1 text-center p-4 h-40 justify-center">
              <Link href="/dashboard/products/new">
                <Button className="mt-4">Dodaj produkt</Button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              Nie ma tu żadnych produktów
            </h3>
            <div className="flex flex-col items-center gap-1 text-center p-4 h-40 justify-center">
              <Link href="/dashboard/products/new">
                <Button className="mt-4">Dodaj produkt</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
