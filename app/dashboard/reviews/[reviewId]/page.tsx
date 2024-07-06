import { getReview } from "@/actions/reviewsActions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Rating } from "@/components/ui/rating";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

async function Page({
  params: { reviewId },
}: {
  params: { reviewId: string };
}) {
  const review = await getReview(reviewId);
  if (!review) return <div>Nie ma takiej recenzji!</div>;

  const createdAt = new Date(review.createdAt).toLocaleString("pl");
  return (
    <main className="flex flex-1 flex-col gap-4  lg:gap-6 ">
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
            <BreadcrumbLink href="/dashboard/reviews">Opinie</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{review.id}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Card>
        <CardHeader>
          <CardTitle>
            Recenzja użytkownika {review.name} {review.surname}
          </CardTitle>
          <CardDescription>{review.email}</CardDescription>
        </CardHeader>
        <CardContent>
          <Rating rating={review.stars} size={24} showText={false} disabled />
          <p>{review.content}</p>
          <p>Data publikacji: {createdAt}</p>
        </CardContent>
      </Card>
    </main>
  );
}

export default Page;
