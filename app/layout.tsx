import './globals.css'
import CommonHeader from '@/components/common/Header';
import CommonFooter from '@/components/common/Footer';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" data-theme="myTheme">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <CommonHeader />
        {children}
        <CommonFooter />
      </body>
    </html>
  );
}
