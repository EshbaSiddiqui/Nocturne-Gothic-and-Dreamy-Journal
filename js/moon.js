/**
 * Nocturne - Lunar Phase Calculator & Witchy Horoscope Engine
 * Calculates astronomical lunar illumination, phase name, and mystical journal prompts.
 */

class NocturneMoonEngine {
  constructor() {
    this.synodicMonth = 29.53058867; // average lunar cycle in days
    // Reference new moon: Jan 11, 2024 at 11:57 UTC
    this.refNewMoon = new Date('2024-01-11T11:57:00Z').getTime();
  }

  getMoonData(date = new Date()) {
    const diff = date.getTime() - this.refNewMoon;
    const daysSince = diff / (1000 * 60 * 60 * 24);
    const cycle = (daysSince % this.synodicMonth + this.synodicMonth) % this.synodicMonth;
    const illumination = (1 - Math.cos((cycle / this.synodicMonth) * 2 * Math.PI)) / 2;
    const illumPercent = Math.round(illumination * 100);

    let phase = '';
    let icon = '🌑';
    let energy = '';
    let mysticalPrompt = '';

    if (cycle < 1.5 || cycle > 28.0) {
      phase = 'New Moon';
      icon = '🌑';
      energy = 'Darkness & Secret Beginnings';
      mysticalPrompt = 'What hidden intention are you nurturing in the quiet shadows of your mind? Write a vow to yourself that only the night will hear.';
    } else if (cycle < 7.0) {
      phase = 'Waxing Crescent';
      icon = '🌒';
      energy = 'Fragile Ambition & Whispers';
      mysticalPrompt = 'A sliver of silver light begins to pierce the dark. What small hope are you ready to allow to grow, even if you are afraid?';
    } else if (cycle < 8.5) {
      phase = 'First Quarter';
      icon = '🌓';
      energy = 'Thresholds & Resolve';
      mysticalPrompt = 'You stand at the crossroads of light and shadow. What internal conflict are you ready to face with quiet courage?';
    } else if (cycle < 14.0) {
      phase = 'Waxing Gibbous';
      icon = '🌔';
      energy = 'Deepening Magic & Anticipation';
      mysticalPrompt = 'The cup is almost overflowing. What subtle changes have you noticed in yourself over the past fourteen days?';
    } else if (cycle < 16.0) {
      phase = 'Full Moon';
      icon = '🌕';
      energy = 'Illumination & Uncensored Truth';
      mysticalPrompt = 'The moonlight hides nothing tonight. What truth have you been keeping from yourself? Let it pour onto this page without apologies.';
    } else if (cycle < 21.5) {
      phase = 'Waning Gibbous';
      icon = '🌖';
      energy = 'Gratitude & Introspection';
      mysticalPrompt = 'Look back upon the wild storms you survived this week. What lesson did the shadows teach you that the light could not?';
    } else if (cycle < 23.0) {
      phase = 'Last Quarter';
      icon = '🌗';
      energy = 'Release & Cleansing';
      mysticalPrompt = 'What heavy emotional baggage, vintage grudge, or unspoken expectation are you ready to burn away like incense?';
    } else {
      phase = 'Waning Crescent';
      icon = '🌘';
      energy = 'Surrender & Velvet Solace';
      mysticalPrompt = 'The moon prepares to rest. Rest your weary thoughts here. What kindness do you need to offer yourself before midnight passes?';
    }

    return {
      date,
      phase,
      icon,
      illumPercent,
      cycleDays: cycle.toFixed(1),
      energy,
      mysticalPrompt
    };
  }

  // Generate SVG representation of moon phase with glowing halo
  renderMoonSvg(data) {
    const illum = data.illumPercent;
    // Map illumination to shadow position or crescent curve
    return `
      <svg viewBox="0 0 100 100" class="moon-widget-svg">
        <defs>
          <radialGradient id="moonAura" cx="50%" cy="50%" r="50%">
            <stop offset="60%" stop-color="#E7DDF5" stop-opacity="0.9"/>
            <stop offset="85%" stop-color="#A993C9" stop-opacity="0.4"/>
            <stop offset="100%" stop-color="#542A80" stop-opacity="0"/>
          </radialGradient>
          <radialGradient id="moonSurface" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stop-color="#FFFFFF"/>
            <stop offset="40%" stop-color="#E8E0F2"/>
            <stop offset="80%" stop-color="#BCB0D0"/>
            <stop offset="100%" stop-color="#7B6D90"/>
          </radialGradient>
          <filter id="moonGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur"/>
            <feComposite in="SourceGraphic" in2="blur" operator="over"/>
          </filter>
        </defs>

        <!-- Outer Atmospheric Glow -->
        <circle cx="50" cy="50" r="48" fill="url(#moonAura)"/>

        <!-- Base Lunar Body -->
        <circle cx="50" cy="50" r="38" fill="url(#moonSurface)" filter="url(#moonGlowFilter)"/>

        <!-- Craters -->
        <circle cx="42" cy="38" r="5" fill="#9F91B3" opacity="0.45"/>
        <circle cx="58" cy="46" r="7" fill="#9F91B3" opacity="0.4"/>
        <circle cx="48" cy="62" r="4.5" fill="#9F91B3" opacity="0.35"/>
        <circle cx="34" cy="55" r="3" fill="#9F91B3" opacity="0.4"/>
        <circle cx="62" cy="32" r="3.5" fill="#9F91B3" opacity="0.3"/>

        <!-- Shadow overlay depending on cycle -->
        <path d="M 50 12 A 38 38 0 0 1 50 88 A ${Math.abs(38 * (1 - (illum / 50)))} 38 0 0 ${illum > 50 ? '0' : '1'} 50 12 Z" fill="#120B1E" opacity="0.88"/>
      </svg>
    `;
  }
}

// Global Moon Engine
window.nocturneMoon = new NocturneMoonEngine();
