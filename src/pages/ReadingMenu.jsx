import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { BookOpen, BookText } from 'lucide-react';

export default function ReadingMenu() {
  return (
    <div className="flex min-h-screen flex-col bg-stone-50 dark:bg-stone-950 transition-colors duration-300">
      <Navigation />
      <main className="flex-grow py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <header className="text-center mb-16">
            <h1 className="text-4xl font-serif tracking-tight text-stone-900 dark:text-stone-100 sm:text-5xl mb-4">Menu Bacaan</h1>
            <p className="text-lg text-stone-600 dark:text-stone-400 max-w-xl mx-auto">Pilih menu di bawah untuk mulai membaca. Dilengkapi dengan teks Arab, Latin, dan Terjemahan.</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Card Yasin */}
            <Link to="/yasin" className="group block relative bg-white dark:bg-stone-900 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100 dark:border-stone-800 hover:border-emerald-200 dark:hover:border-emerald-800 overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 dark:opacity-[0.02] transform translate-x-4 -translate-y-4 group-hover:scale-110 group-hover:opacity-10 dark:group-hover:opacity-5 transition-all duration-500">
                <BookOpen className="w-48 h-48 dark:text-white" />
              </div>
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6 group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300">
                  <BookOpen className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-serif font-medium text-stone-900 dark:text-stone-100 mb-2">Surat Yasin</h2>
                <p className="text-stone-500 dark:text-stone-400 mb-6 flex-grow">Surat ke-36 dalam Al-Qur'an, terdiri dari 83 ayat. Sering dibaca untuk memohon ampunan dan keberkahan.</p>
                <div className="text-emerald-600 dark:text-emerald-400 font-medium flex items-center group-hover:text-emerald-700 dark:group-hover:text-emerald-300">
                  Mulai Membaca <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </Link>

            {/* Card Tahlil */}
            <Link to="/tahlil" className="group block relative bg-white dark:bg-stone-900 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-600 overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 dark:opacity-[0.02] transform translate-x-4 -translate-y-4 group-hover:scale-110 group-hover:opacity-10 dark:group-hover:opacity-5 transition-all duration-500">
                <BookText className="w-48 h-48 dark:text-white" />
              </div>
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-16 h-16 bg-stone-100 dark:bg-stone-800 rounded-2xl flex items-center justify-center text-stone-600 dark:text-stone-400 mb-6 group-hover:bg-stone-800 group-hover:text-white dark:group-hover:bg-stone-700 transition-colors duration-300">
                  <BookText className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-serif font-medium text-stone-900 dark:text-stone-100 mb-2">Doa Tahlil</h2>
                <p className="text-stone-500 dark:text-stone-400 mb-6 flex-grow">Susunan bacaan dzikir dan doa untuk mendoakan almarhum/almarhumah agar mendapat tempat terbaik.</p>
                <div className="text-stone-700 dark:text-stone-300 font-medium flex items-center group-hover:text-stone-900 dark:group-hover:text-stone-100">
                  Mulai Membaca <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
