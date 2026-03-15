import Hero from '@/components/landing/Hero';
import NewsSection from '@/components/landing/NewsSection';
import DatabasesSection from "@/components/landing/DatabasesSection";
import MembersSection from '@/components/landing/MembersSection';
import Shukai2025Section from '@/components/landing/Shukai-2025';

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
