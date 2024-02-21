import Hero from '@/components/landing/Hero';
import NewsSection from '@/components/landing/NewsSection';
import DatabasesSection from "@/components/landing/DatabasesSection";
import MembersSection from '@/components/landing/MembersSection';
import Shukai2024Section from '@/components/landing/Shukai-2024';

export default function Home() {
  return (
    <main>
      <Hero />
      <Shukai2024Section />
      <NewsSection />
      <DatabasesSection />
      <MembersSection />
    </main>
  );
}
