import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PropertyImageGalleryProps {
  images: { id: string; image_url: string; position: number }[];
  fallbackUrl?: string | null;
}

const PropertyImageGallery = ({ images, fallbackUrl }: PropertyImageGalleryProps) => {
  const sorted = [...images].sort((a, b) => a.position - b.position);
  const list = sorted.length > 0
    ? sorted
    : fallbackUrl
      ? [{ id: "fallback", image_url: fallbackUrl, position: 0 }]
      : [];

  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  if (list.length === 0) return null;

  const prev = () => setCurrent((p) => (p === 0 ? list.length - 1 : p - 1));
  const next = () => setCurrent((p) => (p === list.length - 1 ? 0 : p + 1));

  return (
    <div className="mb-8 space-y-3">
      <div className="relative rounded-lg bg-muted overflow-hidden aspect-[4/3] md:aspect-[16/10]">
        <button
          type="button"
          onClick={() => setLightbox(true)}
          className="absolute inset-0 w-full h-full focus:outline-none"
          aria-label="Ampliar foto"
        >
          <img
            src={list[current].image_url}
            alt={`Foto ${current + 1}`}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </button>
        {list.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/70 hover:bg-background/90 rounded-full"
              onClick={prev}
            >
              <ChevronLeft size={20} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/70 hover:bg-background/90 rounded-full"
              onClick={next}
            >
              <ChevronRight size={20} />
            </Button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {list.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-colors",
                    i === current ? "bg-primary" : "bg-background/60"
                  )}
                  aria-label={`Ir a foto ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {list.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {list.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setCurrent(i)}
              className={cn(
                "shrink-0 w-20 h-20 rounded border-2 transition-colors overflow-hidden",
                i === current ? "border-primary" : "border-transparent"
              )}
            >
              <img
                src={img.image_url}
                alt={`Miniatura ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(false)}
        >
          <button
            onClick={(e) => { e.stopPropagation(); setLightbox(false); }}
            className="absolute top-4 right-4 text-white/90 hover:text-white p-2"
            aria-label="Cerrar"
          >
            <X size={28} />
          </button>
          <img
            src={list[current].image_url}
            alt={`Foto ${current + 1}`}
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          {list.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full"
                onClick={(e) => { e.stopPropagation(); prev(); }}
              >
                <ChevronLeft size={24} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full"
                onClick={(e) => { e.stopPropagation(); next(); }}
              >
                <ChevronRight size={24} />
              </Button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-sm">
                {current + 1} / {list.length}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default PropertyImageGallery;
