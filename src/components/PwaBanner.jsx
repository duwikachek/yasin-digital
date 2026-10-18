import { useState, useEffect } from 'react';
import { WifiOff, Download, X, Smartphone } from 'lucide-react';

export default function PwaBanner() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [installPrompt, setInstallPrompt] = useState(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [isInstalled, setIsInstalled] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
    }
    return false;
  });

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Capture beforeinstallprompt for Android & desktop Chrome/Edge
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
      // Only show if user hasn't dismissed it in this session
      const dismissed = sessionStorage.getItem('pwa_banner_dismissed');
      if (!dismissed) {
        setShowInstallBanner(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setShowInstallBanner(false);
      setInstallPrompt(null);
    });

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowInstallBanner(false);
    }
    setInstallPrompt(null);
  };

  const dismissInstallBanner = () => {
    setShowInstallBanner(false);
    sessionStorage.setItem('pwa_banner_dismissed', 'true');
  };

  return (
    <>
      {/* 1. Offline Mode Alert Badge (Shows when user loses internet) */}
      {isOffline && (
        <div className="bg-amber-600 text-white px-4 py-2 text-xs sm:text-sm font-medium flex items-center justify-center space-x-2 shadow-md sticky top-0 z-50 animate-fadeIn">
          <WifiOff className="w-4 h-4 shrink-0" />
          <span>Mode Offline Aktif — Semua bacaan Yasin, Tahlil, dan Tasbih tetap siap dibaca tanpa kuota.</span>
        </div>
      )}

      {/* 2. Install to Home Screen Banner (Shows when app is installable and not yet installed) */}
      {showInstallBanner && !isInstalled && (
        <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 bg-stone-900/95 text-white dark:bg-stone-900/95 backdrop-blur-md p-4 rounded-2xl border border-emerald-500/30 shadow-2xl animate-slideUp">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600/30 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-stone-100">Pasang Aplikasi Yasin</h4>
                <p className="text-xs text-stone-400 mt-0.5">
                  Tambahkan ke layar utama HP agar bisa dibuka kapan saja 100% offline tanpa internet.
                </p>
              </div>
            </div>
            <button 
              onClick={dismissInstallBanner}
              className="text-stone-400 hover:text-stone-200 p-1 rounded-lg transition-colors"
              title="Tutup"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="mt-3 flex items-center justify-end space-x-2">
            <button
              onClick={dismissInstallBanner}
              className="text-xs text-stone-400 hover:text-stone-200 px-3 py-1.5 rounded-lg"
            >
              Nanti Saja
            </button>
            <button
              onClick={handleInstallClick}
              className="inline-flex items-center space-x-1.5 text-xs bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-4 py-1.5 rounded-xl shadow-xs transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Pasang Sekarang</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
