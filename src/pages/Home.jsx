import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import FAQAccordion from '../components/FAQAccordion';
import Footer from '../components/Footer';
import InteractiveGallery from '../components/ui/interactive-gallery';
import { useContent } from '../context/ContentContext';

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

