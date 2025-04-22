import type { Metadata } from "next";
import { Roboto, Roboto_Condensed } from "next/font/google";
import "./globals.css";
import "material-symbols/rounded.css";
import { ThemeProvider } from "next-themes";
import { Header } from "@/components/layout/header";
import { BottomTab } from "@/components/layout/bottom-tab";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

const robotoCondensed = Roboto_Condensed({
  variable: "--font-roboto-condensed",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chargebacks911 Test",
  description: "I'm your guy...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${roboto.variable} ${robotoCondensed.variable} bg-background font-roboto flex min-h-svh min-w-svw justify-center antialiased`}
      >
        <div className="relative w-full max-w-[100rem]">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header>{children}</Header>
            <BottomTab />
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
