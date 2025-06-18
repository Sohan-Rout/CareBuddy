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
    <div id="features"><Features /></div>
    <div id="aboutus"><AboutUs /></div>
    <div id="faqs"><Faq /></div>
    <div id="reviews"><Reviews /></div>
    <Footer />
    </>
  );
}