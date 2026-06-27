import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { backend } from "@/lib/backendClient";
import PropertyCard from "./PropertyCard";
import vineyardImg from "@/assets/property-vineyard.jpg";
import { PROPERTY_CATEGORIES } from "@/lib/propertyCategories";
import type { Database } from "@/integrations/supabase/types";

type Property = Omit<Database["public"]["Tables"]["properties"]["Row"], "user_id">;

const FeaturedProperties = () => {
  const [dbProperties, setDbProperties] = useState<Property[] | null>(null);
  const [loadError, setLoadError] = useState(false);
  const location = useLocation();

  const activeCategory = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get("cat");
  }, [location.search]);

  useEffect(() => {
    const fetchProperties = async () => {
      const { data, error } = await backend
        .from("properties")
        .select("id, title, description, price, location, property_type, hectares, image_url, created_at, updated_at")
        .order("created_at", { ascending: false });
      if (error) {
        console.error("Error loading properties", error);
        setLoadError(true);
        setDbProperties([]);
        return;
      }
      setDbProperties((data ?? []) as Property[]);
    };
    fetchProperties();
  }, []);

  const properties = dbProperties ?? [];
  const isLoading = dbProperties === null;

  const filteredDb = activeCategory
    ? properties.filter((p) => p.property_type === activeCategory)
    : properties.slice(0, 6);

  const setCategory = (cat: string | null) => {
    const url = cat ? `/?cat=${encodeURIComponent(cat)}#propiedades` : "/#propiedades";
    window.location.href = url;
  };

  return (
    <section
      id="propiedades"
      className={`py-20 bg-background scroll-mt-56 ${activeCategory ? "mt-52" : ""}`}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {activeCategory ?? "Propiedades Destacadas"}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto font-sans">
            {activeCategory
              ? `Mostrando propiedades en la categoría "${activeCategory}".`
              : "Selección exclusiva de las mejores tierras agrícolas disponibles en el mercado."}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <button
            onClick={() => setCategory(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
              !activeCategory
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background text-foreground border-border hover:bg-muted"
            }`}
          >
            Todas
          </button>
          {PROPERTY_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-foreground border-border hover:bg-muted"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {isLoading && (
          <p className="text-center text-muted-foreground py-12">
            Cargando propiedades...
          </p>
        )}

        {!isLoading && loadError && (
          <p className="text-center text-muted-foreground py-12">
            No pudimos cargar las propiedades en este momento.
          </p>
        )}

        {!isLoading && !loadError && filteredDb.length === 0 && (
          <p className="text-center text-muted-foreground py-12">
            {activeCategory
              ? "No hay propiedades en esta categoría todavía."
              : "No hay propiedades disponibles por el momento."}
          </p>
        )}

        {filteredDb.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDb.map((prop) => (
              <Link key={prop.id} to={`/propiedad/${prop.id}`}>
                <PropertyCard
                  image={prop.image_url || vineyardImg}
                  title={prop.title}
                  location={prop.location}
                  hectares={prop.hectares}
                  type={prop.property_type}
                  price={prop.price}
                />
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProperties;
