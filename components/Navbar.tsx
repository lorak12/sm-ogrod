"use client";
import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { LuMenu } from "react-icons/lu";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { UserButton, useUser } from "@clerk/nextjs";

export function Navbar() {
	const { user } = useUser();

	return (
		<nav className="h-[80px] w-full flex items-center justify-between px-8 gap-10 border-b border-gray-100 dark:border-none z-50">
			<div className="items-center gap-4 hidden sm:flex">
				<Link
					href={"/"}
					className="flex items-center gap-4"
				>
					<Image
						src={"/logo.png"}
						alt="logo"
						width={70}
						height={70}
						className="rounded-lg"
					/>
					<h2 className="text-3xl font-semibold">SM Ogród</h2>
				</Link>
				<NavigationMenu>
					<NavigationMenuList>
						<NavigationMenuItem>
							<NavigationMenuTrigger>Firma</NavigationMenuTrigger>
							<NavigationMenuContent>
								<ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
									<li className="row-span-3">
										<NavigationMenuLink asChild>
											<Link
												className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
												href="/"
											>
												<Image
													src="/logo.png"
													alt="logo"
													width={70}
													height={70}
													className="rounded-lg"
												/>
												<div className="mb-2 mt-4 text-lg font-medium">
													SM Ogród
												</div>
												<p className="text-sm leading-tight text-muted-foreground">
													Perfekcyjne rozwiązania dla każdego ogrodu. Każdy
													znajdzie coś dla siebie
												</p>
											</Link>
										</NavigationMenuLink>
									</li>
									<ListItem
										href="/about"
										title="O nas"
									>
										Dowiedz się o nas czegoś i poznaj nas zespół.
									</ListItem>
									<ListItem
										href="/contact"
										title="Kontakt"
									>
										Napisz do nas lub podziel się swoimi wrażeniami.
									</ListItem>
									<ListItem
										href="/gallery"
										title="Galeria"
									>
										Sprawdz nasze ostatnie produkcje. Zainspiruj się!
									</ListItem>
								</ul>
							</NavigationMenuContent>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<Link
								href="/products"
								legacyBehavior
								passHref
							>
								<NavigationMenuLink className={navigationMenuTriggerStyle()}>
									Produkty
								</NavigationMenuLink>
							</Link>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<Link
								href="/contact"
								legacyBehavior
								passHref
							>
								<NavigationMenuLink className={navigationMenuTriggerStyle()}>
									Kontakt
								</NavigationMenuLink>
							</Link>
						</NavigationMenuItem>
						{user?.publicMetadata.role === "admin" ? (
							<NavigationMenuItem>
								<Link
									href="/dashboard"
									legacyBehavior
									passHref
								>
									<NavigationMenuLink className={navigationMenuTriggerStyle()}>
										Dashboard
									</NavigationMenuLink>
								</Link>
							</NavigationMenuItem>
						) : null}
					</NavigationMenuList>
				</NavigationMenu>
			</div>
			<div className="flex items-center sm:hidden">
				<Sheet>
					<SheetTrigger>
						<LuMenu className="h-6 w-6" />
					</SheetTrigger>
					<SheetContent>
						<SheetHeader>
							<SheetTitle>SM Ogród</SheetTitle>
						</SheetHeader>
						<NavigationMenu>
							<ul className="grid w-[400px] gap-1 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
								TODO
							</ul>
						</NavigationMenu>
					</SheetContent>
				</Sheet>
			</div>

			<div className="gap-4 flex items-center">
				<UserButton />
				<ThemeSwitcher />
			</div>
		</nav>
	);
}

const ListItem = React.forwardRef<
	React.ElementRef<"a">,
	React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
	return (
		<li>
			<NavigationMenuLink asChild>
				<a
					ref={ref}
					className={cn(
						"block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
						className
					)}
					{...props}
				>
					<div className="text-sm font-medium leading-none">{title}</div>
					<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
						{children}
					</p>
				</a>
			</NavigationMenuLink>
		</li>
	);
});
ListItem.displayName = "ListItem";
