// =============================================================================
// HERO & UI PROPS (from new-assets/assets/UI/props)
// =============================================================================
import knightThroneDesktop from '../../../public/PNGS/new-assets/assets/UI/props/desktop/Knight_Throne.webp';
import emptyThroneDesktop from '../../../public/PNGS/new-assets/assets/UI/props/desktop/Empty_Throne.webp';
import floorDesktop from '../../../public/PNGS/new-assets/assets/UI/props/desktop/Floor.webp';
import bgWindowDesktop from '../../../public/PNGS/new-assets/assets/UI/props/desktop/bg-window.webp';
import heroBg2Desktop from '../../../public/PNGS/new-assets/assets/UI/props/desktop/hero-bg2.webp';
import scene2Desktop from '../../../public/PNGS/new-assets/assets/UI/props/desktop/scene_2.webp';
import knightQueenDesktop from '../../../public/PNGS/new-assets/assets/UI/props/desktop/king_queen.webp';

import knightThroneMobile from '../../../public/PNGS/new-assets/assets/UI/props/mobile/Knight_Throne.webp';
import emptyThroneMobile from '../../../public/PNGS/new-assets/assets/UI/props/mobile/Empty_Throne.webp';
import floorMobile from '../../../public/PNGS/new-assets/assets/UI/props/mobile/Floor.webp';
import bgWindowMobile from '../../../public/PNGS/new-assets/assets/UI/props/mobile/bg-window.webp';
import heroBg2Mobile from '../../../public/PNGS/new-assets/assets/UI/props/mobile/hero-bg2.webp';
import scene2Mobile from '../../../public/PNGS/new-assets/assets/UI/props/mobile/scene_2.webp';
import princeMobile from '../../../public/PNGS/new-assets/assets/UI/props/mobile/prince.webp';

import collegeLogoImgImport from '../../../public/PNGS/new-assets/assets/UI/props/COLLEGE_LOGO_WHITE.png';

// =============================================================================
// SECTION IMAGES (from new-assets/assets/section-images)
// =============================================================================
import heroBgDesktop from '../../../public/PNGS/new-assets/assets/UI/props/desktop/hero-bg.webp';
import heroBgMobile from '../../../public/PNGS/new-assets/assets/UI/props/mobile/hero-bg.webp';
import wallImgImportDesktop from '../../../public/PNGS/new-assets/assets/section-images/desktop/wall.webp';
import wallImgImportMobile from '../../../public/PNGS/new-assets/assets/section-images/mobile/wall.webp';
import aboutSectionImgImport from '../../../public/PNGS/new-assets/assets/section-images/about-section.webp';
import knightImgImport from '../../../public/PNGS/new-assets/assets/section-images/about-section.webp'

// =============================================================================
// TEXTURES (from new-assets/assets/Textures)
// =============================================================================
import texture8Import from '../../../public/PNGS/new-assets/assets/Textures/texture8.webp';
import ribbonTex1Import from '../../../public/PNGS/new-assets/assets/Textures/texture1.webp';

// =============================================================================
// UI SECTION PANELS (from new-assets/assets/UI)
// =============================================================================
import aboutSectionUiImgImport from '../../../public/PNGS/new-assets/assets/UI/About-section.webp';
import characterSectionUiImgImport from '../../../public/PNGS/new-assets/assets/UI/Character-section.webp';
import counterSectionUiImgImport from '../../../public/PNGS/new-assets/assets/UI/Counter-section.webp';
import heroSectionUiImgImport from '../../../public/PNGS/new-assets/assets/UI/Hero-section.webp';
import scene2UiImgImport from '../../../public/PNGS/new-assets/assets/UI/scene_2.webp';

