"use client";
import { GA_MEASUREMENT_ID } from "@/lib/gtag";
import Script from "next/script";

export default function GoogleAnalytics() {
  const gaId = GA_MEASUREMENT_ID;

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      ></Script>
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', ${gaId});
        `}
      </Script>
    </>
  );
}
