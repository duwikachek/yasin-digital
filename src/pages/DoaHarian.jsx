import { useState } from 'react';
import { ChevronDown, ChevronUp, Copy, Check, Sun, UtensilsCrossed, Church, Car, Shield, Briefcase, Users, Landmark } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import doaData from '../data/doa-harian.json';

const iconMap = {
  sun: Sun,
  utensils: UtensilsCrossed,
  mosque: Church,
  car: Car,
  shield: Shield,
  briefcase: Briefcase,
  users: Users,
  landmark: Landmark,
};

const colorMap = {
  amber: 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800',
  emerald: 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800',
  blue: 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800',
  violet: 'bg-violet-50 dark:bg-violet-950/30 border-violet-200 dark:border-violet-800',
  red: 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800',
  indigo: 'bg-indigo-50 dark:bg-indigo-950/30 border-indigo-200 dark:border-indigo-800',
  pink: 'bg-pink-50 dark:bg-pink-950/30 border-pink-200 dark:border-pink-800',
  slate: 'bg-slate-50 dark:bg-slate-950/30 border-slate-200 dark:border-slate-800',
};

const iconColorMap = {
  amber: 'text-amber-600 dark:text-amber-400',
  emerald: 'text-emerald-600 dark:text-emerald-400',
  blue: 'text-blue-600 dark:text-blue-400',
  violet: 'text-violet-600 dark:text-violet-400',
  red: 'text-red-600 dark:text-red-400',
  indigo: 'text-indigo-600 dark:text-indigo-400',
  pink: 'text-pink-600 dark:text-pink-400',
  slate: 'text-slate-600 dark:text-slate-400',
};

function DoaCard({ prayer, categoryColor }) {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedField, setCopiedField] = useState(null);

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="border border-stone-200 dark:border-stone-700 rounded-lg overflow-hidden bg-white dark:bg-stone-800 shadow-sm hover:shadow-md transition-shadow">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-stone-50 dark:hover:bg-stone-700/50 transition-colors"
      >
        <h3 className="font-medium text-stone-900 dark:text-stone-100 text-sm md:text-base">
          {prayer.title}
        </h3>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-stone-500 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-stone-500 flex-shrink-0" />
        )}
      </button>

      {isOpen && (
        <div className="px-4 pb-4 space-y-4 border-t border-stone-200 dark:border-stone-700 pt-4">
          {/* Arab */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-stone-500 dark:text-stone-400">
                Arab
              </span>
              <button
                onClick={() => copyToClipboard(prayer.arabic, 'arabic')}
                className="p-1.5 hover:bg-stone-100 dark:hover:bg-stone-700 rounded transition-colors"
                title="Copy Arab"
              >
                {copiedField === 'arabic' ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4 text-stone-400" />
                )}
              </button>
            </div>
            <p className="text-right text-xl md:text-2xl leading-loose font-arabic text-stone-900 dark:text-stone-100">
              {prayer.arabic}
            </p>
          </div>

          {/* Latin */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-stone-500 dark:text-stone-400">
                Latin
              </span>
              <button
                onClick={() => copyToClipboard(prayer.latin, 'latin')}
                className="p-1.5 hover:bg-stone-100 dark:hover:bg-stone-700 rounded transition-colors"
                title="Copy Latin"
              >
                {copiedField === 'latin' ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4 text-stone-400" />
                )}
              </button>
            </div>
            <p className="text-sm md:text-base italic text-stone-700 dark:text-stone-300 leading-relaxed">
              {prayer.latin}
            </p>
          </div>

          {/* Terjemahan */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-stone-500 dark:text-stone-400">
                Artinya
              </span>
              <button
                onClick={() => copyToClipboard(prayer.translation, 'translation')}
                className="p-1.5 hover:bg-stone-100 dark:hover:bg-stone-700 rounded transition-colors"
                title="Copy Terjemahan"
              >
                {copiedField === 'translation' ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4 text-stone-400" />
                )}
              </button>
            </div>
            <p className="text-sm md:text-base text-stone-600 dark:text-stone-300 leading-relaxed">
              "{prayer.translation}"
            </p>
          </div>

          {/* Source & Notes */}
          <div className="pt-2 border-t border-stone-200 dark:border-stone-700 space-y-1">
            <p className="text-xs text-stone-500 dark:text-stone-400">
              <span className="font-medium">Sumber:</span> {prayer.source}
            </p>
            {prayer.notes && (
              <p className="text-xs text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-1 rounded">
                💡 {prayer.notes}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function CategoryAccordion({ category }) {
  const [isOpen, setIsOpen] = useState(false);
  const IconComponent = iconMap[category.icon] || Sun;
  const bgColor = colorMap[category.color] || colorMap.amber;
  const iconColor = iconColorMap[category.color] || iconColorMap.amber;

  return (
    <div className={`border rounded-xl overflow-hidden ${bgColor}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-4 flex items-center gap-4 text-left hover:opacity-80 transition-opacity"
      >
        <div className={`p-3 rounded-lg bg-white/50 dark:bg-stone-800/50 ${iconColor}`}>
          <IconComponent className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h2 className="text-lg md:text-xl font-semibold text-stone-900 dark:text-stone-100">
            {category.name}
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            {category.description} • {category.prayers.length} doa
          </p>
        </div>
        {isOpen ? (
          <ChevronUp className="w-6 h-6 text-stone-500 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-6 h-6 text-stone-500 flex-shrink-0" />
        )}
      </button>

      {isOpen && (
        <div className="px-5 pb-5 space-y-3">
          {category.prayers.map((prayer) => (
            <DoaCard key={prayer.id} prayer={prayer} categoryColor={category.color} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function DoaHarian() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = doaData.categories.map(category => ({
    ...category,
    prayers: category.prayers.filter(prayer =>
      prayer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prayer.latin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prayer.translation.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.prayers.length > 0);

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 dark:bg-stone-900">
      <Navigation />
      
      <main className="flex-1 pt-20 pb-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 dark:text-stone-100 mb-3">
              Doa-Doa
            </h1>
            <p className="text-stone-600 dark:text-stone-400 max-w-2xl mx-auto">
              Kumpulan doa pilihan yang sering digunakan dalam kehidupan sehari-hari
            </p>
            <p className="text-xs text-stone-500 dark:text-stone-500 mt-2">
              Total {doaData.categories.reduce((sum, cat) => sum + cat.prayers.length, 0)} doa dalam {doaData.categories.length} kategori
            </p>
          </div>

          {/* Search */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Cari doa... (contoh: makan, tidur, perjalanan)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-600"
            />
          </div>

          {/* Categories */}
          <div className="space-y-4">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category) => (
                <CategoryAccordion key={category.id} category={category} />
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-stone-500 dark:text-stone-400">
                  Tidak ada doa yang ditemukan dengan kata kunci "{searchQuery}"
                </p>
              </div>
            )}
          </div>

          {/* Info Footer */}
          <div className="mt-12 p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-lg">
            <p className="text-sm text-emerald-800 dark:text-emerald-300 text-center">
              💡 Tip: Klik pada judul doa untuk melihat detail lengkap. Gunakan tombol copy untuk menyalin teks doa.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
