import React, { useState, useRef, useEffect } from "react";

// PhotoViewer
// Default export React component. TailwindCSS assumed.
// Props:
// - images: array of { src: string, alt?: string, type: 'image'}
// - startIndex: number (optional)
// - showThumbnails: boolean (optional, default true)
// - onClose: function (optional)

export default function PhotoViewer({
  images = [],
  startIndex = 0,
  showThumbnails = true,
  onClose = () => {},
}) {
  const [index, setIndex] = useState(Math.max(0, Math.min(startIndex, images.length - 1)));
  const [isZoomed, setIsZoomed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef(null);
  const imgRef = useRef(null);
  const touchStartX = useRef(null);
  const lastTap = useRef(0);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Escape") onClose();
      if (e.key === "+") setIsZoomed(true);
      if (e.key === "-") setIsZoomed(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    function onFullscreenChange() {
      const fs = !!(document.fullscreenElement || document.webkitFullscreenElement);
      setIsFullscreen(fs);
    }
    document.addEventListener("fullscreenchange", onFullscreenChange);
    document.addEventListener("webkitfullscreenchange", onFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", onFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", onFullscreenChange);
    };
  }, []);

  function next() {
    setIndex((i) => (i + 1) % Math.max(1, images.length));
    setIsZoomed(false);
  }
  function prev() {
    setIndex((i) => (i - 1 + images.length) % Math.max(1, images.length));
    setIsZoomed(false);
  }

  function goTo(i) {
    setIndex(i);
    setIsZoomed(false);
  }

  function toggleFullscreen() {
    const el = containerRef.current;
    if (!el) return;
    if (!isFullscreen) {
      if (el.requestFullscreen) el.requestFullscreen();
      else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
      else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
    }
  }

  function downloadCurrent() {
    const a = document.createElement("a");
    a.href = images[index].url;
    const suggested = (images[index].alt || `photo-${index + 1}`).replace(/\s+/g, "-");
    a.download = suggested;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  // Touch / swipe handlers (simple)
  function onTouchStart(e) {
    touchStartX.current = e.touches[0].clientX;
  }
  function onTouchEnd(e) {
    if (!touchStartX.current) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const threshold = 50; // px
    if (dx > threshold) prev();
    else if (dx < -threshold) next();
    touchStartX.current = null;
  }

  // Double-tap to zoom on mobile
  function onImageTouch(e) {
    const now = Date.now();
    const diff = now - lastTap.current;
    if (diff < 300 && diff > 0) {
      setIsZoomed((z) => !z);
    }
    lastTap.current = now;
  }

  // Simple pinch-to-zoom is omitted to keep this component lightweight; a library can be plugged in.

  const current = images[index] || { src: "", alt: "" };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col bg-accent/80 text-black p-2 md:p-6"
      aria-modal="true"
      role="dialog"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="px-3 py-1 rounded-md bg-white bg-opacity-10 hover:bg-opacity-20"
            aria-label="Close viewer"
          >
            Fermer
          </button>
          <div className="text-sm opacity-80 text-white">{index + 1} / {images.length}</div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsZoomed((z) => !z)}
            className="px-2 py-1 rounded-md bg-white bg-opacity-10 hover:bg-opacity-20"
            aria-label="Toggle zoom"
          >
            {isZoomed ? "Réduire" : "Zoom"}
          </button>
          <button
            onClick={toggleFullscreen}
            className="px-2 py-1 rounded-md bg-white bg-opacity-10 hover:bg-opacity-20"
            aria-label="Toggle fullscreen"
          >
            {isFullscreen ? "Quitter plein écran" : "Plein écran"}
          </button>
          <button
            onClick={downloadCurrent}
            className="px-2 py-1 rounded-md bg-white bg-opacity-10 hover:bg-opacity-20"
            aria-label="Download"
          >
            Télécharger
          </button>
        </div>
      </div>

      {/* Main area */}
      <div className="flex-1 flex items-center justify-center relative overflow-hidden">
        {/* Prev / Next buttons */}
        <button
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white bg-opacity-5 hover:bg-opacity-20 md:left-6"
          aria-label="Previous"
        >
          ‹
        </button>

        <div
          className="max-w-full max-h-full w-full h-full flex items-center justify-center"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {current.type === 'image' && (<img
            ref={imgRef}
            src={current.url}
            alt={current.alt || `photo-${index + 1}`}
            loading="lazy"
            onTouchStart={onImageTouch}
            draggable={false}
            style={{
              maxWidth: isZoomed ? "none" : "100%",
              maxHeight: isZoomed ? "none" : "100%",
              transform: isZoomed ? "scale(2)" : "scale(1)",
              transition: "transform 260ms ease",
              objectFit: "contain",
            }}
            className="select-none"
          />)}
        </div>

        <button
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white bg-opacity-5 hover:bg-opacity-20 md:right-6"
          aria-label="Next"
        >
          ›
        </button>
      </div>

      {/* Thumbnails */}
      {showThumbnails && (
        <div className="mt-3 overflow-x-auto flex gap-2 items-center">
          {images.map((it, i) => (it.type === 'image' && (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`flex-none p-0 rounded overflow-hidden border-2 ${i === index ? "border-white" : "border-transparent"}`}
              style={{ width: 80, height: 60 }}
              aria-label={`Voir image ${i + 1}`}
            >
              <img src={it.url} alt={it.alt || `mini-${i + 1}`} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </button>
          )))}
        </div>
      )}

      {/* Footer small controls for small screens */}
      <div className="mt-3 flex items-center justify-between text-xs opacity-80">
        <div>Appuyez ← → pour naviguer · double-tapez pour zoom</div>
        <div>
          <button onClick={() => { navigator.share && navigator.share({ title: current.alt || 'Photo', url: current.url }); }} className="px-2 py-1 rounded-md bg-white bg-opacity-5 hover:bg-opacity-20">Partager</button>
        </div>
      </div>
    </div>
  );
}
