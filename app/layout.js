import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://thewellpaidexpert.com"),
  title: {
    default: "The Well-Paid Expert | Turn Your Expertise Into a $100K Revenue Stream",
    template: "%s | The Well-Paid Expert",
  },
  description:
    "Helping experts add $100,000+ per year with what they already know. Resources on email lists, quiz funnels, LinkedIn strategy, digital products, and building a one-person business.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://thewellpaidexpert.com",
    siteName: "The Well-Paid Expert",
    title: "The Well-Paid Expert | Turn Your Expertise Into Revenue",
    description:
      "You deserve to be paid well for your expertise. Learn how to build digital products, grow your email list, and create a profitable one-person online business.",
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
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
