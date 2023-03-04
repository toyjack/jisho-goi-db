"use client";
import Script from "next/script";
import { GA_MEASUREMENT_ID, existsGaId, pageview } from "@/lib/gtag";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function GoogleAnalytics() {
  // 参考:
  // https://qiita.com/ruiiixiii/items/2f3e3497d13ec804eb40
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!existsGaId) {
      return;
    }
    const url = pathname + searchParams.toString();
    pageview(url);
  }, [pathname, searchParams]);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=G-43JXZ3BZT8`}
      ></Script>
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-43JXZ3BZT8');
        `}
      </Script>
    </>
  );
}
