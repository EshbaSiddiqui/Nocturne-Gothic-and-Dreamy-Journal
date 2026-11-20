/**
 * Nocturne - Built-in Sticker & Stamp Collection
 * Includes Kuromi stickers, gothic roses, moths, bats, celestial witchy charms, 
 * coquette ribbons, distressed stamps, and 3D wax seals.
 */

const STICKER_CATEGORIES = [
  { id: 'all', name: '✦ All Curiosities', icon: '✦' },
  { id: 'kuromi', name: '💀 Kuromi & Sanrio (37 Stickers)', icon: '💀' },
  { id: 'seals', name: '🩸 Realistic Wax Seals (9 Seals)', icon: '🩸' },
  { id: 'gothic', name: '🕸️ Gothic Charms & Nyx', icon: '🕸️' },
  { id: 'envelopes', name: '✉️ Interactive Envelopes', icon: '✉️' },
  { id: 'washi', name: '🎀 Purple & Black Washi Tape', icon: '🎀' },
  { id: 'roses', name: '🥀 Dark Flora & Roses', icon: '🥀' },
  { id: 'creatures', name: '🦇 Moths & Bats', icon: '🦇' },
  { id: 'witchy', name: '🔮 Witchcraft & Celestial', icon: '🔮' },
  { id: 'coquette', name: '🎀 Ribbons & Lace', icon: '🎀' },
  { id: 'stamps', name: '🏷️ Inked Stamps', icon: '🏷️' }
];

