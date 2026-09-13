import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import yasinData from '../data/yasin.json';
import { useState } from 'react';
import { Settings2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SurahYasin() {
  const [fontSize, setFontSize] = useState(36); // px

  const increaseFont = () => setFontSize(prev => Math.min(prev + 4, 64));
  const decreaseFont = () => setFontSize(prev => Math.max(prev - 4, 24));

  // equran.id API response structure
  // data: { ayat: [ { ar: "", tr: "", idn: "", nomor: 1 } ] }
  const verses = yasinData.data?.ayat || [];

  return (
    <div className="flex min-h-screen flex-col bg-stone-50 dark:bg-stone-950 transition-colors duration-300">
      <Navigation />
      
      {/* Sticky Toolbar */}
      <div className="sticky top-16 z-20 bg-stone-50/90 dark:bg-stone-950/90 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 transition-colors duration-300">
        <div className="mx-auto max-w-4xl px-4 py-3 flex items-center justify-between">
          <Link to="/bacaan" className="flex items-center text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="hidden sm:inline">Kembali</span>
          </Link>
          <div className="flex items-center space-x-4">
            <div className="flex items-center bg-stone-100 dark:bg-stone-900 rounded-full px-3 py-1 shadow-inner border border-stone-200 dark:border-stone-800">
              <Settings2 className="w-4 h-4 text-stone-500 dark:text-stone-400 mr-3" />
              <button onClick={decreaseFont} className="text-xl px-2 font-medium text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200">A-</button>
              <div className="w-px h-4 bg-stone-300 dark:bg-stone-700 mx-2"></div>
              <button onClick={increaseFont} className="text-xl px-2 font-medium text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200">A+</button>
            </div>
          </div>
        </div>
      </div>

      <main className="flex-grow py-8">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <header className="text-center mb-16 mt-8">
            <div className="inline-block p-4 rounded-full bg-emerald-50 dark:bg-emerald-950 mb-4 border border-emerald-100 dark:border-emerald-900/50">
              <span className="text-4xl">📖</span>
            </div>
            <h1 className="text-4xl font-serif tracking-tight text-stone-900 dark:text-stone-100 sm:text-5xl mb-4">Surat Yasin</h1>
            <p className="text-lg text-emerald-800 dark:text-emerald-400 font-medium bg-emerald-100/50 dark:bg-emerald-900/30 inline-block px-4 py-1 rounded-full">Surat ke-36 • 83 Ayat</p>
          </header>

          <div className="text-center mb-16">
            <p className="arabic-text text-4xl text-stone-900 dark:text-stone-100 mb-4" style={{ fontSize: `${fontSize + 8}px` }}>بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم</p>
            <p className="text-stone-600 dark:text-stone-400">Bismillaahirrohmaanirrohiim</p>
            <p className="text-stone-500 dark:text-stone-500 text-sm mt-1">Dengan menyebut nama Allah Yang Maha Pengasih lagi Maha Penyayang</p>
          </div>

          <div className="space-y-16">
            {verses.map((verse) => (
              <article key={verse.nomorAyat} className="relative bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-10 shadow-sm border border-stone-100 dark:border-stone-800 hover:shadow-md transition-shadow group">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center border-4 border-stone-50 dark:border-stone-950 text-emerald-800 dark:text-emerald-400 font-bold shadow-sm">
                  {verse.nomorAyat}
                </div>
                
                <p 
                  className="arabic-text text-right text-stone-900 dark:text-stone-100 mb-8 leading-loose tracking-wide mt-4"
                  style={{ fontSize: `${fontSize}px`, lineHeight: 2 }}
                >
                  {verse.teksArab}
                </p>
                <div className="pl-4 border-l-4 border-emerald-200 dark:border-emerald-800/60">
                  <p className="text-emerald-800 dark:text-emerald-400 font-medium mb-2 italic">
                    {verse.teksLatin}
                  </p>
                  <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
                    {verse.teksIndonesia}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
