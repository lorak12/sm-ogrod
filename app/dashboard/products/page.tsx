import ProductClient from "./ProductClient";

async function Page() {
  const products: any[] = [];
  return <ProductClient products={products} />;
}

export default Page;
