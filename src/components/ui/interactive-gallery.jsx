import React, { useState, useEffect } from 'react';
import { Heart, Star, Camera, Flower2, Sun, BookOpen, Sparkles } from 'lucide-react';

const galleryIcons = [
  <Heart size={22} className="text-white" />,
  <Star size={22} className="text-white" />,
  <Camera size={22} className="text-white" />,
  <Flower2 size={22} className="text-white" />,
  <Sun size={22} className="text-white" />,
  <BookOpen size={22} className="text-white" />,
  <Sparkles size={22} className="text-white" />,
];

// ─── DESKTOP: horizontal expanding panels ───
const DesktopGallery = ({ items, activeIndex, setActiveIndex, animatedOptions }) => (
  <div className="options flex w-full max-w-[1000px] h-[480px] mx-auto items-stretch overflow-hidden rounded-2xl">
    {items.map((item, index) => {
      const isActive = activeIndex === index;
      return (
        <div
          key={item.id || index}
          className="option relative flex flex-col justify-end overflow-hidden cursor-pointer"
          style={{
            backgroundImage: `url('${item.thumbnail}')`,
            backgroundSize: isActive ? 'auto 100%' : 'auto 130%',
            backgroundPosition: 'center',
            backfaceVisibility: 'hidden',
            opacity: animatedOptions.includes(index) ? 1 : 0,
            transform: animatedOptions.includes(index)
              ? 'translateX(0)'
              : 'translateX(-50px)',
            minWidth: '48px',
            minHeight: '100px',
            margin: 0,
            borderRadius: 0,
            borderWidth: '2px',
            borderStyle: 'solid',
            borderColor: isActive ? 'rgba(255,255,255,0.5)' : 'rgba(30,30,30,0.8)',
            backgroundColor: '#18181b',
            boxShadow: isActive
              ? '0 20px 60px rgba(0,0,0,0.50)'
              : '0 10px 30px rgba(0,0,0,0.30)',
            flex: isActive ? '7 1 0%' : '1 1 0%',
            zIndex: isActive ? 10 : 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            position: 'relative',
            overflow: 'hidden',
            willChange: 'flex-grow, box-shadow, background-size',
            transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
          onClick={() => setActiveIndex(index)}
        >
          {/* Shadow gradient at bottom */}
          <div
            className="absolute left-0 right-0 pointer-events-none"
            style={{
              bottom: isActive ? '0' : '-40px',
              height: '160px',
              background: isActive
                ? 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)'
                : 'linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 100%)',
              transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />

          {/* Label with icon and text */}
          <div className="absolute left-0 right-0 bottom-5 flex items-center justify-start h-12 z-[2] pointer-events-none px-4 gap-3 w-full">
            <div
              className="flex-shrink-0 flex items-center justify-center rounded-full border-2"
              style={{
                minWidth: '40px',
                maxWidth: '40px',
                height: '40px',
                backgroundColor: 'rgba(32, 32, 32, 0.85)',
                backdropFilter: 'blur(10px)',
                borderColor: isActive ? 'rgba(110, 231, 183, 0.6)' : '#444',
                boxShadow: isActive
                  ? '0 0 16px rgba(110, 231, 183, 0.25)'
                  : '0 1px 4px rgba(0,0,0,0.18)',
                transition: 'all 0.5s ease',
              }}
            >
              {galleryIcons[index % galleryIcons.length]}
            </div>
            <div className="text-white whitespace-pre relative overflow-hidden">
              <div
                className="font-bold text-lg leading-tight"
                style={{
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? 'translateX(0)' : 'translateX(25px)',
                  transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                {item.title}
              </div>
              <div
                className="text-base text-gray-300 leading-snug mt-0.5"
                style={{
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? 'translateX(0)' : 'translateX(25px)',
                  transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.05s',
                }}
              >
                {item.description}
              </div>
            </div>
          </div>
        </div>
      );
    })}
  </div>
);

// ─── MOBILE: vertical scrollable cards ───
const MobileGallery = ({ items, activeIndex, setActiveIndex, animatedOptions }) => (
  <div className="flex flex-col gap-3 w-full px-2">
    {items.map((item, index) => {
      const isActive = activeIndex === index;
      return (
        <div
          key={item.id || index}
          className="relative w-full overflow-hidden rounded-2xl cursor-pointer"
          style={{
            height: isActive ? '320px' : '72px',
            opacity: animatedOptions.includes(index) ? 1 : 0,
            transform: animatedOptions.includes(index)
              ? 'translateY(0)'
              : 'translateY(30px)',
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
          onClick={() => setActiveIndex(isActive ? -1 : index)}
        >
          {/* Background image */}
          <img
            src={item.thumbnail}
            alt={item.title}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              transition: 'transform 0.5s ease',
              transform: isActive ? 'scale(1)' : 'scale(1.1)',
            }}
          />

          {/* Gradient overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: isActive
                ? 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)'
                : 'linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)',
            }}
          />

          {/* Label */}
          <div className="absolute inset-0 flex items-end z-[2] pointer-events-none">
            <div className="flex items-center gap-3 p-4 w-full">
              <div
                className="flex-shrink-0 flex items-center justify-center rounded-full border-2"
                style={{
                  minWidth: '38px',
                  maxWidth: '38px',
                  height: '38px',
                  backgroundColor: 'rgba(32, 32, 32, 0.85)',
                  backdropFilter: 'blur(10px)',
                  borderColor: isActive ? 'rgba(110, 231, 183, 0.6)' : 'rgba(255,255,255,0.25)',
                  boxShadow: isActive
                    ? '0 0 12px rgba(110, 231, 183, 0.25)'
                    : '0 1px 4px rgba(0,0,0,0.18)',
                  transition: 'all 0.4s ease',
                }}
              >
                {galleryIcons[index % galleryIcons.length]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-white text-base leading-tight drop-shadow-lg truncate">
                  {item.title}
                </div>
                {isActive && (
                  <div
                    className="text-sm text-gray-200 leading-snug mt-1 line-clamp-2"
                    style={{
                      animation: 'mobileDescFadeIn 0.4s ease forwards',
                    }}
                  >
                    {item.description}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    })}

    <style>{`
      @keyframes mobileDescFadeIn {
        from { opacity: 0; transform: translateY(8px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `}</style>
  </div>
);

// ─── MAIN COMPONENT: responsive switch ───
const InteractiveGallery = ({ items = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animatedOptions, setAnimatedOptions] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Staggered entrance animation
  useEffect(() => {
    setAnimatedOptions([]);
    const timers = [];
    items.forEach((_, i) => {
      const timer = setTimeout(() => {
        setAnimatedOptions((prev) => [...prev, i]);
      }, (isMobile ? 100 : 160) * i);
      timers.push(timer);
    });
    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [items.length, isMobile]);

  if (!items.length) return null;

  const handleSetActive = (index) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full font-sans text-white">
      {/* Desktop view */}
      <div className="hidden md:block w-full">
        <DesktopGallery
          items={items}
          activeIndex={activeIndex}
          setActiveIndex={handleSetActive}
          animatedOptions={animatedOptions}
        />
      </div>

      {/* Mobile view */}
      <div className="block md:hidden w-full">
        <MobileGallery
          items={items}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          animatedOptions={animatedOptions}
        />
      </div>
    </div>
  );
};

export default InteractiveGallery;
