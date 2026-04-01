import { Hero } from '@/components/sections/Hero';
import { AboutBook } from '@/components/sections/AboutBook';
import { TableOfContents } from '@/components/sections/TableOfContents';
import { Features } from '@/components/sections/Features';
import { Author } from '@/components/sections/Author';
import { PurchaseSection } from '@/components/sections/PurchaseSection';
import { FAQ } from '@/components/sections/FAQ';
import { Footer } from '@/components/sections/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <AboutBook />
      <TableOfContents />
      <Features />
      <Author />
      <PurchaseSection />
      <FAQ />
      <Footer />
    </main>
  );
}
