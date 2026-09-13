import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { RotateCcw } from 'lucide-react';

export default function InteractiveFeatures() {
  const [count, setCount] = useState(() => {
    const saved = localStorage.getItem('tasbihCount');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [isAnimating, setIsAnimating] = useState(false);

  // Save to local storage on change
  useEffect(() => {
    localStorage.setItem('tasbihCount', count.toString());
  }, [count]);

  const increment = () => {
    if ('vibrate' in navigator) navigator.vibrate(50);
    setCount(prev => prev + 1);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 200);
  };
  
  const reset = () => {
    if ('vibrate' in navigator) navigator.vibrate([50, 50, 50]);
    setCount(0);
  };

  return (
    <div className="flex min-h-screen flex-col bg-stone-50 dark:bg-stone-950 transition-colors duration-300 overflow-hidden">
      <Navigation />
      <main className="flex-grow relative flex items-center justify-center py-12">
        {/* Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-100/50 dark:bg-emerald-900/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>

        <div className="mx-auto max-w-lg px-4 w-full sm:px-6 lg:px-8 text-center z-10">
          <header className="mb-12">
            <h1 className="text-4xl font-serif tracking-tight text-stone-900 dark:text-stone-100 mb-4">Tasbih Digital</h1>
            <p className="text-stone-600 dark:text-stone-400">Tekan area lingkaran untuk menghitung dzikir Anda. Hitungan tersimpan otomatis.</p>
          </header>

          <div className="flex flex-col items-center gap-12">
            <div className="relative">
              {/* Outer decorative ring */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-100 dark:from-emerald-900/40 to-stone-100 dark:to-stone-900/50 rounded-full blur opacity-70"></div>
              
              <button
                onClick={increment}
                className={`group relative flex h-72 w-72 items-center justify-center rounded-full bg-white dark:bg-stone-900 shadow-2xl dark:shadow-black/50 border-4 border-white/50 dark:border-stone-800/80 backdrop-blur-xl transition-all duration-200 focus:outline-none ${isAnimating ? 'scale-95 shadow-inner' : 'hover:scale-105'}`}
                aria-label="Tambah Hitungan Tasbih"
              >
                {/* Inner shadow layer */}
                <div className="absolute inset-2 rounded-full shadow-[inset_0_4px_20px_rgba(0,0,0,0.05)] border border-stone-50 dark:border-stone-800 pointer-events-none"></div>
                
                <span className="text-7xl font-light text-emerald-900 dark:text-emerald-400 tabular-nums font-serif select-none">
                  {count}
                </span>
                
                <div className="absolute inset-0 rounded-full border-2 border-transparent group-focus-visible:border-emerald-400 dark:group-focus-visible:border-emerald-600 pointer-events-none" />
                
                {/* Ripple effect overlay */}
                {isAnimating && (
                  <div className="absolute inset-0 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 animate-ping pointer-events-none"></div>
                )}
              </button>
            </div>

            <button
              onClick={reset}
              className="group flex items-center px-6 py-3 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 rounded-full shadow-sm hover:shadow-md hover:bg-stone-50 dark:hover:bg-stone-800 hover:text-stone-900 dark:hover:text-stone-200 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <RotateCcw className="w-4 h-4 mr-2 group-hover:-rotate-180 transition-transform duration-500" />
              Reset Hitungan
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
