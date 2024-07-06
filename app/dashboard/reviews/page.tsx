import { getReviews } from "@/actions/reviewsActions";
import ReviewsClient from "./ReviewsClient";

async function Page() {
  const reviews = await getReviews();
  return <ReviewsClient reviews={reviews} />;
}

export default Page;
