// Web Audio API Synthesizer - 100% Client-Side, Zero External Audio Files

let audioCtx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let sirenOsc1: OscillatorNode | null = null;
let sirenOsc2: OscillatorNode | null = null;
let sirenGain: GainNode | null = null;
let sirenInterval: ReturnType<typeof setInterval> | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
    masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(0.7, audioCtx.currentTime);
    masterGain.connect(audioCtx.destination);
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function setMasterVolume(volume: number) {
  if (masterGain && audioCtx) {
    const safeVol = Math.max(0, Math.min(1, volume));
    masterGain.gain.setValueAtTime(safeVol, audioCtx.currentTime);
  }
}

// 1. The Ping of Dread (Classic corporate chat notification)
export function playSlackPing() {
  const ctx = getAudioContext();
  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(880, now); // A5
  osc.frequency.exponentialRampToValueAtTime(1760, now + 0.08); // A6
  osc.frequency.exponentialRampToValueAtTime(1318.5, now + 0.16); // E6

  gain.gain.setValueAtTime(0.3, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

  osc.connect(gain);
  gain.connect(masterGain!);

  osc.start(now);
  osc.stop(now + 0.46);
}

// 2. You're On Mute (Subtle reminder buzz & synthetic boop)
export function playMuteBuzz() {
  const ctx = getAudioContext();
  const now = ctx.currentTime;

  // Dual tone low alert
  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const gain = ctx.createGain();

  osc1.type = 'sawtooth';
  osc2.type = 'sine';
  osc1.frequency.setValueAtTime(140, now);
  osc2.frequency.setValueAtTime(280, now);
  osc1.frequency.linearRampToValueAtTime(110, now + 0.25);
  osc2.frequency.linearRampToValueAtTime(220, now + 0.25);

  gain.gain.setValueAtTime(0.2, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

  osc1.connect(gain);
  osc2.connect(gain);
  gain.connect(masterGain!);

  osc1.start(now);
  osc2.start(now);
  osc1.stop(now + 0.36);
  osc2.stop(now + 0.36);
}

// 3. Unmuted Mechanical Keyboard (Clattering click sequence)
export function playKeyboardClack() {
  const ctx = getAudioContext();
  const startTime = ctx.currentTime;

  const keyCount = 6;
  for (let i = 0; i < keyCount; i++) {
    const keyTime = startTime + i * (0.06 + Math.random() * 0.04);
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(400 + Math.random() * 600, keyTime);
    osc.frequency.exponentialRampToValueAtTime(80, keyTime + 0.04);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1200 + Math.random() * 400, keyTime);
    filter.Q.value = 3;

    gain.gain.setValueAtTime(0.25, keyTime);
    gain.gain.exponentialRampToValueAtTime(0.001, keyTime + 0.05);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(masterGain!);

    osc.start(keyTime);
    osc.stop(keyTime + 0.06);
  }
}

// 4. Microphone Feedback Squeal (Safe comedic whistle chirp)
export function playMicFeedback() {
  const ctx = getAudioContext();
  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(2200, now);
  osc.frequency.linearRampToValueAtTime(3200, now + 0.18);
  osc.frequency.linearRampToValueAtTime(2600, now + 0.4);

  gain.gain.setValueAtTime(0.01, now);
  gain.gain.linearRampToValueAtTime(0.18, now + 0.15);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

  osc.connect(gain);
  gain.connect(masterGain!);

  osc.start(now);
  osc.stop(now + 0.52);
}

// 5. Robotic Packet Loss (Bit-stutter glitch)
export function playPacketLoss() {
  const ctx = getAudioContext();
  const now = ctx.currentTime;

  const blipCount = 7;
  for (let i = 0; i < blipCount; i++) {
    const t = now + i * 0.05;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(i % 2 === 0 ? 350 : 210, t);

    gain.gain.setValueAtTime(0.15, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);

    osc.connect(gain);
    gain.connect(masterGain!);

    osc.start(t);
    osc.stop(t + 0.045);
  }
}

// 6. Polite Unenthusiastic Clapping (Sparse gentle taps)
export function playPoliteApplause() {
  const ctx = getAudioContext();
  const now = ctx.currentTime;

  const claps = 8;
  for (let i = 0; i < claps; i++) {
    const t = now + i * 0.12 + (Math.random() * 0.04);
    const bufferSize = ctx.sampleRate * 0.06;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let j = 0; j < bufferSize; j++) {
      data[j] = (Math.random() * 2 - 1) * Math.exp(-j / (bufferSize * 0.2));
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1100 + Math.random() * 300;
    filter.Q.value = 2;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(masterGain!);

    noise.start(t);
  }
}

// 7. Heavy Sigh & Coffee Slurp
export function playHeavySigh() {
  const ctx = getAudioContext();
  const now = ctx.currentTime;

  // Pink noise burst for sigh
  const bufferSize = ctx.sampleRate * 0.8;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  let lastOut = 0.0;
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    lastOut = (lastOut + 0.02 * white) / 1.02;
    data[i] = lastOut * 3.5;
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(800, now);
  filter.frequency.exponentialRampToValueAtTime(200, now + 0.7);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.01, now);
  gain.gain.linearRampToValueAtTime(0.22, now + 0.2);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(masterGain!);

  noise.start(now);
}

