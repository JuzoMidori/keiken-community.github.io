'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import {
  GraduationCap,
  Globe,
  Users,
  Award,
  BookOpen,
  Calendar,
  FileText,
  Plane,
  Home,
  Heart,
  MessageCircle,
  Download,
  Clock,
  CheckCircle,
  ChevronRight,
  ChevronDown,
  ExternalLink,
  Send,
  ArrowRight,
  Play,
  Star,
  Zap,
  Shield,
  Sparkles,
} from 'lucide-react';

// Custom Instagram icon since it's not in lucide-react
const InstagramIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} viewBox='0 0 24 24' fill='currentColor'>
    <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z'/>
  </svg>
);
import ScrollExpandMedia from '@/components/blocks/scroll-expansion-hero';
import { TextRotate } from '@/components/ui/text-rotate';
import IntroAnimation from '@/components/ui/scroll-morph-hero';

const DISCORD_LINK = 'https://discord.gg/CHadqf8PZJ';
const INSTAGRAM_LINK = 'https://www.instagram.com/keikenstudyabroad/';

// Videos for each country
// Direct MP4 videos — no YouTube branding, autoplay cleanly
const JAPAN_VIDEO = 'https://videos.pexels.com/video-files/2169880/2169880-uhd_2560_1440_30fps.mp4';
const KOREA_VIDEO = 'https://videos.pexels.com/video-files/5474822/5474822-uhd_2560_1440_30fps.mp4';
const CHINA_VIDEO = 'https://videos.pexels.com/video-files/3843435/3843435-uhd_2560_1440_25fps.mp4';

// Background images
const JAPAN_BG = 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1920&q=80';
const KOREA_BG = 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=1920&q=80';
const CHINA_BG = 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=1920&q=80';

// High quality country images for cards
const COUNTRY_IMAGES = {
  japan: [
    'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80',
    'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80',
    'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=600&q=80',
    'https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=600&q=80',
    'https://images.unsplash.com/photo-1551641506-ee5bf4cb45f1?w=600&q=80',
    'https://images.unsplash.com/photo-1576675466969-5aaf2cdba982?w=600&q=80',
  ],
  korea: [
    'https://images.unsplash.com/photo-1538485399081-7191377e8241?w=600&q=80',
    'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=600&q=80',
    'https://images.unsplash.com/photo-1548013146-72479768bada?w=600&q=80',
    'https://images.unsplash.com/photo-1590107076492-2e8d32c4c4e6?w=600&q=80',
    'https://images.unsplash.com/photo-1518635017498-87f514b751ba?w=600&q=80',
    'https://images.unsplash.com/photo-1604999565976-8913ad2ddb7c?w=600&q=80',
  ],
  china: [
    'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=600&q=80',
    'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=600&q=80',
    'https://images.unsplash.com/photo-1537531383496-f4749b8032cf?w=600&q=80',
    'https://images.unsplash.com/photo-1542640244-7e672d6cef4e?w=600&q=80',
    'https://images.unsplash.com/photo-1529921879218-f99546d03a24?w=600&q=80',
    'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=600&q=80',
  ],
};

