import CategoriesClient from "./CategoriesClient";
import { getCategories } from "@/actions/categoryActions";

async function Page() {
  const categories = await getCategories();
  return <CategoriesClient categories={categories} />;
}

export default Page;
