import { useLocation } from "react-router-dom";
import heroImage from "@/assets/hero-farm.jpg";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const location = useLocation();
  const showCompact =
    location.hash === "#propiedades" ||
    new URLSearchParams(location.search).get("cat") !== null;

  if (showCompact) {
    return (
      <section
        id="inicio"
        className="relative mt-52 min-h-[240px] flex items-center justify-center bg-primary py-12"
      >
        <div className="relative z-10 container mx-auto text-center px-4">
          <h1 className="text-3xl lg:text-6xl font-bold text-primary-foreground mb-4 animate-fade-in-up font-sans tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] md:text-5xl">
            Propiedades agrícolas con visión de inversión
          </h1>
          <p
            className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto font-sans opacity-0 animate-fade-in-up drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]"
            style={{ animationDelay: "0.2s" }}
          >
            Compra, venta y arriendo de campos y parcelas en Chile
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="inicio" className="relative mt-52 min-h-[calc(100vh-13rem)] flex items-center justify-center pt-12 pb-16">
      <img
        src={heroImage}
        alt="Campos agrícolas al atardecer"
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 hero-overlay" />
      <div className="relative z-10 container mx-auto text-center px-4">
        <h1 className="text-3xl lg:text-6xl font-bold text-primary-foreground mb-6 animate-fade-in-up font-sans tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] md:text-5xl">
          Propiedades agrícolas con visión de inversión
        </h1>
        <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto mb-10 font-sans opacity-0 animate-fade-in-up drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]" style={{ animationDelay: "0.2s" }}>
          Compra, venta y arriendo de campos y parcelas en Chile
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          <Button size="lg" asChild className="bg-primary text-primary-foreground hover:bg-primary/90 text-base px-8 py-6">
            <a href="#propiedades">Ver Propiedades</a>
          </Button>
          <Button size="lg" variant="outline" asChild className="border-white text-white bg-white/10 hover:bg-white/20 text-base px-8 py-6">
            <a href="#contacto">Contáctanos</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
