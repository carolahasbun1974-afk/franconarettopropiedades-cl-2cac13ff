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

  const [lightbox, setLightbox] = useState<number | null>(null);

  if (list.length === 0) return null;

  const close = () => setLightbox(null);
  const prev = () => setLightbox((i) => (i === null ? i : (i === 0 ? list.length - 1 : i - 1)));
  const next = () => setLightbox((i) => (i === null ? i : (i === list.length - 1 ? 0 : i + 1)));

  return (
    <div className="mb-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {list.map((img, i) => (
          <button
            key={img.id}
            type="button"
            onClick={() => setLightbox(i)}
            className="group relative aspect-square overflow-hidden rounded-lg bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label={`Ver foto ${i + 1}`}
          >
            <img
              src={img.image_url}
              alt={`Foto ${i + 1}`}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={close}
        >
          <button
            onClick={(e) => { e.stopPropagation(); close(); }}
            className="absolute top-4 right-4 text-white/90 hover:text-white p-2"
            aria-label="Cerrar"
          >
            <X size={28} />
          </button>
          <img
            src={list[lightbox].image_url}
            alt={`Foto ${lightbox + 1}`}
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
              <div className={cn("absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-sm")}>
                {lightbox + 1} / {list.length}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default PropertyImageGallery;
