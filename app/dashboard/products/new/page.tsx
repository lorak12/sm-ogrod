import React from "react";
import ProductForm from "./ProductForm";
import { getCategories } from "@/actions/categoryActions";

async function Page() {
  const categories = await getCategories();

  return (
    <div>
      <ProductForm categories={categories} />
    </div>
  );
}

export default Page;
