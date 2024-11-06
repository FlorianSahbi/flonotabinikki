import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Christella Guide",
  description: "Un guide pour aider Christella avec son voyage vers le Japon",
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
