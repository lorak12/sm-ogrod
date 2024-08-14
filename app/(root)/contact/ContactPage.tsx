"use client";
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircleQuestion, PhoneCall, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { InfiniteMovingCards } from "@/components/ui/infinite-moveing-cards";
import ContactForm from "./ContactForm";
import { Product } from "@prisma/client";
import { WavyBackground } from "@/components/ui/wavy-background";
import { useTheme } from "next-themes";

const testimonials = [
  {
    quote:
      "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.",
    name: "Charles Dickens",
    title: "A Tale of Two Cities",
  },
  {
    quote:
      "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
    name: "William Shakespeare",
    title: "Hamlet",
  },
  {
    quote: "All that we see or seem is but a dream within a dream.",
    name: "Edgar Allan Poe",
    title: "A Dream Within a Dream",
  },
  {
    quote:
      "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
    name: "Jane Austen",
    title: "Pride and Prejudice",
  },
  {
    quote:
      "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
    name: "Herman Melville",
    title: "Moby-Dick",
  },
];

function ContactPage({ products }: { products: Product[] }) {
  const theme = useTheme();
  return (
    <main>
      <WavyBackground
        className="max-w-4xl mx-auto pb-40"
        blur={2}
        backgroundFill={theme.theme === "light" ? "white" : "#020817"}
      >
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
            Masz pytania, chcesz dowiedziec się o nas wiecej? Napisz do nas
          </span>
        </motion.h1>
      </WavyBackground>
      <div
        className="min-h-[500px] flex flex-col items-center gap-10 w-full
            "
      >
        <h2 className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto flex items-center justify-center flex-col">
          Skontaktuj sie z nami
        </h2>
        <div className="grid grid-cols-3 gap-10  justify-center items-center">
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
      <div className="h-[40rem] rounded-md flex flex-col antialiased dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
        <InfiniteMovingCards
          items={testimonials}
          direction="right"
          speed="slow"
        />
      </div>
    </main>
  );
}

export default ContactPage;
