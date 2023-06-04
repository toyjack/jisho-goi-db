import GoogleAnalytics from "@/components/common/GoogleAnalytics";
import { Suspense } from "react";

export default function Head() {
  return (
    <>
      <title>辞書語彙データベース</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="description" content="辞書語彙データベース" />
      <link rel="icon" href="/images/logo_withbg.png" />
      <Suspense fallback={<div>loading...</div>}>
        <GoogleAnalytics />
      </Suspense>
    </>
  );
}
