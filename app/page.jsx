import Hero from './components/Hero';
import Features from './components/Features';
import Pricing from './components/Pricing';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
       <div className=" flex items-center justify-center min-h-screen">
        <Hero />
      </div>
      <Features />
      <Pricing />
    </main>
  );
}
