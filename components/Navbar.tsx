"use client";
import * as React from "react";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
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
import { Home, Layout, Package, Phone } from "lucide-react";

export function Navbar() {
  const { user } = useUser();

  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  return (
    <nav className="h-[80px] w-full flex items-center justify-between px-8 gap-10 border-b border-gray-100 dark:border-none z-50">
      <div className="items-center gap-4 hidden md:flex">
        <Link href={"/"} className="flex items-center gap-4">
          <Image
            src={"/logo.svg"}
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
              <Link href="/products" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <Package className="w-4 h-4 mr-2" />
                  Produkty
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/contact" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <Phone className="w-4 h-4 mr-2" />
                  Kontakt
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            {user?.publicMetadata.role === "admin" ? (
              <NavigationMenuItem>
                <Link href="/dashboard" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <Layout className="w-4 h-4 mr-2" />
                    Dashboard
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ) : null}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="flex items-center md:hidden">
        <Sheet open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
          <SheetTrigger>
            <LuMenu className="h-6 w-6" />
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>SM Ogród</SheetTitle>
            </SheetHeader>
            <NavigationMenu>
              <ul className="grid w-[400px] gap-1 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                <li onClick={() => setIsOpen(false)}>
                  <Link href="/" className="flex items-center py-2">
                    <Home className="w-4 h-4 mr-2" />
                    Home
                  </Link>
                </li>
                <li onClick={() => setIsOpen(false)}>
                  <Link href="/products" className="flex items-center py-2">
                    <Package className="w-4 h-4 mr-2" />
                    Produkty
                  </Link>
                </li>
                <li onClick={() => setIsOpen(false)}>
                  <Link href="/contact" className="flex items-center py-2">
                    <Phone className="w-4 h-4 mr-2" />
                    Kontakt
                  </Link>
                </li>
                {user?.publicMetadata.role === "admin" ? (
                  <li onClick={() => setIsOpen(false)}>
                    <Link href="/dashboard" className="flex items-center py-2">
                      <Layout className="w-4 h-4 mr-2" />
                      Dashboard
                    </Link>
                  </li>
                ) : null}
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
