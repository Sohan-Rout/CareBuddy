import Hero from "@/app/components/hero";
import Navbar from "@/app/components/navbar";
import Features from "@/app/components/features";
import AboutUs from "@/app/components/aboutUs";
import Faq from "@/app/components/faq";
import Reviews from "@/app/components/reviews";
import Footer from "@/app/components/footer";

export default function Home() {
  return (
    <>
    <Navbar />
    <Hero />
    <Features />
    <AboutUs />
    <Faq />
    <Reviews />
    <Footer />
    </>
  );
}