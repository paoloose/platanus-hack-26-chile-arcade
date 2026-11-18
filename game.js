// =====================================================================
// 5 NOCHES EN PLATANUS — Platanus Hack 26: Santiago
// La hackathon terminó. Los ganadores vuelan a San Francisco con Rafa y
// Nacho. Tú te quedaste con el turno de noche. No todos se fueron.
// You never leave the chair: cameras are your eyes, doors your last line.
// =====================================================================
(() => {
const W = 800, H = 600, M = Math, PI = M.PI;
const SAVE_KEY = 'fnap26-progress';
const rnd = (a, b) => a + M.random() * (b - a);
const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
const dist = (ax, ay, bx, by) => M.hypot(ax - bx, ay - by);
const lerp = (a, b, t) => a + (b - a) * t;
const pick = (a) => a[(M.random() * a.length) | 0];

// DO NOT replace existing keys — they match the physical arcade cabinet wiring.
const CABINET_KEYS = {
  P1_U: ['w'], P1_D: ['s'], P1_L: ['a'], P1_R: ['d'],
  P1_1: ['u'], P1_2: ['i'], P1_3: ['o'],
  P1_4: ['j'], P1_5: ['k'], P1_6: ['l'],
  P2_U: ['ArrowUp'], P2_D: ['ArrowDown'], P2_L: ['ArrowLeft'], P2_R: ['ArrowRight'],
  P2_1: ['r'], P2_2: ['t'], P2_3: ['y'],
  P2_4: ['f'], P2_5: ['g'], P2_6: ['h'],
  START1: ['Enter'], START2: ['2'],
};
// Single player game: both sticks drive the same guard.
const KEY2ACT = {};
for (const [code, keys] of Object.entries(CABINET_KEYS)) for (const k of keys) KEY2ACT[k.length == 1 ? k.toLowerCase() : k] = code.startsWith('START') ? 'S' : code.slice(3);
const held = {}, pressed = {};
const hd = (a) => !!held[a];
const pr = (a) => !!pressed[a];
const anyPr = () => ['1', '2', '3', '4', '5', '6', 'S'].some(pr);

// =====================================================================
// SPRITES (PCSEF, 24x24, PC-66 palette): one pose per character
// =====================================================================
const P_PAL=[0x6e2100,0xdeac92,0xfefdfe,0x000000,0xab8169,0x24222a,0xf7bb1b,0xd11717,0x254c93,0xd3cde7,0x333d8d,0xa4dbff,0x08b8ea,0x390800,0x8d00f9,0x4200a5,0xc1b087,0xa41c1c,0x4e4b5b,0x83fe6b,0xaba4c1,0x019000,0xf6629d,0x9f5611];
const SPR={"pitcher":"~~8.7A9.7.9A8.7.2A7B8.7.1A1B1C1D2B1C1D1B8.7.1A1B1C1D2B1C1D2B7.7.1E9B7.7.1E7D1B8.8.1B3C>8.1E5D1B9.9.1E3B9.2.7.3F4G2F8.6.4F1G1H2G3F7.^6.4F4G3F7.6.2B2F4G1F2B7.8.1F5I1F9.8.7I9.8.3I1.3I9.^^8.3J1.4J8.~","sleeper":"~~5.2C3.4K9.1.5.2C9K8.7.9K8.7.9C8.7.9B8.7.2B2D2B2D1B8.7.5B>7.1E3B2D3B8.8.1E2B2D2B9.9.1E3B9.2.7.2L1M2L1M2L9.6.3L1M2L1M6L2B3.^6.3L1M2L1M2L9.^7.2L1M2L1M1L9.1.^7.3L1.3L9.1.^7.3M1.3M9.1.7.3B1.4B9.~","mentora":"~5.3N9.7.5.9N1N9.6.9N1N8.6.3N7B8.6.2N4F1B4F7.6.2N1F2C1D1F2C1D1F7.6.2N1B3F1B3F2B6.6.2N1E2B3H2B8.7.2N1E5B9.9.1E3B9.2.7.2O1P2C1P2O9.6.3O1P2C1P1O4Q6.6.3O1P2O1P1O1Q2C1Q6.6.8O1B2C1Q6.6.8O4Q6.7.7O9.1.7.7F9.1.7.8F9.8.2B2.2B9.1.^^8.2H2.3H9.~","chef":"8.7C9.7.9C8.^8.1C1J1C1J1C1J1C9.8.7C9.8.7B9.8.1B2D2B2D9.8.1B1C1D2B1C1D1B8.8.4B>8.1E7D8.9.1E5B9.9.5H9.1.7.4C1H4C8.6.3C1D3C1D3C7.6.9C2C7.6.3C1D3C1D3C7.6.2B7C2B7.8.2C1R4C9.8.1C2R4C9.8.3S1.3S9.^^8.3D1.4D8.~","coder":"~~8.7S9.7.1S7F1S8.6.1S9F1S7.6.1S2F6B2S7.6.2F1B2T1D1B2T1D1F7.^6.2F1E7B1F7.6.3F1E4D1B1F8.7.3F1E3B2F8.8.7F9.7.4F1S4F8.6.5F1S3F5U4.6.5F1S2F1B1U3V1U4.6.5F1S2F1B1U1V1T1V1U4.6.9F5U4.7.7F9.1.7.7S9.1.7.3S1.3S9.1.^^7.3G1.4G9.~","fe":"~8.7P9.7.9P8.6.1U9P1U7.5.2U2P5B2P2U6.5.2U1P1B1C1D2B1C1D1P2U6.^6.1U1P7B1P8.7.1P1E2B2H2B1P8.7.2P1E4B2P8.8.1P1.1E2B1.1P9.7.8W9.6.5W1C4W8.^6.9W1W8.6.2B6W2B8.7.8W9.7.8I9.7.3I2.3I9.^^^7.3C2.4C8.~","be":"~8.7V9.7.9V8.7.1V1T1V1T1V1T1V1T1V8.7.9B8.7.1B1C1D3B1C1D1B8.7.1B1C1D3B1C1D2B7.7.9B8.7.3X3D3X8.7.9X8.8.7X9.6.9R2R7.5.2R1D2R1D2R1D4R6.5.9R4R6.5.2R1D2R1D2R1D4R6.5.9R4R6.5.2B9R2B6.6.9S2S7.7.3S3.3S8.^^^7.3D3.4D7.~"};
const CH = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%&*()_+-=[]{};:,/<?`"';
const CLR = {};
P_PAL.forEach((c, i) => (CLR[CH[i]] = c));
function parseCSEF(s, w) {
  const r = [], p = [];
  for (let i = 0; i < s.length;) {
    if (!p.length) {
      if (s[i] == '~') { r.push(Array(w).fill('.')); i++; continue; }
      if (s[i] == '^') { if (r.length) r.push([...r.at(-1)]); i++; continue; }
    }
    if (s[i] == '>' && p.length >= w / 2 && w % 2 == 0) {
      const h = p.slice(0, w / 2);
      r.push([...h, ...h.toReversed()]);
      p.length = 0; i++; continue;
    }
    const n = +s[i], c = s[i + 1];
    if (!n || n > 9) { i++; continue; }
    p.push(...Array(n).fill(c));
    while (p.length >= w) r.push(p.splice(0, w));
    i += 2;
  }
  if (p.length) r.push(p);
  return r;
}
const ROLES = Object.keys(SPR);

// =====================================================================
// AUDIO (pure WebAudio synthesis)
// =====================================================================
let AC = null, master, effectsGain, muffle, noiseBuf, ambG, droneG, droneF, buzzG, fanG;
// short codes for oscillator / filter types
const TY = { s: 'sine', q: 'square', w: 'sawtooth', t: 'triangle', l: 'lowpass', b: 'bandpass', h: 'highpass' };
function initAudio() {
  if (AC) { if (AC.state != 'running') AC.resume(); return; }
  try { AC = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { return; }
  const node = (k, type, f, to) => { const n = AC['create' + k](); if (type) n.type = TY[type]; if (f) n.frequency.value = f; n.connect(to); return n; };
  const gain = (v, to) => { const g = AC.createGain(); g.gain.value = v; g.connect(to); return g; };
  const comp = AC.createDynamicsCompressor();
  comp.threshold.value = -16; comp.ratio.value = 5; comp.connect(AC.destination);
  muffle = node('BiquadFilter', 'l', 9000, comp);
  master = gain(0.8, muffle);
  effectsGain = gain(M.SQRT1_2, master);
  const len = AC.sampleRate * 2;
  noiseBuf = AC.createBuffer(1, len, AC.sampleRate);
  const d = noiseBuf.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = M.random() * 2 - 1;
  // ambience: fluorescent hum + room tone
  ambG = gain(0, master);
  node('Oscillator', 'w', 50, node('BiquadFilter', 'l', 180, gain(0.05, ambG))).start();
  const rn = AC.createBufferSource(); rn.buffer = noiseBuf; rn.loop = true;
  rn.connect(node('BiquadFilter', 'l', 400, gain(0.05, ambG))); rn.start();
  // dread drone: detuned saws that open up as the night goes on
  droneG = gain(0, master);
  droneF = node('BiquadFilter', 'l', 120, droneG);
  for (const f of [41, 41.6, 61.7]) node('Oscillator', 'w', f, droneF).start();
  // The desk fan stays centered as you turn the chair.
  fanG = gain(0, master);
  const fn = AC.createBufferSource(), am = gain(0.5, fanG), lfo = node('Oscillator', 's', 15, gain(0.5, am.gain));
  fn.buffer = noiseBuf; fn.loop = true; fn.connect(node('BiquadFilter', 'b', 320, am)); fn.start(); lfo.start();
  // the flashlight bulb: a mains buzz with a crackle in it
  buzzG = gain(0, master);
  node('Oscillator', 'w', 120, node('BiquadFilter', 'b', 2400, buzzG)).start();
  const bn = AC.createBufferSource(); bn.buffer = noiseBuf; bn.loop = true; bn.playbackRate.value = 0.5;
  bn.connect(node('BiquadFilter', 'h', 5000, gain(0.4, buzzG))); bn.start();
}
function out() {
  const g = AC.createGain(); g.gain.value = 0;
  g.connect(effectsGain);
  return g;
}
function env(g, t, vol, dur, a) { g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + a); g.gain.exponentialRampToValueAtTime(0.0001, t + dur); }
// tone(freq, dur, type, vol, freqEnd, delay)
function tone(f, dur, type, vol, f2, dl) {
  if (!AC || vol <= 0.002) return;
  const t = AC.currentTime + (dl || 0), o = AC.createOscillator(), g = out();
  o.type = TY[type || 'q'];
  o.frequency.setValueAtTime(f, t);
  if (f2) o.frequency.exponentialRampToValueAtTime(M.max(20, f2), t + dur);
  env(g, t, vol, dur, 0.008);
  o.connect(g); o.start(t); o.stop(t + dur + 0.02);
}
// noise(dur, vol, filterType, freq, freqEnd, delay, q)
function noise(dur, vol, ft, f, f2, dl, q) {
  if (!AC || vol <= 0.002) return;
  const t = AC.currentTime + (dl || 0), s = AC.createBufferSource(), fl = AC.createBiquadFilter(), g = out();
  s.buffer = noiseBuf; s.playbackRate.value = rnd(0.8, 1.2);
  fl.type = TY[ft || 'l']; fl.frequency.setValueAtTime(f || 1000, t);
  if (q) fl.Q.value = q;
  if (f2) fl.frequency.exponentialRampToValueAtTime(f2, t + dur);
  env(g, t, vol, dur, 0.01);
  s.connect(fl); fl.connect(g); s.start(t, rnd(0, 1.5)); s.stop(t + dur + 0.05);
}
// sound effects (synthesized)
const sfxChair = (v) => { noise(0.5, 0.25 * v, 'b', 900, 300, 0, 5); noise(0.3, 0.18 * v, 'b', 1400, 700, 0.35, 6); };
const sfxStep = (v, dl) => { noise(0.07, 0.09 * v, 'l', 300, 0, dl); tone(70, 0.06, 's', 0.06 * v, 0, dl); };
const sfxBlip = (v, f) => tone(f || rnd(260, 520), 0.06, 'q', 0.05 * v);
const sfxBabble = (v, base) => { for (let i = 0; i < 5; i++) if (M.random() < 0.8) tone((base || 300) * rnd(0.8, 1.5), 0.05, 'q', 0.045 * v, 0, i * 0.075); };
const sfxSnore = (v) => { noise(1.1, 0.16 * v, 'b', 220, 650, 0, 4); noise(0.9, 0.12 * v, 'b', 600, 200, 1.25, 4); };
const sfxMurmur = (v) => { for (let i = 0; i < 4; i++) tone(rnd(170, 240), 0.14, 't', 0.07 * v, 0, i * 0.16); };
const sfxType = (v) => { for (let i = 0; i < 4; i++) noise(0.02, 0.12 * v, 'h', 3000, 0, i * rnd(0.05, 0.11)); };
const sfxDoor = () => { noise(0.25, 0.5, 'l', 500); tone(55, 0.3, 's', 0.5, 35); };
const sfxKnock = () => { for (let i = 0; i < 3; i++) { noise(0.08, 0.4, 'l', 350, 0, i * 0.22); tone(90, 0.1, 's', 0.3, 60, i * 0.22); } };
// a big rubber flashlight switch: a thunk and a click (on), just a click (off)
const sfxFlash = (on) => { noise(0.03, 0.22, 'h', 2500); tone(on ? 1900 : 1500, 0.02, 'q', 0.07); if (on) tone(90, 0.07, 's', 0.2, 60); };
const sfxClick = () => { tone(1800, 0.02, 'q', 0.08); noise(0.02, 0.1, 'h', 3000); };
const sfxCoffee = () => { for (let i = 0; i < 8; i++) noise(0.12, 0.12, 'b', rnd(300, 900), 0, i * 0.14, 6); };
// the phone bell rings live (so it stops the moment you answer): two bells,
// a clapper alternating between them, double ring then a pause
let ringN = null;
function ringBell(on) {
  if (!AC) return;
  if (!ringN) ringN = [1190, 1430].map((f) => { const o = AC.createOscillator(), g = AC.createGain(); o.type = 'triangle'; o.frequency.value = f; g.gain.value = 0; o.connect(g); g.connect(master); o.start(); return [o, g]; });
  const k = ((modeT * 44) | 0) % 2;
  ringN.forEach(([, g], i) => g.gain.setTargetAtTime(on && k == i ? 0.1 : 0, AC.currentTime, 0.004));
}
function ringStop() { if (ringN) ringN.forEach(([o, g]) => { g.gain.value = 0; o.stop(); }); ringN = null; }
const sfxYawn = () => { tone(330, 1.2, 'w', 0.05, 160); noise(1.2, 0.08, 'b', 500, 250, 0, 2); };
const sfxHeart = (v) => { tone(55, 0.12, 's', 0.35 * v, 40); tone(50, 0.14, 's', 0.25 * v, 38, 0.2); };
const sfxEat = () => { for (let i = 0; i < 5; i++) noise(0.06, 0.2, 'b', 500, 0, i * 0.15, 3); };
// the screamer (FNAF2-style): a stack of detuned saws, warbling fast, driven
// into hard clipping, plus the hiss of a blown speaker and a hit. p = pitch per character
const sfxScream = (p) => {
  if (!AC) return;
  const t = AC.currentTime, ws = AC.createWaveShaper(), cv = new Float32Array(512), g = out(), lfo = AC.createOscillator(), lg = AC.createGain();
  for (let i = 0; i < 512; i++) cv[i] = M.tanh((i / 256 - 1) * 8);
  ws.curve = cv; ws.connect(g);
  g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.75, t + 0.015); g.gain.setValueAtTime(0.75, t + 1.05); g.gain.exponentialRampToValueAtTime(0.0001, t + 1.7);
  lfo.frequency.value = 34; lg.gain.value = 140 * p; lfo.connect(lg); lfo.start(t); lfo.stop(t + 1.8);
  for (const f of [560, 590, 840, 1180, 1660]) {
    const o = AC.createOscillator(), og = AC.createGain();
    o.type = 'sawtooth'; og.gain.value = 0.25;
    o.frequency.setValueAtTime(f * p * 0.6, t); o.frequency.exponentialRampToValueAtTime(f * p, t + 0.1); o.frequency.exponentialRampToValueAtTime(f * p * 0.85, t + 1.6);
    lg.connect(o.frequency); o.connect(og); og.connect(ws); o.start(t); o.stop(t + 1.8);
  }
  noise(1.5, 0.5, 'b', 2400 * p, 1100, 0, 0.9);
  tone(60, 0.45, 's', 0.9, 28); noise(0.25, 0.8, 'l', 300);
};
const sfxSix = () => {
  [523, 659, 784, 1046, 784, 1046].forEach((f, i) => tone(f, 0.5, 't', 0.22, 0, i * 0.18));
  for (let i = 0; i < 26; i++) noise(0.05, 0.18 * rnd(0.4, 1), 'b', rnd(1200, 3500), 0, rnd(0, 1.6), 2);
};
const sfxStatic = (d) => noise(d || 0.5, 0.25, 'h', 800);
const sfxErr = () => { tone(200, 0.15, 'q', 0.12); tone(150, 0.2, 'q', 0.12, 0, 0.15); };
const sfxBreath = (v) => { noise(1.2, 0.07 * v, 'b', 700, 400, 0, 2); noise(1.0, 0.05 * v, 'b', 500, 800, 1.4, 2); };
const sfxFar = () => {
  if (M.random() < 0.5) { noise(0.5, 0.18, 'l', 400); tone(50, 0.4, 's', 0.2, 35); }
  else for (let i = 0; i < 4; i++) sfxStep(0.5 + i * 0.15, i * 0.4);
};
// Room movement uses the same footsteps, louder near the office.
function sfxRoom(v) {
  for (let i = 0; i < 3; i++) sfxStep(v, i * 0.32);
}
// the floorboard right outside a door: someone just stepped into your doorway
const sfxCreak = () => { noise(0.7, 0.16, 'b', 320, 170, 0, 9); tone(150, 0.55, 't', 0.035, 105); };
// your chair turning
const sfxSwivel = () => noise(0.16, 0.035, 'b', 1300, 650, 0, 4);
// the sleepwalker stirs: "mm...?"
const sfxStir = () => {
  noise(.24, .34, 'h', 1500, 650);
  noise(.15, .20, 'b', 960, 330, .12, 2);
};
// something is in the room with you
const sfxGroan = () => { tone(46, 2.6, 's', 0.1, 38); noise(2.6, 0.05, 'l', 160, 60); };

// =====================================================================
// WORLD — the venue is a graph of rooms joined by doorways (FNAF-style map).
// Every room has its own floor plan (w x d units, walls 240 high), a camera
// (position + look-at point), exits [to, wall, offset] and spots to stand on.
//
//      COCINA(6) · CÓDIGO(1A) · PITCH(1C)
//                  COMEDOR(1B) · BAÑOS(7)
//   SIESTA(5) PASILLO O(2A)  CENTRAL(9)  PASILLO E(4A) LOBBY(8)
//   BODEGA(3)  ESQUINA O(2B) [ OFICINA ] ESQUINA E(4B)
// =====================================================================
const CTRL = 13; // your office: three entrances, no camera
// [name, cam, w, d, map rect, floor A, floor B, wall, tile, camera [x,y,z, look x,y,z, focal], exits, spots]
const ROOMS = [
  ['SALA DE CÓDIGO', '1A', 700, 500, [110, 0, 80, 36], '#3c4048', '#34373e', '#26303a', 100, [350, 490, 185, 350, 160, 95, 500], [[3, 'S', 350]], [[350, 380]]],
  ['SALA DE PITCH', '1C', 700, 600, [215, 2, 85, 42], '#5a1a22', '#4a1219', '#2a2230', 70, [660, 580, 210, 330, 160, 70, 430], [[3, 'S', 120]], [[200, 260], [480, 250]]],
  ['COCINA', '6', 600, 500, [0, 2, 85, 42], '#c9c9c0', '#3a3a3a', '#6e6a5c', 80, [20, 490, 240, 380, 150, 50, 430], [[3, 'E', 250]], [[300, 200], [420, 330]]],
  ['COMEDOR', '1B', 1000, 700, [60, 52, 180, 52], '#5c5a58', '#4a4846', '#3a3438', 100, [980, 20, 240, 430, 470, 0, 400], [[0, 'N', 250], [1, 'N', 750], [2, 'W', 200], [4, 'E', 200], [7, 'S', 150], [12, 'S', 500], [9, 'S', 850]], [[300, 280], [600, 420], [450, 560], [760, 320]]],
  ['BAÑOS', '7', 520, 440, [248, 60, 52, 36], '#d8dcdc', '#9aa2a4', '#5a6a6e', 52, [500, 420, 225, 200, 130, 30, 430], [[3, 'W', 300]], [[150, 320], [380, 230]]],
  ['SALA DE SIESTA', '5', 600, 500, [0, 114, 56, 46], '#1f2c4a', '#24335a', '#1c1c2c', 100, [570, 30, 200, 230, 300, 0, 430], [[7, 'E', 250]], [[300, 300], [180, 400]]],
  ['BODEGA', '3', 300, 300, [0, 170, 50, 36], '#4a3f30', '#3a3226', '#2e2a24', 60, [270, 280, 200, 60, 60, 60, 380], [[7, 'E', 150]], [[150, 200]]],
  ['PASILLO OESTE', '2A', 260, 900, [64, 112, 22, 102], '#2e3034', '#24262a', '#3a3f4a', 65, [130, 880, 200, 130, 80, 70, 460], [[3, 'N', 130], [5, 'W', 250], [6, 'W', 600], [8, 'S', 130]], [[130, 300], [130, 560]]],
  ['ESQUINA OESTE', '2B', 300, 300, [64, 216, 46, 24], '#2a2c30', '#202226', '#343a44', 75, [30, 30, 220, 230, 190, 50, 420], [[7, 'N', 150], [CTRL, 'E', 150]], [[120, 130]]],
  ['PASILLO ESTE', '4A', 260, 900, [214, 112, 22, 102], '#2e3034', '#24262a', '#3a3f4a', 65, [130, 20, 220, 130, 820, 30, 460], [[3, 'N', 130], [11, 'E', 400], [10, 'S', 130]], [[130, 300], [130, 560]]],
  ['ESQUINA ESTE', '4B', 300, 300, [190, 216, 46, 24], '#2a2c30', '#202226', '#343a44', 75, [270, 30, 220, 70, 190, 50, 420], [[9, 'N', 150], [CTRL, 'W', 150]], [[180, 130]]],
  ['LOBBY', '8', 700, 500, [244, 128, 56, 48], '#5c5a58', '#666462', '#3e4a40', 100, [670, 470, 200, 300, 160, 60, 430], [[9, 'W', 250]], [[300, 200], [450, 300], [200, 330]]],
  ['PASILLO CENTRAL', '9', 260, 700, [139, 112, 22, 84], '#26282c', '#1e2024', '#33363e', 65, [130, 20, 220, 130, 640, 30, 460], [[3, 'N', 130], [CTRL, 'S', 130]], [[130, 220], [130, 400]]],
];
// Screen neighbors, independent of the corridors enemies use to travel.
const CAMERA_LINKS = [
  { L:2, R:1, D:3 },        // 1A
  { L:0, D:4 },             // 1C
  { R:0, D:3 },             // 6
  { L:2, R:4, U:0, D:12 },  // 1B
  { L:3, U:1, D:11 },       // 7
  { R:7, U:2, D:6 },        // 5
  { R:7, U:5, D:8 },        // 3
  { L:5, R:12, U:3, D:8 },  // 2A
  { L:6, R:10, U:7 },       // 2B
  { L:12, R:11, U:3, D:10 },// 4A
  { L:8, R:11, U:9 },       // 4B
  { L:9, U:4, D:10 },       // 8
  { L:7, R:9, U:3, D:8 },   // 9
];
const OFFICE_MAP = [118, 200, 64, 40];
// how much light each room has of its own on camera (without your flashlight):
// the code room's laptops, the projector, the kitchen... and the rooms right
// next to you are pitch black: there you have to light it to see who's coming
const AMB = [0.42, 0.54, 0.36, 0.3, 0.3, 0.2, 0.16, 0.2, 0.06, 0.2, 0.06, 0.32, 0.06];
const NB = ROOMS.map((R) => R[10].map((x) => x[0]));
NB[CTRL] = [8, 12, 10];
const CDOOR = { W: { adj: 8 }, N: { adj: 12 }, E: { adj: 10 } };
const ADOOR = ['W', 'N', 'E'], SIDES = ['W', 'E']; // N is the open front hallway: no door
const ROAM = [0, 1, 2, 3, 4, 5, 6, 7, 9, 11]; // where people wander (never the corners or the front hallway)
const ek = (a, b) => (a < b ? a + '-' + b : b + '-' + a);
// the spot just inside room a, at the doorway that leads to room b
function exitPt(a, b) {
  const R = ROOMS[a], [, s, o] = R[10].find((x) => x[0] == b);
  return s == 'N' ? [o, 40] : s == 'S' ? [o, R[3] - 40] : s == 'W' ? [40, o] : [R[2] - 40, o];
}
function bfs(a, b, blk) {
  if (a == b) return [a];
  const prev = { [a]: -1 }, q = [a];
  while (q.length) {
    const r = q.shift();
    for (const n of NB[r]) {
      if (n in prev || blk.has(ek(r, n))) continue;
      prev[n] = r;
      if (n == b) { const p = [b]; let k = b; while (prev[k] != -1) p.unshift((k = prev[k])); return p; }
      q.push(n);
    }
  }
  return null;
}
const HOP = ROOMS.map((_, r) => bfs(r, CTRL, new Set()).length - 1).concat(0); // rooms away from your office
const mapC = (r) => { const m = r == CTRL ? OFFICE_MAP : ROOMS[r][4]; return [m[0] + m[2] / 2, m[1] + m[3] / 2]; };
const PITCH_HOME = [350, 130], SLEEP_HOME = [220, 250], CHEF_HOME = [150, 120], SEATS = { fe: 180, coder: 350, be: 520 };
const CHEF_POS = [CHEF_HOME, [300, 250], [520, 250]];
// the blind spot right outside each of your doors (no camera sees it)
const blindPt = (d) => exitPt(CDOOR[d].adj, CTRL);
const blindDoor = (e) => ADOOR.find((d) => e.r == CDOOR[d].adj && dist(e.x, e.y, ...blindPt(d)) < 110);

// =====================================================================
// NIGHTS — hl = seconds per in-game hour.
// AI levels 0..20, FNAF-style: every few seconds each one gets a movement
// opportunity and takes a step if rnd(20) < level. Active levels get +1 at
// 2, 3 and 4 AM, so every night gets worse towards the morning.
// Seconds per hour, base drain, sleep time, first wake hour, pitch patience,
// required flashes, movement levels, and power multiplier.
const FINAL_NIGHT_POWER_USE = 99 / 110;
const NIGHTS = [
  [22, .10, 110, 2, 0, 0, 7, 0, 0, 10, 1.45],
  [170 / 6, .10, 115, 2, 0, 0, 7, 6, 0, 10, 1.22],
  [205 / 6, .11, 115, 2.2, 48, 2, 8, 7, 10, 11, 1.06],
  [230 / 6, .11, 112, 1.6, 43, 3, 9, 8, 11, 12, .98],
  [40, .12, 110, 2.45, 38, 3, 10, 9, 12, 13, .82 * FINAL_NIGHT_POWER_USE],
];
const LV = { fe: 6, be: 7, pitcher: 8, sleeper: 9 };
const FINAL_NIGHT_START = { coder: 15, fe: 34, mentora: 54, pitchDrain: 36, be: 92 };
const CALLS = [
  'RAFA|¿Aló? ¿Aló?|¿Tú eres el del aviso del diario? ¿El nuevo guardia? Perfecto. Soy Rafa, uno de los organizadores de Platanus Hack.|La hackathon terminó el domingo. Los ganadores, Nacho y yo vamos camino a San Francisco. Solo tienes que cuidar el edificio hasta que volvamos.|Es un trabajo tranquilo. Te sientas en la sala de vigilancia, revisas de vez en cuando, y a las seis te vas a tu casa.|...|Ehm... Hay un detalle. No todos los participantes se fueron a su casa.|Algunos no quisieron irse. Llevan días sin dormir y no están... del todo bien.|El equipo que perdió sigue codeando. Levanta la tableta con B3 para empezar. Si alumbras la sala de código con B1, verás a los tres en sus puestos.|Si el de la izquierda se levanta y se te acerca, cierra la puerta. No intentes razonar con él.|Y si escuchas a alguien respirando cerca, despacito, como dormido... no lo despiertes. Por nada del mundo. Ni un ruido.|La luz del edificio es limitada, así que no la malgastes. Y hay café. Te va a hacer falta.|Ya tengo que subir al avión. Mañana te llamo. Suerte.',
  'RAFA|¿Aló? ¡Sobreviviste! Bueno, claro que sí, si era tranquilo.|Nosotros ya estamos en San Francisco. Todo carísimo, pero bonito.|...|Te cuento algo... El año pasado también contratamos a un guardia.|Duró dos noches. Lo último que dijo por la radio fue "me están dando feedback". Nunca entendimos qué quiso decir.|¿Te acuerdas de la silla vacía? Hoy también se va a levantar Backend. Frontend viene por la izquierda y Backend por la derecha.|Síguelos por las cámaras. Revisa la esquina izquierda (2B) y la derecha (4B) antes de cerrar una puerta. Si a esta hora alguien te dice que le falta un puro commit, no le creas.|¡Ups! Ya viene el Waymo. Chao.',
  'RAFA|Hola, hola. Acá en San Francisco hace un frío terrible. Nadie nos avisó.|Oye... ¿sigue ahí el cabro que no ha terminado su presentación? Lleva en la misma diapositiva desde el viernes.|Le da terror el silencio entre diapositivas. En la cámara de pitch, mantén B2 para pasárselas. Si nadie lo pesca, se pone nervioso y sale a buscar público.|Si viene hacia ti... luz en la cara. Varios destellos, como en un escenario.|Pero antes de alumbrar a alguien, asegúrate de quién es. Si son ronquidos, apaga la luz y deja quietas las puertas, la tableta y el café.|...|Otra cosa. Revisé las grabaciones del lunes. Había alguien en la bodega. Pero el lunes el edificio estaba cerrado.|Seguro es un error del sistema.|Seguro...|Tenemos demo con unos inversionistas. ¡Mañana te llamo!',
  'RAFA|Hola... perdona la hora. Acá es de día y allá es de noche, me confundo.|Oye... ¿la mentora sigue ahí?|Nadie le pidió feedback en todo el fin de semana. Nadie. Eso a una mentora le hace mal.|Si la oyes preguntar por alguien, busca la sala que parpadea en morado. Ahí hay un altavoz. Abre esa cámara y pulsa B2 para llamarla a esa sala.|Anda buscando a quién darle feedback. Con que crea que alguien levantó la mano, parte para allá.|Si ya la tienes afuera, escucha de qué lado viene y cierra esa puerta.|...|El chef sigue en la cocina contando las porciones del bajón. La tableta lo frena mientras sigue ahí. Si ves la cocina vacía o escuchas que viene corriendo, baja la tableta y cierra la puerta izquierda.|Oye, ¿te puedo pedir un favor?|No le cuentes a nadie de esto. Platanus tiene una reputación que cuidar.|...|Gracias.',
  'NACHO|¿Aló? Soy Nacho. Rafa se quedó dormido, le tomé el teléfono.|...|Él no te iba a decir esto, pero creo que tienes derecho a saber.|El guardia del año pasado no renunció. Entró a su quinta noche... y no supimos más de él.|Y hay un muchacho que se está colgando de la luz del edificio. Si la batería se va muy rápido, es su culpa.|Puedes cortarle el enchufe manteniendo B2 en la sala de código. Va a venir a reclamar a una de tus puertas. Sé rápido y ciérrala.|Mañana devolvemos el edificio, suerte!|Ah… y una cosa más—',
].map((s) => s.split('|'));

// =====================================================================
// GAME STATE
// =====================================================================
let S, mode = 'title', modeT = 0, saved = { night: 1 }, menuNight = 1, FX = null;
// the night in progress (reset by startNight)
let lesson, firstDeparture, scareTablet;
let NN, camLit, litN, night, hl, pitchOn, patience, flashes, pgrace, wakeH, drain, mentoraOn, coderOn, sueRate, nightLen, now, prevCam, lostHint, power, sueno, blackout, cutAt, view, va, pan, panV, focus, camR, statA, light, doors, doorP, flash, hallu, plug, cutH, cof, cofT, cofHold, drink, lidY,
  blink, blinkT, blinkDur, dread, heartT, msgT, flick, scareT, phone, thought, thOnce, doomed, clicking, clickT, yawn1, yawn2,
  usage, lostTo, loseT, scrOn, scrDelay, E;
// how many times each control has been used: prompts fade once learned
const HINT = { light: 0, door: 0, slide: 0 };
const learned = (k, n) => HINT[k] >= (n || 3);

class HorrorPipeline extends Phaser.Renderer.WebGL.Pipelines.PostFXPipeline {
  constructor(game) {
    super({
      game, name: 'Horror',
      // unv = on the cameras, ulit = the camera flashlight, uamb = how much light
      // the room has of its own, uof = the office (bent like a cylinder). Office and cameras
      // share the grain, aberration, vignette and drowsy warp; the cameras add a
      // cheap old CCTV: low resolution, tracking wobble, a rolling band, washed
      // out dingy colour, and darkness unless you light it.
      fragShader: `precision mediump float;
uniform sampler2D uMainSampler;uniform float uT,unv,uno,uab,udk,uwp,ulit,uamb,uof;varying vec2 outTexCoord;
float R(vec2 c){return fract(sin(dot(c,vec2(12.9898,78.233)))*43758.5453);}
void main(){vec2 uv=outTexCoord;vec2 cc=uv-.5;
uv=.5+cc*(1.+dot(cc,cc)*(.06+.1*unv));
uv.y=.5+(uv.y-.5)*(1.-uof*.5*cc.x*cc.x);
uv.x+=uwp*.004*sin(uv.y*40.+uT*9.);
float rb=fract(uv.y*.7+uT*.11),bd=smoothstep(.0,.05,rb)*smoothstep(.12,.07,rb);
uv.x+=unv*(.0012*sin(uv.y*230.+uT*40.)+bd*.007*(R(vec2(floor(uv.y*120.),floor(uT*24.)))-.5));
vec2 q=mix(uv,(floor(uv*vec2(320.,240.))+.5)/vec2(320.,240.),unv);
float a=.0008+min(uab,1.5)*.0035+unv*.0025;
vec4 c=texture2D(uMainSampler,q);c.r=texture2D(uMainSampler,q+vec2(a,0.)).r;c.b=texture2D(uMainSampler,q-vec2(a,0.)).b;
float l=dot(c.rgb,vec3(.3,.59,.11));
float sp=1.-smoothstep(.12,.78,length(cc*vec2(1.25,1.)));
vec3 k=mix(vec3(l),c.rgb,.32)*vec3(1.,.9,.74)*mix(uamb,.5+.85*sp,ulit);
k=pow(k,vec3(1.18))+vec3(.012,.01,.008)+bd*.05;
c.rgb=mix(c.rgb,k,unv);
c.rgb+=(R(floor(uv*vec2(320.,240.))+fract(uT)*91.)-.5)*(.05+uno+unv*.07);
c.rgb*=1.-.13*(sin(uv.y*900.)*.5+.5)*(.35+unv*.6);
c.rgb*=clamp(1.-dot(cc,cc)*(1.1+udk*2.4+unv*.8),0.,1.);
if(uv.x<0.||uv.x>1.||uv.y<0.||uv.y>1.)c.rgb=vec3(0.);
gl_FragColor=vec4(c.rgb,1.);}`,
    });
  }
  onPreRender() {
    const f = FX || {};
    this.set1f('uT', (f.t || 0) % 1000);
    for (const k of ['nv', 'no', 'ab', 'dk', 'wp', 'lit', 'amb', 'of']) this.set1f('u' + k, f[k] || 0);
  }
}

new Phaser.Game({
  type: Phaser.AUTO, width: W, height: H, parent: 'game-root', backgroundColor: '#000000', pixelArt: true,
  scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH, width: W, height: H },
  pipeline: { Horror: HorrorPipeline },
  scene: { create, update },
});

// =====================================================================
// TEXTURE GENERATION
// =====================================================================
function canvasTex(key, w, h, draw) { const t = S.textures.createCanvas(key, w, h); draw(t.getContext()); t.refresh(); }
const spriteTex = (key, rows) => canvasTex(key, rows[0].length, rows.length, (c) => rows.forEach((row, y) => row.forEach((ch, x) => {
  if (CLR[ch] != null) { c.fillStyle = '#' + CLR[ch].toString(16).padStart(6, '0'); c.fillRect(x, y, 1, 1); }
})));
function buildSprites() {
  for (const role of ROLES) {
    const rows = parseCSEF(SPR[role], 24);
    spriteTex(role + '0', rows);
    let top = 0; while (rows[top].every((c) => c == '.')) top++;
    spriteTex(role + 'H', rows.slice(top, top + 14)); // the face in CCTV hallucinations
  }
}
// The banana. Not the inflatable one from the lobby. You only see it when you fall asleep.
function bananaTex() {
  canvasTex('banana0', 24, 24, (c) => {
    const px = (col, x, y, w = 1, h = 1) => { c.fillStyle = col; c.fillRect(x, y, w, h); };
    for (let y = 1; y < 21; y++) {
      const t = (y - 1) / 19, cx = 13 - 4 * M.sin(PI * t), hw = M.round(1 + 4 * M.sin(PI * t) ** 0.6), a = M.round(cx - hw), b = M.round(cx + hw);
      px('#f2c418', a, y, b - a + 1); px('#fde68a', a, y); px('#b8860b', b - 1, y, 2);
      if (y > 14) px('#7a5a10', a + 1, y); // bruises
    }
    px('#5a3a10', 13, 0, 2); px('#3a2408', 12, 20, 3);
    for (const [x, y] of [[3, 12], [2, 13], [2, 14], [1, 15], [15, 12], [16, 13], [16, 14], [17, 15], [11, 21], [11, 22], [10, 23], [14, 21], [14, 22], [15, 23]]) px('#2a1a08', x, y); // stick arms and legs
    px('#000', 7, 6, 2, 2); px('#000', 11, 6, 2, 2); px('#fff', 8, 6); px('#fff', 11, 6); // hollow eyes, pinpoint pupils
    px('#000', 5, 9); px('#000', 13, 9); px('#000', 6, 10, 7, 2); // a grin that is too wide
    for (const x of [6, 8, 10, 12]) px('#e8e8d8', x, 10);
  });
}
function buildFxTex() {
  bananaTex();
  const pix = (key, w, h, f) => canvasTex(key, w, h, (c) => {
    const img = c.createImageData(w, h);
    for (let i = 0; i < w * h; i++) { const v = f(i % w, (i / w) | 0); img.data.set([v[0], v[0], v[0], v[1]], i * 4); }
    c.putImageData(img, 0, 0);
  });
  pix('cone', 256, 160, (x, y) => {
    const dy = y - 80, d = M.hypot(x, dy), a = M.abs(M.atan2(dy, x + 0.001));
    let v = a < 0.42 && d < 256 ? M.max(0, (1 - (a / 0.42) ** 3) * (1 - (d / 256) ** 2.2)) : 0;
    if (d < 16) v = M.max(v, 0.7 * (1 - d / 16));
    return [255, v * 255];
  });
  pix('noise', 200, 150, () => [M.random() * 255, 255]);

}

// ---- Camera shots: every room is a small 3D box seen from its own camera
// (corners, hallways, a close-up of the team). setCam() picks the camera,
// P() projects a world point to [screen x, screen y, scale] in the 1000px shot.
const CAMW = 1000, WH = 240, NEAR = 8;
let CAM;
function setCam([x, y, z, tx, ty, tz, f]) {
  const a = M.atan2(tx - x, -(ty - y)), b = M.atan2(z - tz, M.hypot(tx - x, ty - y));
  CAM = [x, y, z, M.sin(a), -M.cos(a), M.cos(b), M.sin(b), f];
}
// world -> camera space [right, up, depth]
function cs(x, y, z) {
  const [cx, cy, cz, fx, fy, cb, sb] = CAM, dx = x - cx, dy = y - cy, D = dx * fx + dy * fy, Y = z - cz;
  return [dx * -fy + dy * fx, D * sb + Y * cb, D * cb - Y * sb];
}
const scr = (q) => [CAMW / 2 + CAM[7] * q[0] / q[2], H / 2 - CAM[7] * q[1] / q[2], CAM[7] / q[2]];
const P = (x, y, z) => { const q = cs(x, y, z || 0); return q[2] > NEAR ? scr(q) : null; };
// a flat polygon in the world, clipped at the camera and darker with distance
function poly(c, col, pts) {
  const Q = pts.map((p) => cs(...p)), o = [];
  Q.forEach((a, i) => {
    const b = Q[(i + 1) % Q.length];
    if (a[2] >= NEAR) o.push(a);
    if ((a[2] >= NEAR) != (b[2] >= NEAR)) { const t = (NEAR - a[2]) / (b[2] - a[2]); o.push(a.map((v, k) => v + (b[k] - v) * t)); }
  });
  if (o.length < 3) return;
  c.beginPath(); o.forEach((q, i) => { const [sx, sy] = scr(q); i ? c.lineTo(sx, sy) : c.moveTo(sx, sy); });
  c.fillStyle = col; c.fill();
  c.fillStyle = 'rgba(0,0,0,' + M.min(0.8, o.reduce((s, q) => s + q[2], 0) / o.length / 2200) + ')'; c.fill();
}
// a box on the floor: [x, y, w, d, h, front, top, side, z0]; only the faces you can see
function box(c, [x, y, w, d, h, fr, tp, sd, z0 = 0]) {
  const [cx, cy, cz] = CAM, x2 = x + w, y2 = y + d, z2 = z0 + h;
  if (cz > z2) poly(c, tp, [[x, y, z2], [x2, y, z2], [x2, y2, z2], [x, y2, z2]]);
  if (cy < y) poly(c, fr, [[x, y, z0], [x2, y, z0], [x2, y, z2], [x, y, z2]]);
  if (cy > y2) poly(c, fr, [[x, y2, z0], [x2, y2, z0], [x2, y2, z2], [x, y2, z2]]);
  if (cx < x) poly(c, sd, [[x, y, z0], [x, y2, z0], [x, y2, z2], [x, y, z2]]);
  if (cx > x2) poly(c, sd, [[x2, y, z0], [x2, y2, z0], [x2, y2, z2], [x2, y, z2]]);
}
// draw boxes far to near
const boxes = (c, L) => L.map((b) => [b, -cs(b[0] + b[2] / 2, b[1] + b[3] / 2, 0)[2]]).sort((a, b) => a[1] - b[1]).forEach((b) => box(c, b[0]));
// a rectangle on a wall: wall side, from offset a to b, heights z0..z1
function wq(R, s, a, b, z0, z1) {
  const w = R[2], d = R[3], p = (o, z) => (s == 'N' ? [o, 0, z] : s == 'S' ? [o, d, z] : s == 'W' ? [0, o, z] : [w, o, z]);
  return [p(a, z0), p(b, z0), p(b, z1), p(a, z1)];
}
function wtext(c, R, s, o, z, str, size, col) {
  const q = P(...wq(R, s, o, o, z, z)[0]);
  if (!q) return;
  c.fillStyle = col; c.font = 'bold ' + ((size * q[2]) | 0) + 'px monospace'; c.textAlign = 'center'; c.fillText(str, q[0], q[1]);
}
function shell(c, R) {
  const [, , w, d, , fA, fB, wall, t] = R;
  c.fillStyle = '#050506'; c.fillRect(0, 0, CAMW, H);
  poly(c, '#0d0d10', [[0, 0, WH], [w, 0, WH], [w, d, WH], [0, d, WH]]); // ceiling
  for (let y = 0; y < d; y += t) for (let x = 0; x < w; x += t) poly(c, ((x + y) / t) % 2 ? fA : fB, [[x, y, 0], [M.min(w, x + t), y, 0], [M.min(w, x + t), M.min(d, y + t), 0], [x, M.min(d, y + t), 0]]);
  for (const [s, L] of [['N', w], ['S', w], ['W', d], ['E', d]]) {
    poly(c, wall, wq(R, s, 0, L, 0, WH));
    if (s > 'N') poly(c, 'rgba(0,0,0,.3)', wq(R, s, 0, L, 0, WH)); // side walls a bit darker
    poly(c, 'rgba(255,255,255,.07)', wq(R, s, 0, L, 18, 24)); // baseboard
  }
  for (const [to, s, o] of R[10]) {
    poly(c, '#030303', wq(R, s, o - 50, o + 50, 0, 165)); // doorway
    poly(c, to == CTRL ? '#a22' : '#0c6', wq(R, s, o - 22, o + 22, 178, 196)); // exit sign (red: your office)
  }
}
function hallPosters(c, R, side, positions, color, accent, accentColor) {
  for (const y of positions) poly(c, color, wq(R, side, y, y + 70, 90, 180));
  poly(c, accentColor, wq(R, side == 'W' ? 'E' : 'W', accent, accent + 70, 90, 180));
}
// props of each room (camera-dependent, so they live with the room)
const PROPS = [
  // 1A CÓDIGO: the team's corner, banner and a whiteboard full of diagrams (the desk is foreground)
  (c, R) => { poly(c, '#ddd', wq(R, 'N', 70, 300, 95, 200)); poly(c, '#246', wq(R, 'N', 90, 280, 150, 154)); wtext(c, R, 'N', 500, 175, 'SHIP IT', 30, '#9cf'); boxes(c, [[600, 20, 80, 60, 160, '#222', '#333', '#111']]); },
  // 1C PITCH: stage, projector screen, rows of seats
  (c, R) => { poly(c, '#111', wq(R, 'N', 195, 505, 100, 210)); wtext(c, R, 'N', 110, 175, 'DEMO DAY', 24, '#ffe'); boxes(c, [[80, 0, 540, 100, 30, '#16161b', '#2b2b33', '#101014'], [520, 50, 40, 40, 80, '#665', '#998', '#554'], ...[300, 390, 480].flatMap((y) => [120, 200, 280, 380, 460, 540].map((x) => [x, y, 40, 34, 42, '#7a2030', '#9a3040', '#5a1020']))]); },
  // 6 COCINA: counters, stove, fridge, island with leftovers
  (c, R) => { wtext(c, R, 'N', 300, 170, 'BAJÓN 24/7', 26, '#eee'); boxes(c, [[0, 0, 380, 70, 90, '#8d8778', '#b5b0a0', '#6d6758'], [470, 0, 110, 80, 200, '#d8d8d8', '#eee', '#aaa'], [210, 300, 170, 70, 80, '#8d8778', '#b5b0a0', '#6d6758'], [230, 315, 30, 20, 30, '#e8d', '#e8d', '#e8d', 80], [320, 320, 30, 20, 30, '#ec5', '#ec5', '#ec5', 80]]); poly(c, '#222', [[100, 10, 91], [240, 10, 91], [240, 60, 91], [100, 60, 91]]); },
  // 1B COMEDOR: long tables and benches, banner
  (c, R) => { wtext(c, R, 'N', 500, 180, 'PLATANUS HACK 26', 30, '#ffd400'); boxes(c, [150, 450, 750].flatMap((x) => [180, 420].flatMap((y) => [[x - 100, y - 40, 200, 80, 72, '#8a6a4a', '#a8845e', '#6a4a2a'], [x - 100, y - 80, 200, 26, 40, '#5a3a2a', '#6a4a3a', '#4a2a1a'], [x - 100, y + 54, 200, 26, 40, '#5a3a2a', '#6a4a3a', '#4a2a1a']]))); },
  // 7 BAÑOS: sinks, mirror and stalls
  (c, R) => {
    poly(c, '#9bb', wq(R, 'N', 30, 200, 110, 190)); poly(c, '#cde', wq(R, 'N', 40, 190, 118, 182)); // mirror
    boxes(c, [[30, 0, 170, 50, 85, '#ddd', '#eee', '#bbb'], ...[240, 330, 420].map((x) => [x, 0, 80, 120, 170, '#7a8a8e', '#9aaaae', '#5a6a6e'])]); // sinks, stalls
    for (const x of [240, 330, 420]) poly(c, '#8c9ca0', [[x + 10, 120, 12], [x + 70, 120, 12], [x + 70, 120, 150], [x + 10, 120, 150]]); // stall doors
    wtext(c, R, 'N', 380, 200, 'WC', 22, '#bcc');
  },
  // 5 SIESTA: mats, beanbags, his red beanbag
  (c, R) => { wtext(c, R, 'N', 300, 160, 'SILENCIO', 26, '#88a'); for (let i = 0; i < 5; i++) poly(c, '#344a7a', [[60 + i * 100, 120, 1], [140 + i * 100, 120, 1], [140 + i * 100, 200, 1], [60 + i * 100, 200, 1]]); boxes(c, [[170, 230, 110, 70, 30, '#c43', '#d54', '#a32'], [420, 330, 90, 80, 40, '#3a6', '#4b7', '#295'], [80, 380, 90, 80, 40, '#c6c', '#d7d', '#a4a']]); },
  // 3 BODEGA: shelves full of boxes
  (c, R) => { boxes(c, [[0, 0, 300, 50, 200, '#3a3020', '#4a4030', '#2a2010'], [0, 60, 50, 240, 200, '#3a3020', '#4a4030', '#2a2010'], [60, 10, 40, 30, 30, '#b94', '#ca5', '#a83', 100], [150, 10, 50, 30, 40, '#b94', '#ca5', '#a83', 150], [80, 220, 60, 50, 50, '#b94', '#ca5', '#a83']]); },
  // 2A PASILLO OESTE: posters along the walls
  (c, R) => { hallPosters(c, R, 'E', [120, 420, 760], '#c33', 380, '#36c'); wtext(c, R, 'N', 130, 200, 'COMEDOR', 18, '#9aa'); },
  // 2B ESQUINA OESTE: water cooler next to your door
  (c, R) => { boxes(c, [[20, 230, 50, 50, 120, '#bcd', '#def', '#9ab']]); wtext(c, R, 'E', 150, 215, 'CONTROL', 18, '#a22'); },
  // 4A PASILLO ESTE: posters
  (c, R) => hallPosters(c, R, 'W', [200, 560], '#3a3', 620, '#c90'),
  // 4B ESQUINA ESTE: trash can and a forgotten chair
  (c, R) => { boxes(c, [[230, 230, 40, 40, 60, '#555', '#666', '#444'], [60, 220, 50, 50, 45, '#334', '#445', '#223']]); wtext(c, R, 'W', 150, 215, 'CONTROL', 18, '#a22'); },
  // 8 LOBBY: banner, sponsor stands, glass entrance
  (c, R) => { wtext(c, R, 'N', 350, 180, 'PLATANUS HACK 26 · SANTIAGO', 26, '#ffd400'); poly(c, '#6ab', wq(R, 'E', 150, 350, 0, 200)); boxes(c, [[80, 40, 170, 60, 70, '#2f3f68', '#4a5c90', '#1f2f58'], [420, 360, 200, 60, 70, '#2f3f68', '#4a5c90', '#1f2f58'], [620, 30, 50, 50, 110, '#363', '#474', '#252']]); },
  // 9 PASILLO CENTRAL: straight down to your office
  (c, R) => { wtext(c, R, 'S', 130, 200, 'SEGURIDAD', 18, '#a22'); for (const y of [200, 450]) poly(c, '#556', wq(R, 'W', y, y + 60, 100, 170)); },
];
// things in front of the people standing in a room (drawn over them)
const FG = { 0: (c) => boxes(c, [[60, 240, 580, 60, 78, '#6d5a42', '#8c7558', '#4d3a22'], ...Object.values(SEATS).map((x) => [x - 38, 250, 76, 5, 26, '#9aa', '#bcc', '#788', 78])]) };
function buildRooms() {
  ROOMS.forEach((R, r) => {
    setCam(R[9]);
    canvasTex('room' + r, CAMW, H, (c) => { shell(c, R); PROPS[r](c, R); });
    if (FG[r]) canvasTex('room' + r + 'f', CAMW, H, FG[r]);
  });
}

// ---- The security office (first person, FNAF-style) ----
// A cramped security booth, 1200 px around (you turn half a screen each way):
// the back wall with the dark front hallway in the middle, a side wall on each
// side with a heavy steel shutter door, hazard stripes and its button panel,
// a low ceiling with one lamp hanging over the desk. Three layers: the room;
// the same room with the doorways cut out, drawn OVER whoever stands in a
// doorway (the frame hides them, so they can peek around it); and the desk,
// which slides a little faster than the room when you turn (parallax). The
// post shader bends it all like a cylinder: turning your head, not scrolling.
function quad(c, col, pts) { c.fillStyle = col; c.beginPath(); pts.forEach((p, i) => (i ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1]))); c.fill(); }
const PW = 1200, PCX = 600, LW = 250, RW = 950, TOPY = 80, FLY = 470;
// the ceiling and floor lines along the walls (side walls are in perspective)
const wTop = (x) => (x < LW ? (TOPY * x) / LW : x > RW ? (TOPY * (PW - x)) / (PW - RW) : TOPY);
const wBot = (x) => (x < LW ? H - ((H - FLY) * x) / LW : x > RW ? H - ((H - FLY) * (PW - x)) / (PW - RW) : FLY);
const DX = { W: [40, 200], E: [1000, 1160] };
// a doorway as 4 points; k < 1 cuts it at that height (how far the shutter is down)
function dq(d, k = 1) {
  if (d == 'N') return [[520, 150], [680, 150], [680, 150 + 320 * k], [520, 150 + 320 * k]];
  const [a, b] = DX[d], t = (x) => wTop(x) + (wBot(x) - wTop(x)) * 0.14, f = (x) => wBot(x) - 6;
  return [[a, t(a)], [b, t(b)], [b, lerp(t(b), f(b), k)], [a, lerp(t(a), f(a), k)]];
}
const ODOOR = { W: [40, 100, 160, 470], N: [520, 150, 160, 320], E: [1000, 100, 160, 470] }; // bounding boxes
const OPANEL = { W: [206, 236], N: [692, 250], E: [954, 236] };
// where each thing is across the room (focus = the nearest one to where you look)
// Pan stops are measured in office pixels. The counter spans the right-center bay.
const COFFEE_START = 219, COFFEE_END = 349;
const COFFEE_X = 865, BREW = 5, SIP = 1.8, FAN = [470, 384], CLOCK = [770, 152], DESK_PX = 0.14, CRT = [300, 722];
// small canvas helpers
const cR = (c, col, x, y, w, h) => { c.fillStyle = col; c.fillRect(x, y, w, h); };
const cT = (c, col, sz, s, x, y) => { c.fillStyle = col; c.font = 'bold ' + sz + 'px monospace'; c.textAlign = 'center'; c.fillText(s, x, y); };
const cL = (c, col, w, pts, open) => { c.strokeStyle = col; c.lineWidth = w; c.beginPath(); pts.forEach((p, i) => (i ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1]))); if (!open) c.closePath(); c.stroke(); };
const cG = (c, x0, y0, x1, y1, a, b) => { const g = c.createLinearGradient(x0, y0, x1, y1); g.addColorStop(0, a); g.addColorStop(1, b); return g; };
const cRad = (c, x, y, r, a, b) => { const g = c.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, a); g.addColorStop(1, b); return g; };
function drawRoom(c, holes) {
  let sd = 9;
  const sr = () => (sd = (sd * 16807) % 2147483647) / 2147483647; // the same grime on both copies
  // ---- ceiling: panels running to the back, a vent, pipes, the lamp's cord and shade
  quad(c, '#08090b', [[0, 0], [PW, 0], [RW, TOPY], [LW, TOPY]]);
  for (let i = -3; i <= 3; i++) cL(c, '#131418', 3, [[PCX + i * 100, TOPY], [PCX + i * 290, 0]], 1);
  for (const k of [0.45, 0.8]) cL(c, '#131418', 3, [[LW * k, TOPY * k], [PW - (PW - RW) * k, TOPY * k]], 1);
  quad(c, '#18191d', [[820, 22], [940, 22], [955, 46], [805, 46]]);
  for (let i = 0; i < 4; i++) cL(c, '#0a0a0c', 3, [[815, 27 + i * 5], [945, 27 + i * 5]], 1);
  cL(c, '#1d1f24', 9, [[0, 30], [LW, TOPY + 6], [RW, TOPY + 6], [PW, 30]], 1); cL(c, '#2a2d33', 3, [[0, 26], [LW, TOPY + 3], [RW, TOPY + 3], [PW, 26]], 1); // a pipe all around
  cL(c, '#0d0d0f', 3, [[PCX, 0], [PCX, 28]], 1);
  quad(c, '#2d2f35', [[PCX - 38, 50], [PCX + 38, 50], [PCX + 18, 28], [PCX - 18, 28]]); quad(c, '#3a3d44', [[PCX - 38, 50], [PCX + 38, 50], [PCX + 34, 46], [PCX - 34, 46]]);
  // ---- walls: the back wall, then the side walls (darker towards you)
  quad(c, cG(c, 0, TOPY, 0, FLY, '#1a1c21', '#2e3238'), [[LW, TOPY], [RW, TOPY], [RW, FLY], [LW, FLY]]);
  quad(c, cG(c, 0, 0, LW, 0, '#0c0d10', '#24272c'), [[0, 0], [LW, TOPY], [LW, FLY], [0, H]]);
  quad(c, cG(c, PW, 0, RW, 0, '#0c0d10', '#24272c'), [[PW, 0], [RW, TOPY], [RW, FLY], [PW, H]]);
  cL(c, '#0d0e11', 4, [[LW, TOPY], [LW, FLY]], 1); cL(c, '#0d0e11', 4, [[RW, TOPY], [RW, FLY]], 1); // the corners
  // lower wall: small square tiles under a black-and-white checker stripe
  const band = (k) => (x) => wTop(x) + (wBot(x) - wTop(x)) * k;
  for (let x = 0; x < PW; x += 12) for (let r = 0; r < 2; r++) {
    const a = band(0.6 + r * 0.035), b = band(0.635 + r * 0.035);
    quad(c, ((x / 12) + r) % 2 ? '#c9c9bf' : '#121212', [[x, a(x)], [x + 12, a(x + 12)], [x + 12, b(x + 12)], [x, b(x)]]);
  }
  for (const [x0, x1] of [[0, LW], [LW, RW], [RW, PW]]) quad(c, 'rgba(10,12,14,.35)', [[x0, band(0.67)(x0)], [x1, band(0.67)(x1)], [x1, wBot(x1)], [x0, wBot(x0)]]);
  for (let x = LW; x < RW; x += 22) cL(c, 'rgba(0,0,0,.25)', 1, [[x, band(0.67)(x)], [x, FLY]], 1);
  for (let k = 0.7; k < 1; k += 0.06) cL(c, 'rgba(0,0,0,.25)', 1, [[0, band(k)(0)], [LW, band(k)(LW)], [RW, band(k)(RW)], [PW, band(k)(PW)]], 1);
  // ---- floor: checker tiles converging to the back
  c.save(); c.beginPath(); [[LW, FLY], [RW, FLY], [PW, H], [0, H]].forEach((p, i) => (i ? c.lineTo(...p) : c.moveTo(...p))); c.clip();
  for (let row = 0; row < 6; row++) {
    const y0 = FLY + row * row * 4 + row * 10, y1 = FLY + (row + 1) * (row + 1) * 4 + (row + 1) * 10, s0 = 1 + row * 0.4, s1 = s0 + 0.4;
    for (let col = -30; col < 30; col++) quad(c, (row + col) % 2 ? '#1d1d1f' : '#0a0a0b', [[PCX + col * 44 * s0, y0], [PCX + (col + 1) * 44 * s0, y0], [PCX + (col + 1) * 44 * s1, y1], [PCX + col * 44 * s1, y1]]);
  }
  c.restore();
  // ---- the back wall: whiteboard and corkboard on the left, clock and posters on the right
  cR(c, '#bfc2b8', 268, 112, 220, 124); cR(c, '#e4e6de', 274, 118, 208, 112); cR(c, '#8a8d84', 268, 236, 220, 6);
  cT(c, '#245', 13, 'DÍAS SIN INCIDENTES:', 378, 142); cT(c, '#c22', 58, '0', 378, 212); cL(c, '#c22', 3, [[335, 218], [425, 178]], 1);
  cR(c, '#4e3520', 280, 262, 196, 82); cR(c, '#75522f', 286, 268, 184, 70);
  ['#e8a', '#93f', '#4c4', '#fa3'].forEach((col, i) => { const x = 296 + i * 44, y = 276 + (i % 2) * 10; cR(c, '#ece7da', x, y, 32, 38); cR(c, col, x + 4, y + 4, 24, 22); cR(c, '#c22', x + 13, y - 3, 6, 6); });
  c.fillStyle = '#0e0e10'; c.beginPath(); c.arc(...CLOCK, 38, 0, PI * 2); c.fill();
  c.fillStyle = '#d2cec0'; c.beginPath(); c.arc(...CLOCK, 32, 0, PI * 2); c.fill();
  for (let i = 0; i < 12; i++) { const a = (i / 12) * PI * 2; cL(c, '#222', i % 3 ? 2 : 4, [[CLOCK[0] + M.cos(a) * 25, CLOCK[1] + M.sin(a) * 25], [CLOCK[0] + M.cos(a) * 30, CLOCK[1] + M.sin(a) * 30]], 1); }
  cR(c, '#d6d9d0', 822, 106, 112, 92); cT(c, '#245', 20, '¡NO', 878, 146); cT(c, '#245', 20, 'DORMIR!', 878, 172);
  cR(c, '#b8342a', 832, 212, 96, 88); ['¿YA', 'HICISTE', 'DEPLOY?'].forEach((s, i) => cT(c, '#fff', 12, s, 880, 242 + i * 19));
  [['#e8a', 704], ['#4c4', 764]].forEach(([col, x], i) => {
    const y = 214 + i * 12;
    cR(c, '#ece7da', x, y, 46, 52); c.strokeStyle = col; c.lineWidth = 3;
    c.beginPath(); c.arc(x + 23, y + 17, 8, 0, PI * 2); c.moveTo(x + 23, y + 25); c.lineTo(x + 23, y + 40); c.moveTo(x + 11, y + 32); c.lineTo(x + 35, y + 32); c.stroke();
  });
  for (const [x, y, col] of [[490, 120, '#ff6'], [496, 150, '#f9c'], [790, 290, '#9cf'], [700, 120, '#ff6']]) cR(c, col, x, y, 22, 20);
  // grime: water stains running down from the ceiling, dark blotches
  for (let i = 0; i < 14; i++) {
    const x = sr() * PW, w = 8 + sr() * 26;
    quad(c, cG(c, 0, 60, 0, 120 + sr() * 160, 'rgba(0,0,0,.3)', 'rgba(0,0,0,0)'), [[x, 60], [x + w, 60], [x + w * 0.7, 300], [x + w * 0.3, 300]]);
  }
  for (let i = 0; i < 70; i++) { c.fillStyle = 'rgba(0,0,0,' + (0.04 + sr() * 0.08) + ')'; c.beginPath(); c.ellipse(sr() * PW, 90 + sr() * 400, 6 + sr() * 24, 4 + sr() * 12, 0, 0, PI * 2); c.fill(); }
  // cables from the pipe down to the desk
  for (const [a, b, s] of [[460, 520, 30], [740, 700, -30], [640, 660, 50]]) { c.strokeStyle = '#060607'; c.lineWidth = 4; c.beginPath(); c.moveTo(a, TOPY + 8); c.bezierCurveTo(a + s, 230, b - s, 320, b, 442); c.stroke(); }
  // ---- light: the lamp's warm pool in the middle, darkness towards the doors
  c.fillStyle = cRad(c, PCX, 330, 560, 'rgba(255,205,130,.13)', 'rgba(255,205,130,0)'); c.fillRect(0, 0, PW, H);
  c.fillStyle = cRad(c, PCX, 52, 90, 'rgba(255,225,170,.35)', 'rgba(255,225,170,0)'); c.fillRect(PCX - 90, 0, 180, 140);
  cR(c, cG(c, 0, 0, 330, 0, 'rgba(0,0,0,.55)', 'rgba(0,0,0,0)'), 0, 0, 330, H); cR(c, cG(c, PW, 0, PW - 330, 0, 'rgba(0,0,0,.55)', 'rgba(0,0,0,0)'), PW - 330, 0, 330, H);
  // ---- the openings: dark hallway and doorways (or holes, for the wall layer)
  if (!holes) {
    quad(c, '#000', dq('N'));
    for (const d of SIDES) quad(c, '#000', dq(d));
  } else {
    c.globalCompositeOperation = 'destination-out';
    for (const d of ADOOR) quad(c, '#000', dq(d));
    c.globalCompositeOperation = 'source-over';
  }
  // Recess the rolling shutters into narrow channels in the side walls.
  for (const d of SIDES) {
    const [a,b,c1,d1] = dq(d);
    quad(c, '#191c20', [a,b,[b[0],b[1]+9],[a[0],a[1]+9]]);
    for (const [top,bottom,offset] of [[a,d1,5],[b,c1,-5]]) {
      quad(c, '#37393a', [top,[top[0]+offset,top[1]+3],[bottom[0]+offset,bottom[1]-3],bottom]);
    }
  }
  cR(c, '#0a5', 82, 46, 76, 18); cT(c, '#000', 11, 'ESQUINA O.', 120, 60);
  cR(c, '#0a5', 1042, 46, 76, 18); cT(c, '#000', 11, 'ESQUINA E.', 1080, 60);
  cR(c, '#e6c21a', 500, 104, 200, 32); cT(c, '#000', 17, 'PLATANUS HACK 26', 600, 126);
  // the button plates (the buttons themselves light up live)
  for (const d of ADOOR) { const [px, py] = OPANEL[d], h = d == 'N' ? 60 : 110; cR(c, '#121316', px - 6, py - 6, 52, h + 12); cR(c, '#474b53', px, py, 40, h); cR(c, '#5d626b', px, py, 40, 3); }
}
// the desk in front of you, its own layer: worn wood, two boxy CRT monitors,
// the fan, the keyboard, the red phone, the coffee maker, pizza, cans, papers
function drawDesk(c) {
  quad(c, '#3d3024', [[300, 440], [900, 440], [990, 540], [210, 540]]);
  for (const t of [0.18, 0.4, 0.62, 0.84]) cL(c, 'rgba(0,0,0,.2)', 2, [[lerp(300, 210, t), 440 + 100 * t], [lerp(900, 990, t), 440 + 100 * t]], 1);
  for (const [x, y, w] of [[420, 470, 40], [780, 500, 60], [560, 525, 30]]) cL(c, 'rgba(255,255,255,.06)', 1, [[x, y], [x + w, y + 3]], 1); // scratches
  cR(c, '#5a4634', 300, 438, 600, 4);
  cR(c, cG(c, 0, 540, 0, H, '#2b2119', '#0c0907'), 210, 540, 780, H - 540); cR(c, '#4c3b2c', 210, 538, 780, 4);
  // cables tangled behind the monitors
  for (const [a, b] of [[360, 330], [770, 820], [520, 470]]) { c.strokeStyle = '#08080a'; c.lineWidth = 3; c.beginPath(); c.moveTo(a, 442); c.bezierCurveTo(a - 20, 470, b + 20, 430, b, 446); c.stroke(); }
  // two boxy CRT monitors (body in depth, bezel, dark glass), a sticky note on one
  for (const mx of CRT) {
    quad(c, '#16171a', [[mx + 16, 346], [mx + 112, 346], [mx + 102, 328], [mx + 26, 328]]);
    cR(c, '#1d1e22', mx, 346, 128, 94); cR(c, '#2a2c31', mx, 346, 128, 4);
    cR(c, '#0b1014', mx + 10, 356, 108, 70); cR(c, '#131a20', mx + 10, 356, 108, 3);
    cR(c, '#3c2', mx + 114, 430, 5, 4); cR(c, '#121214', mx + 40, 440, 48, 6);
  }
  cR(c, '#ff6', CRT[1] + 98, 348, 24, 20); cR(c, '#f9c', CRT[0] + 6, 342, 20, 18);
  // keyboard, the red phone, papers, a mug full of pens
  quad(c, '#18181a', [[520, 470], [680, 470], [688, 500], [512, 500]]);
  for (let i = 0; i < 28; i++) cR(c, '#2e2e31', 522 + (i % 14) * 11.2, 474 + (i > 13) * 12, 9, 9);
  cR(c, '#5e0a0a', 238, 488, 110, 34); cR(c, '#8e1414', 248, 472, 90, 22); cR(c, '#7a1010', 234, 464, 118, 12);
  c.fillStyle = '#e6dcc4'; c.beginPath(); c.arc(293, 502, 12, 0, PI * 2); c.fill();
  for (const [x, y, a] of [[420, 500, -0.25], [455, 512, 0.12], [930, 528, 0.3]]) { c.save(); c.translate(x, y); c.rotate(a); cR(c, '#cbc6b6', -30, -20, 60, 40); for (let i = 0; i < 4; i++) cR(c, '#97938a', -24, -14 + i * 8, 40, 2); c.restore(); }
  cR(c, '#b7c0c9', 448, 444, 22, 26); for (const [x, col] of [[452, '#c22'], [458, '#24c'], [464, '#2a2']]) cR(c, col, x, 432, 3, 14);
  // pizza box, energy cans, a rubber banana
  cR(c, '#9a2f2f', 742, 486, 90, 46); cR(c, '#d0a862', 748, 480, 78, 9); cT(c, '#fff', 11, 'PIZZA', 787, 514);
  for (const x of [692, 706]) { cR(c, '#2a6', x, 444, 13, 25); cR(c, '#ccc', x, 444, 13, 3); }
  c.fillStyle = '#e6c21a'; c.beginPath(); c.ellipse(955, 500, 13, 27, 0.9, 0, PI * 2); c.fill();
  // the coffee maker and the fan stand
  cR(c, '#1a1a1a', COFFEE_X - 30, 400, 60, 72); cR(c, '#333', COFFEE_X - 24, 408, 48, 20); cR(c, '#111', COFFEE_X - 14, 440, 28, 6); cT(c, '#fff', 9, 'CAFÉ', COFFEE_X, 422);
  cR(c, '#2a2a2a', FAN[0] - 5, FAN[1] + 30, 10, 42); cR(c, '#222', FAN[0] - 30, FAN[1] + 68, 60, 9);
}
// Each aperture is a window onto the building. The side entrances look
// across a corridor at the opposite wall. The center looks along its length.
function drawPassage(c, door) {
  const front = door == 'N';
  c.fillStyle = front ? '#151a1c' : '#202527';
  c.fillRect(0, 0, 160, H);
  c.save();
  if (door == 'E') { c.translate(160, 0); c.scale(-1, 1); }
  if (front) {
    quad(c, cG(c,0,0,70,0,'#707774','#353c3e'), [[0,120],[63,255],[63,336],[0,480]]);
    quad(c, cG(c,90,0,160,0,'#343936','#63635b'), [[98,254],[160,128],[160,480],[98,336]]);
    quad(c, cG(c,0,336,0,470,'#383c38','#827b6d'), [[63,336],[98,336],[160,480],[0,480]]);
    cR(c,'#273438',63,255,35,81);
    cR(c,'#101818',78,279,20,57);
    cR(c,'#598571',79,269,15,5);
    quad(c,'#414f4d',[[0,306],[63,302],[63,306],[0,320]]);
    quad(c,'#353e3c',[[98,304],[160,312],[160,322],[98,308]]);
    // A single inset door on the left wall, seen in profile.
    quad(c,'#35403f',[[15,214],[37,247],[37,376],[15,424]]);
    quad(c,'#1c2c2f',[[20,241],[32,257],[32,294],[20,292]]);
    cR(c,'#a6a598',31,316,4,3);
    quad(c,'#9b9c8c',[[68,242],[91,242],[88,246],[70,246]]);
  } else {
    // Elevation of the far wall, with its skirting and fixtures on one plane.
    c.save(); c.transform(1,-.12,0,1,0,15);
    cR(c,cG(c,0,130,0,440,'#737775','#b1afa0'),-10,100,190,330);
    cR(c,'#536865',-10,304,190,118);
    cR(c,'#353c37',-10,413,190,10);
    if (door == 'W') {
      // Recessed service door, wired glass panel, lever and kick plate.
      cR(c,'#474e4d',85,191,76,231); cR(c,'#68736c',90,196,68,224);
      cR(c,'#404b48',103,216,37,61); cR(c,'#263535',106,219,31,55);
      cR(c,'#9c9c8f',95,317,14,4); cR(c,'#535b56',93,384,62,31);
      cR(c,'#777e78',19,245,30,20);
      for (let y=249;y<263;y+=4) cR(c,'#333c3a',23,y,22,2);
    } else {
      // A fire extinguisher hung from a bracket, its hose curled alongside.
      cR(c,'#717468',73,256,31,81); cR(c,'#64312a',77,273,24,59);
      cR(c,'#a05742',80,275,7,52); cR(c,'#d1c1a4',79,293,20,14);
      cR(c,'#353b36',83,260,10,13); cR(c,'#51463a',80,258,22,4);
      cL(c,'#2d322e',3,[[95,267],[106,271],[108,295],[101,307]],1);
      cR(c,'#813f34',78,227,24,17); cR(c,'#d2c5b2',88,230,4,10);
    }
    cR(c,cG(c,0,423,0,550,'#797b71','#444842'),-10,423,190,180);
    quad(c,'#515751',[[0,423],[160,423],[160,426],[0,432]]);
    c.restore();
    // The return wall at the bend obscures a sliver of the far corridor.
    quad(c,cG(c,0,0,22,0,'#2f3635','#575e57'),[[0,90],[23,117],[23,436],[0,463]]);
  }
  c.restore();
  // Beam falloff and faint mottling break up the broad painted surfaces.
  let seed=door.charCodeAt(0);
  const grain=()=> (seed=seed*16807%2147483647)/2147483647;
  for (let i=0;i<1800;i++) {
    c.fillStyle=i%2?'rgba(240,225,200,.07)':'rgba(0,0,0,.10)';
    c.fillRect(grain()*160,grain()*H,1+grain()*2,1+grain()*3);
  }
  c.fillStyle=cRad(c,79,302,245,'rgba(16,14,10,0)','rgba(6,9,11,.82)');
  c.fillRect(0,0,160,H);
}
function buildOffice() {
  canvasTex('office', PW, H, (c) => drawRoom(c, 0));
  canvasTex('officeM', PW, H, (c) => drawRoom(c, 1));
  canvasTex('desk', PW, H, drawDesk);
  for (const d of ADOOR) canvasTex('passage' + d,160,H,c => drawPassage(c,d));
}

// =====================================================================
// CREATE
// =====================================================================
let wC, rC, oC, uC, uiCam;
let bgImg, fgImg, dynG, emG, projTxt, askG, askTxt, lensImg, oBg, oG, oBeam, oDim, oLamp, oTop, oMask, oDesk, deskImg, oDG, fanS = 0, fanA = 0;
const eImg = {}, oImg = {};
// UI objects (u*) live in the uC layer, which the post-FX camera ignores
let uC1, uC2, uCallName, uCallTxt, uHandset, uCallHint, uCam, uCamBar, uCardN, uG, uHour, uHud, uLPress, uLStat, uLid, uLid2, uMapT, uMsg, uMug, uNight, uPPress, uPaperEnd, uPow, uPr, uScr, uScrT, uScreen, uStat, uSue, uT1, uTMenu, uTab, uTh, uTitleBan, uTitleStat, uW1, uW2, uWDone, uWarn;
let zR, zO, uZ, oBan, dozeHB, litA = 0, scrSide, scrPre; // the sleeper's z's (or !! when angry) · falling asleep
let uLearn;
const TS = (sz, col, extra) => Object.assign({ fontFamily: 'monospace', fontSize: sz + 'px', color: col || '#fff', fontStyle: 'bold' }, extra);
const add = (c, o) => { c.add(o); return o; };
const img = (c, k, x, y, ox, oy) => add(c, S.add.image(x, y, k).setOrigin(ox ?? 0.5, oy ?? 0.5));
const txt = (c, x, y, s, sz, col, ox, oy, extra) => add(c, S.add.text(x, y, s, TS(sz, col, extra)).setOrigin(ox ?? 0.5, oy ?? 0.5));

function create() {
  S = this;
  buildSprites(); buildFxTex(); buildRooms(); buildOffice();
  const act = (e) => KEY2ACT[e.key.length == 1 ? e.key.toLowerCase() : e.key];
  addEventListener('keydown', (e) => { const a = act(e); initAudio(); if (a) { if (!held[a]) pressed[a] = 1; held[a] = 1; } });
  addEventListener('keyup', (e) => { const a = act(e); if (a) held[a] = 0; });

  wC = S.add.container(); rC = add(wC, S.add.container()); oC = add(wC, S.add.container()); uC = S.add.container();
  // camera feed
  bgImg = img(rC, 'room0', 0, 0, 0, 0);
  fgImg = img(rC, 'room0f', 0, 0, 0, 0);
  dynG = add(rC, S.add.graphics());
  projTxt = txt(rC, 0, 0, '', 18, '#111');
  for (const r of ROLES) eImg[r] = img(rC, r + '0', 0, 0, 0.5, 1);
  lensImg = img(rC, 'mentora0', 0, 0, 0.5, 0.2).setVisible(false);
  emG = add(rC, S.add.graphics());
  askG = add(rC, S.add.graphics());
  askTxt = txt(rC, 0, 0, '', 15, '#111').setVisible(false);
  zR = txt(rC, 0, 0, '', 16);
  // office, back to front: the room, light in the doorways, whoever stands in
  // them, the walls (over them), the lamp, the darkness, the light beam, shutters
  // and buttons, the desk (its own parallax layer), and what stands before you
  oBg = img(oC, 'office', 0, 0, 0, 0);
  oG = img(oC, 'passageN', 520, 0, 0, 0).setVisible(false);
  for (const r of ROLES) oImg[r] = img(oC, r + '0', 0, 0, 0.5, 1);
  oMask = img(oC, 'officeM', 0, 0, 0, 0);
  oLamp = img(oC, 'cone', PCX, 40, 0, 0.5).setBlendMode(1).setTint(0xffe2a0).setScale(1.9, 2.6);
  oDim = add(oC, S.add.graphics());
  oBeam = img(oC, 'cone', 0, 0, 0, 0.5).setBlendMode(1).setTint(0xfff0c0).setVisible(false);
  oTop = add(oC, S.add.graphics());
  zO = txt(oC, 0, 0, '', 22);
  oDesk = add(oC, S.add.container()); deskImg = img(oDesk, 'desk', 0, 0, 0, 0); oDG = add(oDesk, S.add.graphics());
  oBan = img(oC, 'banana0', 0, 0, 0.5, 1).setVisible(false);

  buildUI();
  const mc = S.cameras.main;
  uiCam = S.cameras.add(0, 0, W, H);
  mc.ignore(uC); uiCam.ignore(wC);
  if (S.game.renderer.type == Phaser.WEBGL) { mc.setPostPipeline('Horror'); FX = { t: 0 }; }
  loadSave();
  goTitle();
}

// =====================================================================
// UI
// =====================================================================
function buildUI() {
  const h = (uHud = add(uC, S.add.container()));
  const T = (x, y, s, sz, col, ox, oy, extra) => txt(h, x, y, s, sz, col, ox, oy, extra);
  const rect = (x, y, w, hh, col, a) => add(h, S.add.rectangle(x, y, w, hh, col, a ?? 1).setOrigin(0));
  uLid = rect(0, 0, W, 0, 0); uLid2 = rect(0, H, W, 0, 0); // eyelids: over the scene, under the UI
  uG = add(h, S.add.graphics());
  uStat = add(h, S.add.tileSprite(0, 0, W, H, 'noise').setOrigin(0).setAlpha(0));
  uTab = add(h, S.add.container());
  const bezel = add(uTab, S.add.graphics());
  bezel.fillStyle(0x101317).fillRoundedRect(-420, 0, 840, 650, 25)
    .lineStyle(5, 0x707981).strokeRoundedRect(-415, 3, 830, 637, 22)
    .fillStyle(0x26333a).fillRoundedRect(-385, 32, 770, 548, 12)
    .fillStyle(0x0b1116).fillRect(-375, 41, 750, 528)
    .fillStyle(0x87a391).fillCircle(338, 18, 3);
  for (let y = 45; y < 565; y += 7) bezel.lineStyle(1, 0x263038).lineBetween(-375, y, 375, y);
  txt(uTab, -315, 17, 'SEGURIDAD   /   CCTV', 11, '#94a399');
  // FNAF corners: the time top right, power and usage bottom left
  uHour = T(776, 16, '', 30, '#fff', 1, 0);
  uNight = T(776, 52, '', 14, '#aab', 1, 0);
  uSue = T(24, 474, '', 12, '#c9b6ff', 0, 0);
  uPow = T(24, 512, '', 16, '#fff', 0, 0);
  uCam = [T(40, 34, '', 20, '#e8e0d0', 0, 0), T(40, 82, '● REC', 14, '#ff4444', 0, 0), T(40, 60, '', 13, '#b8b0a0', 0, 0), T(560, 568, 'STICK: CÁMARA · B1: LINTERNA · B4: ANTERIOR · B3: BAJAR', 10, '#b8b0a0')];
  uMapT = [...ROOMS.map((R) => R[1]), 'TÚ'].map((s) => T(0, 0, s, 9, '#d8d0c0'));
  uPr = [0, 1, 2, 3].map(() => T(0, 0, '', 13, '#fff', 0.5, 0.5, { backgroundColor: '#000000cc', padding: { x: 6, y: 3 }, align: 'center', wordWrap: { width: 550 } }));
  uLearn = T(W / 2, 44, '', 16, '#fff0ac', 0.5, 0.5, {
    backgroundColor: '#2b200ee6', padding: { x: 12, y: 6 }, stroke: '#100a05', strokeThickness: 2
  }).setVisible(false);
  uCamBar = T(400, 580, 'B3 · CÁMARAS', 14, '#e8e0d0', 0.5, 0.5, { backgroundColor: '#2a2620cc', padding: { x: 60, y: 4 } });
  uWarn = T(560, 580, '⚠', 34, '#ffd400'); // FNAF2-style warning next to the camera bar
  uMsg = T(400, 140, '', 22, '#fff', 0.5, 0.5, { stroke: '#000', strokeThickness: 5, align: 'center' });
  uZ = T(400, 300, '', 40, '#c9b6ff');
  uTh = T(400, 530, '', 14, '#d6d2c6', 0.5, 1, { stroke: '#101012', strokeThickness: 3, wordWrap: { width: 420 }, align: 'center', fontStyle: 'italic' });
  // drinking: a big mug rises in front of your face
  uMug = add(h, S.add.container(400, H + 200));
  const m = add(uMug, S.add.graphics());
  m.fillStyle(0xe8e2c8).fillRoundedRect(-110, -130, 220, 260, 24).lineStyle(26, 0xe8e2c8).strokeCircle(130, 0, 60).fillStyle(0x5a3416).fillEllipse(0, -120, 190, 34).fillStyle(0xc0392b).fillRect(-110, -20, 220, 40);
  txt(uMug, 0, 0, 'PLATANUS', 22);
  uScr = img(uC, 'pitcher0', 400, 330).setVisible(false);
  uScrT = txt(uC, 400, 520, '', 40, '#fff', 0.5, 0.5, { stroke: '#000', strokeThickness: 8 });
  uScreen = add(uC, S.add.container());
}
const clearScreen = () => uScreen.removeAll(true);
const sAdd = (o, c) => add(c || uScreen, o);
const sText = (x, y, s, sz, col, ox, oy, extra, c) => txt(c || uScreen, x, y, s, sz, col, ox, oy, extra);
const sRect = (col) => sAdd(S.add.rectangle(0, 0, W, H, col).setOrigin(0));

// =====================================================================
// SAVE
// =====================================================================
function storage() {
  return window.platanusArcadeStorage || {
    async get(k) { try { const v = localStorage.getItem(k); return v == null ? { found: false } : { found: true, value: JSON.parse(v) }; } catch (e) { return { found: false }; } },
    async set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { } },
  };
}
async function loadSave() {
  try {
    const r = await storage().get(SAVE_KEY);
    if (r && r.found && r.value && typeof r.value.night == 'number') saved.night = menuNight = clamp(r.value.night | 0, 1, 5);
    if (mode == 'title') goTitle();
  } catch (e) { }
}
const writeSave = () => storage().set(SAVE_KEY, { night: saved.night }).catch(() => { });

// =====================================================================
// SCREENS
// =====================================================================
function screen(m) { ringStop(); if (AC) buzzG.gain.value = fanG.gain.value = 0; litA = 0; mode = m; modeT = 0; wC.setVisible(false); hideHud(); clearScreen(); }
function goTitle() {
  screen('title');
  // the whole cast lined up, each one half hidden behind the next
  uTitleBan = [3, 1, 5, 0, 6, 2, 4].map((i, k) => ({ i, k })).sort((a, b) => M.abs(b.k - 3) - M.abs(a.k - 3)).map(({ i, k }) => sAdd(S.add.image(100 + k * 100, 660 - M.abs(k - 3) * 16, ROLES[i] + '0').setScale(16 - M.abs(k - 3) * 0.9).setOrigin(0.5, 1)));
  uTitleStat = sAdd(S.add.tileSprite(0, 0, W, H, 'noise').setOrigin(0));
  uT1 = sText(40, 26, 'Five Nights\nat Platanus', 52, '#eee', 0, 0, { lineSpacing: -6, stroke: '#000', strokeThickness: 6 });
  sText(42, 160, 'La hackathon terminó. Ellos no.', 14, '#889', 0, 0.5);
  uTMenu = sText(760, 60, '', 22, '#fff', 1, 0.5, { stroke: '#000', strokeThickness: 5 });
}
function titleUpdate() {
  // the opponent stares out of the static, flickers and twitches now and then
  const tw = M.random() < 0.05 ? pick(uTitleBan) : null;
  uTitleBan.forEach((im) => im.setTint(im == tw ? 0xff8080 : M.random() < 0.02 ? 0x303030 : 0x8a8a8a).setAngle(im == tw ? rnd(-6, 6) : im.angle * 0.9));
  uTitleStat.setTilePosition(rnd(0, 200), rnd(0, 150)).setAlpha(tw ? 0.25 : rnd(0.06, 0.12));
  uT1.setAlpha(M.random() < 0.03 ? 0.3 : 1);
  if (saved.night > 1) {
    if (pr('L')) menuNight = M.max(1, menuNight - 1), sfxBlip(1, 400);
    if (pr('R')) menuNight = M.min(saved.night, menuNight + 1), sfxBlip(1, 500);
    uTMenu.setText('◄ NOCHE ' + menuNight + ' ►  START');
  } else uTMenu.setText('PRESIONA START');
  uTMenu.setAlpha(0.6 + M.sin(modeT * 4) * 0.4);
  if (pr('S') || pr('1')) { sfxClick(); if (menuNight == 1) goPaper(0); else goCall(menuNight); }
}
// Newspaper: intro (0) or ending (1). It spins in and slams onto the table.
const PAPERS = [
  ['DOMINGO 22', '¡GANADORES VIAJAN A SAN FRANCISCO!', 'Platanus Hack 26 cierra tras 36 horas de código',
    'SANTIAGO. — Tras 36 horas de código, siestas y completos, los ganadores de Platanus Hack 26 viajan a San Francisco con Rafa y Nacho. Algunos participantes habrían seguido dentro tras el cierre. La organización habla de rumores.',
    'RECINTO CERRADO', 'El edificio cierra por cinco noches. Los vecinos reportan luces y teclados de madrugada.',
    'CLASIFICADOS', 'Se busca guardia de 12 a 6 AM. Café ilimitado. No salgas de la sala de vigilancia. Llama a Rafa.'],
  ['SÁBADO 28', 'HACKATHON CONCLUYE SIN INCIDENTES', 'El recinto fue devuelto tras cinco noches de guardia',
    'SANTIAGO. — El guardia pidió el café más grande que tuvieran. Desde entonces duerme con la luz prendida. La organización asegura que los participantes rezagados descansan. Nadie los ha visto. Rafa y Nacho prefirieron no comentar las grabaciones.',
    'VECINOS INSISTEN', 'Aún se oyen pasos, teclados y alguien pidiendo la siguiente diapositiva.',
    'PLATANUS HACK 27', 'Las inscripciones abren en marzo. Ya se busca guardia nocturno.'],
];
function goPaper(end) {
  screen('paper'); uPaperEnd = end;
  const [date, headline, subhead, story, briefTitle, brief, noticeTitle, notice] = PAPERS[end];
  sRect(0x0b0907);
  const pc = sAdd(S.add.container(400, 300));
  const T = (x, y, s, sz, ex, ox) => sText(x - 400, y - 300, s, sz, '#151515', ox ?? 0.5, 0, Object.assign({ fontFamily: 'Georgia, serif' }, ex), pc);
  const R = (x, y, w, h, col) => sAdd(S.add.rectangle(x - 400, y - 300, w, h, col).setOrigin(0), pc);
  const col = (x, y, s, width = 326) => T(x, y, s, 21, { wordWrap: { width }, lineSpacing: 5, align: 'justify' }, 0);
  R(36, 8, 728, 584, 0xe9e2cc);
  T(400, 16, 'EL DIARIO DEL HACK', 48);
  R(56, 74, 688, 3, 0x151515);
  T(400, 82, date + ' DE NOVIEMBRE, 2026  ·  SANTIAGO  ·  $500', 12);
  R(56, 100, 688, 1, 0x151515);
  T(400, 108, headline, 33, { fontStyle: 'bold' });
  T(400, 150, subhead, 20, { fontStyle: 'italic' });
  R(56, 178, 688, 2, 0x151515);
  R(400, 190, 1, 392, 0x151515);
  col(58, 190, story);
  T(414, 190, briefTitle, 20, {}, 0);
  col(414, 220, brief);
  T(572, 370, noticeTitle, 20);
  col(424, 410, notice, 296);
  if (end) T(572, 546, 'FIN', 28);
  const g = sAdd(S.add.graphics(), pc);
  g.lineStyle(4, 0xc0201a, 0.9).strokeEllipse(172, 146, 342, 190);
  pc.setScale(3).setAngle(-540).setAlpha(0);
  S.tweens.add({ targets: pc, scale: 1, angle: end ? 1.5 : -1.5, alpha: 1, duration: 1100, ease: 'Cubic.easeOut', onComplete: () => { sfxDoor(); uiCam.shake(180, 0.008); } });
  uPPress = sText(400, 596, 'START · CONTINUAR', 11, '#888', 0.5, 1);
}
function paperUpdate() {
  uPPress.setAlpha(modeT > 1.6 ? 0.5 + M.sin(modeT * 4) * 0.5 : 0);
  if (modeT > 1.6 && anyPr()) { sfxClick(); if (uPaperEnd) goTitle(); else goCall(1); }
}
// The call: a red desk phone alone in the dark. It rings, the speaker turns
// on, and the voice comes out of it line by line. B1 next line, hold START hangs up.
function goCall(n) {
  screen('call'); uCardN = n;
  const [nm, ...ln] = CALLS[n - 1];
  phone = { nm, ln, i: -1, ch: 0, hold: 0, skip: 0 };
  sRect(0x060508);
  sAdd(S.add.rectangle(0, 430, W, 170, 0x1c130c).setOrigin(0)); // the desk
  sAdd(S.add.rectangle(0, 430, W, 6, 0x2c2016).setOrigin(0));
  sAdd(S.add.image(400, -40, 'cone').setOrigin(0, 0.5).setBlendMode(1).setRotation(PI / 2).setScale(2.6, 2.2).setTint(0xffe2a0).setAlpha(0.18)); // desk lamp
  const uPhone = sAdd(S.add.container(400, 470));
  const g = add(uPhone, S.add.graphics()), cord = add(uPhone, S.add.graphics());
  g.fillStyle(0x000000, 0.4).fillEllipse(0, 34, 360, 40); // shadow
  g.fillStyle(0x6a0c0c).fillRoundedRect(-150, -46, 300, 84, 20).fillStyle(0x8e1414).fillRoundedRect(-136, -62, 272, 64, 22); // body
  g.fillStyle(0xe6dcc4).fillCircle(0, -26, 44).fillStyle(0x1a1a1a);
  for (let i = 0; i < 10; i++) { const a = -2.2 + i * 0.47; g.fillCircle(M.cos(a) * 31, -26 + M.sin(a) * 31, 6); } // rotary dial
  g.fillStyle(0x8e1414).fillCircle(0, -26, 14).fillStyle(0xe6dcc4).fillCircle(0, -26, 5);
  g.fillStyle(0x2a0606); for (let i = 0; i < 4; i++) g.fillRect(96, -34 + i * 9, 34, 4); // speaker grille
  cord.lineStyle(5, 0x5a0a0a); for (let i = 0; i < 9; i++) cord.strokeCircle(150 + i * 14, 30 + M.sin(i) * 3, 9); // coiled cord
  uHandset = add(uPhone, S.add.container(0, -86));
  add(uHandset, S.add.graphics()).fillStyle(0x7a1010).fillRoundedRect(-150, -12, 300, 30, 14).fillStyle(0x8e1414).fillRoundedRect(-170, -2, 76, 36, 14).fillRoundedRect(94, -2, 76, 36, 14);
  uCallName = sText(400, 52, '¡RIIIING!', 22, '#ffd400');
  uCallTxt = sText(400, 92, '', 20, '#ece6d8', 0.5, 0, { wordWrap: { width: 660 }, align: 'center', lineSpacing: 7, fontStyle: 'bold' });
  uCallHint = sText(400, 588, '', 11, '#776');
}
function callUpdate(dt) {
  const c = phone, ringing = c.i < 0;
  if (ringing) {
    // the handset jumps on its cradle while it rings
    const ph = modeT % 3, on = ph < 0.4 || (ph > 0.6 && ph < 1); // it never stops until you answer
    ringBell(on);
    uHandset.setY(-86 - (on ? rnd(0, 6) : 0)).setAngle(on ? rnd(-3, 3) : 0);
    uCallHint.setText('B1 · CONTESTAR');
    if (modeT > 0.5 && (pr('1') || pr('S'))) { ringStop(); c.i = 0; sfxClick(); uHandset.setY(-86).setAngle(0); uCallName.setText('☎ ' + c.nm + ' · ALTAVOZ'); }
    return;
  }
  if (c.i >= c.ln.length) {
    // Give the disconnected line a beat before the night begins.
    if ((c.hold += dt) > (uCardN == 5 ? 1.6 : 0.6)) goCard(uCardN);
    return;
  }
  if (hd('S')) { if ((c.skip += dt) > 0.7) return hangUp(c); } else c.skip = 0;
  const line = c.ln[c.i], prev = c.ch | 0;
  c.ch = M.min(line.length, c.ch + dt * (line == '...' ? 4 : 36) / .85); // silences are slow
  const talking = c.ch < line.length;
  if ((c.ch | 0) != prev && (c.ch | 0) % 2 == 0 && line[c.ch | 0] != ' ') sfxBlip(1, c.nm == 'NACHO' ? rnd(155, 255) : rnd(275, 445));
  uCallTxt.setText(line.slice(0, c.ch | 0));
  if (!talking && uCardN == 5 && c.i == c.ln.length - 1) {
    uCallHint.setText('');
    if ((c.hold += dt) >= 2) hangUp(c, true);
    return;
  }
  uCallHint.setText((talking ? '' : 'B1 · SIGUIENTE      ') + 'MANTÉN START · COLGAR');
  if (pr('1')) {
    if (talking) c.ch = line.length;
    else { c.i++; c.ch = 0; if (c.i >= c.ln.length) hangUp(c); }
  }
}
function hangUp(c, cut) {
  c.i = c.ln.length; c.hold = 0;
  if (cut) { sfxClick(); uCallTxt.setText(c.ln[c.ln.length - 1] + '\n\n*click*'); uCallName.setText('☎ LLAMADA CORTADA').setColor('#ff5555'); }
  else { sfxClick(); uCallTxt.setText(''); uCallName.setText('*click*'); }
  uCallHint.setText('');
}
function goCard(n) {
  screen('card'); uCardN = n;
  sRect(0);
  uC1 = sText(400, 270, '12:00 AM', 54);
  uC2 = sText(400, 330, 'NOCHE ' + n, 26, '#aab');
  sfxStatic(0.4);
}
function cardUpdate() {
  const a = modeT < 0.4 ? modeT / 0.4 : modeT > 2.2 ? M.max(0, 1 - (modeT - 2.2) / 0.4) : 1;
  uC1.setAlpha(a * (M.random() < 0.04 ? 0.4 : 1)); uC2.setAlpha(a);
  if (modeT > 2.6 || (modeT > 0.6 && pr('S'))) startNight(uCardN);
}

// =====================================================================
// NIGHT SETUP
// =====================================================================
const mkE = (role, r, [x, y], st, o) => Object.assign({ role, r, x, y, st, fx: 1, t: 0, anim: 0, snd: rnd(0, 2), shake: 0, ot: rnd(1, 3), kd: null, at: 0 }, o);
function startNight(n) {
  clearScreen();
  if (FX) S.cameras.main.hasPostPipeline = true;
  night = n; NN = NIGHTS[n - 1]; [hl, drain, sueRate, wakeH, patience, flashes] = NN; nightLen = hl * 6; now = 0; power = 99; sueno = n == 1 ? 0 : 8; blackout = 0;
  pitchOn = patience > 0; mentoraOn = n >= 4; coderOn = n == 5; pgrace = 4.2 - n * 0.3;
  lesson = { tabletOpened: false, blocked: false, rested: false };
  firstDeparture = Infinity; scareTablet = 0; camLit = 0;
  view = 'office'; va = 0; pan = (PW - W) / 2; panV = 0; litN = 0; prevCam = null; focus = 'N'; camR = 0; statA = light = plug = cutH = cof = cofT = cofHold = drink = lidY = 0;
  doors = { W: 0, E: 0 }; doorP = { W: 0, E: 0 }; plug = -1; flash = hallu = 0;
  blink = 0; blinkT = rnd(8, 14); dread = heartT = msgT = flick = 0; scareT = rnd(14, 24);
  thought = doomed = null; thOnce = {};
  clicking = clickT = yawn1 = yawn2 = scrOn = 0;
  E = {
    pitcher: mkE('pitcher', 1, PITCH_HOME, 'PITCH', { slide: 1, bar: 1 }),
    sleeper: mkE('sleeper', 5, SLEEP_HOME, 'SLEEP', { wakeAt: rnd(wakeH, wakeH + 1) * hl }),
    mentora: mkE('mentora', 9, [130, 300], 'REST', { t: n == 5 ? FINAL_NIGHT_START.mentora : hl / 2, target: -1, visits: 0, side: 'E' }),
    chef: mkE('chef', 2, CHEF_HOME, 'COOK', { p: 0, bang: 4, t: n == 4 ? 24 : 30 }),
    coder: mkE('coder', 0, [350, 170], 'TYPE', { plugT: FINAL_NIGHT_START.coder }),
    fe: mkE('fe', 0, [SEATS.fe, 170], 'SEAT', { t: [2, 21, 55, 45, FINAL_NIGHT_START.fe][n - 1] }),
    be: mkE('be', 0, [SEATS.be, 170], 'SEAT', { t: 0 }),
  };
  mode = 'play'; modeT = 0;
  wC.setVisible(true); uHud.setVisible(true);
  for (const o of [uPow, uHour, uNight, uSue, uMsg]) o.setVisible(true);
  if (AC) {
    master.gain.value = .8;
    ambG.gain.setTargetAtTime(1, AC.currentTime, 0.5);
  }
  setMsg('', 0);
}
const hourOf = (t) => (t / hl) | 0;
const clockStr = (t) => (hourOf(t) || 12) + ' AM'; // hours only, like FNAF

// ---- thoughts ----
function think(s, once, dur) {
  if (once) { if (thOnce[once]) return; thOnce[once] = 1; }
  thought = { s, t: dur || 3.4 };
}

// =====================================================================
// MAIN UPDATE
// =====================================================================
function update(time, delta) {
  const dt = M.min(0.05, delta / 1000);
  modeT += dt;
  if (FX) { FX.t += dt; if (mode != 'play' && mode != 'scream') Object.assign(FX, { nv: 0, lit: 0, of: +(mode == 'doze'), no: mode == 'title' ? 0.06 : 0.02, ab: 0.2, dk: 0.2, wp: 0 }); }
  if (mode == 'play') { playUpdate(dt); }
  else ({ doze: dozeUpdate, title: titleUpdate, paper: paperUpdate, call: callUpdate, card: cardUpdate, scream: screamUpdate, lose: loseUpdate, win: winUpdate })[mode](dt);
  for (const k in pressed) pressed[k] = 0;
}
function playUpdate(dt) {
  // Give a first-time player time to find the tablet.
  const briefing = night == 1 && !lesson.tabletOpened;
  if (!briefing || now < 10) now += dt;
  if (now >= nightLen) return winNight();
  input(dt);
  updateResources(dt, briefing);
  if (mode != 'play') return;
  if (blackout) {
    if (now >= cutAt) {
      lose('power');
      screamUpdate();
    }
    else {
      updateThoughts(dt);
      render(dt);
    }
    return;
  }
  updateBlink(dt);
  revealDoorway();
  aiPitcher(dt); aiSleeper(dt); aiMentora(dt); aiCoder(dt); aiChef(dt); aiTeam(E.fe, 'W', dt);
  if (mode == 'play') aiTeam(E.be, 'E', dt);
  if (mode != 'play') return;
  updateDoom(dt);
  if (mode != 'play') return;
  audioCues(dt);
  updateThoughts(dt);
  render(dt);
}

// =====================================================================
// INPUT — office (look around, doors, lights, coffee) and cameras
// =====================================================================
function input(dt) {
  const office = view == 'office';
  const dir = hd('R') - hd('L');
  // free look with weight: the chair picks up speed, and glides to a stop when
  // you let go; a soft bump at the ends; it creaks when it starts turning
  if (office && (pr('L') || pr('R')) && M.abs(panV) < 120 && M.random() < 0.6) sfxSwivel();
  const atCounter = pan >= COFFEE_START && pan < COFFEE_END;
  const speed = atCounter ? 670 : 1000;
  panV = lerp(panV, office ? dir * speed : 0, 1 - M.exp(-(dir ? 6 : 24) * dt));
  pan += panV * dt;
  if (pan < 0 || pan > PW - W) { pan = clamp(pan, 0, PW - W); panV *= -0.15; }
  // what you are facing: where your view sits across the room (all the way left = the left door)
  focus = pan < 118 ? 'W' : pan < COFFEE_START ? 'N' : pan < COFFEE_END ? 'C' : 'E';
  if (focus != 'C' || !office) cofHold = 0;
  va = clamp(va + dt * (office ? -1 / .17 : 1 / .22), 0, 1);
  const was = light || camLit;
  light = camLit = clicking = flash = 0;
  // B1 = light · B2 = do something · B3 = the tablet · B4 = previous camera
  if (office) {
    if (drink > 0) return; // drinking: cup in front of your face
    if (pr('3') && !blackout) { view = 'cams'; statA = 0.9; sfxStatic(.12); makeNoise(0.15); return; }
    // somebody got in: nothing in the office responds any more (FNAF1)
    if (doomed) { if (pr('1') || pr('2')) sfxClick(); return; }
    if (va > 0) { lightSnd(was); return; }
    if (focus == 'C') {
      lightSnd(was);
      // coffee: hold B1 to brew a cup, wait for it, press B1 to drink it
      if (!cof && !blackout && hd('1')) { if ((cofHold += dt) > 0.6) { cofHold = 0; cof = 1; cofT = BREW; sfxCoffee(); makeNoise(0.5); } }
      else cofHold = 0;
      if (cof > 1 && pr('1')) { cof = 0; drink = SIP; sfxEat(); makeNoise(0.2); }
      return;
    }
    light = hd('1') && !blackout && focus ? 1 : 0;
    if (pr('1') && light) { HINT.light++; flash = focus; }
    if (pr('2') && focus) { toggleDoor(focus); HINT.door++; }
    lightSnd(was);
    return;
  }
  if (blackout) { view = 'office'; lightSnd(was); return; }
  if (pr('3')) { view = 'office'; sfxStatic(.12); makeNoise(0.15); return; }
  if (va < 1) return;
  lesson.tabletOpened = true;
  // The stick follows the rows and columns drawn on the camera map.
  const direction = ['L','R','U','D'].find(pr);
  let n = direction ? CAMERA_LINKS[camR][direction] ?? -1 : -1;
  if (pr('4') && prevCam != null) { [camR, prevCam] = [prevCam, camR]; n = -1; sfxStatic(.12); statA = 0.85; }
  if (n >= 0) { prevCam = camR; camR = n; sfxStatic(.12); statA = 0.85; if (now > hl * 2 && !hd('1') && M.random() < 0.035) hallu = 0.14; } // sometimes a face that is not there
  // FNAF2: the feed is almost black. B1 = the camera's flashlight (costs power)
  camLit = hd('1') && va >= 1 ? 1 : 0;
  if (camLit) litN = 1;
  const mentor = E.mentora;
  if (mentor.st == 'CALL' && camR == mentor.target && pr('2')) divertMentora(mentor);
  lightSnd(was);
  // B2 is this camera's action: the pitch room clicker, or the coder's cord
  clicking = hd('2') && camR == 1 && pitchOn && E.pitcher.r == 1;
  if (camR == 0 && plug >= 0 && hd('2')) { if ((cutH += dt) > 1.2) { cutH = 0; plug = -1; sfxErr(); setMsg('ENCHUFE CORTADO', 1.4); coderAngry(); } } else cutH = 0;
  if (clicking) {
    const p = E.pitcher;
    p.bar = M.min(1, p.bar + dt / 6); // a full refill takes a while
    if ((clickT = (clickT || 0) - dt) <= 0) { clickT = 0.45; p.slide++; HINT.slide++; sfxClick(); }
  }
}
// flashlight sounds: a heavy click on, a click off, and the bulb buzzing while it is on
function lightSnd(was) {
  const on = light || camLit;
  if (on && !was) sfxFlash(1); else if (!on && was) sfxFlash(0);
  if (AC) buzzG.gain.setTargetAtTime(on ? 0.035 : 0, AC.currentTime, 0.03);
}
function toggleDoor(d) {
  if (d == 'N') return think('Aquí no hay puerta...', 'nodoor');
  if (blackout) { sfxErr(); think('No hay energía... las puertas no responden.', 'outdoor'); return; }
  doors[d] ^= 1;
  sfxDoor(); makeNoise(0.35);
}
// noise stirs the sleepwalker while he stands in the front hallway (UCN-style
// meter): it adds up and drains slowly, so one thing at a time is fine.
function makeNoise(v, why) {
  const s = E.sleeper;
  if (s.st != 'FRONT') return;
  s.stir += v;
  s.why = why || 'Hiciste demasiado ruido.';
  if (!s.warn) {
    s.warn = true;
    statA = M.max(statA, .76);
    sfxStir();
  }
}
const doorClosed = (d) => doorP[d] > 0.5;
// A closing command stops an attack immediately, even before the sprite reaches halfway.
const doorBlocks = (d) => SIDES.includes(d) && (doors[d] || doorClosed(d));

// ---- Resources ----
function updateResources(dt, briefing) {
  for (const d of SIDES) doorP[d] = clamp(doorP[d] + (doors[d] ? dt : -dt) / 0.45, 0, 1);
  if (cof == 1 && (cofT -= dt) <= 0) { cof = 2; tone(880, 0.25, 's', 0.12); } // ding
  if (drink > 0 && (drink -= dt) <= 0) { sueno = M.max(0, sueno - 60); setMsg('☕  -SUEÑO', 1.2); }
  if (!blackout) {
    // FNAF-style power: doors, door light, cameras and the coder's extension cord all drain
    let u = drain + (doorP.W > 0) * 0.2 + (doorP.E > 0) * 0.2 + light * 0.32 + camLit * 0.2 + (view == 'cams') * 0.1 + (cof == 1) * 0.15;
    if (plug >= 0) u += night >= 5 ? 0.5 : 0.4;
    usage = 1 + (doorP.W > 0) + (doorP.E > 0) + (light || camLit) + (view == 'cams') + (cof == 1) + (plug >= 0); // one bar per device
    if (!briefing && (power -= u * NN[10] * dt) <= 0) powerOut();
  }
  if (briefing || blackout) return;
  sueno += dt * 100 / sueRate;
  if (sueno > 50 && !yawn1) { yawn1 = 1; sfxYawn(); think('*bostezo* Se me cierran los ojos... necesito un café.', 'sleepy'); }
  if (sueno > 75 && !yawn2) { yawn2 = 1; sfxYawn(); think('No... no te duermas. CAFÉ.', 'sleepy2'); }
  if (sueno < 40) yawn1 = yawn2 = 0;
  if (sueno > 90) think('Los ojos... se me cierran solos...', 'sleepy3', 3);
  if (sueno >= 100) doze();
}
function powerOut() {
  power = light = camLit = cof = drink = 0; blackout = 1; doors = { W: 0, E: 0 }; view = 'office';
  cutAt = now + rnd(6, 9);
  thought = doomed = null;
  msgT = blink = lidY = 0;
  if (AC) {
    fanG.gain.setTargetAtTime(0, AC.currentTime, .2);
    buzzG.gain.setTargetAtTime(0, AC.currentTime, .04);
    ambG.gain.setTargetAtTime(0, AC.currentTime, .5);
    droneG.gain.setTargetAtTime(0, AC.currentTime, .95);
  }
  sfxErr(); noise(2, 0.4, 'l', 200, 60);
}
function updateBlink(dt) {
  if (blink > 0) { blink -= dt; return; }
  if (sueno < 30 || (blinkT -= dt) > 0) return;
  const s = (sueno - 30) / 70;
  blink = blinkDur = lerp(0.14, 0.6, s);
  blinkT = lerp(9, 2.2, s) * rnd(0.7, 1.3);
}
const blinking = () => blink > 0;
function setMsg(s, t) { uMsg.setText(s); msgT = t; }
function discoverySound() {
  // Let the bulb click clear before the low impact and detuned, metallic tail.
  tone(148, .76, 's', .83, 52, .055);
  tone(246, .93, 'w', .32, 105, .07);
  tone(258, 1.14, 't', .32, 112, .09);
  noise(.26, .48, 'b', 1380, 380, .06, 2);
}
function revealDoorway() {
  if (view != 'office' || !light || blinking() || doorClosed(focus)) return;
  const e = Object.values(E).find(visitor => visitor.role != 'sleeper' && visitor.kd == focus && !visitor.revealed);
  if (!e) return;
  e.revealed = true;
  discoverySound();
}
function updateThoughts(dt) {
  if (thought && (thought.t -= dt) <= 0) thought = null;
  if (!blackout && view == 'office' && va == 0 && focus == 'N' && !blinking() && E.sleeper.st == 'FRONT') {
    think('No debo despertarlo. Apago la luz y espero. Nada de mover puertas, usar la tableta ni preparar o tomar café.', 'quiet', 5.5);
  }
}

// hunters never cut through your office
function blocked(all) {
  const b = new Set();
  for (const d of ADOOR) if (all || doorClosed(d)) b.add(ek(CTRL, CDOOR[d].adj));
  return b;
}
// ---- The AI core (FNAF1): a movement opportunity every iv seconds; it
// succeeds with chance level/20. Levels come from the night and the hour.
const lvl = (k) => { const b = NN[LV[k]]; return b ? M.min(20, b + clamp(hourOf(now) - 1, 0, 3)) : 0; };
function roll(e, iv, dt, L) {
  if ((e.ot -= dt) > 0) return 0;
  e.ot = iv * rnd(0.8, 1.2);
  return rnd(0, 20) < (L ?? lvl(e.role));
}
// Nobody moves while you watch them: they don't leave the room on your screen
// (unless they're out of sight in a doorway) and don't walk into it either.
// The moment you look away, they go.
const looking = (r) => view == 'cams' && va >= 1 && camR == r && !blackout;
function canGo(e, n) {
  if (view == 'office' && e.kd == focus && light && !doorClosed(focus)) return false;
  if (e.role == 'fe' || e.role == 'be' || e.role == 'coder') {
    if (view == 'cams' && va >= 1 && (camR == n || camR == e.r)) return false;
  }
  return !(looking(e.r) && !blindDoor(e)) && !looking(n);
}
function move(e, n, s) {
  if (!canGo(e, n)) return (e.ot = 0.25), 0; // try again as soon as you look away
  hop(e, n, s); return 1;
}
// People never walk on screen: one opportunity, one room, and they are simply
// somewhere else (only while you don't watch: see move). The footsteps tell you
// how close they are.
function hop(e, n, s) {
  glitch(e.r); glitch(n);
  s = s || pick(ROOMS[n][11]);
  e.fx = s[0] < ROOMS[n][2] / 2 ? 1 : -1; // facing into the room
  e.r = n; e.x = s[0]; e.y = s[1];
  sfxRoom([1.2, 1, 0.65, 0.45, 0.35][HOP[n]] ?? 0.3);
}
// one room closer to room t (s: where to stand once there). True once there.
function stepTo(e, t, s) {
  if (e.r != t) { const p = bfs(e.r, t, blocked(1)); if (p) move(e, p[1], p[1] == t ? s : 0); }
  return e.r == t;
}
// a random room next door, among the ones people hang around in
const nextRoam = (e) => pick(NB[e.r].filter((q) => ROAM.includes(q)));
// the camera you are watching cuts out for a moment when someone moves in it
function glitch(r) { if (view == 'cams' && camR == r && va >= 1) { statA = 1; sfxStatic(0.25); } }

// ---- Doorways ----
// the blind spot right outside each door takes one person at a time
const doorFree = (d, e) => !Object.values(E).some((o) => o != e && o.kd == d);
// step into the doorway of door d: a floorboard creaks on that side
function toDoor(e, d) {
  // The figure waits around the corner until the beam leaves the entrance.
  if (view == 'office' && focus == d && light) return 0;
  const a = CDOOR[d].adj, b = blindPt(d);
  if (e.r != a) { if (!move(e, a, b)) return 0; }
  else if (canGo(e, a)) [e.x, e.y] = b;
  else return (e.ot = 0.25), 0;
  Object.assign(e, { kd: d, at: 0, kt: 0, kn: 0.4, bt: 0.8, revealed: false, attackIn: 0 });
  sfxCreak();
  if (night == 2 && (e.role == 'fe' || e.role == 'be')) {
    sfxStep(2.1, .12);
    sfxStep(1.65, .4);
  }
  if (e.role == 'pitcher') think('¡Está pidiendo preguntas! Suelta y pulsa B1 varias veces en el centro.', 'frontPitch', 4);
  return 1;
}
// waiting in a doorway: 1 while the door is open (e.at counts how long),
// 0 while closed (they knock now and then, e.kt counts how long)
function atDoor(e, dt) {
  if (!doorBlocks(e.kd)) return (e.at += dt), 1;
  e.at = 0; e.kt += dt;
  if ((e.kn -= dt) <= 0) { e.kn = rnd(3, 6); sfxKnock(); }
  return 0;
}
const leaveDoor = (e) => (e.kd = null);

// =====================================================================
// AI
// =====================================================================
// THE TEAM (FNAF1 Bonnie & Chica): Frontend and Backend leave the code room
// along a fixed route to their side of your office. The corner camera is the
// last warning: they stand right under it, staring into the lens. Next step,
// your doorway. Door closed on their next opportunity = back to the dining
// room. Door open = they are in.
const ROUTE = { fe: [0, 3, 7, 8], be: [0, 3, 9, 10] };
// Night 2 tours the side rooms through the corridors shown on the camera map.
const NIGHT_TWO_ROUTE = { fe: [0, 3, 2, 3, 7, 6, 7, 8], be: [0, 3, 4, 3, 9, 11, 9, 10] };
const DETOUR = { fe: { 3: 2, 7: 6 }, be: { 3: 4, 9: 11 } };
const STARE = { 8: [92, 96], 10: [208, 96] }; // right under the corner camera
const NIGHT_TWO_OPEN_WINDOW = 4.5;
function teamAtDoor(e, dt, ready, openWindow) {
  if (!atDoor(e, dt)) { e.attackIn = 0; return false; }
  // Keep the intruder outside and visible during the last chance to shut the door.
  if (e.attackIn > 0) {
    e.attackIn -= dt;
    if (e.attackIn <= 0 && !doomed) {
      const tablet = va;
      lose(e.role, null, e.kd);
      scareTablet = tablet;
      scrDelay = 0;
      screamUpdate();
    }
  } else if (ready && e.at >= openWindow && !doomed) {
    e.attackIn = 1.5;
    sfxStep(2.2);
  }
  return true;
}
function aiTeam(e, d, dt) {
  e.anim += dt;
  const firstLesson = night == 1 && e.role == 'fe';
  const tour = night == 2;
  const route = (tour ? NIGHT_TWO_ROUTE : ROUTE)[e.role];
  const firstStop = route[1];
  if (e.st == 'SEAT') {
    if (firstLesson && (!lesson.tabletOpened || modeT < 12)) return;
    if (e.role == 'be' && (night == 1 || now < firstDeparture + (night == 2 ? 34 : 21))) return;
    if (e.role == 'be' && night == 5 && now < FINAL_NIGHT_START.be) return;
    e.t -= dt;
    if (e.t > 0 || !canGo(e, firstStop)) return;
    sfxChair(.9);
    hop(e, firstStop);
    e.st = 'ROAM'; e.ot = firstLesson ? 4 : 5; e.routeIndex = 1;
    if (e.role == 'fe') firstDeparture = now;
    return;
  }
  if (firstLesson && !lesson.blocked) {
    if (e.kd) {
      if (!teamAtDoor(e, dt, true, 12) && e.kt > 1.3 && move(e, 3)) {
        leaveDoor(e); lesson.blocked = true;
        E.sleeper.wakeAt = now + 7;
      }
    } else if ((e.ot -= dt) <= 0) {
      e.ot = 3;
      if (e.r == 8) toDoor(e, d);
      else move(e, e.r == 3 ? 7 : 8, e.r == 7 ? STARE[8] : null);
    }
    return;
  }
  if (firstLesson && !lesson.rested) return;
  if (firstLesson && !lesson.revisited && !e.kd) {
    if ((e.ot -= dt) > 0) return;
    e.ot = 6;
    if (e.r == 8) lesson.revisited = toDoor(e, d);
    else move(e, e.r == 3 ? 7 : 8, e.r == 7 ? STARE[8] : null);
    return;
  }
  if (e.st == 'RETREAT') {
    if ((e.ot -= dt) <= 0) {
      e.ot = 2.6;
      if (stepTo(e, firstStop)) { e.st = 'ROAM'; e.routeIndex = 1; }
    }
    return;
  }
  if (e.st != 'ROAM') return;
  const go = roll(e, tour && !e.kd ? 2.6 : 4.5, dt);
  if (e.kd) {
    const openWindow = tour ? NIGHT_TWO_OPEN_WINDOW : 2.5;
    if (!teamAtDoor(e, dt, go, openWindow) && go) {
      if (tour) {
        const previous = route[route.length - 2];
        if (move(e, previous)) { leaveDoor(e); e.st = 'RETREAT'; e.ot = 2.6; }
      } else if (move(e, firstStop)) leaveDoor(e);
    }
    return;
  }
  if (!go) return;
  const i = tour ? e.routeIndex : route.indexOf(e.r);
  if (tour) {
    const next = route[i + 1];
    if (next == null) { if (doorFree(d, e)) toDoor(e, d); }
    else if (move(e, next, STARE[next])) e.routeIndex++;
    return;
  }
  const dr = DETOUR[e.role][e.r];
  if (i < 0) move(e, e.from); // back from a detour
  else if (i == route.length - 1) { if (doorFree(d, e)) toDoor(e, d); }
  else if (dr != null && M.random() < 0.25) { const f = e.r; if (move(e, dr)) e.from = f; }
  else if (i > 1 && M.random() < 0.15) move(e, route[i - 1]); // a step back now and then
  else move(e, route[i + 1], STARE[route[i + 1]]);
}

// THE PITCHER (FNAF2 music box + hallway Foxy): his patience drains while he
// pitches to an empty room. Hold B2 on his camera to pass slides; a full
// refill takes a while, and that time is the price. Empty: he walks off to
// find an audience. While you watch him on camera he stays and pitches to you.
// In the front hallway, flash him enough times and he goes back to the stage.
function aiPitcher(dt) {
  const p = E.pitcher;
  p.anim += dt;
  if (p.st == 'PITCH') {
    if (!pitchOn) return;
    if (!clicking && (night != 5 || now >= FINAL_NIGHT_START.pitchDrain)) p.bar -= dt / patience;
    p.shake = p.bar < 0.35 ? (0.35 - p.bar) * 4 : 0;
    if (p.bar <= 0) { p.bar = p.shake = 0; p.st = 'SEARCH'; p.ot = 1.5; tone(330, 0.5, 't', 0.1, 220); }
  } else if (p.st == 'SEARCH') {
    // he just stepped off the stage: passing slides now still calls him back
    if (p.r == 1 && p.bar > 0.3) return back(p, '"¡AH! ¡SIGUIENTE DIAPOSITIVA!"');
    if (!roll(p, 2.5, dt)) return; // while you watch him he stays and pitches to the camera
    if (p.r != 12) stepTo(p, 12);
    else if (doorFree('N', p) && toDoor(p, 'N')) { p.st = 'FRONT'; p.fl = 0; }
  } else if (p.st == 'FRONT') {
    p.at += dt; p.shake = M.max(0, p.shake - dt * 2);
    if (flash == 'N') { p.at = 0; p.shake = 1.4; if (++p.fl >= flashes) return back(p, '"...ok, ok. Sin preguntas."'); }
    if (p.at > pgrace) doom('pitcher', p);
  } else if (p.st == 'RETURN' && (p.ot -= dt) <= 0) {
    p.ot = 1.2;
    if (stepTo(p, 1, PITCH_HOME)) { p.st = 'PITCH'; [p.x, p.y] = PITCH_HOME; }
  }
}
// send the pitcher back to the stage, with some patience
function back(p, msg) { p.st = 'RETURN'; p.ot = 0.8; p.bar = M.max(p.bar, 0.4); p.shake = 0; leaveDoor(p); setMsg(msg, 1.6); }

// THE SLEEPWALKER (FNAF4): sleeps in the siesta room, gets up now and then and
// ends up standing in your front hallway, snoring, his z's floating out of
// the dark. Noise from doors, the tablet and coffee stirs him.
// So does light after a quick look. Stir drains slowly. At full,
// he wakes up. Leave him be and he shuffles back to bed.
function aiSleeper(dt) {
  const s = E.sleeper;
  s.anim += dt;
  if (s.st == 'SLEEP') {
    s.shake = 0;
    if ((night != 1 || lesson.blocked) && now > s.wakeAt) { s.st = 'WALK'; s.ot = 2; tone(300, 0.3, 't', 0.1, 500); }
  } else if (s.st == 'WALK') {
    if (night == 1 && !lesson.rested) {
      if ((s.ot -= dt) > 0) return;
      s.ot = 2;
    } else if (!roll(s, night == 2 ? 2.25 : 3, dt)) return;
    if (s.r != 12) {
      if (night >= 3 && M.random() < 0.2) move(s, nextRoam(s));
      else stepTo(s, 12);
    }
    else if (doorFree('N', s) && toDoor(s, 'N')) Object.assign(s, { st: 'FRONT', t: rnd(7, 11), stir: 0, lit: 0, warn: false });
  } else if (s.st == 'FRONT') {
    s.at += dt;
    const lit = view == 'office' && focus == 'N' && light;
    if (lit && s.lit == 0) makeNoise(.15, 'Lo alumbraste demasiado.');
    s.lit = lit ? s.lit + dt : 0;
    if (s.lit > (night == 1 && !lesson.rested ? 1.5 : .4)) makeNoise(dt * 1.1, 'Lo alumbraste demasiado.');
    if (s.stir >= 1) return wakeUp(s);
    s.stir = M.max(0, s.stir - dt * 0.12);
    if (s.stir === 0) s.warn = false;
    if ((s.t -= dt) <= 0) { leaveDoor(s); s.st = 'HOME';
      if (night == 1 && !lesson.rested) {
        lesson.rested = true; E.fe.ot = 10;
        think('Me vendría bien un café.', 'coffeeLesson', 2.5);
      } s.ot = 1.5; }
  } else if (s.st == 'HOME') {
    if ((s.ot -= dt) <= 0) {
      s.ot = night == 2 ? 1.3 : 2.2;
      if (stepTo(s, 5, SLEEP_HOME)) {
        s.st = 'SLEEP';
        [s.x, s.y] = SLEEP_HOME;
        s.wakeAt = now + hl * rnd(0.5, 1) * (1.2 - night * 0.1);
      }
    }
  } else if (s.st == 'ANGRY' && (s.t -= dt) <= 0) doom('sleeper', s, s.why);
}
function wakeUp(s) { s.st = 'ANGRY'; s.t = 0.7; s.shake = 1.4; tone(140, 0.6, 'w', 0.35, 70); setMsg('"¡¿QUIÉN ANDA AHÍ?!"', 1.5); }

// A lit speaker marks the room where the mentor can be called away.
function divertMentora(m) {
  m.st = 'DIVERT'; m.ot = .75;
  tone(620, .12, 's', .15); tone(840, .18, 's', .15, 0, .13);
  sfxStep(.75); sfxStep(.35, .4);
  setMsg('«Se solicita a la mentora en ' + ROOMS[m.target][0].toLowerCase() + '».', 2.4);
  think('Los pasos se alejan.', 0, 3);
}
function aiMentora(dt) {
  if (!mentoraOn) return;
  const m = E.mentora;
  m.anim += dt;
  if (m.st == 'REST') {
    if ((m.t -= dt) > 0) return;
    m.side = m.visits ? pick(SIDES) : 'E';
    m.target = m.visits ? pick([2, 3, 4, 5, 11]) : 3;
    m.visits++; m.st = 'CALL'; m.t = m.visits == 1 ? 17 : 11;
    m.ot = 1; sfxMurmur(1.4);
    setMsg('«¿Hay alguien por aquí?»', 2.5);
  }
  if (m.st == 'CALL' && (m.t -= dt) <= 0) { m.st = 'APPROACH'; m.ot = .2; }
  if (m.kd) {
    if (atDoor(m, dt)) { if (m.at > 3.2) doom('mentora', m); }
    else if (m.kt > 2.5 && move(m, 3)) { leaveDoor(m); m.st = 'REST'; m.t = 38; }
    return;
  }
  if ((m.ot -= dt) > 0) return;
  m.ot = 1.6;
  if (m.st == 'DIVERT') {
    if (stepTo(m, m.target)) { m.st = 'REST'; m.t = rnd(32, 44); }
  } else if (m.st == 'CALL') {
    stepTo(m, m.side == 'E' ? 9 : 7);
  } else if (m.st == 'APPROACH') {
    if (m.r != CDOOR[m.side].adj) stepTo(m, CDOOR[m.side].adj);
    else if (doorFree(m.side, m)) toDoor(m, m.side);
  }
}

// The Chef counts portions while the tablet is down, then charges the west shutter.
function aiChef(dt) {
  if (night < 4) return;
  const c = E.chef;
  if (c.st == 'COOK') {
    if (view != 'office' || (c.t -= dt) > 0) return;
    if (++c.p < CHEF_POS.length) {
      [c.x, c.y] = CHEF_POS[c.p]; c.shake = c.p * .35;
      c.t = night == 4 ? 18 : 15;
    } else {
      c.st = 'RUN'; c.t = c.snd = c.step = 0;
      setMsg('¡EL CHEF CORRE HACIA LA IZQUIERDA!', 3);
    }
  } else if (c.st == 'RUN') {
    const t = (c.t += dt);
    if ((c.step -= dt) <= 0) { c.step = .24; sfxStep(lerp(.7, 2.4, t / 4.2)); }
    if (t < .8) Object.assign(c, { r: 3, x: lerp(130, 250, t / .8), y: 280 });
    else if (t < 3.4) Object.assign(c, { r: 7, x: 130, y: lerp(60, 760, (t - .8) / 2.6) });
    else if (t < 4.2) {
      const [x, y] = blindPt('W'), k = (t - 3.4) / .8;
      Object.assign(c, { r: 8, x: lerp(150, x, k), y: lerp(40, y, k) });
    } else if (doorBlocks('W')) {
      power -= c.bang; c.bang = M.min(10, c.bang + 3);
      makeNoise(.3); sfxKnock(); setMsg('*¡BAM!*  −ENERGÍA', 1.6);
      c.st = 'BACK'; c.ot = 1.5;
    } else if (!doomed) {
      c.kd = 'W'; doom('chef', c);
    }
  } else if (c.st == 'BACK' && (c.ot -= dt) <= 0) {
    c.ot = 1.5;
    if (stepTo(c, 2, CHEF_HOME)) Object.assign(c, { st: 'COOK', p: 0, t: 18, shake: 0 });
  }
}

// THE CODER (FNAF1 Freddy at the power-out): plugs his rig into your power on
// the last night. Cut the cord and he comes to complain at one of your doors.
function coderAngry() {
  const c = E.coder;
  if (c.st == 'COMPLAIN') return;
  c.st = 'WAIT'; c.t = rnd(1.5, 3); leaveDoor(c);
}
function aiCoder(dt) {
  const c = E.coder;
  c.anim += dt;
  if (c.st == 'TYPE') { if (coderOn && plug < 0 && (c.plugT -= dt) <= 0) { plug = 0; setMsg('SOBRECARGA · CAM 1A', 3); sfxType(0.8); } }
  else if (c.st == 'WAIT') {
    if (!looking(c.r) && (c.t -= dt) <= 0) { c.st = 'COMPLAIN'; c.side = pick(SIDES); c.ot = 1; }
  }
  else if (c.st == 'COMPLAIN') {
    if (c.kd) {
      if (atDoor(c, dt)) { if (c.at > 2.2) doom('coder', c); }
      else if (c.kt > c.stay) { leaveDoor(c); c.st = 'BACK'; c.ot = 1; }
    } else if ((c.ot -= dt) <= 0) {
      c.ot = 2.2;
      const a = CDOOR[c.side].adj;
      if (c.r != a) stepTo(c, a); else if (doorFree(c.side, c) && toDoor(c, c.side)) c.stay = rnd(7, 11);
    }
  } else if (c.st == 'BACK') {
    if ((c.ot -= dt) <= 0) { c.ot = 2; if (stepTo(c, 0, [SEATS.coder, 170])) { c.st = 'TYPE'; c.plugT = rnd(32, 44); } }
  }
}

// ---- Attacks ----
// When a threat gets in it does NOT scream right away. The lights flicker,
// every button in the office goes dead, and it waits. The scare lands when you
// lower the camera or turn your head... or whenever it feels like it.
function doom(why, e, hint) {
  if (doomed || doorBlocks(e.kd)) return;
  doomed = { why, hint, t: 0, max: rnd(2.2, 3.4), side: e.kd || 'W' };
  leaveDoor(e); e.r = CTRL; // inside now, out of every camera and doorway
  e.ps = e.st; e.st = 'DOOM'; // keeps sounding exactly as before: no silence gives it away
  sfxGroan();
}
function updateDoom(dt) {
  const d = doomed;
  if (!d) return;
  d.t += dt;
  if (M.random() < dt * 2.5) flick = rnd(.05, .25);
  const lowering = view == 'office' && va > 0 && va < .97;
  const officeAction = view == 'office' && (pr('L') || pr('R') || pr('1') || pr('2'));
  if ((d.t > dt && (lowering || officeAction)) || d.t > d.max) {
    const tablet = lowering ? va : 0;
    lose(d.why, d.hint, d.side);
    scareTablet = tablet; scrDelay = 0; screamUpdate();
  }
}

// =====================================================================
// AUDIO CUES & SUSPENSE (everything is heard from the chair)
// =====================================================================
function audible(e) {
  const h = HOP[e.r];
  if (h == 1) { const d = ADOOR.find((q) => CDOOR[q].adj == e.r); return 0.3 + 0.5 * clamp(1 - dist(e.x, e.y, ...blindPt(d)) / 400, 0, 1); }
  return [1, 0, 0.12, 0.03, 0.01][h] ?? 0; // far away you hear nothing at all
}
function audioCues(dt) {
  // no music that rises when danger is near: the dread only follows the clock and your sleepiness
  const d = M.max(0.15 + (now / nightLen) * 0.25, (sueno - 80) / 25);
  dread = lerp(dread, clamp(d, 0, 1), 1 - M.pow(0.2, dt));
  flick -= dt;
  if (flick < -6 && M.random() < dt * 0.06) flick = rnd(0.1, 0.35);
  if (!AC) return;
  muffle.frequency.setTargetAtTime(9000 - sueno * 60, AC.currentTime, 0.2);
  fanG.gain.setTargetAtTime(blackout ? 0 : view == 'office' ? 0.12 : 0.047, AC.currentTime, 0.4);
  droneG.gain.setTargetAtTime(0.012 + dread * 0.09, AC.currentTime, 0.4);
  droneF.frequency.setTargetAtTime(90 + dread * 600, AC.currentTime, 0.4);
  for (const k in E) {
    const e = E[k];
    if ((e.snd -= dt) > 0) continue;
    const v = audible(e), st = e.st == 'DOOM' ? e.ps : e.st; // sounds as if still on the way
    if (k == 'pitcher') {
      if (st == 'PITCH') {
        if (pitchOn && e.bar < 0.35) { sfxBabble(v * (1.6 - e.bar * 2), 420 + (0.35 - e.bar) * 400); e.snd = 0.5 + e.bar * 2; } // "eh... eh..."
        else { if (pitchOn) sfxBabble(v * 0.8, 300); e.snd = rnd(0.6, 1.4); }
      } else if (st == 'SEARCH') { sfxBabble(v * 1.3, 380); e.snd = 0.9; }
      else if (st == 'FRONT') { sfxBabble(0.9, 480); e.snd = rnd(0.5, 0.9); } // right in your hallway: questions
      else e.snd = 1;
    } else if (k == 'sleeper') {
      if (st == 'SLEEP') { sfxSnore(v); e.snd = 2.8; }
      else if (st == 'FRONT') { sfxSnore(1.1); e.snd = 2.6; } // standing in your hallway, snoring
      else e.snd = 2;
    } else if (k == 'mentora') {
      if (!mentoraOn) e.snd = 5;
      else if (st == 'APPROACH' && !e.kd) { sfxStep(v * 1.6); tone(2400, 0.03, 'q', 0.04 * v); e.snd = 0.2; } // fast heels
      else { sfxMurmur(v * 0.7); e.snd = rnd(2.5, 4.5); }
    } else if (k == 'chef') {
      if (st == 'COOK') { noise(0.4, 0.05 * v, 'b', 2500, 0, 0, 2); e.snd = rnd(1, 2); } // sizzling
      else e.snd = 1; // gone quiet: he is out
    } else if (k != 'coder') { if (st == 'SEAT') sfxType(v * 0.4); e.snd = st == 'SEAT' ? rnd(0.4, 1) : 1; } // the team
    else if (st == 'TYPE') { sfxType(v * 0.6); e.snd = rnd(0.3, 0.8); }
    else e.snd = 1;
  }
  // breathing right behind an open side door, from the moment each one got there
  for (const k in E) {
    const e = E[k];
    if (e.kd && e.kd != 'N' && !doorClosed(e.kd) && (e.bt -= dt) <= 0) { e.bt = 3.2; sfxBreath(0.8); }
  }
  if ((scareT -= dt) <= 0) { scareT = rnd(16, 34); sfxFar(); }
  if (dread > 0.35 && (heartT -= dt) <= 0) { sfxHeart(dread); heartT = lerp(1.1, 0.42, dread); }
}

// =====================================================================
// RENDER
// =====================================================================
const tick = (f) => ((now * f) | 0) % 2;
function render(dt) {
  const camMode = view == 'cams' && va >= 1;
  rC.setVisible(camMode); oC.setVisible(!camMode);
  if (camMode) renderCam(camR); else renderOffice(dt);
  renderHud(dt);
  litA = camLit ? (litA < 0.05 ? 0.6 : M.min(1, litA + dt * 6)) * (M.random() < 0.04 ? 0.7 : 1) : M.max(0, litA - dt * 10);
  if (FX) Object.assign(FX, {
    nv: +camMode, lit: litA, amb: AMB[camR], of: +!camMode,
    no: (camMode ? 0.1 : 0.03) + statA * 0.5 + blackout * 0.05,
    ab: dread * 1.2 + (sueno > 70) * 0.4,
    dk: 0.2 + sueno / 170 + dread * 0.3,
    wp: M.max(0, (sueno - 85) / 15),
  });
}
function renderCam(r) {
  const p = E.pitcher, R = ROOMS[r];
  // FNAF-style slow pan: drift to one side, hold, drift back
  const ph = (now * 0.12 + r * 0.37) % 2;
  rC.x = -(CAMW - W) * clamp(((ph < 1 ? ph : 2 - ph) - 0.15) / 0.7, 0, 1);
  setCam(R[9]);
  bgImg.setTexture('room' + r);
  if (fgImg.setVisible(!!FG[r]).visible) fgImg.setTexture('room' + r + 'f');
  dynG.clear(); emG.clear(); askG.clear();
  for (const o of [projTxt, askTxt, lensImg, zR, ...Object.values(eImg)]) o.setVisible(false);
  const pts = (a) => a.map((q) => { const v = P(...q) || [0, 0]; return { x: v[0], y: v[1] }; });
  // your doors, rolling down, as seen from the corner rooms
  for (const d of SIDES) if (r == CDOOR[d].adj && doorP[d] > 0.02) {
    const [, s, o] = R[10].find((x) => x[0] == CTRL);
    dynG.fillStyle(0x5a5f66).fillPoints(pts(wq(R, s, o - 50, o + 50, 165 * (1 - doorP[d]), 165)), true);
  }
  // the coder's power strip blinks while he is plugged in
  const b = plug == r && P(600, 255, 80);
  if (b) emG.fillStyle(tick(4) ? 0x44ff66 : 0x117722).fillRect(b[0] - 6, b[1] - 6, 12, 12);
  if (r == 1) {
    // the projector screen
    const q = p.st != 'PITCH', t = P(350, 0, 158);
    dynG.fillStyle(q ? 0xffffff : 0xf4f1e0).fillPoints(pts(wq(R, 'N', 210, 490, 108, 200)), true);
    if (t) projTxt.setVisible(true).setPosition(t[0], t[1]).setScale(t[2] * 1.6).setText(q ? '¿PREGUNTAS?' : 'DIAPOSITIVA ' + p.slide).setColor(q ? '#c00' : '#222');
  }
  // people in the shot, far to near
  const order = [];
  for (const k in E) {
    const e = E[k], im = eImg[k], q = (k != 'mentora' || mentoraOn) && e.r == r && !blindDoor(e) && P(e.x, e.y, 0);
    if (!q) continue;
    const [sx, sy, s] = q, sc = 7 * s, lying = k == 'sleeper' && e.st == 'SLEEP';
    const unplugged = k == 'coder' && e.st == 'WAIT';
    const sh = unplugged ? 1.8 * sc * M.sin(e.anim * 95) : e.shake ? e.shake * sc * rnd(-1, 1) : 0;
    const tilt = unplugged ? .10 * M.sin(e.anim * 77) : 0;
    im.setVisible(true).setScale(sc).setFlipX(e.fx < 0).setRotation(lying ? -PI / 2 : tilt).setOrigin(0.5, lying ? 0.5 : 1).setPosition(sx + sh, sy - (lying ? 10 * sc : 0));
    im.setTint((k == 'chef' && night < 4) || (k == 'coder' && !coderOn) ? 0x888888 : 0xffffff);
    im.depth = -cs(e.x, e.y, 0)[2]; im.hx = sx; im.hy = sy - (lying ? 6 : 19) * sc; im.sc = sc;
    order.push(im);
  }
  rC.bringToTop(dynG); rC.bringToTop(projTxt);
  order.sort((a, c) => a.depth - c.depth).forEach((im) => rC.bringToTop(im));
  rC.bringToTop(fgImg);
  if (camLit) hallu = 0;
  if (hallu > 0) {
    // a split-second face on the camera (FNAF2 style), then static
    if ((hallu -= 1 / 60) <= 0) { statA = 1; sfxStatic(0.3); }
    lensImg.setVisible(true).setTexture(pick(ROLES) + 'H').setScale(26).setPosition(W / 2 - rC.x + rnd(-8, 8), H / 2 + rnd(-8, 8));
    rC.bringToTop(lensImg);
  }
  rC.bringToTop(emG);
  const pi = eImg.pitcher;
  if (pitchOn && p.st == 'PITCH' && p.bar < 0.35 && pi.visible) {
    // speech bubble: he wants the next slide
    const kk = 1 - p.bar / 0.35, bx = pi.hx + 140 + (M.random() - 0.5) * kk * 8, by = pi.hy - 40;
    askG.fillStyle(0xffffff).fillRoundedRect(bx - 110, by - 22, 220, 34, 8).fillTriangle(bx - 100, by + 12, bx - 80, by + 12, bx - 112, by + 26);
    rC.bringToTop(askG);
    askTxt.setVisible(true).setPosition(bx, by - 5).setText(kk > 0.6 ? '¡¡SIGUIENTE!!' : '¿SIGUIENTE DIAPOSITIVA?').setColor(kk > 0.6 ? '#c00' : '#111').setScale(1 + kk * 0.25);
    rC.bringToTop(askTxt);
  }
  const si = eImg.sleeper;
  if (si.visible) rC.bringToTop(zzz(zR, E.sleeper, si.hx, si.hy, si.sc / 5));
}
// floating z's over the sleeper (yellow when he stirs, red !! when he is angry)
function zzz(t, s, x, y, k) {
  const a = s.st == 'ANGRY', w = s.st == 'FRONT' && s.warn, b = (now * 0.8) % 1;
  return t.setVisible(true).setText(a ? '!!' : w ? 'z ?' : s.st == 'SLEEP' ? 'z Z' : 'z').setColor(a ? '#ff4040' : w ? '#ffd400' : '#9fd8ff').setPosition(x + (6 + b * 8) * k, y - b * 22 * k).setAlpha(1 - b).setScale(k);
}
function renderOffice() {
  const fl = flick > 0 || blackout, pts = (a) => a.map(([x, y]) => ({ x, y }));
  oC.x = -pan; oC.y = M.sin(now * 0.7) * 1.5; // breathing
  oDesk.x = -(pan - (PW - W) / 2) * DESK_PX;
  oDim.clear(); oTop.clear(); oDG.clear();
  oG.setVisible(!!light && !doorClosed(focus));
  if (oG.visible) oG.setTexture('passage' + focus).setX(ODOOR[focus][0]);
  zO.setVisible(false);
  for (const k in E) {
    const e = E[k], im = oImg[k], bd = blindDoor(e);
    im.setVisible(false);
    // The eyelid overlay covers the sprite naturally during a blink.
    if (!light || !e.kd || bd != e.kd || bd != focus || doorClosed(bd)) continue;
    // People stand in the corridor behind the doorway: the wall layer drawn
    // over them hides whatever is outside the opening. At the side doors they
    // peek around the frame (FNAF1 Bonnie & Chica): leaning in, head and a
    // shoulder showing, the rest of the body behind the wall.
    let sx = PCX, sy = 476, sc = 10, rot = 0;
    if (bd != 'N') {
      const west = bd == 'W';
      sc = 15; sx = west ? 94 : PW - 94; sy = wBot(sx) + 4;
      rot = (west ? 1 : -1) * (.2 + M.sin(now * 1.3) * .02);
    }
    im.setVisible(true).setScale(sc).setRotation(rot).setPosition(sx + (e.shake ? (M.random() - 0.5) * e.shake * 10 : 0), sy)
      .setFlipX(rot ? rot < 0 : e.fx < 0).setTint(0xffffff);
    im.setCrop(); oC.moveBelow(im, oMask);
  }
  // The sleepwalker's z's float out of the front hallway.
  const s = E.sleeper;
  if (s.kd == 'N' && !blackout) zzz(zO, s, PCX - 10, 400, 1.6);
  // the shutters roll down inside the doorways, with a hazard stripe at the bottom edge
  for (const d of SIDES) {
    const q = doorP[d];
    if (q < 0.01) continue;
    const r = dq(d, q), [a, b] = DX[d];
    oTop.fillStyle(0x4b4f57).fillPoints(pts(r), true).lineStyle(3, 0x30333a);
    for (let j = 1; j < 9; j++) { const k = j / 9; oTop.lineBetween(a, lerp(r[0][1], r[3][1], k), b, lerp(r[1][1], r[2][1], k)); }
    oTop.fillStyle(0xd4a017).fillPoints(pts([[a, r[3][1] - 14], [b, r[2][1] - 14], [b, r[2][1]], [a, r[3][1]]]), true);
  }
  // button panels: door (red) and light (white); the hallway only has a light.
  // The panel you are facing is softly lit.
  for (const d of ADOOR) {
    const [bx, by] = OPANEL[d], h = d == 'N' ? 60 : 110, ly = by + (d == 'N' ? 30 : 80);
    if (focus == d && !blackout) oTop.fillStyle(0xffe9a0, 0.07).fillRoundedRect(bx - 14, by - 14, 68, h + 28, 10);
    if (d != 'N') oTop.fillStyle(blackout ? 0x220000 : doors[d] ? 0xff2a2a : 0x6a1010).fillCircle(bx + 20, by + 30, 14);
    oTop.fillStyle(blackout ? 0x111111 : light && focus == d ? 0xffffee : 0x55554e).fillCircle(bx + 20, ly, 14);
  }
  // the wall clock keeps the time
  const hr = hourOf(now), fr = (now % hl) / hl, ha = ((hr + fr) / 12) * PI * 2 - PI / 2, ma = fr * PI * 2 - PI / 2;
  oTop.lineStyle(5, 0x111111).lineBetween(CLOCK[0], CLOCK[1], CLOCK[0] + M.cos(ha) * 20, CLOCK[1] + M.sin(ha) * 20).lineStyle(3, 0x111111).lineBetween(CLOCK[0], CLOCK[1], CLOCK[0] + M.cos(ma) * 30, CLOCK[1] + M.sin(ma) * 30);
  // ---- the desk ----
  // the fan (it stops when the power goes), the monitors, the coffee maker
  fanS = lerp(fanS, blackout ? 0 : 24, 0.02); fanA += fanS / 60;
  oDG.fillStyle(0x3a3a3e).fillCircle(FAN[0], FAN[1], 34).fillStyle(0x6a6d74);
  for (let i = 0; i < 3; i++) { const a = fanA + i * 2.094; oDG.fillTriangle(FAN[0], FAN[1], FAN[0] + M.cos(a) * 32, FAN[1] + M.sin(a) * 32, FAN[0] + M.cos(a + 0.7) * 32, FAN[1] + M.sin(a + 0.7) * 32); }
  oDG.fillStyle(0x111111).fillCircle(FAN[0], FAN[1], 6).lineStyle(2, 0x222226).strokeCircle(FAN[0], FAN[1], 34);
  if (!blackout) for (const mx of CRT) { oDG.fillStyle(0x2a5a90, 0.185).fillRect(mx + 10, 356, 108, 70); for (let i = 0; i < 4; i++) oDG.fillStyle(0x9ab, 0.12).fillRect(mx + 14, 358 + ((now * 40 + i * 17) % 66), 100, 2); }
  const fill = cof == 1 ? 1 - cofT / BREW : cof / 2;
  oDG.fillStyle([0x331111, 0xff3322, 0x33ff55][cof]).fillRect(COFFEE_X + 16, 412, 6, 6);
  if (drink <= 0) oDG.fillStyle(0xe8e2c8).fillRect(COFFEE_X - 12, 448, 24, 22).fillStyle(0x5a3416).fillRect(COFFEE_X - 10, 468 - 18 * fill, 20, 18 * fill);
  if (cof == 1) oDG.fillRect(COFFEE_X - 1, 446, 2, 20 - 18 * fill);
  if (cof > 1) for (let i = 0; i < 3; i++) oDG.fillStyle(0xdddddd, 0.3).fillCircle(COFFEE_X + M.sin(now * 3 + i) * 6, 440 - ((now * 30 + i * 12) % 40), 5);
  deskImg.setTint(blackout ? 0x2a2a2a : fl ? 0x6a6a6a : 0xd8d8d8);
  // light and darkness
  oBeam.setVisible(!!light);
  if (light) {
    const [x, y, w, h] = ODOOR[focus], tx = x + w / 2, ty = y + h * 0.55;
    oBeam.setPosition(PCX, 570).setRotation(M.atan2(ty - 570, tx - PCX)).setScale(dist(PCX, 570, tx, ty) / 230, 1).setAlpha(0.24);
  }
  const sw = M.sin(now * 0.9) * 0.12;
  oLamp.setRotation(PI / 2 + sw).setAlpha(fl ? 0.02 : 0.145).setPosition(PCX + sw * 60, 40);
  oDim.fillStyle(0, blackout ? 0.85 : fl ? 0.6 : 0.3).fillRect(0, 0, PW, H).fillStyle(0, 0.3).fillRect(0, 0, 60, H).fillRect(PW - 60, 0, 60, H);
}

// ---- HUD ----
function hideHud() {
  uHud.setVisible(false); uG.clear(); uStat.setAlpha(0);
  uLid.height = uLid2.height = 0; uZ.setVisible(false);
  uScr.setVisible(false); uScrT.setText('');
}
// hide the HUD text but keep the eyelids and the static (scares, falling asleep)
function hudOff() { for (const o of [uPow, uHour, uNight, uSue, uCamBar, uWarn, uMsg, uTab, uMug, uTh, uLearn, ...uPr, ...uCam, ...uMapT]) o.setVisible(false); uG.clear(); }
function prompt(i, x, y, s, col, a) { uPr[i].setVisible(true).setText(s).setPosition(clamp(x, 80, 720), clamp(y, 20, 560)).setColor(col || '#fff').setAlpha(a ?? 1); }
function drawTablet(progress) {
  const k = progress * progress * (3 - 2 * progress);
  uTab.setVisible(progress > 0 && progress < 1).setPosition(W / 2, H - (H + 2) * k)
    .setScale(1.10 - .10 * k, .48 + .52 * k).setAngle(5 * (1 - k));
}
function mapLink(gr, a, b, ox, oy, scale) {
  const A = ROOMS[a][4], B = b == CTRL ? OFFICE_MAP : ROOMS[b][4];
  const [ax, ay] = mapC(a), [bx, by] = mapC(b);
  const line = (x1, y1, x2, y2) => {
    if (x1 != x2 || y1 != y2) gr.lineBetween(ox + x1 * scale, oy + y1 * scale, ox + x2 * scale, oy + y2 * scale);
  };
  if (A[0] < B[0] + B[2] && A[0] + A[2] > B[0]) {
    const y1 = ay < by ? A[1] + A[3] : A[1];
    const y2 = ay < by ? B[1] : B[1] + B[3];
    const turn = (y1 + y2) / 2;
    line(ax, y1, ax, turn); line(ax, turn, bx, turn); line(bx, turn, bx, y2);
  } else {
    const x1 = ax < bx ? A[0] + A[2] : A[0];
    const x2 = ax < bx ? B[0] : B[0] + B[2];
    const turn = (x1 + x2) / 2;
    line(x1, ay, turn, ay); line(turn, ay, turn, by); line(turn, by, x2, by);
  }
}
function renderHud(dt) {
  const gr = uG, p = E.pitcher, office = view == 'office', cm = !office && va >= 1;
  gr.clear();
  uPr.forEach((t) => t.setVisible(false));
  uHour.setText((hourOf(now) || 12) + ' AM');
  uNight.setText('NOCHE ' + night);
  uPow.setText('BATERÍA: ' + M.ceil(power) + '%\nUSO:');
  if (!blackout) { const u = M.min(usage, 5); for (let i = 0; i < 5; i++) gr.fillStyle(i < u ? (i < 2 ? 0x44dd66 : i < 4 ? 0xeecc33 : 0xee4444) : 0x222222).fillRect(70 + i * 20, 536, 16, 14); }
  gr.fillStyle(0x1a1430).fillRect(24, 492, 150, 10).fillStyle(sueno > 70 ? 0xb44dff : 0x7a5cff).fillRect(24, 492, 150 * clamp(sueno / 100, 0, 1), 10);
  uSue.setText(sueno > 70 ? 'SUEÑO ¡¡CAFÉ!!' : 'SUEÑO').setColor(sueno > 70 && M.sin(now * 8) > 0 ? '#ff77ff' : '#c9b6ff');
  drawTablet(va);
  for (const t of [...uCam, ...uMapT]) t.setVisible(cm);
  if (cm) {
    uCam[0].setText('CAM ' + ROOMS[camR][1] + ' · ' + ROOMS[camR][0]);
    uCam[1].setAlpha(tick(2));
    uCam[2].setText(clockStr(now));
    gr.lineStyle(2, 0xd8d0c0, 0.35).strokeRect(20, 20, 760, 560);
    // the map: rooms and the corridors between them, your office at the bottom
    const MX = 532, MY = 352, K = 0.78; // map origin and scale
    gr.fillStyle(0, .72).fillRect(MX - 8, MY - 8, 252, 208).lineStyle(2, 0xabad9e);
    for (let i = 0; i < CTRL; i++) for (const n of NB[i]) if (n > i) mapLink(gr, i, n, MX, MY, K);
    const m = E.mentora;
    for (let i = 0; i <= CTRL; i++) {
      const [x, y, w, h] = (i == CTRL ? OFFICE_MAP : ROOMS[i][4]).map((v, j) => v * K + (j ? j < 2 ? MY : 0 : MX));
      const selected = i == camR, speaker = m.st == 'CALL' && i == m.target;
      const fill = speaker ? (tick(4) ? 0x68468c : 0x392747) : selected ? 0x789936 : i == CTRL ? 0x2a2a2a : 0x161a16;
      gr.fillStyle(fill).fillRect(x, y, w, h)
        .lineStyle(selected ? 2 : 1.5, selected && speaker ? 0x9cb55a : 0xd1d3c6).strokeRect(x, y, w, h);
      uMapT[i].setPosition(x + w / 2, y + h / 2).setColor(speaker ? '#f4dfff' : selected ? '#0e1500' : '#eceee3')
        .setText(i == CTRL ? 'TÚ' : speaker ? 'ALTAVOZ' : ROOMS[i][1]);
      if ((m.st == 'CALL' || m.st == 'APPROACH') && m.r == i) gr.fillStyle(0xc77dff).fillCircle(x + 4, y + 4, 3);
      if (i == 1 && pitchOn && (p.bar < .35 || p.st != 'PITCH') && tick(4)) {
        gr.fillStyle(0xff3344).fillRect(x + w - 9, y + 3, 6, 6);
      }
    }
    if (camR == 1 && pitchOn) {
      // FNAF2 music box style: a fixed pie timer on the camera UI
      const b = p.r == 1 ? p.bar : 0, urgent = b < 0.35, cx = 92, cy = 150, gone = p.r != 1;
      gr.fillStyle(0, 0.7).fillCircle(cx, cy, 44).fillStyle(0x2a2620).fillCircle(cx, cy, 36);
      if (b > 0.005) gr.fillStyle(urgent ? (tick(4) ? 0xff3344 : 0xffd400) : 0xe8dcb0).beginPath().slice(cx, cy, 36, -PI / 2, -PI / 2 + b * PI * 2).fillPath();
      gr.lineStyle(2, 0xd8d0c0).strokeCircle(cx, cy, 36);
      if (gone) prompt(0, cx + 110, cy + 66, '¡SE FUE A BUSCAR PÚBLICO!', '#ff5555');
      else if (!learned('slide', 2)) prompt(0, cx + 110, cy + 66, 'MANTÉN B2 · PASAR DIAPOSITIVAS', urgent ? '#ffd400' : '#fff');
    } else if (camR == 0 && plug >= 0) {
      prompt(0, 240, 120, cutH > 0 ? 'CORTANDO...' : 'MANTÉN B2 · CORTAR SU ENCHUFE', '#ff8888');
      gr.fillStyle(0xff8888).fillRect(190, 134, 100 * cutH / 1.2, 5);
    } else if (camR == 2 && night >= 4) {
      const c = E.chef;
      if (c.st == 'COOK') prompt(0, 220, 120, 'PORCIONES · ' + (c.p + 1) + '/3', c.p == 2 ? '#ffd400' : '#fff');
      else if (c.st == 'RUN') prompt(0, 220, 120, '¡COCINA VACÍA! · PUERTA IZQUIERDA', '#ff5555');
    }
  }
  const sl = E.sleeper;
  const teachLight = cm && !litN;
  const teachTablet = office && night == 1 && !lesson.tabletOpened && modeT >= 7;
  uLearn.setVisible(!blackout && !doomed && (teachLight || teachTablet));
  if (uLearn.visible) {
    const pulse = .5 + .5 * M.sin(modeT * 4);
    uLearn.setText(teachLight ? 'MANTÉN B1 · ENCIENDE LA LINTERNA' : 'PULSA B3 · LEVANTA LA TABLETA')
      .setAlpha(.7 + .3 * pulse).setScale(1 + .045 * pulse);
  }
  if (cm && sl.kd == 'N') prompt(2, 400, 538, sl.warn ? 'z ?' : 'z  z  z', sl.warn ? '#ffd400' : '#9fd8ff', 0.5 + M.sin(now * 3) * 0.3);
  uCamBar.setVisible(office).setAlpha(blackout ? 0.35 : 1);
  // warning sign next to the camera bar when the pitcher is about to lose it
  const mr = E.mentora.st == 'APPROACH' && E.mentora.side, pg = pitchOn && p.st != 'PITCH'; // she is running to that door · he left the stage
  uWarn.setVisible(office && !blackout && !(light && mr == focus) && (mr || pg || (pitchOn && p.bar < 0.35))).setAlpha(tick(3) ? 1 : 0.3).setColor(mr ? '#c77dff' : pg ? '#ff3344' : '#ffd400').setPosition(mr ? (mr == 'W' ? 40 : 760) : 560, mr ? 300 : 580);
  if (office && !blackout && drink <= 0) {
    if (CDOOR[focus]) {
      // FNAF-style: the hints live inside the doorway you are looking at
      const [x, y, w, h] = ODOOR[focus], cx = x + w / 2 - pan, closed = doors[focus], a = learned('door') && learned('light') ? 0.55 : 1;
      if (!light && focus != 'N') prompt(0, cx, y + h * 0.35, 'B2 · ' + (closed ? 'ABRIR' : 'CERRAR') + ' PUERTA', closed ? '#ff8888' : '#fff', a);
      if (!light && !closed) prompt(1, cx, y + h * 0.35 + 34, 'B1 · LUZ', '#ffe9a0', a);
    } else if (focus == 'C') {
      const cx = COFFEE_X + oDesk.x - pan;
      prompt(0, cx, 372, ['MANTÉN B1 · PREPARAR CAFÉ', 'PREPARANDO... ' + M.ceil(cofT), 'B1 · TOMAR CAFÉ'][cof], cof > 1 ? '#7f7' : '#c9b6ff');
      gr.fillStyle(0xc9b6ff).fillRect(cx - 50, 386, 100 * cofHold / 0.6, 5);
    }
  }
  const mentor = E.mentora;
  let cue = '';
  if (mentor.st == 'CALL') {
    const room = ROOMS[mentor.target];
    cue = cm && camR == mentor.target ? 'B2 · ACTIVAR INTERCOMUNICADOR' :
      (cm ? 'BUSCA LA SALA MORADA · ' : 'B3 · BUSCA EL ALTAVOZ EN ') + room[0] + ' · CAM ' + room[1];
  } else if (mentor.st == 'APPROACH' && !(office && light && mentor.side == focus)) cue = 'MENTORA · PUERTA ' + (mentor.side == 'W' ? 'IZQUIERDA' : 'DERECHA');
  else if (plug >= 0 && (!cm || camR != 0)) cue = 'CONSUMO EXTRA · ENCHUFE EN CAM 1A';
  else if (night == 1 && E.fe.kd && !lesson.blocked && !(office && light && focus == 'W')) {
    cue = doors.W ? 'ESPERA A QUE SE ALEJE' : cm ? 'B3 · BAJA LA CÁMARA. HAY PASOS A LA IZQUIERDA.' :
      focus != 'W' ? '◄ GIRA HACIA LOS PASOS' : E.fe.revealed ? 'B2 · CIERRA LA PUERTA IZQUIERDA' : 'B1 · ILUMINA EL MARCO';
  } else if (night == 3 && now > 5 && now < 18 && !learned('slide', 2) && (!cm || camR != 1)) cue = 'EL PROYECTOR SIGUE ENCENDIDO · CAM 1C';
  if (cue && !blackout && !doomed) prompt(3, 400, 85, cue, mentor.st == 'CALL' ? '#f5c6ff' : '#ffe6a2');
  // static flickers when someone moves on the camera you are watching
  statA = M.max(0, statA - dt * 2.2);
  uStat.setAlpha(clamp(statA * 0.9 + blackout * 0.03, 0, 1)).setTilePosition(rnd(0, 200), rnd(0, 150));
  uMsg.setAlpha(clamp((msgT -= dt) * 2, 0, 1));
  uTh.setVisible(!!thought && office);
  if (thought) uTh.setText(thought.s).setPosition(400, 548).setAlpha(clamp(thought.t * 3, 0, 1));
  // eyelids hang lower the sleepier you are; blinks close them all the way
  const bl = blink > 0 ? M.sin(clamp(1 - blink / blinkDur, 0, 1) * PI) : 0;
  lidY = lerp(lidY, clamp((sueno - 45) / 55, 0, 1) * (150 + M.sin(now * 1.3) * 18), 1 - M.pow(0.1, dt));
  const lh = M.max(lidY, bl * 310);
  uLid.height = uLid2.height = lh; uLid2.y = H - lh;
  uMug.setVisible(drink > 0);
  if (drink > 0) { const k = 1 - drink / SIP, h = M.min(1, k * 5, drink * 3), e = h * h * (3 - 2 * h); uMug.setY(H + 250 - e * 330).setAngle(-28 * clamp(k * 2 - 0.4, 0, 1) * e); }
}

// =====================================================================
// LOSE / WIN
// =====================================================================
// [sprite, scream, what went wrong]
const LOSE = {
  pitcher: ['pitcher', '¡¿PREGUNTAS?!', 'En el pasillo, encandílalo varias veces.'],
  sleeper: ['sleeper', '¡¿QUÉ HORA ES?!', 'Nunca despiertes a un sonámbulo.'],
  chef: ['chef', '¡A COMER!', 'Si el chef viene corriendo, cierra la puerta izquierda.'],
  fe: ['fe', '¡REVISA MI PULL REQUEST!', 'Revisa tu puerta izquierda con la luz.'],
  be: ['be', '¡FALTA UN COMMIT!', 'Revisa tu puerta derecha con la luz.'],
  coder: ['coder', '¡¿QUIÉN ME CORTÓ LA LUZ?!', 'Cuando lo desenchufas, viene a reclamar.'],
  mentora: ['mentora', '¡TENGO UN FEEDBACK!', 'Busca la cámara morada y pulsa B2 para llamarla por altavoz. Si llega a tu puerta, ciérrala.'],
  sleep: ['banana', '¡DESPIERTA!', 'Te quedaste dormido. Toma café.'],
  power: ['banana', '¡APAGÓN!', 'Se acabó la batería. Usa las puertas y las luces solo cuando las necesites.'],
};
// pitch of each one's scream
const SCRP = { pitcher: 1.25, sleeper: 0.8, mentora: 1.35, chef: 0.75, coder: 1, fe: 1.15, be: 0.9, banana: 0.62 };
function lose(why, hint, side) {
  if (mode != 'play') return;
  if (FX) S.cameras.main.hasPostPipeline = false;
  scareTablet = 0;
  if (AC) { buzzG.gain.value = fanG.gain.value = 0; ambG.gain.setTargetAtTime(0, AC.currentTime, 0.08); droneG.gain.setTargetAtTime(0, AC.currentTime, 0.08); } // half a second of silence
  lostTo = why; lostHint = hint || LOSE[why][2]; loseT = now; scrOn = 0; scrSide = side || 0;
  mode = 'scream'; modeT = 0; light = camLit = 0;
  if (why == 'sleep') { uLid.height = uLid2.height = 310; uLid2.y = H - 310; scrDelay = 0.3; scrPre = 0; uTh.setVisible(false); }
  else if (why == 'power') {
    va = 0; scrDelay = 0; scrPre = false;
  }
  else {
    // the tablet drops... and sometimes you get a split second to see it standing
    // right in front of you in the dark. Sometimes you don't.
    view = 'office'; va = 0; rC.setVisible(false); oC.setVisible(true); hudOff(); uStat.setAlpha(0);
    scrPre = M.random() < 0.7; scrDelay = scrPre ? rnd(0.45, 0.85) : rnd(0.05, 0.2);
  }
  uScr.setTexture(LOSE[why][0] + '0').setVisible(false);
}
// Falling asleep: your eyes close, the building goes quiet, your own z's
// float up... then you open your eyes and something is standing right in
// front of you. Eyes shut again. Then it gets you.
function doze() {
  mode = 'doze'; modeT = 0; loseT = now; dozeHB = 0; camLit = 0; if (AC) buzzG.gain.value = fanG.gain.value = 0;
  view = 'office'; va = 0; light = 0; rC.setVisible(false); oC.setVisible(true);
  hudOff(); uStat.setAlpha(0);
  if (AC) { const t = AC.currentTime; ambG.gain.setTargetAtTime(0, t, 0.8); droneG.gain.setTargetAtTime(0, t, 0.8); muffle.frequency.setTargetAtTime(500, t, 0.6); }
  sfxYawn();
}
function dozeUpdate() {
  const t = modeT, ease = (k) => { k = clamp(k, 0, 1); return k * k * (3 - 2 * k); };
  // the eyelids: close slowly · darkness · snap open · shut again
  const lh = t < 4.6 ? lerp(lidY, 310, ease(t / 2.4)) : t < 6.3 ? 310 * (1 - ease((t - 4.6) / 0.18)) : 310 * ease((t - 6.3) / 0.15);
  uLid.height = uLid2.height = lh; uLid2.y = H - lh;
  // your own z's floating up while you drift off
  const za = t < 4.2 ? M.min(1, (t - 0.8) * 2, (4.2 - t) / 0.6) : 0;
  uZ.setVisible(za > 0).setText(['z', 'z Z', 'z Z z'][M.min(2, ((t - 0.8) * 1.2) | 0)]).setPosition(400 + M.sin(t * 2) * 20, 330 - clamp((t - 0.8) / 3.4, 0, 1) * 120).setAlpha(clamp(za, 0, 1));
  uTh.setVisible(t < 2.6).setText('Qué sueño...').setPosition(400, 548).setAlpha(clamp((2.6 - t) * 2, 0, 1));
  // eyes open: the office, the lights barely holding... and it is standing there
  const open = t > 4.6 && t < 6.5;
  if (open) {
    flick = M.random() < 0.15 ? 0.1 : 0;
    renderOffice();
    oBan.setTexture('banana0').setPosition(pan + 400, 650).setScale(15).setTint(0x8a8470); oC.bringToTop(oBan);
    if (!dozeHB) { dozeHB = 1; sfxHeart(1); tone(52, 1.6, 's', 0.12, 46); }
  }
  oBan.setVisible(open);
  if (t > 6.9) { mode = 'play'; lose('sleep'); }
}
function screamUpdate() {
  const t = modeT - scrDelay, sl = lostTo == 'sleep';
  if (t < 0) {
    // the moment before: silence, the lights dying... something standing there
    if (!sl && lostTo != 'power') {
      flick = M.random() < 0.35 ? 0.2 : 0; renderOffice();
      oBan.setVisible(scrPre).setTexture(LOSE[lostTo][0] + '0').setScale(19).setPosition(pan + 400, 700).setTint(0x34302a); oC.bringToTop(oBan);
    }
    return;
  }
  if (!scrOn) {
    scrOn = 1; oBan.setVisible(false); hudOff();
    if (AC) muffle.frequency.setTargetAtTime(12000, AC.currentTime, 0.01);
    sfxScream(SCRP[LOSE[lostTo][0]]); S.cameras.main.shake(1100, 0.04).flash(140, 255, 40, 40); uiCam.shake(1100, 0.03);
  }
  if (scareTablet > 0) {
    scareTablet = M.max(0, scareTablet - 1 / .17 * (S.game.loop.delta / 1000));
    drawTablet(scareTablet);
  }
  // Keep the full sprite in view during the lunge and clear of the caption.
  const k = clamp(t / 0.16, 0, 1), e = 1 - (1 - k) ** 3, hit = t > 0.16, x0 = scrSide == 'W' ? 170 : scrSide == 'E' ? 630 : 400, a0 = scrSide == 'W' ? -28 : scrSide == 'E' ? 28 : 0;
  const x = lerp(x0, 400, e) + (hit ? rnd(-18, 18) : 0), y = lerp(scareTablet ? 140 : 420, 330, e) + (hit ? rnd(-16, 16) : 0);
  const angle = hit ? rnd(-7, 7) : lerp(a0, 0, e), rotation = angle * PI / 180;
  const half = M.max(uScr.width, uScr.height) * (M.abs(M.cos(rotation)) + M.abs(M.sin(rotation))) / 2;
  const available = M.min(x - 24, W - 24 - x, y - 18, (hit ? 486 : H - 18) - y);
  uScr.setVisible(t < 1.2).setScale(M.min(lerp(10, 18, e) + (hit ? M.sin(t * 70) * 1.3 : 0), available / half))
    .setPosition(x, y).setAngle(angle).setTint(hit && M.random() < 0.3 ? 0xff4040 : 0xffffff);
  uScrT.setText(hit && t < 1.2 ? LOSE[lostTo][1] : '').setScale(1 + M.random() * 0.15).setPosition(400 + rnd(-8, 8), 525 + rnd(-6, 6));
  uStat.setAlpha(t > 1.2 ? 1 : hit ? 0.12 + M.random() * 0.2 : 0).setTilePosition(rnd(0, 200), rnd(0, 150));
  if (t > 1.2 && scrOn == 1) { scrOn = 2; sfxStatic(1); } // cut to static
  if (t > 2.3) goLose();
}
function goLose() {
  screen('lose');
  sRect(0);
  uLStat = sAdd(S.add.tileSprite(0, 0, W, H, 'noise').setOrigin(0).setAlpha(0.08));
  sText(400, 170, 'PERDISTE', 64, '#d22', 0.5, 0.5, { stroke: '#000', strokeThickness: 6 });
  sText(400, 236, clockStr(loseT) + ' · NOCHE ' + night, 18, '#aaa');
  sAdd(S.add.image(400, 440, LOSE[lostTo][0] + '0').setScale(6).setOrigin(0.5, 1).setTint(0x220000));
  sText(400, 472, lostHint, 15, '#aaa', 0.5, 0.5, { fontStyle: 'italic bold', align: 'center', wordWrap: { width: 620 } });
  uLPress = sText(400, 540, 'START · REINTENTAR NOCHE ' + night, 16);
}
function loseUpdate() {
  uLStat.setTilePosition(rnd(0, 200), rnd(0, 150));
  uLPress.setAlpha(modeT > 1.2 ? 0.5 + M.sin(modeT * 4) * 0.5 : 0);
  if (modeT > 1.2 && (pr('S') || pr('1'))) { sfxClick(); goCard(night); }
}
function winNight() {
  screen('win'); uWDone = 0;
  if (AC) { ambG.gain.setTargetAtTime(0, AC.currentTime, 0.1); droneG.gain.setTargetAtTime(0, AC.currentTime, 0.1); }
  sRect(0);
  uW1 = sText(400, 270, '5:59 AM', 60);
  uW2 = sText(400, 340, '', 22, '#ffd400');
  if (night < 5) { saved.night = menuNight = M.max(saved.night, night + 1); writeSave(); }
}
function winUpdate() {
  if (modeT > 1.6 && !uWDone) { uWDone = 1; uW1.setText('6:00 AM'); uW2.setText('NOCHE ' + night + ' SUPERADA'); sfxSix(); S.cameras.main.flash(300, 255, 255, 255); }
  if (modeT < 1.6) uW1.setText(M.random() < 0.15 ? '6:00 AM' : '5:59 AM');
  if (modeT > 4 && (anyPr() || modeT > 8)) { if (night >= 5) goPaper(1); else goCall(night + 1); }
}
})();
