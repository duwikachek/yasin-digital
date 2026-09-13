import React from "react";
import { LayoutGrid } from "../components/ui/layout-grid";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const SkeletonOne = () => (
  <div>
    <p className="font-bold md:text-3xl text-xl text-white">Momen Kebersamaan</p>
    <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
      Kenangan indah bersama alm. SUBIYANTORO dalam momen kebersamaan bersama keluarga yang selalu terpatri di hati.
    </p>
  </div>
);

const SkeletonTwo = () => (
  <div>
    <p className="font-bold md:text-3xl text-xl text-white">Senyuman Beliau</p>
    <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
      Setiap senyuman adalah kenangan terindah yang selalu kami ingat dan rindu setiap harinya.
    </p>
  </div>
);

const SkeletonThree = () => (
  <div>
    <p className="font-bold md:text-3xl text-xl text-white">Warisan Kebajikan</p>
    <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
      Beliau meninggalkan warisan kebajikan, cinta, dan kasih sayang yang akan selalu kami kenang.
    </p>
  </div>
);

const SkeletonFour = () => (
  <div>
    <p className="font-bold md:text-3xl text-xl text-white">Kenangan Tak Terlupakan</p>
    <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
      Momen-momen bersama keluarga yang tak ternilai dan akan selalu hidup dalam hati kami semua.
    </p>
  </div>
);

const cards = [
  {
    id: 1,
    content: <SkeletonOne />,
    className: "md:col-span-2",
    thumbnail:
      "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: 2,
    content: <SkeletonTwo />,
    className: "col-span-1",
    thumbnail:
      "https://images.unsplash.com/photo-1511895426328-dc8714191011?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    content: <SkeletonThree />,
    className: "col-span-1",
    thumbnail:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 4,
    content: <SkeletonFour />,
    className: "md:col-span-2",
    thumbnail:
      "https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?auto=format&fit=crop&q=80&w=1200",
  },
];

export default function Galeri() {
  return (
    <div className="flex min-h-screen flex-col bg-stone-50 dark:bg-stone-950 transition-colors duration-300">
      <Navigation />
      <main className="flex-grow py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <header className="text-center mb-12 mt-4">
            <div className="inline-block p-4 rounded-full bg-emerald-50 dark:bg-emerald-950 mb-4 border border-emerald-100 dark:border-emerald-900/50">
              <span className="text-4xl">🖼️</span>
            </div>
            <h1 className="text-4xl font-serif tracking-tight text-stone-900 dark:text-stone-100 sm:text-5xl mb-4">
              Galeri Kenangan
            </h1>
            <p className="text-lg text-stone-600 dark:text-stone-400 max-w-xl mx-auto">
              Kumpulan momen dan kenangan bersama alm. SUBIYANTORO. Klik pada gambar untuk melihat keterangannya.
            </p>
          </header>
          <div className="min-h-[600px]">
            <LayoutGrid cards={cards} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
