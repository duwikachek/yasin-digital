import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";
import { X } from "lucide-react";

export const LayoutGrid = ({ cards }) => {
  const [selected, setSelected] = useState(null);

  // Tutup modal saat tekan ESC
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <>
      {/* Grid kartu (2 2 2 = 2 kolom x 3 baris) */}
      <div className="w-full p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto gap-4 auto-rows-[250px] md:auto-rows-[300px]">
        {cards.map((card, i) => (
          <div
            key={card.id}
            className={cn(card.className, "relative overflow-hidden rounded-2xl cursor-pointer group")}
            onClick={() => setSelected(card)}
          >
            <img
              src={card.thumbnail}
              alt="galeri kenangan"
              className="object-cover object-center absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-110"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-end p-4">
              <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <p className="text-white font-semibold text-sm drop-shadow-lg">🔍 Klik untuk memperbesar</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal lightbox */}
      <AnimatePresence>
        {selected && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100]"
              onClick={() => setSelected(null)}
            />

            {/* Modal container — benar-benar center dengan flexbox */}
            <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                key={`modal-${selected.id}`}
                initial={{ opacity: 0, scale: 0.85, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: 30 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="relative bg-white dark:bg-stone-900 rounded-3xl overflow-hidden shadow-2xl w-full max-w-3xl pointer-events-auto"
              >
                {/* Tombol tutup */}
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 z-10 w-9 h-9 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Gambar — TERANG, tanpa overlay gelap */}
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={selected.thumbnail}
                    alt="galeri diperbesar"
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                {/* Konten deskripsi di bawah gambar — bukan di atas gambar */}
                <div className="p-6 sm:p-8 bg-white dark:bg-stone-900">
                  {selected.content}
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};


