"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { CircleCheck, CircleX, Send } from "lucide-react";
import { reviewSchema } from "@/schemas/schemas";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { Product } from "@prisma/client";
import { Rating } from "@/components/ui/rating";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export default function ContactForm({ products }: { products: Product[] }) {
	const router = useRouter();

	const form = useForm<z.infer<typeof reviewSchema>>({
		resolver: zodResolver(reviewSchema),
		defaultValues: {
			stars: 0,
		},
	});

	async function onSubmit(data: z.infer<typeof reviewSchema>) {
		try {
			toast({
				title: "Produkt został stworzony",
				action: <CircleCheck className="w-4 h-4 text-green-500" />,
			});
			router.push("/dashboard/products");
			router.refresh();
		} catch (error: any) {
			toast({
				title: "Coś poszło nie tak",
				variant: "destructive",
				action: <CircleX className="w-4 h-4 text-white" />,
			});
			console.error(error);
			throw new Error(error);
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-6"
			>
				<div className="flex items-center gap-2">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Imie</FormLabel>
								<FormControl>
									<Input
										placeholder="Jan..."
										{...field}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="surname"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Nazwisko</FormLabel>
								<FormControl>
									<Input
										placeholder="Kowalski..."
										{...field}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									placeholder="jankowalski@email.com"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="stars"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											Ocena{" "}
											<Rating
												rating={field.value}
												onRateChange={field.onChange}
												totalStars={5}
												size={24}
												showText={false}
												disabled={field.disabled}
											/>
										</CardTitle>
									</CardHeader>
								</Card>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="content"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Opinia</FormLabel>
							<FormControl>
								<Textarea
									placeholder="..."
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="productId"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Produkt</FormLabel>
							<Select
								onValueChange={field.onChange}
								defaultValue={field.value}
							>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Wybierz produkt" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{products.map((status) => (
										<SelectItem
											value={status.id}
											key={status.name}
										>
											<div className="flex">{status.name}</div>
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormDescription>Wybierz produkt ktory oceniasz</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					type="submit"
					className="gap-2"
				>
					Gotowe <Send className="w-4 h-4" />
				</Button>
			</form>
		</Form>
	);
}
