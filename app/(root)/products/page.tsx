import { getActiveProducts } from "@/actions/productActions";
import React from "react";
import ProductCard from "./ProductCard";
import Filters from "./Filters";
import { getCategories } from "@/actions/categoryActions";

async function Page({
	searchParams,
}: {
	searchParams: {
		name: string;
		minPrice: number;
		maxPrice: number;
		categoryId: string;
	};
}) {
	const products = await getActiveProducts(searchParams);
	const categories = await getCategories();
	return (
		<main className="grid grid-cols-4 gap-10 px-12 py-6">
			<Filters categories={categories} />
			<div className="col-span-3 grid grid-cols-3 gap-4">
				{products.map((product) => (
					<ProductCard
						key={product.id}
						product={product}
					/>
				))}
			</div>
		</main>
	);
}

export default Page;
