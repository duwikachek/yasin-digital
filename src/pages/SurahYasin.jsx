import { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  Settings2, 
  Play, 
  Pause, 
  Copy, 
  Check, 
  Bookmark, 
  RotateCcw,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import yasinData from '../data/yasin.json';

export default function SurahYasin() {
  const [fontSize, setFontSize] = useState(() => {
    const saved = localStorage.getItem('yasin_font_size');
    return saved ? parseInt(saved, 10) : 34;
  });
  
  // mushaf type: 'kemenag' (Standar Indonesia) or 'utsmani' (Madinah)
  const [mushafType, setMushafType] = useState(() => {
    return localStorage.getItem('yasin_mushaf_type') || 'kemenag';
  });

  const [showLatin, setShowLatin] = useState(() => {
    const saved = localStorage.getItem('yasin_show_latin');
    return saved !== null ? saved === 'true' : true;
  });

  const [showTranslation, setShowTranslation] = useState(() => {
    const saved = localStorage.getItem('yasin_show_trans');
    return saved !== null ? saved === 'true' : true;
  });

  const [lastRead, setLastRead] = useState(() => {
    const saved = localStorage.getItem('yasin_last_read');
    return saved ? parseInt(saved, 10) : null;
  });

  const [copiedAyat, setCopiedAyat] = useState(null);
  const [playingAyat, setPlayingAyat] = useState(null);
  const [isFullPlaying, setIsFullPlaying] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const audioRef = useRef(null);
  const verseRefs = useRef({});

  const verses = yasinData.data?.ayat || [];
  const fullAudioUrl = yasinData.data?.audioFull?.['05'] || 'https://cdn.equran.id/audio-full/Misyari-Rasyid-Al-Afasi/036.mp3';

  // Save preferences
  useEffect(() => {
    localStorage.setItem('yasin_font_size', fontSize.toString());
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem('yasin_mushaf_type', mushafType);
  }, [mushafType]);

  useEffect(() => {
    localStorage.setItem('yasin_show_latin', showLatin.toString());
  }, [showLatin]);

  useEffect(() => {
    localStorage.setItem('yasin_show_trans', showTranslation.toString());
  }, [showTranslation]);

  const increaseFont = () => setFontSize(prev => Math.min(prev + 2, 54));
  const decreaseFont = () => setFontSize(prev => Math.max(prev - 2, 22));
  const resetFont = () => setFontSize(34);

  // Jump to specific verse
  const scrollToVerse = (verseNum) => {
    const el = verseRefs.current[verseNum];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setLastRead(verseNum);
      localStorage.setItem('yasin_last_read', verseNum.toString());
    }
  };

  // Copy verse text
  const handleCopy = (verse) => {
    const arabText = mushafType === 'utsmani' ? (verse.teksArabUtsmani || verse.teksArab) : (verse.teksArabKemenag || verse.teksArab);
    const textToCopy = `Surat Yasin Ayat ${verse.nomorAyat}\n\n${arabText}\n\n${verse.teksLatin}\n\n"${verse.teksIndonesia}"`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedAyat(verse.nomorAyat);
    setTimeout(() => setCopiedAyat(null), 2000);
  };

  // Play audio for individual verse
  const playVerseAudio = (verseNum) => {
    if (playingAyat === verseNum) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setPlayingAyat(null);
      return;
    }

    if (isFullPlaying && audioRef.current) {
      audioRef.current.pause();
      setIsFullPlaying(false);
    }

    const verse = verses.find(v => v.nomorAyat === verseNum);
    const audioUrl = verse?.audio?.['05'] || verse?.audio?.['01'];
    if (audioUrl) {
      if (audioRef.current) {
        audioRef.current.src = audioUrl;
        audioRef.current.play();
        setPlayingAyat(verseNum);
      }
    }
  };

  // Play full surah audio
  const toggleFullAudio = () => {
    if (!audioRef.current) return;

    if (isFullPlaying) {
      audioRef.current.pause();
      setIsFullPlaying(false);
      setPlayingAyat(null);
    } else {
      if (playingAyat) setPlayingAyat(null);
      audioRef.current.src = fullAudioUrl;
      audioRef.current.play();
      setIsFullPlaying(true);
    }
  };

  const handleAudioEnded = () => {
    if (playingAyat) {
      // Auto-advance to next verse if available
      const nextNum = playingAyat + 1;
      if (nextNum <= verses.length) {
        playVerseAudio(nextNum);
        scrollToVerse(nextNum);
      } else {
        setPlayingAyat(null);
      }
    } else {
      setIsFullPlaying(false);
    }
  };

  // Key verses quick navigator
  const keyVerses = [
    { num: 1, label: 'Awal Surat' },
    { num: 12, label: 'Ayat 12 (Lauhul Mahfuz)' },
    { num: 36, label: 'Ayat 36 (Pasang-pasangan)' },
    { num: 58, label: 'Ayat 58 (Salamun Qaulan)' },
    { num: 82, label: 'Ayat 82 (Kun Fayakun)' },
    { num: 83, label: 'Akhir Surat' }
  ];

  return (
    <div className="flex min-h-screen flex-col bg-stone-50 dark:bg-stone-950 transition-colors duration-300">
      <Navigation />
      
      {/* Hidden audio element for audio playback */}
      <audio 
        ref={audioRef} 
        onEnded={handleAudioEnded}
        onError={() => {
          setPlayingAyat(null);
          setIsFullPlaying(false);
        }}
      />

      {/* Sticky Interactive Toolbar */}
      <div className="sticky top-16 z-30 bg-stone-50/95 dark:bg-stone-950/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 shadow-xs transition-colors duration-300">
        <div className="mx-auto max-w-4xl px-4 py-2.5 flex flex-wrap items-center justify-between gap-2">
          {/* Back link & Mushaf Switcher */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <Link 
              to="/bacaan" 
              className="flex items-center text-stone-600 dark:text-stone-400 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors py-1 px-2 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-900"
              title="Kembali ke Daftar Bacaan"
            >
              <ArrowLeft className="w-4 h-4 mr-1.5" />
              <span className="text-sm font-medium hidden sm:inline">Kembali</span>
            </Link>

            {/* Mushaf Selector Pill */}
            <div className="inline-flex p-0.5 rounded-full bg-stone-200/80 dark:bg-stone-900 border border-stone-300/50 dark:border-stone-800 text-xs font-medium">
              <button
                onClick={() => setMushafType('kemenag')}
                className={`px-2.5 py-1 rounded-full transition-all duration-200 ${
                  mushafType === 'kemenag'
                    ? 'bg-emerald-700 text-white shadow-xs font-semibold'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                }`}
                title="Mushaf Standar Indonesia Kemenag RI (Tanda Waqaf Lengkap)"
              >
                Standar Kemenag
              </button>
              <button
                onClick={() => setMushafType('utsmani')}
                className={`px-2.5 py-1 rounded-full transition-all duration-200 ${
                  mushafType === 'utsmani'
                    ? 'bg-emerald-700 text-white shadow-xs font-semibold'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                }`}
                title="Mushaf Rasm Utsmani Madinah (Standar Internasional)"
              >
                Rasm Utsmani
              </button>
            </div>
          </div>

          {/* Right Toolbar Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Quick jump dropdown */}
            <div className="relative">
              <select
                aria-label="Lompat ke ayat"
                value={lastRead || 1}
                onChange={(e) => scrollToVerse(parseInt(e.target.value, 10))}
                className="appearance-none text-xs bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-full pl-3 pr-7 py-1.5 text-stone-700 dark:text-stone-300 font-medium hover:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer"
              >
                <option value="" disabled>Lompat ke Ayat</option>
                {verses.map(v => (
                  <option key={v.nomorAyat} value={v.nomorAyat}>
                    Ayat {v.nomorAyat}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-stone-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Full Surah Audio Button */}
            <button
              onClick={toggleFullAudio}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                isFullPlaying
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-xs animate-pulse'
                  : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/50'
              }`}
              title={isFullPlaying ? "Jeda Audio Yasin" : "Putar Full Surat Yasin (Misyari Rasyid Al-Afasi)"}
            >
              {isFullPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Jeda Audio</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span className="hidden sm:inline">Murottal</span>
                </>
              )}
            </button>

            {/* Font Size Adjuster Pill */}
            <div className="flex items-center bg-stone-100 dark:bg-stone-900 rounded-full px-2 py-0.5 border border-stone-200 dark:border-stone-800 shadow-inner">
              <button 
                onClick={decreaseFont} 
                className="text-base px-2 py-0.5 font-bold text-stone-600 dark:text-stone-400 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
                title="Perkecil Ukuran Huruf"
              >
                A-
              </button>
              <span className="text-[11px] font-mono text-stone-500 dark:text-stone-400 px-1 select-none">
                {fontSize}
              </span>
              <button 
                onClick={increaseFont} 
                className="text-base px-2 py-0.5 font-bold text-stone-600 dark:text-stone-400 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
                title="Perbesar Ukuran Huruf"
              >
                A+
              </button>
            </div>

            {/* Settings toggles button */}
            <button
              onClick={() => setShowSettingsModal(!showSettingsModal)}
              className={`p-1.5 rounded-full border transition-colors ${
                showSettingsModal
                  ? 'bg-emerald-700 text-white border-emerald-600'
                  : 'bg-stone-100 dark:bg-stone-900 text-stone-600 dark:text-stone-400 border-stone-200 dark:border-stone-800 hover:text-stone-900 dark:hover:text-stone-100'
              }`}
              title="Pengaturan Tampilan"
            >
              <Settings2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Expandable Settings Bar */}
        {showSettingsModal && (
          <div className="border-t border-stone-200 dark:border-stone-800 bg-stone-100/90 dark:bg-stone-900/90 px-4 py-3">
            <div className="mx-auto max-w-4xl flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="flex items-center space-x-6">
                <label className="flex items-center space-x-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={showLatin}
                    onChange={(e) => setShowLatin(e.target.checked)}
                    className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                  />
                  <span className="text-stone-700 dark:text-stone-300 font-medium">Teks Latin (Transliterasi)</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={showTranslation}
                    onChange={(e) => setShowTranslation(e.target.checked)}
                    className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                  />
                  <span className="text-stone-700 dark:text-stone-300 font-medium">Terjemahan Bahasa Indonesia</span>
                </label>
              </div>

              <div className="flex items-center space-x-2 text-stone-500">
                <button
                  onClick={resetFont}
                  className="flex items-center space-x-1 hover:text-stone-800 dark:hover:text-stone-200"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset Ukuran</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <main className="flex-grow py-8">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          
          {/* Header Surat Yasin */}
          <header className="relative text-center mb-10 mt-4 overflow-hidden rounded-3xl bg-linear-to-b from-emerald-900/90 via-emerald-950 to-stone-900 text-white p-8 sm:p-12 shadow-xl border border-emerald-800/40">
            {/* Islamic subtle background decorative elements */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 mb-4 shadow-inner">
                <span className="text-3xl">📖</span>
              </div>
              <h1 className="text-4xl font-serif tracking-tight font-bold sm:text-5xl mb-2 text-emerald-100">
                Surat Yasin
              </h1>
              <p className="text-2xl font-serif text-emerald-300 mb-4" dir="rtl">
                سُوْرَةُ يٰسۤ
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm text-emerald-200">
                <span className="bg-emerald-800/60 px-3 py-1 rounded-full border border-emerald-700/50">
                  Surat ke-36
                </span>
                <span>•</span>
                <span className="bg-emerald-800/60 px-3 py-1 rounded-full border border-emerald-700/50">
                  83 Ayat
                </span>
                <span>•</span>
                <span className="bg-emerald-800/60 px-3 py-1 rounded-full border border-emerald-700/50">
                  Makkiyyah
                </span>
                <span>•</span>
                <span className="bg-emerald-700/80 text-white font-medium px-3 py-1 rounded-full shadow-xs">
                  {mushafType === 'kemenag' ? '🇮🇩 Standar Kemenag RI' : '🕌 Rasm Utsmani Madinah'}
                </span>
              </div>

              {/* Quick Verse Shortcuts */}
              <div className="mt-8 pt-6 border-t border-emerald-800/40 flex flex-wrap justify-center items-center gap-2">
                <span className="text-xs text-emerald-300/80 mr-1 flex items-center">
                  <Sparkles className="w-3 h-3 mr-1" /> Lompat Cepat:
                </span>
                {keyVerses.map(kv => (
                  <button
                    key={kv.num}
                    onClick={() => scrollToVerse(kv.num)}
                    className="text-xs bg-white/10 hover:bg-emerald-600/70 border border-white/15 px-2.5 py-1 rounded-lg text-emerald-100 transition-colors"
                  >
                    {kv.label}
                  </button>
                ))}
              </div>
            </div>
          </header>

          {/* Bismillah Opening */}
          <div className="text-center mb-12 py-8 px-4 rounded-3xl bg-linear-to-b from-stone-100/70 to-white dark:from-stone-900/50 dark:to-stone-900 border border-stone-200/60 dark:border-stone-800/60 shadow-xs">
            <p 
              className="arabic-text text-stone-900 dark:text-stone-100 mb-4 select-none" 
              style={{ fontSize: `${fontSize + 6}px`, lineHeight: 2.5 }}
              dir="rtl"
            >
              بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
            </p>
            {showLatin && (
              <p className="text-stone-600 dark:text-stone-400 font-medium text-sm sm:text-base">
                Bismillāhir-raḥmānir-raḥīm
              </p>
            )}
            {showTranslation && (
              <p className="text-stone-500 dark:text-stone-500 text-xs sm:text-sm mt-1 max-w-xl mx-auto">
                Dengan menyebut nama Allah Yang Maha Pengasih lagi Maha Penyayang
              </p>
            )}
          </div>

          {/* Verses List */}
          <div className="space-y-8 sm:space-y-10">
            {verses.map((verse) => {
              const isPlaying = playingAyat === verse.nomorAyat;
              const isMarked = lastRead === verse.nomorAyat;
              
              // Choose arabic text based on selected mushaf type
              const displayText = mushafType === 'utsmani' 
                ? (verse.teksArabUtsmani || verse.teksArab) 
                : (verse.teksArabKemenag || verse.teksArab);

              return (
                <article 
                  key={verse.nomorAyat} 
                  ref={el => verseRefs.current[verse.nomorAyat] = el}
                  className={`relative rounded-3xl p-6 sm:p-8 transition-all duration-300 ${
                    isPlaying 
                      ? 'bg-emerald-50/70 dark:bg-emerald-950/40 border-2 border-emerald-500 dark:border-emerald-500 shadow-md ring-4 ring-emerald-500/10' 
                      : isMarked
                        ? 'bg-white dark:bg-stone-900 border-2 border-emerald-300 dark:border-emerald-800 shadow-sm'
                        : 'bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-xs hover:shadow-md hover:border-stone-300 dark:hover:border-stone-700'
                  }`}
                >
                  {/* Verse Top Bar: Number badge & Action buttons */}
                  <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-100 dark:border-stone-800/80">
                    {/* Verse Number with Islamic badge */}
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100/80 dark:bg-emerald-900/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-900 dark:text-emerald-300 font-bold text-sm shadow-xs font-mono">
                        {verse.nomorAyat}
                      </div>
                      <span className="text-xs text-stone-400 dark:text-stone-500 font-medium">
                        Ayat {verse.nomorAyat}
                      </span>
                    </div>

                    {/* Action buttons (Audio, Copy, Bookmark) */}
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      {/* Play Verse Audio */}
                      <button
                        onClick={() => playVerseAudio(verse.nomorAyat)}
                        className={`p-2 rounded-xl transition-colors ${
                          isPlaying 
                            ? 'bg-emerald-600 text-white shadow-xs' 
                            : 'text-stone-500 dark:text-stone-400 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/60'
                        }`}
                        title={isPlaying ? "Jeda Audio Ayat" : `Putar Audio Ayat ${verse.nomorAyat}`}
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                      </button>

                      {/* Copy Verse */}
                      <button
                        onClick={() => handleCopy(verse)}
                        className="p-2 rounded-xl text-stone-500 dark:text-stone-400 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                        title="Salin Ayat"
                      >
                        {copiedAyat === verse.nomorAyat ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>

                      {/* Bookmark / Last Read */}
                      <button
                        onClick={() => {
                          setLastRead(verse.nomorAyat);
                          localStorage.setItem('yasin_last_read', verse.nomorAyat.toString());
                        }}
                        className={`p-2 rounded-xl transition-colors ${
                          isMarked
                            ? 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60'
                            : 'text-stone-400 hover:text-emerald-600 hover:bg-stone-100 dark:hover:bg-stone-800'
                        }`}
                        title={isMarked ? "Ditandai Terakhir Dibaca" : "Tandai Terakhir Dibaca"}
                      >
                        <Bookmark className={`w-4 h-4 ${isMarked ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                  </div>
                  
                  {/* Arabic Text Display */}
                  <div className="py-2 mb-6">
                    <p 
                      className={`arabic-text text-stone-900 dark:text-stone-50 tracking-normal selection:bg-emerald-200 dark:selection:bg-emerald-900 ${
                        mushafType === 'utsmani' ? 'arabic-text-utsmani' : 'arabic-text-kemenag'
                      }`}
                      style={{ 
                        fontSize: `${fontSize}px`, 
                        lineHeight: 2.5,
                        wordSpacing: '0.12em'
                      }}
                      dir="rtl"
                    >
                      {displayText}
                      {/* Authentic Ayah End Ornamental Symbol */}
                      <span className="inline-flex items-center justify-center mx-2 text-emerald-700 dark:text-emerald-400 select-none align-middle" style={{ fontSize: `${Math.max(fontSize - 8, 18)}px` }}>
                        ۝{verse.nomorAyat}
                      </span>
                    </p>
                  </div>

                  {/* Transliteration & Translation Section */}
                  {(showLatin || showTranslation) && (
                    <div className="pt-4 border-t border-stone-100 dark:border-stone-800/80 space-y-3">
                      {/* Latin Transliteration */}
                      {showLatin && (
                        <p className="text-emerald-800 dark:text-emerald-400 font-medium text-sm sm:text-base leading-relaxed tracking-wide">
                          {verse.teksLatin}
                        </p>
                      )}

                      {/* Indonesian Translation */}
                      {showTranslation && (
                        <p className="text-stone-600 dark:text-stone-400 text-sm sm:text-base leading-relaxed">
                          {verse.teksIndonesia}
                        </p>
                      )}
                    </div>
                  )}
                </article>
              );
            })}
          </div>

          {/* Bottom Completion Card */}
          <div className="text-center mt-16 p-8 rounded-3xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
            <span className="text-3xl mb-2 inline-block">🤲</span>
            <h3 className="text-xl font-serif font-bold text-stone-900 dark:text-stone-100 mb-2">
              Shadaqallāhul-'Azhīm
            </h3>
            <p className="text-stone-600 dark:text-stone-400 text-sm max-w-md mx-auto mb-6">
              Maha benar Allah Yang Maha Agung dengan segala firman-Nya. Lanjutkan membaca rangkaian doa dan tahlil.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/tahlil"
                className="inline-flex items-center px-6 py-3 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-sm shadow-sm transition-colors"
              >
                <span>Lanjut ke Doa Tahlil</span>
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Link>
              <button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center px-5 py-3 rounded-full bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 font-medium text-sm border border-stone-300 dark:border-stone-700 transition-colors"
              >
                <span>Kembali ke Atas</span>
              </button>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
