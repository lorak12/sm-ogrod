import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Mail, Phone } from "lucide-react";
import ContactForm from "./ContactForm";
import { getActiveProducts } from "@/actions/productActions";

export default async function Page() {
	const products = await getActiveProducts();
	return (
		<div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
			<div className="hidden bg-muted lg:grid grid-cols-2 place-content-center gap-10 px-12">
				<Card className="w-fit h-[100px] p-4 flex justify-center flex-col">
					<CardTitle className="flex gap-2 items-center">
						<Phone className="w-4 h-4" />
						Zadzwon do nas
					</CardTitle>
					<CardDescription>
						tel: +48 606 374 377 <br />
						fax: +48 515 156 301
					</CardDescription>
				</Card>
				<Card className="w-fit h-[100px] p-4 flex justify-center flex-col">
					<CardTitle className="flex gap-2 items-center">
						<Mail className="w-4 h-4" />
						Napisz do nas
					</CardTitle>
					<CardDescription>
						Email:{" "}
						<a href="mailto:smogrod@poczta.onet.pl">smogrod@poczta.onet.pl</a>
					</CardDescription>
				</Card>
			</div>
			<div className="flex items-center justify-center py-12">
				<div className="mx-auto grid w-[350px] gap-6">
					<div className="grid gap-2 text-center">
						<h1 className="text-3xl font-bold">Zostaw opinie</h1>
						<p className="text-balance text-muted-foreground">
							Wypelnij formularz aby zostawic opinie.
						</p>
					</div>
					<ContactForm products={products} />
				</div>
			</div>
		</div>
	);
}
