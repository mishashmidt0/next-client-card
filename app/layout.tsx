import { type ReactNode } from "react";

import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "@/public/styles/globals.css";
import { Toaster } from "react-hot-toast";

import { Providers } from "@/app/providers";
import { ThemeProvider } from "@/src/feature/theme-provider";
import { cn } from "@/src/shared/lib/utils";

const font = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Персонажи",
  description: "Угадай персонажа",
};
interface Props {
  children: ReactNode;
  modal: ReactNode;
}
export default function RootLayout(props: Props) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={cn(["min-h-screen", font.className])}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <Providers>
              {props.children}
              {props.modal}
            </Providers>
          </ThemeProvider>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
