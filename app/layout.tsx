import "./globals.css";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from '@next/third-parties/google'

import CommonHeader from "@/components/common/Header";
import CommonFooter from "@/components/common/Footer";
import { Providers } from "./providers";

const title =
  "辞書語彙データベース" + (process.env.IS_DEV === "true" ? "（検証用）" : "");

export const metadata = {
  title,
  description: "辞書語彙データベース",
  manifest: "/images/favicon/site.webmanifest",
  icons: {
    icon: "/images/favicon/favicon-32x32.png",
    apple: "/images/favicon/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" data-theme="myTheme">
      <head>
        <GoogleAnalytics gaId="G-43JXZ3BZT8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta charSet="utf-8" />
      </head>
      <body>
        <Providers>
          <CommonHeader />
          {children}
        </Providers>
        <CommonFooter />
        <VercelAnalytics />
      </body>
    </html>
  );
}
