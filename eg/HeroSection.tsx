"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion, useTransform, useAnimationFrame, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { knightThroneImg, emptyThroneImg, floorImg, bgWindowImg, heroBg2Img, scene2Img, knightQueenImg, characterPrinceSectionImg, heroBg, texture8, ribbonTex1 } from './HeroAssets'
import { useRouter } from 'next/navigation';

const navLinks = [
  { kanji: 'I', label: 'HOME', num: '00', href: '/' },
  { kanji: 'II', label: 'STORY', num: '01', href: '/story' },
  { kanji: 'III', label: 'ABOUT', num: '02', href: '/about' },
  { kanji: 'IV', label: 'INSPO', num: '03', href: '/inspo' },
  { kanji: 'V', label: 'CONTACT', num: '04', href: '/contact' },
];
// ─── Assets ─────────────────────────────────────────────────────────────────



gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// ─── Corner Ribbon ───────────────────────────────────────────────────────────
function CornerRibbon({
  text,
  posStyle,
  speed = 20,
  bgTexture,
  textTexture,
  maskGrad,
  width = '7000px',
  fontSize = '0.65rem',
  padding = '7rem 0',
  animDirection = 'normal',
}: {
  text: string;
  posStyle: React.CSSProperties;
  speed?: number;
  bgTexture: string;
  textTexture?: string;
  maskGrad?: string;
  width?: string;
  fontSize?: string;
  padding?: string;
  animDirection?: 'normal' | 'reverse';
}) {
  const chunk = text + '   ·   ';
  const repeated = chunk.repeat(15);

  return (
    <div style={{
      position: 'absolute',
      width,
      overflow: 'hidden',
      zIndex: 25,
      pointerEvents: 'none',
      WebkitMaskImage: maskGrad || 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
      maskImage: maskGrad || 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
      ...posStyle,
    }}>
      <div style={{
        display: 'inline-block',
        whiteSpace: 'nowrap',
        animation: `heroTicker ${speed}s linear infinite`,
        animationDirection: animDirection,
        position: 'relative',
        backgroundImage: `url(${bgTexture})`,
        backgroundRepeat: 'repeat-x',
        backgroundSize: 'auto 100%',
        backgroundPosition: 'left center',
        willChange: 'transform',
      }}>
        <span style={{
          display: 'inline-block',
          padding,
          position: 'relative',
          fontFamily: 'var(--font-trajan)',
          fontSize,
          letterSpacing: '0.25em',
          fontWeight: 900,
          textTransform: 'uppercase',
          ...(textTexture ? {
            background: `url(${textTexture})`,
            backgroundSize: '100px auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            color: 'transparent',
          } : {}),
        }}>
          {repeated}
        </span>
      </div>
    </div>
  );
}

// ─── Floating Dust Particles ─────────────────────────────────────────────────
interface Particle {
  id: number;
  delay: number;
  duration: number;
  size: number;
  x: number;
  y: number;
  drift: number;
}

function DustParticles({ opacity = 1, isMobile = false }: { opacity?: number, isMobile?: boolean }) {
  const [particles, setParticles] = useState<Particle[]>([]);
  useEffect(() => {
    const p = Array.from({ length: isMobile ? 12 : 20 }).map((_, i) => ({
      id: i,
      delay: Math.random() * 8,
      duration: 6 + Math.random() * 10,
      size: Math.random() * 3 + 0.5,
      x: Math.random() * 100,
      y: 20 + Math.random() * 80,
      drift: (Math.random() - 0.5) * 8,
    }));
    setParticles(p);
  }, [isMobile]);

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 4, opacity }}>
      {particles.map(p => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, x: `${p.x}vw`, y: `${p.y}vh` }}
          animate={{
            opacity: [0, 0.7, 0.5, 0],
            y: `${p.y - 35}vh`,
            x: `${p.x + p.drift}vw`,
          }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: 'rgba(255, 210, 120, 0.85)',
            boxShadow: `0 0 ${p.size * 4}px ${p.size * 1.5}px rgba(255, 170, 60, 0.6)`,
          }}
        />
      ))}
    </div>
  );
}

// ─── Ambient Glow ────────────────────────────────────────────────────────────
function AmbientGlow({ isMobile }: { isMobile?: boolean }) {
  return (
    <div style={{
      position: 'absolute', top: '50%', left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '90vw', height: '90vw',
      background: 'radial-gradient(circle, rgba(255,200,100,0.22) 0%, rgba(200,140,50,0.08) 30%, transparent 65%)',
      zIndex: 2, pointerEvents: 'none',
      animation: isMobile ? 'none' : 'glowPulse 6s ease-in-out infinite',
    }} />
  );
}

