import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { HowItWorks } from "@/components/HowItWorks";
import { Domains } from "@/components/Domains";
import { Journey } from "@/components/Journey";
import { Waitlist } from "@/components/Waitlist";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Problem />
        <HowItWorks />
        <Domains />
        <Journey />
        <Waitlist />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
