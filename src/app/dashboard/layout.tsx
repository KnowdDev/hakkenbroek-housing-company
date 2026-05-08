import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Hakkenbroek Housing Company",
  description: "Admin dashboard for managing listings and enquiries",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