// Scholarship data with comprehensive information
const SCHOLARSHIP_DATA = {
  japan: {
    name: 'Japan',
    flag: '🇯🇵',
    video: JAPAN_VIDEO,
    bg: JAPAN_BG,
    title: 'Study in Japan',
    subtitle: 'Experience ancient traditions and cutting-edge technology',
    scholarships: [
      {
        name: 'MEXT Scholarship',
        fullName: 'Monbukagakusho Scholarship',
        description: 'The prestigious Japanese government scholarship for international students covering full tuition, monthly allowance (¥117,000+), and round-trip airfare.',
        eligibility: ['High school diploma for undergrad', 'Bachelor\'s degree for graduate', 'Valid passport', 'Nationality requirement'],
        benefits: ['Full tuition waiver', 'Monthly stipend ¥117,000', 'Round-trip airfare', 'Settlement allowance'],
        deadline: 'Typically May-June for the following year',
        url: 'https://www.studyinjapan.go.jp/en/scholarship/',
        color: '#FFA796',
        icon: GraduationCap,
        status: 'Popular',
      },
      {
        name: 'JASSO Scholarship',
        fullName: 'Japan Student Services Organization',
        description: 'Offered to international students with excellent academic records. Short-term and long-term options available.',
        eligibility: ['Enrolled at Japanese university', 'Good academic standing', 'Financial need'],
        benefits: ['¥30,000-¥48,000/month', 'Tuition assistance', 'Travel support'],
        deadline: 'Varies by university',
        url: 'https://www.jasso.go.jp/',
        color: '#BCD4FD',
        icon: BookOpen,
        status: 'Available',
      },
      {
        name: 'Fulbright Japan',
        fullName: 'Fulbright Japan-US Exchange Program',
        description: 'Exchange program for US citizens to study, research, or teach in Japan.',
        eligibility: ['US citizenship', 'Bachelor\'s degree minimum', 'English proficiency'],
        benefits: ['Round-trip airfare', 'Monthly living stipend', 'Tuition waiver'],
        deadline: 'Varies by program',
        url: 'https://fulbright.jp/',
        color: '#C9C1FF',
        icon: Globe,
        status: 'Competitive',
      },
      {
        name: 'Rotary Peace Fellowship',
        fullName: 'Rotary International Peace Fellowship',
        description: 'For students seeking to study peace and conflict resolution at Rotary Centers worldwide.',
        eligibility: ['Bachelor\'s degree', 'Proven peace career interest', 'Leadership experience'],
        benefits: ['Full funding', 'Master\'s degree', 'Global network'],
        deadline: 'May 31 annually',
        url: 'https://www.rotary.org/en/peace-fellowships',
        color: '#91B394',
        icon: Shield,
        status: 'Prestigious',
      },
      {
        name: 'YASATO Scholarship',
        fullName: 'Youth Association for Academic Training Opportunities',
        description: 'Private scholarship supporting international students in Japan with housing and living support.',
        eligibility: ['Enrolled in Japanese university', 'Under 30 years old', 'Academic excellence'],
        benefits: ['¥100,000/month', 'Housing assistance', 'Mentorship program'],
        deadline: 'Rolling admission',
        url: 'https://yasato.org/',
        color: '#E3C0A9',
        icon: Star,
        status: 'Emerging',
      },
      {
        name: 'ADB Japan Scholarship',
        fullName: 'Asian Development Bank - Japan Scholarship',
        description: 'Scholarship for students from ADB developing member countries to study in Japan.',
        eligibility: ['Citizen of ADB developing member', 'Bachelor\'s degree', '2+ years work experience'],
        benefits: ['Full tuition', 'Monthly allowance', 'Airfare', 'Health insurance'],
        deadline: 'Varies by university',
        url: 'https://www.adb.org/work-with-us/scholarships',
        color: '#59E7CA',
        icon: Award,
        status: 'Exclusive',
      },
    ],
    exams: [
      { name: 'JLPT', fullName: 'Japanese-Language Proficiency Test', levels: 'N1-N5', url: 'https://www.jlpt.jp/' },
      { name: 'EJU', fullName: 'Examination for Japanese University', subjects: 'Japanese, Science, Japan/Int\'l Affairs', url: 'https://www.uacec.jp/en/' },
      { name: 'NAT-TEST', fullName: 'Japanese Language NAT-TEST', levels: '5Q-1Q', url: 'https://www.nat-test.com/' },
    ],
    universities: ['University of Tokyo', 'Kyoto University', 'Osaka University', 'Tohoku University', 'Tokyo Institute of Technology', 'Waseda University', 'Keio University'],
  },
  korea: {
    name: 'Korea',
    flag: '🇰🇷',
    video: KOREA_VIDEO,
    bg: KOREA_BG,
    title: 'Study in Korea',
    subtitle: 'K-culture meets world-class education',
    scholarships: [
      {
        name: 'GKS Scholarship',
        fullName: 'Global Korea Scholarship',
        description: 'Korean government scholarship for international students covering tuition, living allowance, language training, and airfare.',
        eligibility: ['Non-Korean citizenship', 'Under 40 years old (grad)', 'GPA requirement 80%+', 'Health check required'],
        benefits: ['Full tuition waiver', '₩200,000/month allowance', 'Language training (1 year)', 'Round-trip airfare', 'Settlement allowance'],
        deadline: 'March-April for fall semester',
        url: 'https://www.studyinkorea.go.kr/en/sub/scholarship/info detail/detail.do?schSeq=5',
        color: '#C9C1FF',
        icon: GraduationCap,
        status: 'Most Popular',
      },
      {
        name: 'POSCO Scholarship',
        fullName: 'POSCO Asia Fellowship',
        description: 'Scholarship for students from developing Asian countries to study in Korea.',
        eligibility: ['Citizen of developing Asian country', 'Under 35 years', 'GPA 80%+'],
        benefits: ['Full tuition', '₩800,000/month', 'Airfare', 'Korean language training'],
        deadline: 'March annually',
        url: 'https://www.poscoyoll.com/',
        color: '#BCD4FD',
        icon: Globe,
        status: 'Prestigious',
      },
      {
        name: 'Korean Government Scholarship',
        fullName: 'KGSP - Korean Government Scholarship Program',
        description: 'Same as GKS but through embassy track. Available for undergrad and graduate programs.',
        eligibility: ['GPA requirement varies', 'Must pass embassy interview', 'Korean language proficiency'],
        benefits: ['Full tuition', 'Monthly stipend', 'Airfare', 'Resettlement allowance'],
        deadline: 'March-April',
        url: 'https://www.studyinkorea.go.kr/',
        color: '#FFA796',
        icon: Award,
        status: 'Comprehensive',
      },
      {
        name: 'Samsung Scholarship',
        fullName: 'Samsung Dream Scholarship',
        description: 'Private scholarship by Samsung supporting students with tuition and living expenses.',
        eligibility: ['Korean residency', 'GPA top 30%', 'Financial need priority'],
        benefits: ['₩500,000/month', 'Tuition support', 'Mentoring program'],
        deadline: 'March, September',
        url: 'https://www.samsungscholarship.kr/',
        color: '#91B394',
        icon: Star,
        status: 'Corporate',
      },
      {
        name: 'KFL Scholarship',
        fullName: 'Korean Friendship League Scholarship',
        description: 'Supporting international students learning Korean language and culture.',
        eligibility: ['TOPIK level 2+', 'Enrolled in Korean university', 'Cultural activities participation'],
        benefits: ['₩300,000/month', 'Language course fee waiver', 'Cultural program access'],
        deadline: 'Rolling',
        url: 'https://www.kfl.or.kr/',
        color: '#E3C0A9',
        icon: Heart,
        status: 'Culture',
      },
      {
        name: ' Otis Booyem',
        fullName: 'Otis Booyem Freedom Scholarship',
        description: 'Scholarship for students from developing countries to study in Korea.',
        eligibility: ['From developing country', 'Bachelor\'s degree', 'Recommendation letter'],
        benefits: ['Full funding', 'Monthly allowance', 'Airfare', 'Health insurance'],
        deadline: 'Varies',
        url: 'https://www.otisbooyem.org/',
        color: '#59E7CA',
        icon: Shield,
        status: 'International',
      },
    ],
    exams: [
      { name: 'TOPIK', fullName: 'Test of Proficiency in Korean', levels: '1-6', url: 'https://www.topik.go.kr/' },
      { name: 'KLAT', fullName: 'Korean Language Aptitude Test', purpose: 'For non-native speakers', url: 'http://www.klat.or.kr/' },
    ],
    universities: ['Seoul National University', 'KAIST', 'Korea University', 'Yonsei University', 'POSTECH', 'Sungkyunkwan University', 'Hanyang University'],
  },
  china: {
    name: 'China',
    flag: '🇨🇳',
    video: CHINA_VIDEO,
    bg: CHINA_BG,
    title: 'Study in China',
    subtitle: '5,000 years of history meets modern innovation',
    scholarships: [
      {
        name: 'CSC Scholarship',
        fullName: 'China Scholarship Council',
        description: 'Comprehensive Chinese government scholarship for international students covering tuition, living allowance, and accommodation.',
        eligibility: ['Non-Chinese citizenship', 'Age limits vary by program', 'GPA requirement', 'Health check'],
        benefits: ['Full tuition waiver', '¥2,500-3,500/month', 'Free dormitory or housing allowance', 'Medical insurance', 'Airfare (one-way)'],
        deadline: 'Varies by university (typically Jan-April)',
        url: 'http://www.csc.edu.cn/',
        color: '#BCD4FD',
        icon: GraduationCap,
        status: 'Most Popular',
      },
      {
        name: 'Confucius Institute Scholarship',
        fullName: 'Confucius Institute Scholarship',
        description: 'For students interested in Chinese language, culture, and Confucius Institute programs.',
        eligibility: ['Chinese language proficiency', 'HSK score requirement', 'Cultural exchange interest'],
        benefits: ['Tuition waiver', 'Living allowance', 'Accommodation', 'Textbooks'],
        deadline: 'March annually',
        url: 'https://cis.chinese.cn/',
        color: '#FFA796',
        icon: BookOpen,
        status: 'Language',
      },
      {
        name: 'Belt & Road Scholarship',
        fullName: 'Belt and Road Initiative Scholarship',
        description: 'Special scholarship for students from countries along the Belt and Road route.',
        eligibility: ['From B&R country', 'GPA requirement', 'Recommendation required'],
        benefits: ['Full tuition', '¥2,000-3,000/month', 'Free accommodation', 'Airfare support'],
        deadline: 'Varies',
        url: 'http://www.csc.edu.cn/',
        color: '#C9C1FF',
        icon: Globe,
        status: 'Strategic',
      },
      {
        name: 'Shanghai Government Scholarship',
        fullName: 'Shanghai Municipal Government Scholarship',
        description: 'For international students studying at Shanghai universities.',
        eligibility: ['Admitted to Shanghai university', 'Good academic record', 'HSK 4+ for Chinese programs'],
        benefits: ['¥10,000-30,000/year', 'Tuition reduction', 'Living support'],
        deadline: 'Varies by university',
        url: 'https://www.shedutech.com/',
        color: '#91B394',
        icon: Award,
        status: 'Regional',
      },
      {
        name: 'Beijing International Scholarship',
        fullName: 'Beijing Government Scholarship',
        description: 'For students studying at universities in Beijing.',
        eligibility: ['Enrolled in Beijing university', 'Academic excellence', 'HSK certificate'],
        benefits: ['¥40,000-80,000/year', 'Tuition waiver options', 'Living stipend'],
        deadline: 'Varies',
        url: 'http://www.beijing.gov.cn/',
        color: '#E3C0A9',
        icon: Star,
        status: 'City',
      },
      {
        name: 'Chinese University Scholarship',
        fullName: 'University-specific Chinese Scholarships',
        description: 'Individual scholarships offered by Chinese universities for international students.',
        eligibility: ['Varies by university', 'Direct application to university'],
        benefits: ['Full/partial tuition', 'Living allowance', 'Research funding (grad)'],
        deadline: 'Varies by university',
        url: 'Check individual university websites',
        color: '#59E7CA',
        icon: Shield,
        status: 'University',
      },
    ],
    exams: [
      { name: 'HSK', fullName: 'Hanyu Shuiping Kaoshi', levels: '1-6', url: 'http://www.chinesetest.cn/' },
      { name: 'YCT', fullName: 'Youth Chinese Test', levels: '1-4', url: 'http://www.chinesetest.cn/' },
    ],
    universities: ['Tsinghua University', 'Peking University', 'Fudan University', 'Zhejiang University', 'Shanghai Jiao Tong', 'Nanjing University', 'Wuhan University'],
  },
};

