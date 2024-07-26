import Hero from '@/components/landing/Hero';
import NewsSection from '@/components/landing/NewsSection';
import DatabasesSection from "@/components/landing/DatabasesSection";
import MembersSection from '@/components/landing/MembersSection';
import Shukai202409 from '@/components/landing/Shukai-202409';

export default function Home() {
  return (
    <main>
      <Hero />
      <Shukai202409 />
      <NewsSection />
      <DatabasesSection />
      <MembersSection />
    </main>
  );
}
