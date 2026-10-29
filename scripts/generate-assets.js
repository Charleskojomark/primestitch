// scripts/generate-assets.js
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public', 'images');

function saveSvg(subDir, fileName, content) {
  const targetDir = path.join(publicDir, subDir);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  fs.writeFileSync(path.join(targetDir, fileName), content.trim(), 'utf8');
}

// -------------------------------------------------------------
// 1. GARMENTS (1200 x 1600, 3:4)
// -------------------------------------------------------------
function makeKaftanSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1600" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0B1528"/>
      <stop offset="60%" stop-color="#14213d"/>
      <stop offset="100%" stop-color="#0B1528"/>
    </linearGradient>
    <linearGradient id="fabric" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="40%" stop-color="#F8FAFC"/>
      <stop offset="100%" stop-color="#E2E8F0"/>
    </linearGradient>
    <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E5A93C"/>
      <stop offset="50%" stop-color="#C28B28"/>
      <stop offset="100%" stop-color="#8C5E14"/>
    </linearGradient>
    <pattern id="weave" width="20" height="20" patternUnits="userSpaceOnUse">
      <path d="M 0 10 L 20 10 M 10 0 L 10 20" stroke="#CBD5E1" stroke-width="0.75" opacity="0.3"/>
    </pattern>
  </defs>

  <rect width="1200" height="1600" fill="url(#bg)"/>

  <!-- Measuring tape aesthetic border -->
  <g opacity="0.4">
    <line x1="40" y1="40" x2="1160" y2="40" stroke="#C28B28" stroke-dasharray="8,8" stroke-width="2"/>
    <line x1="40" y1="1560" x2="1160" y2="1560" stroke="#C28B28" stroke-dasharray="8,8" stroke-width="2"/>
    <line x1="40" y1="40" x2="40" y2="1560" stroke="#C28B28" stroke-dasharray="8,8" stroke-width="2"/>
    <line x1="1160" y1="40" x2="1160" y2="1560" stroke="#C28B28" stroke-dasharray="8,8" stroke-width="2"/>
  </g>

  <!-- Tailor Watermark & Header -->
  <text x="80" y="100" fill="#C28B28" font-family="monospace" font-size="20" letter-spacing="4">PRIMESTITCH ABA MASTER ATELIER // SPEC 3:4</text>
  <text x="1120" y="100" text-anchor="end" fill="#94A3B8" font-family="monospace" font-size="18">REF: DES-KAFTAN-01</text>

  <!-- Garment Silhouette Group -->
  <g transform="translate(600, 200)">
    <!-- Shadow -->
    <path d="M -240 180 L -380 500 L -300 540 L -210 380 L -220 1150 L 220 1150 L 210 380 L 300 540 L 380 500 L 240 180 Z" fill="#000000" opacity="0.35" filter="blur(20px)"/>

    <!-- Main Kaftan Body & Sleeves -->
    <path d="M 0 50 C -70 50 -120 70 -240 160 L -380 480 L -300 520 L -200 360 L -210 1120 L -30 1120 L -30 900 L 30 900 L 30 1120 L 210 1120 L 200 360 L 300 520 L 380 480 L 240 160 C 120 70 70 50 0 50 Z" fill="url(#fabric)" stroke="#CBD5E1" stroke-width="3"/>
    
    <!-- Weave texture overlay -->
    <path d="M 0 50 C -70 50 -120 70 -240 160 L -380 480 L -300 520 L -200 360 L -210 1120 L -30 1120 L -30 900 L 30 900 L 30 1120 L 210 1120 L 200 360 L 300 520 L 380 480 L 240 160 C 120 70 70 50 0 50 Z" fill="url(#weave)"/>

    <!-- Basting Seams -->
    <line x1="-200" y1="360" x2="-210" y2="1120" stroke="#C28B28" stroke-dasharray="14,8" stroke-width="3"/>
    <line x1="200" y1="360" x2="210" y2="1120" stroke="#C28B28" stroke-dasharray="14,8" stroke-width="3"/>

    <!-- Center Fold Line -->
    <line x1="0" y1="280" x2="0" y2="1120" stroke="#94A3B8" stroke-dasharray="6,4" stroke-width="2"/>

    <!-- Intricate Traditional Geometric Neckline Embroidery Plaque -->
    <!-- Collar Band -->
    <path d="M -70 60 C -40 85 40 85 70 60 C 50 35 -50 35 -70 60 Z" fill="url(#gold)" stroke="#8C5E14" stroke-width="2"/>
    
    <!-- Embroidered Placket Bib -->
    <polygon points="-75,85 75,85 85,290 0,380 -85,290" fill="#0B1528" stroke="url(#gold)" stroke-width="4"/>
    <polygon points="-60,100 60,100 68,275 0,350 -68,275" fill="none" stroke="url(#gold)" stroke-width="2" stroke-dasharray="8,4"/>
    
    <!-- Inner Geometric Knots -->
    <path d="M 0 120 L 35 155 L 0 190 L -35 155 Z M 0 200 L 35 235 L 0 270 L -35 235 Z M 0 280 L 25 305 L 0 330 L -25 305 Z" fill="url(#gold)"/>
    <circle cx="0" cy="155" r="5" fill="#0B1528"/>
    <circle cx="0" cy="235" r="5" fill="#0B1528"/>
    <circle cx="0" cy="305" r="4" fill="#0B1528"/>

    <!-- Side Vent Notches -->
    <circle cx="-210" cy="900" r="8" fill="#C28B28"/>
    <circle cx="210" cy="900" r="8" fill="#C28B28"/>

    <!-- Trousers Peeking Out -->
    <rect x="-170" y="1120" width="130" height="240" fill="#E2E8F0" stroke="#CBD5E1" stroke-width="2"/>
    <rect x="40" y="1120" width="130" height="240" fill="#E2E8F0" stroke="#CBD5E1" stroke-width="2"/>
    <line x1="-105" y1="1120" x2="-105" y2="1360" stroke="#94A3B8" stroke-dasharray="10,6" stroke-width="2"/>
    <line x1="105" y1="1120" x2="105" y2="1360" stroke="#94A3B8" stroke-dasharray="10,6" stroke-width="2"/>
  </g>

  <!-- Typography Card at Bottom -->
  <g transform="translate(600, 1480)">
    <rect x="-480" y="-55" width="960" height="90" rx="6" fill="#0B1528" stroke="#C28B28" stroke-width="2"/>
    <text x="-440" y="-8" fill="#FFFFFF" font-family="sans-serif" font-weight="bold" font-size="28">ARCHITECTURAL ROYAL KAFTAN</text>
    <text x="-440" y="22" fill="#94A3B8" font-family="sans-serif" font-size="16">Imperial Guinea Brocade (280 GSM) // Hand-Embroidered Geometric Neckline</text>
    <text x="440" y="6" text-anchor="end" fill="#C28B28" font-family="monospace" font-weight="bold" font-size="30">&#8358;55,000</text>
  </g>
