import { Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.jpeg";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="inline-flex mb-4 rounded-md bg-background px-3 py-2 shadow-sm">
              <img src={logo} alt="Franco Naretto Propiedades Agrícolas" className="h-14 w-auto object-contain" />
            </div>
            <p className="text-primary-foreground/75 font-sans text-sm leading-relaxed">
              Corredora de propiedades agrícolas. Conectamos a quienes buscan invertir en el campo con las mejores oportunidades del mercado.
            </p>
          </div>
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Contacto</h4>
            <ul className="space-y-3 font-sans text-sm text-primary-foreground/75">
              <li className="flex items-center gap-2">
                <Phone size={16} /> +56 9 98859247
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="flex-shrink-0" />
                <a href="mailto:contacto@franconarettopropiedades.cl" className="text-xs sm:text-sm whitespace-nowrap hover:text-primary-foreground transition-colors">
                  contacto@franconarettopropiedades.cl
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} /> Rengo, VI Región
              </li>
              <li className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                <a href="https://instagram.com/franconaretto.propiedades" target="_blank" rel="noopener noreferrer" className="hover:text-primary-foreground transition-colors">
                  @franconaretto.propiedades
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">¿Tienes un campo para vender?</h4>
            <p className="text-primary-foreground/75 font-sans text-sm mb-4">
              Déjanos tus datos y te contactaremos a la brevedad.
            </p>
            <Link
              to="/vender"
              className="inline-flex items-center justify-center rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground ring-offset-background transition-colors hover:bg-secondary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Publicar mi propiedad
            </Link>
          </div>
        </div>
        <div className="border-t border-primary-foreground/20 mt-12 pt-6 text-center text-xs text-primary-foreground/50 font-sans">
          © 2026 Franco Naretto Propiedades Agrícolas. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
