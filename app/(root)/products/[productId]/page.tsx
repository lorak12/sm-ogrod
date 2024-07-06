import { getProduct } from "@/actions/productActions";
import Client from "./Client";

async function Page({ params }: { params: { productId: string } }) {
  const product = await getProduct(params.productId);

  if (!product) return <div>Nie ma takiego produktu!</div>;
  return <Client product={product} />;
}

export default Page;
