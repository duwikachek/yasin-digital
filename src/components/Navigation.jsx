import { Link } from 'react-router-dom';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from './ThemeProvider';
import { useContent } from '../context/ContentContext';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { content } = useContent();

  const siteTitle = content?.hero?.siteTitle || 'Yasin Digital';

  const links = [
    { name: 'Halaman Depan', path: '/' },
    { name: 'Menu Bacaan', path: '/bacaan' },
    { name: 'Fitur Interaktif', path: '/interaktif' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 w-full border-b border-stone-200 dark:border-stone-800 bg-stone-50/90 dark:bg-stone-950/90 backdrop-blur-md transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex-shrink-0">
              <Link to="/" className="text-lg font-medium tracking-tight text-stone-900 dark:text-stone-100">
                {siteTitle}
              </Link>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-8">
                {links.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="text-sm text-stone-600 dark:text-stone-400 transition-colors hover:text-stone-950 dark:hover:text-stone-100"
                  >
                    {link.name}
                  </Link>
                ))}
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full text-stone-500 hover:bg-stone-200 dark:text-stone-400 dark:hover:bg-stone-800 transition-colors"
                  aria-label="Toggle Dark Mode"
                >
                  {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
              </div>
            </div>
            
            <div className="-mr-2 flex items-center md:hidden space-x-2">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-stone-500 hover:bg-stone-200 dark:text-stone-400 dark:hover:bg-stone-800 transition-colors"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="inline-flex items-center justify-center rounded-md p-2 text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-stone-500 dark:hover:text-stone-300 focus:outline-none"
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden bg-stone-50 dark:bg-stone-950 border-b border-stone-200 dark:border-stone-800">
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
              {links.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="block rounded-md px-3 py-2 text-base font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-900 hover:text-stone-900 dark:hover:text-stone-100"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
      {/* Spacer agar konten di bawahnya tidak tertutup header */}
      <div className="h-16" />
    </>
  );
}
