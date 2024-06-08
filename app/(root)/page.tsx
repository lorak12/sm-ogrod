import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { BiSolidTimer } from "react-icons/bi";
import { FaRegHandRock } from "react-icons/fa";
import { GiWoodBeam } from "react-icons/gi";
import { LuSettings2 } from "react-icons/lu";

export default function Home() {
  return (
    <main>
      <div className="w-full grid place-content-center p-24 sm:my-48 mt-24">
        <div className="text-center  flex flex-col gap-4 items-center justify-center max-w-4xl">
          <h2 className="text-5xl font-semibold tracking-wide leading-[52px] sm:leading-none sm:tracking-normal text-gray-900 dark:text-white">
            SM Ogród - Perfekcyjne rozwiązania do{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
              każdego ogrodu
            </span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 ">
            Zachęcamy do zapoznania się z naszym asortymentem, który został
            stworzony z myślą o zapewnieniu kompleksowego wsparcia dla Twojego
            ogrodu. Dzięki nam możesz cieszyć się pięknem i funkcjonalnością
            przestrzeni zielonej wokół domu.
          </p>
          <div className="flex gap-4 justify-center max-w-20">
            <Button>
              <Link href={"/o-nas"}>O nas</Link>
            </Button>
            <Button variant={"ghost"}>
              <Link href={"/produkty"} className="flex items-center gap-2 ">
                Produkty <ArrowRight />
              </Link>
            </Button>
          </div>
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
            <CarouselItem className="md:basis-1/2 lg:basis-1/3 h-[500px]">
              <div className="w-full h-full bg-[url('/about1.jpg')] bg-center bg-cover rounded-lg transition ease-in-out  overflow-hidden">
                <div className="w-full h-full hover:bg-black/60 rounded-lg flex flex-col justify-center p-8 text-white group transition ease-in-out">
                  <h4 className="text-[0px] group-hover:text-xl transition ease-in-out">
                    Altana A02
                  </h4>
                  <p className="text-justify text-[0px] group-hover:text-sm transition ease-in-out">
                    Urokliwa altana przy domu to idealne miejsce do relaksu i
                    spotkań na świeżym powietrzu. Solidne wykonanie i elegancki
                    design sprawiają, że altana stanowi harmonijne rozszerzenie
                    domu, tworząc oazę spokoju. Doskonale łączy funkcjonalność i
                    estetykę, zapewniając idealną przestrzeń do cieszenia się
                    każdą porą roku w gronie rodziny czy przyjaciół.
                  </p>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem className="md:basis-1/2 lg:basis-1/3">
              <div className="w-full h-full bg-[url('/about2.jpg')] bg-center bg-cover rounded-lg transition ease-in-out  overflow-hidden">
                <div className="w-full h-full hover:bg-black/60 rounded-lg flex flex-col justify-center p-8 text-white group transition ease-in-out">
                  <h4 className="text-[0px] group-hover:text-xl transition ease-in-out">
                    Plac Zabaw PZ04
                  </h4>
                  <p className="text-justify text-[0px] group-hover:text-sm transition ease-in-out">
                    Plac zabaw to magiczne miejsce, gdzie dzieci rozwijają
                    wyobraźnię i czerpią radość z zabawy. Z kolorowymi
                    huśtawkami, zjeżdżalniami i wieloma innymi atrakcjami, plac
                    zabaw staje się areną pełną śmiechu, nauki i przygód.
                    Bezpieczne i pełne energii miejsce, gdzie dzieci uczą się
                    współpracy, rozwijają sprawność fizyczną i budują
                    przyjaźnie, tworząc niezapomniane chwile radości i radosnych
                    wspomnień.
                  </p>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem className="md:basis-1/2 lg:basis-1/3">
              <div className="w-full h-full bg-[url('/about3.jpg')] bg-center bg-cover rounded-lg transition ease-in-out  overflow-hidden">
                <div className="w-full h-full hover:bg-black/60 rounded-lg flex flex-col justify-center p-8 text-white group transition ease-in-out">
                  <h4 className="text-[0px] group-hover:text-xl transition ease-in-out">
                    Altana A03
                  </h4>
                  <p className="text-justify text-[0px] group-hover:text-sm transition ease-in-out">
                    Altana A03 to eleganckie schronienie, gdzie spokój spotyka
                    się z pięknem otaczającej przyrody. Z solidnym wykonaniem i
                    wyrafinowanym designem, altana staje się oazą relaksu. Z
                    dala od zgiełku codziennego życia, oferuje doskonałą
                    przestrzeń do intymnych spotkań, czytania książki przy
                    szumie liści czy romantycznych kolacji pod gwiazdami. To
                    miejsce, gdzie architektura łączy się z naturą, tworząc
                    unikalną atmosferę harmonii i spokoju.
                  </p>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem className="md:basis-1/2 lg:basis-1/3">
              <div className="w-full h-full bg-[url('/about4.jpg')] bg-center bg-cover rounded-lg transition ease-in-out  overflow-hidden">
                <div className="w-full h-full hover:bg-black/60 rounded-lg flex flex-col justify-center p-8 text-white group transition ease-in-out">
                  <h4 className="text-[0px] group-hover:text-xl transition ease-in-out">
                    Zadaszenie Tarasu
                  </h4>
                  <p className="text-justify text-[0px] group-hover:text-sm transition ease-in-out">
                    Zadaszenie tarasu to praktyczne i stylowe rozwiązanie,
                    precyzyjnie dopasowywane do indywidualnych potrzeb klienta.
                    Dzięki solidnym materiałom i starannemu wykonaniu,
                    zadaszenie nie tylko chroni przed warunkami atmosferycznymi,
                    ale także dodaje elegancji tarasowi. To miejsce, gdzie
                    funkcjonalność spotyka się z designerskim podejściem,
                    podkreślając unikalny charakter przestrzeni. Odkryj komfort
                    i styl pod naszym zadaszeniem, dostosowanym do Twojego
                    gustu.
                  </p>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem className="md:basis-1/2 lg:basis-1/3">
              <div className="w-full h-full bg-[url('/about5.jpeg')] bg-center bg-cover rounded-lg transition ease-in-out  overflow-hidden">
                <div className="w-full h-full hover:bg-black/60 rounded-lg flex flex-col justify-center p-8 text-white group transition ease-in-out">
                  <h4 className="text-[0px] group-hover:text-xl transition ease-in-out">
                    Huśtawka HS01
                  </h4>
                  <p className="text-justify text-[0px] group-hover:text-sm transition ease-in-out">
                    Huśtawka HS01 to nasz bestseller. Zapewniając niezapomniane
                    chwile zabawy, nasza huśtawka to połączenie komfortu,
                    bezpieczeństwa i uroku w jednym. Solidne wykonanie,
                    ergonomiczny design i radość beztroskiej rozrywki sprawiają,
                    że ta huśtawka zdobyła serca wielu. Doświadcz
                    niepowtarzalnego uroku i przyjemności, sięgając po naszego
                    bestsellera, która przynosi uśmiech na twarze zarówno
                    dzieci, jak i dorosłych.
                  </p>
                </div>
              </div>
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
