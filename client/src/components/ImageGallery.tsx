import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Download, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageGalleryProps {
  images: string[];
  currentIndex?: number;
  onClose: () => void;
}

export function ImageGallery({ images, currentIndex = 0, onClose }: ImageGalleryProps) {
  const [index, setIndex] = useState(currentIndex);
  const [zoom, setZoom] = useState(1);

  const goNext = () => {
    setIndex((prev) => (prev + 1) % images.length);
    setZoom(1);
  };

  const goPrev = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
    setZoom(1);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = images[index];
    link.download = `image-${index + 1}`;
    link.click();
  };

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.5, 3));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.5, 0.5));

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 z-10 bg-gradient-to-b from-black/50 to-transparent">
        <span className="text-sm text-white/80 font-medium">
          {index + 1} / {images.length}
        </span>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={handleZoomOut} className="text-white hover:bg-white/10">
            <ZoomOut className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleZoomIn} className="text-white hover:bg-white/10">
            <ZoomIn className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleDownload} className="text-white hover:bg-white/10">
            <Download className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/10">
            <X className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Image */}
      <div className="relative w-full h-full flex items-center justify-center p-16">
        <img
          src={images[index]}
          alt={`Image ${index + 1}`}
          className="max-w-full max-h-full object-contain transition-transform duration-200"
          style={{ transform: `scale(${zoom})` }}
        />
      </div>

      {/* Navigation */}
      {images.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            onClick={goPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/50 hover:bg-black/70 text-white"
          >
            <ChevronLeft className="w-8 h-8" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={goNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/50 hover:bg-black/70 text-white"
          >
            <ChevronRight className="w-8 h-8" />
          </Button>
        </>
      )}
    </div>
  );
}