// 8. Tardy Meeting Entry Chime (Elevator/Teams entry chime parody)
export function playTardyJoinChime() {
  const ctx = getAudioContext();
  const now = ctx.currentTime;

  const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
  notes.forEach((freq, idx) => {
    const t = now + idx * 0.09;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, t);

    gain.gain.setValueAtTime(0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);

    osc.connect(gain);
    gain.connect(masterGain!);

    osc.start(t);
    osc.stop(t + 0.45);
  });
}

// Emergency Panic Siren (Oscillator Loop)
export function startPanicSiren() {
  if (sirenOsc1 || sirenOsc2) return;

  const ctx = getAudioContext();
  sirenGain = ctx.createGain();
  sirenGain.gain.setValueAtTime(0.12, ctx.currentTime);
  sirenGain.connect(masterGain!);

  sirenOsc1 = ctx.createOscillator();
  sirenOsc1.type = 'sawtooth';
  sirenOsc1.frequency.setValueAtTime(650, ctx.currentTime);

  sirenOsc2 = ctx.createOscillator();
  sirenOsc2.type = 'square';
  sirenOsc2.frequency.setValueAtTime(800, ctx.currentTime);

  let highPitch = false;
  sirenInterval = setInterval(() => {
    if (!audioCtx || !sirenOsc1 || !sirenOsc2) return;
    const t = audioCtx.currentTime;
    highPitch = !highPitch;
    const f1 = highPitch ? 950 : 600;
    const f2 = highPitch ? 1150 : 750;
    sirenOsc1.frequency.linearRampToValueAtTime(f1, t + 0.2);
    sirenOsc2.frequency.linearRampToValueAtTime(f2, t + 0.2);
  }, 280);

  sirenOsc1.connect(sirenGain);
  sirenOsc2.connect(sirenGain);
  sirenOsc1.start();
  sirenOsc2.start();
}

export function stopPanicSiren() {
  if (sirenInterval) {
    clearInterval(sirenInterval);
    sirenInterval = null;
  }
  if (sirenOsc1) {
    try { sirenOsc1.stop(); sirenOsc1.disconnect(); } catch { /* ignore */ }
    sirenOsc1 = null;
  }
  if (sirenOsc2) {
    try { sirenOsc2.stop(); sirenOsc2.disconnect(); } catch { /* ignore */ }
    sirenOsc2 = null;
  }
  if (sirenGain) {
    try { sirenGain.disconnect(); } catch { /* ignore */ }
    sirenGain = null;
  }
}
