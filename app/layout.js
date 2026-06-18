import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://thewellpaidexpert.com"),
  alternates: {
    canonical: "./",
  },
  title: {
    default: "The Well-Paid Expert | Practical Business Articles for Experts",
    template: "%s | The Well-Paid Expert",
  },
  description:
    "Practical articles for consultants, creators, and small business owners on marketing, operations, strategy, AI, and building a leaner business.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://thewellpaidexpert.com",
    siteName: "The Well-Paid Expert",
    title: "The Well-Paid Expert | Practical Business Articles for Experts",
    description:
      "Articles on marketing, operations, strategy, AI, and building a leaner small business.",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
