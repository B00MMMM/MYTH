import React, { useState, useEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import bgImage from './assets/props/Bg_image.png';
import treeImg from './assets/props/Tree.png';
import tree2Img from './assets/props/Tree2.png';
import groundImg from './assets/props/ground.png';
import text1Img from './assets/props/Text1.png';
import rockImg from './assets/props/Rock.png';
import pageBgImg from './assets/bg.jpg';
import odinImg from './assets/odin_norse_realistic.png';
import thorImg from './assets/thor_norse_realistic.png';
import freyjaImg from './assets/freyja_norse_realistic.png';
import lokiImg from './assets/loki_norse_realistic.png';
import heimdallImg from './assets/heimdall_norse_realistic.png';
import text2Img from './assets/props/Text2.png';

// ==========================================
// RAGNARÖK - NORSE MYTHOLOGY EXPERIENCE
// Single-file React component
// ==========================================

// --- DATA CONSTANTS ---

const REALMS = [
  { id: 'asgard', name: 'ASGARD', desc: 'Realm of the Aesir', gods: 'Odin • Thor • Frigg', top: '15%', left: '50%' },
  { id: 'alfheim', name: 'ALFHEIM', desc: 'Realm of the Light Elves', gods: 'Freyr', top: '25%', left: '75%' },
  { id: 'vanaheim', name: 'VANAHEIM', desc: 'Realm of the Vanir', gods: 'Njörðr • Freyja', top: '25%', left: '25%' },
  { id: 'midgard', name: 'MIDGARD', desc: 'Realm of Humanity', gods: 'Mortal Realm', top: '50%', left: '50%' },
  { id: 'jotunheim', name: 'JÖTUNHEIM', desc: 'Realm of the Giants', gods: 'Loki • Skadi', top: '50%', left: '85%' },
  { id: 'svartalfheim', name: 'SVARTÁLFAHEIMR', desc: 'Realm of the Dwarves', gods: 'Brokkr • Sindri', top: '50%', left: '15%' },
  { id: 'niflheim', name: 'NIFLHEIM', desc: 'Realm of Ice and Mist', gods: 'Primordial Cold', top: '75%', left: '25%' },
  { id: 'muspelheim', name: 'MUSPELHEIM', desc: 'Realm of Fire', gods: 'Surtr', top: '75%', left: '75%' },
  { id: 'hel', name: 'HEL', desc: 'Realm of the Dead', gods: 'Hel', top: '90%', left: '50%' }
];

const GODS = [
  { name: 'ODIN', title: 'THE ALLFATHER', tags: ['Wisdom', 'War', 'Death', 'Knowledge'], runes: 'ᚨ ᛟ ᚾ', color: 'rgba(197, 160, 89, 0.2)', image: odinImg },
  { name: 'THOR', title: 'THE THUNDERER', tags: ['Storm', 'Strength', 'Protection'], runes: 'ᚦ ᛟ ᚱ', color: 'rgba(74, 107, 130, 0.2)', image: thorImg },
  { name: 'FREYJA', title: 'LADY OF VANAHEIM', tags: ['Love', 'Seiðr', 'War'], runes: 'ᚠ ᚱ ᛖ', color: 'rgba(217, 92, 20, 0.2)', image: freyjaImg },
  { name: 'LOKI', title: 'THE TRICKSTER', tags: ['Chaos', 'Fire', 'Change'], runes: 'ᛚ ᛟ ᚲ', color: 'rgba(90, 160, 100, 0.2)', image: lokiImg },
  { name: 'HEIMDALL', title: 'THE WATCHER', tags: ['Sight', 'Light', 'Bifröst'], runes: 'ᚺ ᛖ ᛁ', color: 'rgba(220, 220, 220, 0.2)', image: heimdallImg }
];

const SAGAS = [
  { num: '01', title: "ODIN'S SACRIFICE", desc: "For wisdom, the Allfather gave what no ordinary god would surrender. He hung from Yggdrasil for nine days and nights, pierced by his own spear, to discover the secrets of the runes." },
  { num: '02', title: "THOR & JÖRMUNGANDR", desc: "A fishing trip that almost ended the world. The thunder god hooked the Midgard Serpent, their eyes meeting before the giant Hymir cut the line in terror." },
  { num: '03', title: "THE BINDING OF FENRIR", desc: "To restrain the great wolf, Tyr sacrificed his hand. The unbreakable silken ribbon Gleipnir held the beast... until the end of days." },
  { num: '04', title: "BALDR'S DEATH", desc: "The beloved god fell to a weapon of mistletoe, orchestrated by Loki's deceit. The first inevitable shadow of Ragnarök fell upon the Nine Realms." }
];

const RUNE_MAP = {
  a: 'ᚨ', b: 'ᛒ', c: 'ᚲ', d: 'ᛞ', e: 'ᛖ', f: 'ᚠ', g: 'ᚷ', h: 'ᚺ',
  i: 'ᛁ', j: 'ᛃ', k: 'ᚲ', l: 'ᛚ', m: 'ᛗ', n: 'ᚾ', o: 'ᛟ', p: 'ᛈ',
  q: 'ᚲ', r: 'ᚱ', s: 'ᛊ', t: 'ᛏ', u: 'ᚢ', v: 'ᚹ', w: 'ᚹ', x: 'ᛉ',
  y: 'ᛃ', z: 'ᛉ', ' ': ' '
};

const RAGNAROK_EVENTS = [
  "FIMBULWINTER",
  "LOKI BREAKS FREE",
  "FENRIR RISES",
  "JÖRMUNGANDR EMERGES",
  "HEIMDALL SOUNDS GJALLARHORN",
  "THE GODS RIDE TO WAR",
  "THE WORLD BURNS",
  "THE WORLD IS RENEWED"
];


// --- CSS STYLES ---

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;800&family=Inter:wght@300;400;600&display=swap');

  :root {
    --gold: #d4af37;
    --gold-dim: rgba(212, 175, 55, 0.4);
    --bg: #0a0c10;
    --bg-overlay: rgba(0, 0, 0, 0.8);
    --text: #e0e0e0;
    --ragnarok: #8b0000;
    --ember: #ff4500;
    --font-serif: 'Cinzel', serif;
    --font-sans: 'Inter', sans-serif;
    --border: rgba(255,255,255,0.05);
  }
  .is-ragnarok { --bg-overlay: rgba(40, 10, 10, 0.85); --gold: #ff6b6b; --text: #ffcccc; }

  * { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body {
    margin: 0; padding: 0;
    background: #000; color: var(--text);
    font-family: var(--font-sans);
    overflow-x: hidden;
    cursor: none;
    -webkit-font-smoothing: antialiased;
  }

  .app-background {
    position: fixed; inset: 0; z-index: -10;
    background-image: linear-gradient(var(--bg-overlay), var(--bg-overlay)), url('${pageBgImg}');
    background-size: cover; background-position: center;
    transition: all 2s ease;
  }

  ::selection { background: var(--gold); color: var(--bg); }

  /* Custom Cursor */
  .custom-cursor-dot, .custom-cursor-ring {
    position: fixed; border-radius: 50%; pointer-events: none; z-index: 9999;
    transform: translate(-50%, -50%); transition: opacity 0.3s, width 0.3s, height 0.3s;
  }
  .custom-cursor-dot { width: 4px; height: 4px; background: var(--text); }
  .custom-cursor-ring {
    width: 30px; height: 30px; border: 1px solid rgba(255,255,255,0.2);
    transition: width 0.2s, height 0.2s, border-color 0.2s, transform 0.1s;
  }
  .custom-cursor-ring.hover { width: 60px; height: 60px; border-color: var(--gold); background: rgba(197,160,89,0.05); }
  @media (max-width: 768px) { .custom-cursor-dot, .custom-cursor-ring { display: none !important; } body { cursor: auto; } }

  /* Typography */
  .serif { font-family: var(--font-serif); }
  .rune-output {
    font-size: 2.5rem; letter-spacing: 0.2em;
    min-height: 4rem; word-break: break-all;
    color: var(--gold); text-shadow: 0 0 15px var(--gold-dim);
  }

  /* Marquee */
  .marquee-container {
    width: 100%; overflow: hidden; white-space: nowrap;
    background: rgba(10, 12, 16, 0.9); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);
    padding: 1.5rem 0; display: flex; z-index: 20; position: relative;
    box-shadow: 0 0 20px rgba(0,0,0,0.5);
  }
  .marquee-content {
    display: flex;
    animation: marquee 30s linear infinite;
  }
  .marquee-content span {
    padding: 0 2rem; color: var(--gold);
  }
  @keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  ${Array.from("RAGNARÖK").map((_, i) => `
    @keyframes propLight${i} {
      0%, ${i * 6}% { color: rgba(255,255,255,0.1); text-shadow: none; }
      ${(i * 6) + 5}%, 80% { color: #fff; text-shadow: 0 0 30px var(--ember), 0 0 10px var(--ember); }
      85%, 100% { color: rgba(255,255,255,0.1); text-shadow: none; }
    }
    .prop-letter-${i} { animation: propLight${i} 5s infinite; display: inline-block; }
  `).join('\n')}
  
  .text-micro { font-size: 0.75rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--muted); }
  .title-massive {
    font-family: var(--font-serif);
    font-size: clamp(4rem, 12vw, 12rem);
    font-weight: 400; line-height: 1; letter-spacing: 0.1em;
    margin: 0; text-transform: uppercase;
    background: linear-gradient(180deg, #fff 0%, #4a4a4a 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    filter: drop-shadow(0 0 30px rgba(255,255,255,0.1));
  }
  .subtitle-cinematic {
    font-family: var(--font-serif); font-size: clamp(1rem, 2vw, 1.5rem);
    letter-spacing: 0.3em; color: var(--gold); margin-top: 1rem; text-transform: uppercase;
  }
  h2.section-title { font-size: clamp(2.5rem, 5vw, 4rem); letter-spacing: 0.1em; text-align: center; margin-bottom: 1rem; }

  /* Layout */
  section { position: relative; min-height: 100vh; padding: 15vh 5vw; display: flex; flex-direction: column; justify-content: center; z-index: 10; }
  .container { max-width: 1200px; margin: 0 auto; width: 100%; }
  
  /* Navbar */
  .navbar {
    position: fixed; top: 0; left: 0; right: 0; padding: 2rem 5vw;
    display: flex; justify-content: space-between; align-items: center;
    z-index: 100; transition: all 0.5s;
  }
  .navbar.scrolled { padding: 1rem 5vw; background: rgba(7,9,11,0.8); backdrop-filter: blur(10px); border-bottom: 1px solid var(--border); }
  .nav-brand { font-size: 1.2rem; letter-spacing: 0.2em; color: var(--text); text-decoration: none; display: flex; align-items: center; gap: 0.5rem; }
  .nav-links { display: flex; gap: 2rem; }
  .nav-links a { color: var(--text); text-decoration: none; font-size: 0.75rem; letter-spacing: 0.2em; transition: color 0.3s; text-transform: uppercase; }
  .nav-links a:hover { color: var(--gold); }
  @media (max-width: 768px) { .nav-links { display: none; } }

  /* Buttons */
  .btn {
    display: inline-block; background: transparent; color: var(--text); border: 1px solid var(--muted);
    padding: 1rem 3rem; font-family: var(--font-sans); letter-spacing: 0.2em; text-transform: uppercase;
    font-size: 0.8rem; cursor: none; transition: all 0.3s; position: relative; overflow: hidden; text-decoration: none;
  }
  .btn::before {
    content: ''; position: absolute; inset: 0; background: var(--gold);
    transform: scaleX(0); transform-origin: right; transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1); z-index: -1;
  }
  .btn:hover { border-color: var(--gold); color: var(--bg); }
  .btn:hover::before { transform: scaleX(1); transform-origin: left; }
  .btn-primary { border-color: var(--gold); color: var(--gold); }

  /* Atmosphere / Particles */
  .hero-dust-layer { position: absolute; inset: 0; pointer-events: none; z-index: 50; overflow: hidden; }
  .atmosphere-layer { position: fixed; inset: 0; pointer-events: none; z-index: 0; }

  .particle { position: absolute; background: #fff; border-radius: 50%; animation: float infinite linear; }
  .particle.ember { background: var(--ember); box-shadow: 0 0 10px var(--ember); }
  @keyframes float {
    0% { transform: translateY(0) translateX(0); opacity: 0; }
    50% { opacity: 0.5; }
    100% { transform: translateY(-100vh) translateX(20vw); opacity: 0; }
  }
  


  /* Hero Section & Side Nav */
  .hero-section { display: block; position: relative; width: 100%; height: 200vh; background: transparent; padding: 0 !important; margin: 0; z-index: 30; }
  .side-nav {
    position: fixed; left: 3vw; top: 50%; transform: translateY(-50%);
    display: flex; flex-direction: column; align-items: center; z-index: 100;
    height: 70vh;
  }
  .nav-line-segment {
    width: 1px; background: var(--gold); opacity: 0.3; flex-grow: 1; min-height: 1vh;
  }
  .nav-rune-link {
    text-decoration: none; color: var(--muted); font-size: 1.2rem;
    transition: all 0.3s; display: flex; align-items: center; justify-content: center;
    padding: 0.5rem 0; opacity: 0.5;
  }
  .nav-rune-link:hover, .nav-rune-link.active {
    color: var(--gold); text-shadow: 0 0 10px rgba(197,160,89,0.5); transform: scale(1.2); opacity: 1;
  }
  .nav-dot {
    color: var(--gold); font-size: 1.5rem; opacity: 0.5; line-height: 0; padding: 0.5rem 0; display: flex; align-items: center;
  }
  .hero-content { position: relative; z-index: 10; display: flex; flex-direction: column; align-items: center; }
  .hero-buttons { display: flex; gap: 2rem; margin-top: 4rem; flex-wrap: wrap; justify-content: center; }
  
  .scroll-indicator {
    position: absolute; bottom: 5vh; left: 50%; transform: translateX(-50%);
    display: flex; flex-direction: column; align-items: center; gap: 1rem; z-index: 10;
  }
  .scroll-line { width: 1px; height: 60px; background: rgba(255,255,255,0.1); position: relative; overflow: hidden; }
  .scroll-line::after {
    content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 50%;
    background: var(--gold); animation: scrollDown 2s infinite cubic-bezier(0.65, 0, 0.35, 1);
  }
  @keyframes scrollDown { 0% { transform: translateY(-100%); } 100% { transform: translateY(200%); } }

  /* Yggdrasil Section */
  .yggdrasil-container { position: relative; width: 100%; height: 70vh; margin-top: 4rem; }
  .yggdrasil-svg { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1; overflow: visible; }
  .yggdrasil-svg line { stroke: rgba(255,255,255,0.05); stroke-width: 1; transition: all 0.5s; stroke-dasharray: 4 4; animation: dash 20s linear infinite; }
  @keyframes dash { to { stroke-dashoffset: -100; } }
  
  .realm-node {
    position: absolute; transform: translate(-50%, -50%); display: flex; flex-direction: column; align-items: center;
    cursor: none; z-index: 2; transition: all 0.3s;
  }
  .node-circle {
    width: 14px; height: 14px; background: var(--bg-alt); border: 1px solid var(--muted); border-radius: 50%;
    transition: all 0.3s; position: relative;
  }
  .node-circle::after {
    content: ''; position: absolute; inset: -10px; border-radius: 50%; background: radial-gradient(circle, var(--gold) 0%, transparent 70%);
    opacity: 0; transition: opacity 0.3s; pointer-events: none;
  }
  .realm-node:hover .node-circle { border-color: var(--gold); background: var(--gold); box-shadow: 0 0 20px rgba(197,160,89,0.5); }
  .realm-node:hover .node-circle::after { opacity: 0.2; }
  
  .node-label { margin-top: 1rem; font-size: 0.75rem; letter-spacing: 0.2em; opacity: 0.5; transition: opacity 0.3s; }
  .realm-node:hover .node-label { opacity: 1; color: var(--gold); }
  
  .node-info {
    position: absolute; top: calc(100% + 15px); left: 50%; transform: translateX(-50%) translateY(10px);
    background: rgba(13,17,20,0.9); border: 1px solid var(--border); padding: 1.5rem;
    width: max-content; min-width: 200px; text-align: center; opacity: 0; pointer-events: none; transition: all 0.3s;
    backdrop-filter: blur(5px); z-index: 10;
  }
  .realm-node:hover .node-info { opacity: 1; transform: translateX(-50%) translateY(0); }
  .node-info h4 { margin: 0 0 0.5rem 0; color: var(--gold); font-size: 1rem; letter-spacing: 0.2em; }
  .node-info p { margin: 0 0 1rem 0; font-size: 0.8rem; color: var(--text); }
  .node-info span { font-size: 0.7rem; color: var(--muted); letter-spacing: 0.1em; text-transform: uppercase; }

  /* Gods Section */
  .gods-explorer { display: flex; height: 70vh; width: 100%; margin-top: 4rem; border: 1px solid var(--border); }
  .god-panel {
    flex: 1; position: relative; background: var(--bg-alt); border-right: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center; overflow: hidden;
    transition: flex 0.8s cubic-bezier(0.25, 1, 0.5, 1); cursor: none;
  }
  .god-panel:last-child { border-right: none; }
  .god-panel:hover { flex: 4; }
  
  .god-bg-color { position: absolute; inset: 0; opacity: 0; transition: opacity 0.8s; z-index: 1; }
  .god-panel:hover .god-bg-color { opacity: 1; }
  
  .god-image {
    position: absolute; bottom: -5%; left: 50%; transform: translateX(-50%);
    height: 90%; object-fit: contain; opacity: 0.5; transition: all 0.8s;
    filter: grayscale(100%); z-index: 2; pointer-events: none;
  }
  .god-panel:hover .god-image { opacity: 1; filter: grayscale(0%); transform: translateX(-50%) scale(1.05); }
  
  .god-name-vert {
    writing-mode: vertical-rl; text-orientation: mixed; transform: rotate(180deg);
    font-family: var(--font-serif); font-size: 2rem; letter-spacing: 0.3em; color: var(--muted); transition: all 0.5s;
  }
  .god-panel:hover .god-name-vert { opacity: 0; transform: rotate(180deg) translateY(20px); }
  
  .god-content {
    position: absolute; bottom: 0; left: 0; width: 100%; padding: 3rem;
    background: linear-gradient(0deg, var(--bg) 0%, transparent 100%);
    opacity: 0; transform: translateY(20px); transition: all 0.5s; pointer-events: none;
    z-index: 10;
  }
  .god-panel:hover .god-content { opacity: 1; transform: translateY(0); transition-delay: 0.2s; pointer-events: auto; }
  
  .god-content .god-runes { font-size: 1.5rem; color: var(--gold); margin-bottom: 1rem; opacity: 0.5; }
  .god-content h3 { font-family: var(--font-serif); font-size: clamp(2rem, 4vw, 4rem); margin: 0 0 0.5rem 0; color: var(--text); line-height: 1; }
  .god-content .god-title { font-size: 0.8rem; letter-spacing: 0.3em; color: var(--muted); margin: 0 0 2rem 0; text-transform: uppercase; }
  .god-tags { display: flex; gap: 1rem; flex-wrap: wrap; }
  .god-tags span { font-size: 0.7rem; letter-spacing: 0.1em; border: 1px solid var(--border); padding: 0.4rem 1rem; text-transform: uppercase; }

  @media (max-width: 768px) {
    .gods-explorer { flex-direction: column; height: 120vh; }
    .god-panel { border-right: none; border-bottom: 1px solid var(--border); }
    .god-name-vert { writing-mode: horizontal-tb; transform: none; font-size: 1.5rem; }
    .god-panel:hover .god-name-vert { transform: translateY(-10px); }
  }

  /* Sagas Section */
  .sagas-timeline { display: flex; flex-direction: column; gap: 6rem; margin-top: 6rem; position: relative; }
  .sagas-timeline::before {
    content: ''; position: absolute; left: 50%; top: 0; bottom: 0; width: 1px;
    background: linear-gradient(180deg, transparent, var(--border) 10%, var(--border) 90%, transparent); transform: translateX(-50%);
  }
  .saga-item { display: flex; justify-content: space-between; align-items: center; width: 100%; position: relative; }
  .saga-item:nth-child(even) { flex-direction: row-reverse; }
  .saga-content { width: 45%; padding: 2rem; transition: transform 0.5s; }
  .saga-item:hover .saga-content { transform: translateY(-5px); }
  
  .saga-num { font-family: var(--font-serif); font-size: 5rem; color: transparent; -webkit-text-stroke: 1px var(--border); line-height: 1; margin-bottom: 1rem; transition: all 0.5s; }
  .saga-item:hover .saga-num { color: var(--bg); -webkit-text-stroke: 1px var(--gold); text-shadow: 2px 2px 0px var(--gold); }
  .saga-title { font-family: var(--font-serif); font-size: 1.8rem; margin: 0 0 1rem 0; letter-spacing: 0.1em; }
  .saga-desc { color: var(--muted); line-height: 1.8; font-size: 0.95rem; }
  
  .saga-dot {
    position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);
    width: 10px; height: 10px; background: var(--bg); border: 2px solid var(--muted); border-radius: 50%; transition: all 0.3s;
  }
  .saga-item:hover .saga-dot { border-color: var(--gold); background: var(--gold); box-shadow: 0 0 15px var(--gold); }

  @media (max-width: 768px) {
    .sagas-timeline::before { left: 0; }
    .saga-item { flex-direction: column !important; align-items: flex-start; }
    .saga-content { width: 100%; padding: 2rem 0 2rem 2rem; }
    .saga-dot { left: 0; top: 4rem; }
  }

  /* Weapons Section */
  .weapons-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; margin-top: 4rem; }
  .weapon-card {
    background: var(--bg-alt); border: 1px solid var(--border); padding: 4rem 2rem;
    display: flex; flex-direction: column; align-items: center; text-align: center;
    transition: all 0.5s; cursor: none; position: relative; overflow: hidden;
  }
  .weapon-card::before {
    content: ''; position: absolute; inset: 0; background: radial-gradient(circle at 50% 0%, rgba(197,160,89,0.1) 0%, transparent 70%);
    opacity: 0; transition: opacity 0.5s;
  }
  .weapon-card:hover { border-color: rgba(197,160,89,0.3); transform: translateY(-10px); box-shadow: 0 20px 40px rgba(0,0,0,0.5); }
  .weapon-card:hover::before { opacity: 1; }
  
  .weapon-svg-container { width: 120px; height: 120px; margin-bottom: 3rem; color: var(--border); transition: all 0.8s cubic-bezier(0.25, 1, 0.5, 1); }
  .weapon-card:hover .weapon-svg-container { color: var(--gold); filter: drop-shadow(0 0 15px rgba(197,160,89,0.4)); transform: scale(1.1) rotateY(180deg); }
  
  .weapon-name { font-family: var(--font-serif); font-size: 1.5rem; margin: 0 0 0.5rem 0; letter-spacing: 0.2em; color: var(--text); }
  .weapon-owner { font-size: 0.75rem; letter-spacing: 0.2em; color: var(--gold); text-transform: uppercase; margin-bottom: 1.5rem; }
  .weapon-desc { font-size: 0.9rem; color: var(--muted); line-height: 1.6; }

  /* Runes Section */
  .runes-showcase { display: flex; justify-content: center; gap: clamp(1rem, 3vw, 3rem); margin: 4rem 0; flex-wrap: wrap; }
  .rune-item { text-align: center; cursor: none; transition: all 0.3s; padding: 1rem; }
  .rune-symbol { font-size: clamp(3rem, 5vw, 4rem); color: var(--muted); transition: all 0.3s; display: block; margin-bottom: 1rem; }
  .rune-name { font-size: 0.7rem; letter-spacing: 0.2em; color: transparent; transition: all 0.3s; text-transform: uppercase; }
  .rune-item:hover .rune-symbol { color: var(--gold); transform: scale(1.2); text-shadow: 0 0 20px rgba(197,160,89,0.5); }
  .rune-item:hover .rune-name { color: var(--text); }
  
  .translator-box {
    background: rgba(13,17,20,0.5); border: 1px solid var(--border); padding: 4rem 2rem;
    text-align: center; max-width: 600px; margin: 0 auto; backdrop-filter: blur(10px);
  }
  .rune-input {
    background: transparent; border: none; border-bottom: 1px solid var(--muted);
    color: var(--text); font-family: var(--font-sans); font-size: 1.2rem; text-align: center;
    padding: 1rem; outline: none; width: 100%; max-width: 400px; margin: 3rem 0; transition: border-color 0.3s;
    text-transform: uppercase; letter-spacing: 0.2em;
  }
  .rune-input:focus { border-color: var(--gold); }
  .rune-output { font-size: clamp(3rem, 5vw, 5rem); color: var(--gold); min-height: 6rem; letter-spacing: 0.2em; overflow-wrap: break-word; line-height: 1.2; text-shadow: 0 0 20px rgba(197,160,89,0.3); }

  /* Ragnarok Section */
  .ragnarok-wrapper { position: relative; min-height: 150vh; display: flex; flex-direction: column; align-items: center; transition: background 2s; }
  .is-ragnarok { background: #000; }
  .ragnarok-timeline { margin-top: 6rem; display: flex; flex-direction: column; align-items: center; gap: 4rem; z-index: 10; width: 100%; }
  .ragnarok-event {
    font-family: var(--font-serif); font-size: clamp(1.5rem, 4vw, 3rem); letter-spacing: 0.2em; text-align: center;
    color: var(--border); transition: all 1s; opacity: 0.5;
  }
  .ragnarok-event.revealed { opacity: 1; color: var(--ember); text-shadow: 0 0 30px rgba(217,92,20,0.6); transform: scale(1.05); }
  
  .rebirth { text-align: center; margin-top: 15vh; opacity: 0; transition: opacity 2s, transform 2s; transform: translateY(20px); z-index: 10; }
  .rebirth.revealed { opacity: 1; transform: translateY(0); }
  .rebirth h3 { font-family: var(--font-serif); font-size: clamp(2rem, 5vw, 4rem); letter-spacing: 0.2em; color: #fff; margin-bottom: 2rem; }
  
  /* Footer */
  footer { padding: 4rem 5vw 2rem; border-top: 1px solid var(--border); text-align: center; background: #000; position: relative; z-index: 10; }
  .footer-brand { font-family: var(--font-serif); font-size: 1.5rem; letter-spacing: 0.4em; margin-bottom: 0.5rem; }
  .footer-links { display: flex; justify-content: center; gap: 2rem; margin: 3rem 0; flex-wrap: wrap; }
  .footer-links a { color: var(--muted); text-decoration: none; font-size: 0.75rem; letter-spacing: 0.2em; transition: color 0.3s; }
  .footer-links a:hover { color: var(--text); }
  .footer-note { font-size: 0.7rem; color: rgba(255,255,255,0.2); letter-spacing: 0.1em; }

  /* Utility Animations */
  .fade-in-up { opacity: 0; transform: translateY(40px); transition: opacity 1s cubic-bezier(0.25, 1, 0.5, 1), transform 1s cubic-bezier(0.25, 1, 0.5, 1); }
  .fade-in-up.revealed { opacity: 1; transform: translateY(0); }
  
  @keyframes idleFloat { 0%,100%{transform: translateY(0px)} 50%{transform: translateY(-8px)} }
  @keyframes idleFloatSlow { 0%,100%{transform: translateY(0px)} 50%{transform: translateY(-5px)} }
  .tree-anim-1 { animation: idleFloat 6s ease-in-out infinite; }
  .tree-anim-2 { animation: idleFloatSlow 8s ease-in-out infinite; }
`;


// --- COMPONENTS ---

const FadeIn = ({ children, delay = 0, className = '' }) => {
  const ref = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.1, rootMargin: '-20% 0px -20% 0px' });
    
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`fade-in-up ${isVisible ? 'revealed' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

const CustomCursor = ({ isHovering }) => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const updatePos = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', updatePos);
    return () => window.removeEventListener('mousemove', updatePos);
  }, []);

  return (
    <>
      <div className="custom-cursor-dot" style={{ left: pos.x, top: pos.y }} />
      <div className={`custom-cursor-ring ${isHovering ? 'hover' : ''}`} style={{ left: pos.x, top: pos.y }} />
    </>
  );
};

const Particles = ({ count = 50, type = 'normal', layerClass = 'atmosphere-layer' }) => {
  const particles = useMemo(() => Array.from({ length: count }).map(() => ({
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * -20,
    opacity: Math.random() * 0.4 + 0.1
  })), [count]);

  return (
    <div className={layerClass}>
      {particles.map((p, i) => (
        <div key={i} className={`particle ${type}`} style={{
          left: `${p.left}%`, top: `${p.top}%`,
          width: p.size, height: p.size,
          animationDuration: `${p.duration}s`,
          animationDelay: `${p.delay}s`,
          opacity: p.opacity
        }} />
      ))}
    </div>
  );
};

const WeaponIcon = ({ name }) => {
  switch (name) {
    case 'MJÖLNIR':
      return (
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="25" y="30" width="50" height="25" />
          <rect x="42" y="55" width="16" height="35" />
          <path d="M25 30 L40 15 L60 15 L75 30" />
          <circle cx="50" cy="42" r="4" fill="currentColor"/>
        </svg>
      );
    case 'GUNGNIR':
      return (
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M50 10 L65 35 L55 35 L55 95 L45 95 L45 35 L35 35 Z" />
          <line x1="50" y1="10" x2="50" y2="95" strokeWidth="0.5" />
        </svg>
      );
    case 'DRAUPNIR':
      return (
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="50" cy="45" r="30" strokeWidth="2" />
          <circle cx="50" cy="85" r="5" fill="currentColor" />
          <circle cx="30" cy="75" r="3" fill="currentColor" />
          <circle cx="70" cy="75" r="3" fill="currentColor" />
          <circle cx="40" cy="90" r="2" fill="currentColor" />
          <circle cx="60" cy="90" r="2" fill="currentColor" />
        </svg>
      );
    case 'GJALLARHORN':
      return (
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M20 20 Q 50 85 85 85 L 85 65 Q 55 65 40 20 Z" />
          <path d="M30 40 L 48 30 M 45 60 L 65 50" strokeWidth="1" />
        </svg>
      );
    default:
      return <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="20" stroke="currentColor" fill="none"/></svg>;
  }
};


// --- MAIN APP COMPONENT ---

export default function Ragnarok() {
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isRagnarokMode, setIsRagnarokMode] = useState(false);

  // GSAP Refs
  const heroRef = useRef(null);
  const canvasRef = useRef(null);
  const globalBgRef = useRef(null);
  const scene1Ref = useRef(null);
  const scene2Ref = useRef(null);
  const s1TextRef = useRef(null);
  const s1TreeRef = useRef(null);
  const s1GroundRef = useRef(null);
  const s2TreeRef = useRef(null);
  const s2RockRef = useRef(null);
  const s2TextRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (!heroRef.current || !canvasRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.4,
          snap: {
            snapTo: (value, self) => {
              if (self?.direction === -1) return 0;
              if (self?.direction === 1) return 1;
              return Math.round(value);
            },
            duration: { min: 0.6, max: 1.2 },
            delay: 0.05,
            ease: 'power2.inOut'
          }
        }
      });

      // Global Background Parallax (pans slowly to the bottom)
      // 240vh image in 100vh container needs -58.33% to reach the bottom exactly.
      tl.to(globalBgRef.current, { yPercent: -58.33, ease: 'none', duration: 1 }, 0);

      // Scene 1 Exit Animations (0 to 0.5 timeline progress roughly)
      tl.to(scene1Ref.current, { opacity: 0, scale: 1.1, ease: 'power2.in', duration: 0.4 }, 0.1);
      tl.to(s1TextRef.current, { yPercent: 5, ease: 'none', duration: 0.5 }, 0);
      tl.to(s1TreeRef.current, { yPercent: 10, ease: 'none', duration: 0.5 }, 0);
      tl.to(s1GroundRef.current, { yPercent: 20, ease: 'none', duration: 0.5 }, 0);

      // Scene 2 Entry Animations (Zooms in continuously on scroll)
      tl.fromTo(s2TreeRef.current, 
        { opacity: 0, scale: 0.6, yPercent: 15 }, 
        { opacity: 1, scale: 1.3, yPercent: 0, ease: 'power1.out', duration: 0.6 }, 0.4
      );
      tl.fromTo(s2RockRef.current,
        { opacity: 0, scale: 0.6, xPercent: -20, yPercent: 20 },
        { opacity: 1, scale: 1.1, xPercent: 0, yPercent: 0, ease: 'power1.out', duration: 0.6 }, 0.4
      );
      tl.fromTo(s2TextRef.current,
        { opacity: 0, scale: 0.8, yPercent: -15 },
        { opacity: 1, scale: 1, yPercent: 0, ease: 'power1.out', duration: 0.6 }, 0.4
      );

    }, heroRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.id) {
          setActiveSection(entry.target.id);
        }
      });
    }, { rootMargin: '-40% 0px -40% 0px', threshold: 0 });

    document.querySelectorAll('section').forEach(sec => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      // Rough trigger for Ragnarok background mode
      const ragnarokEl = document.getElementById('ragnarok-trigger');
      if (ragnarokEl) {
        const rect = ragnarokEl.getBoundingClientRect();
        setIsRagnarokMode(rect.top < window.innerHeight / 2);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouse = (e) => {
      setMousePos({ 
        x: (e.clientX / window.innerWidth - 0.5) * 20, 
        y: (e.clientY / window.innerHeight - 0.5) * 20 
      });
      setIsHovering(!!e.target.closest('a, button, .interactive, .rune-input, .realm-node'));
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  const leftNavItems = [
    { rune: 'ᚠ', id: 'realms', title: 'Realms' },
    { rune: 'ᚱ', id: 'gods', title: 'Gods' },
    { rune: 'ᚲ', id: 'sagas', title: 'Sagas' },
    { rune: 'ᛒ', id: 'weapons', title: 'Weapons' },
    { rune: 'ᛗ', id: 'runes', title: 'Runes' },
  ];

  const NavOrnament = () => (
    <svg width="16" height="60" viewBox="0 0 16 60" fill="none" stroke="var(--gold)" style={{ opacity: 0.7 }}>
      <path d="M8 0 L8 60" strokeWidth="1" />
      <path d="M2 30 L14 30" strokeWidth="1" />
      <path d="M8 20 L13 30 L8 40 L3 30 Z" fill="var(--bg)" stroke="var(--gold)" strokeWidth="1" />
      <path d="M8 25 L10 30 L8 35 L6 30 Z" fill="var(--gold)" stroke="none" />
      <circle cx="8" cy="0" r="1.5" fill="var(--gold)" stroke="none" />
      <circle cx="8" cy="60" r="1.5" fill="var(--gold)" stroke="none" />
    </svg>
  );

  return (
    <div className={`${isRagnarokMode ? 'is-ragnarok' : ''}`}>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div className="app-background" />
      <CustomCursor isHovering={isHovering} />
      
      <Particles count={isRagnarokMode ? 100 : 40} type={isRagnarokMode ? 'ember' : 'normal'} />

      <nav className={`navbar ${scrollY > 50 ? 'scrolled' : ''}`}>
        <div className="nav-logo">
          <span style={{ fontSize: '1.2rem', marginRight: '0.5rem' }}>↑</span> MYTH
        </div>
        <div className="nav-links">
          <a href="#realms" className="interactive">REALMS</a>
          <a href="#gods" className="interactive">GODS</a>
          <a href="#sagas" className="interactive">SAGAS</a>
          <a href="#runes" className="interactive">RUNES</a>
          <a href="#ragnarok-trigger" className="interactive">RAGNARÖK</a>
        </div>
        <div className="interactive" style={{ width: '30px', height: '30px', borderRadius: '50%', border: '1px solid var(--muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>
          🔊
        </div>
      </nav>

      <div className="side-nav">
        <NavOrnament />
        <div className="nav-line-segment" style={{ flexGrow: 0.5 }}></div>
        
        {leftNavItems.map((item, i) => (
          <React.Fragment key={item.id}>
            <a 
              href={`#${item.id}`} 
              className={`nav-rune-link interactive ${activeSection === item.id ? 'active' : ''}`} 
              title={item.title}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {item.rune}
            </a>
            {i < leftNavItems.length - 1 && (
              <>
                <div className="nav-line-segment"></div>
                <span className="nav-dot">·</span>
                <div className="nav-line-segment"></div>
              </>
            )}
          </React.Fragment>
        ))}
        
        <div className="nav-line-segment" style={{ flexGrow: 0.5 }}></div>
        <NavOrnament />
      </div>

      <section id="hero" ref={heroRef} className="hero-section">
        <div ref={canvasRef} style={{ position: 'sticky', top: 0, height: '100vh', width: '100%', overflow: 'hidden' }}>
          
          {/* Global Background Layer */}
          <img 
            ref={globalBgRef}
            src={bgImage}
            alt="Hero Background"
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', minHeight: '240vh', objectFit: 'cover', objectPosition: 'center top', zIndex: 1, willChange: 'transform' }}
          />

          {/* Scene 1 */}
          <div ref={scene1Ref} style={{ position: 'absolute', inset: 0, zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)`, zIndex: 1 }}>
              <div ref={s1TextRef} style={{ position: 'absolute', top: '10%', left: '35%', transform: 'translateX(-50%)', width: '70%', height: 'auto', willChange: 'transform' }}>
                <img 
                  src={text1Img}
                  alt="Text 1"
                  style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                />
              </div>
            </div>
            
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', transform: `translate(${mousePos.x * 1.5}px, ${mousePos.y * 1.5}px)`, zIndex: 2 }}>
              <div ref={s1TreeRef} style={{ position: 'absolute', bottom: '2%', left: '65%', transform: 'translateX(-50%)', height: '95%', willChange: 'transform' }}>
                <img 
                  src={treeImg}
                  alt="Tree"
                  className="tree-anim-1"
                  style={{ height: '100%', objectFit: 'contain' }}
                />
              </div>
            </div>
            
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', transform: `translate(${mousePos.x * 2.5}px, ${mousePos.y * 2.5}px)`, zIndex: 5 }}>
              <div ref={s1GroundRef} style={{ position: 'absolute', bottom: '-2%', left: 0, width: '100%', height: 'auto', minHeight: '20vh', willChange: 'transform' }}>
                <img 
                  src={groundImg}
                  alt="Ground"
                  style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'bottom center', pointerEvents: 'none' }}
                />
              </div>
            </div>
          </div>

          {/* Scene 2 */}
          <div ref={scene2Ref} style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none', display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
            
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', transform: `translate(${mousePos.x * 0.8}px, ${mousePos.y * 0.8}px)`, zIndex: 2 }}>
              <div ref={s2TextRef} style={{ position: 'absolute', top: '15%', left: '40%', transform: 'translateX(-50%)', width: '60%', height: 'auto', willChange: 'transform, opacity' }}>
                <img 
                  src={text2Img}
                  alt="Text 2"
                  style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                />
              </div>
            </div>

            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', transform: `translate(${mousePos.x * 2.5}px, ${mousePos.y * 2.5}px)`, zIndex: 5 }}>
              <div ref={s2RockRef} style={{ position: 'absolute', bottom: '-20%', left: '-9%', height: '80%', willChange: 'transform, opacity' }}>
                <img 
                  src={rockImg}
                  alt="Rock"
                  style={{ height: '100%', objectFit: 'contain' }}
                />
              </div>
            </div>

            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', transform: `translate(${mousePos.x * 1.2}px, ${mousePos.y * 1.2}px)` }}>
              <div ref={s2TreeRef} style={{ position: 'absolute', bottom: '-14%', left: '55%', height: '110%', willChange: 'transform, opacity' }}>
                <img 
                  src={tree2Img}
                  alt="Tree 2"
                  className="tree-anim-2"
                  style={{ height: '100%', objectFit: 'contain' }}
                />
              </div>
            </div>
            
          </div>
          
          <Particles count={30} type="ember" layerClass="hero-dust-layer" />

          <div className="scroll-indicator" style={{ zIndex: 10 }}>
            <span className="text-micro">SCROLL TO ENTER</span>
            <div className="scroll-line"></div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-container">
        <div className="marquee-content text-micro">
          <span>THE MYTHS LIVE ON • RAGNARÖK APPROACHES • THE NINE REALMS AWAIT • THE GODS AWAKEN •</span>
          <span>THE MYTHS LIVE ON • RAGNARÖK APPROACHES • THE NINE REALMS AWAIT • THE GODS AWAKEN •</span>
          <span>THE MYTHS LIVE ON • RAGNARÖK APPROACHES • THE NINE REALMS AWAIT • THE GODS AWAKEN •</span>
          <span>THE MYTHS LIVE ON • RAGNARÖK APPROACHES • THE NINE REALMS AWAIT • THE GODS AWAKEN •</span>
        </div>
      </div>

      <section id="realms">
        <div className="container">
          <FadeIn>
            <p className="text-micro" style={{ textAlign: 'center', color: 'var(--gold)' }}>YGGDRASIL</p>
            <h2 className="section-title serif">THE WORLD IS A TREE</h2>
            <p className="text-micro" style={{ textAlign: 'center' }}>Nine realms. One cosmic axis. Infinite stories.</p>
          </FadeIn>

          <FadeIn delay={300}>
            <div className="yggdrasil-container interactive">
              <svg className="yggdrasil-svg">
                {REALMS.map(r => (
                  <line key={r.id} x1="50%" y1="50%" x2={r.left} y2={r.top} />
                ))}
                {/* Central Trunk */}
                <line x1="50%" y1="15%" x2="50%" y2="90%" strokeDasharray="none" />
              </svg>
              
              {REALMS.map(realm => (
                <div key={realm.id} className="realm-node" style={{ left: realm.left, top: realm.top }}>
                  <div className="node-circle"></div>
                  <span className="node-label">{realm.name}</span>
                  <div className="node-info">
                    <h4>{realm.name}</h4>
                    <p>{realm.desc}</p>
                    <span>{realm.gods}</span>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <section id="gods" style={{ padding: 0 }}>
        <FadeIn className="w-100" style={{ width: '100%' }}>
          <div className="container" style={{ padding: '5vw 5vw 0' }}>
            <p className="text-micro" style={{ color: 'var(--gold)' }}>THE AESIR & VANIR</p>
            <h2 className="section-title serif" style={{ textAlign: 'left', margin: 0 }}>MEET THE GODS</h2>
          </div>
          
          <div className="gods-explorer">
            {GODS.map((god, i) => (
              <div key={i} className="god-panel interactive">
                <div className="god-bg-color" style={{ background: god.color }}></div>
                <img src={god.image} alt={god.name} className="god-image" />
                <div className="god-name-vert">{god.name}</div>
                <div className="god-content">
                  <div className="god-runes">{god.runes}</div>
                  <h3 className="serif">{god.name}</h3>
                  <p className="god-title">{god.title}</p>
                  <div className="god-tags">
                    {god.tags.map(t => <span key={t}>{t}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      <section id="sagas">
        <div className="container">
          <FadeIn>
            <p className="text-micro" style={{ textAlign: 'center', color: 'var(--gold)' }}>LORE</p>
            <h2 className="section-title serif">THE SAGAS</h2>
          </FadeIn>

          <div className="sagas-timeline">
            {SAGAS.map((saga, i) => (
              <FadeIn key={i} delay={200}>
                <div className="saga-item interactive">
                  <div className="saga-dot"></div>
                  <div className="saga-content">
                    <div className="saga-num">{saga.num}</div>
                    <h3 className="saga-title">{saga.title}</h3>
                    <p className="saga-desc">{saga.desc}</p>
                    <a href="#sagas" className="text-micro" style={{ color: 'var(--gold)', textDecoration: 'none', display: 'inline-block', marginTop: '1rem' }}>[ ENTER STORY ]</a>
                  </div>
                  <div style={{ width: '45%' }}></div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section id="weapons">
        <div className="container">
          <FadeIn>
            <p className="text-micro" style={{ textAlign: 'center', color: 'var(--gold)' }}>ARTIFACTS</p>
            <h2 className="section-title serif">WEAPONS OF THE GODS</h2>
          </FadeIn>

          <div className="weapons-grid">
            {[
              { name: 'MJÖLNIR', owner: "Thor's Hammer", desc: "Forged by the dwarves Brokkr and Sindri. It never misses its mark." },
              { name: 'GUNGNIR', owner: "Odin's Spear", desc: "Crafted by the Sons of Ivaldi, it strikes true no matter the skill of the wielder." },
              { name: 'DRAUPNIR', owner: "The Ring of Odin", desc: "Every ninth night, eight new gold rings drip from it, equally heavy." },
              { name: 'GJALLARHORN', owner: "Heimdall's Horn", desc: "Its blast can be heard throughout all the Nine Realms, signaling the end." }
            ].map((w, i) => (
              <FadeIn key={w.name} delay={i * 100}>
                <div className="weapon-card interactive">
                  <div className="weapon-svg-container">
                    <WeaponIcon name={w.name} />
                  </div>
                  <h3 className="weapon-name">{w.name}</h3>
                  <div className="weapon-owner">{w.owner}</div>
                  <p className="weapon-desc">{w.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section id="runes">
        <div className="container">
          <FadeIn>
            <p className="text-micro" style={{ textAlign: 'center', color: 'var(--gold)' }}>ELDER FUTHARK</p>
            <h2 className="section-title serif">THE LANGUAGE OF FATE</h2>
          </FadeIn>

          <FadeIn delay={200}>
            <div className="runes-showcase">
              {[
                { r: 'ᚠ', n: 'FEHU' }, { r: 'ᚢ', n: 'URUZ' }, { r: 'ᚦ', n: 'THURISAZ' },
                { r: 'ᚨ', n: 'ANSUZ' }, { r: 'ᚱ', n: 'RAIDHO' }
              ].map(rune => (
                <div key={rune.n} className="rune-item interactive">
                  <span className="rune-symbol">{rune.r}</span>
                  <span className="rune-name">{rune.n}</span>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={400}>
            <RuneTranslator />
          </FadeIn>
        </div>
      </section>

      <div id="ragnarok-trigger"></div>
      
      <section className="ragnarok-wrapper">
        <div className="container" style={{ paddingTop: '10vh' }}>
          <FadeIn>
            <p className="text-micro" style={{ textAlign: 'center', color: 'var(--ember)' }}>THE PROPHECY</p>
            <h2 className="section-title serif" style={{ fontSize: 'clamp(4rem, 8vw, 8rem)', letterSpacing: '0.1em' }}>
              {Array.from("RAGNARÖK").map((char, i) => (
                <span key={i} className={`prop-letter-${i}`}>{char}</span>
              ))}
            </h2>
            <p className="text-micro" style={{ textAlign: 'center', color: 'var(--muted)' }}>The fate of the gods.</p>
          </FadeIn>

          <div className="ragnarok-timeline">
            {RAGNAROK_EVENTS.map((ev, i) => (
              <FadeIn key={i}>
                <div className="ragnarok-event interactive">{ev}</div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={500}>
            <div className="rebirth">
              <h3 className="serif">AND YET, THE WORLD RETURNS.</h3>
              <p className="text-micro mb-4">The stories survived. Now discover them.</p>
              <div style={{ marginTop: '3rem' }}>
                <a href="#realms" className="btn btn-primary interactive">ENTER RAGNARÖK</a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <footer>
        <div className="container">
          <div className="footer-brand">ᛏ RAGNARÖK</div>
          <p className="text-micro">A DIGITAL ATLAS OF NORSE MYTHOLOGY</p>
          <div className="footer-links">
            <a href="#realms" className="interactive">REALMS</a>
            <a href="#gods" className="interactive">GODS</a>
            <a href="#sagas" className="interactive">SAGAS</a>
            <a href="#runes" className="interactive">RUNES</a>
            <a href="#" className="interactive">SOURCES</a>
          </div>
          <p className="footer-note">Inspired by surviving Old Norse literary traditions and later interpretations.</p>
        </div>
      </footer>
    </div>
  );
}

const RuneTranslator = () => {
  const [input, setInput] = useState('');
  const translated = input.toLowerCase().split('').map(c => RUNE_MAP[c] || c).join('');
  
  return (
    <div className="translator-box">
      <h3 className="serif" style={{ marginBottom: '1rem' }}>WRITE YOUR WORD</h3>
      <input 
        type="text" 
        value={input} 
        onChange={e => setInput(e.target.value)}
        placeholder="Enter text..."
        className="rune-input interactive"
        maxLength={30}
      />
      <div className="rune-output">{translated}</div>
      <p className="text-micro" style={{ marginTop: '2rem' }}>Modern transliteration / interpretation</p>
    </div>
  );
};
