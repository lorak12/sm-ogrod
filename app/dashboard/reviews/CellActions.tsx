import {
  CircleCheck,
  Clipboard,
  Edit,
  Eye,
  MoreHorizontal,
  Trash,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Row } from "@tanstack/react-table";
import { Review } from "./columns";
import Link from "next/link";
import { deleteReview } from "@/actions/reviewsActions";
import { toast } from "@/components/ui/use-toast";

function CellActions({ row }: { row: Row<Review> }) {
  const review = row;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Akcje</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(review.original.id)}
          className="gap-2"
        >
          <Clipboard className="w-4 h-4" />
          Kopiuj ID recenzji
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link
            href={`/dashboard/reviews/${review.original.id}`}
            className="gap-2 flex items-center"
          >
            <Eye className="w-4 h-4" />
            Zobacz recenzje
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <AlertDialog>
            <AlertDialogTrigger className="cursor-pointer w-full hover:text-accent-foreground hover:bg-accent relative flex select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
              <div className="flex gap-2 items-center">
                <Trash className="w-4 h-4" />
                Usuń recenzje
              </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Czy jesteś pewny?</AlertDialogTitle>
                <AlertDialogDescription>
                  Tak akcja nie może zostać cofnięta. Ta operacja permanentnie
                  usunie recenzje z bazy danych.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Anuluj</AlertDialogCancel>
                <AlertDialogAction
                  onClick={async () => {
                    await deleteReview(row.original.id);
                    toast({
                      title: "Recenzja został usunięty",
                      action: (
                        <CircleCheck className="w-4 h-4 text-green-500" />
                      ),
                    });
                  }}
                >
                  Kontynuuj
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default CellActions;
