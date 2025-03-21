import Hero from '@/components/landing/Hero';
import NewsSection from '@/components/landing/NewsSection';
import DatabasesSection from "@/components/landing/DatabasesSection";
import MembersSection from '@/components/landing/MembersSection';

export default function Home() {
  return (
    <main>
      <Hero />
      <NewsSection />
      <DatabasesSection />
      <MembersSection />
    </main>
  );
}
