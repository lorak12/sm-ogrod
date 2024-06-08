import { checkRole } from "@/utils/roles";
import { redirect } from "next/navigation";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (!checkRole("admin")) {
    redirect("/");
  }

  return <div>{children}</div>;
}
