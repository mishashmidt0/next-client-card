import { type ReactNode } from "react";

import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "@/public/styles/globals.css";
import "@uploadthing/react/styles.css";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "src/widgets/providers/theme-provider";

import { Providers } from "@/app/providers";
import { cn } from "@/src/shared/lib/utils";
import { ModalProvider } from "@/src/widgets/providers/modal-provider";
import { SocketProvider } from "@/src/widgets/providers/socket-provider";

const font = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Персонажи",
  description: "Угадай персонажа",
};
interface Props {
  children: ReactNode;
  modal: ReactNode;
}

// TODO Есть ли смысл импоритровать здесь ModalProvider или лучше в main layout  ?
export default function RootLayout(props: Props) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={cn([
            "h-[100vh] bg-white dark:bg-[#313338]",
            font.className,
          ])}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
          >
            <SocketProvider>
              <Providers>
                <ModalProvider />

                {props.children}
                {props.modal}
              </Providers>
            </SocketProvider>
          </ThemeProvider>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