</svg>`;
}

function makeAgbadaSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1600" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#050B14"/>
      <stop offset="60%" stop-color="#0E1B33"/>
      <stop offset="100%" stop-color="#050B14"/>
    </linearGradient>
    <linearGradient id="adire" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#14213d"/>
      <stop offset="50%" stop-color="#1D2D50"/>
      <stop offset="100%" stop-color="#0B1528"/>
    </linearGradient>
    <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E5A93C"/>
      <stop offset="50%" stop-color="#C28B28"/>
      <stop offset="100%" stop-color="#8C5E14"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="1600" fill="url(#bg)"/>

  <!-- Border & Specs -->
  <line x1="40" y1="40" x2="1160" y2="40" stroke="#C28B28" stroke-dasharray="8,8" stroke-width="2" opacity="0.4"/>
  <line x1="40" y1="1560" x2="1160" y2="1560" stroke="#C28B28" stroke-dasharray="8,8" stroke-width="2" opacity="0.4"/>
  <text x="80" y="100" fill="#C28B28" font-family="monospace" font-size="20" letter-spacing="4">PRIMESTITCH ABA MASTER ATELIER // 3-PIECE GRANDEUR</text>
  <text x="1120" y="100" text-anchor="end" fill="#94A3B8" font-family="monospace" font-size="18">REF: DES-AGBADA-02</text>

  <!-- Agbada Wide Wings Silhouette -->
  <g transform="translate(600, 240)">
    <!-- Inner Buba -->
    <path d="M -160 120 L -180 1000 L 180 1000 L 160 120 Z" fill="#0B1528" stroke="#1E293B" stroke-width="2"/>

    <!-- Trousers (Sokoto) -->
    <rect x="-150" y="1000" width="120" height="260" fill="#0E1B33" stroke="#1E293B" stroke-width="2"/>
    <rect x="30" y="1000" width="120" height="260" fill="#0E1B33" stroke="#1E293B" stroke-width="2"/>

    <!-- Grand Agbada Wings -->
    <path d="M 0 50 C -150 40 -350 120 -500 380 C -520 420 -510 460 -460 480 L -340 520 C -280 400 -240 320 -220 280 L -250 1060 L 250 1060 L 220 280 C 240 320 280 400 340 520 L 460 480 C 510 460 520 420 500 380 C 350 120 150 40 0 50 Z" fill="url(#adire)" stroke="#C28B28" stroke-width="3"/>

    <!-- Shoulder Basting pleats -->
    <path d="M -300 240 Q -240 280 -220 380" stroke="#C28B28" stroke-dasharray="10,6" stroke-width="2" fill="none"/>
    <path d="M -360 270 Q -290 320 -250 420" stroke="#C28B28" stroke-dasharray="10,6" stroke-width="2" fill="none"/>
    <path d="M 300 240 Q 240 280 220 380" stroke="#C28B28" stroke-dasharray="10,6" stroke-width="2" fill="none"/>
    <path d="M 360 270 Q 290 320 250 420" stroke="#C28B28" stroke-dasharray="10,6" stroke-width="2" fill="none"/>

    <!-- Massive Regal Gold Embroidered Chest Plaque -->
    <g transform="translate(0, 180)">
      <circle cx="0" cy="120" r="130" fill="#0A111E" stroke="url(#gold)" stroke-width="4"/>
      <circle cx="0" cy="120" r="105" fill="none" stroke="url(#gold)" stroke-width="2" stroke-dasharray="6,4"/>
      <!-- Radiating Sunburst / Star Motif -->
      <path d="M 0 20 L 15 100 L 95 120 L 15 140 L 0 220 L -15 140 L -95 120 L -15 100 Z" fill="url(#gold)"/>
      <circle cx="0" cy="120" r="24" fill="#0A111E" stroke="url(#gold)" stroke-width="3"/>
      <circle cx="0" cy="120" r="10" fill="url(#gold)"/>
    </g>

    <!-- Collar Cutout -->
    <path d="M -80 50 C -40 90 40 90 80 50 Z" fill="#050B14" stroke="url(#gold)" stroke-width="3"/>
  </g>

  <!-- Typography Card -->
  <g transform="translate(600, 1480)">
    <rect x="-480" y="-55" width="960" height="90" rx="6" fill="#0B1528" stroke="#C28B28" stroke-width="2"/>
    <text x="-440" y="-8" fill="#FFFFFF" font-family="sans-serif" font-weight="bold" font-size="28">CEREMONIAL ISIAGU NATIVE SET</text>
    <text x="-440" y="22" fill="#94A3B8" font-family="sans-serif" font-size="16">16-Dip Adire Damask (340 GSM) // Sovereign Gold Lion Motif &amp; Tailored Trousers</text>
    <text x="440" y="6" text-anchor="end" fill="#C28B28" font-family="monospace" font-weight="bold" font-size="30">&#8358;95,000</text>
  </g>
</svg>`;
}

function makeSenatorSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1600" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0A111E"/>
      <stop offset="50%" stop-color="#111E33"/>
      <stop offset="100%" stop-color="#0A111E"/>
    </linearGradient>
    <linearGradient id="senatorCloth" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#152238"/>
      <stop offset="50%" stop-color="#0B1528"/>
      <stop offset="100%" stop-color="#050B14"/>
    </linearGradient>
    <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F3C667"/>
      <stop offset="50%" stop-color="#C28B28"/>
      <stop offset="100%" stop-color="#8C5E14"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="1600" fill="url(#bg)"/>

  <line x1="40" y1="40" x2="1160" y2="40" stroke="#C28B28" stroke-dasharray="8,8" stroke-width="2" opacity="0.4"/>
  <line x1="40" y1="1560" x2="1160" y2="1560" stroke="#C28B28" stroke-dasharray="8,8" stroke-width="2" opacity="0.4"/>
  <text x="80" y="100" fill="#C28B28" font-family="monospace" font-size="20" letter-spacing="4">PRIMESTITCH ABA MASTER ATELIER // EXECUTIVE BESPOKE</text>
  <text x="1120" y="100" text-anchor="end" fill="#94A3B8" font-family="monospace" font-size="18">REF: DES-SENATOR-03</text>

  <g transform="translate(600, 220)">
    <!-- Senator Tunic -->
    <path d="M 0 50 C -90 50 -160 80 -250 170 L -330 520 L -240 550 L -180 340 L -200 960 L 200 960 L 180 340 L 240 550 L 330 520 L 250 170 C 160 80 90 50 0 50 Z" fill="url(#senatorCloth)" stroke="#223354" stroke-width="3"/>

    <!-- Trousers -->
    <rect x="-160" y="960" width="120" height="380" fill="#080F1D" stroke="#1A2840" stroke-width="2"/>
    <rect x="40" y="960" width="120" height="380" fill="#080F1D" stroke="#1A2840" stroke-width="2"/>
    <line x1="-100" y1="960" x2="-100" y2="1340" stroke="#C28B28" stroke-dasharray="12,6" stroke-width="2"/>
    <line x1="100" y1="960" x2="100" y2="1340" stroke="#C28B28" stroke-dasharray="12,6" stroke-width="2"/>

    <!-- Mandarin Band Collar -->
    <path d="M -65 50 L -65 25 C -40 20 40 20 65 25 L 65 50 Z" fill="#0B1528" stroke="url(#gold)" stroke-width="3"/>
    <circle cx="0" cy="38" r="4" fill="url(#gold)"/>

    <!-- Concealed Asymmetric Front Placket with Gold Detail -->
    <rect x="-15" y="50" width="30" height="480" fill="#080E1A" stroke="#223354" stroke-width="2"/>
    <line x1="15" y1="50" x2="15" y2="530" stroke="url(#gold)" stroke-width="2"/>
    <circle cx="0" cy="100" r="5" fill="url(#gold)"/>
    <circle cx="0" cy="180" r="5" fill="url(#gold)"/>
    <circle cx="0" cy="260" r="5" fill="url(#gold)"/>
    <circle cx="0" cy="340" r="5" fill="url(#gold)"/>
    <circle cx="0" cy="420" r="5" fill="url(#gold)"/>

    <!-- Chest Welt Pocket with Brass Pocket Square -->
    <rect x="-140" y="160" width="90" height="12" fill="#080E1A" stroke="url(#gold)" stroke-width="2"/>
    <polygon points="-115,160 -95,120 -80,160" fill="url(#gold)"/>

    <!-- Side Seam Slits & Tailoring Basting -->
    <line x1="-195" y1="700" x2="-195" y2="960" stroke="url(#gold)" stroke-dasharray="10,6" stroke-width="3"/>
    <line x1="195" y1="700" x2="195" y2="960" stroke="url(#gold)" stroke-dasharray="10,6" stroke-width="3"/>
  </g>

  <!-- Typography Card -->
  <g transform="translate(600, 1480)">
    <rect x="-480" y="-55" width="960" height="90" rx="6" fill="#0B1528" stroke="#C28B28" stroke-width="2"/>
    <text x="-440" y="-8" fill="#FFFFFF" font-family="sans-serif" font-weight="bold" font-size="28">EXECUTIVE SENATOR SUIT</text>
    <text x="-440" y="22" fill="#94A3B8" font-family="sans-serif" font-size="16">Italian Wool-Cashmere (290 GSM) // Mandarin Band Collar &amp; Concealed Placket</text>
    <text x="440" y="6" text-anchor="end" fill="#C28B28" font-family="monospace" font-weight="bold" font-size="30">&#8358;65,000</text>
  </g>
</svg>`;
}

function makeSuitSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1600" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0A0F1A"/>
      <stop offset="50%" stop-color="#162033"/>
      <stop offset="100%" stop-color="#0A0F1A"/>
    </linearGradient>
    <linearGradient id="suitFabric" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1E293B"/>
      <stop offset="60%" stop-color="#0F172A"/>
      <stop offset="100%" stop-color="#090E17"/>
    </linearGradient>
    <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E5A93C"/>
      <stop offset="50%" stop-color="#C28B28"/>
      <stop offset="100%" stop-color="#8C5E14"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="1600" fill="url(#bg)"/>
  <text x="80" y="100" fill="#C28B28" font-family="monospace" font-size="20" letter-spacing="4">PRIMESTITCH SAVILE-NIGERIAN CUT // 2-PIECE BESPOKE</text>
  <text x="1120" y="100" text-anchor="end" fill="#94A3B8" font-family="monospace" font-size="18">REF: DES-SUIT-04</text>

  <g transform="translate(600, 220)">
    <!-- Trousers -->
    <rect x="-150" y="860" width="110" height="480" fill="#0F172A" stroke="#334155" stroke-width="2"/>
    <rect x="40" y="860" width="110" height="480" fill="#0F172A" stroke="#334155" stroke-width="2"/>
    <line x1="-95" y1="860" x2="-95" y2="1340" stroke="#94A3B8" stroke-dasharray="14,6" stroke-width="2"/>
    <line x1="95" y1="860" x2="95" y2="1340" stroke="#94A3B8" stroke-dasharray="14,6" stroke-width="2"/>

    <!-- Suit Jacket Body -->
    <path d="M 0 60 C -100 50 -180 80 -270 160 L -330 580 L -240 600 L -180 340 L -200 860 L -40 880 L 0 860 L 40 880 L 200 860 L 180 340 L 240 600 L 330 580 L 270 160 C 180 80 100 50 0 60 Z" fill="url(#suitFabric)" stroke="#334155" stroke-width="3"/>

    <!-- Shirt V & Tie -->
    <polygon points="0,60 -60,60 0,340 60,60" fill="#FFFFFF"/>
    <!-- Navy Silk Tie -->
    <polygon points="-15,90 15,90 22,280 0,320 -22,280" fill="#0B1528" stroke="url(#gold)" stroke-width="1.5"/>

    <!-- Lapels (Pick-Stitched Notch Lapels) -->
    <!-- Left Lapel -->
    <polygon points="-60,60 -130,220 -85,240 -120,380 0,480 0,380" fill="#141E2E" stroke="#334155" stroke-width="2"/>
    <line x1="-65" y1="75" x2="-115" y2="370" stroke="#94A3B8" stroke-dasharray="6,4" stroke-width="1.5"/>

    <!-- Right Lapel -->
    <polygon points="60,60 130,220 85,240 120,380 0,480 0,380" fill="#1E293B" stroke="#334155" stroke-width="2"/>
    <line x1="65" y1="75" x2="115" y2="370" stroke="#94A3B8" stroke-dasharray="6,4" stroke-width="1.5"/>

    <!-- Pocket Square -->
    <rect x="-160" y="240" width="65" height="10" fill="#090E17" stroke="#475569" stroke-width="1.5"/>
    <polygon points="-140,240 -128,215 -115,240" fill="#FFFFFF"/>

    <!-- Horn Buttons -->
    <circle cx="0" cy="520" r="10" fill="#3E2723" stroke="#8D6E63" stroke-width="2"/>
    <circle cx="0" cy="620" r="10" fill="#3E2723" stroke="#8D6E63" stroke-width="2"/>

    <!-- Flap Pockets -->
    <rect x="-185" y="620" width="85" height="24" rx="2" fill="#141E2E" stroke="#334155" stroke-width="1.5"/>
    <rect x="100" y="620" width="85" height="24" rx="2" fill="#141E2E" stroke="#334155" stroke-width="1.5"/>
  </g>

  <!-- Typography Card -->
  <g transform="translate(600, 1480)">
    <rect x="-480" y="-55" width="960" height="90" rx="6" fill="#0B1528" stroke="#C28B28" stroke-width="2"/>
    <text x="-440" y="-8" fill="#FFFFFF" font-family="sans-serif" font-weight="bold" font-size="28">SAFARI NATIVE TWO-PIECE SET</text>
    <text x="-440" y="22" fill="#94A3B8" font-family="sans-serif" font-size="16">Structured Safari Native Cut (290 GSM) // Hand-Crafted Pockets &amp; Native Trousers</text>
    <text x="440" y="6" text-anchor="end" fill="#C28B28" font-family="monospace" font-weight="bold" font-size="30">&#8358;85,000</text>
  </g>
</svg>`;
}

function makeAnkaraSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1600" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#08101F"/>
      <stop offset="60%" stop-color="#141E33"/>
      <stop offset="100%" stop-color="#08101F"/>
    </linearGradient>
    <pattern id="waxPattern" width="60" height="60" patternUnits="userSpaceOnUse">
      <rect width="60" height="60" fill="#0B1528"/>
      <circle cx="30" cy="30" r="18" fill="#E5A93C"/>
      <polygon points="30,5 55,30 30,55 5,30" fill="none" stroke="#0A5C36" stroke-width="4"/>
      <circle cx="30" cy="30" r="6" fill="#0B1528"/>
    </pattern>
    <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FACC15"/>
      <stop offset="100%" stop-color="#C28B28"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="1600" fill="url(#bg)"/>
  <text x="80" y="100" fill="#C28B28" font-family="monospace" font-size="20" letter-spacing="4">PRIMESTITCH CONTEMPORARY ATELIER // ARCHITECTURAL DRAPE</text>
  <text x="1120" y="100" text-anchor="end" fill="#94A3B8" font-family="monospace" font-size="18">REF: DES-ANKARA-05</text>

  <g transform="translate(600, 220)">
    <!-- Dress Silhouette -->
    <!-- Bodice & Bishop Sleeves -->
    <!-- Left Sleeve -->
    <path d="M -160 120 C -260 220 -280 440 -200 480 C -180 430 -160 280 -140 220 Z" fill="url(#waxPattern)" stroke="#C28B28" stroke-width="2"/>
    <!-- Right Sleeve -->
    <path d="M 160 120 C 260 220 280 440 200 480 C 180 430 160 280 140 220 Z" fill="url(#waxPattern)" stroke="#C28B28" stroke-width="2"/>

    <!-- Wrap Bodice -->
    <path d="M -150 120 L -60 360 L 60 360 L 150 120 C 80 60 -80 60 -150 120 Z" fill="url(#waxPattern)" stroke="#E5A93C" stroke-width="2"/>
    
    <!-- V-Neckline -->
    <polygon points="-90,100 0,260 90,100" fill="#141E33"/>

    <!-- Waist Sash / Belt -->
    <rect x="-100" y="350" width="200" height="40" fill="url(#gold)" rx="4"/>
    <!-- Asymmetric Sash Tails -->
    <polygon points="40,390 90,390 120,640 60,620" fill="url(#gold)"/>

    <!-- Asymmetric Fluid Skirt -->
    <path d="M -90 390 L 90 390 L 260 1080 L -220 980 Z" fill="url(#waxPattern)" stroke="#C28B28" stroke-width="3"/>
    
    <!-- Hem Basting Accents -->
    <line x1="-220" y1="980" x2="260" y2="1080" stroke="url(#gold)" stroke-dasharray="14,8" stroke-width="4"/>
  </g>

  <!-- Typography Card -->
  <g transform="translate(600, 1480)">
    <rect x="-480" y="-55" width="960" height="90" rx="6" fill="#0B1528" stroke="#C28B28" stroke-width="2"/>
    <text x="-440" y="-8" fill="#FFFFFF" font-family="sans-serif" font-weight="bold" font-size="28">ARCHITECTURAL ANKARA WRAP DRESS</text>
    <text x="-440" y="22" fill="#94A3B8" font-family="sans-serif" font-size="16">Authenticated Holland Wax (220 GSM) // Bishop Sleeves &amp; Asymmetric Drape</text>
    <text x="440" y="6" text-anchor="end" fill="#C28B28" font-family="monospace" font-weight="bold" font-size="30">&#8358;48,000</text>
  </g>
</svg>`;
}

function makeShirtSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1600" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0B1320"/>
      <stop offset="60%" stop-color="#142138"/>
      <stop offset="100%" stop-color="#0B1320"/>
    </linearGradient>
    <linearGradient id="shirtWhite" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="80%" stop-color="#F1F5F9"/>
      <stop offset="100%" stop-color="#E2E8F0"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="1600" fill="url(#bg)"/>
  <text x="80" y="100" fill="#C28B28" font-family="monospace" font-size="20" letter-spacing="4">PRIMESTITCH CORPORATE FLEET // 22 STITCHES PER INCH</text>
  <text x="1120" y="100" text-anchor="end" fill="#94A3B8" font-family="monospace" font-size="18">REF: DES-SHIRT-06</text>

  <g transform="translate(600, 240)">
    <!-- Main Shirt Body -->
    <path d="M 0 60 C -80 60 -150 90 -240 160 L -330 520 L -250 545 L -190 320 L -210 1020 C -120 1060 120 1060 210 1020 L 190 320 L 250 545 L 330 520 L 240 160 C 150 90 80 60 0 60 Z" fill="url(#shirtWhite)" stroke="#CBD5E1" stroke-width="3"/>

    <!-- French Cuffs with Brass Links -->
    <rect x="-330" y="470" width="80" height="50" rx="3" fill="#FFFFFF" stroke="#94A3B8" stroke-width="2"/>
    <circle cx="-290" cy="495" r="5" fill="#C28B28"/>
    <rect x="250" y="470" width="80" height="50" rx="3" fill="#FFFFFF" stroke="#94A3B8" stroke-width="2"/>
    <circle cx="290" cy="495" r="5" fill="#C28B28"/>

    <!-- Split Yoke Seams -->
    <line x1="-240" y1="160" x2="0" y2="130" stroke="#94A3B8" stroke-dasharray="8,4" stroke-width="1.5"/>
    <line x1="240" y1="160" x2="0" y2="130" stroke="#94A3B8" stroke-dasharray="8,4" stroke-width="1.5"/>

    <!-- Center Button Placket -->
    <rect x="-24" y="60" width="48" height="970" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.5"/>
    <!-- Mother-of-pearl buttons -->
    <g fill="#F8FAFC" stroke="#94A3B8" stroke-width="1.5">
      <circle cx="0" cy="180" r="7"/><circle cx="0" cy="180" r="3" fill="#64748B"/>
      <circle cx="0" cy="280" r="7"/><circle cx="0" cy="280" r="3" fill="#64748B"/>
      <circle cx="0" cy="380" r="7"/><circle cx="0" cy="380" r="3" fill="#64748B"/>
      <circle cx="0" cy="480" r="7"/><circle cx="0" cy="480" r="3" fill="#64748B"/>
      <circle cx="0" cy="580" r="7"/><circle cx="0" cy="580" r="3" fill="#64748B"/>
      <circle cx="0" cy="680" r="7"/><circle cx="0" cy="680" r="3" fill="#64748B"/>
    </g>

    <!-- Italian Cutaway Spread Collar -->
    <polygon points="0,70 -80,50 -130,120 -30,110" fill="#FFFFFF" stroke="#94A3B8" stroke-width="2"/>
    <polygon points="0,70 80,50 130,120 30,110" fill="#FFFFFF" stroke="#94A3B8" stroke-width="2"/>
  </g>

  <!-- Typography Card -->
  <g transform="translate(600, 1480)">
    <rect x="-480" y="-55" width="960" height="90" rx="6" fill="#0B1528" stroke="#C28B28" stroke-width="2"/>
    <text x="-440" y="-8" fill="#FFFFFF" font-family="sans-serif" font-weight="bold" font-size="28">CRISP CUTAWAY OXFORD SHIRT</text>
    <text x="-440" y="22" fill="#94A3B8" font-family="sans-serif" font-size="16">Giza 88 Pinpoint Oxford (175 GSM) // Italian Spread Collar &amp; French Cuffs</text>
    <text x="440" y="6" text-anchor="end" fill="#C28B28" font-family="monospace" font-weight="bold" font-size="30">&#8358;32,000</text>
  </g>
</svg>`;
}

function makeAsoEbiSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1600" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0E121E"/>
      <stop offset="60%" stop-color="#192236"/>
      <stop offset="100%" stop-color="#0E121E"/>
    </linearGradient>
    <linearGradient id="champagne" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FCEFD2"/>
      <stop offset="50%" stop-color="#E2B774"/>
      <stop offset="100%" stop-color="#C28B28"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="1600" fill="url(#bg)"/>
  <text x="80" y="100" fill="#C28B28" font-family="monospace" font-size="20" letter-spacing="4">PRIMESTITCH CEREMONIAL ASO EBI // 20+ ROSTER HARMONY</text>
  <text x="1120" y="100" text-anchor="end" fill="#94A3B8" font-family="monospace" font-size="18">REF: DES-ASOEBI-07</text>

  <g transform="translate(600, 220)">
    <!-- Dramatic Organza Sculptural Shoulders -->
    <circle cx="-160" cy="140" r="90" fill="url(#champagne)" opacity="0.6"/>
    <circle cx="160" cy="140" r="90" fill="url(#champagne)" opacity="0.6"/>

    <!-- Corset / Form-Fitting Bodice -->
    <path d="M -120 120 C -70 80 70 80 120 120 L 80 420 L -80 420 Z" fill="url(#champagne)" stroke="#8C5E14" stroke-width="2"/>
    <line x1="-30" y1="140" x2="-20" y2="420" stroke="#8C5E14" stroke-dasharray="6,4" stroke-width="1.5"/>
    <line x1="30" y1="140" x2="20" y2="420" stroke="#8C5E14" stroke-dasharray="6,4" stroke-width="1.5"/>

    <!-- Flared Mermaid / Architectural Peplum Skirt -->
    <path d="M -80 420 L 80 420 L 140 850 C 240 1020 300 1150 220 1180 L -220 1180 C -300 1150 -240 1020 -140 850 Z" fill="url(#champagne)" stroke="#C28B28" stroke-width="3"/>
    
    <!-- Skirt pleating / sheen lines -->
    <path d="M 0 420 L 0 1180" stroke="#8C5E14" stroke-width="2" opacity="0.5"/>
    <path d="M -60 500 Q -100 850 -140 1180" stroke="#8C5E14" stroke-width="1.5" opacity="0.4"/>
    <path d="M 60 500 Q 100 850 140 1180" stroke="#8C5E14" stroke-width="1.5" opacity="0.4"/>
  </g>

  <!-- Typography Card -->
  <g transform="translate(600, 1480)">
    <rect x="-480" y="-55" width="960" height="90" rx="6" fill="#0B1528" stroke="#C28B28" stroke-width="2"/>
    <text x="-440" y="-8" fill="#FFFFFF" font-family="sans-serif" font-weight="bold" font-size="28">CELEBRATION ASO EBI ENSEMBLE</text>
    <text x="-440" y="22" fill="#94A3B8" font-family="sans-serif" font-size="16">Heavy Silk Crepe &amp; Organza (290 GSM) // Sculptural Sleeves &amp; Mermaid Drape</text>
    <text x="440" y="6" text-anchor="end" fill="#C28B28" font-family="monospace" font-weight="bold" font-size="30">&#8358;78,000</text>
  </g>
</svg>`;
}

function makePoloSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1600" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#080F1B"/>
      <stop offset="60%" stop-color="#121D30"/>
      <stop offset="100%" stop-color="#080F1B"/>
    </linearGradient>
    <linearGradient id="navyPique" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#142138"/>
      <stop offset="60%" stop-color="#0B1528"/>
      <stop offset="100%" stop-color="#060C17"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="1600" fill="url(#bg)"/>
  <text x="80" y="100" fill="#C28B28" font-family="monospace" font-size="20" letter-spacing="4">PRIMESTITCH CORPORATE FLEET // 50+ WASH RESILIENT</text>
  <text x="1120" y="100" text-anchor="end" fill="#94A3B8" font-family="monospace" font-size="18">REF: DES-POLO-08</text>

  <g transform="translate(600, 240)">
    <!-- Main Polo Body -->
    <path d="M 0 60 C -90 60 -170 90 -250 160 L -330 460 L -240 480 L -190 320 L -210 980 L 210 980 L 190 320 L 240 480 L 330 460 L 250 160 C 170 90 90 60 0 60 Z" fill="url(#navyPique)" stroke="#1E293B" stroke-width="3"/>

    <!-- Ribbed Non-Curling Collar -->
    <path d="M 0 70 L -120 40 L -90 130 L 0 150 L 90 130 L 120 40 Z" fill="#060C17" stroke="#C28B28" stroke-width="2"/>

    <!-- 3-Button Placket -->
    <rect x="-25" y="130" width="50" height="240" fill="#080F1B" stroke="#1E293B" stroke-width="2"/>
    <circle cx="0" cy="180" r="6" fill="#C28B28"/>
    <circle cx="0" cy="240" r="6" fill="#C28B28"/>
    <circle cx="0" cy="300" r="6" fill="#C28B28"/>

    <!-- Embroidered Chest Crest Slot -->
    <g transform="translate(-130, 260)">
      <circle cx="0" cy="0" r="28" fill="#0B1528" stroke="#C28B28" stroke-width="2"/>
      <path d="M -12 6 C -8 -10 8 -10 12 6 Z" fill="#C28B28"/>
    </g>

    <!-- Reinforced Side Vents with Gold Stitch -->
    <polygon points="-210,900 -195,900 -195,980 -210,980" fill="#C28B28"/>
    <polygon points="195,900 210,900 210,980 195,980" fill="#C28B28"/>
  </g>

  <!-- Typography Card -->
  <g transform="translate(600, 1480)">
    <rect x="-480" y="-55" width="960" height="90" rx="6" fill="#0B1528" stroke="#C28B28" stroke-width="2"/>
    <text x="-440" y="-8" fill="#FFFFFF" font-family="sans-serif" font-weight="bold" font-size="28">EXECUTIVE UNIFORM PIQUÉ POLO</text>
    <text x="-440" y="22" fill="#94A3B8" font-family="sans-serif" font-size="16">Combed Double-Piqué Cotton (250 GSM) // Non-Curling Collar &amp; Side Vents</text>
    <text x="440" y="6" text-anchor="end" fill="#C28B28" font-family="monospace" font-weight="bold" font-size="30">&#8358;22,000</text>
  </g>
</svg>`;
}

