import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Christella Guide",
  description: "Un guide pour aiguiller Christella dans la mise en place de son planning pour son voyage au Japon en mai !",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
