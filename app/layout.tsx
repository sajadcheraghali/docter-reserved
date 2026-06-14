import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import { NextFont } from "next/dist/compiled/@next/font";

import HeaderComponent from "@/components/Header/header.component";

import "./globals.css";
import FooterComponent from "@/components/Footer/footer.component";
import "@/source/styles/typography.css"

const vazirmatn :NextFont = Vazirmatn({
  subsets: ["latin" , "arabic"],
  display: "swap"
})
export const metadata: Metadata = {
  title: "جستجو پزشک",
  description: "پلتفرم آنلاین جستجو پزشک و رزرو نوبت",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.className}>
      <body>
        <HeaderComponent />
        <main>
        {children}
        </main>
        <p className="tagline">
          نوبت دهی پزشکی ، سامانه نوبت دهی اینترنتی بیمارستان و پزشکان 
        </p>
        <FooterComponent />
      </body>
    </html>
  );
}
