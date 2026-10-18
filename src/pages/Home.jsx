import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import FAQAccordion from '../components/FAQAccordion';
import Footer from '../components/Footer';
import InteractiveGallery from '../components/ui/interactive-gallery';
import { useContent } from '../context/content-context';
import { Link } from 'react-router-dom';
import { BookOpen, BookText, HandHeart } from 'lucide-react';

export default function Home() {
  const { content } = useContent();
  const { gallery, intro } = content;

  return (
    <div className="flex min-h-screen flex-col bg-stone-50 dark:bg-stone-950 transition-colors duration-300 overflow-hidden">
      <Navigation />
      <main className="flex-grow relative">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-100 dark:bg-emerald-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
          <div className="absolute top-40 -left-40 w-96 h-96 bg-stone-200 dark:bg-stone-800/40 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-40 left-20 w-96 h-96 bg-emerald-50 dark:bg-emerald-900/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
        </div>

        <Hero />

        {/* ── MENU DOA ── */}
        <section className="py-16 bg-gradient-to-b from-stone-50 to-white dark:from-stone-950 dark:to-stone-900">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1 rounded-full text-sm font-medium text-blue-800 dark:text-blue-300 bg-blue-100/60 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 mb-4">
                Menu Bacaan
              </span>
              <h2 className="text-3xl md:text-4xl font-serif text-stone-900 dark:text-stone-100 mb-3">
                Pilihan Bacaan
              </h2>
              <p className="text-stone-500 dark:text-stone-400 max-w-2xl mx-auto">
                Dilengkapi dengan teks Arab, Latin, dan Terjemahan
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card Yasin */}
              <Link 
                to="/yasin" 
                className="group block relative bg-white dark:bg-stone-900 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100 dark:border-stone-800 hover:border-emerald-200 dark:hover:border-emerald-800 overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-6 opacity-5 dark:opacity-[0.02] transform translate-x-2 -translate-y-2 group-hover:scale-110 group-hover:opacity-10 dark:group-hover:opacity-5 transition-all duration-500">
                  <BookOpen className="w-32 h-32 dark:text-white" />
                </div>
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4 group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300">
                    <BookOpen className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-serif font-medium text-stone-900 dark:text-stone-100 mb-2">
                    Surat Yasin
                  </h3>
                  <p className="text-sm text-stone-500 dark:text-stone-400 mb-4">
                    83 ayat lengkap dengan audio murottal
                  </p>
                  <div className="text-emerald-600 dark:text-emerald-400 font-medium text-sm flex items-center group-hover:text-emerald-700 dark:group-hover:text-emerald-300">
                    Baca Sekarang <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </Link>

              {/* Card Tahlil */}
              <Link 
                to="/tahlil" 
                className="group block relative bg-white dark:bg-stone-900 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-600 overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-6 opacity-5 dark:opacity-[0.02] transform translate-x-2 -translate-y-2 group-hover:scale-110 group-hover:opacity-10 dark:group-hover:opacity-5 transition-all duration-500">
                  <BookText className="w-32 h-32 dark:text-white" />
                </div>
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-stone-100 dark:bg-stone-800 rounded-xl flex items-center justify-center text-stone-600 dark:text-stone-400 mb-4 group-hover:bg-stone-800 group-hover:text-white dark:group-hover:bg-stone-700 transition-colors duration-300">
                    <BookText className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-serif font-medium text-stone-900 dark:text-stone-100 mb-2">
                    Doa Tahlil
                  </h3>
                  <p className="text-sm text-stone-500 dark:text-stone-400 mb-4">
                    Rangkaian dzikir dan doa lengkap
                  </p>
                  <div className="text-stone-700 dark:text-stone-300 font-medium text-sm flex items-center group-hover:text-stone-900 dark:group-hover:text-stone-100">
                    Baca Sekarang <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </Link>

              {/* Card Doa */}
              <Link 
                to="/doa" 
                className="group block relative bg-white dark:bg-stone-900 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100 dark:border-stone-800 hover:border-blue-200 dark:hover:border-blue-800 overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-6 opacity-5 dark:opacity-[0.02] transform translate-x-2 -translate-y-2 group-hover:scale-110 group-hover:opacity-10 dark:group-hover:opacity-5 transition-all duration-500">
                  <HandHeart className="w-32 h-32 dark:text-white" />
                </div>
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
                    <HandHeart className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-serif font-medium text-stone-900 dark:text-stone-100 mb-2">
                    Doa-Doa
                  </h3>
                  <p className="text-sm text-stone-500 dark:text-stone-400 mb-4">
                    57 doa pilihan dalam 8 kategori
                  </p>
                  <div className="text-blue-600 dark:text-blue-400 font-medium text-sm flex items-center group-hover:text-blue-700 dark:group-hover:text-blue-300">
                    Lihat Doa <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* ── GALERI KENANGAN ── */}
        <section className="py-16 overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="inline-block px-4 py-1 rounded-full text-sm font-medium text-emerald-800 dark:text-emerald-300 bg-emerald-100/60 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 mb-4">
                Galeri
              </span>
              <h2 className="text-3xl font-serif text-stone-900 dark:text-stone-100 mb-3">
                Kenangan Bersama Beliau
              </h2>
              <p className="text-stone-500 dark:text-stone-400 max-w-xl mx-auto">
                Klik pada salah satu panel untuk melihat keterangannya.
              </p>
            </div>
          </div>
          <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <InteractiveGallery items={gallery} />
          </div>
        </section>
        
        {/* Kata Pengantar */}
        <section className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <div className="bg-white/60 dark:bg-stone-900/60 backdrop-blur-xl border border-white dark:border-stone-800 shadow-2xl dark:shadow-black/50 rounded-3xl p-8 sm:p-12 relative overflow-hidden transition-colors duration-300">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-emerald-400 dark:via-emerald-500 to-transparent"></div>
            
            <h2 className="text-3xl font-serif text-stone-900 dark:text-stone-100 mb-8 font-medium">{intro.title}</h2>
            
            <div className="text-stone-600 dark:text-stone-300 leading-loose text-lg font-serif space-y-4">
              {((intro.paragraphs && intro.paragraphs.length > 0)
                ? intro.paragraphs
                : [intro.p1, intro.p2, intro.p3].filter(Boolean)
              ).map((para, i) => (
                <p key={i}>{i === 0 && para ? <><span className="text-2xl text-emerald-700 dark:text-emerald-400">{para[0]}</span>{para.slice(1)}</> : para}</p>
              ))}
            </div>

            <div className="mt-10 flex justify-center">
              <div className="w-16 h-px bg-stone-300 dark:bg-stone-700"></div>
            </div>
          </div>
        </section>

        <FAQAccordion />
      </main>
      <Footer />
    </div>
  );
}

