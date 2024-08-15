"use client";
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircleQuestion, PhoneCall, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import ContactForm from "./ContactForm";
import { Product } from "@prisma/client";

function ContactPage({ products }: { products: Product[] }) {
  return (
    <main>
      <motion.h1
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto min-h-[calc(100vh-80px)] flex items-center justify-center flex-col"
      >
        <span>
          Masz pytania, chcesz dowiedziec się o nas wiecej?
          <Button
            variant="link"
            className="underline text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug"
            onClick={() =>
              window.scrollTo({
                top: 630,
                behavior: "smooth",
              })
            }
          >
            Napisz do nas
          </Button>
        </span>
      </motion.h1>

      <div
        className="min-h-[500px] flex flex-col items-center gap-10 w-full
            "
      >
        <h2 className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto flex items-center justify-center flex-col">
          Skontaktuj sie z nami
        </h2>
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-10  justify-center items-center">
          <Card className="w-[250px] h-fit mx-auto">
            <CardHeader>
              <CardTitle>
                <Button size="icon" variant="outline">
                  <MessageCircleQuestion className="w-4 h-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <h3>Napisz do nas email</h3>
              <a
                href="mailto:smogrod@poczta.onet.pl"
                className="font-semibold underline tracking-tight"
              >
                smogrod@poczta.onet.pl
              </a>
            </CardContent>
          </Card>
          <Card className="w-[250px] h-fit mx-auto">
            <CardHeader>
              <CardTitle>
                <Button size="icon" variant="outline">
                  <PhoneCall className="w-4 h-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <h3>Zadzwon do nas</h3>
              <span className="font-semibold underline tracking-tight">
                +48 606 374 377
              </span>
            </CardContent>
          </Card>
          <Card className="w-[250px] h-fit mx-auto">
            <CardHeader>
              <CardTitle>
                <Button size="icon" variant="outline">
                  <Star className="w-4 h-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <h3>Ocen nas</h3>
              <Sheet>
                <SheetTrigger className="font-semibold underline tracking-tight">
                  Zostaw swoja opinie
                </SheetTrigger>
                <SheetContent>
                  <ContactForm products={products} />
                </SheetContent>
              </Sheet>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}

export default ContactPage;
