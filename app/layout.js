import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingBalls from "@/components/FloatingBalls";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Vistortech — Web, App, Marketing & E-commerce Solutions",
  description:
    "Vistortech builds websites, mobile apps, digital marketing campaigns, and e-commerce stores for growing businesses.",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/favicon-180x180.png",
  },
};

export const viewport = {
  themeColor: "#0EA5E9",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="font-body">
        <FloatingBalls />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
