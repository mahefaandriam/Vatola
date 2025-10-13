import React, { useState, useRef, useEffect } from "react";
import { ChevronRight, ChevronLeft, X } from "lucide-react";

export default function PhotoViewer({ images = [], initialIndex = 0 }) {
  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState(initialIndex);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const pointerState = useRef({ dragging: false, startX: 0, startY: 0, startOffsetX: 0, startOffsetY: 0 });
  const pinchRef = useRef({ distance: 0, initialScale: 1 });
  const lastTapRef = useRef(0);

  useEffect(() => { if (!isOpen) resetTransform(); }, [isOpen, index]);
  useEffect(() => {
    const onKey = (e) => {
      if (!isOpen) return;
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, index]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  function open(i) { setIndex(i); setIsOpen(true); }
  function close() { setIsOpen(false); }
  function next() { setIndex(i => (i + 1) % images.length); }
  function prev() { setIndex(i => (i - 1 + images.length) % images.length); }

  function resetTransform() { setScale(1); setOffset({ x: 0, y: 0 }); }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

  function onWheel(e) {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.1 : 0.9;
    const newScale = clamp(scale * factor, 1, 5);
    setScale(newScale);
  }

  function onDoubleClick() { scale > 1.1 ? resetTransform() : setScale(2); }

  function onPointerDown(e) {
    if (scale <= 1) return;
    pointerState.current.dragging = true;
    pointerState.current.startX = e.clientX;
    pointerState.current.startY = e.clientY;
    pointerState.current.startOffsetX = offset.x;
    pointerState.current.startOffsetY = offset.y;
    e.target.setPointerCapture?.(e.pointerId);
  }
  function onPointerMove(e) {
    if (!pointerState.current.dragging) return;
    const dx = e.clientX - pointerState.current.startX;
    const dy = e.clientY - pointerState.current.startY;
    setOffset({ x: pointerState.current.startOffsetX + dx / scale, y: pointerState.current.startOffsetY + dy / scale });
  }
  function onPointerUp(e) { pointerState.current.dragging = false; e.target.releasePointerCapture?.(e.pointerId); }

  function getDistance(touches) { const [a, b] = touches; return Math.hypot(b.clientX - a.clientX, b.clientY - a.clientY); }
  function onTouchStart(e) {
    if (e.touches.length === 2) {
      pinchRef.current.distance = getDistance(e.touches);
      pinchRef.current.initialScale = scale;
    } else if (e.touches.length === 1 && scale > 1) {
      const touch = e.touches[0];
      pointerState.current.dragging = true;
      pointerState.current.startX = touch.clientX;
      pointerState.current.startY = touch.clientY;
      pointerState.current.startOffsetX = offset.x;
      pointerState.current.startOffsetY = offset.y;
    }
  }
  function onTouchMove(e) {
    if (e.touches.length === 2) {
      const newDistance = getDistance(e.touches);
      const factor = newDistance / pinchRef.current.distance;
      setScale(clamp(pinchRef.current.initialScale * factor, 1, 5));
    } else if (e.touches.length === 1 && pointerState.current.dragging) {
      const touch = e.touches[0];
      const dx = touch.clientX - pointerState.current.startX;
      const dy = touch.clientY - pointerState.current.startY;
      setOffset({ x: pointerState.current.startOffsetX + dx / scale, y: pointerState.current.startOffsetY + dy / scale });
    }
  }
  function onTouchEnd(e) {
    pointerState.current.dragging = false;
    const now = Date.now();
    if (now - lastTapRef.current < 300) scale > 1.1 ? resetTransform() : setScale(2);
    lastTapRef.current = now;
  }

  return (
    <div className="photo-viewer">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {images.map((src, i) => (
          <button key={i} onClick={() => open(i)} className="overflow-hidden rounded shadow-sm bg-gray-100 p-1" aria-label={`Ouvrir l'image ${i + 1}`}>
            <img src={src} alt={`Image ${i + 1}`} className="w-full h-60 object-cover transform hover:scale-105 transition" />
          </button>
        ))}
      </div>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={(e) => { if (e.target === e.currentTarget) close(); }}>
          <div className="relative w-full max-w-5xl max-h-[90vh]">
            <button onClick={close} className="right-20 shadow-xl border-2 border-white/30 absolute top-2 right-2 z-10 rounded bg-white/10 hover:bg-white/20 p-2 text-white" aria-label="Fermer"><X size={30}/></button>
            <button onClick={prev} className="w-13 right-20 shadow-xl border-2 border-white/30 text-white bg-white/10 hover:bg-white/20 rounded absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2" aria-label="Image précédente"><ChevronLeft size={30} /></button>
            <button onClick={next} className="right-20 shadow-xl border-2 border-white/30 text-white bg-white/10 hover:bg-white/20 rounded absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2" aria-label="Image suivante"><ChevronRight size={30} /></button>
            <div ref={containerRef} onWheel={onWheel} onDoubleClick={onDoubleClick} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd} className="w-full max-h-[90vh] bg-black/80 rounded flex items-center justify-center overflow-hidden touch-none" style={{ cursor: scale > 1 ? "grab" : "auto" }}>
              <img src={images[index]} alt={`Image ${index + 1}`} draggable={false} style={{ transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`, transition: pointerState.current.dragging ? "none" : "transform 200ms ease", maxWidth: "100%", maxHeight: "100%" }} className="block object-contain" />
            </div>
            <div className="mt-2 text-center text-sm text-white/80">{index + 1} / {images.length}</div>
          </div>
        </div>
      )}
    </div>
  );
}
