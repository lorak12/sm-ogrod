import React from "react";
import ProductForm from "./ProductForm";
import { getCategories } from "@/actions/categoryActions";
import { getProduct } from "@/actions/productActions";

async function Page({ params }: { params: { productId: string } }) {
  const product = await getProduct(params.productId);
  const categories = await getCategories();

  return (
    <div>
      <ProductForm initialData={product} categories={categories} />
    </div>
  );
}

export default Page;
