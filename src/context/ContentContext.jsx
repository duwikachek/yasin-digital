import { createContext, useContext, useState, useEffect } from 'react';

// === DEFAULT CONTENT (fallback jika localStorage kosong) ===
const defaultContent = {
  hero: {
    siteTitle: "Yasin Digital",
    tagline: "Buku Yasin Digital",
    description: "Mari sejenak menundukkan kepala, memanjatkan doa, dan melantunkan ayat suci Al-Qur'an. Semoga amal ibadah beliau diterima di sisi-Nya dan diberikan tempat terbaik.",
    backgroundImage: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&q=80&w=2000",
    person1: {
      label: "Almarhum",
      name: "alm. Subiyantoro",
      birthDate: "-",
      deathDate: "-"
    },
    person2: {
      label: "Almarhumah",
      name: "almah. Nama Ibu",
      birthDate: "-",
      deathDate: "-"
    }
  },
  intro: {
    title: "Kata Pengantar",
    paragraphs: [
      "Assalamualaikum Warahmatullahi Wabarakatuh. Puji syukur ke hadirat Allah SWT.",
      "Aplikasi web ini dibuat sebagai bentuk dedikasi dan cinta kepada alm. SUBIYANTORO.",
      "Semoga dengan adanya bacaan Yasin dan Tahlil ini, pahala senantiasa mengalir untuk beliau, dan kita semua diberikan keberkahan. Amin."
    ]
  },
  gallery: [
    {
      id: 1,
      title: "Momen Kebersamaan",
      description: "Kenangan indah bersama alm. SUBIYANTORO dalam momen kebersamaan bersama keluarga yang selalu terpatri di hati.",
      className: "col-span-1",
      thumbnail: "https://picsum.photos/seed/family1/1200/800",
    },
    {
      id: 2,
      title: "Senyuman Beliau",
      description: "Setiap senyuman adalah kenangan terindah yang selalu kami ingat dan rindu setiap harinya.",
      className: "col-span-1",
      thumbnail: "https://picsum.photos/seed/nature2/800/800",
    },
    {
      id: 3,
      title: "Warisan Kebajikan",
      description: "Beliau meninggalkan warisan kebajikan, cinta, dan kasih sayang yang akan selalu kami kenang.",
      className: "col-span-1",
      thumbnail: "https://picsum.photos/seed/green3/800/800",
    },
    {
      id: 4,
      title: "Kenangan Tak Terlupakan",
      description: "Momen-momen bersama keluarga yang tak ternilai dan akan selalu hidup dalam hati kami semua.",
      className: "col-span-1",
      thumbnail: "https://picsum.photos/seed/river4/1200/800",
    },
    {
      id: 5,
      title: "Kasih Sayang Beliau",
      description: "Kasih sayang dan kehangatan yang beliau berikan senantiasa menyinari setiap langkah perjalanan hidup kami.",
      className: "col-span-1",
      thumbnail: "https://picsum.photos/seed/peace5/1200/800",
    },
    {
      id: 6,
      title: "Doa & Harapan",
      description: "Untaian doa kami harapkan senantiasa melingkupi beliau di alam sana.",
      className: "col-span-1",
      thumbnail: "https://picsum.photos/seed/light6/1200/800",
    },
  ],
  faq: [
    {
      question: "Apa tujuan dibuatnya website ini?",
      answer: "Website ini didedikasikan untuk mengenang alm. SUBIYANTORO, memudahkan keluarga besar dan kerabat dalam membaca Surah Yasin dan Tahlil secara digital di mana saja."
    },
    {
      question: "Apakah bisa digunakan secara offline?",
      answer: "Untuk saat ini, Anda memerlukan koneksi internet untuk mengakses fitur-fitur yang ada. Kami merekomendasikan untuk tidak menutup halaman saat sedang membaca agar tidak perlu memuat ulang."
    },
    {
      question: "Bagaimana cara menggunakan fitur Tasbih?",
      answer: "Cukup buka halaman Fitur Interaktif, dan Anda dapat menekan area atau tombol yang disediakan di layar untuk menghitung jumlah dzikir Anda. Fitur ini dirancang sangat sederhana dan bebas distraksi."
    }
  ],
  adminPassword: "yasin2024"
};

const ContentContext = createContext(null);

export function ContentProvider({ children }) {
  const [content, setContent] = useState(() => {
    try {
      const saved = localStorage.getItem('yasin_content');
      if (saved) {
        const parsed = JSON.parse(saved);
        let gallery = parsed.gallery || defaultContent.gallery;
        if (gallery.length < 6) {
          gallery = [...gallery, ...defaultContent.gallery.slice(gallery.length)];
        }
        return { ...defaultContent, ...parsed, gallery };
      }
      return defaultContent;
    } catch {
      return defaultContent;
    }
  });

  const updateContent = (newContent) => {
    const merged = { ...content, ...newContent };
    setContent(merged);
    localStorage.setItem('yasin_content', JSON.stringify(merged));
  };

  const resetContent = () => {
    setContent(defaultContent);
    localStorage.removeItem('yasin_content');
  };

  return (
    <ContentContext.Provider value={{ content, updateContent, resetContent, defaultContent }}>
      {children}
    </ContentContext.Provider>
  );
}

export const useContent = () => {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error('useContent must be used within ContentProvider');
  return ctx;
};
