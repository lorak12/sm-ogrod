"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellActions from "./CellActions";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { format } from "date-fns";
import { pl } from "date-fns/locale/pl";

export type Category = {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};

export const columns: ColumnDef<Category>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nazwa" />
    ),
    cell: ({ row }) => (
      <div className="w-[300px] whitespace-nowrap overflow-hidden text-ellipsis">
        {row.getValue("name")}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Stworzony" />
    ),
    cell: ({ row }) => {
      const rawFormattedDate = format(
        row.getValue("createdAt"),
        " dd MMMM yyyy",
        {
          locale: pl,
        }
      );

      const formattedDate = rawFormattedDate.replace(
        /(\d{2} )(\p{L})/u,
        (match, p1, p2) => p1 + p2.toUpperCase()
      );

      return <span>{formattedDate}</span>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Aktualizowany" />
    ),
    cell: ({ row }) => {
      const rawFormattedDate = format(
        row.getValue("updatedAt"),
        " dd MMMM yyyy",
        {
          locale: pl,
        }
      );

      const formattedDate = rawFormattedDate.replace(
        /(\d{2} )(\p{L})/u,
        (match, p1, p2) => p1 + p2.toUpperCase()
      );

      return <span>{formattedDate}</span>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <CellActions row={row} />;
    },
  },
];
