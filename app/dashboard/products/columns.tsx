"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellActions from "./CellActions";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { booleans, statuses } from "@/components/ui/constants";

export type Product = {
  id: string;
  name: string;
  startingPrice: number;
  endingPrice: number;
  status: string;
  isVisible: boolean;
  buyer: string;
};

export const columns: ColumnDef<Product>[] = [
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
    accessorKey: "buyer",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Klasa" />
    ),
  },
  {
    accessorKey: "startingPrice",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cena wywoławcza" />
    ),
    cell: ({ row }) => {
      const startingPrice = parseFloat(row.getValue("startingPrice"));
      const formatted = new Intl.NumberFormat("pl-PL", {
        style: "currency",
        currency: "PLN",
      }).format(startingPrice);

      return <div className=" font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "endingPrice",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cena końcowa" />
    ),
    cell: ({ row }) => {
      const endingPrice = parseFloat(row.getValue("endingPrice"));
      const formatted = new Intl.NumberFormat("pl-PL", {
        style: "currency",
        currency: "PLN",
      }).format(endingPrice);

      return <div className=" font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      );

      if (!status) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "isVisible",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Czy wyświetlane" />
    ),
    cell: ({ row }) => {
      const boolean = booleans.find(
        (boolean) => boolean.value === String(row.getValue("isVisible"))
      );

      if (!boolean) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          {boolean.icon && (
            <boolean.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{boolean.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <CellActions row={row} />;
    },
  },
];
