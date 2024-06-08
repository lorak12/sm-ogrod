import {
  CircleCheck,
  CircleIcon,
  Timer,
  CircleX,
  Check,
  X,
} from "lucide-react";

export const statuses = [
  {
    value: "none",
    label: "W kolejce",
    icon: CircleIcon,
  },
  {
    value: "inProgress",
    label: "W trakcie",
    icon: Timer,
  },
  {
    value: "ended",
    label: "Zakończona",
    icon: CircleCheck,
  },
  {
    value: "canceled",
    label: "Wycofana",
    icon: CircleX,
  },
];

export const booleans = [
  {
    value: "true",
    label: "Tak",
    icon: Check,
  },
  {
    value: "false",
    label: "Nie",
    icon: X,
  },
];
