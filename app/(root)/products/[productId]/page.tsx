import { getProduct } from "@/actions/productActions";
import Image from "next/image";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import { Eye } from "lucide-react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

async function Page({ params }: { params: { productId: string } }) {
	const product = await getProduct(params.productId);
	if (!product) return <div>Nie ma takiego produktu!</div>;
	return (
		<main className="px-12 py-6 min-h-screen grid grid-cols-3 gap-10">
			<div className="col-span-2 flex flex-col items-center gap-1">
				<div className="relative h-2/3 w-[calc(100%-106px)]">
					<Image
						className="rounded-lg object-cover"
						src="/about1.jpg"
						alt={product.name}
						fill
					/>
				</div>
				<div className="mx-12 w-[calc(100%-92px)]">
					<Carousel
						opts={{
							align: "start",
						}}
						className="w-full"
					>
						<CarouselContent className="mx-1">
							{Array.from({ length: 5 }).map((_, index) => (
								<CarouselItem
									key={index}
									className="md:basis-1/2 lg:basis-1/3 relative h-[300px]"
								>
									<Image
										className="rounded-lg object-cover p-1"
										src="/about1.jpg"
										alt={product.name}
										fill
									/>
								</CarouselItem>
							))}
						</CarouselContent>
						<CarouselPrevious />
						<CarouselNext />
					</Carousel>
				</div>
			</div>
			<Card className="h-fit">
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						{product.name} <Badge>{product.category.name}</Badge>
					</CardTitle>
					<CardDescription>
						<span className="flex justify-between w-full">
							<span className="font-semibold text-lg text-foreground">
								Cena: {formatPrice(product.price)}
							</span>
							<span className="flex gap-2 items-center">
								<Eye className="w-4 h-4" />
								{product.views}
							</span>
						</span>
					</CardDescription>
					<CardContent className="p-0 m-0">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Nazwa wartości</TableHead>
									<TableHead>Wartość</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{product.details.map((detail) => (
									<TableRow
										key={detail.id}
										className="h-[100px]"
									>
										<TableCell>{detail.name}</TableCell>
										<TableCell>{detail.value}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</CardContent>
				</CardHeader>
			</Card>
		</main>
	);
}

export default Page;
