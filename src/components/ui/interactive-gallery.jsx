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

const InteractiveGallery = ({ items = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animatedOptions, setAnimatedOptions] = useState([]);

  const handleOptionClick = (index) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    const timers = [];
    items.forEach((_, i) => {
      const timer = setTimeout(() => {
        setAnimatedOptions((prev) => [...prev, i]);
      }, 160 * i);
      timers.push(timer);
    });
    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [items.length]);

  if (!items.length) return null;

  return (
    <div className="relative flex flex-col items-center justify-center w-full font-sans text-white">
      {/* Options Container */}
      <div className="options flex w-full max-w-[1000px] h-[420px] md:h-[480px] mx-auto items-stretch overflow-hidden rounded-2xl">
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
              onClick={() => handleOptionClick(index)}
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
              <div className="absolute left-0 right-0 bottom-4 md:bottom-5 flex items-center justify-start h-12 z-[2] pointer-events-none px-3 md:px-4 gap-3 w-full">
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
                    className="font-bold text-base md:text-lg leading-tight"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? 'translateX(0)' : 'translateX(25px)',
                      transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  >
                    {item.title}
                  </div>
                  <div
                    className="text-sm md:text-base text-gray-300 leading-snug mt-0.5"
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

      {/* Mobile indicator dots */}
      <div className="flex md:hidden gap-2 mt-4">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className="w-2 h-2 rounded-full transition-all duration-300"
            style={{
              backgroundColor:
                activeIndex === index
                  ? 'rgba(110, 231, 183, 0.8)'
                  : 'rgba(255, 255, 255, 0.3)',
              transform: activeIndex === index ? 'scale(1.4)' : 'scale(1)',
            }}
            aria-label={`Lihat foto ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default InteractiveGallery;