// -------------------------------------------------------------
// 2. TAILORS & MEASURERS (600 x 600, 1:1)
// -------------------------------------------------------------
function makeArtisanSvg(name, title, hub, badge, initials, skinTone = "#8D5524") {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
  <defs>
    <linearGradient id="avatarBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0B1528"/>
      <stop offset="100%" stop-color="#1E293B"/>
    </linearGradient>
    <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FACC15"/>
      <stop offset="100%" stop-color="#C28B28"/>
    </linearGradient>
  </defs>

  <rect width="600" height="600" fill="url(#avatarBg)"/>

  <!-- Workshop background atmosphere -->
  <g opacity="0.15">
    <line x1="0" y1="440" x2="600" y2="440" stroke="#C28B28" stroke-width="4"/>
    <rect x="80" y="200" width="100" height="180" fill="#C28B28"/>
    <rect x="220" y="160" width="70" height="220" fill="#C28B28"/>
    <rect x="340" y="220" width="90" height="160" fill="#C28B28"/>
  </g>

  <!-- Artisan Silhouette -->
  <!-- Shoulders & Garment -->
  <path d="M 120 540 C 120 400 210 360 300 360 C 390 360 480 400 480 540 Z" fill="#080F1A" stroke="#334155" stroke-width="3"/>
  <!-- Neck -->
  <rect x="260" y="270" width="80" height="110" rx="10" fill="${skinTone}"/>
  <!-- Head -->
  <ellipse cx="300" cy="220" rx="75" ry="90" fill="${skinTone}"/>

  <!-- Draped Yellow Measuring Tape Around Neck -->
  <path d="M 240 290 Q 300 420 360 290" fill="none" stroke="#FFC72C" stroke-width="14" stroke-linecap="round"/>
  <path d="M 240 290 L 225 500" fill="none" stroke="#FFC72C" stroke-width="14" stroke-linecap="round"/>
  <path d="M 360 290 L 375 500" fill="none" stroke="#FFC72C" stroke-width="14" stroke-linecap="round"/>
  <!-- Tape Inch Marks -->
  <path d="M 235 340 L 245 340 M 235 380 L 245 380 M 235 420 L 245 420 M 235 460 L 245 460" stroke="#0B1528" stroke-width="2"/>
  <path d="M 355 340 L 365 340 M 355 380 L 365 380 M 355 420 L 365 420 M 355 460 L 365 460" stroke="#0B1528" stroke-width="2"/>

  <!-- Artisan Initials Monogram Badge -->
  <circle cx="300" cy="100" r="34" fill="#0B1528" stroke="url(#gold)" stroke-width="3"/>
  <text x="300" y="108" text-anchor="middle" fill="#FFFFFF" font-family="sans-serif" font-weight="bold" font-size="20">${initials}</text>

  <!-- Name & Hub Overlay Box -->
  <g transform="translate(300, 530)">
    <rect x="-260" y="-45" width="520" height="85" rx="6" fill="#0B1528" stroke="#C28B28" stroke-width="2"/>
    <text x="0" y="-12" text-anchor="middle" fill="#FFFFFF" font-family="sans-serif" font-weight="bold" font-size="22">${name}</text>
    <text x="0" y="14" text-anchor="middle" fill="#94A3B8" font-family="sans-serif" font-size="14">${title} // ${hub}</text>
    <text x="0" y="32" text-anchor="middle" fill="#FFC72C" font-family="monospace" font-size="12" letter-spacing="2">${badge}</text>
  </g>
</svg>`;
}

// -------------------------------------------------------------
// 3. FABRIC SWATCHES (400 x 400, 1:1)
// -------------------------------------------------------------
function makeSwatchSvg(name, gsm, weave, hexColor, patternType) {
  let patternDef = '';
  if (patternType === 'brocade') {
    patternDef = `<pattern id="p" width="40" height="40" patternUnits="userSpaceOnUse">
      <rect width="40" height="40" fill="${hexColor}"/>
      <path d="M 0 20 Q 20 0 40 20 Q 20 40 0 20 Z" fill="#FFFFFF" opacity="0.15"/>
      <circle cx="20" cy="20" r="6" fill="#C28B28" opacity="0.3"/>
    </pattern>`;
  } else if (patternType === 'twill') {
    patternDef = `<pattern id="p" width="20" height="20" patternUnits="userSpaceOnUse">
      <rect width="20" height="20" fill="${hexColor}"/>
      <line x1="0" y1="20" x2="20" y2="0" stroke="#FFFFFF" stroke-width="2" opacity="0.25"/>
    </pattern>`;
  } else if (patternType === 'slub') {
    patternDef = `<pattern id="p" width="30" height="30" patternUnits="userSpaceOnUse">
      <rect width="30" height="30" fill="${hexColor}"/>
      <line x1="5" y1="10" x2="25" y2="10" stroke="#C28B28" stroke-width="3" opacity="0.4" stroke-linecap="round"/>
      <line x1="10" y1="22" x2="28" y2="22" stroke="#FFFFFF" stroke-width="2" opacity="0.2" stroke-linecap="round"/>
    </pattern>`;
  } else if (patternType === 'herringbone') {
    patternDef = `<pattern id="p" width="24" height="24" patternUnits="userSpaceOnUse">
      <rect width="24" height="24" fill="${hexColor}"/>
      <polyline points="0,6 12,0 24,6" fill="none" stroke="#FFFFFF" stroke-width="1.5" opacity="0.25"/>
      <polyline points="0,18 12,12 24,18" fill="none" stroke="#FFFFFF" stroke-width="1.5" opacity="0.25"/>
    </pattern>`;
  } else if (patternType === 'adire') {
    patternDef = `<pattern id="p" width="50" height="50" patternUnits="userSpaceOnUse">
      <rect width="50" height="50" fill="${hexColor}"/>
      <circle cx="25" cy="25" r="18" fill="none" stroke="#2563EB" stroke-width="3" opacity="0.4"/>
      <path d="M 0 0 L 50 50 M 50 0 L 0 50" stroke="#1D4ED8" stroke-width="1.5" opacity="0.3"/>
    </pattern>`;
  } else if (patternType === 'wax') {
    patternDef = `<pattern id="p" width="40" height="40" patternUnits="userSpaceOnUse">
      <rect width="40" height="40" fill="${hexColor}"/>
      <polygon points="20,5 35,20 20,35 5,20" fill="#E5A93C" opacity="0.4"/>
      <circle cx="20" cy="20" r="5" fill="#0A5C36"/>
    </pattern>`;
  } else {
    patternDef = `<pattern id="p" width="16" height="16" patternUnits="userSpaceOnUse">
      <rect width="16" height="16" fill="${hexColor}"/>
      <line x1="0" y1="8" x2="16" y2="8" stroke="#FFFFFF" stroke-width="1" opacity="0.3"/>
      <line x1="8" y1="0" x2="8" y2="16" stroke="#FFFFFF" stroke-width="1" opacity="0.3"/>
    </pattern>`;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    ${patternDef}
  </defs>
  <rect width="400" height="400" fill="url(#p)"/>
  <!-- Basting stitch border -->
  <rect x="15" y="15" width="370" height="370" fill="none" stroke="#C28B28" stroke-width="2" stroke-dasharray="8,6"/>
  <!-- Spec badge -->
  <g transform="translate(200, 320)">
    <rect x="-180" y="-35" width="360" height="65" rx="4" fill="#0B1528" stroke="#C28B28" stroke-width="1.5"/>
    <text x="0" y="-10" text-anchor="middle" fill="#FFFFFF" font-family="sans-serif" font-weight="bold" font-size="16">${name}</text>
    <text x="0" y="14" text-anchor="middle" fill="#94A3B8" font-family="monospace" font-size="12">${gsm} GSM // ${weave}</text>
  </g>
</svg>`;
}

