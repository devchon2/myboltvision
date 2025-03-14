'use client';
import Hero from '../components/hero/Hero.jsx';
import Features from '../components/features/Features.jsx';
import { Testimonials } from '../components/testimonials/Testimonials.tsx';
import Footer from '../components/footer/Footer.jsx';
import Pricing from '../components/pricing/Pricing.tsx';
import { GlobalStyles } from './design-system.tsx';

const HomePage = () => {
  return (
    <>
      <GlobalStyles />
      <main className="flex flex-col min-h-screen">
        <Hero />
        <Features />
        <Testimonials />
        <Pricing />
        <Footer />
      </main>
    </>
  );
};

export default HomePage;