const STICKERS_DATA = [
  // ================= KUROMI & GOTHIC COQUETTE =================
  {
    id: 'kuromi-classic',
    category: 'kuromi',
    name: 'Kuromi Classic Mischief',
    tags: ['kuromi', 'sanrio', 'goth', 'skull', 'cute', 'jester', 'wink'],
    svg: `<svg viewBox="0 0 100 100" class="sticker-svg">
      <!-- Kuromi Jester Hat -->
      <path d="M 20 45 C 5 25 10 5 25 12 C 30 18 35 30 40 40 C 45 32 55 32 60 40 C 65 30 70 18 75 12 C 90 5 95 25 80 45 C 88 55 88 72 80 80 C 72 88 28 88 20 80 C 12 72 12 55 20 45 Z" fill="#181322" stroke="#542A80" stroke-width="2"/>
      <!-- Jester Balls -->
      <circle cx="25" cy="12" r="5" fill="#E861A3" stroke="#21112F" stroke-width="1.5"/>
      <circle cx="75" cy="12" r="5" fill="#E861A3" stroke="#21112F" stroke-width="1.5"/>
      <!-- White Face -->
      <ellipse cx="50" cy="58" rx="28" ry="24" fill="#FAF7FC" stroke="#21112F" stroke-width="2"/>
      <!-- Pink Jester Skull on Hat -->
      <g transform="translate(50, 32) scale(0.65)">
        <ellipse cx="0" cy="0" rx="10" ry="8" fill="#E861A3"/>
        <rect x="-6" y="4" width="12" height="6" rx="2" fill="#E861A3"/>
        <circle cx="-4" cy="-1" r="2.5" fill="#181322"/>
        <circle cx="4" cy="-1" r="2.5" fill="#181322"/>
        <line x1="-3" y1="9" x2="-3" y2="6" stroke="#181322" stroke-width="1"/>
        <line x1="0" y1="9" x2="0" y2="6" stroke="#181322" stroke-width="1"/>
        <line x1="3" y1="9" x2="3" y2="6" stroke="#181322" stroke-width="1"/>
      </g>
      <!-- Eyes: Right eye open, Left eye mischievous wink -->
      <path d="M 33 55 Q 40 50 43 57" fill="none" stroke="#21112F" stroke-width="3" stroke-linecap="round"/>
      <ellipse cx="61" cy="55" rx="4.5" ry="6.5" fill="#21112F"/>
      <circle cx="63" cy="53" r="1.8" fill="#FFFFFF"/>
      <circle cx="59" cy="58" r="0.8" fill="#FFFFFF"/>
      <!-- Cheek Blushes -->
      <ellipse cx="35" cy="63" rx="4" ry="2.2" fill="#FFA5C8" opacity="0.8"/>
      <ellipse cx="65" cy="63" rx="4" ry="2.2" fill="#FFA5C8" opacity="0.8"/>
      <!-- Cute Devilish Grin -->
      <path d="M 45 64 Q 50 69 55 64" fill="none" stroke="#21112F" stroke-width="2.5" stroke-linecap="round"/>
      <!-- Little Devil Collar / Points -->
      <path d="M 30 76 L 36 84 L 42 77 L 50 85 L 58 77 L 64 84 L 70 76" fill="#E861A3" stroke="#21112F" stroke-width="1.5"/>
      <circle cx="50" cy="86" r="2.5" fill="#FAF7FC"/>
    </svg>`
  },
  {
    id: 'kuromi-goth-rose',
    category: 'kuromi',
    name: 'Kuromi with Black Rose',
    tags: ['kuromi', 'rose', 'flower', 'gothic', 'kawaii', 'black rose'],
    svg: `<svg viewBox="0 0 100 100" class="sticker-svg">
      <!-- Hat & Ears with Purple Trim -->
      <path d="M 22 45 C 8 26 12 8 26 14 C 32 20 36 32 40 40 C 46 32 54 32 60 40 C 64 32 68 20 74 14 C 88 8 92 26 78 45 C 86 54 86 70 78 78 C 70 86 30 86 22 78 C 14 70 14 54 22 45 Z" fill="#110B18" stroke="#A993C9" stroke-width="1.8"/>
      <circle cx="26" cy="14" r="4.5" fill="#542A80"/>
      <circle cx="74" cy="14" r="4.5" fill="#542A80"/>
      <!-- Face -->
      <ellipse cx="50" cy="56" rx="27" ry="23" fill="#F8F3FA" stroke="#110B18" stroke-width="1.8"/>
      <!-- Pink Skull Badge -->
      <g transform="translate(50, 30) scale(0.6)">
        <ellipse cx="0" cy="0" rx="9" ry="7" fill="#E861A3"/>
        <rect x="-5" y="3" width="10" height="5" rx="1.5" fill="#E861A3"/>
        <circle cx="-3.5" cy="-1" r="2" fill="#110B18"/>
        <circle cx="3.5" cy="-1" r="2" fill="#110B18"/>
      </g>
      <!-- Big Gothic Cute Eyes -->
      <ellipse cx="38" cy="54" rx="4.5" ry="6.5" fill="#1F112F"/>
      <circle cx="36" cy="52" r="1.8" fill="#FFF"/>
      <ellipse cx="62" cy="54" rx="4.5" ry="6.5" fill="#1F112F"/>
      <circle cx="60" cy="52" r="1.8" fill="#FFF"/>
      <!-- Cheeks & Smile -->
      <ellipse cx="33" cy="61" rx="4" ry="2" fill="#FFA3C8" opacity="0.8"/>
      <ellipse cx="67" cy="61" rx="4" ry="2" fill="#FFA3C8" opacity="0.8"/>
      <path d="M 47 62 Q 50 65 53 62" fill="none" stroke="#110B18" stroke-width="2" stroke-linecap="round"/>
      <!-- Black Rose In Hands -->
      <g transform="translate(50, 78) scale(0.8)">
        <path d="M -15 2 C -18 8 -20 18 -15 22 C -8 24 5 18 0 10 Z" fill="#2E1B3E" stroke="#542A80" stroke-width="1"/>
        <path d="M 15 2 C 18 8 20 18 15 22 C 8 24 -5 18 0 10 Z" fill="#2E1B3E" stroke="#542A80" stroke-width="1"/>
        <!-- Rose Petals -->
        <circle cx="0" cy="0" r="9" fill="#1A0D23" stroke="#A993C9" stroke-width="1.2"/>
        <path d="M -5 -2 Q 0 -8 5 -2 Q 8 4 0 6 Q -8 4 -5 -2 Z" fill="#3D1A54"/>
        <circle cx="0" cy="0" r="3" fill="#0B0812"/>
        <path d="M 0 10 Q -2 18 -1 25" stroke="#483254" stroke-width="2" fill="none"/>
      </g>
    </svg>`
  },
  {
    id: 'kuromi-bat-wings',
    category: 'kuromi',
    name: 'Kuromi Dark Angel Wings',
    tags: ['kuromi', 'wings', 'bat', 'dark angel', 'gothic', 'fly'],
    svg: `<svg viewBox="0 0 100 100" class="sticker-svg">
      <!-- Bat Wings -->
      <path d="M 15 50 C -5 35 -5 15 15 25 C 20 35 15 45 30 52 C 22 45 10 45 15 50 Z" fill="#21112F" stroke="#7A45A8" stroke-width="1.5"/>
      <path d="M 85 50 C 105 35 105 15 85 25 C 80 35 85 45 70 52 C 78 45 90 45 85 50 Z" fill="#21112F" stroke="#7A45A8" stroke-width="1.5"/>
      <!-- Ears & Hat -->
      <path d="M 24 45 C 10 28 14 10 28 16 C 34 22 38 32 42 40 C 47 33 53 33 58 40 C 62 32 66 22 72 16 C 86 10 90 28 76 45 C 84 54 84 70 76 77 C 68 85 32 85 24 77 C 16 70 16 54 24 45 Z" fill="#120D1A" stroke="#4A2670" stroke-width="2"/>
      <circle cx="28" cy="16" r="4.5" fill="#E861A3"/>
      <circle cx="72" cy="16" r="4.5" fill="#E861A3"/>
      <!-- Skull Icon -->
      <ellipse cx="50" cy="30" rx="6" ry="5" fill="#E861A3"/>
      <rect x="-3" y="2" width="6" height="3" fill="#E861A3" transform="translate(50, 30)"/>
      <circle cx="48" cy="29" r="1.3" fill="#120D1A"/>
      <circle cx="52" cy="29" r="1.3" fill="#120D1A"/>
      <!-- Face -->
      <ellipse cx="50" cy="56" rx="26" ry="22" fill="#FAF5FD" stroke="#120D1A" stroke-width="2"/>
      <!-- Sly Look -->
      <path d="M 33 52 Q 41 48 45 54" fill="none" stroke="#120D1A" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M 67 52 Q 59 48 55 54" fill="none" stroke="#120D1A" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="41" cy="57" r="3.5" fill="#3D1A54"/>
      <circle cx="59" cy="57" r="3.5" fill="#3D1A54"/>
      <circle cx="40" cy="56" r="1" fill="#FFF"/>
      <circle cx="58" cy="56" r="1" fill="#FFF"/>
      <!-- Little Fangs -->
      <path d="M 46 64 Q 50 67 54 64" fill="none" stroke="#120D1A" stroke-width="2"/>
      <polygon points="48,64 50,67 49,64" fill="#FAF5FD"/>
      <!-- Tiny Devil Tail -->
      <path d="M 72 75 Q 86 80 88 70 Q 86 65 92 68" fill="none" stroke="#120D1A" stroke-width="2.5"/>
      <polygon points="90,65 96,69 90,73" fill="#E861A3"/>
    </svg>`
  },
  {
    id: 'kuromi-moon-sleep',
    category: 'kuromi',
    name: 'Kuromi Sleepy on Crescent Moon',
    tags: ['kuromi', 'moon', 'sleep', 'dreamy', 'stars', 'night'],
    svg: `<svg viewBox="0 0 100 100" class="sticker-svg">
      <!-- Golden/Lavender Crescent Moon -->
      <path d="M 75 15 C 40 15 20 42 28 78 C 15 58 20 28 50 16 C 58 13 67 13 75 15 Z" fill="#E7DDF5" stroke="#A993C9" stroke-width="2"/>
      <circle cx="70" cy="30" r="1.5" fill="#FFDF78"/>
      <circle cx="85" cy="45" r="2" fill="#FFDF78"/>
      <circle cx="75" cy="70" r="1.2" fill="#FFDF78"/>
      <!-- Sleeping Kuromi nestled in moon -->
      <g transform="translate(42, 45) rotate(-15) scale(0.68)">
        <!-- Hat -->
        <path d="M 20 45 C 5 25 10 5 25 12 C 30 18 35 30 40 40 C 45 32 55 32 60 40 C 65 30 70 18 75 12 C 90 5 95 25 80 45 C 88 55 88 72 80 80 C 72 88 28 88 20 80 Z" fill="#1C1428" stroke="#68399E" stroke-width="2"/>
        <circle cx="25" cy="12" r="4.5" fill="#E861A3"/>
        <circle cx="75" cy="12" r="4.5" fill="#E861A3"/>
        <ellipse cx="50" cy="56" rx="26" ry="22" fill="#FAF6FE"/>
        <!-- Sleeping curved eyes -->
        <path d="M 34 56 Q 40 62 46 56" fill="none" stroke="#21112F" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M 54 56 Q 60 62 66 56" fill="none" stroke="#21112F" stroke-width="2.5" stroke-linecap="round"/>
        <ellipse cx="35" cy="62" rx="4" ry="2" fill="#FFA3C8" opacity="0.9"/>
        <ellipse cx="65" cy="62" rx="4" ry="2" fill="#FFA3C8" opacity="0.9"/>
        <ellipse cx="50" cy="62" rx="1.5" ry="1" fill="#21112F"/>
        <!-- Zzz -->
        <text x="75" y="30" fill="#E861A3" font-family="serif" font-size="14" font-weight="bold">z</text>
        <text x="86" y="20" fill="#E7DDF5" font-family="serif" font-size="10">z</text>
      </g>
    </svg>`
  },
  {
    id: 'kuromi-dark-heart',
    category: 'kuromi',
    name: 'Kuromi Hugging Gothic Heart',
    tags: ['kuromi', 'heart', 'gothic', 'love', 'coquette', 'kawaii', 'pink heart'],
    svg: `<svg viewBox="0 0 100 100" class="sticker-svg">
      <!-- Hat & Ears -->
      <path d="M 20 42 C 5 22 10 4 25 10 C 30 16 35 28 40 38 C 45 30 55 30 60 38 C 65 28 70 16 75 10 C 90 4 95 22 80 42 C 88 52 88 68 80 76 C 72 84 28 84 20 76 C 12 68 12 52 20 42 Z" fill="#181322" stroke="#542A80" stroke-width="2"/>
      <circle cx="25" cy="10" r="4.5" fill="#E861A3" stroke="#21112F" stroke-width="1.2"/>
      <circle cx="75" cy="10" r="4.5" fill="#E861A3" stroke="#21112F" stroke-width="1.2"/>
      <!-- Face -->
      <ellipse cx="50" cy="54" rx="27" ry="22" fill="#FAF7FC" stroke="#21112F" stroke-width="1.8"/>
      <!-- Skull on Hat -->
      <g transform="translate(50, 27) scale(0.6)">
        <ellipse cx="0" cy="0" rx="9" ry="7" fill="#E861A3"/>
        <rect x="-5" y="3" width="10" height="5" rx="1.5" fill="#E861A3"/>
        <circle cx="-3.5" cy="-1" r="2" fill="#181322"/>
        <circle cx="3.5" cy="-1" r="2" fill="#181322"/>
      </g>
      <!-- Big Adoring Eyes -->
      <ellipse cx="38" cy="51" rx="4.5" ry="6" fill="#21112F"/>
      <circle cx="36" cy="49" r="1.8" fill="#FFF"/>
      <circle cx="39" cy="53" r="0.9" fill="#FFF"/>
      <ellipse cx="62" cy="51" rx="4.5" ry="6" fill="#21112F"/>
      <circle cx="60" cy="49" r="1.8" fill="#FFF"/>
      <circle cx="63" cy="53" r="0.9" fill="#FFF"/>
      <!-- Cute Blushes -->
      <ellipse cx="33" cy="58" rx="4" ry="2.2" fill="#FFA5C8" opacity="0.9"/>
      <ellipse cx="67" cy="58" rx="4" ry="2.2" fill="#FFA5C8" opacity="0.9"/>
      <path d="M 47 58 Q 50 62 53 58" fill="none" stroke="#21112F" stroke-width="2" stroke-linecap="round"/>
      <!-- Gothic Heart Held in Hands -->
      <g transform="translate(50, 75) scale(0.75)">
        <path d="M 0 5 C -15 -18 -38 -5 -28 15 C -20 30 0 45 0 45 C 0 45 20 30 28 15 C 38 -5 15 -18 0 5 Z" fill="#E861A3" stroke="#21112F" stroke-width="2"/>
        <!-- Stitch Marks on Heart -->
        <line x1="-10" y1="10" x2="-2" y2="18" stroke="#FAF7FC" stroke-width="1.8"/>
        <line x1="-9" y1="12" x2="-5" y2="8" stroke="#21112F" stroke-width="1"/>
        <line x1="-5" y1="16" x2="-1" y2="12" stroke="#21112F" stroke-width="1"/>
        <!-- Heart Sparkle -->
        <polygon points="12,12 14,8 16,12 20,14 16,16 14,20 12,16 8,14" fill="#FFFFFF"/>
      </g>
    </svg>`
  },
  {
    id: 'kuromi-witch-wand',
    category: 'kuromi',
    name: 'Kuromi Witch & Star Wand',
    tags: ['kuromi', 'witch', 'magic', 'wand', 'stars', 'spells', 'gothic'],
    svg: `<svg viewBox="0 0 100 100" class="sticker-svg">
      <!-- Magic Sparkles Background -->
      <polygon points="15,20 17,14 19,20 25,22 19,24 17,30 15,24 9,22" fill="#FFDF78" opacity="0.8"/>
      <polygon points="85,15 86.5,10 88,15 93,16.5 88,18 86.5,23 85,18 80,16.5" fill="#E7DDF5"/>
      <!-- Pointed Witch Hat Layered over Jester Cap -->
      <path d="M 50 2 C 55 12 70 24 82 32 L 18 32 C 30 24 45 12 50 2 Z" fill="#2E1145" stroke="#7A39B0" stroke-width="1.5"/>
      <polygon points="50,2 48,0 52,0" fill="#E861A3"/>
      <ellipse cx="50" cy="32" rx="35" ry="7" fill="#1C0D2C" stroke="#7A39B0" stroke-width="1.5"/>
      <!-- Pink Hat Band & Skull Buckle -->
      <path d="M 28 30 C 35 27 65 27 72 30" stroke="#E861A3" stroke-width="3" fill="none"/>
      <ellipse cx="50" cy="28" rx="4" ry="3.5" fill="#FAF7FC"/>
      <!-- Kuromi Face -->
      <ellipse cx="50" cy="58" rx="27" ry="22" fill="#FAF7FC" stroke="#21112F" stroke-width="1.8"/>
      <!-- Wink & Gaze -->
      <path d="M 33 55 Q 40 49 43 57" fill="none" stroke="#21112F" stroke-width="3" stroke-linecap="round"/>
      <ellipse cx="61" cy="55" rx="4.5" ry="6.5" fill="#21112F"/>
      <circle cx="63" cy="53" r="1.8" fill="#FFFFFF"/>
      <ellipse cx="35" cy="63" rx="4" ry="2" fill="#FFA5C8" opacity="0.8"/>
      <ellipse cx="65" cy="63" rx="4" ry="2" fill="#FFA5C8" opacity="0.8"/>
      <path d="M 46 64 Q 50 68 54 64" fill="none" stroke="#21112F" stroke-width="2.5" stroke-linecap="round"/>
      <!-- Magic Star Wand in Hand -->
      <line x1="68" y1="72" x2="88" y2="42" stroke="#542A80" stroke-width="2.5" stroke-linecap="round"/>
      <polygon points="88,40 90,34 94,37 99,35 96,40 99,44 94,43 90,46" fill="#FFDF78" stroke="#D1A728" stroke-width="1"/>
      <circle cx="88" cy="40" r="2.5" fill="#FAF7FC"/>
    </svg>`
  },
  {
    id: 'kuromi-teacup-potion',
    category: 'kuromi',
    name: 'Kuromi Midnight Tea & Skull Steam',
    tags: ['kuromi', 'tea', 'cup', 'potion', 'skull', 'cozy', 'night'],
    svg: `<svg viewBox="0 0 100 100" class="sticker-svg">
      <!-- Hat & Ears -->
      <path d="M 22 40 C 8 22 12 6 26 12 C 32 18 36 30 40 38 C 46 30 54 30 60 38 C 64 30 68 18 74 12 C 88 6 92 22 78 40 C 86 50 86 66 78 74 C 70 82 30 82 22 74 C 14 66 14 50 22 40 Z" fill="#181322" stroke="#542A80" stroke-width="2"/>
      <circle cx="26" cy="12" r="4.5" fill="#E861A3"/>
      <circle cx="74" cy="12" r="4.5" fill="#E861A3"/>
      <!-- Face -->
      <ellipse cx="50" cy="52" rx="26" ry="21" fill="#FAF7FC" stroke="#21112F" stroke-width="1.8"/>
      <!-- Eyes: Happy Curved Closed Eyes -->
      <path d="M 34 51 Q 40 45 46 51" fill="none" stroke="#21112F" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M 54 51 Q 60 45 66 51" fill="none" stroke="#21112F" stroke-width="2.5" stroke-linecap="round"/>
      <ellipse cx="35" cy="57" rx="3.5" ry="2" fill="#FFA5C8" opacity="0.9"/>
      <ellipse cx="65" cy="57" rx="3.5" ry="2" fill="#FFA5C8" opacity="0.9"/>
      <!-- Pink Skull on Hat -->
      <ellipse cx="50" cy="27" rx="6" ry="5" fill="#E861A3"/>
      <rect x="47" y="30" width="6" height="3" fill="#E861A3"/>
      <!-- Antique Violet Teacup in Front -->
      <g transform="translate(50, 75)">
        <!-- Saucer -->
        <ellipse cx="0" cy="16" rx="24" ry="4" fill="#2E1B3E" stroke="#7A45A8" stroke-width="1.2"/>
        <!-- Cup -->
        <path d="M -18 0 C -18 14 18 14 18 0 Z" fill="#3D1D54" stroke="#9E62C9" stroke-width="1.5"/>
        <!-- Handle -->
        <path d="M 17 2 C 24 2 24 10 16 11" fill="none" stroke="#9E62C9" stroke-width="1.5"/>
        <!-- Tea Surface -->
        <ellipse cx="0" cy="0" rx="17" ry="3.5" fill="#5E2342"/>
        <!-- Rising Skull Steam -->
        <path d="M -4 -8 Q 0 -18 8 -22 Q 10 -28 0 -32 Q -8 -28 0 -22" fill="none" stroke="#E7DDF5" stroke-width="1.2" stroke-dasharray="3,2" opacity="0.75"/>
        <circle cx="-1" cy="-26" r="1.2" fill="#FAF7FC"/>
        <circle cx="3" cy="-26" r="1.2" fill="#FAF7FC"/>
      </g>
    </svg>`
  },
  {
    id: 'kuromi-rebel-peace',
    category: 'kuromi',
    name: 'Kuromi Rebel Attitude ✌️',
    tags: ['kuromi', 'peace', 'rebel', 'attitude', 'wink', 'kawaii', 'goth girl'],
    svg: `<svg viewBox="0 0 100 100" class="sticker-svg">
      <!-- Hat & Ears -->
      <path d="M 22 42 C 8 24 10 6 26 12 C 32 18 36 30 40 38 C 46 30 54 30 60 38 C 64 30 68 18 74 12 C 90 6 92 24 78 42 C 86 52 86 68 78 76 C 70 84 30 84 22 76 C 14 68 14 52 22 42 Z" fill="#140D1D" stroke="#68399E" stroke-width="2"/>
      <circle cx="26" cy="12" r="4.5" fill="#E861A3"/>
      <circle cx="74" cy="12" r="4.5" fill="#E861A3"/>
      <!-- Face -->
      <ellipse cx="50" cy="54" rx="27" ry="22" fill="#FAF6FE" stroke="#140D1D" stroke-width="2"/>
      <!-- Pink Skull -->
      <g transform="translate(50, 28) scale(0.65)">
        <ellipse cx="0" cy="0" rx="9" ry="7" fill="#E861A3"/>
        <rect x="-5" y="3" width="10" height="5" rx="1.5" fill="#E861A3"/>
        <circle cx="-3.5" cy="-1" r="2" fill="#140D1D"/>
        <circle cx="3.5" cy="-1" r="2" fill="#140D1D"/>
      </g>
      <!-- One eye open with mascara lashes, one eye cheeky wink -->
      <ellipse cx="38" cy="52" rx="4.5" ry="6.5" fill="#140D1D"/>
      <circle cx="36" cy="50" r="1.8" fill="#FFF"/>
      <!-- Lashes -->
      <line x1="33" y1="46" x2="30" y2="44" stroke="#140D1D" stroke-width="1.5"/>
      <line x1="38" y1="45" x2="38" y2="42" stroke="#140D1D" stroke-width="1.5"/>
      <path d="M 57 54 Q 63 48 68 55" fill="none" stroke="#140D1D" stroke-width="2.8" stroke-linecap="round"/>
      <ellipse cx="34" cy="61" rx="4" ry="2" fill="#FFA5C8" opacity="0.85"/>
      <ellipse cx="66" cy="61" rx="4" ry="2" fill="#FFA5C8" opacity="0.85"/>
      <!-- Smirk -->
      <path d="M 46 62 Q 52 66 56 61" fill="none" stroke="#140D1D" stroke-width="2.5" stroke-linecap="round"/>
      <!-- Peace Sign Hand ✌️ -->
      <g transform="translate(74, 66) scale(0.8)">
        <circle cx="0" cy="4" r="7" fill="#FAF6FE" stroke="#140D1D" stroke-width="1.8"/>
        <!-- Fingers V -->
        <rect x="-5" y="-14" width="4" height="14" rx="2" fill="#FAF6FE" stroke="#140D1D" stroke-width="1.5"/>
        <rect x="1" y="-16" width="4" height="15" rx="2" fill="#FAF6FE" stroke="#140D1D" stroke-width="1.5"/>
      </g>
      <!-- Sparkle -->
      <polygon points="18,58 20,53 22,58 27,60 22,62 20,67 18,62 13,60" fill="#E861A3"/>
    </svg>`
  },
  {
    id: 'kuromi-coquette-corset',
    category: 'kuromi',
    name: 'Kuromi Gothic Lolita & Corset',
    tags: ['kuromi', 'coquette', 'corset', 'lolita', 'lace', 'pearls', 'goth'],
    svg: `<svg viewBox="0 0 100 100" class="sticker-svg">
      <!-- Hat & Ears -->
      <path d="M 22 42 C 8 24 12 6 26 12 C 32 18 36 30 40 38 C 46 30 54 30 60 38 C 64 30 68 18 74 12 C 88 6 92 24 78 42 C 86 52 86 68 78 76 C 70 84 30 84 22 76 C 14 68 14 52 22 42 Z" fill="#181322" stroke="#A993C9" stroke-width="1.8"/>
      <circle cx="26" cy="12" r="4.5" fill="#E861A3"/>
      <circle cx="74" cy="12" r="4.5" fill="#E861A3"/>
      <!-- Face -->
      <ellipse cx="50" cy="52" rx="26" ry="21" fill="#FAF7FC" stroke="#181322" stroke-width="1.8"/>
      <!-- Skull -->
      <ellipse cx="50" cy="27" rx="6" ry="5" fill="#E861A3"/>
      <rect x="47" y="30" width="6" height="3" fill="#E861A3"/>
      <circle cx="48" cy="26" r="1.2" fill="#181322"/>
      <circle cx="52" cy="26" r="1.2" fill="#181322"/>
      <!-- Cute Eyes -->
      <ellipse cx="38" cy="50" rx="4.5" ry="6" fill="#181322"/>
      <circle cx="36" cy="48" r="1.8" fill="#FFF"/>
      <ellipse cx="62" cy="50" rx="4.5" ry="6" fill="#181322"/>
      <circle cx="60" cy="48" r="1.8" fill="#FFF"/>
      <ellipse cx="33" cy="57" rx="3.5" ry="2" fill="#FFA5C8" opacity="0.8"/>
      <ellipse cx="67" cy="57" rx="3.5" ry="2" fill="#FFA5C8" opacity="0.8"/>
      <path d="M 47 57 Q 50 60 53 57" fill="none" stroke="#181322" stroke-width="2" stroke-linecap="round"/>
      <!-- Black Lace Choker with Pearl -->
      <rect x="42" y="66" width="16" height="4" rx="1" fill="#110B18" stroke="#542A80" stroke-width="0.8"/>
      <circle cx="50" cy="71" r="2" fill="#FAF6FF" stroke="#A993C9" stroke-width="0.6"/>
      <!-- Gothic Lolita Corset Dress with Criss-Cross Ribbons -->
      <path d="M 36 74 L 64 74 L 68 94 L 32 94 Z" fill="#29163A" stroke="#7A39B0" stroke-width="1.5"/>
      <!-- Corset Lacing -->
      <line x1="44" y1="76" x2="56" y2="82" stroke="#E861A3" stroke-width="1.5"/>
      <line x1="56" y1="76" x2="44" y2="82" stroke="#E861A3" stroke-width="1.5"/>
      <line x1="44" y1="84" x2="56" y2="90" stroke="#E861A3" stroke-width="1.5"/>
      <line x1="56" y1="84" x2="44" y2="90" stroke="#E861A3" stroke-width="1.5"/>
      <!-- Lace Frill Trim -->
      <path d="M 32 94 Q 36 98 40 94 Q 44 98 48 94 Q 52 98 56 94 Q 60 98 64 94 Q 68 98 68 94" fill="none" stroke="#FAF7FC" stroke-width="1.5"/>
    </svg>`
  },
  {
    id: 'kuromi-crying-pout',
    category: 'kuromi',
    name: 'Kuromi Kawaii Dramatic Tears',
    tags: ['kuromi', 'crying', 'sad', 'pout', 'dramatic', 'anime tears', 'cute'],
    svg: `<svg viewBox="0 0 100 100" class="sticker-svg">
      <!-- Hat & Drooping Ears -->
      <path d="M 22 45 C 4 30 8 10 24 16 C 30 22 34 32 40 40 C 46 32 54 32 60 40 C 66 32 70 22 76 16 C 92 10 96 30 78 45 C 86 55 86 72 78 80 C 70 88 30 88 22 80 C 14 72 14 55 22 45 Z" fill="#181322" stroke="#542A80" stroke-width="2"/>
      <circle cx="24" cy="16" r="4.5" fill="#E861A3"/>
      <circle cx="76" cy="16" r="4.5" fill="#E861A3"/>
      <!-- Face -->
      <ellipse cx="50" cy="58" rx="27" ry="23" fill="#FAF7FC" stroke="#21112F" stroke-width="1.8"/>
      <!-- Skull with tear drop -->
      <g transform="translate(50, 31) scale(0.6)">
        <ellipse cx="0" cy="0" rx="9" ry="7" fill="#E861A3"/>
        <rect x="-5" y="3" width="10" height="5" rx="1.5" fill="#E861A3"/>
        <circle cx="-3.5" cy="-1" r="2" fill="#181322"/>
        <circle cx="3.5" cy="-1" r="2" fill="#181322"/>
      </g>
      <!-- Big Teary Anime Eyes with Sparkles -->
      <ellipse cx="38" cy="54" rx="5.5" ry="7.5" fill="#181322"/>
      <circle cx="36" cy="51" r="2.5" fill="#FFF"/>
      <circle cx="40" cy="57" r="1.5" fill="#FFF"/>
      <circle cx="35" cy="58" r="1" fill="#75B6FF"/>
      <ellipse cx="62" cy="54" rx="5.5" ry="7.5" fill="#181322"/>
      <circle cx="60" cy="51" r="2.5" fill="#FFF"/>
      <circle cx="64" cy="57" r="1.5" fill="#FFF"/>
      <circle cx="59" cy="58" r="1" fill="#75B6FF"/>
      <!-- Streaming Waterfall Anime Tears -->
      <path d="M 34 60 C 30 68 28 80 30 88" stroke="#75B6FF" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <path d="M 66 60 C 70 68 72 80 70 88" stroke="#75B6FF" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <circle cx="30" cy="89" r="2" fill="#75B6FF"/>
      <circle cx="70" cy="89" r="2" fill="#75B6FF"/>
      <!-- Heavy Blushing -->
      <ellipse cx="32" cy="65" rx="4.5" ry="2.5" fill="#FFA5C8" opacity="0.9"/>
      <ellipse cx="68" cy="65" rx="4.5" ry="2.5" fill="#FFA5C8" opacity="0.9"/>
      <!-- Wobbly Pouting Mouth -->
      <path d="M 45 67 Q 50 63 55 67" fill="none" stroke="#21112F" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`
  },
  {
    id: 'rose-black-velvet',
    category: 'roses',
    name: 'Obsidian Velvet Rose',
    tags: ['rose', 'flower', 'black', 'gothic', 'botanical', 'romance'],
    svg: `<svg viewBox="0 0 100 100" class="sticker-svg">
      <defs>
        <radialGradient id="roseGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#431C5B"/>
          <stop offset="60%" stop-color="#190F24"/>
          <stop offset="100%" stop-color="#0B0610"/>
        </radialGradient>
      </defs>
      <!-- Leaves -->
      <path d="M 28 65 C 10 65 15 45 32 50 C 35 55 35 60 28 65 Z" fill="#1C2E24" stroke="#486B56" stroke-width="1.2"/>
      <path d="M 72 65 C 90 65 85 45 68 50 C 65 55 65 60 72 65 Z" fill="#1C2E24" stroke="#486B56" stroke-width="1.2"/>
      <!-- Stem & Thorns -->
      <path d="M 50 68 Q 52 82 48 95" stroke="#2D4435" stroke-width="3" fill="none"/>
      <polygon points="50,76 43,73 49,79" fill="#2D4435"/>
      <polygon points="51,84 57,81 51,87" fill="#2D4435"/>
      <!-- Rose Petals Layer Outer -->
      <path d="M 25 45 C 20 25 40 18 50 25 C 60 18 80 25 75 45 C 80 60 65 72 50 70 C 35 72 20 60 25 45 Z" fill="url(#roseGrad)" stroke="#6C3E8F" stroke-width="1.5"/>
      <!-- Mid Petals -->
      <path d="M 32 40 C 30 28 45 22 50 30 C 55 22 70 28 68 40 C 72 52 60 60 50 58 C 40 60 28 52 32 40 Z" fill="#2A133A" stroke="#9A65C4" stroke-width="1"/>
      <!-- Core Spiral -->
      <path d="M 42 42 C 40 35 50 32 54 36 C 58 40 55 48 48 48 C 44 48 44 42 48 42 C 50 42 51 44 49 45" fill="none" stroke="#DAB6FC" stroke-width="1.5" stroke-linecap="round"/>
      <!-- Dewdrops -->
      <circle cx="36" cy="46" r="2" fill="#E7DDF5" opacity="0.8"/>
      <circle cx="64" cy="42" r="1.5" fill="#E7DDF5" opacity="0.8"/>
    </svg>`
  },
  {
    id: 'rose-bleeding-plum',
    category: 'roses',
    name: 'Bleeding Plum Rosebud',
    tags: ['rose', 'plum', 'blood', 'tear', 'gothic', 'vintage'],
    svg: `<svg viewBox="0 0 100 100" class="sticker-svg">
      <!-- Thorns & Stem -->
      <path d="M 50 55 Q 48 75 52 94" stroke="#271E2B" stroke-width="2.5" fill="none"/>
      <path d="M 50 70 L 44 67 L 49 74 Z" fill="#4B2038"/>
      <!-- Calyx -->
      <path d="M 35 52 C 42 55 50 58 50 58 C 50 58 58 55 65 52 C 60 62 50 64 50 64 C 50 64 40 62 35 52 Z" fill="#241424" stroke="#682F5A" stroke-width="1.2"/>
      <!-- Petals -->
      <path d="M 36 32 C 34 18 48 10 50 16 C 52 10 66 18 64 32 C 66 45 58 54 50 54 C 42 54 34 45 36 32 Z" fill="#5E1840" stroke="#9F3B74" stroke-width="1.5"/>
      <path d="M 42 26 C 42 18 52 16 54 22 C 56 28 52 38 48 38 C 45 38 43 32 46 28" fill="#87265F" stroke="#E372AD" stroke-width="1"/>
      <!-- Bleeding drop -->
      <path d="M 50 58 C 48 64 46 68 46 71 C 46 74 48 76 50 76 C 52 76 54 74 54 71 C 54 68 52 64 50 58 Z" fill="#A81C51"/>
    </svg>`
  },
  {
    id: 'dead-black-bouquet',
    category: 'roses',
    name: 'Pressed Dried Flowers',
    tags: ['dried', 'pressed', 'vintage', 'botanical', 'aesthetic', 'herbarium'],
    svg: `<svg viewBox="0 0 100 100" class="sticker-svg">
      <!-- Ribbon bow tied around stems -->
      <path d="M 50 70 C 42 70 35 62 38 58 C 42 54 48 64 50 68 C 52 64 58 54 62 58 C 65 62 58 70 50 70 Z" fill="#542A80" stroke="#A993C9" stroke-width="1"/>
      <path d="M 47 70 L 40 88 M 53 70 L 60 88" stroke="#542A80" stroke-width="2"/>
      <!-- Pressed stems -->
      <path d="M 50 68 L 30 30 M 50 68 L 50 20 M 50 68 L 70 30" stroke="#4A3B32" stroke-width="2"/>
      <!-- Left blossom -->
      <circle cx="30" cy="30" r="8" fill="#2B2129" stroke="#7E6879" stroke-width="1"/>
      <!-- Center blossom -->
      <circle cx="50" cy="20" r="10" fill="#1C1521" stroke="#876899" stroke-width="1.2"/>
      <circle cx="50" cy="20" r="4" fill="#3B2648"/>
      <!-- Right blossom -->
      <circle cx="70" cy="30" r="8" fill="#2B2129" stroke="#7E6879" stroke-width="1"/>
      <!-- Little fern leaves -->
      <path d="M 38 45 L 30 42 M 42 52 L 32 50 M 62 45 L 70 42 M 58 52 L 68 50" stroke="#3D4537" stroke-width="1.5"/>
    </svg>`
  },

  // ================= MOTHS, BATS & CREATURES =================
  {
    id: 'death-head-moth',
    category: 'creatures',
    name: "Death's-Head Hawk Moth",
    tags: ['moth', 'skull', 'wings', 'death', 'hawk moth', 'insect', 'witchy'],
    svg: `<svg viewBox="0 0 100 100" class="sticker-svg">
      <!-- Upper Wings -->
      <path d="M 50 48 C 40 30 15 15 5 28 C -2 38 8 60 35 62 C 45 62 48 54 50 48 Z" fill="#281A33" stroke="#8C5EB8" stroke-width="1.5"/>
      <path d="M 50 48 C 60 30 85 15 95 28 C 102 38 92 60 65 62 C 55 62 52 54 50 48 Z" fill="#281A33" stroke="#8C5EB8" stroke-width="1.5"/>
      <!-- Lower Wings -->
      <path d="M 50 52 C 42 55 25 58 24 72 C 24 82 38 82 46 68 Z" fill="#D39E45" stroke="#7A5416" stroke-width="1.2" opacity="0.9"/>
      <path d="M 50 52 C 58 55 75 58 76 72 C 76 82 62 82 54 68 Z" fill="#D39E45" stroke="#7A5416" stroke-width="1.2" opacity="0.9"/>
      <!-- Wing veins/patterns -->
      <path d="M 12 34 Q 30 42 45 52 M 88 34 Q 70 42 55 52" stroke="#E7DDF5" stroke-width="0.8" opacity="0.6"/>
      <!-- Body -->
      <ellipse cx="50" cy="55" rx="5" ry="18" fill="#150E1C" stroke="#A993C9" stroke-width="1"/>
      <!-- Skull pattern on thorax -->
      <ellipse cx="50" cy="44" rx="4.5" ry="5" fill="#FAF4DE"/>
      <circle cx="48" cy="43" r="1.1" fill="#150E1C"/>
      <circle cx="52" cy="43" r="1.1" fill="#150E1C"/>
      <path d="M 48 47 L 52 47" stroke="#150E1C" stroke-width="0.8"/>
      <!-- Feathered Antennae -->
      <path d="M 48 38 Q 42 24 35 20" stroke="#A993C9" stroke-width="1.5" fill="none"/>
      <path d="M 52 38 Q 58 24 65 20" stroke="#A993C9" stroke-width="1.5" fill="none"/>
    </svg>`
  },
  {
    id: 'bat-gothic-flying',
    category: 'creatures',
    name: 'Midnight Winged Bat',
    tags: ['bat', 'flying', 'vampire', 'creature', 'halloween', 'night'],
    svg: `<svg viewBox="0 0 100 100" class="sticker-svg">
      <!-- Left Wing with Webbed Finger Structure -->
      <path d="M 50 52 C 45 35 30 20 10 24 C 8 38 18 45 16 56 C 24 50 30 60 34 68 C 40 60 46 62 50 52 Z" fill="#140D1C" stroke="#542A80" stroke-width="1.5"/>
      <!-- Right Wing -->
      <path d="M 50 52 C 55 35 70 20 90 24 C 92 38 82 45 84 56 C 76 50 70 60 66 68 C 60 60 54 62 50 52 Z" fill="#140D1C" stroke="#542A80" stroke-width="1.5"/>
      <!-- Wing bone lines -->
      <path d="M 50 50 Q 28 32 10 24 M 50 50 Q 72 32 90 24" stroke="#8A58B8" stroke-width="1"/>
      <!-- Bat Body -->
      <ellipse cx="50" cy="54" rx="6" ry="12" fill="#0C0712" stroke="#A993C9" stroke-width="1"/>
      <!-- Ears -->
      <polygon points="46,45 44,35 48,43" fill="#140D1C" stroke="#8A58B8" stroke-width="1"/>
      <polygon points="54,45 56,35 52,43" fill="#140D1C" stroke="#8A58B8" stroke-width="1"/>
      <!-- Tiny Red Eyes -->
      <circle cx="48" cy="48" r="1.2" fill="#E84373"/>
      <circle cx="52" cy="48" r="1.2" fill="#E84373"/>
      <!-- Tiny Fangs -->
      <polygon points="48,53 49,56 49,53" fill="#FFF"/>
      <polygon points="51,53 52,56 52,53" fill="#FFF"/>
    </svg>`
  },
  {
    id: 'black-cat-familiar',
    category: 'creatures',
    name: 'Witch Familiar Black Cat',
    tags: ['cat', 'black cat', 'familiar', 'witch', 'eyes', 'cute', 'moon'],
    svg: `<svg viewBox="0 0 100 100" class="sticker-svg">
      <!-- Body & Tail -->
      <path d="M 50 75 C 38 75 35 60 42 46 C 45 42 55 42 58 46 C 65 60 62 75 50 75 Z" fill="#120D1A" stroke="#542A80" stroke-width="1.5"/>
      <!-- Curled Sleek Tail -->
      <path d="M 58 72 C 72 74 82 66 78 52 C 75 42 68 46 72 50" fill="none" stroke="#120D1A" stroke-width="3.5" stroke-linecap="round"/>
      <!-- Cat Head -->
      <circle cx="50" cy="38" r="14" fill="#120D1A" stroke="#542A80" stroke-width="1.5"/>
      <!-- Ears -->
      <polygon points="40,30 35,16 46,26" fill="#120D1A" stroke="#7A42A8" stroke-width="1.2"/>
      <polygon points="40,28 37,20 44,25" fill="#422152"/>
      <polygon points="60,30 65,16 54,26" fill="#120D1A" stroke="#7A42A8" stroke-width="1.2"/>
      <polygon points="60,28 63,20 56,25" fill="#422152"/>
      <!-- Luminous Yellow/Green Eyes -->
      <ellipse cx="45" cy="37" rx="3.5" ry="4.5" fill="#D4E85C"/>
      <ellipse cx="55" cy="37" rx="3.5" ry="4.5" fill="#D4E85C"/>
      <!-- Slit Pupils -->
      <ellipse cx="45" cy="37" rx="1" ry="4" fill="#0B0812"/>
      <ellipse cx="55" cy="37" rx="1" ry="4" fill="#0B0812"/>
      <!-- Crescent Moon Pendant on Neck -->
      <circle cx="50" cy="50" r="1.5" fill="#FFDF78"/>
      <path d="M 50 51 Q 48 54 50 57 Q 47 55 48 52 Z" fill="#FFDF78"/>
    </svg>`
  },
  {
    id: 'raven-perched',
    category: 'creatures',
    name: 'Edgar the Midnight Raven',
    tags: ['raven', 'crow', 'bird', 'poe', 'nevermore', 'dark'],
    svg: `<svg viewBox="0 0 100 100" class="sticker-svg">
      <!-- Perch branch -->
      <path d="M 15 82 Q 50 78 85 85" stroke="#3D291F" stroke-width="4" stroke-linecap="round"/>
      <!-- Raven Body -->
      <path d="M 45 32 C 40 45 38 65 30 82 C 45 80 60 76 65 65 C 70 52 65 38 52 30 Z" fill="#110A18" stroke="#482F62" stroke-width="1.5"/>
      <!-- Feathers wing -->
      <path d="M 46 45 C 42 58 40 72 32 80 C 42 78 52 72 56 62 Z" fill="#1F152A" stroke="#754E99" stroke-width="1"/>
      <!-- Head -->
      <circle cx="52" cy="28" r="9" fill="#110A18" stroke="#482F62" stroke-width="1.2"/>
      <!-- Sharp Beak -->
      <polygon points="58,26 74,32 58,34" fill="#241B26" stroke="#4B3B50" stroke-width="1"/>
      <!-- Glowing Eye -->
      <circle cx="54" cy="26" r="2" fill="#A993C9"/>
      <circle cx="54" cy="26" r="0.8" fill="#FFF"/>
      <!-- Claws -->
      <path d="M 42 80 L 40 84 M 45 80 L 45 85 M 48 80 L 50 84" stroke="#241B26" stroke-width="2"/>
    </svg>`
  },

  // ================= CELESTIAL & WITCHY =================
  {
    id: 'celestial-crescent-moon',
    category: 'witchy',
    name: 'Ornate Moonlit Crescent',
    tags: ['moon', 'crescent', 'celestial', 'stars', 'witchy', 'night', 'lunar'],
    svg: `<svg viewBox="0 0 100 100" class="sticker-svg">
      <defs>
        <linearGradient id="moonGlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FFFFFF"/>
          <stop offset="50%" stop-color="#E7DDF5"/>
          <stop offset="100%" stop-color="#A993C9"/>
        </linearGradient>
      </defs>
      <!-- Crescent Moon -->
      <path d="M 68 12 C 32 16 16 48 26 80 C 40 94 68 88 78 74 C 48 76 34 50 48 26 C 54 18 60 14 68 12 Z" fill="url(#moonGlow)" stroke="#542A80" stroke-width="2"/>
      <!-- Engraved filigree lines -->
      <path d="M 38 42 Q 44 54 38 66 M 46 36 Q 52 46 48 56" stroke="#542A80" stroke-width="1" fill="none" opacity="0.6"/>
      <!-- Hanging Star -->
      <path d="M 58 16 Q 66 32 64 42" stroke="#A993C9" stroke-width="1" fill="none" stroke-dasharray="2,2"/>
      <polygon points="64,43 65.5,47 69,47 66,49.5 67,53 64,51 61,53 62,49.5 59,47 62.5,47" fill="#FFDF78" stroke="#D1A728" stroke-width="0.8"/>
      <!-- Twinkle stars -->
      <polygon points="76,22 78,27 83,27 79,30 81,34 76,31 72,34 74,30 70,27 75,27" fill="#E7DDF5"/>
      <circle cx="20" cy="30" r="1.5" fill="#E7DDF5"/>
      <circle cx="82" cy="62" r="1.5" fill="#E7DDF5"/>
    </svg>`
  },
  {
    id: 'potion-bottle-amethyst',
    category: 'witchy',
    name: 'Amethyst Elixir of Dreams',
    tags: ['potion', 'magic', 'witchy', 'bottle', 'poison', 'elixir', 'alchemy'],
    svg: `<svg viewBox="0 0 100 100" class="sticker-svg">
      <defs>
        <linearGradient id="potionLiquid" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#B777ED"/>
          <stop offset="60%" stop-color="#64249E"/>
          <stop offset="100%" stop-color="#2D0B4B"/>
        </linearGradient>
      </defs>
      <!-- Cork stopper -->
      <rect x="42" y="14" width="16" height="8" rx="2" fill="#8A5A36" stroke="#482F1B" stroke-width="1"/>
      <!-- Bottle neck & rim -->
      <rect x="40" y="22" width="20" height="5" rx="1.5" fill="#C2B2D6" stroke="#542A80" stroke-width="1"/>
      <rect x="44" y="27" width="12" height="12" fill="#E7DDF5" opacity="0.6" stroke="#542A80" stroke-width="1"/>
      <!-- Round Flask Glass Body -->
      <circle cx="50" cy="62" r="28" fill="#1C1129" stroke="#9E76C2" stroke-width="2" opacity="0.4"/>
      <!-- Liquid Inside -->
      <path d="M 24 64 C 26 78 36 88 50 88 C 64 88 74 78 76 64 C 66 60 60 68 50 63 C 40 58 34 66 24 64 Z" fill="url(#potionLiquid)"/>
      <!-- Glowing magical bubbles -->
      <circle cx="45" cy="74" r="3" fill="#FAF6FF" opacity="0.8"/>
      <circle cx="55" cy="78" r="2" fill="#FAF6FF" opacity="0.8"/>
      <circle cx="40" cy="68" r="1.5" fill="#FAF6FF" opacity="0.8"/>
      <!-- Skull emblem on label -->
      <rect x="41" y="52" width="18" height="14" rx="2" fill="#FAF6FE" stroke="#542A80" stroke-width="1"/>
      <circle cx="47" cy="57" r="1" fill="#1C1129"/>
      <circle cx="53" cy="57" r="1" fill="#1C1129"/>
      <line x1="48" y1="62" x2="52" y2="62" stroke="#1C1129" stroke-width="1"/>
    </svg>`
  },
  {
    id: 'skull-candle-lit',
    category: 'witchy',
    name: 'Mementō Morī Skull Candle',
    tags: ['skull', 'candle', 'wax', 'flame', 'gothic', 'alchemy'],
    svg: `<svg viewBox="0 0 100 100" class="sticker-svg">
      <!-- Skull Base -->
      <path d="M 32 50 C 30 35 40 28 50 28 C 60 28 70 35 68 50 C 70 60 65 68 58 68 L 58 76 C 58 78 42 78 42 76 L 42 68 C 35 68 30 60 32 50 Z" fill="#E8DEC8" stroke="#3D2F1B" stroke-width="1.8"/>
      <!-- Eye sockets -->
      <ellipse cx="42" cy="48" rx="5" ry="6" fill="#1F160C"/>
      <ellipse cx="58" cy="48" rx="5" ry="6" fill="#1F160C"/>
      <!-- Nose cavity -->
      <polygon points="50,54 47,60 53,60" fill="#1F160C"/>
      <!-- Teeth lines -->
      <line x1="45" y1="71" x2="45" y2="76" stroke="#3D2F1B" stroke-width="1.5"/>
      <line x1="50" y1="71" x2="50" y2="76" stroke="#3D2F1B" stroke-width="1.5"/>
      <line x1="55" y1="71" x2="55" y2="76" stroke="#3D2F1B" stroke-width="1.5"/>
      <!-- Candle on top -->
      <rect x="46" y="16" width="8" height="15" fill="#4B1F68" stroke="#250B36" stroke-width="1"/>
      <!-- Dripping wax -->
      <path d="M 44 26 C 44 32 46 36 46 40 C 47 34 49 32 49 28" fill="#7535A0"/>
      <!-- Wick -->
      <line x1="50" y1="16" x2="50" y2="10" stroke="#1F160C" stroke-width="1.5"/>
      <!-- Flame -->
      <path d="M 50 4 C 44 9 46 13 50 14 C 54 13 56 9 50 4 Z" fill="#FFA538"/>
      <path d="M 50 7 C 47 10 48 12 50 13 C 52 12 53 10 50 7 Z" fill="#FFF8C4"/>
    </svg>`
  },
  {
    id: 'antique-skeleton-key',
    category: 'witchy',
    name: 'Ancient Secret Skeleton Key',
    tags: ['key', 'antique', 'silver', 'secret', 'lock', 'vintage'],
    svg: `<svg viewBox="0 0 100 100" class="sticker-svg">
      <!-- Ornate Bow (Heart & Clover shape) -->
      <circle cx="50" cy="24" r="14" fill="none" stroke="#D0C4DE" stroke-width="3"/>
      <circle cx="50" cy="24" r="7" fill="none" stroke="#D0C4DE" stroke-width="2"/>
      <path d="M 50 10 C 46 16 54 16 50 10 Z" fill="#A993C9"/>
      <!-- Key Shaft -->
      <line x1="50" y1="38" x2="50" y2="86" stroke="#D0C4DE" stroke-width="3.5" stroke-linecap="round"/>
      <circle cx="50" cy="48" r="3.5" fill="#A993C9" stroke="#D0C4DE" stroke-width="1.5"/>
      <!-- Key Bit / Teeth (Gothic Cross shape) -->
      <path d="M 50 72 L 64 72 L 64 77 L 57 77 L 57 82 L 65 82 L 65 87 L 50 87" fill="#D0C4DE" stroke="#542A80" stroke-width="1"/>
    </svg>`
  },

  // ================= RIBBONS, LACE & COQUETTE =================
  {
    id: 'coquette-black-lace-bow',
    category: 'coquette',
    name: 'Dark Velvet Coquette Bow',
    tags: ['bow', 'ribbon', 'coquette', 'velvet', 'cute', 'black', 'gothic coquette'],
    svg: `<svg viewBox="0 0 100 100" class="sticker-svg">
      <!-- Left Loop -->
      <path d="M 48 40 C 35 24 15 28 14 44 C 13 58 35 56 46 48 Z" fill="#1C1226" stroke="#7A4DA3" stroke-width="1.8"/>
      <path d="M 45 42 C 34 32 24 34 22 42 C 22 50 36 48 44 45 Z" fill="#3D2054"/>
      <!-- Right Loop -->
      <path d="M 52 40 C 65 24 85 28 86 44 C 87 58 65 56 54 48 Z" fill="#1C1226" stroke="#7A4DA3" stroke-width="1.8"/>
      <path d="M 55 42 C 66 32 76 34 78 42 C 78 50 64 48 56 45 Z" fill="#3D2054"/>
      <!-- Hanging Ribbon Tails -->
      <path d="M 46 48 Q 32 68 22 84 C 30 78 36 78 44 86 Q 48 68 49 52 Z" fill="#1C1226" stroke="#7A4DA3" stroke-width="1.5"/>
      <path d="M 54 48 Q 68 68 78 84 C 70 78 64 78 56 86 Q 52 68 51 52 Z" fill="#1C1226" stroke="#7A4DA3" stroke-width="1.5"/>
      <!-- Center Knot -->
      <ellipse cx="50" cy="45" rx="6" ry="7" fill="#542A80" stroke="#DAB6FC" stroke-width="1.5"/>
      <!-- Little pearl drop -->
      <circle cx="50" cy="54" r="2.5" fill="#FAF6FF" stroke="#A993C9" stroke-width="0.8"/>
    </svg>`
  },
  {
    id: 'anatomical-heart-bleeding',
    category: 'coquette',
    name: 'Sacred Bleeding Heart',
    tags: ['heart', 'anatomical', 'bleeding', 'sacred heart', 'coquette', 'love'],
    svg: `<svg viewBox="0 0 100 100" class="sticker-svg">
      <!-- Aorta and Arteries -->
      <path d="M 42 22 L 42 34 M 50 18 L 50 34 M 58 22 L 58 34" stroke="#481829" stroke-width="4" stroke-linecap="round"/>
      <!-- Heart Muscle -->
      <path d="M 50 32 C 34 26 24 40 28 58 C 32 74 46 86 50 92 C 54 86 68 74 72 58 C 76 40 66 26 50 32 Z" fill="#69162A" stroke="#B83956" stroke-width="2"/>
      <!-- Veins -->
      <path d="M 45 42 Q 36 50 38 64 M 54 42 Q 62 52 60 66" stroke="#2B0710" stroke-width="1.5" fill="none"/>
      <!-- Little Crown of Thorns around heart -->
      <path d="M 30 52 Q 50 58 70 52" stroke="#22181C" stroke-width="2" fill="none"/>
      <polygon points="36,49 38,54 39,49" fill="#22181C"/>
      <polygon points="48,53 50,59 52,53" fill="#22181C"/>
      <polygon points="62,49 64,54 65,49" fill="#22181C"/>
      <!-- Drop -->
      <path d="M 50 92 C 48 95 48 97 50 98 C 52 97 52 95 50 92 Z" fill="#B83956"/>
    </svg>`
  },

  // ================= INKED STAMPS =================
  {
    id: 'stamp-top-secret',
    category: 'stamps',
    name: 'Stamp: TOP SECRET',
    tags: ['stamp', 'top secret', 'ink', 'classified', 'red', 'distressed'],
    svg: `<svg viewBox="0 0 140 70" class="sticker-svg stamp-effect">
      <rect x="5" y="5" width="130" height="60" rx="6" fill="none" stroke="#D42A46" stroke-width="3" stroke-dasharray="140, 2, 4, 3" opacity="0.88"/>
      <rect x="10" y="10" width="120" height="50" rx="4" fill="none" stroke="#D42A46" stroke-width="1.2" opacity="0.75"/>
      <text x="70" y="42" font-family="'Courier New', monospace" font-size="20" font-weight="900" fill="#D42A46" text-anchor="middle" letter-spacing="3" opacity="0.92">TOP SECRET</text>
      <!-- Distress grunge speckles -->
      <circle cx="25" cy="20" r="1.5" fill="#D42A46" opacity="0.6"/>
      <circle cx="115" cy="50" r="1.2" fill="#D42A46" opacity="0.7"/>
      <circle cx="80" cy="15" r="0.8" fill="#D42A46" opacity="0.5"/>
    </svg>`
  },
  {
    id: 'stamp-classified',
    category: 'stamps',
    name: 'Stamp: CLASSIFIED',
    tags: ['stamp', 'classified', 'confidential', 'purple', 'distressed'],
    svg: `<svg viewBox="0 0 140 65" class="sticker-svg stamp-effect">
      <rect x="6" y="6" width="128" height="53" rx="4" fill="none" stroke="#873BBF" stroke-width="3" stroke-dasharray="80, 4, 30, 2" opacity="0.9"/>
      <text x="70" y="40" font-family="'Courier New', monospace" font-size="18" font-weight="900" fill="#873BBF" text-anchor="middle" letter-spacing="4" opacity="0.92">CLASSIFIED</text>
      <line x1="20" y1="46" x2="120" y2="46" stroke="#873BBF" stroke-width="1.5" stroke-dasharray="5,2" opacity="0.8"/>
    </svg>`
  },
  {
    id: 'stamp-do-not-open',
    category: 'stamps',
    name: 'Stamp: DO NOT OPEN',
    tags: ['stamp', 'do not open', 'warning', 'secret', 'danger', 'lock'],
    svg: `<svg viewBox="0 0 140 65" class="sticker-svg stamp-effect">
      <rect x="6" y="6" width="128" height="53" rx="3" fill="#2A0F1E" stroke="#E63956" stroke-width="2.5" opacity="0.85"/>
      <text x="70" y="32" font-family="'Cinzel', Georgia, serif" font-size="14" font-weight="bold" fill="#FF8BA7" text-anchor="middle" letter-spacing="2">⚠ DO NOT OPEN ⚠</text>
      <text x="70" y="48" font-family="'Courier New', monospace" font-size="9" fill="#E7DDF5" text-anchor="middle" letter-spacing="1">FORBIDDEN EYES ONLY</text>
    </svg>`
  },
  {
    id: 'stamp-fragile-heart',
    category: 'stamps',
    name: 'Stamp: FRAGILE HEART',
    tags: ['stamp', 'fragile heart', 'coquette', 'delicate', 'pink', 'broken'],
    svg: `<svg viewBox="0 0 130 65" class="sticker-svg stamp-effect">
      <rect x="5" y="5" width="120" height="55" rx="8" fill="none" stroke="#E87CA1" stroke-width="2" stroke-dasharray="6, 3" opacity="0.88"/>
      <text x="65" y="32" font-family="'Courier New', monospace" font-size="14" font-weight="bold" fill="#E87CA1" text-anchor="middle" letter-spacing="2">FRAGILE HEART</text>
      <text x="65" y="48" font-family="serif" font-size="12" fill="#E87CA1" text-anchor="middle">❦ HANDLE WITH CARE ❦</text>
    </svg>`
  },
  {
    id: 'stamp-memory-forever',
    category: 'stamps',
    name: 'Stamp: A MEMORY FOREVER',
    tags: ['stamp', 'memory', 'forever', 'vintage', 'postmark', 'circle'],
    svg: `<svg viewBox="0 0 90 90" class="sticker-svg stamp-effect">
      <!-- Circular Postmark Stamp -->
      <circle cx="45" cy="45" r="40" fill="none" stroke="#A993C9" stroke-width="2" stroke-dasharray="70, 2, 40, 2" opacity="0.85"/>
      <circle cx="45" cy="45" r="34" fill="none" stroke="#A993C9" stroke-width="1" opacity="0.7"/>
      <path id="curveStampText" d="M 20 45 A 25 25 0 0 1 70 45" fill="none"/>
      <text font-family="'Cinzel', Georgia, serif" font-size="8" fill="#A993C9" letter-spacing="2" opacity="0.9">
        <textPath href="#curveStampText" startOffset="50%" text-anchor="middle">A MEMORY FOREVER</textPath>
      </text>
      <!-- Center Star / Date Emblem -->
      <text x="45" y="52" font-family="'Courier New', monospace" font-size="11" font-weight="bold" fill="#E7DDF5" text-anchor="middle">✦ NOCTURNE ✦</text>
      <line x1="25" y1="58" x2="65" y2="58" stroke="#A993C9" stroke-width="1"/>
    </svg>`
  },

  // ================= WAX SEALS =================
  {
    id: 'seal-midnight-skull',
    category: 'seals',
    name: 'Midnight Purple Skull Wax Seal',
    tags: ['wax seal', 'seal', 'skull', 'stamp', 'purple', '3D', 'embossed'],
    svg: `<svg viewBox="0 0 100 100" class="sticker-svg wax-seal-glow">
      <defs>
        <radialGradient id="waxPlum" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#7B3EAF"/>
          <stop offset="45%" stop-color="#4C1975"/>
          <stop offset="85%" stop-color="#230838"/>
          <stop offset="100%" stop-color="#12021E"/>
        </radialGradient>
      </defs>
      <!-- Melted Wax Irregular Edge -->
      <path d="M 50 6 C 65 5 78 12 87 22 C 95 32 96 48 92 62 C 88 76 77 90 62 94 C 46 98 32 94 20 86 C 8 78 4 64 6 48 C 8 32 20 18 34 10 C 40 7 45 7 50 6 Z" fill="url(#waxPlum)" filter="drop-shadow(2px 5px 6px rgba(0,0,0,0.7))"/>
      <!-- Inner Rim Stamp Circle -->
      <circle cx="50" cy="50" r="32" fill="#3D1260" stroke="#8E4CC7" stroke-width="1.8"/>
      <!-- Embossed Skull -->
      <g transform="translate(50, 48) scale(1.1)">
        <ellipse cx="0" cy="-3" rx="14" ry="12" fill="#581F87" stroke="#AF72E8" stroke-width="1.5"/>
        <rect x="-8" y="7" width="16" height="8" rx="2" fill="#581F87" stroke="#AF72E8" stroke-width="1.5"/>
        <circle cx="-5" cy="-2" r="3" fill="#1C062E"/>
        <circle cx="5" cy="-2" r="3" fill="#1C062E"/>
        <polygon points="0,3 -2,6 2,6" fill="#1C062E"/>
        <line x1="-4" y1="11" x2="-4" y2="15" stroke="#AF72E8" stroke-width="1.2"/>
        <line x1="0" y1="11" x2="0" y2="15" stroke="#AF72E8" stroke-width="1.2"/>
        <line x1="4" y1="11" x2="4" y2="15" stroke="#AF72E8" stroke-width="1.2"/>
      </g>
    </svg>`
  },
  {
    id: 'seal-blood-rose',
    category: 'seals',
    name: 'Blood Crimson Rose Wax Seal',
    tags: ['wax seal', 'seal', 'rose', 'red', 'crimson', 'blood', 'vintage'],
    svg: `<svg viewBox="0 0 100 100" class="sticker-svg wax-seal-glow">
      <defs>
        <radialGradient id="waxCrimson" cx="38%" cy="36%" r="65%">
          <stop offset="0%" stop-color="#C22744"/>
          <stop offset="50%" stop-color="#801227"/>
          <stop offset="85%" stop-color="#420612"/>
          <stop offset="100%" stop-color="#1A0206"/>
        </radialGradient>
      </defs>
      <!-- Melted Wax Edge -->
      <path d="M 50 8 C 66 6 82 14 90 26 C 98 40 94 58 88 72 C 80 86 64 94 48 94 C 30 94 14 84 8 68 C 2 52 8 34 18 22 C 28 10 38 10 50 8 Z" fill="url(#waxCrimson)" filter="drop-shadow(2px 5px 6px rgba(0,0,0,0.7))"/>
      <circle cx="50" cy="50" r="32" fill="#660C1D" stroke="#E63956" stroke-width="1.8"/>
      <!-- Embossed Rose -->
      <g transform="translate(50, 50)">
        <circle cx="0" cy="0" r="14" fill="#8A142A" stroke="#FF758F" stroke-width="1.5"/>
        <path d="M -7 -4 Q 0 -12 7 -4 Q 10 6 0 8 Q -10 6 -7 -4 Z" fill="#AA1C37"/>
        <circle cx="0" cy="0" r="4" fill="#4A0612"/>
      </g>
    </svg>`
  },
  {
    id: 'seal-silver-moon',
    category: 'seals',
    name: 'Antique Silver Moon Wax Seal',
    tags: ['wax seal', 'seal', 'silver', 'moon', 'metallic', 'lunar'],
    svg: `<svg viewBox="0 0 100 100" class="sticker-svg wax-seal-glow">
      <defs>
        <radialGradient id="waxSilver" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#FFFFFF"/>
          <stop offset="40%" stop-color="#C6BED1"/>
          <stop offset="80%" stop-color="#6F647D"/>
          <stop offset="100%" stop-color="#2D2638"/>
        </radialGradient>
      </defs>
      <path d="M 50 7 C 68 5 84 16 91 30 C 97 45 94 62 85 76 C 75 90 56 95 40 93 C 24 90 10 78 6 62 C 2 45 10 26 24 16 C 34 8 42 9 50 7 Z" fill="url(#waxSilver)" filter="drop-shadow(2px 5px 6px rgba(0,0,0,0.7))"/>
      <circle cx="50" cy="50" r="31" fill="#584E66" stroke="#E7DDF5" stroke-width="1.5"/>
      <!-- Embossed Moon & Stars -->
      <path d="M 58 30 C 44 32 36 44 40 58 C 45 66 54 70 62 66 C 48 64 45 48 54 36 C 56 33 57 31 58 30 Z" fill="#D5CADF" stroke="#FFFFFF" stroke-width="1.2"/>
      <polygon points="36,36 37.5,39.5 41,39.5 38,41.5 39.5,45 36,43 32.5,45 34,41.5 31,39.5 34.5,39.5" fill="#FFFFFF"/>
    </svg>`
  }
,

  // ================= EXTRA KUROMI & GOTHIC STICKERS =================
  {
    id: 'kuromi-potion-witch',
    category: 'kuromi',
    name: 'Kuromi Potion Brewer',
    tags: ['kuromi', 'potion', 'witch', 'magic', 'cauldron', 'purple'],
    svg: `<svg viewBox="0 0 100 100" class="sticker-svg">
      <ellipse cx="50" cy="56" rx="27" ry="23" fill="#FAF7FC" stroke="#21112F" stroke-width="2"/>
      <path d="M 20 45 C 5 25 10 5 25 12 C 30 18 35 30 40 40 C 45 32 55 32 60 40 C 65 30 70 18 75 12 C 90 5 95 25 80 45 Z" fill="#181322" stroke="#542A80" stroke-width="2"/>
      <circle cx="25" cy="12" r="5" fill="#E861A3"/>
      <circle cx="75" cy="12" r="5" fill="#E861A3"/>
      <ellipse cx="50" cy="30" rx="8" ry="6" fill="#E861A3"/>
      <circle cx="47" cy="29" r="1.5" fill="#181322"/>
      <circle cx="53" cy="29" r="1.5" fill="#181322"/>
      <path d="M 33 55 Q 40 49 43 57" fill="none" stroke="#21112F" stroke-width="3" stroke-linecap="round"/>
      <ellipse cx="61" cy="55" rx="4.5" ry="6.5" fill="#21112F"/>
      <circle cx="63" cy="53" r="1.8" fill="#FFFFFF"/>
      <ellipse cx="35" cy="63" rx="4" ry="2" fill="#FFA5C8"/>
      <ellipse cx="65" cy="63" rx="4" ry="2" fill="#FFA5C8"/>
      <!-- Glowing Cauldron & Bubbles -->
      <path d="M 32 75 C 32 90 68 90 68 75 Z" fill="#1C102C" stroke="#A993C9" stroke-width="2"/>
      <ellipse cx="50" cy="74" rx="18" ry="4" fill="#9B4BDE"/>
      <circle cx="44" cy="68" r="3" fill="#E7DDF5" opacity="0.9"/>
      <circle cx="56" cy="67" r="2.5" fill="#FFA5C8" opacity="0.8"/>
      <circle cx="50" cy="64" r="1.8" fill="#E7DDF5" opacity="0.9"/>
    </svg>`
  },
  {
    id: 'kuromi-sleepy-bat',
    category: 'kuromi',
    name: 'Kuromi Cozy Bat Blanket',
    tags: ['kuromi', 'sleepy', 'cozy', 'night', 'bat', 'cute'],
    svg: `<svg viewBox="0 0 100 100" class="sticker-svg">
      <path d="M 22 45 C 8 26 12 8 26 14 C 32 20 36 32 40 40 C 46 32 54 32 60 40 C 64 32 68 20 74 14 C 88 8 92 26 78 45 Z" fill="#150E1F" stroke="#7A39B0" stroke-width="2"/>
      <circle cx="26" cy="14" r="4.5" fill="#E861A3"/>
      <circle cx="74" cy="14" r="4.5" fill="#E861A3"/>
      <ellipse cx="50" cy="54" rx="26" ry="20" fill="#FAF7FC"/>
      <path d="M 34 54 Q 40 60 46 54" fill="none" stroke="#21112F" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M 54 54 Q 60 60 66 54" fill="none" stroke="#21112F" stroke-width="2.5" stroke-linecap="round"/>
      <ellipse cx="36" cy="60" rx="3.5" ry="2" fill="#FFA5C8"/>
      <ellipse cx="64" cy="60" rx="3.5" ry="2" fill="#FFA5C8"/>
      <!-- Soft Bat Wings Blanket -->
      <path d="M 20 68 C 25 58 45 62 50 68 C 55 62 75 58 80 68 C 85 86 15 86 20 68 Z" fill="#3D1D54" stroke="#A993C9" stroke-width="1.8"/>
      <polygon points="50,68 47,75 53,75" fill="#E861A3"/>
      <text x="76" y="35" fill="#E861A3" font-family="serif" font-size="12" font-weight="bold">z</text>
      <text x="84" y="24" fill="#A993C9" font-family="serif" font-size="9">z</text>
    </svg>`
  },

  // ================= WASHI TAPES (PURPLE & BLACK PALETTES) =================
  {
    id: 'washi-purple-stars',
    category: 'washi',
    name: 'Washi Tape: Midnight Lavender Stars',
    tags: ['washi', 'tape', 'purple', 'lavender', 'stars', 'scrapbook'],
    svg: `<svg viewBox="0 0 160 36" class="sticker-svg washi-tape-svg">
      <defs>
        <linearGradient id="washiPurpGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#3A1759" stop-opacity="0.88"/>
          <stop offset="50%" stop-color="#582487" stop-opacity="0.88"/>
          <stop offset="100%" stop-color="#3A1759" stop-opacity="0.88"/>
        </linearGradient>
      </defs>
      <!-- Torn tape edges left & right -->
      <path d="M 6 2 L 154 2 L 157 8 L 153 14 L 158 20 L 153 26 L 157 32 L 6 32 L 3 26 L 7 20 L 2 14 L 6 8 Z" fill="url(#washiPurpGrad)" stroke="#A993C9" stroke-width="1"/>
      <!-- Stars pattern -->
      <polygon points="20,17 22,12 24,17 29,17 25,20 27,24 22,21 17,24 19,20 15,17" fill="#E7DDF5" opacity="0.9"/>
      <polygon points="50,17 52,12 54,17 59,17 55,20 57,24 52,21 47,24 49,20 45,17" fill="#E7DDF5" opacity="0.9"/>
      <polygon points="80,17 82,12 84,17 89,17 85,20 87,24 82,21 77,24 79,20 75,17" fill="#E7DDF5" opacity="0.9"/>
      <polygon points="110,17 112,12 114,17 119,17 115,20 117,24 112,21 107,24 109,20 105,17" fill="#E7DDF5" opacity="0.9"/>
      <polygon points="140,17 142,12 144,17 149,17 145,20 147,24 142,21 137,24 139,20 135,17" fill="#E7DDF5" opacity="0.9"/>
    </svg>`
  },
  {
    id: 'washi-black-lace',
    category: 'washi',
    name: 'Washi Tape: Obsidian Gothic Lace',
    tags: ['washi', 'tape', 'black', 'obsidian', 'lace', 'gothic'],
    svg: `<svg viewBox="0 0 160 36" class="sticker-svg washi-tape-svg">
      <path d="M 5 2 L 155 2 L 158 9 L 154 16 L 157 23 L 154 30 L 158 34 L 5 34 L 2 28 L 6 21 L 2 14 L 6 7 Z" fill="#0E0A14" fill-opacity="0.92" stroke="#684A85" stroke-width="1.2"/>
      <!-- Delicate scalloped lace arches -->
      <path d="M 10 18 Q 20 8 30 18 Q 40 8 50 18 Q 60 8 70 18 Q 80 8 90 18 Q 100 8 110 18 Q 120 8 130 18 Q 140 8 150 18" fill="none" stroke="#A993C9" stroke-width="1.5"/>
      <circle cx="20" cy="18" r="2" fill="#E7DDF5"/>
      <circle cx="40" cy="18" r="2" fill="#E7DDF5"/>
      <circle cx="60" cy="18" r="2" fill="#E7DDF5"/>
      <circle cx="80" cy="18" r="2" fill="#E7DDF5"/>
      <circle cx="100" cy="18" r="2" fill="#E7DDF5"/>
      <circle cx="120" cy="18" r="2" fill="#E7DDF5"/>
      <circle cx="140" cy="18" r="2" fill="#E7DDF5"/>
    </svg>`
  },
  {
    id: 'washi-plum-roses',
    category: 'washi',
    name: 'Washi Tape: Dark Plum Rosebuds',
    tags: ['washi', 'tape', 'plum', 'rose', 'floral', 'dark'],
    svg: `<svg viewBox="0 0 160 36" class="sticker-svg washi-tape-svg">
      <path d="M 5 2 L 155 2 L 158 10 L 153 18 L 157 26 L 154 34 L 5 34 L 2 26 L 6 18 L 2 10 Z" fill="#240E2D" fill-opacity="0.88" stroke="#873BBF" stroke-width="1"/>
      <!-- Tiny Rose Motifs -->
      <g transform="translate(25, 18)">
        <circle cx="0" cy="0" r="7" fill="#6B1D4D" stroke="#E87CA1" stroke-width="1"/>
        <circle cx="0" cy="0" r="3" fill="#A8286A"/>
        <path d="M -9 3 Q -5 9 0 6" stroke="#486B56" stroke-width="1.2" fill="none"/>
      </g>
      <g transform="translate(65, 18)">
        <circle cx="0" cy="0" r="7" fill="#6B1D4D" stroke="#E87CA1" stroke-width="1"/>
        <circle cx="0" cy="0" r="3" fill="#A8286A"/>
        <path d="M -9 3 Q -5 9 0 6" stroke="#486B56" stroke-width="1.2" fill="none"/>
      </g>
      <g transform="translate(105, 18)">
        <circle cx="0" cy="0" r="7" fill="#6B1D4D" stroke="#E87CA1" stroke-width="1"/>
        <circle cx="0" cy="0" r="3" fill="#A8286A"/>
        <path d="M -9 3 Q -5 9 0 6" stroke="#486B56" stroke-width="1.2" fill="none"/>
      </g>
      <g transform="translate(145, 18)">
        <circle cx="0" cy="0" r="7" fill="#6B1D4D" stroke="#E87CA1" stroke-width="1"/>
        <circle cx="0" cy="0" r="3" fill="#A8286A"/>
      </g>
    </svg>`
  },
  {
    id: 'washi-neon-purple-grid',
    category: 'washi',
    name: 'Washi Tape: Neon Noir Cyber Grid',
    tags: ['washi', 'tape', 'neon', 'purple', 'black', 'grid'],
    svg: `<svg viewBox="0 0 160 36" class="sticker-svg washi-tape-svg">
      <path d="M 4 2 L 156 2 L 158 9 L 153 18 L 157 27 L 154 34 L 4 34 L 2 26 L 6 18 L 2 9 Z" fill="#040208" stroke="#8B00FF" stroke-width="1.5"/>
      <line x1="10" y1="10" x2="150" y2="10" stroke="#8B00FF" stroke-width="1" opacity="0.7"/>
      <line x1="10" y1="18" x2="150" y2="18" stroke="#CC44FF" stroke-width="1.2" opacity="0.9"/>
      <line x1="10" y1="26" x2="150" y2="26" stroke="#8B00FF" stroke-width="1" opacity="0.7"/>
      <!-- Vertical Grid Lines -->
      <line x1="20" y1="2" x2="20" y2="34" stroke="#8B00FF" stroke-width="0.8" opacity="0.6"/>
      <line x1="40" y1="2" x2="40" y2="34" stroke="#8B00FF" stroke-width="0.8" opacity="0.6"/>
      <line x1="60" y1="2" x2="60" y2="34" stroke="#8B00FF" stroke-width="0.8" opacity="0.6"/>
      <line x1="80" y1="2" x2="80" y2="34" stroke="#8B00FF" stroke-width="0.8" opacity="0.6"/>
      <line x1="100" y1="2" x2="100" y2="34" stroke="#8B00FF" stroke-width="0.8" opacity="0.6"/>
      <line x1="120" y1="2" x2="120" y2="34" stroke="#8B00FF" stroke-width="0.8" opacity="0.6"/>
      <line x1="140" y1="2" x2="140" y2="34" stroke="#8B00FF" stroke-width="0.8" opacity="0.6"/>
    </svg>`
  },

  // ================= COOL GOTHIC ENVELOPES =================
  {
    id: 'envelope-purple-velvet',
    category: 'envelopes',
    name: 'Royal Purple Velvet Envelope',
    tags: ['envelope', 'letter', 'purple', 'velvet', 'gold', 'secret'],
    svg: `<svg viewBox="0 0 110 85" class="sticker-svg">
      <rect x="5" y="10" width="100" height="65" rx="5" fill="#241238" stroke="#8E4CC7" stroke-width="2"/>
      <!-- Inner Envelope Shadow & Lining -->
      <polygon points="5,10 55,50 105,10" fill="#3D1D59"/>
      <!-- Side Flaps -->
      <polygon points="5,10 5,75 42,42" fill="#1B0C2B" opacity="0.7"/>
      <polygon points="105,10 105,75 68,42" fill="#1B0C2B" opacity="0.7"/>
      <!-- Bottom Flap -->
      <polygon points="5,75 105,75 55,38" fill="#2D1544" stroke="#8E4CC7" stroke-width="1.2"/>
      <!-- Royal Gold Wax Seal Clasp -->
      <circle cx="55" cy="40" r="10" fill="#D1A728" stroke="#FFDF78" stroke-width="1.5" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.7))"/>
      <circle cx="55" cy="40" r="7" fill="#8C6B10"/>
      <polygon points="55,35 52,43 58,43" fill="#FFDF78"/>
    </svg>`
  },
  {
    id: 'envelope-black-gold',
    category: 'envelopes',
    name: 'Obsidian & Gold Filigree Envelope',
    tags: ['envelope', 'black', 'gold', 'filigree', 'gothic', 'wax seal'],
    svg: `<svg viewBox="0 0 110 85" class="sticker-svg">
      <rect x="5" y="10" width="100" height="65" rx="4" fill="#0C0A10" stroke="#D1A728" stroke-width="1.8"/>
      <!-- Gold Corner Accents -->
      <polygon points="5,10 20,10 5,25" fill="#D1A728"/>
      <polygon points="105,10 90,10 105,25" fill="#D1A728"/>
      <polygon points="5,75 20,75 5,60" fill="#D1A728"/>
      <polygon points="105,75 90,75 105,60" fill="#D1A728"/>
      <!-- Flap Lines -->
      <polygon points="5,75 105,75 55,42" fill="#14101A" stroke="#483B25" stroke-width="1"/>
      <polygon points="5,10 105,10 55,48" fill="#1B1522" stroke="#D1A728" stroke-width="1.2"/>
      <!-- Crimson Ruby Seal -->
      <circle cx="55" cy="48" r="9" fill="#991B2E" stroke="#E63956" stroke-width="1.5" filter="drop-shadow(0 3px 5px rgba(0,0,0,0.8))"/>
      <circle cx="55" cy="48" r="4" fill="#5E0D1B"/>
    </svg>`
  },
  {
    id: 'envelope-love-letter',
    category: 'envelopes',
    name: 'Sacred Unsent Love Letter',
    tags: ['envelope', 'love letter', 'heart', 'vintage', 'parchment', 'pink'],
    svg: `<svg viewBox="0 0 110 85" class="sticker-svg">
      <rect x="5" y="15" width="100" height="60" rx="3" fill="#2E1C24" stroke="#E87CA1" stroke-width="1.8"/>
      <!-- Letter paper peeking out from top -->
      <rect x="15" y="5" width="80" height="40" rx="2" fill="#F4E9DB" stroke="#8C7A65" stroke-width="1"/>
      <line x1="22" y1="12" x2="65" y2="12" stroke="#7A6855" stroke-width="1"/>
      <line x1="22" y1="18" x2="75" y2="18" stroke="#7A6855" stroke-width="1"/>
      <line x1="22" y1="24" x2="50" y2="24" stroke="#7A6855" stroke-width="1"/>
      <!-- Envelope Lower Body and Heart Seal -->
      <polygon points="5,75 105,75 55,38" fill="#3D202D" stroke="#E87CA1" stroke-width="1.2"/>
      <path d="M 55 46 C 50 38 42 42 45 48 C 48 54 55 60 55 60 C 55 60 62 54 65 48 C 68 42 60 38 55 46 Z" fill="#E861A3" stroke="#21112F" stroke-width="1.5" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.7))"/>
    </svg>`
  },

  // ================= MORE COLORED WAX SEALS =================
  {
    id: 'seal-gold-crown',
    category: 'seals',
    name: 'Imperial Gold Royal Crown Seal',
    tags: ['wax seal', 'gold', 'crown', 'imperial', 'royal'],
    svg: `<svg viewBox="0 0 100 100" class="sticker-svg wax-seal-glow">
      <defs>
        <radialGradient id="waxGold" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#FFF2A3"/>
          <stop offset="35%" stop-color="#E5B824"/>
          <stop offset="75%" stop-color="#8C6809"/>
          <stop offset="100%" stop-color="#423002"/>
        </radialGradient>
      </defs>
      <path d="M 50 7 C 68 5 83 15 90 28 C 96 44 93 61 86 75 C 75 90 57 95 42 93 C 25 91 11 79 7 64 C 2 46 9 27 23 17 C 33 9 42 9 50 7 Z" fill="url(#waxGold)" filter="drop-shadow(2px 5px 6px rgba(0,0,0,0.7))"/>
      <circle cx="50" cy="50" r="32" fill="#7A5A05" stroke="#FFEAA0" stroke-width="1.8"/>
      <!-- Embossed Crown -->
      <polygon points="34,60 66,60 64,42 57,48 50,38 43,48 36,42" fill="#FFE885" stroke="#4A3602" stroke-width="1.2"/>
      <circle cx="50" cy="36" r="2" fill="#FFF"/>
      <circle cx="36" cy="40" r="1.5" fill="#FFF"/>
      <circle cx="64" cy="40" r="1.5" fill="#FFF"/>
    </svg>`
  },
  {
    id: 'seal-emerald-serpent',
    category: 'seals',
    name: 'Emerald Snake Ouroboros Seal',
    tags: ['wax seal', 'emerald', 'green', 'snake', 'serpent', 'magic'],
    svg: `<svg viewBox="0 0 100 100" class="sticker-svg wax-seal-glow">
      <defs>
        <radialGradient id="waxEmerald" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#4EFA98"/>
          <stop offset="35%" stop-color="#149454"/>
          <stop offset="75%" stop-color="#074726"/>
          <stop offset="100%" stop-color="#021C0E"/>
        </radialGradient>
      </defs>
      <path d="M 50 8 C 66 6 82 14 91 27 C 98 42 94 60 87 74 C 77 88 59 94 44 93 C 27 91 13 81 8 66 C 3 48 9 29 23 18 C 33 10 42 10 50 8 Z" fill="url(#waxEmerald)" filter="drop-shadow(2px 5px 6px rgba(0,0,0,0.7))"/>
      <circle cx="50" cy="50" r="32" fill="#0A522C" stroke="#75FFAF" stroke-width="1.8"/>
      <!-- Coiled Serpent S-Shape -->
      <path d="M 58 35 C 50 30 40 38 48 46 C 56 52 46 65 38 58" fill="none" stroke="#A6FFC8" stroke-width="4.5" stroke-linecap="round"/>
      <circle cx="59" cy="35" r="2" fill="#FFF"/>
    </svg>`
  },
  {
    id: 'seal-black-obsidian',
    category: 'seals',
    name: 'Pure Obsidian Velvet Wax Seal',
    tags: ['wax seal', 'black', 'obsidian', 'dark', 'coffin'],
    svg: `<svg viewBox="0 0 100 100" class="sticker-svg wax-seal-glow">
      <defs>
        <radialGradient id="waxObsidian" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#3A3442"/>
          <stop offset="45%" stop-color="#18151D"/>
          <stop offset="85%" stop-color="#08070A"/>
          <stop offset="100%" stop-color="#000000"/>
        </radialGradient>
      </defs>
      <path d="M 50 7 C 67 6 83 15 90 29 C 97 44 94 62 86 76 C 76 90 58 95 43 93 C 26 91 12 80 7 64 C 2 47 9 27 23 17 C 33 9 42 9 50 7 Z" fill="url(#waxObsidian)" filter="drop-shadow(2px 5px 6px rgba(0,0,0,0.85))"/>
      <circle cx="50" cy="50" r="32" fill="#120F16" stroke="#8E7CA6" stroke-width="1.5"/>
      <!-- Embossed Gothic Cross -->
      <path d="M 47 32 H 53 V 44 H 63 V 50 H 53 V 68 H 47 V 50 H 37 V 44 H 47 Z" fill="#D5CCE0" stroke="#FFFFFF" stroke-width="1"/>
    </svg>`
  },
  {
    id: 'seal-dusty-lavender',
    category: 'seals',
    name: 'Dusty Lavender Moth Wax Seal',
    tags: ['wax seal', 'lavender', 'moth', 'purple', 'delicate'],
    svg: `<svg viewBox="0 0 100 100" class="sticker-svg wax-seal-glow">
      <defs>
        <radialGradient id="waxLav" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#FFFFFF"/>
          <stop offset="35%" stop-color="#C2B0DF"/>
          <stop offset="75%" stop-color="#735B96"/>
          <stop offset="100%" stop-color="#34224D"/>
        </radialGradient>
      </defs>
      <path d="M 50 8 C 66 6 82 15 90 28 C 96 43 93 61 86 75 C 75 89 57 94 42 93 C 25 91 11 80 7 64 C 2 47 9 28 23 18 C 33 10 42 10 50 8 Z" fill="url(#waxLav)" filter="drop-shadow(2px 5px 6px rgba(0,0,0,0.7))"/>
      <circle cx="50" cy="50" r="32" fill="#584177" stroke="#FAF6FF" stroke-width="1.8"/>
      <!-- Embossed Butterfly / Moth -->
      <path d="M 50 48 C 42 38 32 36 34 46 C 36 56 46 54 50 50 Z" fill="#EBDDFB"/>
      <path d="M 50 48 C 58 38 68 36 66 46 C 64 56 54 54 50 50 Z" fill="#EBDDFB"/>
      <ellipse cx="50" cy="50" rx="2" ry="7" fill="#FAF6FF"/>
    </svg>`
  },

  // ================= AESTHETIC GOTHIC CHARMS =================
  {
    id: 'charm-crystal-dagger',
    category: 'charms',
    name: 'Amethyst & Silver Ritual Dagger',
    tags: ['dagger', 'sword', 'amethyst', 'crystal', 'silver', 'witchy'],
    svg: `<svg viewBox="0 0 100 100" class="sticker-svg">
      <!-- Blade with shine -->
      <polygon points="50,10 44,52 56,52" fill="#E7DDF5" stroke="#7A6890" stroke-width="1.5"/>
      <line x1="50" y1="12" x2="50" y2="50" stroke="#FFF" stroke-width="1"/>
      <!-- Crossguard with purple gems -->
      <rect x="32" y="52" width="36" height="5" rx="2" fill="#2E1742" stroke="#A993C9" stroke-width="1.2"/>
      <circle cx="50" cy="54.5" r="2.5" fill="#E861A3"/>
      <!-- Hilt / Handle -->
      <rect x="47" y="57" width="6" height="18" fill="#1C1026" stroke="#A993C9" stroke-width="1"/>
      <line x1="47" y1="62" x2="53" y2="62" stroke="#D1A728" stroke-width="1"/>
      <line x1="47" y1="67" x2="53" y2="67" stroke="#D1A728" stroke-width="1"/>
      <!-- Pommel (Amethyst Gem) -->
      <polygon points="50,77 45,84 55,84" fill="#9B4BDE" stroke="#E7DDF5" stroke-width="1"/>
    </svg>`
  },
  {
    id: 'charm-spider-web-dew',
    category: 'charms',
    name: 'Dewy Obsidian Spiderweb',
    tags: ['spider', 'web', 'gothic', 'dew', 'silver', 'creepy cute'],
    svg: `<svg viewBox="0 0 100 100" class="sticker-svg">
      <!-- Radial Spokes -->
      <line x1="10" y1="10" x2="90" y2="90" stroke="#A993C9" stroke-width="1.2" opacity="0.8"/>
      <line x1="90" y1="10" x2="10" y2="90" stroke="#A993C9" stroke-width="1.2" opacity="0.8"/>
      <line x1="50" y1="5" x2="50" y2="95" stroke="#A993C9" stroke-width="1.2" opacity="0.8"/>
      <line x1="5" y1="50" x2="95" y2="50" stroke="#A993C9" stroke-width="1.2" opacity="0.8"/>
      <!-- Concentric Web Rings -->
      <circle cx="50" cy="50" r="14" fill="none" stroke="#D0C4DE" stroke-width="1" opacity="0.75"/>
      <circle cx="50" cy="50" r="26" fill="none" stroke="#D0C4DE" stroke-width="1" opacity="0.75"/>
      <circle cx="50" cy="50" r="38" fill="none" stroke="#D0C4DE" stroke-width="1" opacity="0.6"/>
      <!-- Dewdrops -->
      <circle cx="50" cy="24" r="2" fill="#FFF"/>
      <circle cx="68" cy="32" r="1.8" fill="#FFF"/>
      <circle cx="76" cy="50" r="2.2" fill="#FFF"/>
      <circle cx="32" cy="68" r="1.8" fill="#FFF"/>
      <!-- Tiny Purple Spider -->
      <circle cx="50" cy="50" r="3.5" fill="#542A80"/>
      <circle cx="50" cy="46" r="2" fill="#E861A3"/>
    </svg>`
  }

,
  {
    id: "png-sanrio-sticker_01_my_melody",
    category: "kuromi",
    name: "Kuromi & Friends: 01 My Melody",
    tags: ["kuromi", "sanrio", "gothic", "kawaii", "my melody"],
    img: "assets/stickers/sanrio/sticker_01_my_melody.png",
    svg: `<img src="assets/stickers/sanrio/sticker_01_my_melody.png" class="sticker-img-asset" alt="Kuromi & Friends: 01 My Melody" draggable="false" />`
  },
  {
    id: "png-sanrio-sticker_02_my_melody",
    category: "kuromi",
    name: "Kuromi & Friends: 02 My Melody",
    tags: ["kuromi", "sanrio", "gothic", "kawaii", "my melody"],
    img: "assets/stickers/sanrio/sticker_02_my_melody.png",
    svg: `<img src="assets/stickers/sanrio/sticker_02_my_melody.png" class="sticker-img-asset" alt="Kuromi & Friends: 02 My Melody" draggable="false" />`
  },
  {
    id: "png-sanrio-sticker_03_my_melody",
    category: "kuromi",
    name: "Kuromi & Friends: 03 My Melody",
    tags: ["kuromi", "sanrio", "gothic", "kawaii", "my melody"],
    img: "assets/stickers/sanrio/sticker_03_my_melody.png",
    svg: `<img src="assets/stickers/sanrio/sticker_03_my_melody.png" class="sticker-img-asset" alt="Kuromi & Friends: 03 My Melody" draggable="false" />`
  },
  {
    id: "png-sanrio-sticker_04_kuromi",
    category: "kuromi",
    name: "Kuromi & Friends: 04 Kuromi",
    tags: ["kuromi", "sanrio", "gothic", "kawaii"],
    img: "assets/stickers/sanrio/sticker_04_kuromi.png",
    svg: `<img src="assets/stickers/sanrio/sticker_04_kuromi.png" class="sticker-img-asset" alt="Kuromi & Friends: 04 Kuromi" draggable="false" />`
  },
  {
    id: "png-sanrio-sticker_05_kuromi",
    category: "kuromi",
    name: "Kuromi & Friends: 05 Kuromi",
    tags: ["kuromi", "sanrio", "gothic", "kawaii"],
    img: "assets/stickers/sanrio/sticker_05_kuromi.png",
    svg: `<img src="assets/stickers/sanrio/sticker_05_kuromi.png" class="sticker-img-asset" alt="Kuromi & Friends: 05 Kuromi" draggable="false" />`
  },
  {
    id: "png-sanrio-sticker_06_kuromi",
    category: "kuromi",
    name: "Kuromi & Friends: 06 Kuromi",
    tags: ["kuromi", "sanrio", "gothic", "kawaii"],
    img: "assets/stickers/sanrio/sticker_06_kuromi.png",
    svg: `<img src="assets/stickers/sanrio/sticker_06_kuromi.png" class="sticker-img-asset" alt="Kuromi & Friends: 06 Kuromi" draggable="false" />`
  },
  {
    id: "png-sanrio-sticker_07_badtz_maru",
    category: "kuromi",
    name: "Kuromi & Friends: 07 Badtz Maru",
    tags: ["kuromi", "sanrio", "gothic", "kawaii", "badtz maru"],
    img: "assets/stickers/sanrio/sticker_07_badtz_maru.png",
    svg: `<img src="assets/stickers/sanrio/sticker_07_badtz_maru.png" class="sticker-img-asset" alt="Kuromi & Friends: 07 Badtz Maru" draggable="false" />`
  },
  {
    id: "png-sanrio-sticker_08_badtz_maru",
    category: "kuromi",
    name: "Kuromi & Friends: 08 Badtz Maru",
    tags: ["kuromi", "sanrio", "gothic", "kawaii", "badtz maru"],
    img: "assets/stickers/sanrio/sticker_08_badtz_maru.png",
    svg: `<img src="assets/stickers/sanrio/sticker_08_badtz_maru.png" class="sticker-img-asset" alt="Kuromi & Friends: 08 Badtz Maru" draggable="false" />`
  },
  {
    id: "png-sanrio-sticker_09_badtz_maru",
    category: "kuromi",
    name: "Kuromi & Friends: 09 Badtz Maru",
    tags: ["kuromi", "sanrio", "gothic", "kawaii", "badtz maru"],
    img: "assets/stickers/sanrio/sticker_09_badtz_maru.png",
    svg: `<img src="assets/stickers/sanrio/sticker_09_badtz_maru.png" class="sticker-img-asset" alt="Kuromi & Friends: 09 Badtz Maru" draggable="false" />`
  },
  {
    id: "png-sanrio-sticker_10_my_melody",
    category: "kuromi",
    name: "Kuromi & Friends: 10 My Melody",
    tags: ["kuromi", "sanrio", "gothic", "kawaii", "my melody"],
    img: "assets/stickers/sanrio/sticker_10_my_melody.png",
    svg: `<img src="assets/stickers/sanrio/sticker_10_my_melody.png" class="sticker-img-asset" alt="Kuromi & Friends: 10 My Melody" draggable="false" />`
  },
  {
    id: "png-sanrio-sticker_11_my_melody",
    category: "kuromi",
    name: "Kuromi & Friends: 11 My Melody",
    tags: ["kuromi", "sanrio", "gothic", "kawaii", "my melody"],
    img: "assets/stickers/sanrio/sticker_11_my_melody.png",
    svg: `<img src="assets/stickers/sanrio/sticker_11_my_melody.png" class="sticker-img-asset" alt="Kuromi & Friends: 11 My Melody" draggable="false" />`
  },
  {
    id: "png-sanrio-sticker_12_my_melody",
    category: "kuromi",
    name: "Kuromi & Friends: 12 My Melody",
    tags: ["kuromi", "sanrio", "gothic", "kawaii", "my melody"],
    img: "assets/stickers/sanrio/sticker_12_my_melody.png",
    svg: `<img src="assets/stickers/sanrio/sticker_12_my_melody.png" class="sticker-img-asset" alt="Kuromi & Friends: 12 My Melody" draggable="false" />`
  },
  {
    id: "png-sanrio-sticker_13_kuromi",
    category: "kuromi",
    name: "Kuromi & Friends: 13 Kuromi",
    tags: ["kuromi", "sanrio", "gothic", "kawaii"],
    img: "assets/stickers/sanrio/sticker_13_kuromi.png",
    svg: `<img src="assets/stickers/sanrio/sticker_13_kuromi.png" class="sticker-img-asset" alt="Kuromi & Friends: 13 Kuromi" draggable="false" />`
  },
  {
    id: "png-sanrio-sticker_14_kuromi",
    category: "kuromi",
    name: "Kuromi & Friends: 14 Kuromi",
    tags: ["kuromi", "sanrio", "gothic", "kawaii"],
    img: "assets/stickers/sanrio/sticker_14_kuromi.png",
    svg: `<img src="assets/stickers/sanrio/sticker_14_kuromi.png" class="sticker-img-asset" alt="Kuromi & Friends: 14 Kuromi" draggable="false" />`
  },
  {
    id: "png-sanrio-sticker_15_kuromi",
    category: "kuromi",
    name: "Kuromi & Friends: 15 Kuromi",
    tags: ["kuromi", "sanrio", "gothic", "kawaii"],
    img: "assets/stickers/sanrio/sticker_15_kuromi.png",
    svg: `<img src="assets/stickers/sanrio/sticker_15_kuromi.png" class="sticker-img-asset" alt="Kuromi & Friends: 15 Kuromi" draggable="false" />`
  },
  {
    id: "png-sanrio-sticker_16_badtz_maru",
    category: "kuromi",
    name: "Kuromi & Friends: 16 Badtz Maru",
    tags: ["kuromi", "sanrio", "gothic", "kawaii", "badtz maru"],
    img: "assets/stickers/sanrio/sticker_16_badtz_maru.png",
    svg: `<img src="assets/stickers/sanrio/sticker_16_badtz_maru.png" class="sticker-img-asset" alt="Kuromi & Friends: 16 Badtz Maru" draggable="false" />`
  },
  {
    id: "png-sanrio-sticker_17_badtz_maru",
    category: "kuromi",
    name: "Kuromi & Friends: 17 Badtz Maru",
    tags: ["kuromi", "sanrio", "gothic", "kawaii", "badtz maru"],
    img: "assets/stickers/sanrio/sticker_17_badtz_maru.png",
    svg: `<img src="assets/stickers/sanrio/sticker_17_badtz_maru.png" class="sticker-img-asset" alt="Kuromi & Friends: 17 Badtz Maru" draggable="false" />`
  },
  {
    id: "png-sanrio-sticker_18_badtz_maru",
    category: "kuromi",
    name: "Kuromi & Friends: 18 Badtz Maru",
    tags: ["kuromi", "sanrio", "gothic", "kawaii", "badtz maru"],
    img: "assets/stickers/sanrio/sticker_18_badtz_maru.png",
    svg: `<img src="assets/stickers/sanrio/sticker_18_badtz_maru.png" class="sticker-img-asset" alt="Kuromi & Friends: 18 Badtz Maru" draggable="false" />`
  },
  {
    id: "png-sanrio-sticker_19_my_melody",
    category: "kuromi",
    name: "Kuromi & Friends: 19 My Melody",
    tags: ["kuromi", "sanrio", "gothic", "kawaii", "my melody"],
    img: "assets/stickers/sanrio/sticker_19_my_melody.png",
    svg: `<img src="assets/stickers/sanrio/sticker_19_my_melody.png" class="sticker-img-asset" alt="Kuromi & Friends: 19 My Melody" draggable="false" />`
  },
  {
    id: "png-sanrio-sticker_20_my_melody",
    category: "kuromi",
    name: "Kuromi & Friends: 20 My Melody",
    tags: ["kuromi", "sanrio", "gothic", "kawaii", "my melody"],
    img: "assets/stickers/sanrio/sticker_20_my_melody.png",
    svg: `<img src="assets/stickers/sanrio/sticker_20_my_melody.png" class="sticker-img-asset" alt="Kuromi & Friends: 20 My Melody" draggable="false" />`
  },
  {
    id: "png-sanrio-sticker_21_kuromi",
    category: "kuromi",
    name: "Kuromi & Friends: 21 Kuromi",
    tags: ["kuromi", "sanrio", "gothic", "kawaii"],
    img: "assets/stickers/sanrio/sticker_21_kuromi.png",
    svg: `<img src="assets/stickers/sanrio/sticker_21_kuromi.png" class="sticker-img-asset" alt="Kuromi & Friends: 21 Kuromi" draggable="false" />`
  },
  {
    id: "png-sanrio-sticker_22_kuromi",
    category: "kuromi",
    name: "Kuromi & Friends: 22 Kuromi",
    tags: ["kuromi", "sanrio", "gothic", "kawaii"],
    img: "assets/stickers/sanrio/sticker_22_kuromi.png",
    svg: `<img src="assets/stickers/sanrio/sticker_22_kuromi.png" class="sticker-img-asset" alt="Kuromi & Friends: 22 Kuromi" draggable="false" />`
  },
  {
    id: "png-sanrio-sticker_23_kuromi",
    category: "kuromi",
    name: "Kuromi & Friends: 23 Kuromi",
    tags: ["kuromi", "sanrio", "gothic", "kawaii"],
    img: "assets/stickers/sanrio/sticker_23_kuromi.png",
    svg: `<img src="assets/stickers/sanrio/sticker_23_kuromi.png" class="sticker-img-asset" alt="Kuromi & Friends: 23 Kuromi" draggable="false" />`
  },
  {
    id: "png-sanrio-sticker_24_badtz_maru",
    category: "kuromi",
    name: "Kuromi & Friends: 24 Badtz Maru",
    tags: ["kuromi", "sanrio", "gothic", "kawaii", "badtz maru"],
    img: "assets/stickers/sanrio/sticker_24_badtz_maru.png",
    svg: `<img src="assets/stickers/sanrio/sticker_24_badtz_maru.png" class="sticker-img-asset" alt="Kuromi & Friends: 24 Badtz Maru" draggable="false" />`
  },
  {
    id: "png-sanrio-sticker_25_badtz_maru",
    category: "kuromi",
    name: "Kuromi & Friends: 25 Badtz Maru",
    tags: ["kuromi", "sanrio", "gothic", "kawaii", "badtz maru"],
    img: "assets/stickers/sanrio/sticker_25_badtz_maru.png",
    svg: `<img src="assets/stickers/sanrio/sticker_25_badtz_maru.png" class="sticker-img-asset" alt="Kuromi & Friends: 25 Badtz Maru" draggable="false" />`
  },
  {
    id: "png-sanrio-sticker_26_badtz_maru",
    category: "kuromi",
    name: "Kuromi & Friends: 26 Badtz Maru",
    tags: ["kuromi", "sanrio", "gothic", "kawaii", "badtz maru"],
    img: "assets/stickers/sanrio/sticker_26_badtz_maru.png",
    svg: `<img src="assets/stickers/sanrio/sticker_26_badtz_maru.png" class="sticker-img-asset" alt="Kuromi & Friends: 26 Badtz Maru" draggable="false" />`
  },
  {
    id: "png-sanrio-sticker_27_my_melody",
    category: "kuromi",
    name: "Kuromi & Friends: 27 My Melody",
    tags: ["kuromi", "sanrio", "gothic", "kawaii", "my melody"],
    img: "assets/stickers/sanrio/sticker_27_my_melody.png",
    svg: `<img src="assets/stickers/sanrio/sticker_27_my_melody.png" class="sticker-img-asset" alt="Kuromi & Friends: 27 My Melody" draggable="false" />`
  },
  {
    id: "png-sanrio-sticker_28_my_melody",
    category: "kuromi",
    name: "Kuromi & Friends: 28 My Melody",
    tags: ["kuromi", "sanrio", "gothic", "kawaii", "my melody"],
    img: "assets/stickers/sanrio/sticker_28_my_melody.png",
    svg: `<img src="assets/stickers/sanrio/sticker_28_my_melody.png" class="sticker-img-asset" alt="Kuromi & Friends: 28 My Melody" draggable="false" />`
  },
  {
    id: "png-sanrio-sticker_29_badtz_maru",
    category: "kuromi",
    name: "Kuromi & Friends: 29 Badtz Maru",
    tags: ["kuromi", "sanrio", "gothic", "kawaii", "badtz maru"],
    img: "assets/stickers/sanrio/sticker_29_badtz_maru.png",
    svg: `<img src="assets/stickers/sanrio/sticker_29_badtz_maru.png" class="sticker-img-asset" alt="Kuromi & Friends: 29 Badtz Maru" draggable="false" />`
  },
  {
    id: "png-sanrio-sticker_30_my_melody",
    category: "kuromi",
    name: "Kuromi & Friends: 30 My Melody",
    tags: ["kuromi", "sanrio", "gothic", "kawaii", "my melody"],
    img: "assets/stickers/sanrio/sticker_30_my_melody.png",
    svg: `<img src="assets/stickers/sanrio/sticker_30_my_melody.png" class="sticker-img-asset" alt="Kuromi & Friends: 30 My Melody" draggable="false" />`
  },
  {
    id: "png-sanrio-sticker_31_gothic_icon",
    category: "kuromi",
    name: "Kuromi & Friends: 31 Gothic Icon",
    tags: ["kuromi", "sanrio", "gothic", "kawaii"],
    img: "assets/stickers/sanrio/sticker_31_gothic_icon.png",
    svg: `<img src="assets/stickers/sanrio/sticker_31_gothic_icon.png" class="sticker-img-asset" alt="Kuromi & Friends: 31 Gothic Icon" draggable="false" />`
  },
  {
    id: "png-sanrio-sticker_32_gothic_icon",
    category: "kuromi",
    name: "Kuromi & Friends: 32 Gothic Icon",
    tags: ["kuromi", "sanrio", "gothic", "kawaii"],
    img: "assets/stickers/sanrio/sticker_32_gothic_icon.png",
    svg: `<img src="assets/stickers/sanrio/sticker_32_gothic_icon.png" class="sticker-img-asset" alt="Kuromi & Friends: 32 Gothic Icon" draggable="false" />`
  },
  {
    id: "png-sanrio-sticker_33_gothic_icon",
    category: "kuromi",
    name: "Kuromi & Friends: 33 Gothic Icon",
    tags: ["kuromi", "sanrio", "gothic", "kawaii"],
    img: "assets/stickers/sanrio/sticker_33_gothic_icon.png",
    svg: `<img src="assets/stickers/sanrio/sticker_33_gothic_icon.png" class="sticker-img-asset" alt="Kuromi & Friends: 33 Gothic Icon" draggable="false" />`
  },
  {
    id: "png-sanrio-sticker_34_gothic_icon",
    category: "kuromi",
    name: "Kuromi & Friends: 34 Gothic Icon",
    tags: ["kuromi", "sanrio", "gothic", "kawaii"],
    img: "assets/stickers/sanrio/sticker_34_gothic_icon.png",
    svg: `<img src="assets/stickers/sanrio/sticker_34_gothic_icon.png" class="sticker-img-asset" alt="Kuromi & Friends: 34 Gothic Icon" draggable="false" />`
  },
  {
    id: "png-sanrio-sticker_35_gothic_icon",
    category: "kuromi",
    name: "Kuromi & Friends: 35 Gothic Icon",
    tags: ["kuromi", "sanrio", "gothic", "kawaii"],
    img: "assets/stickers/sanrio/sticker_35_gothic_icon.png",
    svg: `<img src="assets/stickers/sanrio/sticker_35_gothic_icon.png" class="sticker-img-asset" alt="Kuromi & Friends: 35 Gothic Icon" draggable="false" />`
  },
  {
    id: "png-sanrio-sticker_36_gothic_icon",
    category: "kuromi",
    name: "Kuromi & Friends: 36 Gothic Icon",
    tags: ["kuromi", "sanrio", "gothic", "kawaii"],
    img: "assets/stickers/sanrio/sticker_36_gothic_icon.png",
    svg: `<img src="assets/stickers/sanrio/sticker_36_gothic_icon.png" class="sticker-img-asset" alt="Kuromi & Friends: 36 Gothic Icon" draggable="false" />`
  },
  {
    id: "png-sanrio-sticker_37_gothic_icon",
    category: "kuromi",
    name: "Kuromi & Friends: 37 Gothic Icon",
    tags: ["kuromi", "sanrio", "gothic", "kawaii"],
    img: "assets/stickers/sanrio/sticker_37_gothic_icon.png",
    svg: `<img src="assets/stickers/sanrio/sticker_37_gothic_icon.png" class="sticker-img-asset" alt="Kuromi & Friends: 37 Gothic Icon" draggable="false" />`
  },
  {
    id: "png-seal-seal_realistic_1_violet_moon",
    category: "seals",
    name: "Realistic Wax Seal: 1 Violet Moon",
    tags: ["wax seal", "realistic", "embossed", "seal", "stamp"],
    img: "assets/stickers/seals/seal_realistic_1_violet_moon.png",
    svg: `<img src="assets/stickers/seals/seal_realistic_1_violet_moon.png" class="sticker-img-asset" alt="Realistic Wax Seal: 1 Violet Moon" draggable="false" />`
  },
  {
    id: "png-seal-seal_realistic_2_black_star",
    category: "seals",
    name: "Realistic Wax Seal: 2 Black Star",
    tags: ["wax seal", "realistic", "embossed", "seal", "stamp"],
    img: "assets/stickers/seals/seal_realistic_2_black_star.png",
    svg: `<img src="assets/stickers/seals/seal_realistic_2_black_star.png" class="sticker-img-asset" alt="Realistic Wax Seal: 2 Black Star" draggable="false" />`
  },
  {
    id: "png-seal-seal_realistic_3_grey_rosette",
    category: "seals",
    name: "Realistic Wax Seal: 3 Grey Rosette",
    tags: ["wax seal", "realistic", "embossed", "seal", "stamp"],
    img: "assets/stickers/seals/seal_realistic_3_grey_rosette.png",
    svg: `<img src="assets/stickers/seals/seal_realistic_3_grey_rosette.png" class="sticker-img-asset" alt="Realistic Wax Seal: 3 Grey Rosette" draggable="false" />`
  },
  {
    id: "png-seal-seal_v1_purple_leaf",
    category: "seals",
    name: "Realistic Wax Seal: V1 Purple Leaf",
    tags: ["wax seal", "realistic", "embossed", "seal", "stamp"],
    img: "assets/stickers/seals/seal_v1_purple_leaf.png",
    svg: `<img src="assets/stickers/seals/seal_v1_purple_leaf.png" class="sticker-img-asset" alt="Realistic Wax Seal: V1 Purple Leaf" draggable="false" />`
  },
  {
    id: "png-seal-seal_v2_black_rose",
    category: "seals",
    name: "Realistic Wax Seal: V2 Black Rose",
    tags: ["wax seal", "realistic", "embossed", "seal", "stamp"],
    img: "assets/stickers/seals/seal_v2_black_rose.png",
    svg: `<img src="assets/stickers/seals/seal_v2_black_rose.png" class="sticker-img-asset" alt="Realistic Wax Seal: V2 Black Rose" draggable="false" />`
  },
  {
    id: "png-seal-seal_v3_red_crown",
    category: "seals",
    name: "Realistic Wax Seal: V3 Red Crown",
    tags: ["wax seal", "realistic", "embossed", "seal", "stamp"],
    img: "assets/stickers/seals/seal_v3_red_crown.png",
    svg: `<img src="assets/stickers/seals/seal_v3_red_crown.png" class="sticker-img-asset" alt="Realistic Wax Seal: V3 Red Crown" draggable="false" />`
  },
  {
    id: "png-seal-seal_v4_pink_flower",
    category: "seals",
    name: "Realistic Wax Seal: V4 Pink Flower",
    tags: ["wax seal", "realistic", "embossed", "seal", "stamp"],
    img: "assets/stickers/seals/seal_v4_pink_flower.png",
    svg: `<img src="assets/stickers/seals/seal_v4_pink_flower.png" class="sticker-img-asset" alt="Realistic Wax Seal: V4 Pink Flower" draggable="false" />`
  },
  {
    id: "png-seal-seal_v5_gold_laurel",
    category: "seals",
    name: "Realistic Wax Seal: V5 Gold Laurel",
    tags: ["wax seal", "realistic", "embossed", "seal", "stamp"],
    img: "assets/stickers/seals/seal_v5_gold_laurel.png",
    svg: `<img src="assets/stickers/seals/seal_v5_gold_laurel.png" class="sticker-img-asset" alt="Realistic Wax Seal: V5 Gold Laurel" draggable="false" />`
  },
  {
    id: "png-seal-seal_v6_silver_moon",
    category: "seals",
    name: "Realistic Wax Seal: V6 Silver Moon",
    tags: ["wax seal", "realistic", "embossed", "seal", "stamp"],
    img: "assets/stickers/seals/seal_v6_silver_moon.png",
    svg: `<img src="assets/stickers/seals/seal_v6_silver_moon.png" class="sticker-img-asset" alt="Realistic Wax Seal: V6 Silver Moon" draggable="false" />`
  },
  {
    id: "png-goth-01_nyx_character",
    category: "gothic",
    name: "Gothic: Nyx Character",
    tags: ["gothic", "aesthetic", "vintage", "dark", "charms"],
    img: "assets/stickers/gothic/01_nyx_character.png",
    svg: `<img src="assets/stickers/gothic/01_nyx_character.png" class="sticker-img-asset" alt="Gothic: Nyx Character" draggable="false" />`
  },
  {
    id: "png-goth-02_rose",
    category: "gothic",
    name: "Gothic: Rose",
    tags: ["gothic", "aesthetic", "vintage", "dark", "charms"],
    img: "assets/stickers/gothic/02_rose.png",
    svg: `<img src="assets/stickers/gothic/02_rose.png" class="sticker-img-asset" alt="Gothic: Rose" draggable="false" />`
  },
  {
    id: "png-goth-03_bat",
    category: "gothic",
    name: "Gothic: Bat",
    tags: ["gothic", "aesthetic", "vintage", "dark", "charms"],
    img: "assets/stickers/gothic/03_bat.png",
    svg: `<img src="assets/stickers/gothic/03_bat.png" class="sticker-img-asset" alt="Gothic: Bat" draggable="false" />`
  },
  {
    id: "png-goth-04_crescent_moon",
    category: "gothic",
    name: "Gothic: Crescent Moon",
    tags: ["gothic", "aesthetic", "vintage", "dark", "charms"],
    img: "assets/stickers/gothic/04_crescent_moon.png",
    svg: `<img src="assets/stickers/gothic/04_crescent_moon.png" class="sticker-img-asset" alt="Gothic: Crescent Moon" draggable="false" />`
  },
  {
    id: "png-goth-05_heart",
    category: "gothic",
    name: "Gothic: Heart",
    tags: ["gothic", "aesthetic", "vintage", "dark", "charms"],
    img: "assets/stickers/gothic/05_heart.png",
    svg: `<img src="assets/stickers/gothic/05_heart.png" class="sticker-img-asset" alt="Gothic: Heart" draggable="false" />`
  },
  {
    id: "png-goth-06_crown",
    category: "gothic",
    name: "Gothic: Crown",
    tags: ["gothic", "aesthetic", "vintage", "dark", "charms"],
    img: "assets/stickers/gothic/06_crown.png",
    svg: `<img src="assets/stickers/gothic/06_crown.png" class="sticker-img-asset" alt="Gothic: Crown" draggable="false" />`
  },
  {
    id: "png-goth-07_candle",
    category: "gothic",
    name: "Gothic: Candle",
    tags: ["gothic", "aesthetic", "vintage", "dark", "charms"],
    img: "assets/stickers/gothic/07_candle.png",
    svg: `<img src="assets/stickers/gothic/07_candle.png" class="sticker-img-asset" alt="Gothic: Candle" draggable="false" />`
  },
  {
    id: "png-goth-08_key",
    category: "gothic",
    name: "Gothic: Key",
    tags: ["gothic", "aesthetic", "vintage", "dark", "charms"],
    img: "assets/stickers/gothic/08_key.png",
    svg: `<img src="assets/stickers/gothic/08_key.png" class="sticker-img-asset" alt="Gothic: Key" draggable="false" />`
  },
  {
    id: "png-goth-09_skull",
    category: "gothic",
    name: "Gothic: Skull",
    tags: ["gothic", "aesthetic", "vintage", "dark", "charms"],
    img: "assets/stickers/gothic/09_skull.png",
    svg: `<img src="assets/stickers/gothic/09_skull.png" class="sticker-img-asset" alt="Gothic: Skull" draggable="false" />`
  },
  {
    id: "png-goth-10_wax_seal",
    category: "gothic",
    name: "Gothic: Wax Seal",
    tags: ["gothic", "aesthetic", "vintage", "dark", "charms"],
    img: "assets/stickers/gothic/10_wax_seal.png",
    svg: `<img src="assets/stickers/gothic/10_wax_seal.png" class="sticker-img-asset" alt="Gothic: Wax Seal" draggable="false" />`
  },
  {
    id: "png-goth-11_label_memento_mori",
    category: "gothic",
    name: "Gothic: Label Memento Mori",
    tags: ["gothic", "aesthetic", "vintage", "dark", "charms"],
    img: "assets/stickers/gothic/11_label_memento_mori.png",
    svg: `<img src="assets/stickers/gothic/11_label_memento_mori.png" class="sticker-img-asset" alt="Gothic: Label Memento Mori" draggable="false" />`
  },
  {
    id: "png-goth-12_label_gothic_greetings",
    category: "gothic",
    name: "Gothic: Label Gothic Greetings",
    tags: ["gothic", "aesthetic", "vintage", "dark", "charms"],
    img: "assets/stickers/gothic/12_label_gothic_greetings.png",
    svg: `<img src="assets/stickers/gothic/12_label_gothic_greetings.png" class="sticker-img-asset" alt="Gothic: Label Gothic Greetings" draggable="false" />`
  },
  {
    id: "png-goth-13_label_dark_musings",
    category: "gothic",
    name: "Gothic: Label Dark Musings",
    tags: ["gothic", "aesthetic", "vintage", "dark", "charms"],
    img: "assets/stickers/gothic/13_label_dark_musings.png",
    svg: `<img src="assets/stickers/gothic/13_label_dark_musings.png" class="sticker-img-asset" alt="Gothic: Label Dark Musings" draggable="false" />`
  },
  {
    id: "png-goth-14_label_the_hours_passed",
    category: "gothic",
    name: "Gothic: Label The Hours Passed",
    tags: ["gothic", "aesthetic", "vintage", "dark", "charms"],
    img: "assets/stickers/gothic/14_label_the_hours_passed.png",
    svg: `<img src="assets/stickers/gothic/14_label_the_hours_passed.png" class="sticker-img-asset" alt="Gothic: Label The Hours Passed" draggable="false" />`
  },
  {
    id: "interactive-midnight-envelope",
    category: "envelopes",
    name: "Interactive Midnight Envelope (Unseals)",
    tags: ["envelope", "interactive", "secret", "whisper", "unseal", "wax seal"],
    svg: `<div class="gothic-envelope-container" onclick="openEnvelope(this)">
  <svg class="envelope-svg" width="240" height="160" viewBox="0 0 240 160" xmlns="http://www.w3.org/2000/svg">
    <!-- Envelope Background -->
    <rect width="240" height="160" rx="4" fill="#14111e" stroke="#4a3b6c" stroke-width="1.5"/>
    
    <!-- Envelope Flap (animates open) -->
    <g class="envelope-flap">
      <polygon points="0,0 120,95 240,0" fill="#1b172a" stroke="#4a3b6c" stroke-width="1.5"/>
    </g>
    
    <line x1="0" y1="160" x2="90" y2="90" stroke="#312648" stroke-width="1"/>
    <line x1="240" y1="160" x2="150" y2="90" stroke="#312648" stroke-width="1"/>
    
    <!-- Constellation Dots -->
    <circle cx="40" cy="40" r="1.5" fill="#e2d9f3" opacity="0.8"/>
    <circle cx="60" cy="30" r="2" fill="#e2d9f3"/>
    <line x1="40" y1="40" x2="60" y2="30" stroke="#9d8cb5" stroke-width="0.5" stroke-dasharray="2 2"/>
    
    <!-- Wax Seal (lifts when opened) -->
    <g class="wax-seal-group">
      <circle cx="120" cy="95" r="16" fill="#2b1f1a" stroke="#70523d" stroke-width="1.5"/>
      <circle cx="120" cy="95" r="12" fill="#3a2a22"/>
      <text x="120" y="100" font-size="12" text-anchor="middle" fill="#d1b280">💀</text>
    </g>
  </svg>
  <div class="envelope-label">Click to unseal...</div>
</div>`,
    isInteractiveEnvelope: true
  }
];


// Helper function to render any sticker (PNG image or SVG markup)
window.getStickerGraphic = function(sticker) {
  if (!sticker) return '✦';
  if (sticker.img) {
    return `<img src="${sticker.img}" class="sticker-img-asset" alt="${sticker.name || ''}" draggable="false" />`;
  }
  return sticker.svg || '✦';
};
