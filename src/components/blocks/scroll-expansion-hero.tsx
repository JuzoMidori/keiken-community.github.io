'use client';

import {
  useEffect,
  useRef,
  useState,
  ReactNode,
  TouchEvent,
  WheelEvent,
} from 'react';
import { motion } from 'framer-motion';

interface ScrollExpandMediaProps {
  mediaType?: 'video' | 'image';
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  title?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  children?: ReactNode;
  countryAccent?: string;
}

const ScrollExpandMedia = ({
  mediaType = 'video',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
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
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setScrollProgress(0);
    setShowContent(false);
    setMediaFullyExpanded(false);
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [mediaSrc]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (mediaFullyExpanded && e.deltaY < 0 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const newProgress = Math.min(Math.max(scrollProgress + e.deltaY * 0.0009, 0), 1);
        setScrollProgress(newProgress);
        if (newProgress >= 1) { setMediaFullyExpanded(true); setShowContent(true); }
        else if (newProgress < 0.75) setShowContent(false);
      }
    };
    const handleTouchStart = (e: TouchEvent) => setTouchStartY(e.touches[0].clientY);
    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartY) return;
      const deltaY = touchStartY - e.touches[0].clientY;
      if (mediaFullyExpanded && deltaY < -20 && window.scrollY <= 5) {
        setMediaFullyExpanded(false); e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const newProgress = Math.min(Math.max(scrollProgress + deltaY * (deltaY < 0 ? 0.008 : 0.005), 0), 1);
        setScrollProgress(newProgress);
        if (newProgress >= 1) { setMediaFullyExpanded(true); setShowContent(true); }
        else if (newProgress < 0.75) setShowContent(false);
        setTouchStartY(e.touches[0].clientY);
      }
    };
    const handleTouchEnd = () => setTouchStartY(0);
    const handleScroll = () => { if (!mediaFullyExpanded) window.scrollTo(0, 0); };

    window.addEventListener('wheel', handleWheel as unknown as EventListener, { passive: false });
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('touchstart', handleTouchStart as unknown as EventListener, { passive: false });
    window.addEventListener('touchmove', handleTouchMove as unknown as EventListener, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);
    return () => {
      window.removeEventListener('wheel', handleWheel as unknown as EventListener);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart as unknown as EventListener);
      window.removeEventListener('touchmove', handleTouchMove as unknown as EventListener);
      window.removeEventListener('touchend', handleTouchEnd);
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
  const firstWord = title?.split(' ')[0] || '';
  const restOfTitle = title?.split(' ').slice(1).join(' ') || '';

  return (
    <div ref={sectionRef} className='overflow-x-hidden'>
      <section className='relative flex flex-col items-center justify-start min-h-[100dvh]'>
        <div className='relative w-full flex flex-col items-center min-h-[100dvh]'>

          {/* Background */}
          <motion.div
            className='absolute inset-0 z-0'
            animate={{ opacity: 1 - scrollProgress }}
            transition={{ duration: 0.1 }}
          >
            <img
              src={bgImageSrc}
              alt=''
              className='w-screen h-screen object-cover object-center'
              style={{ filter: 'brightness(0.5)' }}
            />
            <div className='absolute inset-0' style={{
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.45) 100%)'
            }} />
          </motion.div>

          <div className='container mx-auto flex flex-col items-center justify-start relative z-10'>
            <div className='flex flex-col items-center justify-center w-full h-[100dvh] relative'>

              {/* Video card */}
              <div
                className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl overflow-hidden'
                style={{
                  width: `${mediaWidth}px`,
                  height: `${mediaHeight}px`,
                  maxWidth: '95vw',
                  maxHeight: '85vh',
                  boxShadow: `0 0 80px ${countryAccent}35, 0 0 30px rgba(0,0,0,0.6)`,
                }}
              >
                {mediaType === 'video' ? (
                  <video
                    ref={videoRef}
                    src={mediaSrc}
                    poster={posterSrc}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className='w-full h-full object-cover'
                  />
                ) : (
                  <img src={mediaSrc} alt={title} className='w-full h-full object-cover' />
                )}
                {/* Gradient overlay on video */}
                <div className='absolute inset-0' style={{
                  background: `linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 50%)`,
                }} />
                {/* Accent glow */}
                <div className='absolute bottom-0 left-0 right-0 h-24' style={{
                  background: `linear-gradient(to top, ${countryAccent}18, transparent)`
                }} />
              </div>

              {/* Title */}
              <div className={`flex items-center justify-center text-center gap-4 w-full relative z-10 flex-col ${textBlend ? 'mix-blend-difference' : ''}`}>
                <motion.h2
                  className='text-5xl md:text-6xl lg:text-7xl text-white drop-shadow-2xl'
                  style={{
                    transform: `translateX(-${textTranslateX}vw)`,
                    fontFamily: "'Playfair Display', serif",
                    fontStyle: 'italic',
                    textShadow: '0 2px 24px rgba(0,0,0,0.6)',
                  }}
                >
                  {firstWord}
                </motion.h2>
                <motion.h2
                  className='text-5xl md:text-6xl lg:text-7xl text-white drop-shadow-2xl'
                  style={{
                    transform: `translateX(${textTranslateX}vw)`,
                    fontFamily: "'Playfair Display', serif",
                    fontStyle: 'italic',
                    textShadow: '0 2px 24px rgba(0,0,0,0.6)',
                  }}
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
                  <p style={{ fontFamily: "'Caveat', cursive", color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem' }}>
                    {scrollToExpand}
                  </p>
                  <div style={{ width: 1, height: 32, background: `linear-gradient(to bottom, ${countryAccent}, transparent)` }} />
                </motion.div>
              )}
            </div>

            <motion.section
              className='flex flex-col w-full px-8 py-10 md:px-16 lg:py-20'
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