// -------------------------------------------------------------
// 4. PRODUCTION STAGES (1600 x 900, 16:9)
// -------------------------------------------------------------
function makeStageSvg(stepNum, title, desc, iconType) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#070E1A"/>
      <stop offset="60%" stop-color="#121E33"/>
      <stop offset="100%" stop-color="#070E1A"/>
    </linearGradient>
    <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FACC15"/>
      <stop offset="100%" stop-color="#C28B28"/>
    </linearGradient>
  </defs>

  <rect width="1600" height="900" fill="url(#bg)"/>

  <!-- Measuring tape top bar -->
  <line x1="60" y1="60" x2="1540" y2="60" stroke="#C28B28" stroke-dasharray="12,8" stroke-width="3" opacity="0.6"/>
  <line x1="60" y1="840" x2="1540" y2="840" stroke="#C28B28" stroke-dasharray="12,8" stroke-width="3" opacity="0.6"/>

  <!-- Atelier Scene Center Graphic -->
  <g transform="translate(800, 400)">
    <circle cx="0" cy="0" r="180" fill="#0B1528" stroke="url(#gold)" stroke-width="4"/>
    <circle cx="0" cy="0" r="150" fill="none" stroke="#334155" stroke-dasharray="8,6" stroke-width="2"/>

    <!-- Large Step Number in Circle -->
    <text x="0" y="-30" text-anchor="middle" fill="#94A3B8" font-family="monospace" font-size="28" letter-spacing="4">STAGE ${stepNum} / 09</text>
    <text x="0" y="45" text-anchor="middle" fill="#FFFFFF" font-family="sans-serif" font-weight="900" font-size="64">${title.toUpperCase()}</text>
  </g>

  <!-- Bottom Details -->
  <g transform="translate(800, 740)">
    <text x="0" y="0" text-anchor="middle" fill="#CBD5E1" font-family="sans-serif" font-size="24">${desc}</text>
    <text x="0" y="40" text-anchor="middle" fill="#C28B28" font-family="monospace" font-size="18" letter-spacing="3">ABA BENCH SLA VERIFICATION // ZERO MISS-DATE GUARANTEE</text>
  </g>
</svg>`;
}

// -------------------------------------------------------------
// 5. POSTURE GUIDES (900 x 1200, 3:4)
// -------------------------------------------------------------
function makePostureSvg(isFront) {
  const title = isFront ? "FRONT VERTICAL STANCE GUIDE" : "SIDE PROFILE POSTURE GUIDE";
  const subtitle = isFront ? "Shoulder slope, chest level & hip balance" : "Spine curvature, head carriage & armhang";

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 1200" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#080F1D"/>
      <stop offset="60%" stop-color="#111F36"/>
      <stop offset="100%" stop-color="#080F1D"/>
    </linearGradient>
  </defs>

  <rect width="900" height="1200" fill="url(#bg)"/>

  <!-- Laser Alignment Grid -->
  <line x1="450" y1="120" x2="450" y2="1000" stroke="#EF4444" stroke-width="2" stroke-dasharray="8,6" opacity="0.6"/>
  <line x1="150" y1="280" x2="750" y2="280" stroke="#38BDF8" stroke-width="1.5" stroke-dasharray="6,4" opacity="0.5"/>
  <line x1="150" y1="440" x2="750" y2="440" stroke="#38BDF8" stroke-width="1.5" stroke-dasharray="6,4" opacity="0.5"/>
  <line x1="150" y1="620" x2="750" y2="620" stroke="#38BDF8" stroke-width="1.5" stroke-dasharray="6,4" opacity="0.5"/>

  <!-- Grid Labels -->
  <text x="760" y="285" fill="#38BDF8" font-family="monospace" font-size="14">SHOULDER LINE</text>
  <text x="760" y="445" fill="#38BDF8" font-family="monospace" font-size="14">CHEST HORIZONTAL</text>
  <text x="760" y="625" fill="#38BDF8" font-family="monospace" font-size="14">NATURAL WAIST</text>

  <!-- Anatomic Silhouette -->
  <g transform="translate(450, 150)">
    <ellipse cx="0" cy="80" rx="45" ry="60" fill="#334155" stroke="#64748B" stroke-width="2"/>
    ${isFront ? `
      <!-- Front Silhouette -->
      <path d="M -130 180 C -80 140 80 140 130 180 L 110 500 L -110 500 Z" fill="#1E293B" stroke="#475569" stroke-width="2"/>
      <rect x="-90" y="500" width="75" height="380" fill="#1E293B" stroke="#475569" stroke-width="2"/>
      <rect x="15" y="500" width="75" height="380" fill="#1E293B" stroke="#475569" stroke-width="2"/>
    ` : `
      <!-- Side Silhouette -->
      <path d="M -50 180 C 40 160 50 320 20 500 L -40 500 Z" fill="#1E293B" stroke="#475569" stroke-width="2"/>
      <rect x="-40" y="500" width="70" height="380" fill="#1E293B" stroke="#475569" stroke-width="2"/>
    `}
  </g>

  <!-- Typography Card -->
  <g transform="translate(450, 1100)">
    <rect x="-380" y="-45" width="760" height="75" rx="6" fill="#0B1528" stroke="#C28B28" stroke-width="2"/>
    <text x="0" y="-12" text-anchor="middle" fill="#FFFFFF" font-family="sans-serif" font-weight="bold" font-size="20">${title}</text>
    <text x="0" y="16" text-anchor="middle" fill="#94A3B8" font-family="sans-serif" font-size="14">${subtitle}</text>
  </g>
</svg>`;
}