// Main Demo Component
const Demo = () => {
  const [activeCountry, setActiveCountry] = useState<'japan' | 'korea' | 'china'>('japan');
  const [expandedScholarship, setExpandedScholarship] = useState<string | null>(null);
  const [showTimeline, setShowTimeline] = useState(false);
  const [activeView, setActiveView] = useState<'hero' | 'scholarships' | 'resources'>('hero');

  const currentData = SCHOLARSHIP_DATA[activeCountry];

  // Reset expanded card when switching countries
  useEffect(() => {
    setExpandedScholarship(null);
  }, [activeCountry]);

  // Scroll to section helper
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className='min-h-screen bg-[#0a0a0a]'>
      {/* Navigation */}
      <nav className='fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-white/10'>
        <div className='max-w-7xl mx-auto px-4 py-4 flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <span className='font-serif text-xl text-white'>Keiken</span>
            <span className='text-xs text-white/50'>経験</span>
          </div>

          <div className='hidden md:flex items-center gap-6'>
            <button onClick={() => { setActiveView('hero'); scrollToSection('hero'); }} className='text-white/60 hover:text-white text-sm transition-colors'>Home</button>
            <button onClick={() => { setActiveView('scholarships'); scrollToSection('scholarships'); }} className='text-white/60 hover:text-white text-sm transition-colors'>Scholarships</button>
            <button onClick={() => { setActiveView('resources'); scrollToSection('resources'); }} className='text-white/60 hover:text-white text-sm transition-colors'>Resources</button>
            <a href={DISCORD_LINK} target='_blank' rel='noopener noreferrer' className='text-white/60 hover:text-white text-sm transition-colors flex items-center gap-1'>
              <MessageCircle className='w-4 h-4' /> Community
            </a>
          </div>

          <div className='flex items-center gap-3'>
            <a href={INSTAGRAM_LINK} target='_blank' rel='noopener noreferrer' className='text-white/60 hover:text-white transition-colors'>
              <InstagramIcon className='w-5 h-5' />
            </a>
            <a href={DISCORD_LINK} target='_blank' rel='noopener noreferrer' className='bg-white text-black px-4 py-2 rounded-full text-xs font-medium hover:bg-white/90 transition-colors flex items-center gap-2'>
              <svg width='14' height='14' viewBox='0 0 24 24' fill='currentColor'>
                <path d='M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z'/>
              </svg>
              Join
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id='hero' className='min-h-screen'>
        <ScrollExpandMedia
          mediaType='video'
          mediaSrc={currentData.video}
          bgImageSrc={currentData.bg}
          title={`${currentData.name} Dreams`}
          date={currentData.flag}
          scrollToExpand='Scroll to Explore'
        >
          <div className='max-w-4xl mx-auto'>
            <h2 className='text-3xl md:text-4xl font-bold mb-4 text-white'>
              {currentData.title}
            </h2>
            <p className='text-lg text-white/70 mb-8'>
              {currentData.subtitle}
            </p>

            {/* Country Selector */}
            <div className='flex flex-wrap gap-3 mb-8'>
              {(['japan', 'korea', 'china'] as const).map((country) => (
                <button
                  key={country}
                  onClick={() => setActiveCountry(country)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                    activeCountry === country
                      ? 'bg-white text-black'
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                >
                  <span>{SCHOLARSHIP_DATA[country].flag}</span>
                  <span>{SCHOLARSHIP_DATA[country].name}</span>
                </button>
              ))}
            </div>

            {/* Quick Stats */}
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-8'>
              <div className='p-4 bg-white/5 rounded-xl border border-white/10'>
                <div className='text-2xl font-bold text-white'>18</div>
                <div className='text-xs text-white/50'>Scholarships</div>
              </div>
              <div className='p-4 bg-white/5 rounded-xl border border-white/10'>
                <div className='text-2xl font-bold text-white'>6</div>
                <div className='text-xs text-white/50'>Language Tests</div>
              </div>
              <div className='p-4 bg-white/5 rounded-xl border border-white/10'>
                <div className='text-2xl font-bold text-white'>24+</div>
                <div className='text-xs text-white/50'>Universities</div>
              </div>
              <div className='p-4 bg-white/5 rounded-xl border border-white/10'>
                <div className='text-2xl font-bold text-white'>100%</div>
                <div className='text-xs text-white/50'>Free Resources</div>
              </div>
            </div>

            {/* CTA */}
            <div className='flex flex-wrap gap-4'>
              <a href={DISCORD_LINK} target='_blank' rel='noopener noreferrer' className='inline-flex items-center gap-2 bg-white text-black px-6 py-3 text-sm font-medium rounded-full hover:bg-white/90 transition-colors'>
                <MessageCircle className='w-4 h-4' />
                Join Community
              </a>
              <button onClick={() => { setActiveView('scholarships'); scrollToSection('scholarships'); }} className='inline-flex items-center gap-2 bg-white/10 text-white px-6 py-3 text-sm font-medium rounded-full hover:bg-white/20 transition-colors'>
                View Scholarships
                <ChevronRight className='w-4 h-4' />
              </button>
            </div>
          </div>
        </ScrollExpandMedia>
      </section>

      {/* Scholarships Section */}
      <section id='scholarships' className='py-20 px-4 bg-[#0d0d0d]'>
        <div className='max-w-6xl mx-auto'>
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='text-center mb-12'
          >
            <span className='text-xs tracking-[0.3em] text-white/40 uppercase'>Scholarships</span>
            <h2 className='font-serif text-4xl md:text-6xl text-white mt-4'>
              <TextRotate
                texts={['Japan', 'Korea', 'China']}
                mainClassName='text-white px-2'
                staggerFrom='last'
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName='overflow-hidden pb-1'
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={3000}
              />
              <br />
              <span className='text-white/80'>Scholarships</span>
            </h2>
          </motion.div>

          {/* Country Tabs */}
          <div className='flex justify-center gap-4 mb-12'>
            {(['japan', 'korea', 'china'] as const).map((country) => (
              <button
                key={country}
                onClick={() => setActiveCountry(country)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                  activeCountry === country
                    ? 'bg-white text-black'
                    : 'bg-white/10 text-white/60 hover:bg-white/20'
                }`}
              >
                <span>{SCHOLARSHIP_DATA[country].flag}</span>
                <span>{SCHOLARSHIP_DATA[country].name}</span>
              </button>
            ))}
          </div>

          {/* Scholarship Cards */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {currentData.scholarships.map((scholarship, index) => (
              <motion.div
                key={scholarship.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className='bg-white/5 rounded-2xl border border-white/10 overflow-hidden hover:border-white/20 transition-colors'
              >
                <div className='p-6'>
                  <div className='flex items-center justify-between mb-4'>
                    <div className='flex items-center gap-3'>
                      <div
                        className='w-10 h-10 rounded-full flex items-center justify-center'
                        style={{ backgroundColor: scholarship.color + '20' }}
                      >
                        <scholarship.icon className='w-5 h-5' style={{ color: scholarship.color }} />
                      </div>
                      <div>
                        <h3 className='text-white font-medium'>{scholarship.name}</h3>
                        <span className='text-xs text-white/50'>{scholarship.status}</span>
                      </div>
                    </div>
                  </div>

                  <p className='text-white/60 text-sm mb-4 line-clamp-3'>
                    {scholarship.description}
                  </p>

                  {/* Benefits Preview */}
                  <div className='flex flex-wrap gap-2 mb-4'>
                    {scholarship.benefits.slice(0, 3).map((benefit, i) => (
                      <span key={i} className='text-xs bg-white/5 px-2 py-1 rounded text-white/50'>
                        {benefit}
                      </span>
                    ))}
                    {scholarship.benefits.length > 3 && (
                      <span className='text-xs text-white/30'>+{scholarship.benefits.length - 3} more</span>
                    )}
                  </div>

                  <button
                    onClick={() => setExpandedScholarship(
                      expandedScholarship === `${activeCountry}-${index}` ? null : `${activeCountry}-${index}`
                    )}
                    className='w-full text-white/60 hover:text-white text-sm flex items-center justify-center gap-1 py-2 border-t border-white/5'
                  >
                    {expandedScholarship === `${activeCountry}-${index}` ? 'Show Less' : 'Learn More'}
                    <ChevronDown className={`w-4 h-4 transition-transform ${expandedScholarship === `${activeCountry}-${index}` ? 'rotate-180' : ''}`} />
                  </button>
                </div>

                {/* Expanded Content */}
                <AnimatePresence>
                  {expandedScholarship === `${activeCountry}-${index}` && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className='px-6 pb-6 space-y-4'
                    >
                      <div>
                        <h4 className='text-xs uppercase tracking-wider text-white/40 mb-2'>Eligibility</h4>
                        <ul className='space-y-1'>
                          {scholarship.eligibility.map((req, i) => (
                            <li key={i} className='text-sm text-white/60 flex items-start gap-2'>
                              <CheckCircle className='w-3 h-3 mt-0.5 text-green-400 flex-shrink-0' />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className='text-xs uppercase tracking-wider text-white/40 mb-2'>Benefits</h4>
                        <ul className='space-y-1'>
                          {scholarship.benefits.map((benefit, i) => (
                            <li key={i} className='text-sm text-white/60 flex items-start gap-2'>
                              <Star className='w-3 h-3 mt-0.5 text-yellow-400 flex-shrink-0' />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className='flex items-center gap-2 pt-2 border-t border-white/5'>
                        <Clock className='w-3 h-3 text-white/40' />
                        <span className='text-xs text-white/40'>{scholarship.deadline}</span>
                      </div>

                      <a
                        href={scholarship.url}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='inline-flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full text-xs font-medium hover:bg-white/90 transition-colors'
                      >
                        Official Website
                        <ExternalLink className='w-3 h-3' />
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section id='resources' className='py-20 px-4 bg-black'>
        <div className='max-w-6xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='text-center mb-12'
          >
            <span className='text-xs tracking-[0.3em] text-white/40 uppercase'>Resources</span>
            <h2 className='font-serif text-4xl md:text-6xl text-white mt-4'>
              Everything You Need
            </h2>
          </motion.div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {[
              { icon: FileText, title: 'Exam Archives', desc: 'JLPT, TOPIK, HSK, EJU past papers', color: '#BCD4FD' },
              { icon: Calendar, title: 'Deadlines', desc: 'Auto-updated scholarship deadlines', color: '#FFA796' },
              { icon: MessageCircle, title: 'Community Q&A', desc: 'Get answers from real students', color: '#C9C1FF' },
              { icon: Download, title: 'Application Docs', desc: 'Templates, essays, recommendations', color: '#91B394' },
              { icon: Users, title: 'School Finder', desc: 'Find others going to your university', color: '#E3C0A9' },
              { icon: Plane, title: 'Visa Guide', desc: 'Step-by-step visa application help', color: '#59E7CA' },
              { icon: Home, title: 'Housing Tips', desc: 'Finding accommodation abroad', color: '#C9C1FF' },
              { icon: Heart, title: 'Cultural Guides', desc: 'What to expect when you arrive', color: '#FFA796' },
            ].map((resource, index) => (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className='p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-white/20 transition-colors group cursor-pointer'
              >
                <resource.icon className='w-8 h-8 mb-4' style={{ color: resource.color }} />
                <h3 className='text-white font-medium mb-2'>{resource.title}</h3>
                <p className='text-white/50 text-sm'>{resource.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className='py-20 px-4 bg-[#0d0d0d]'>
        <div className='max-w-4xl mx-auto text-center'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className='text-xs tracking-[0.3em] text-white/40 uppercase'>Community</span>
            <h2 className='font-serif text-4xl md:text-6xl text-white mt-4 mb-6'>
              Join Our Community
            </h2>
            <p className='text-white/60 text-lg mb-8 max-w-xl mx-auto'>
              Free resources, real advice, and a community that actually understands what you're going through.
            </p>

            <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
              <a
                href={DISCORD_LINK}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center gap-2 bg-[#5865F2] text-white px-8 py-4 rounded-full font-medium hover:bg-[#4752C4] transition-colors'
              >
                <svg width='20' height='20' viewBox='0 0 24 24' fill='currentColor'>
                  <path d='M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z'/>
                </svg>
                Join Discord
              </a>
              <a
                href={INSTAGRAM_LINK}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center gap-2 bg-white/10 text-white px-8 py-4 rounded-full font-medium hover:bg-white/20 transition-colors'
              >
                <InstagramIcon className='w-5 h-5' />
                Follow Instagram
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className='bg-black border-t border-white/10 py-12 px-4'>
        <div className='max-w-6xl mx-auto'>
          <div className='flex flex-col md:flex-row justify-between items-center gap-8'>
            <div>
              <div className='flex items-center gap-2 mb-2'>
                <span className='font-serif text-xl text-white'>Keiken</span>
                <span className='text-xs text-white/50'>経験</span>
              </div>
              <p className='text-white/40 text-sm'>
                Free forever. Community-run.
              </p>
            </div>

            <div className='flex items-center gap-6'>
              <a href={DISCORD_LINK} target='_blank' rel='noopener noreferrer' className='text-white/40 hover:text-white/70 text-sm transition-colors'>
                Discord
              </a>
              <a href={INSTAGRAM_LINK} target='_blank' rel='noopener noreferrer' className='text-white/40 hover:text-white/70 text-sm transition-colors'>
                Instagram
              </a>
              <a href='#' className='text-white/40 hover:text-white/70 text-sm transition-colors'>
                Resources
              </a>
              <a href='#' className='text-white/40 hover:text-white/70 text-sm transition-colors'>
                About
              </a>
            </div>
          </div>

          <div className='mt-8 pt-8 border-t border-white/5 text-center'>
            <p className='text-white/30 text-xs'>
              © 2024 Keiken. Made with 🌸 for students worldwide.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Demo;
