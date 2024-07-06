import { getActiveProducts } from "@/actions/productActions";
import ContactPage from "./ContactPage";

export default async function Page() {
	const products = await getActiveProducts();
	return (
		<main>
			<ContactPage products={products} />
		</main>
	);
}