// ─── Fog Layer ───────────────────────────────────────────────────────────────
function FogLayer({ isMobile }: { isMobile?: boolean }) {
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      height: '50%',
      background: 'linear-gradient(to top, rgba(8,6,5,0.5) 0%, rgba(15,10,7,0.15) 50%, transparent 100%)',
      zIndex: 3, pointerEvents: 'none',
      animation: isMobile ? 'none' : 'fogDrift 12s ease-in-out infinite',
    }} />
  );
}

// ─── Lasso SVG Defs ──────────────────────────────────────────────────────────
function LassoDefs({
  prefix,
  x, y,
  smoothRadius,
  isHovering,
  mounted,
  shouldReduceMotion,
  isMobile,
}: {
  prefix: string;
  x: ReturnType<typeof useMotionValue<number>>;
  y: ReturnType<typeof useMotionValue<number>>;
  smoothRadius: ReturnType<typeof useSpring>;
  isHovering: boolean;
  mounted: boolean;
  shouldReduceMotion: boolean | null;
  isMobile: boolean;
}) {
  const safeRadius = useTransform(smoothRadius, (v) => Math.max(0, v));
  const feOffsetRef = useRef<SVGFEOffsetElement>(null);

  // Replaces the <animate> tags for immediate startup and 0 idle CPU usage
  useAnimationFrame((time) => {
    if (isHovering && feOffsetRef.current && !shouldReduceMotion && !isMobile) {
      const dx = (time * 0.015) % 150; // Increased speed slightly for more visible flex
      const dy = (time * 0.01) % 100;
      feOffsetRef.current.setAttribute('dx', dx.toString());
      feOffsetRef.current.setAttribute('dy', dy.toString());
    }
  });

  return (
    <svg width="0" height="0" style={{ position: 'absolute', width: 0, height: 0 }}>
      <defs>
        <filter id={`${prefix}-fluid`} x="-50%" y="-50%" width="200%" height="200%">
          <feTurbulence type="fractalNoise" baseFrequency="0.004" numOctaves="3" result="noise" />
          <feOffset ref={feOffsetRef} in="noise" result="movedNoise" dx="0" dy="0" />
          <feDisplacementMap in="SourceGraphic" in2="movedNoise" scale="220" xChannelSelector="R" yChannelSelector="G" />
        </filter>

        <mask id={`${prefix}-front-mask`}>
          <rect x="-10000" y="-10000" width="20000" height="20000" fill="white" />
          <motion.circle
            cx={x} cy={y} r={safeRadius}
            fill="black" filter={isHovering ? `url(#${prefix}-fluid)` : 'none'}
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovering ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </mask>

        <mask id={`${prefix}-back-mask`}>
          <rect x="-10000" y="-10000" width="20000" height="20000" fill="black" />
          <motion.circle
            cx={x} cy={y} r={safeRadius}
            fill="white" filter={isHovering ? `url(#${prefix}-fluid)` : 'none'}
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovering ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </mask>
      </defs>
    </svg>
  );
}

