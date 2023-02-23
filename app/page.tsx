import Image from 'next/image'
import Hero from '@/components/landing/Hero';
import NewsSection from '@/components/landing/NewsSection';
import DatabasesSection from "@/components/landing/DatabasesSection";
import MembersSection from '@/components/landing/MembersSection';
import ShukaiSection from '@/components/landing/Shukai';

export default function Home() {
  return (
    <main>
      <Hero />
      <ShukaiSection />
      <NewsSection />
      <DatabasesSection />
      <MembersSection />
    </main>
  );
}
