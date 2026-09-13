import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import {
  Save, LogOut, Image, Type, LayoutGrid, HelpCircle,
  Eye, RotateCcw, ChevronDown, ChevronUp, Plus, Trash2,
  Lock, Upload, CheckCircle, AlertCircle
} from 'lucide-react';

const ADMIN_PASSWORD = 'yasin2024';

// ───── Komponen Toast Notifikasi ─────
function Toast({ message, type, onClose }) {
  return (
    <div className={`fixed top-6 right-6 z-[999] flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl text-white transition-all ${type === 'success' ? 'bg-emerald-600' : 'bg-red-500'}`}>
      {type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
      <span className="font-medium">{message}</span>
    </div>
  );
}

// ───── Halaman Login ─────
function LoginPage({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      onLogin();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
            <Lock className="w-8 h-8 text-emerald-400" />
          </div>
          <h1 className="text-2xl font-serif text-white mb-1">Panel Admin</h1>
          <p className="text-stone-500 text-sm">Yasin Digital — Masukkan kata sandi</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-stone-900 border border-stone-800 rounded-2xl p-6">
          <div className="mb-4">
            <label className="text-stone-400 text-sm mb-2 block">Kata Sandi</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan kata sandi..."
              className={`w-full bg-stone-800 border ${error ? 'border-red-500' : 'border-stone-700'} rounded-xl px-4 py-3 text-white placeholder-stone-600 focus:outline-none focus:border-emerald-500 transition-colors`}
              autoFocus
            />
            {error && <p className="text-red-400 text-sm mt-2">Kata sandi salah!</p>}
          </div>
          <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-3 rounded-xl transition-colors">
            Masuk ke Panel Admin
          </button>
          <p className="text-stone-600 text-xs text-center mt-4">Kata sandi default: <code className="text-stone-400">yasin2024</code></p>
        </form>
      </div>
    </div>
  );
}

// ───── Section Card ─────
function SectionCard({ title, icon: Icon, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden mb-4">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-5 hover:bg-stone-800/50 transition-colors">
        <div className="flex items-center gap-3">
          <Icon className="w-5 h-5 text-emerald-400" />
          <h2 className="text-white font-semibold">{title}</h2>
        </div>
        {open ? <ChevronUp className="w-5 h-5 text-stone-400" /> : <ChevronDown className="w-5 h-5 text-stone-400" />}
      </button>
      {open && <div className="px-5 pb-5 border-t border-stone-800 pt-5">{children}</div>}
    </div>
  );
}

// ───── Input Helper ─────
function Field({ label, children }) {
  return (
    <div className="mb-4">
      <label className="text-stone-400 text-sm mb-2 block">{label}</label>
      {children}
    </div>
  );
}

function TextInput({ value, onChange, placeholder, className = '' }) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full bg-stone-800 border border-stone-700 rounded-xl px-4 py-2.5 text-white placeholder-stone-600 focus:outline-none focus:border-emerald-500 transition-colors text-sm ${className}`}
    />
  );
}

function TextArea({ value, onChange, placeholder, rows = 3 }) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full bg-stone-800 border border-stone-700 rounded-xl px-4 py-2.5 text-white placeholder-stone-600 focus:outline-none focus:border-emerald-500 transition-colors text-sm resize-none"
    />
  );
}

// ───── Image URL Input dengan Preview ─────
function ImageField({ label, value, onChange }) {
  const fileRef = useRef();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => onChange(ev.target.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="mb-4">
      <label className="text-stone-400 text-sm mb-2 block">{label}</label>
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="URL gambar atau unggah file..."
          className="flex-1 bg-stone-800 border border-stone-700 rounded-xl px-4 py-2.5 text-white placeholder-stone-600 focus:outline-none focus:border-emerald-500 transition-colors text-sm"
        />
        <button
          onClick={() => fileRef.current.click()}
          className="flex items-center gap-2 px-3 py-2 bg-stone-700 hover:bg-stone-600 text-stone-300 rounded-xl text-sm transition-colors"
        >
          <Upload className="w-4 h-4" />
          <span className="hidden sm:inline">Upload</span>
        </button>
        <input ref={fileRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
      </div>
      {value && (
        <div className="rounded-xl overflow-hidden h-32 bg-stone-800 border border-stone-700">
          <img src={value} alt="preview" className="w-full h-full object-cover" onError={(e) => e.target.style.display = 'none'} />
        </div>
      )}
    </div>
  );
}

// ───── Main Admin Page ─────
export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => sessionStorage.getItem('admin_auth') === '1');
  const [toast, setToast] = useState(null);
  const { content, updateContent, resetContent } = useContent();
  const navigate = useNavigate();

  // Local working copies
  const [hero, setHero] = useState(content.hero);
  const [intro, setIntro] = useState(content.intro);
  const [gallery, setGallery] = useState(content.gallery);
  const [faq, setFaq] = useState(content.faq);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleLogin = () => {
    sessionStorage.setItem('admin_auth', '1');
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth');
    setIsLoggedIn(false);
  };

  const handleSave = () => {
    updateContent({ hero, intro, gallery, faq });
    showToast('✅ Perubahan berhasil disimpan!', 'success');
  };

  const handleReset = () => {
    if (window.confirm('Reset semua konten ke pengaturan awal? Tindakan ini tidak bisa dibatalkan.')) {
      resetContent();
      window.location.reload();
    }
  };

  // Gallery helpers
  const updateGalleryItem = (index, field, value) => {
    setGallery(prev => prev.map((item, i) => i === index ? { ...item, [field]: value } : item));
  };

  // FAQ helpers
  const updateFaqItem = (index, field, value) => {
    setFaq(prev => prev.map((item, i) => i === index ? { ...item, [field]: value } : item));
  };
  const addFaq = () => setFaq(prev => [...prev, { question: 'Pertanyaan baru', answer: 'Jawaban baru' }]);
  const deleteFaq = (index) => setFaq(prev => prev.filter((_, i) => i !== index));

  if (!isLoggedIn) return <LoginPage onLogin={handleLogin} />;

  return (
    <div className="min-h-screen bg-stone-950 text-white">
      {toast && <Toast {...toast} />}

      {/* Header */}
      <header className="sticky top-0 z-50 bg-stone-950/90 backdrop-blur-md border-b border-stone-800">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div>
            <h1 className="text-white font-semibold">⚙️ Panel Admin</h1>
            <p className="text-stone-500 text-xs">Yasin Digital</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 px-3 py-2 text-stone-400 hover:text-white hover:bg-stone-800 rounded-xl text-sm transition-colors"
            >
              <Eye className="w-4 h-4" />
              <span className="hidden sm:inline">Lihat Web</span>
            </button>
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-3 py-2 text-stone-400 hover:text-red-400 hover:bg-stone-800 rounded-xl text-sm transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden sm:inline">Reset</span>
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-medium transition-colors shadow-lg shadow-emerald-900/50"
            >
              <Save className="w-4 h-4" />
              Simpan
            </button>
            <button onClick={handleLogout} className="p-2 text-stone-500 hover:text-white hover:bg-stone-800 rounded-xl transition-colors">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* ── HERO ── */}
        <SectionCard title="Tampilan Utama (Hero)" icon={Type} defaultOpen={true}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Nama Almarhum">
              <TextInput value={hero.name} onChange={(v) => setHero(p => ({ ...p, name: v }))} placeholder="Nama almarhum..." />
            </Field>
            <Field label="Tagline / Label">
              <TextInput value={hero.tagline} onChange={(v) => setHero(p => ({ ...p, tagline: v }))} placeholder="Contoh: Buku Yasin Digital" />
            </Field>
            <Field label="Tanggal Lahir">
              <TextInput value={hero.birthDate} onChange={(v) => setHero(p => ({ ...p, birthDate: v }))} placeholder="Contoh: 1 Januari 1950" />
            </Field>
            <Field label="Tanggal Wafat">
              <TextInput value={hero.deathDate} onChange={(v) => setHero(p => ({ ...p, deathDate: v }))} placeholder="Contoh: 25 Desember 2023" />
            </Field>
          </div>
          <Field label="Deskripsi / Kalimat Pengantar Hero">
            <TextArea value={hero.description} onChange={(v) => setHero(p => ({ ...p, description: v }))} rows={3} />
          </Field>
          <ImageField label="Gambar Latar Belakang Hero" value={hero.backgroundImage} onChange={(v) => setHero(p => ({ ...p, backgroundImage: v }))} />
        </SectionCard>

        {/* ── KATA PENGANTAR ── */}
        <SectionCard title="Kata Pengantar" icon={Type}>
          <Field label="Judul">
            <TextInput value={intro.title} onChange={(v) => setIntro(p => ({ ...p, title: v }))} />
          </Field>
          {intro.paragraphs.map((para, i) => (
            <Field key={i} label={`Paragraf ${i + 1}`}>
              <TextArea
                value={para}
                onChange={(v) => setIntro(p => ({ ...p, paragraphs: p.paragraphs.map((x, xi) => xi === i ? v : x) }))}
                rows={2}
              />
            </Field>
          ))}
        </SectionCard>

        {/* ── GALERI ── */}
        <SectionCard title="Galeri Kenangan" icon={LayoutGrid}>
          <div className="space-y-6">
            {gallery.map((item, i) => (
              <div key={item.id} className="bg-stone-800/50 border border-stone-700 rounded-xl p-4">
                <h3 className="text-emerald-400 font-medium mb-3 text-sm">Foto #{i + 1}</h3>
                <Field label="Judul Foto">
                  <TextInput value={item.title} onChange={(v) => updateGalleryItem(i, 'title', v)} />
                </Field>
                <Field label="Keterangan Foto">
                  <TextArea value={item.description} onChange={(v) => updateGalleryItem(i, 'description', v)} rows={2} />
                </Field>
                <ImageField label="Gambar" value={item.thumbnail} onChange={(v) => updateGalleryItem(i, 'thumbnail', v)} />
              </div>
            ))}
          </div>
        </SectionCard>

        {/* ── FAQ ── */}
        <SectionCard title="Pertanyaan Umum (FAQ)" icon={HelpCircle}>
          <div className="space-y-4">
            {faq.map((item, i) => (
              <div key={i} className="bg-stone-800/50 border border-stone-700 rounded-xl p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-emerald-400 font-medium text-sm">Pertanyaan #{i + 1}</h3>
                  <button onClick={() => deleteFaq(i)} className="text-red-400 hover:text-red-300 transition-colors p-1">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <Field label="Pertanyaan">
                  <TextInput value={item.question} onChange={(v) => updateFaqItem(i, 'question', v)} />
                </Field>
                <Field label="Jawaban">
                  <TextArea value={item.answer} onChange={(v) => updateFaqItem(i, 'answer', v)} rows={2} />
                </Field>
              </div>
            ))}
          </div>
          <button
            onClick={addFaq}
            className="mt-4 flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300 border border-emerald-800 hover:border-emerald-600 rounded-xl px-4 py-2 transition-colors w-full justify-center"
          >
            <Plus className="w-4 h-4" />
            Tambah FAQ Baru
          </button>
        </SectionCard>

        {/* ── GANTI PASSWORD ── */}
        <SectionCard title="Keamanan" icon={Lock}>
          <p className="text-stone-400 text-sm mb-4">
            Kata sandi admin saat ini tersimpan di kode. Untuk menggantinya, hubungi developer dan minta mengubah nilai <code className="text-emerald-400 bg-stone-800 px-2 py-0.5 rounded">ADMIN_PASSWORD</code> di file <code className="text-emerald-400 bg-stone-800 px-2 py-0.5 rounded">AdminPage.jsx</code>.
          </p>
          <p className="text-stone-500 text-xs">Kata sandi aktif: <span className="text-stone-400 font-mono">yasin2024</span></p>
        </SectionCard>

        {/* Save Bottom */}
        <div className="mt-6 flex gap-3 justify-end">
          <button onClick={handleReset} className="flex items-center gap-2 px-5 py-3 text-stone-400 border border-stone-700 hover:border-red-800 hover:text-red-400 rounded-xl text-sm transition-colors">
            <RotateCcw className="w-4 h-4" /> Reset Semua
          </button>
          <button onClick={handleSave} className="flex items-center gap-2 px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-semibold transition-colors shadow-xl shadow-emerald-900/40">
            <Save className="w-5 h-5" /> Simpan Semua Perubahan
          </button>
        </div>
      </main>
    </div>
  );
}
