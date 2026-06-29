import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = "Classroom by Tina";

const description =
  "Premium K–2 lesson plans, centers, assessments, AI teaching tools, and classroom resources created by a real Charlotte-Mecklenburg teacher.";

export const metadata: Metadata = {
  metadataBase: new URL("https://classroombytina.com"),

  title: {
    default: title,
    template: "%s | Classroom by Tina",
  },

  description,

  applicationName: "Classroom by Tina",

  keywords: [
    "K-2 lesson plans",
    "Kindergarten resources",
    "First Grade resources",
    "Second Grade resources",
    "Charlotte-Mecklenburg Schools",
    "CMS teachers",
    "Teacher lesson plans",
    "Teacher AI",
    "Parent letters",
    "Centers",
    "Assessments",
    "Classroom planning",
    "Elementary teacher resources",
  ],

  authors: [
    {
      name: "Classroom by Tina",
      url: "https://classroombytina.com",
    },
  ],

  creator: "Classroom by Tina",
  publisher: "Classroom by Tina",

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: [
      {
        url: "/favicon.ico",
      },
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
      {
        url: "/favicon-96x96.png",
        sizes: "96x96",
        type: "image/png",
      },
    ],

    apple: "/apple-touch-icon.png",

    shortcut: "/favicon.ico",
  },

  manifest: "/site.webmanifest",

  themeColor: "#fffaf3",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://classroombytina.com",
    siteName: "Classroom by Tina",
    title,
    description,

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Classroom by Tina",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title,
    description,

    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-screen bg-[#fffaf3] text-slate-950">
        {children}
      </body>
    </html>
  );
}