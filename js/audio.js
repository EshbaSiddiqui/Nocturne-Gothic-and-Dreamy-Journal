/**
 * Nocturne - Web Audio Synthesizer & Soundscape Engine
 * 100% offline procedural audio for ambient soundscapes (Gentle Rain, Fireplace,
 * Wind Chimes) and typewriter mechanical keypresses & carriage return bells.
 */

class NocturneAudioEngine {
  constructor() {
    this.ctx = null;
    this.ambientType = 'off'; // 'rain' | 'fire' | 'chimes' | 'off'
    this.ambientGain = null;
    this.masterGain = null;
    this.activeNodes = [];
    this.chimeInterval = null;
    this.isMuted = false;
    this.typewriterEnabled = true;
  }

  initContext() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.4, this.ctx.currentTime);
      this.ambientGain.connect(this.masterGain);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Set Ambient Soundscape: 'rain' | 'fire' | 'chimes' | 'off'
  setAmbient(type) {
    this.initContext();
    this.stopAmbient();
    this.ambientType = type;

    if (this.isMuted || type === 'off') return;

    if (type === 'rain') {
      this.startRain();
    } else if (type === 'fire') {
      this.startFire();
    } else if (type === 'chimes') {
      this.startChimes();
    }
  }

  stopAmbient() {
    if (this.chimeInterval) {
      clearInterval(this.chimeInterval);
      this.chimeInterval = null;
    }
    this.activeNodes.forEach(node => {
      try {
        if (node.stop) node.stop();
        node.disconnect();
      } catch (e) {}
    });
    this.activeNodes = [];
  }

  // --- Rain Generator (Filtered Noise + Random Droplet Burst) ---
  startRain() {
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    // Pink / Brownish noise generator for gentle rainfall
    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      data[i] = (b0 + b1 + b2) * 0.25;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    // Lowpass filter to simulate rain against gothic window
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(850, this.ctx.currentTime);

    noise.connect(filter);
    filter.connect(this.ambientGain);
    noise.start();

    this.activeNodes.push(noise, filter);
  }

  // --- Fireplace Generator (Low Rumble + Crackle Pops) ---
  startFire() {
    // 1. Low warm rumble
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    let lastVal = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      lastVal = (lastVal + (0.02 * white)) / 1.02;
      data[i] = lastVal * 1.5;
    }

    const rumble = this.ctx.createBufferSource();
    rumble.buffer = buffer;
    rumble.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(320, this.ctx.currentTime);

    rumble.connect(filter);
    filter.connect(this.ambientGain);
    rumble.start();
    this.activeNodes.push(rumble, filter);

    // 2. Intermittent crackle pops
    const triggerCrackle = () => {
      if (this.ambientType !== 'fire' || this.isMuted) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const clickFilter = this.ctx.createBiquadFilter();

      clickFilter.type = 'highpass';
      clickFilter.frequency.setValueAtTime(1400, this.ctx.currentTime);

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(120 + Math.random() * 800, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.18 + Math.random() * 0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

      osc.connect(clickFilter);
      clickFilter.connect(gain);
      gain.connect(this.ambientGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);

      const nextDelay = 100 + Math.random() * 600;
      this.chimeInterval = setTimeout(triggerCrackle, nextDelay);
    };

    triggerCrackle();
  }

  // --- Midnight Wind Chimes & Celestial Bells ---
  startChimes() {
    const frequencies = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50, 1174.66]; // C5, D5, E5, G5, A5, C6, D6 pentatonic

    const playBell = () => {
      if (this.ambientType !== 'chimes' || this.isMuted) return;
      const freq = frequencies[Math.floor(Math.random() * frequencies.length)];

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Metallic overtone
      const osc2 = this.ctx.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(freq * 2.76, this.ctx.currentTime);

      const gain2 = this.ctx.createGain();
      gain2.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain2.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.2);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 3.2);

      osc.connect(gain);
      osc2.connect(gain2);
      gain2.connect(gain);
      gain.connect(this.ambientGain);

      osc.start();
      osc2.start();
      osc.stop(this.ctx.currentTime + 3.5);
      osc2.stop(this.ctx.currentTime + 3.5);

      const nextDelay = 1800 + Math.random() * 3200;
      this.chimeInterval = setTimeout(playBell, nextDelay);
    };

    playBell();
  }

  // --- Typewriter Key Click Effect ---
  playTypewriterKey(keyType = 'key') {
    if (!this.typewriterEnabled) return;
    this.initContext();

    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    const t = this.ctx.currentTime;

    if (keyType === 'space') {
      // Deeper wooden spacebar thump
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140, t);
      osc.frequency.exponentialRampToValueAtTime(45, t + 0.05);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(350, t);

      gain.gain.setValueAtTime(0.35, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(t);
      osc.stop(t + 0.06);
      return;
    }

    if (keyType === 'backspace') {
      // Mechanical roller / ratchet sound
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(320, t);
      osc.frequency.exponentialRampToValueAtTime(110, t + 0.04);

      gain.gain.setValueAtTime(0.28, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(t);
      osc.stop(t + 0.045);
      return;
    }

    // Standard mechanical typewriter key strike:
    // Layer 1: Metal slug click strike
    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    const filter1 = this.ctx.createBiquadFilter();

    const baseFreq = 950 + (Math.random() * 250 - 125);
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(baseFreq, t);
    osc1.frequency.exponentialRampToValueAtTime(160, t + 0.025);

    filter1.type = 'bandpass';
    filter1.frequency.setValueAtTime(1200, t);

    gain1.gain.setValueAtTime(0.4, t);
    gain1.gain.exponentialRampToValueAtTime(0.001, t + 0.03);

    osc1.connect(filter1);
    filter1.connect(gain1);
    gain1.connect(this.masterGain);

    osc1.start(t);
    osc1.stop(t + 0.035);

    // Layer 2: Platen resonance
    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(220 + Math.random() * 40, t);
    gain2.gain.setValueAtTime(0.18, t);
    gain2.gain.exponentialRampToValueAtTime(0.001, t + 0.04);

    osc2.connect(gain2);
    gain2.connect(this.masterGain);

    osc2.start(t);
    osc2.stop(t + 0.045);
  }

  // --- Carriage Return Lever & Bell Ding ---
  playCarriageBell() {
    if (!this.typewriterEnabled) return;
    this.initContext();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    const t = this.ctx.currentTime;

    // 1. Carriage mechanical slide / whir
    const slideOsc = this.ctx.createOscillator();
    const slideGain = this.ctx.createGain();
    slideOsc.type = 'sawtooth';
    slideOsc.frequency.setValueAtTime(400, t);
    slideOsc.frequency.exponentialRampToValueAtTime(180, t + 0.12);

    slideGain.gain.setValueAtTime(0.15, t);
    slideGain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);

    slideOsc.connect(slideGain);
    slideGain.connect(this.masterGain);
    slideOsc.start(t);
    slideOsc.stop(t + 0.13);

    // 2. Clear antique bell ding
    const bellOsc = this.ctx.createOscillator();
    const bellGain = this.ctx.createGain();

    bellOsc.type = 'sine';
    bellOsc.frequency.setValueAtTime(2093, t + 0.06); // High C7 bell

    bellGain.gain.setValueAtTime(0.001, t);
    bellGain.gain.setValueAtTime(0.35, t + 0.06);
    bellGain.gain.exponentialRampToValueAtTime(0.0001, t + 1.4);

    // Bell overtone
    const bellOvertone = this.ctx.createOscillator();
    const bellOverGain = this.ctx.createGain();
    bellOvertone.type = 'sine';
    bellOvertone.frequency.setValueAtTime(2093 * 2.75, t + 0.06);
    bellOverGain.gain.setValueAtTime(0.08, t + 0.06);
    bellOverGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.8);

    bellOsc.connect(bellGain);
    bellGain.connect(this.masterGain);

    bellOvertone.connect(bellOverGain);
    bellOverGain.connect(bellGain);

    bellOsc.start(t + 0.06);
    bellOvertone.start(t + 0.06);
    bellOsc.stop(t + 1.45);
    bellOvertone.stop(t + 0.85);
  }

  // --- Sticker Placement Pop Sound ---
  playStickerPop() {
    this.initContext();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;

    // Bubbly pop: short sine burst + pitch drop
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(680 + Math.random() * 180, t);
    osc.frequency.exponentialRampToValueAtTime(280, t + 0.08);
    gain.gain.setValueAtTime(0.32, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + 0.11);

    // Second harmonic sparkle
    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(1200 + Math.random() * 300, t);
    osc2.frequency.exponentialRampToValueAtTime(500, t + 0.06);
    gain2.gain.setValueAtTime(0.15, t);
    gain2.gain.exponentialRampToValueAtTime(0.001, t + 0.07);
    osc2.connect(gain2);
    gain2.connect(this.masterGain);
    osc2.start(t);
    osc2.stop(t + 0.08);
  }

  // --- Washi Tape Peel Sound ---
  playWashiTape() {
    this.initContext();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;

    // Paper peel: filtered noise burst
    const bufferSize = Math.floor(this.ctx.sampleRate * 0.18);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(3200, t);
    filter.Q.setValueAtTime(1.5, t);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.28, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    noise.start(t);
  }

  // --- Page Turn / Flip Sound ---
  playPageTurn() {
    this.initContext();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;

    // Whooshy paper rustle
    const bufferSize = Math.floor(this.ctx.sampleRate * 0.35);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      const env = Math.sin(Math.PI * i / bufferSize); // bell shape
      data[i] = (Math.random() * 2 - 1) * env * 0.7;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(1800, t);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.22, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.38);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    noise.start(t);
  }

  // --- Soft Magical Chime (for special actions) ---
  playMagicChime() {
    this.initContext();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const freqs = [880, 1108, 1318]; // A5, C#6, E6 — A major
    freqs.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t + i * 0.06);
      gain.gain.setValueAtTime(0.001, t + i * 0.06);
      gain.gain.linearRampToValueAtTime(0.18, t + i * 0.06 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.06 + 1.2);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(t + i * 0.06);
      osc.stop(t + i * 0.06 + 1.3);
    });
  }


  // --- Deep Tactile Wax Seal Stamp Sound ---
  playWaxSeal() {
    this.initContext();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;

    // Heavy thud
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(160, t);
    osc.frequency.exponentialRampToValueAtTime(45, t + 0.12);

    gain.gain.setValueAtTime(0.45, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.14);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + 0.15);

    // Warm squish / melt click
    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(380, t + 0.02);
    osc2.frequency.exponentialRampToValueAtTime(110, t + 0.09);

    gain2.gain.setValueAtTime(0.2, t + 0.02);
    gain2.gain.exponentialRampToValueAtTime(0.001, t + 0.1);

    osc2.connect(gain2);
    gain2.connect(this.masterGain);
    osc2.start(t + 0.02);
    osc2.stop(t + 0.11);
  }

  // --- Cool Crisp Envelope Unfold / Open Sound ---
  playEnvelope() {
    this.initContext();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;

    // Crisp paper fold
    const bufferSize = Math.floor(this.ctx.sampleRate * 0.22);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.sin(Math.PI * i / bufferSize);
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(2400, t);
    filter.Q.setValueAtTime(2.0, t);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.3, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    noise.start(t);
  }

  // --- Toggle Ambient Mute ---
  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.ambientGain && this.ctx) {
      this.ambientGain.gain.setValueAtTime(this.isMuted ? 0 : 0.4, this.ctx.currentTime);
    }
    if (this.isMuted) {
      this.stopAmbient();
    } else {
      if (this.ambientType !== 'off') {
        this.setAmbient(this.ambientType);
      }
    }
    return this.isMuted;
  }

  setVolume(val) {
    if (this.ambientGain && this.ctx) {
      this.ambientGain.gain.setValueAtTime(val, this.ctx.currentTime);
    }
  }
}

// Global Audio Engine
window.nocturneAudio = new NocturneAudioEngine();

// Unlock Web Audio context on user gesture for seamless typewriter clicks in Chrome
const unlockAudioContext = () => {
  if (window.nocturneAudio) {
    window.nocturneAudio.initContext();
  }
};
window.addEventListener('click', unlockAudioContext, { passive: true });
window.addEventListener('keydown', unlockAudioContext, { passive: true });
