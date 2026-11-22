import { Hero } from "@/components/sections/Hero";
import { Original } from "@/components/sections/Original";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { WhoItsFor } from "@/components/sections/WhoItsFor";
import { Notes } from "@/components/sections/Notes";
import { Bottles } from "@/components/sections/Bottles";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <>
      <Hero />
      <Original />
      <HowItWorks />
      <WhoItsFor />
      <Notes />
      <Bottles />
      <Faq />
      <FinalCta />
    </>
  );
}
