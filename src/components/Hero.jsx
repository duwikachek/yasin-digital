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
    <section className="relative flex items-center justify-center min-h-[85vh] lg:min-h-screen overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={hero.backgroundImage}
          alt="Foto Background"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/40 via-stone-900/70 to-stone-900/95" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center pt-16 pb-16">
        <div className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium text-emerald-100 bg-emerald-900/40 backdrop-blur-md mb-6 border border-emerald-500/30 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-pulse"></span>
          {hero.tagline}
        </div>
        
        <h1 className="text-3xl font-serif text-white tracking-tight md:text-5xl lg:text-6xl mb-8 drop-shadow-md">
          Mengenang
        </h1>

        {/* 2 Nama (Papah & Ibu) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-8">
          {/* Card Papah */}
          <div className="bg-stone-900/60 backdrop-blur-md border border-emerald-500/30 rounded-3xl p-6 shadow-2xl text-center">
            <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold mb-1 block">Almarhum (Papah)</span>
            <h2 className="text-2xl md:text-3xl font-serif text-emerald-200 font-medium italic mb-3">
              {person1.name}
            </h2>
            <div className="inline-block px-4 py-1.5 rounded-full bg-black/40 border border-white/10 text-stone-300 text-xs sm:text-sm font-medium">
              Lahir: {person1.birthDate} &nbsp;|&nbsp; Wafat: {person1.deathDate}
            </div>
          </div>

          {/* Card Ibu */}
          <div className="bg-stone-900/60 backdrop-blur-md border border-emerald-500/30 rounded-3xl p-6 shadow-2xl text-center">
            <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold mb-1 block">Almarhumah (Ibu)</span>
            <h2 className="text-2xl md:text-3xl font-serif text-emerald-200 font-medium italic mb-3">
              {person2.name}
            </h2>
            <div className="inline-block px-4 py-1.5 rounded-full bg-black/40 border border-white/10 text-stone-300 text-xs sm:text-sm font-medium">
              Lahir: {person2.birthDate} &nbsp;|&nbsp; Wafat: {person2.deathDate}
            </div>
          </div>
        </div>

        <p className="mt-2 text-base md:text-lg text-stone-300 leading-relaxed max-w-2xl mx-auto drop-shadow-sm font-light">
          {hero.description}
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/yasin"
            className="w-full sm:w-auto flex items-center justify-center rounded-full bg-emerald-600 px-8 py-4 text-base font-medium text-white shadow-[0_0_20px_rgba(5,150,105,0.4)] hover:bg-emerald-500 hover:scale-105 transition-all duration-300"
          >
            <BookOpen className="w-5 h-5 mr-3" />
            Baca Yasin
          </Link>
          <Link
            to="/tahlil"
            className="w-full sm:w-auto flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-8 py-4 text-base font-medium text-white shadow-lg hover:bg-white/20 hover:scale-105 transition-all duration-300"
          >
            <HandHeart className="w-5 h-5 mr-3" />
            Doa Tahlil
          </Link>
        </div>
      </div>
    </section>
  );
}
