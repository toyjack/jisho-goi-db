"use client";

import { GA_MEASUREMENT_ID, existsGaId, pageview } from "@/lib/gtag";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";
import { useEffect } from "react";

export default function GoogleAnalytics() {
  const gaId = GA_MEASUREMENT_ID;

  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!existsGaId) {
      return
    }
    const url = pathname + searchParams.toString()
    pageview(url)
  }, [pathname, searchParams])

  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      ></Script>

      <Script id='gtag-init' strategy="afterInteractive">
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
