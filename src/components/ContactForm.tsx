import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, User, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// 👇 REEMPLAZA esto por tu Access Key de https://web3forms.com
// (Es seguro tenerla en el código del frontend — Web3Forms está diseñado así.)
const WEB3FORMS_ACCESS_KEY = "TU_ACCESS_KEY_AQUI";

const ContactForm = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Nuevo contacto desde la web — ${form.name}`,
          from_name: "Franco Naretto Propiedades",
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message,
          // Web3Forms enviará el correo a la casilla con la que creaste la Access Key
          // (contacto@franconarettopropiedades.cl)
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Error al enviar el formulario");
      }

      toast({
        title: "Mensaje enviado",
        description: "Nos pondremos en contacto contigo a la brevedad.",
      });
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      console.error(err);
      toast({
        title: "Error al enviar",
        description:
          "Intenta nuevamente o escríbenos directamente a contacto@franconarettopropiedades.cl",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contacto" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Contáctanos
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto font-sans">
            ¿Interesado en alguna propiedad o quieres vender tu campo? Déjanos tus datos y te contactaremos a la brevedad.
          </p>
        </div>
        <div className="max-w-xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                name="name"
                placeholder="Nombre completo"
                value={form.name}
                onChange={handleChange}
                required
                className="pl-10 bg-background"
              />
            </div>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                name="email"
                type="email"
                placeholder="Correo electrónico"
                value={form.email}
                onChange={handleChange}
                required
                className="pl-10 bg-background"
              />
            </div>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                name="phone"
                type="tel"
                placeholder="Teléfono"
                value={form.phone}
                onChange={handleChange}
                className="pl-10 bg-background"
              />
            </div>
            <Textarea
              name="message"
              placeholder="Cuéntanos qué buscas o qué propiedad deseas vender..."
              value={form.message}
              onChange={handleChange}
              required
              rows={5}
              className="bg-background"
            />
            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              <Send className="mr-2 h-5 w-5" />
              {loading ? "Enviando..." : "Enviar mensaje"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
