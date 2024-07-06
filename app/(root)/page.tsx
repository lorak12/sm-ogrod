"use client";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { DirectionAwareHover } from "@/components/ui/direction-aware-hover";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { BiSolidTimer } from "react-icons/bi";
import { FaRegHandRock } from "react-icons/fa";
import { GiWoodBeam } from "react-icons/gi";
import { LuSettings2 } from "react-icons/lu";

export default function Home() {
  return (
    <main>
      <div className="h-[60rem] w-full dark:bg-background bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center flex-col gap-4">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-background bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,background)]"></div>
        <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-500 to-neutral-900 text-center">
          SM Ogród - Perfekcyjne rozwiązania do{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            każdego ogrodu
          </span>
        </p>
        <p className="text-gray-600 dark:text-gray-400 w-1/2 text-center">
          Zachęcamy do zapoznania się z naszym asortymentem, który został
          stworzony z myślą o zapewnieniu kompleksowego wsparcia dla Twojego
          ogrodu. Dzięki nam możesz cieszyć się pięknem i funkcjonalnością
          przestrzeni zielonej wokół domu.
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg">
            <Link href={"/contact"}>O nas</Link>
          </Button>
          <Button variant="ghost" size="lg">
            <Link href="/produkty" className="flex items-center gap-2 ">
              Produkty <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>

      <section className="w-full sm:p-24 flex flex-col justify-center items-center mb-20 gap-10 p-8">
        <div className="text-center flex flex-col gap-4">
          <h2 className="text-gray-900 dark:text-white font-bold text-4xl">
            U nas znajdziesz coś dla siebie
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-6xl">
            Nasza bogata oferta produktów obejmuje szeroką gamę rozwiązań, które
            umożliwią Ci spełnienie wszelkich potrzeb związanych z Twoim
            ogrodem. Dzięki temu znajdziesz dokładnie to, czego szukasz. W
            naszym asortymencie znajdziesz aż 20 różnych propozycji dedykowanych
            dla Twojego ogrodu. To kompleksowe podejście pozwala dostosować
            rozwiązania do indywidualnych preferencji i wymagań.
          </p>
        </div>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent>
            <CarouselItem className="md:basis-1/2 lg:basis-1/3 max-h-[500px] aspect-square">
              <DirectionAwareHover
                imageUrl="/about1.jpg"
                className="w-full h-full"
              >
                <h4>Altana A02</h4>
              </DirectionAwareHover>
            </CarouselItem>
            <CarouselItem className="md:basis-1/2 lg:basis-1/3 max-h-[500px] aspect-square">
              <DirectionAwareHover
                imageUrl="/about2.jpg"
                className="w-full h-full"
              >
                <h4>Huśtawka H01</h4>
              </DirectionAwareHover>
            </CarouselItem>
            <CarouselItem className="md:basis-1/2 lg:basis-1/3 max-h-[500px] aspect-square">
              <DirectionAwareHover
                imageUrl="/about3.jpg"
                className="w-full h-full"
              >
                <h4>Plac Zabaw PZ02</h4>
              </DirectionAwareHover>
            </CarouselItem>
            <CarouselItem className="md:basis-1/2 lg:basis-1/3 max-h-[500px] aspect-square">
              <DirectionAwareHover
                imageUrl="/about4.jpg"
                className="w-full h-full"
              >
                <h4>Altana A01</h4>
              </DirectionAwareHover>
            </CarouselItem>
            <CarouselItem className="md:basis-1/2 lg:basis-1/3 max-h-[500px] aspect-square">
              <DirectionAwareHover
                imageUrl="/about5.jpeg"
                className="w-full h-full"
              >
                <h4>Plac Zabaw PZ04</h4>
              </DirectionAwareHover>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="sm:flex hidden" />
          <CarouselNext className="sm:flex hidden" />
        </Carousel>
      </section>
      <section className="sm:px-24 p-4 flex justify-center items-center gap-10 flex-col mb-20">
        <div className="text-center flex justify-center items-center gap-4 flex-col">
          <h4 className="text-3xl font-bold text-gray-900 dark:text-white">
            Wszystko czego potrzebujesz w swoim ogrodzie w jednym miejscu
          </h4>
          <p className="text-center text-gray-500 dark:text-gray-400 sm:w-[70%]">
            Przeglądając nasze produkty, masz pewność, że znajdziesz wysokiej
            jakości rozwiązania, które spełnią oczekiwania nawet najbardziej
            wymagających klientów. Nasze artykuły są starannie dobrane, aby
            sprostać różnorodnym potrzebom ogrodniczym.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-x-20 gap-y-10 lg:px-24 p-8 place-content-center">
          <div className="flex gap-4 justify-center">
            <div className="p-4 bg-emerald-800 text-emerald-100 w-fit h-fit rounded-lg">
              <BiSolidTimer width={24} height={24} />
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-gray-900 dark:text-white font-bold">
                Szybkie wykonanie
              </h4>
              <p className="text-gray-500 dark:text-gray-400 max-w-[400px]">
                Odkryj naszą wyjątkową architekturę ogrodową z drewna już teraz!
                Stwórz wymarzony ogród szybko i bezproblemowo z naszymi wysokiej
                jakości produktami.
              </p>
            </div>
          </div>
          <div className="flex gap-4 justify-center">
            <div className="p-4 bg-emerald-800 text-emerald-100 w-fit h-fit rounded-lg">
              <FaRegHandRock width={24} height={24} />
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-gray-900 dark:text-white font-bold">
                Solidnie
              </h4>
              <p className="text-gray-500 dark:text-gray-400 max-w-[400px]">
                Odkryj nasze solidnie wykonane elementy architektury ogrodowej z
                najlepszych materiałów. Stwórz trwałe aranżacje ogrodu
                dostosowane do Twoich potrzeb!
              </p>
            </div>
          </div>
          <div className="flex gap-4 justify-center">
            <div className="p-4 bg-emerald-800 text-emerald-100 w-fit h-fit rounded-lg">
              <GiWoodBeam width={24} height={24} />
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-gray-900 dark:text-white font-bold">
                Z dobrych materiałów
              </h4>
              <p className="text-gray-500 dark:text-gray-400 max-w-[400px]">
                W naszym sklepie znajdziesz arcydzieła architektury ogrodowej
                wykonane z doskonałych materiałów. Dostosuj swój ogród z
                produktami, na których możesz polegać.
              </p>
            </div>
          </div>
          <div className="flex gap-4 justify-center">
            <div className="p-4 bg-emerald-800 text-emerald-100 w-fit h-fit rounded-lg">
              <LuSettings2 width={24} height={24} />
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-gray-900 dark:text-white font-bold">
                Dostosuj swój produkt
              </h4>
              <p className="text-gray-500 dark:text-gray-400 max-w-[400px]">
                Pozwól swojej kreatywności rozkwitnąć! Dostosuj nasze wysokiej
                jakości produkty do swoich potrzeb, tworząc wyjątkowy ogród
                idealnie dopasowany do Twojego stylu życia.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
