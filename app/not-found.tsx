"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center flex-col gap-8">
      <Image src="/404.svg" alt="404 image" width={400} height={200} />
      <Badge className="bg-red-400 w-fit">404 error</Badge>
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-semibold tracking-tight flex items-center justify-center">
          Nie znaleźliśmy strony której szukałeś
        </h1>
        <p className="text-xl text-muted-foreground mt-2">
          Przepraszamy, strona której szukasz nie istnieje lub została
          przeniesiona.
        </p>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="secondary" onClick={() => router.forward()}>
          Powrót
        </Button>
        <Button onClick={() => router.push("/")}>Strona główna</Button>
      </div>
    </div>
  );
}

export default NotFound;
