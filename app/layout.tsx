import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import QueryProviders from "@/providers/query-provider";
import { SheetProvider } from "@/providers/sheetprovider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>
        <QueryProviders>
          <SheetProvider/>
          <Toaster/>{children}
           </QueryProviders></body>
    </html>
    </ClerkProvider>
  );
}