// ─── Hero Section ────────────────────────────────────────────────────────────
export default function HeroSection() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(0);

  useEffect(() => {
    let lastHeight = window.innerHeight;
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);

      // Only trigger a height recalculation if the screen changes by a massive amount (>150px)
      // This allows DevTools resizing to work, while protecting real phones from address-bar scroll jitter!
      if (Math.abs(window.innerHeight - lastHeight) > 150) {
        setViewportHeight(window.innerHeight);
        lastHeight = window.innerHeight;
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Scene 1 hover-lasso state
  const [s1Hovering, setS1Hovering] = useState(false);
  const [isTextHovered, setIsTextHovered] = useState(false);
  const s1ContainerRef = useRef<HTMLDivElement>(null);
  const s1X = useMotionValue(0);
  const s1Y = useMotionValue(0);
  const s1Radius = useMotionValue(0);
  const s1SmRadius = useSpring(s1Radius, { damping: 20, stiffness: 100 });

  // Scene 2 hover-lasso state
  const [s2Hovering, setS2Hovering] = useState(false);
  const s2ContainerRef = useRef<HTMLDivElement>(null);
  const s2X = useMotionValue(0);
  const s2Y = useMotionValue(0);
  const s2Radius = useMotionValue(0);
  const s2SmRadius = useSpring(s2Radius, { damping: 20, stiffness: 100 });

  // GSAP refs
  const heroRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const globalBgRef = useRef<HTMLImageElement>(null);
  const scene1Ref = useRef<HTMLDivElement>(null);
  const scene2Ref = useRef<HTMLDivElement>(null);

  // Scene 1 layer refs
  const s1HeroBg2Ref = useRef<HTMLImageElement>(null);
  const s1HeroBg2FrontRef = useRef<HTMLDivElement>(null);
  const s1Scene2Ref = useRef<HTMLImageElement>(null);

  // Scene 2 layer refs
  const s2ReignTextRef = useRef<HTMLImageElement>(null);
  const s2FloorRef = useRef<HTMLImageElement>(null);
  const s2ThroneRef = useRef<HTMLImageElement>(null);
  const s2KnightRef = useRef<HTMLImageElement>(null);

  // Extra UI elements (Ribbons, Particles)
  const s2ExtrasRef = useRef<HTMLDivElement>(null);
  
  // DustParticles top layer
  const dustParticlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      window.history.scrollRestoration = 'manual';
      window.scrollTo(0, 0);
    }
  }, []);

  // ── GSAP ScrollTrigger ────────────────────────────────────────────────────
  useEffect(() => {
    if (!mounted) return;
    const hero = heroRef.current;
    const canvas = canvasRef.current;
    if (!hero || !canvas) return;

    const ctx = gsap.context(() => {
      if (isMobile) {
        const vh = window.innerHeight;
        hero.style.height = `${vh * 2}px`;
        canvas.style.height = `${vh}px`;
        if (globalBgRef.current) globalBgRef.current.style.height = `${vh * 2.4}px`;
      } else {
        hero.style.height = '200svh';
        canvas.style.height = '100svh';
        // Removed globalBgRef height override so it respects inline styles
      }

      const tl = gsap.timeline({ defaults: { ease: 'none' } });

      // ─ Global Background — pans slowly throughout the entire sequence, stopping last ─
      tl.to(globalBgRef.current, { yPercent: isMobile ? -63 : -57.66, ease: 'none', duration: 2.0 }, 0);

      // ─────────────────────────────────────────────────────────────────────────
      //  SCENE 1 EXIT
      // ─────────────────────────────────────────────────────────────────────────
      if (isMobile) {
        // Mobile sequence
        // 1a. hero-bg2: First to zoom out
        tl.fromTo(s1HeroBg2Ref.current, { scale: 1, opacity: 1 }, { scale: 2.5, opacity: 0, ease: 'power2.in', duration: 0.5 }, 0);
        if (s1HeroBg2FrontRef.current) {
          tl.fromTo(s1HeroBg2FrontRef.current, { scale: 1, opacity: 1 }, { scale: 2.5, opacity: 0, ease: 'power2.in', duration: 0.5 }, 0);
        }

        // 1b. knight_queen: Starts while hero-bg2 is mid-zoom
        tl.fromTo(s1ContainerRef.current, { scale: 1, opacity: 1 }, { scale: 2.2, opacity: 0, ease: 'power2.in', duration: 0.4 }, 0.25);

        // 1c. scene2 overlay: LAST scene 1 layer — must fully vanish before scene 2 appears
        tl.fromTo(s1Scene2Ref.current, { scale: 1, opacity: 1 }, { scale: 2.0, opacity: 0, ease: 'power2.in', duration: 0.4 }, 0.5);
      } else {
        // Desktop sequence
        // 1a. knight_queen: First to zoom
        tl.fromTo(s1ContainerRef.current, { scale: 1, opacity: 1 }, { scale: 2.2, opacity: 0, ease: 'power2.in', duration: 0.4 }, 0);

        // 1b. scene2 overlay
        tl.fromTo(s1Scene2Ref.current, { scale: 1, opacity: 1 }, { scale: 2.0, opacity: 0, ease: 'power2.in', duration: 0.4 }, 0.25);

        // 1c. hero-bg2: LAST scene 1 layer
        tl.fromTo(s1HeroBg2Ref.current, { scale: 1, opacity: 1 }, { scale: 2.5, opacity: 0, ease: 'power2.in', duration: 0.5 }, 0.5);
        if (s1HeroBg2FrontRef.current) {
          tl.fromTo(s1HeroBg2FrontRef.current, { scale: 1, opacity: 1 }, { scale: 2.5, opacity: 0, ease: 'power2.in', duration: 0.5 }, 0.5);
        }
      }

      // scene1 vignette/gradients fade out
      tl.to(scene1Ref.current, { opacity: 0, ease: 'power1.in', duration: 0.3 }, 0.7);

      // ─────────────────────────────────────────────────────────────────────────
      //  SCENE 2 ENTRY
      // ─────────────────────────────────────────────────────────────────────────
      if (isMobile) {
        // Mobile sequence
        // 2a. Reign text: appears first
        tl.fromTo(s2ReignTextRef.current, { scale: 0.65, opacity: 0.01 }, { scale: 1, opacity: 1, ease: 'power2.out', duration: 0.4 }, 0.75);

        // 2b. Throne and Knight
        tl.fromTo(s2KnightRef.current, { scale: 0.55, opacity: 0.01 }, { scale: 1, opacity: 1, ease: 'power2.out', duration: 0.4 }, 1.0);

        // 2c. Floor: Last layer
        tl.fromTo(s2FloorRef.current, { scale: 0.75, opacity: 0.01 }, { scale: 1, opacity: 1, ease: 'power2.out', duration: 0.4 }, 1.25);
        
        // 2d. Extras (Ribbons and Particles)
        tl.fromTo(s2ExtrasRef.current, { opacity: 0 }, { opacity: 1, ease: 'power2.out', duration: 0.4 }, 1.25);
        
        // Dim top dust
        tl.fromTo(dustParticlesRef.current, { opacity: 1 }, { opacity: 0.4, ease: 'power2.out', duration: 0.4 }, 1.25);
        
        // Enable pointer events for Scene 2
        tl.set([scene2Ref.current, s2ContainerRef.current], { pointerEvents: 'auto' }, 0.75);
      } else {
        // Desktop sequence
        // 2a. Throne
        tl.fromTo(s2ThroneRef.current, { scale: 0.55, opacity: 0.01 }, { scale: 1, opacity: 1, ease: 'power2.out', duration: 0.4 }, 0.75);
        tl.fromTo(s2KnightRef.current, { scale: 0.55, opacity: 0.01 }, { scale: 1, opacity: 1, ease: 'power2.out', duration: 0.4 }, 0.75);

        // 2b. Reign text
        tl.fromTo(s2ReignTextRef.current, { scale: 0.65, opacity: 0.01 }, { scale: 1, opacity: 1, ease: 'power2.out', duration: 0.4 }, 1.0);

        // 2c. Floor
        tl.fromTo(s2FloorRef.current, { scale: 0.75, opacity: 0.01 }, { scale: 1, opacity: 1, ease: 'power2.out', duration: 0.4 }, 1.25);

        // 2d. Extras (Ribbons and Particles)
        tl.fromTo(s2ExtrasRef.current, { opacity: 0 }, { opacity: 1, ease: 'power2.out', duration: 0.4 }, 1.25);
        
        // Dim top dust
        tl.fromTo(dustParticlesRef.current, { opacity: 1 }, { opacity: 0.4, ease: 'power2.out', duration: 0.4 }, 1.25);
        
        // Enable pointer events for Scene 2
        tl.set([scene2Ref.current, s2ContainerRef.current], { pointerEvents: 'auto' }, 0.75);
      }



      let timeAtScene1 = 0;

      ScrollTrigger.config({ ignoreMobileResize: true });

      ScrollTrigger.create({
        trigger: hero,
        start: 'top top',
        end: 'bottom bottom',
        scrub: isMobile ? 1.6 : 1.4,
        onUpdate: (self) => {
          if (isMobile) {
            if (self.progress < 0.2) timeAtScene1 = Date.now();
            
            // If they are in the bottom 10% of the hero and moving fast down...
            if (self.progress > 0.9 && self.progress < 1.0 && self.direction === 1 && (Date.now() - timeAtScene1 < 800)) {
              // Reset to prevent multiple triggers
              timeAtScene1 = 0;
              
              // Soft wall: Kill native inertia seamlessly before they leave the hero
              document.body.style.overflow = 'hidden';
              const restore = () => { document.body.style.overflow = ''; };
              setTimeout(restore, 500);

              const scene2ScrollY = hero.offsetTop + hero.offsetHeight - window.innerHeight;
              gsap.to(window, {
                scrollTo: { y: scene2ScrollY, autoKill: false },
                duration: 0.4,
                ease: 'power2.out',
                onComplete: restore
              });
            }
          }
        },
        snap: {
          snapTo: (value, self) => {
            if (isMobile) {
              if (self?.direction === -1) {
                // If scrolling up from below the hero, lock to Scene 2 (1).
                // Otherwise lock to Scene 1 (0).
                return value > 0.7 ? 1 : 0;
              }
              if (self?.direction === 1) return 1;
              return Math.round(value);
            } else {
              // Desktop: strict lock
              if (self?.direction === -1) return 0;
              if (self?.direction === 1) return 1;
              return Math.round(value);
            }
          },
          duration: { min: 0.6, max: 1.2 }, // Fast and snappy
          delay: 0.05,
          ease: 'power2.inOut'
        },
        animation: tl,
      });
    }, hero); // Provide the hero element as the scope

    return () => ctx.revert(); // Automatically kills tl, st, AND clears all GSAP inline styles!
  }, [mounted, isMobile, viewportHeight]);


  // ── Scene 1 lasso handlers ─────────────────────────────────────────────────
  const handleS1MouseMove = (e: React.MouseEvent) => {
    if (shouldReduceMotion || !s1ContainerRef.current) return;
    const rect = s1ContainerRef.current.getBoundingClientRect();
    s1X.set(e.clientX - rect.left);
    s1Y.set(e.clientY - rect.top);
    s1Radius.set(160);
    setS1Hovering(true);
  };
  const handleS1Leave = () => {
    if (shouldReduceMotion) return;
    s1Radius.set(0);
    setS1Hovering(false);
  };

  // ── Scene 2 lasso handlers ─────────────────────────────────────────────────
  const handleS2MouseMove = (e: React.MouseEvent) => {
    if (shouldReduceMotion || !s2ContainerRef.current) return;
    const rect = s2ContainerRef.current.getBoundingClientRect();
    s2X.set(e.clientX - rect.left);
    s2Y.set(e.clientY - rect.top);
    s2Radius.set(150);
    setS2Hovering(true);
  };
  const handleS2Leave = () => {
    if (shouldReduceMotion) return;
    s2Radius.set(0);
    setS2Hovering(false);
  };

  const RIBBONS = [
    {
      id: 'tl', text: 'SAMYUKTHA 10.0',
      posStyle: {
        top: isMobile ? '20px' : '60px',
        left: isMobile ? '-20px' : '90px',
        transform: isMobile ? 'rotate(-38deg)' : 'rotate(-32deg)'
      } as React.CSSProperties,
      speed: 60, bgTexture: ribbonTex1, textTexture: texture8,
      maskGrad: 'linear-gradient(to right, transparent 0%, black 15%, black 70%, transparent 100%)',
      width: isMobile ? '400px' : '580px', fontSize: '0.65rem', padding: '9rem 0',
    },
    {
      id: 'br', text: 'SAMYUKTHA 10.0',
      posStyle: {
        bottom: isMobile ? '10px' : '20px',
        right: isMobile ? '-80px' : '40px',
        transform: isMobile ? 'rotate(-38deg)' : 'rotate(-30deg)'
      } as React.CSSProperties,
      speed: 55, bgTexture: ribbonTex1, textTexture: texture8,
      maskGrad: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
      width: isMobile ? '400px' : '480px', fontSize: '0.65rem', padding: '9rem 0',
      animDirection: 'reverse' as const,
    },
  ];
  if (!mounted) {
    return <section style={{ position: 'relative', height: '200svh', background: '#060504' }} />;
  }

  return (
    <>
      {/* ── Global keyframes ── */}
      <style>{`
        @keyframes heroTicker      { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes slowSpin        { 0%{transform:rotate(0deg)}  100%{transform:rotate(360deg)} }
        @keyframes slowSpinReverse { 0%{transform:rotate(0deg)}  100%{transform:rotate(-360deg)} }
        @keyframes glowPulse       { 0%,100%{opacity:0.8} 50%{opacity:1.2} }
        @keyframes fogDrift        { 0%,100%{transform:scaleX(1) translateX(0)} 50%{transform:scaleX(1.04) translateX(-2%)} }
        @keyframes idleFloat       { 0%,100%{transform:translate3d(-50%, 0px, 0)} 50%{transform:translate3d(-50%, -6px, 0)} }
        @keyframes idleFloatSlow   { 0%,100%{transform:translate3d(-50%, 0px, 0)} 50%{transform:translate3d(-50%, -3px, 0)} }
        @keyframes bannerDrop      { 0%{transform:translateY(-100%); opacity:0;} 100%{transform:translateY(0); opacity:1;} }
        .hero-scene1-char { animation: idleFloat 5s ease-in-out infinite; }
        .hero-scene2-char { animation: idleFloatSlow 7s ease-in-out infinite; }
      `}</style>

      {/*
        ══════════════════════════════════════════════════════
          OUTER SECTION — 200vh gives GSAP its scroll range
        ══════════════════════════════════════════════════════
      */}
      <section
        ref={heroRef}
        id="hero"
        style={{ position: 'relative', height: '200svh', background: '#060504', isolation: 'isolate', zIndex: 30 }}
      >

        {/*
          ══════════════════════════════════════════════════
            INNER CANVAS — sticky, always 100vh visible
          ══════════════════════════════════════════════════
        */}
        <div
          ref={canvasRef}
          style={{
            position: 'sticky',
            top: 0,
            height: '100svh',
            overflow: 'hidden',
            background: 'linear-gradient(160deg,#080605 0%,#060504 50%,#0a0806 100%)',
          }}
        >

          {/* ── Always-on Atmosphere ── */}
          <AmbientGlow isMobile={isMobile} />
          <FogLayer isMobile={isMobile} />
          <div ref={dustParticlesRef} style={{ position: 'absolute', inset: 0, zIndex: 4, pointerEvents: 'none' }}>
            <DustParticles opacity={1} isMobile={isMobile} />
          </div>

          {/* ── Radial vignette ── */}
          <div style={{
            position: 'absolute', inset: 0, zIndex: 5, pointerEvents: 'none',
            background: 'radial-gradient(ellipse 72% 82% at 50% 50%, transparent 18%, rgba(6,5,4,0.7) 78%)',
          }} />

          {/* ── Bottom gradient ── */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            height: isMobile ? '80px' : '220px', // ADJUST THIS: change '80px' to lessen or increase the bottom fade on mobile
            background: 'linear-gradient(to top,#060504,transparent)',
            zIndex: 5, pointerEvents: 'none',
          }} />

          {/* ══════════════════════════════════════════
               GLOBAL BACKGROUND (Shared across scenes)
             ══════════════════════════════════════════ */}
          <img
            ref={globalBgRef}
            src={isMobile ? bgWindowImg.mobile : bgWindowImg.desktop}
            alt="Shared window background"
            style={{
              position: 'absolute', top: 0, left: 0, zIndex: 1,
              width: '100%',
              height: isMobile ? '240svh' : 'auto',
              minHeight: isMobile ? 'auto' : '240svh', // Forces tablet to be at least 240svh, saving it from being too short!
              objectFit: 'cover', // Ensures the image isn't squished but covers the area universally
              objectPosition: isMobile ? '46% top' : 'center top', // ADJUST THIS: change '60%' up or down (e.g., '40%' or '70%') to shift the background left/right on mobile!
              willChange: 'transform',
              transform: 'translateZ(0)',
            }}
          />

          {/* ══════════════════════════════════════════
               SCENE 1 — bg-window + knight_queen lasso
             ══════════════════════════════════════════ */}
          <div
            ref={scene1Ref}
            style={{ position: 'absolute', inset: 0, zIndex: 2, willChange: isMobile ? 'opacity' : undefined }}
          >
            {/* Scene 1 Lasso SVG defs (disabled to save performance, no longer interactive) */}
            {false && (
              <LassoDefs
                prefix="s1"
                x={s1X} y={s1Y} smoothRadius={s1SmRadius}
                isHovering={s1Hovering} mounted={mounted}
                shouldReduceMotion={shouldReduceMotion}
                isMobile={isMobile}
              />
            )}

            {/* hero-bg2 — mid layer (Samyuktha text, back) */}
            <img
              ref={s1HeroBg2Ref}
              src={isMobile ? heroBg2Img.mobile : heroBg2Img.desktop}
              alt="Hero background layer 2"
              onMouseEnter={isMobile ? undefined : () => setIsTextHovered(true)}
              onMouseLeave={isMobile ? undefined : () => setIsTextHovered(false)}
              style={{
                position: 'absolute', left: 0, right: 0, margin: '0 auto',
                top: isMobile ? '-5%' : '-7%', // Adjust this value to push it up or down!
                width: isMobile ? '90%' : '75%', height: isMobile ? '57%' : '74%', objectFit: 'contain',
                willChange: isMobile ? 'transform' : undefined,
                cursor: isMobile ? 'default' : "url('/PNGS/cursor/pointer.png') 0 0, pointer", pointerEvents: isMobile ? 'none' : 'auto',
                zIndex: isMobile ? 100 : undefined,
              }}
            />

            {/* scene2 elements overlay */}
            <img
              ref={s1Scene2Ref}
              src={isMobile ? scene2Img.mobile : scene2Img.desktop}
              alt="Scene 2 background elements"
              style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%', objectFit: 'cover',
                maxHeight: 'none',
                objectPosition: 'bottom center',
                willChange: isMobile ? 'transform' : undefined,
                pointerEvents: 'none',
                zIndex: isMobile ? 1 : undefined,
              }}
            />

            {/* prince — foreground character */}
            <div
              ref={s1ContainerRef}
              style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
                pointerEvents: 'none', // no longer interactive
                willChange: isMobile ? 'transform, opacity' : undefined,
                zIndex: isMobile ? 20 : undefined,
              }}
            >
              <img
                src={isMobile ? characterPrinceSectionImg : knightQueenImg.desktop}
                alt="Characters in cinematic scene"
                className="hero-scene1-char"
                style={{
                  position: 'absolute',
                  bottom: isMobile ? '-30%' : '-16%',
                  left: isMobile ? '47%' : '47%',
                  transform: 'translateX(-50%)',
                  height: isMobile ? '116%' : '100%',
                  maxWidth: 'none',
                  objectFit: 'contain',
                  objectPosition: 'bottom center',
                  pointerEvents: 'none',
                  willChange: isMobile ? 'transform' : undefined,
                  filter: isMobile ? 'none' : 'brightness(0.88) contrast(1.05)',
                } as React.CSSProperties}
              />
            </div>

            {/* hero-bg2 — foreground clone (Samyuktha text, front fading layer) */}
            <div
              ref={s1HeroBg2FrontRef}
              style={{
                position: 'absolute', left: 0, right: 0, margin: '0 auto',
                top: isMobile ? '10%' : '-7%',
                width: isMobile ? '55%' : '75%', height: isMobile ? '60%' : '74%',
                pointerEvents: 'none', // Prevents blocking hover on back layer
                willChange: isMobile ? 'transform' : undefined,
                zIndex: 500, // Permanently sits in front of knight_queen
              }}
            >
              <img
                src={isMobile ? heroBg2Img.mobile : heroBg2Img.desktop}
                alt=""
                style={{
                  width: '100%', height: '100%', objectFit: 'contain',
                  opacity: isTextHovered ? 1 : 0, // CSS fade
                  transition: 'opacity 0.4s ease',
                }}
              />
            </div>
          </div>

          {/* ══════════════════════════════════════════
               SCENE 2 — throne room + knight-on-throne lasso
             ══════════════════════════════════════════ */}
          <div
            ref={scene2Ref}
            style={{
              position: 'absolute', inset: 0,
              zIndex: 3,
              pointerEvents: 'none', // GSAP will toggle this to 'auto'
            }}
          >
            {/* Scene 2 Lasso SVG defs */}
              <LassoDefs
                prefix="s2"
                x={s2X} y={s2Y} smoothRadius={s2SmRadius}
                isHovering={s2Hovering} mounted={mounted}
                shouldReduceMotion={shouldReduceMotion}
                isMobile={isMobile}
              />

            {/* Reign Text was moved inside s2ContainerRef to fix z-indexing */}

            {/* Throne room content — hover-lasso interactive */}
            <div
              ref={s2ContainerRef}
              onMouseMove={handleS2MouseMove}
              onPointerLeave={handleS2Leave}
              style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
                cursor: "url('/PNGS/cursor/precision.png') 16 16, crosshair", pointerEvents: 'none', // GSAP will toggle this to 'auto'
              }}
            >
              {/* Floor */}
              <div
                ref={s2FloorRef}
                style={{
                  position: 'absolute', inset: 0, opacity: 0.01,
                  willChange: isMobile ? 'transform, opacity' : undefined,
                  pointerEvents: 'none',
                  zIndex: isMobile ? 1 : undefined,
                }}
              >
                <img
                  src={isMobile ? floorImg.mobile : floorImg.desktop}
                  alt="Throne room floor"
                  style={{
                    position: 'absolute',
                    left: isMobile ? '48%' : '50%',
                    transform: 'translateX(-50%)',
                    height: isMobile ? '100%' : '100%', width: 'auto', maxWidth: 'none',
                    objectFit: 'contain', objectPosition: 'bottom center',
                    pointerEvents: 'none',
                    maskImage: isMobile ? 'none' : 'linear-gradient(to bottom, transparent 0%, transparent 8%, black 38%, black 100%)',
                    WebkitMaskImage: isMobile ? 'none' : 'linear-gradient(to bottom, transparent 0%, transparent 8%, black 38%, black 100%)',
                    willChange: isMobile ? 'transform' : undefined,
                  }}
                />
              </div>

              {/* Reign Text Overlay (heroBg) - Layered between floor and throne */}
              <div
                ref={s2ReignTextRef}
                className=""
                style={{
                  position: 'absolute',
                  margin: isMobile ? '0' : 'auto', // Remove margin auto on mobile to allow sideways movement
                  inset: isMobile ? 'auto' : 0,
                  bottom: isMobile ? '5%' : 'auto',
                  left: isMobile ? '0%' : '-1%', // ADJUST THIS: Increase (e.g. '10%') to move Right, decrease (e.g. '-20%') to move Left!
                  width: isMobile ? '100%' : '85%',
                  maxWidth: 'none',
                  height: isMobile ? '100%' : '85%',
                  zIndex: isMobile ? 100 : 0,
                  willChange: isMobile ? 'transform' : undefined,
                  opacity: 0.01, // Force early decode before GSAP initializes
                  pointerEvents: 'none',
                }}
              >
                {(isMobile ? [1, 2] : [1, 2, 3, 4]).map((i) => (
                  <img
                    key={i}
                    src={isMobile ? heroBg.mobile : heroBg.desktop}
                    alt={i === 1 ? "Reign text layer" : ""}
                    style={{
                      position: 'absolute', inset: 0,
                      width: '100%', height: '100%',
                      objectFit: isMobile ? 'fill' : 'contain', // Change to 'fill' on mobile to allow vertical stretching
                    }}
                  />
                ))}
              </div>

              {/* Empty throne — wrapped for GSAP individual animation (Desktop Only) */}
              {!isMobile && (
                <div
                  ref={s2ThroneRef}
                  style={{
                    position: 'absolute', inset: 0, opacity: 0.01,
                    WebkitMaskImage: 'url(#s2-front-mask)',
                    maskImage: 'url(#s2-front-mask)',
                  }}
                >
                  <img
                    src={emptyThroneImg.desktop}
                    alt="Empty gothic throne"
                    className="hero-scene2-char"
                    style={{
                      position: 'absolute',
                      bottom: '-12%', left: '50%',
                      transform: 'translateX(-50%)',
                      height: '100%', width: 'auto',
                      maxWidth: 'none',
                      objectFit: 'contain', objectPosition: 'bottom center',
                      filter: 'brightness(0.88) contrast(1.05)',
                      pointerEvents: 'none',
                    } as React.CSSProperties}
                  />
                </div>
              )}

              {/* Knight on throne — wrapped for GSAP individual animation */}
              <div
                ref={s2KnightRef}
                style={{
                  position: 'absolute', inset: 0, opacity: 0.01,
                  willChange: isMobile ? 'transform, opacity' : undefined,
                  WebkitMaskImage: isMobile ? 'none' : 'url(#s2-back-mask)',
                  maskImage: isMobile ? 'none' : 'url(#s2-back-mask)',
                  zIndex: isMobile ? 40 : undefined,
                }}
              >
                <img
                  src={isMobile ? knightThroneImg.mobile : knightThroneImg.desktop}
                  alt="Armored knight seated on a gothic throne"
                  className="hero-scene2-char"
                  style={{
                    position: 'absolute',
                    bottom: isMobile ? '3%' : '-12%', left: isMobile ? '50%' : '50%',
                    transform: 'translateX(-50%)',
                    height: isMobile ? '65%' : '100%', width: 'auto',
                    maxWidth: 'none',
                    objectFit: 'contain', objectPosition: 'bottom center',
                    filter: isMobile ? 'none' : 'brightness(0.88) contrast(1.05)',
                    pointerEvents: 'none',
                    willChange: isMobile ? 'transform' : undefined,
                  } as React.CSSProperties}
                />
              </div>

              {/* Gold ring — frames the lasso reveal over the throne */}
              {!isMobile && (
                <svg style={{
                  position: 'absolute', inset: 0,
                  height: '100%', width: '100%',
                  pointerEvents: 'none',
                  zIndex: 50,
                }}>
                  <defs>
                    <mask id="s2-glow-mask" style={{ maskType: 'alpha' }}>
                      <image
                        href={emptyThroneImg.desktop}
                        x="-50%" y="17%" width="200%" height="95%"
                        preserveAspectRatio="xMidYMax meet"
                      />
                    </mask>
                  </defs>
                  <motion.circle
                    mask="url(#s2-glow-mask)"
                    cx={s2X} cy={s2Y} r={s2SmRadius}
                    fill="none" stroke="#CD7F32" strokeWidth="2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: s2Hovering ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ filter: 'url(#s2-fluid) drop-shadow(0px 0px 5px #d39f6b)' }}
                  />
                </svg>
              )}

            </div>

            {/* Scene 2 extras (Particles and Ribbons) */}
            <div
              ref={s2ExtrasRef}
              style={{
                position: 'absolute', inset: 0, opacity: 0, // GSAP will fade this in
                pointerEvents: 'none', zIndex: 60,
              }}
            >
              <div style={{ position: 'absolute', inset: 0, zIndex: 55 }}>
                <DustParticles opacity={0.9} isMobile={isMobile} />
              </div>

              <div style={{ position: 'absolute', inset: 0, zIndex: 60 }}>
                {RIBBONS.filter(r => !(isMobile && r.id === 'br')).map(r => (
                  <CornerRibbon
                    key={r.id}
                    text={r.text}
                    posStyle={r.posStyle}
                    speed={r.speed}
                    bgTexture={r.bgTexture}
                    textTexture={r.textTexture}
                    maskGrad={r.maskGrad}
                    width={r.width}
                    fontSize={r.fontSize}
                    padding={r.padding}
                    animDirection={r.animDirection}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ── UI Chrome ── */}

          {/* Bottom bar */}
          <div style={{
            position: 'absolute', bottom: '3rem', left: '5rem', right: '3rem',
            zIndex: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
          }}>
            <div>
              <p style={{ fontFamily: 'var(--font-trajan)', fontSize: '0.55rem', letterSpacing: '0.3em', color: 'rgba(107,95,74,0.6)', margin: 0, textTransform: 'uppercase' }}>LEGACY</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontFamily: 'var(--font-trajan)', fontSize: '0.55rem', letterSpacing: '0.3em', color: 'rgba(107,95,74,0.6)', margin: 0, textTransform: 'uppercase' }}>UNYIELDING GLORY</p>
            </div>
          </div>

        </div>{/* end canvas */}
      </section>
    </>
  );
}