// -------------------------------------------------------------
// EXECUTE GENERATION
// -------------------------------------------------------------
// 1. Designs
saveSvg('designs', 'kaftan.svg', makeKaftanSvg());
saveSvg('designs', 'agbada.svg', makeAgbadaSvg());
saveSvg('designs', 'senator.svg', makeSenatorSvg());
saveSvg('designs', 'suit.svg', makeSuitSvg());
saveSvg('designs', 'ankara-dress.svg', makeAnkaraSvg());
saveSvg('designs', 'shirt.svg', makeShirtSvg());
saveSvg('designs', 'aso-ebi.svg', makeAsoEbiSvg());
saveSvg('designs', 'polo.svg', makePoloSvg());

// 2. Tailors
saveSvg('tailors', 'tl-tunde.svg', makeArtisanSvg('Master Tunde Adeleke', 'Head Cutter', 'Factory Rd, Aba', '4.9 ★ // BESPOKE SUITING', 'TA', '#7C471E'));
saveSvg('tailors', 'tl-chidi.svg', makeArtisanSvg('Chidi Okafor', 'Pattern Drafter', 'Ariaria, Aba', '4.8 ★ // SENATOR CUTS', 'CO', '#6F3E18'));
saveSvg('tailors', 'tl-amina.svg', makeArtisanSvg('Amina Bello', 'Senior Artisan', 'Eziukwu, Aba', '5.0 ★ // EMBROIDERY', 'AB', '#8D5524'));
saveSvg('tailors', 'tl-femi.svg', makeArtisanSvg('Femi Balogun', 'Basting Specialist', 'Umungasi, Aba', '4.7 ★ // TRADITIONAL', 'FB', '#5C3317'));
saveSvg('tailors', 'tl-segun.svg', makeArtisanSvg('Segun Ogundimu', 'Finishing Inspector', 'Brass Jct, Aba', '4.8 ★ // 14-PT AUDIT', 'SO', '#7A4B22'));

// 3. Measurers
saveSvg('measurers', 'ms-folake.svg', makeArtisanSvg('Folake Davies', 'Certified Measurer', 'Aba & South East', '4.95 ★ // LASER VERIFIED', 'FD', '#8D5524'));
saveSvg('measurers', 'ms-kunle.svg', makeArtisanSvg('Kunle Williams', 'Master Fitter', 'Port Harcourt & Enugu', '4.9 ★ // FIELD FITTER', 'KW', '#6F3E18'));
saveSvg('measurers', 'ms-zainab.svg', makeArtisanSvg('Zainab Alabi', 'Mobile Fitter', 'Lagos Hub Dispatch', '4.85 ★ // WESTERN DISPATCH', 'ZA', '#7C471E'));

// 4. Fabrics
saveSvg('swatches', 'guinea-brocade.svg', makeSwatchSvg('Imperial Guinea Brocade', 280, 'Jacquard Lustre', '#F8FAFC', 'brocade'));
saveSvg('swatches', 'atiku-cotton.svg', makeSwatchSvg('Super Atiku Cotton', 240, 'Fine Twill', '#F1F5F9', 'twill'));
saveSvg('swatches', 'raw-silk.svg', makeSwatchSvg('Lustrous Raw Silk Blend', 310, 'Textured Slub', '#C28B28', 'slub'));
saveSvg('swatches', 'adire-damask.svg', makeSwatchSvg('Artisan Adire Damask', 340, '16-Dip Indigo', '#1E3A8A', 'adire'));
saveSvg('swatches', 'super-wool.svg', makeSwatchSvg('Super 140s Suiting Wool', 300, 'Worsted Twill', '#1E293B', 'twill'));
saveSvg('swatches', 'cashmere-blend.svg', makeSwatchSvg('Italian Wool-Cashmere', 290, 'Micro-Herringbone', '#0F172A', 'herringbone'));
saveSvg('swatches', 'wax-block.svg', makeSwatchSvg('Holland Wax Block', 220, 'Calico Plain Weave', '#0B1528', 'wax'));
saveSvg('swatches', 'giza-oxford.svg', makeSwatchSvg('Giza 88 Pinpoint Oxford', 175, '2-Ply Pinpoint', '#FFFFFF', 'plain'));

// 5. Stages
saveSvg('stages', 'stage-01-received.svg', makeStageSvg('01', 'Received', 'Digital intake queue & textile allocation confirmed', 'intake'));
saveSvg('stages', 'stage-02-confirmed.svg', makeStageSvg('02', 'Confirmed', 'Anatomic proportions verified with master cutter', 'caliper'));
saveSvg('stages', 'stage-03-cutting.svg', makeStageSvg('03', 'Cutting', 'Heavy brass shears precision cutting drafted panels', 'shears'));
saveSvg('stages', 'stage-04-sewing.svg', makeStageSvg('04', 'Sewing', 'Walking-foot lockstitch joining seams & canvas basting', 'machine'));
saveSvg('stages', 'stage-05-finishing.svg', makeStageSvg('05', 'Finishing', 'Hand needlework, collar linings & button loops', 'hand'));
saveSvg('stages', 'stage-06-qc.svg', makeStageSvg('06', 'Quality Check', '14-point millimeter tolerance inspection', 'audit'));
saveSvg('stages', 'stage-07-ready.svg', makeStageSvg('07', 'Ready', 'Hand-steamed and encased in breathable PrimeStitch bag', 'steam'));
saveSvg('stages', 'stage-08-dispatched.svg', makeStageSvg('08', 'Dispatched', 'Handed to priority logistics rider with sealed guarantee', 'dispatch'));
saveSvg('stages', 'stage-09-delivered.svg', makeStageSvg('09', 'Delivered', 'Doorstep customer handover within locked SLA deadline', 'delivery'));

// 6. Posture
saveSvg('posture', 'posture-front.svg', makePostureSvg(true));
saveSvg('posture', 'posture-side.svg', makePostureSvg(false));

console.log("All 35 bespoke assets successfully generated!");
