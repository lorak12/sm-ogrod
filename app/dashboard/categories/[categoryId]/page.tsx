import { getCategory } from "@/actions/categoryActions";
import CategoryForm from "./CategoryForm";

async function Page({
  params: { categoryId },
}: {
  params: { categoryId: string };
}) {
  const category = await getCategory(categoryId);
  return <CategoryForm initialData={category} />;
}

export default Page;