// =============================================================================
// ROOT ASSETS (from new-assets/assets)
// =============================================================================
import catapultImgImportDesktop from '../../../public/PNGS/new-assets/assets/section-images/desktop/catapult.webp';
import catapultImgImportMobile from '../../../public/PNGS/new-assets/assets/section-images/mobile/catapult.webp';
import dualImgImportDesktop from '../../../public/PNGS/new-assets/assets/section-images/desktop/dual.webp';
import dualImgImportMobile from '../../../public/PNGS/new-assets/assets/section-images/mobile/dual.webp';

// =============================================================================
// PUBLIC ASSETS (from new-assets/public/assets)
// =============================================================================
import aboutWebpImport from '../../../public/PNGS/new-assets/public/assets/about.webp';
import emptyThronePngImport from '../../../public/PNGS/new-assets/public/assets/Empty-Throne.png.webp';
import knightThronePngImport from '../../../public/PNGS/new-assets/public/assets/Knight-Throne.png.webp';

// Helper to extract string URL for compatibility with standard JSX <img>, SVG <image>, and CSS url()
const getSrc = (img) => (typeof img === 'object' && img?.src ? img.src : img);

// Main exports matching HeroSection requirements
export const knightThroneImg = { desktop: getSrc(knightThroneDesktop), mobile: getSrc(knightThroneMobile) };
export const emptyThroneImg = { desktop: getSrc(emptyThroneDesktop), mobile: getSrc(emptyThroneMobile) };
export const floorImg = { desktop: getSrc(floorDesktop), mobile: getSrc(floorMobile) };
export const bgWindowImg = { desktop: getSrc(bgWindowDesktop), mobile: getSrc(bgWindowMobile) };
export const heroBg2Img = { desktop: getSrc(heroBg2Desktop), mobile: getSrc(heroBg2Mobile) };
export const scene2Img = { desktop: getSrc(scene2Desktop), mobile: getSrc(scene2Mobile) };
export const knightQueenImg = { desktop: getSrc(knightQueenDesktop), mobile: getSrc(princeMobile) };
export const collegeLogoImg = getSrc(collegeLogoImgImport);

export const heroBg = { desktop: getSrc(heroBgDesktop), mobile: getSrc(heroBgMobile) };
export const wallImg = { desktop: getSrc(wallImgImportDesktop), mobile: getSrc(wallImgImportMobile) };
export const aboutSectionImg = getSrc(aboutSectionImgImport);
export const characterPrinceSectionImg = getSrc(princeMobile);
export const knightImg=getSrc(knightImgImport)


export const texture8 = getSrc(texture8Import);
export const ribbonTex1 = getSrc(ribbonTex1Import);

export const aboutSectionUiImg = getSrc(aboutSectionUiImgImport);
export const characterSectionUiImg = getSrc(characterSectionUiImgImport);
export const counterSectionUiImg = getSrc(counterSectionUiImgImport);
export const heroSectionUiImg = getSrc(heroSectionUiImgImport);
export const scene2UiImg = getSrc(scene2UiImgImport);

export const catapultImg = { desktop: getSrc(catapultImgImportDesktop), mobile: getSrc(catapultImgImportMobile) };
export const dualImg = { desktop: getSrc(dualImgImportDesktop), mobile: getSrc(dualImgImportMobile) };

export const aboutWebp = getSrc(aboutWebpImport);
export const emptyThronePng = getSrc(emptyThronePngImport);
export const knightThronePng = getSrc(knightThronePngImport);

const HeroAssets = {
  knightThroneImg,
  emptyThroneImg,
  floorImg,
  bgWindowImg,
  heroBg2Img,
  scene2Img,
  knightQueenImg,
  collegeLogoImg,
  heroBg,
  wallImg,
  aboutSectionImg,
  characterPrinceSectionImg,
  texture8,
  ribbonTex1,
  aboutSectionUiImg,
  characterSectionUiImg,
  counterSectionUiImg,
  heroSectionUiImg,
  scene2UiImg,
  catapultImg,
  dualImg,
  aboutWebp,
  emptyThronePng,
  
  knightThronePng,
};

export default HeroAssets;