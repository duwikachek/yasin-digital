import { Link } from 'react-router-dom';
import { BookOpen, HandHeart } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export default function Hero() {
  const { content } = useContent();
  const { hero } = content;

  // Fallbacks for person1 (Papah) & person2 (Ibu)
  const person1 = hero.person1 || {
    name: hero.name || 'alm. Subiyantoro',
    birthDate: hero.birthDate || '-',
    deathDate: hero.deathDate || '-'
  };
  const person2 = hero.person2 || {
    name: 'almah. Nama Ibu',
    birthDate: '-',
    deathDate: '-'
  };

  return (
    <section className="relative flex flex-col justify-end min-h-[90vh] lg:min-h-screen overflow-hidden pb-12 pt-32">
      <div className="absolute inset-0 z-0">
        <img
          src={hero.bgImage || hero.backgroundImage}
          alt="Foto Background"
          className="w-full h-full object-cover object-[center_20%]"
        />
        {/* Soft gradient from top to dark overlay at bottom so photo faces are 100% visible */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/25 via-50% to-stone-950/95" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium text-emerald-100 bg-emerald-950/60 backdrop-blur-md mb-4 border border-emerald-400/30 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-pulse"></span>
          {hero.tagline}
        </div>
        
        <h1 className="text-2xl font-serif text-white tracking-wide md:text-4xl lg:text-5xl mb-6 drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]">
          Mengenang
        </h1>

        {/* 2 Nama (Bapak & Mamah) — Positioned at Bottom */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-3xl mx-auto mb-6">
          {/* Card Bapak */}
          <div className="bg-stone-900/50 backdrop-blur-md border border-white/15 hover:border-emerald-400/50 hover:bg-stone-900/70 transition-all duration-300 rounded-2xl md:rounded-3xl p-4 md:p-5 shadow-2xl text-center">
            <span className="text-[11px] md:text-xs uppercase tracking-widest text-emerald-300 font-semibold mb-1 block drop-shadow-md">Almarhum (Bapak)</span>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-serif text-white font-medium italic mb-2.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              {person1.name}
            </h2>
            <div className="inline-block px-3.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-stone-200 text-xs font-medium drop-shadow-md">
              Lahir: {person1.birthDate} &nbsp;|&nbsp; Wafat: {person1.deathDate}
            </div>
          </div>

          {/* Card Mamah */}
          <div className="bg-stone-900/50 backdrop-blur-md border border-white/15 hover:border-emerald-400/50 hover:bg-stone-900/70 transition-all duration-300 rounded-2xl md:rounded-3xl p-4 md:p-5 shadow-2xl text-center">
            <span className="text-[11px] md:text-xs uppercase tracking-widest text-emerald-300 font-semibold mb-1 block drop-shadow-md">Almarhumah (Mamah)</span>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-serif text-white font-medium italic mb-2.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              {person2.name}
            </h2>
            <div className="inline-block px-3.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-stone-200 text-xs font-medium drop-shadow-md">
              Lahir: {person2.birthDate} &nbsp;|&nbsp; Wafat: {person2.deathDate}
            </div>
          </div>
        </div>

        <p className="mt-1 text-sm md:text-base text-stone-300 leading-relaxed max-w-2xl mx-auto drop-shadow-md font-light">
          {hero.description}
        </p>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/yasin"
            className="w-full sm:w-auto flex items-center justify-center rounded-full bg-emerald-600 px-7 py-3 text-sm md:text-base font-medium text-white shadow-[0_0_20px_rgba(5,150,105,0.4)] hover:bg-emerald-500 hover:scale-105 transition-all duration-300"
          >
            <BookOpen className="w-4 h-4 md:w-5 md:h-5 mr-2.5" />
            Baca Yasin
          </Link>
          <Link
            to="/tahlil"
            className="w-full sm:w-auto flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-7 py-3 text-sm md:text-base font-medium text-white shadow-lg hover:bg-white/20 hover:scale-105 transition-all duration-300"
          >
            <HandHeart className="w-4 h-4 md:w-5 md:h-5 mr-2.5" />
            Doa Tahlil
          </Link>
        </div>
      </div>
    </section>
  );
}
