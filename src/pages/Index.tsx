import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedProperties from "@/components/FeaturedProperties";
import Services from "@/components/Services";
import About from "@/components/About";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

const Index = () => {
  const location = useLocation();
  const isPropertiesView =
    location.hash === "#propiedades" ||
    new URLSearchParams(location.search).has("cat");

  return (
    <div className="min-h-screen">
      <Navbar />
      {!isPropertiesView && <Hero />}
      {isPropertiesView && <div className="pt-40" />}
      <FeaturedProperties />
      <Services />
      <About />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default Index;
