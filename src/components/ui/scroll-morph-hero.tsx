"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, useTransform, useSpring, useMotionValue } from "framer-motion";

export type AnimationPhase = "scatter" | "line" | "circle" | "bottom-strip";

interface FlipCardProps {
    src: string;
    index: number;
    total: number;
    phase: AnimationPhase;
    target: { x: number; y: number; rotation: number; scale: number; opacity: number };
}

const IMG_WIDTH = 80;
const IMG_HEIGHT = 110;

function FlipCard({
    src,
    index,
    target,
}: FlipCardProps) {
    return (
        <motion.div
            animate={{
                x: target.x,
                y: target.y,
                rotate: target.rotation,
                scale: target.scale,
                opacity: target.opacity,
            }}
            transition={{
                type: "spring",
                stiffness: 40,
                damping: 15,
            }}
            style={{
                position: "absolute",
                width: IMG_WIDTH,
                height: IMG_HEIGHT,
                transformStyle: "preserve-3d",
                perspective: "1000px",
            }}
            className="cursor-pointer group"
        >
            <motion.div
                className="relative h-full w-full"
                style={{ transformStyle: "preserve-3d" }}
                transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                whileHover={{ rotateY: 180 }}
            >
                {/* Front Face */}
                <div
                    className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-lg bg-gray-200"
                    style={{ backfaceVisibility: "hidden" }}
                >
                    <img
                        src={src}
                        alt={`hero-${index}`}
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-transparent" />
                </div>

                {/* Back Face */}
                <div
                    className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-lg bg-gray-900 flex flex-col items-center justify-center p-4 border border-gray-700"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                    <div className="text-center">
                        <p className="text-[8px] font-bold text-blue-400 uppercase tracking-widest mb-1">View</p>
                        <p className="text-xs font-medium text-white">Details</p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

const TOTAL_IMAGES = 20;
const MAX_SCROLL = 3000;

// High quality country-specific images
const IMAGES_JAPAN = [
    "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&q=80",
    "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&q=80",
    "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&q=80",
    "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=400&q=80",
    "https://images.unsplash.com/photo-1551641506-ee5bf4cb45f1?w=400&q=80",
    "https://images.unsplash.com/photo-1576675466969-5aaf2cdba982?w=400&q=80",
    "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=400&q=80",
    "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=400&q=80",
    "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=400&q=80",
    "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=400&q=80",
    "https://images.unsplash.com/photo-1532236204992-f5e85c024202?w=400&q=80",
    "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=400&q=80",
    "https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=400&q=80",
    "https://images.unsplash.com/photo-1501159770117-7218c596b3d3?w=400&q=80",
    "https://images.unsplash.com/photo-1524412508782-9c9b610b燥9?w=400&q=80",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80",
    "https://images.unsplash.com/photo-1490676154897-6ee1b0f5b9b5?w=400&q=80",
    "https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?w=400&q=80",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80",
    "https://images.unsplash.com/photo-1467226632440-65f0b4957563?w=400&q=80",
];

const IMAGES_KOREA = [
    "https://images.unsplash.com/photo-1538485399081-7191377e8241?w=400&q=80",
    "https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=400&q=80",
    "https://images.unsplash.com/photo-1502899576159-f224dc2349fa?w=400&q=80",
    "https://images.unsplash.com/photo-1518635017498-87f514b751ba?w=400&q=80",
    "https://images.unsplash.com/photo-1548013146-72479768bada?w=400&q=80",
    "https://images.unsplash.com/photo-1590107076492-2e8d32c4c4e6?w=400&q=80",
    "https://images.unsplash.com/photo-1604999565976-8913ad2ddb7c?w=400&q=80",
    "https://images.unsplash.com/photo-1612774412771-005ed8e861d4?w=400&q=80",
    "https://images.unsplash.com/photo-1566645642560-f2b2c1f3c3b9?w=400&q=80",
    "https://images.unsplash.com/photo-1580655653885-65763b2597d0?w=400&q=80",
    "https://images.unsplash.com/photo-1538669715315-155098f0fb6d?w=400&q=80",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
    "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&q=80",
    "https://images.unsplash.com/photo-1581305358199-a0ec2839179e?w=400&q=80",
    "https://images.unsplash.com/photo-1603905782189-d3262e7e0b1a?w=400&q=80",
    "https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?w=400&q=80",
    "https://images.unsplash.com/photo-1542293787938-c9e299b8c1d5?w=400&q=80",
    "https://images.unsplash.com/photo-1578643463396-0997cb5328c1?w=400&q=80",
    "https://images.unsplash.com/photo-1565967511849-76a60a516170?w=400&q=80",
    "https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=400&q=80",
];

const IMAGES_CHINA = [
    "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=400&q=80",
    "https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=400&q=80",
    "https://images.unsplash.com/photo-1537531383496-f4749b8032cf?w=400&q=80",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80",
    "https://images.unsplash.com/photo-1542640244-7e672d6cef4e?w=400&q=80",
    "https://images.unsplash.com/photo-1529921879218-f99546d03a24?w=400&q=80",
    "https://images.unsplash.com/photo-1504598318550-17eba1008a68?w=400&q=80",
    "https://images.unsplash.com/photo-1459664018906-085c36f472af?w=400&q=80",
    "https://images.unsplash.com/photo-1528164344705-47542687000d?w=400&q=80",
    "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=400&q=80",
    "https://images.unsplash.com/photo-1537531383496-f4749b8032cf?w=400&q=80",
    "https://images.unsplash.com/photo-1540611025311-01df3cef54b5?w=400&q=80",
    "https://images.unsplash.com/photo-1558862107-d49ef2a04d72?w=400&q=80",
    "https://images.unsplash.com/photo-1517164850305-99a3e65bb47e?w=400&q=80",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80",
    "https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=400&q=80",
    "https://images.unsplash.com/photo-1529921879218-f99546d03a24?w=400&q=80",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80",
    "https://images.unsplash.com/photo-1542640244-7e672d6cef4e?w=400&q=80",
    "https://images.unsplash.com/photo-1528164344705-47542687000d?w=400&q=80",
];

const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t;

interface ScrollMorphHeroProps {
  country?: 'japan' | 'korea' | 'china';
  title?: string;
  subtitle?: string;
}

export default function IntroAnimation({
  country = 'japan',
  title = 'Explore Our Vision',
  subtitle = 'Discover a world where technology meets creativity. Scroll through our curated collection of innovations designed to shape the future.'
}: ScrollMorphHeroProps) {
    const [introPhase, setIntroPhase] = useState<AnimationPhase>("scatter");
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    const images = country === 'korea' ? IMAGES_KOREA : country === 'china' ? IMAGES_CHINA : IMAGES_JAPAN;

    useEffect(() => {
        if (!containerRef.current) return;

        const handleResize = (entries: ResizeObserverEntry[]) => {
            for (const entry of entries) {
                setContainerSize({
                    width: entry.contentRect.width,
                    height: entry.contentRect.height,
                });
            }
        };

        const observer = new ResizeObserver(handleResize);
        observer.observe(containerRef.current);

        setContainerSize({
            width: containerRef.current.offsetWidth,
            height: containerRef.current.offsetHeight,
        });

        return () => observer.disconnect();
    }, []);

    const virtualScroll = useMotionValue(0);
    const scrollRef = useRef(0);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();
            const newScroll = Math.min(Math.max(scrollRef.current + e.deltaY, 0), MAX_SCROLL);
            scrollRef.current = newScroll;
            virtualScroll.set(newScroll);
        };

        let touchStartY = 0;
        const handleTouchStart = (e: TouchEvent) => {
            touchStartY = e.touches[0].clientY;
        };
        const handleTouchMove = (e: TouchEvent) => {
            const touchY = e.touches[0].clientY;
            const deltaY = touchStartY - touchY;
            touchStartY = touchY;
            const newScroll = Math.min(Math.max(scrollRef.current + deltaY, 0), MAX_SCROLL);
            scrollRef.current = newScroll;
            virtualScroll.set(newScroll);
        };

        container.addEventListener("wheel", handleWheel, { passive: false });
        container.addEventListener("touchstart", handleTouchStart, { passive: false });
        container.addEventListener("touchmove", handleTouchMove, { passive: false });

        return () => {
            container.removeEventListener("wheel", handleWheel);
            container.removeEventListener("touchstart", handleTouchStart);
            container.removeEventListener("touchmove", handleTouchMove);
        };
    }, [virtualScroll]);

    const morphProgress = useTransform(virtualScroll, [0, 600], [0, 1]);
    const smoothMorph = useSpring(morphProgress, { stiffness: 40, damping: 20 });

    const scrollRotate = useTransform(virtualScroll, [600, 3000], [0, 360]);
    const smoothScrollRotate = useSpring(scrollRotate, { stiffness: 40, damping: 20 });

    const mouseX = useMotionValue(0);
    const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 20 });

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            const relativeX = e.clientX - rect.left;
            const normalizedX = (relativeX / rect.width) * 2 - 1;
            mouseX.set(normalizedX * 100);
        };
        container.addEventListener("mousemove", handleMouseMove);
        return () => container.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX]);

    useEffect(() => {
        const timer1 = setTimeout(() => setIntroPhase("line"), 500);
        const timer2 = setTimeout(() => setIntroPhase("circle"), 2500);
        return () => { clearTimeout(timer1); clearTimeout(timer2); };
    }, []);

    const scatterPositions = useMemo(() => {
        return images.map(() => ({
            x: (Math.random() - 0.5) * 1500,
            y: (Math.random() - 0.5) * 1000,
            rotation: (Math.random() - 0.5) * 180,
            scale: 0.6,
            opacity: 0,
        }));
    }, [images]);

    const [morphValue, setMorphValue] = useState(0);
    const [rotateValue, setRotateValue] = useState(0);
    const [parallaxValue, setParallaxValue] = useState(0);

    useEffect(() => {
        const unsubscribeMorph = smoothMorph.on("change", setMorphValue);
        const unsubscribeRotate = smoothScrollRotate.on("change", setRotateValue);
        const unsubscribeParallax = smoothMouseX.on("change", setParallaxValue);
        return () => {
            unsubscribeMorph();
            unsubscribeRotate();
            unsubscribeParallax();
        };
    }, [smoothMorph, smoothScrollRotate, smoothMouseX]);

    const contentOpacity = useTransform(smoothMorph, [0.8, 1], [0, 1]);
    const contentY = useTransform(smoothMorph, [0.8, 1], [20, 0]);

    return (
        <div ref={containerRef} className="relative w-full h-full bg-[#0a0a0a] overflow-hidden">
            <div className="flex h-full w-full flex-col items-center justify-center perspective-1000">

                {/* Intro Text */}
                <div className="absolute z-0 flex flex-col items-center justify-center text-center pointer-events-none top-1/2 -translate-y-1/2">
                    <motion.h1
                        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                        animate={introPhase === "circle" && morphValue < 0.5 ? { opacity: 1 - morphValue * 2, y: 0, filter: "blur(0px)" } : { opacity: 0, filter: "blur(10px)" }}
                        transition={{ duration: 1 }}
                        className="text-2xl font-medium tracking-tight text-white md:text-4xl"
                    >
                        Study Abroad Journey
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={introPhase === "circle" && morphValue < 0.5 ? { opacity: 0.5 - morphValue } : { opacity: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="mt-4 text-xs font-bold tracking-[0.2em] text-white/50"
                    >
                        SCROLL TO EXPLORE
                    </motion.p>
                </div>

                {/* Arc Active Content */}
                <motion.div
                    style={{ opacity: contentOpacity, y: contentY }}
                    className="absolute top-[10%] z-10 flex flex-col items-center justify-center text-center pointer-events-none px-4"
                >
                    <h2 className="text-3xl md:text-5xl font-semibold text-white tracking-tight mb-4">
                        {title}
                    </h2>
                    <p className="text-sm md:text-base text-white/60 max-w-lg leading-relaxed">
                        {subtitle}
                    </p>
                </motion.div>

                {/* Main Container */}
                <div className="relative flex items-center justify-center w-full h-full">
                    {images.slice(0, TOTAL_IMAGES).map((src, i) => {
                        let target = { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 };

                        if (introPhase === "scatter") {
                            target = scatterPositions[i];
                        } else if (introPhase === "line") {
                            const lineSpacing = 90;
                            const lineTotalWidth = TOTAL_IMAGES * lineSpacing;
                            const lineX = i * lineSpacing - lineTotalWidth / 2;
                            target = { x: lineX, y: 0, rotation: 0, scale: 1, opacity: 1 };
                        } else {
                            const isMobile = containerSize.width < 768;
                            const minDimension = Math.min(containerSize.width, containerSize.height);

                            const circleRadius = Math.min(minDimension * 0.35, 350);
                            const circleAngle = (i / TOTAL_IMAGES) * 360;
                            const circleRad = (circleAngle * Math.PI) / 180;
                            const circlePos = {
                                x: Math.cos(circleRad) * circleRadius,
                                y: Math.sin(circleRad) * circleRadius,
                                rotation: circleAngle + 90,
                            };

                            const baseRadius = Math.min(containerSize.width, containerSize.height * 1.5);
                            const arcRadius = baseRadius * (isMobile ? 1.4 : 1.1);
                            const arcApexY = containerSize.height * (isMobile ? 0.35 : 0.25);
                            const arcCenterY = arcApexY + arcRadius;
                            const spreadAngle = isMobile ? 100 : 130;
                            const startAngle = -90 - (spreadAngle / 2);
                            const step = spreadAngle / (TOTAL_IMAGES - 1);
                            const scrollProgress = Math.min(Math.max(rotateValue / 360, 0), 1);
                            const maxRotation = spreadAngle * 0.8;
                            const boundedRotation = -scrollProgress * maxRotation;
                            const currentArcAngle = startAngle + (i * step) + boundedRotation;
                            const arcRad = (currentArcAngle * Math.PI) / 180;
                            const arcPos = {
                                x: Math.cos(arcRad) * arcRadius + parallaxValue,
                                y: Math.sin(arcRad) * arcRadius + arcCenterY,
                                rotation: currentArcAngle + 90,
                                scale: isMobile ? 1.4 : 1.8,
                            };

                            target = {
                                x: lerp(circlePos.x, arcPos.x, morphValue),
                                y: lerp(circlePos.y, arcPos.y, morphValue),
                                rotation: lerp(circlePos.rotation, arcPos.rotation, morphValue),
                                scale: lerp(1, arcPos.scale, morphValue),
                                opacity: 1,
                            };
                        }

                        return (
                            <FlipCard
                                key={i}
                                src={src}
                                index={i}
                                total={TOTAL_IMAGES}
                                phase={introPhase}
                                target={target}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
