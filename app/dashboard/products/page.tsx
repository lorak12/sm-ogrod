import { getProducts } from "@/actions/productActions";
import ProductClient from "./ProductClient";

async function Page() {
  const products = await getProducts();
  return <ProductClient products={products} />;
}

export default Page;
