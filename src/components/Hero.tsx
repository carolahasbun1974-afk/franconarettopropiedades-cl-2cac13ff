import heroImage from "@/assets/hero-farm.jpg";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section id="inicio" className="relative min-h-[40vh] md:min-h-[50vh] flex items-center justify-center pt-28 pb-10 md:pt-40 md:pb-20">
      <img
        src={heroImage}
        alt="Campos agrícolas al atardecer"
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 hero-overlay" />
      <div className="relative z-10 container mx-auto text-center px-4">
        <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold text-primary-foreground mb-3 md:mb-6 animate-fade-in-up font-sans tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
          Propiedades agrícolas con visión de inversión
        </h1>
        <p className="text-sm md:text-xl text-primary-foreground/90 max-w-2xl mx-auto mb-4 md:mb-10 font-sans opacity-0 animate-fade-in-up drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]" style={{ animationDelay: "0.2s" }}>
          Compra, venta y arriendo de campos y parcelas en Chile
        </p>
        <div className="flex flex-col sm:flex-row gap-2 md:gap-4 justify-center opacity-0 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          <Button size="lg" asChild className="bg-primary text-primary-foreground hover:bg-primary/90 text-sm md:text-base px-5 md:px-8 py-3 md:py-6">
            <a href="#propiedades">Ver Propiedades</a>
          </Button>
          <Button size="lg" variant="outline" asChild className="border-white text-white bg-white/10 hover:bg-white/20 text-sm md:text-base px-5 md:px-8 py-3 md:py-6">
            <a href="#contacto">Contáctanos</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
