import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import tahlilData from '../data/tahlil.json';
import { useState } from 'react';
import { Settings2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Tahlil() {
  const [fontSize, setFontSize] = useState(32); // px

  const increaseFont = () => setFontSize(prev => Math.min(prev + 4, 56));
  const decreaseFont = () => setFontSize(prev => Math.max(prev - 4, 20));

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
              <span className="text-4xl">🤲</span>
            </div>
            <h1 className="text-4xl font-serif tracking-tight text-stone-900 dark:text-stone-100 sm:text-5xl mb-4">Doa Tahlil</h1>
            <p className="text-lg text-emerald-800 dark:text-emerald-400 font-medium bg-emerald-100/50 dark:bg-emerald-900/30 inline-block px-6 py-1 rounded-full">Susunan Bacaan Tahlil Lengkap</p>
          </header>

          <div className="space-y-12">
            {tahlilData.map((section, index) => (
              <article key={section.id} className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-10 shadow-sm border border-stone-100 dark:border-stone-800 relative transition-colors duration-300">
                <div className="flex items-center mb-8 border-b border-stone-100 dark:border-stone-800 pb-4">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400 font-semibold mr-4 shrink-0">
                    {index + 1}
                  </span>
                  <h2 className="text-xl font-medium text-stone-800 dark:text-stone-200">{section.title}</h2>
                </div>
                
                <p 
                  className="arabic-text text-right text-stone-900 dark:text-stone-100 mb-8 leading-loose tracking-wide"
                  style={{ fontSize: `${fontSize}px`, lineHeight: 2 }}
                >
                  {section.arabic}
                </p>
                <div className="pl-4 border-l-4 border-emerald-200 dark:border-emerald-800/60">
                  <p className="text-emerald-800 dark:text-emerald-400 font-medium mb-2 italic">
                    {section.latin}
                  </p>
                  <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
                    {section.translation}
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
