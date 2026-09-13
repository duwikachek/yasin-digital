import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

// ───── Upload foto ke Supabase Storage ─────
async function uploadImageToSupabase(file) {
  if (!supabase) return null;
  const ext = file.name.split('.').pop();
  const fileName = `img_${Date.now()}.${ext}`;
  const { data, error } = await supabase.storage
    .from('gallery')
    .upload(fileName, file, { upsert: true, contentType: file.type });
  if (error) {
    console.error('Upload error:', error);
    return null;
  }
  const { data: urlData } = supabase.storage.from('gallery').getPublicUrl(data.path);
  return urlData?.publicUrl || null;
}
import {
  Save, LogOut, Image, Type, LayoutGrid, HelpCircle,
  Eye, RotateCcw, ChevronDown, ChevronUp, Plus, Trash2,
  Lock, Upload, CheckCircle, AlertCircle, Download, FileText, Cloud
} from 'lucide-react';

const DEFAULT_PASSWORD = 'yasin2024';

const getStoredPassword = () => localStorage.getItem('yasin_admin_password') || DEFAULT_PASSWORD;
const setStoredPassword = (newPass) => localStorage.setItem('yasin_admin_password', newPass);

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
    if (password === getStoredPassword()) {
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
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadError('');

    // Jika Supabase tersedia → upload ke Supabase Storage (dapat URL cloud)
    if (isSupabaseConfigured && supabase) {
      setUploading(true);
      const url = await uploadImageToSupabase(file);
      setUploading(false);
      if (url) {
        onChange(url);
      } else {
        setUploadError('Gagal upload ke cloud. Pastikan Supabase Storage bucket "gallery" sudah dibuat dan publik.');
        // Fallback ke base64
        const reader = new FileReader();
        reader.onload = (ev) => onChange(ev.target.result);
        reader.readAsDataURL(file);
      }
    } else {
      // Fallback: simpan sebagai base64 jika tidak ada Supabase
      const reader = new FileReader();
      reader.onload = (ev) => onChange(ev.target.result);
      reader.readAsDataURL(file);
    }
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
          disabled={uploading}
          className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-colors ${
            uploading
              ? 'bg-stone-700 text-stone-500 cursor-not-allowed'
              : 'bg-stone-700 hover:bg-stone-600 text-stone-300'
          }`}
        >
          <Upload className={`w-4 h-4 ${uploading ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">{uploading ? 'Uploading...' : 'Upload'}</span>
        </button>
        <input ref={fileRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
      </div>
      {uploading && (
        <p className="text-emerald-400 text-xs mb-2 flex items-center gap-1">
          <span className="inline-block w-3 h-3 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
          Sedang mengupload foto ke cloud...
        </p>
      )}
      {uploadError && (
        <p className="text-red-400 text-xs mb-2">⚠️ {uploadError}</p>
      )}
      {value && !uploading && (
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
  const [intro, setIntro] = useState(() => {
    const existing = content.intro || {};
    const paras = existing.paragraphs || [];
    return {
      title: existing.title || 'Kata Pengantar',
      p1: existing.p1 || paras[0] || '',
      p2: existing.p2 || paras[1] || '',
      p3: existing.p3 || paras[2] || '',
    };
  });
  const [gallery, setGallery] = useState(content.gallery);
  const [faq, setFaq] = useState(content.faq);
  const [newPassword, setNewPassword] = useState('');

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
    const formattedIntro = {
      title: intro.title,
      paragraphs: [intro.p1, intro.p2, intro.p3].filter(p => p !== undefined && p !== null && p !== ''),
      p1: intro.p1,
      p2: intro.p2,
      p3: intro.p3
    };
    updateContent({ hero, intro: formattedIntro, gallery, faq });
    showToast('✅ Perubahan berhasil disimpan!', 'success');
  };

  const handleSavePassword = () => {
    if (!newPassword.trim()) {
      showToast('Kata sandi baru tidak boleh kosong!', 'error');
      return;
    }
    setStoredPassword(newPassword.trim());
    setNewPassword('');
    showToast('✅ Kata sandi admin berhasil diperbarui!', 'success');
  };

  const handleReset = () => {
    if (window.confirm('Reset semua konten ke pengaturan awal? Tindakan ini tidak bisa dibatalkan.')) {
      resetContent();
      window.location.reload();
    }
  };

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(content, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "yasin_content.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('✅ Data berhasil di-export ke yasin_content.json', 'success');
  };

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(content, null, 2));
    showToast('✅ Data JSON disalin ke clipboard!', 'success');
  };

  const handleImportJSON = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target.result);
        updateContent(imported);
        showToast('✅ Data berhasil di-import!', 'success');
        setTimeout(() => window.location.reload(), 1000);
      } catch {
        showToast('❌ File JSON tidak valid!', 'error');
      }
    };
    reader.readAsText(file);
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
            <div className="flex items-center gap-2">
              <h1 className="text-white font-semibold">⚙️ Panel Admin</h1>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium flex items-center gap-1 ${isSupabaseConfigured ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-stone-800 text-stone-400 border border-stone-700'}`}>
                <Cloud className="w-3 h-3" />
                {isSupabaseConfigured ? 'Supabase Connected' : 'Local Mode'}
              </span>
            </div>
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
            <button onClick={handleLogout} className="p-2 text-stone-500 hover:text-white hover:bg-stone-800 rounded-xl transition-colors" title="Keluar">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* ── HERO ── */}
        <SectionCard title="Halaman Utama (Hero Section)" icon={Type} defaultOpen={true}>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Judul / Nama Web Navigasi (Pojok Kiri Atas)">
                <TextInput value={hero.siteTitle || 'Yasin Digital'} onChange={(v) => setHero({ ...hero, siteTitle: v })} />
              </Field>
              <Field label="Tagline (Sub-judul atas)">
                <TextInput value={hero.tagline || 'Buku Yasin Digital'} onChange={(v) => setHero({ ...hero, tagline: v })} />
              </Field>
            </div>

            {/* Form Data Bapak */}
            <div className="bg-stone-800/60 border border-stone-700 rounded-xl p-5">
              <h3 className="text-emerald-400 font-semibold mb-4 text-sm flex items-center gap-2">
                👨 Data Almarhum (Bapak)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Field label="Nama Bapak">
                  <TextInput
                    value={hero.person1?.name || ''}
                    onChange={(v) => setHero({ ...hero, person1: { ...hero.person1, name: v } })}
                    placeholder="Contoh: alm. Subiyantoro"
                  />
                </Field>
                <Field label="Tanggal Lahir Bapak">
                  <TextInput
                    value={hero.person1?.birthDate || ''}
                    onChange={(v) => setHero({ ...hero, person1: { ...hero.person1, birthDate: v } })}
                    placeholder="Contoh: 15 Januari 1955"
                  />
                </Field>
                <Field label="Tanggal Wafat Bapak">
                  <TextInput
                    value={hero.person1?.deathDate || ''}
                    onChange={(v) => setHero({ ...hero, person1: { ...hero.person1, deathDate: v } })}
                    placeholder="Contoh: 20 Agustus 2023"
                  />
                </Field>
              </div>
            </div>

            {/* Form Data Mamah */}
            <div className="bg-stone-800/60 border border-stone-700 rounded-xl p-5">
              <h3 className="text-emerald-400 font-semibold mb-4 text-sm flex items-center gap-2">
                👩 Data Almarhumah (Mamah)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Field label="Nama Mamah">
                  <TextInput
                    value={hero.person2?.name || ''}
                    onChange={(v) => setHero({ ...hero, person2: { ...hero.person2, name: v } })}
                    placeholder="Contoh: almah. Nama Mamah"
                  />
                </Field>
                <Field label="Tanggal Lahir Mamah">
                  <TextInput
                    value={hero.person2?.birthDate || ''}
                    onChange={(v) => setHero({ ...hero, person2: { ...hero.person2, birthDate: v } })}
                    placeholder="Contoh: 10 Mei 1960"
                  />
                </Field>
                <Field label="Tanggal Wafat Mamah">
                  <TextInput
                    value={hero.person2?.deathDate || ''}
                    onChange={(v) => setHero({ ...hero, person2: { ...hero.person2, deathDate: v } })}
                    placeholder="Contoh: 12 Desember 2024"
                  />
                </Field>
              </div>
            </div>

            <Field label="Deskripsi Singkat / Pengantar di Bawah Nama">
              <TextArea
                value={hero.description || ''}
                onChange={(v) => setHero({ ...hero, description: v })}
                rows={2}
              />
            </Field>

            <ImageField
              label="Foto Utama (Background Hero)"
              value={hero.bgImage || hero.backgroundImage || ''}
              onChange={(v) => setHero({ ...hero, bgImage: v, backgroundImage: v })}
            />
          </div>
        </SectionCard>

        {/* ── KATA PENGANTAR ── */}
        <SectionCard title="Kata Pengantar Keluarga" icon={Type}>
          <div className="space-y-4">
            <Field label="Judul Bagian">
              <TextInput value={intro.title} onChange={(v) => setIntro({ ...intro, title: v })} />
            </Field>
            <Field label="Paragraf 1">
              <TextArea value={intro.p1} onChange={(v) => setIntro({ ...intro, p1: v })} />
            </Field>
            <Field label="Paragraf 2">
              <TextArea value={intro.p2} onChange={(v) => setIntro({ ...intro, p2: v })} />
            </Field>
            <Field label="Paragraf 3 (Penutup)">
              <TextArea value={intro.p3} onChange={(v) => setIntro({ ...intro, p3: v })} />
            </Field>
          </div>
        </SectionCard>

        {/* ── GALERI ── */}
        <SectionCard title={`Galeri Kenangan (${gallery.length} Foto)`} icon={LayoutGrid}>
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
        <SectionCard title="Keamanan & Ganti Kata Sandi" icon={Lock}>
          <p className="text-stone-400 text-sm mb-4">
            Ubah kata sandi untuk masuk ke Panel Admin ini. Kata sandi baru akan langsung berlaku.
          </p>
          <Field label="Kata Sandi Baru">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Masukkan kata sandi baru..."
                className="w-full bg-stone-800 border border-stone-700 rounded-xl px-4 py-3 text-white placeholder-stone-600 focus:outline-none focus:border-emerald-500 transition-colors"
              />
              <button
                onClick={handleSavePassword}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-medium text-sm transition-colors whitespace-nowrap shadow-lg shadow-emerald-900/40"
              >
                Ganti Kata Sandi
              </button>
            </div>
          </Field>
        </SectionCard>

        {/* ── BACKUP & TRANSFER DATA ── */}
        <SectionCard title="Backup & Transfer Data Antar Perangkat (HP / Laptop)" icon={Download}>
          <p className="text-stone-400 text-sm mb-4">
            Karena data pengeditan secara default tersimpan di browser perangkat ini (localStorage), Anda dapat meng-export data dari Laptop untuk dimasukkan ke HP atau disalin.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2.5 bg-stone-800 hover:bg-stone-700 text-emerald-400 border border-stone-700 rounded-xl text-sm font-medium transition-colors"
            >
              <Download className="w-4 h-4" />
              Download Backup (yasin_content.json)
            </button>

            <button
              onClick={handleCopyJSON}
              className="flex items-center gap-2 px-4 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 rounded-xl text-sm font-medium transition-colors"
            >
              <FileText className="w-4 h-4" />
              Salin Kode JSON (Clipboard)
            </button>

            <label className="flex items-center gap-2 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-sm font-medium cursor-pointer transition-colors">
              <Upload className="w-4 h-4" />
              Upload / Import File JSON
              <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
            </label>
          </div>
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
