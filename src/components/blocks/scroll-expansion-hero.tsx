'use client';

import {
  useEffect,
  useRef,
  useState,
  ReactNode,
  TouchEvent,
  WheelEvent,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ScrollExpandMediaProps {
  mediaType?: 'video' | 'image' | 'slideshow';
  mediaSrc: string;
  slideshowImages?: string[];
  posterSrc?: string;
  bgImageSrc: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  children?: ReactNode;
  countryAccent?: string; // hex color for warm glow
}

const ScrollExpandMedia = ({
  mediaType = 'slideshow',
  mediaSrc,
  slideshowImages = [],
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend,
  children,
  countryAccent = '#e8b4a0',
}: ScrollExpandMediaProps) => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [showContent, setShowContent] = useState<boolean>(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState<boolean>(false);
  const [touchStartY, setTouchStartY] = useState<number>(0);
  const [isMobileState, setIsMobileState] = useState<boolean>(false);
  const [slideIndex, setSlideIndex] = useState(0);

  const sectionRef = useRef<HTMLDivElement | null>(null);

  // Slideshow auto-advance
  useEffect(() => {
    if (slideshowImages.length <= 1) return;
    const interval = setInterval(() => {
      setSlideIndex(prev => (prev + 1) % slideshowImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slideshowImages.length]);

  useEffect(() => {
    setScrollProgress(0);
    setShowContent(false);
    setMediaFullyExpanded(false);
    setSlideIndex(0);
  }, [mediaSrc, bgImageSrc]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (mediaFullyExpanded && e.deltaY < 0 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const scrollDelta = e.deltaY * 0.0009;
        const newProgress = Math.min(Math.max(scrollProgress + scrollDelta, 0), 1);
        setScrollProgress(newProgress);
        if (newProgress >= 1) { setMediaFullyExpanded(true); setShowContent(true); }
        else if (newProgress < 0.75) { setShowContent(false); }
      }
    };

    const handleTouchStart = (e: TouchEvent) => setTouchStartY(e.touches[0].clientY);

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartY) return;
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;
      if (mediaFullyExpanded && deltaY < -20 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const scrollFactor = deltaY < 0 ? 0.008 : 0.005;
        const newProgress = Math.min(Math.max(scrollProgress + deltaY * scrollFactor, 0), 1);
        setScrollProgress(newProgress);
        if (newProgress >= 1) { setMediaFullyExpanded(true); setShowContent(true); }
        else if (newProgress < 0.75) { setShowContent(false); }
        setTouchStartY(touchY);
      }
    };

    const handleTouchEnd = () => setTouchStartY(0);
    const handleScroll = () => { if (!mediaFullyExpanded) window.scrollTo(0, 0); };

    window.addEventListener('wheel', handleWheel as unknown as EventListener, { passive: false });
    window.addEventListener('scroll', handleScroll as EventListener);
    window.addEventListener('touchstart', handleTouchStart as unknown as EventListener, { passive: false });
    window.addEventListener('touchmove', handleTouchMove as unknown as EventListener, { passive: false });
    window.addEventListener('touchend', handleTouchEnd as EventListener);

    return () => {
      window.removeEventListener('wheel', handleWheel as unknown as EventListener);
      window.removeEventListener('scroll', handleScroll as EventListener);
      window.removeEventListener('touchstart', handleTouchStart as unknown as EventListener);
      window.removeEventListener('touchmove', handleTouchMove as unknown as EventListener);
      window.removeEventListener('touchend', handleTouchEnd as EventListener);
    };
  }, [scrollProgress, mediaFullyExpanded, touchStartY]);

  useEffect(() => {
    const check = () => setIsMobileState(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const mediaWidth = 300 + scrollProgress * (isMobileState ? 650 : 1250);
  const mediaHeight = 400 + scrollProgress * (isMobileState ? 200 : 400);
  const textTranslateX = scrollProgress * (isMobileState ? 180 : 150);
  const firstWord = title ? title.split(' ')[0] : '';
  const restOfTitle = title ? title.split(' ').slice(1).join(' ') : '';

  const images = slideshowImages.length > 0 ? slideshowImages : [mediaSrc];

  return (
    <div ref={sectionRef} className='transition-colors duration-700 ease-in-out overflow-x-hidden'>
      <section className='relative flex flex-col items-center justify-start min-h-[100dvh]'>
        <div className='relative w-full flex flex-col items-center min-h-[100dvh]'>

          {/* Background — blurred country photo */}
          <motion.div
            className='absolute inset-0 z-0 h-full'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 - scrollProgress }}
            transition={{ duration: 0.1 }}
          >
            <img
              src={bgImageSrc}
              alt='Background'
              className='w-screen h-screen'
              style={{ objectFit: 'cover', objectPosition: 'center', filter: 'blur(0px) brightness(0.55)' }}
            />
            <div className='absolute inset-0' style={{
              background: `linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.5) 100%)`
            }} />
          </motion.div>

          <div className='container mx-auto flex flex-col items-center justify-start relative z-10'>
            <div className='flex flex-col items-center justify-center w-full h-[100dvh] relative'>

              {/* Media card — slideshow */}
              <div
                className='absolute z-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-none rounded-2xl overflow-hidden'
                style={{
                  width: `${mediaWidth}px`,
                  height: `${mediaHeight}px`,
                  maxWidth: '95vw',
                  maxHeight: '85vh',
                  boxShadow: `0px 0px 80px ${countryAccent}30, 0px 0px 30px rgba(0,0,0,0.5)`,
                }}
              >
                {/* Crossfading slideshow */}
                <div className='relative w-full h-full'>
                  <AnimatePresence mode='wait'>
                    <motion.img
                      key={slideIndex}
                      src={images[slideIndex]}
                      alt={title || 'Country scene'}
                      className='absolute inset-0 w-full h-full object-cover'
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 1.2, ease: 'easeInOut' }}
                    />
                  </AnimatePresence>

                  {/* Warm gradient overlay */}
                  <div className='absolute inset-0' style={{
                    background: `linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 60%)`,
                    mixBlendMode: 'multiply'
                  }} />

                  {/* Country accent glow at bottom */}
                  <div className='absolute bottom-0 left-0 right-0 h-32' style={{
                    background: `linear-gradient(to top, ${countryAccent}20, transparent)`
                  }} />

                  {/* Slide dots */}
                  {images.length > 1 && (
                    <div className='absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10'>
                      {images.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setSlideIndex(i)}
                          className='transition-all duration-300'
                          style={{
                            width: i === slideIndex ? '20px' : '6px',
                            height: '6px',
                            borderRadius: '3px',
                            background: i === slideIndex ? countryAccent : 'rgba(255,255,255,0.4)',
                            border: 'none',
                            cursor: 'pointer',
                          }}
                        />
                      ))}
                    </div>
                  )}

                  <motion.div
                    className='absolute inset-0'
                    initial={{ opacity: 0.3 }}
                    animate={{ opacity: 0.2 - scrollProgress * 0.15 }}
                    transition={{ duration: 0.2 }}
                    style={{ background: 'rgba(0,0,0,0.1)' }}
                  />
                </div>
              </div>

              {/* Title text */}
              <div className={`flex items-center justify-center text-center gap-4 w-full relative z-10 transition-none flex-col ${textBlend ? 'mix-blend-difference' : 'mix-blend-normal'}`}>
                <motion.h2
                  className='font-display italic text-5xl md:text-6xl lg:text-7xl text-white transition-none drop-shadow-2xl'
                  style={{ transform: `translateX(-${textTranslateX}vw)`, fontFamily: "'Playfair Display', serif", textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}
                >
                  {firstWord}
                </motion.h2>
                <motion.h2
                  className='font-display italic text-5xl md:text-6xl lg:text-7xl text-center text-white transition-none drop-shadow-2xl'
                  style={{ transform: `translateX(${textTranslateX}vw)`, fontFamily: "'Playfair Display', serif", textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}
                >
                  {restOfTitle}
                </motion.h2>
              </div>

              {/* Scroll hint */}
              {scrollToExpand && !mediaFullyExpanded && (
                <motion.div
                  className='absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10'
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <p className='font-handwrite text-white/70 text-lg' style={{ fontFamily: "'Caveat', cursive" }}>{scrollToExpand}</p>
                  <div style={{ width: 1, height: 32, background: `linear-gradient(to bottom, ${countryAccent}, transparent)` }} />
                </motion.div>
              )}
            </div>

            <motion.section
              className='flex flex-col w-full px-8 py-10 md:px-16 lg:py-20'
              initial={{ opacity: 0 }}
              animate={{ opacity: showContent ? 1 : 0 }}
              transition={{ duration: 0.7 }}
            >
              {children}
            </motion.section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollExpandMedia;
