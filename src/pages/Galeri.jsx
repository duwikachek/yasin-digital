import React from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import InteractiveGallery from "../components/ui/interactive-gallery";
import { useContent } from "../context/ContentContext";

export default function Galeri() {
  const { content } = useContent();
  const { gallery } = content;

  return (
    <div className="flex min-h-screen flex-col bg-stone-50 dark:bg-stone-950 transition-colors duration-300">
      <Navigation />
      <main className="flex-grow py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <header className="text-center mb-10 mt-4">
            <div className="inline-block p-4 rounded-full bg-emerald-50 dark:bg-emerald-950 mb-4 border border-emerald-100 dark:border-emerald-900/50">
              <span className="text-4xl">🖼️</span>
            </div>
            <h1 className="text-4xl font-serif tracking-tight text-stone-900 dark:text-stone-100 sm:text-5xl mb-4">
              Galeri Kenangan
            </h1>
            <p className="text-lg text-stone-600 dark:text-stone-400 max-w-xl mx-auto">
              Kumpulan momen dan kenangan bersama alm. SUBIYANTORO. Klik pada setiap panel untuk melihat detailnya.
            </p>
          </header>

          {/* Interactive Gallery */}
          <div className="px-2 sm:px-0">
            <InteractiveGallery items={gallery} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
