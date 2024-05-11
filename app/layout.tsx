import { QueryProvider } from "@/providers/query-provider";
import { ThemeProvider } from "@/providers/theme-providers";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Finance",
  description: "Financial dashboard to keep track of all your accounts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        signIn: {
          variables: { colorPrimary: "#f97316" },
        },
        signUp: {
          variables: { colorPrimary: "#f97316" },
        },
      }}
    >
      <html lang="en">
        <body className={inter.className}>
          <QueryProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
