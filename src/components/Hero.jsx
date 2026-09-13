import { Link } from 'react-router-dom';
import { BookOpen, HandHeart } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export default function Hero() {
  const { content } = useContent();
  const { hero } = content;

  return (
    <section className="relative flex items-center justify-center min-h-[85vh] lg:min-h-screen overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={hero.backgroundImage}
          alt="Foto Background"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/30 via-stone-900/60 to-stone-900/90" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center pt-20 pb-16">
        <div className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium text-emerald-100 bg-emerald-900/40 backdrop-blur-md mb-8 border border-emerald-500/30 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-pulse"></span>
          {hero.tagline}
        </div>
        
        <h1 className="text-4xl font-serif text-white tracking-tight md:text-6xl lg:text-7xl mb-6 drop-shadow-md">
          Mengenang <br className="hidden sm:block"/> 
          <span className="text-emerald-300 font-medium italic">{hero.name}</span>
        </h1>
        
        <div className="inline-block px-6 py-2 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-stone-200 text-sm md:text-base font-medium shadow-xl mb-8">
          Lahir: {hero.birthDate} &nbsp;&nbsp;|&nbsp;&nbsp; Wafat: {hero.deathDate}
        </div>

        <p className="mt-2 text-lg md:text-xl text-stone-300 leading-relaxed max-w-2xl mx-auto drop-shadow-sm font-light">
          {hero.description}
        </p>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
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
