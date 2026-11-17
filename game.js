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
// SPRITES (PCSEF, 24x24, PC-66 palette): frame 0 standing, 1 action, 2 step
// =====================================================================
const P_PAL=[0x6e2100,0xdeac92,0xfefdfe,0x000000,0xab8169,0x24222a,0xf7bb1b,0xd11717,0x254c93,0xd3cde7,0x333d8d,0xa4dbff,0x08b8ea,0x390800,0x8d00f9,0x4200a5,0xc1b087,0xa41c1c,0x4e4b5b,0x83fe6b,0xaba4c1,0x019000];
const SPR={"Pitcher":["~~8.7A9.7.9A8.7.2A7B8.7.1A1B1C1D2B1C1D1B8.7.1A1B1C1D2B1C1D2B7.7.1E9B7.7.1E7D1B8.8.1B3C>8.1E5D1B9.9.1E3B9.2.7.3F4G2F8.6.4F1G1H2G3F7.^6.4F4G3F7.6.2B2F4G1F2B7.8.1F5I1F9.8.7I9.8.3I1.3I9.^^8.3J1.4J8.~","~~8.7A9.7.9A8.7.2A7B8.7.1A1B1C1D2B1C1D1B8.7.1A1B1C1D2B1C1D2B7.7.1E9B7.7.1E7D1B8.8.1B3C>8.1E5D1B9.9.1E3B5.1H5.7.3F4G2F2.1B5.6.4F1G1H2G4F1B5.6.4F1G1H2G4F6.6.4F4G2F8.6.2B2F4G1F9.8.1F5I1F9.8.7I9.8.3I1.3I9.^^8.3J1.4J8.~","~~8.7A9.7.9A8.7.2A7B8.7.1A1B1C1D2B1C1D1B8.7.1A1B1C1D2B1C1D2B7.7.1E9B7.7.1E7D1B8.8.1B3C>8.1E5D1B9.9.1E3B9.2.7.3F4G2F8.6.4F1G1H2G3F7.^6.4F4G3F7.6.2B2F4G1F2B7.8.1F5I1F9.8.7I9.7.4I1.3I9.7.3I3.3I8.6.3I5.3I7.6.3J5.4J6.~"],"Sonambulo":["~~5.2C3.4K9.1.5.2C9K8.7.9K8.7.9C8.7.9B8.7.2B2D2B2D1B8.7.5B>7.1E3B2D3B8.8.1E2B2D2B9.9.1E3B9.2.7.2L1M2L1M2L9.6.3L1M2L1M6L2B3.^6.3L1M2L1M2L9.^7.2L1M2L1M1L9.1.^7.3L1.3L9.1.^7.3M1.3M9.1.7.3B1.4B9.~","~~5.2C3.4K4.1C5.5.2C9K1.1C1.1C4.7.9K2.1C5.7.9C8.7.9B8.7.2B2D2B2D1B8.7.5B>7.1E3B2D3B8.8.1E2B2D2B9.9.1E3B9.2.7.2L1M2L1M2L9.6.3L1M2L1M6L2B3.^6.3L1M2L1M2L9.^7.2L1M2L1M1L9.1.^7.3L1.3L9.1.^7.3M1.3M9.1.7.3B1.4B9.~","~~5.2C3.4K9.1.5.2C9K8.7.9K8.7.9C8.7.9B8.7.2B2D2B2D1B8.7.5B>7.1E3B2D3B8.8.1E2B2D2B9.9.1E3B9.2.7.2L1M2L1M2L9.6.3L1M2L1M6L2B3.^6.3L1M2L1M2L9.^7.2L1M2L1M1L9.1.^6.4L1.3L9.1.6.3L3.3L9.5.3M5.3M8.5.3B5.4B7.~"],"Mentora":["~5.3N9.7.5.9N1N9.6.9N1N8.6.3N7B8.6.2N4F1B4F7.6.2N1F2C1D1F2C1D1F7.6.2N1B3F1B3F2B6.6.2N1E2B3H2B8.7.2N1E5B9.9.1E3B9.2.7.2O1P2C1P2O9.6.3O1P2C1P1O4Q6.6.3O1P2O1P1O1Q2C1Q6.6.8O1B2C1Q6.6.8O4Q6.7.7O9.1.7.7F9.1.7.8F9.8.2B2.2B9.1.^^8.2H2.3H9.~","~5.3N9.7.5.9N1N9.6.9N1N8.6.3N7B8.6.2N4F1B4F7.6.2N1F2C1D1F2C1D1F7.6.2N1B3F1B3F2B6.6.2N1E2B3H2B8.7.2N1E5B9.9.1E3B9.2.7.2O1P2C1P2O9.6.3O1P2C1P4O1B1D5.6.3O1P2O1P4O1B6.6.9O9.^7.7O9.1.7.7F9.1.7.8F9.8.2B2.2B9.1.^^8.2H2.3H9.~","~5.3N9.7.5.9N1N9.6.9N1N8.6.3N7B8.6.2N4F1B4F7.6.2N1F2C1D1F2C1D1F7.6.2N1B3F1B3F2B6.6.2N1E2B3H2B8.7.2N1E5B9.9.1E3B9.2.7.2O1P2C1P2O9.6.3O1P2C1P1O4Q6.6.3O1P2O1P1O1Q2C1Q6.6.8O1B2C1Q6.6.8O4Q6.7.7O9.1.7.7F9.1.7.8F9.7.2B3.2B9.1.7.2B4.2B9.6.2B6.2B8.6.2H6.3H7.~"],"Chef":["8.7C9.7.9C8.^8.1C1J1C1J1C1J1C9.8.7C9.8.7B9.8.1B2D2B2D9.8.1B1C1D2B1C1D1B8.8.4B>8.1E7D8.9.1E5B9.9.5H9.1.7.4C1H4C8.6.3C1D3C1D3C7.6.9C2C7.6.3C1D3C1D3C7.6.2B7C2B7.8.2C1R4C9.8.1C2R4C9.8.3S1.3S9.^^8.3D1.4D8.~","8.7C9.7.9C8.^8.1C1J1C1J1C1J1C9.8.7C9.8.7B9.8.1B2D2B2D9.8.1B1C1D2B1C1D1B8.8.4B>8.1E7D4.1J3.9.1E5B5.1J3.9.5H5.2J3.7.4C1H4C3.2J3.6.3C1D3C1D5C1B1J3.6.9C4C1B1A3.6.3C1D3C1D2C4.1A3.6.2B7C9.8.2C1R4C9.8.1C2R4C9.8.3S1.3S9.^^8.3D1.4D8.~","8.7C9.7.9C8.^8.1C1J1C1J1C1J1C9.8.7C9.8.7B9.8.1B2D2B2D9.8.1B1C1D2B1C1D1B8.8.4B>8.1E7D8.9.1E5B9.9.5H9.1.7.4C1H4C8.6.3C1D3C1D3C7.6.9C2C7.6.3C1D3C1D3C7.6.2B7C2B7.8.2C1R4C9.8.1C2R4C9.7.4S1.3S9.7.3S3.3S8.6.3S5.3S7.6.3D5.4D6.~"],"Coder":["~~8.7S9.7.1S7F1S8.6.1S9F1S7.6.1S2F6B2S7.6.2F1B2T1D1B2T1D1F7.^6.2F1E7B1F7.6.3F1E4D1B1F8.7.3F1E3B2F8.8.7F9.7.4F1S4F8.6.5F1S3F5U4.6.5F1S2F1B1U3V1U4.6.5F1S2F1B1U1V1T1V1U4.6.9F5U4.7.7F9.1.7.7S9.1.7.3S1.3S9.1.^^7.3G1.4G9.~","~~8.7S9.7.1S7F1S8.6.1S9F1S7.6.1S2F6B2S7.6.2F1B2T1D1B2T1D1F7.^6.2F1E7B1F7.6.3F1E4D1B1F8.7.3F1E3B2F8.8.7F9.7.4F1S4F8.6.5F1S4F8.^6.4F1B7U6.^7.7F9.1.7.7S9.1.7.3S1.3S9.1.^^7.3G1.4G9.~","~~8.7S9.7.1S7F1S8.6.1S9F1S7.6.1S2F6B2S7.6.2F1B2T1D1B2T1D1F7.^6.2F1E7B1F7.6.3F1E4D1B1F8.7.3F1E3B2F8.8.7F9.7.4F1S4F8.6.5F1S3F5U4.6.5F1S2F1B1U3V1U4.6.5F1S2F1B1U1V1T1V1U4.6.9F5U4.7.7F9.1.7.7S9.1.6.4S1.3S9.1.6.3S3.3S9.5.3S5.3S8.5.3G5.4G7.~"]};
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
const CAST = { pitcher: 'Pitcher', sleeper: 'Sonambulo', mentora: 'Mentora', chef: 'Chef', coder: 'Coder' };
const ROLES = Object.keys(CAST);

// =====================================================================
// AUDIO (pure WebAudio synthesis)
// =====================================================================
let AC = null, master, muffle, noiseBuf, ambG, droneG, droneF;
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
}
function out(pan) {
  const g = AC.createGain(); g.gain.value = 0;
  if (AC.createStereoPanner) { const p = AC.createStereoPanner(); p.pan.value = clamp(pan || 0, -1, 1); g.connect(p); p.connect(master); }
  else g.connect(master);
  return g;
}
function env(g, t, vol, dur, a) { g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + a); g.gain.exponentialRampToValueAtTime(0.0001, t + dur); }
// tone(freq, dur, type, vol, pan, freqEnd, delay)
function tone(f, dur, type, vol, pan, f2, dl) {
  if (!AC || vol <= 0.002) return;
  const t = AC.currentTime + (dl || 0), o = AC.createOscillator(), g = out(pan);
  o.type = TY[type || 'q'];
  o.frequency.setValueAtTime(f, t);
  if (f2) o.frequency.exponentialRampToValueAtTime(M.max(20, f2), t + dur);
  env(g, t, vol, dur, 0.008);
  o.connect(g); o.start(t); o.stop(t + dur + 0.02);
}
// noise(dur, vol, filterType, freq, pan, freqEnd, delay, q)
function noise(dur, vol, ft, f, pan, f2, dl, q) {
  if (!AC || vol <= 0.002) return;
  const t = AC.currentTime + (dl || 0), s = AC.createBufferSource(), fl = AC.createBiquadFilter(), g = out(pan);
  s.buffer = noiseBuf; s.playbackRate.value = rnd(0.8, 1.2);
  fl.type = TY[ft || 'l']; fl.frequency.setValueAtTime(f || 1000, t);
  if (q) fl.Q.value = q;
  if (f2) fl.frequency.exponentialRampToValueAtTime(f2, t + dur);
  env(g, t, vol, dur, 0.01);
  s.connect(fl); fl.connect(g); s.start(t, rnd(0, 1.5)); s.stop(t + dur + 0.05);
}
// sound effects (synthesized)
const sfxStep = (v, p, dl) => { noise(0.07, 0.09 * v, 'l', 300, p, 0, dl); tone(70, 0.06, 's', 0.06 * v, p, 0, dl); };
const sfxBlip = (v, p, f) => tone(f || rnd(260, 520), 0.06, 'q', 0.05 * v, p);
const sfxBabble = (v, p, base) => { for (let i = 0; i < 5; i++) if (M.random() < 0.8) tone((base || 300) * rnd(0.8, 1.5), 0.05, 'q', 0.045 * v, p, 0, i * 0.075); };
const sfxSnore = (v, p) => { noise(1.1, 0.16 * v, 'b', 220, p, 650, 0, 4); noise(0.9, 0.12 * v, 'b', 600, p, 200, 1.25, 4); };
const sfxMurmur = (v, p) => { for (let i = 0; i < 4; i++) tone(rnd(170, 240), 0.14, 't', 0.07 * v, p, 0, i * 0.16); };
const sfxType = (v, p) => { for (let i = 0; i < 4; i++) noise(0.02, 0.12 * v, 'h', 3000, p, 0, i * rnd(0.05, 0.11)); };
const sfxDoor = (p) => { noise(0.25, 0.5, 'l', 500, p); tone(55, 0.3, 's', 0.5, p, 35); };
const sfxKnock = (p) => { for (let i = 0; i < 3; i++) { noise(0.08, 0.4, 'l', 350, p, 0, i * 0.22); tone(90, 0.1, 's', 0.3, p, 60, i * 0.22); } };
const sfxCam = () => noise(0.12, 0.18, 'h', 1500);
const sfxLight = () => tone(120, 0.05, 'q', 0.05);
const sfxClick = () => { tone(1800, 0.02, 'q', 0.08); noise(0.02, 0.1, 'h', 3000); };
const sfxCoffee = () => { for (let i = 0; i < 8; i++) noise(0.12, 0.12, 'b', rnd(300, 900), 0.3, 0, i * 0.14, 6); };
const sfxRing = () => { for (let i = 0; i < 2; i++) { tone(440, 0.9, 's', 0.07, 0, 0, i * 1.3); tone(480, 0.9, 's', 0.07, 0, 0, i * 1.3); } };
const sfxYawn = () => { tone(330, 1.2, 'w', 0.05, 0, 160); noise(1.2, 0.08, 'b', 500, 0, 250, 0, 2); };
const sfxHeart = (v) => { tone(55, 0.12, 's', 0.35 * v, 0, 40); tone(50, 0.14, 's', 0.25 * v, 0, 38, 0.2); };
const sfxEat = () => { for (let i = 0; i < 5; i++) noise(0.06, 0.2, 'b', 500, 0, 0, i * 0.15, 3); };
const sfxScream = () => {
  noise(1.4, 0.9, 'b', 1500, 0, 700, 0, 0.7);
  tone(90, 1.4, 'w', 0.5, 0, 45); tone(740, 1.2, 'q', 0.25, 0, 300);
  for (let i = 0; i < 10; i++) tone(rnd(600, 1600), 0.08, 'w', 0.25, rnd(-1, 1), 0, i * 0.1);
};
const sfxSix = () => {
  [523, 659, 784, 1046, 784, 1046].forEach((f, i) => tone(f, 0.5, 't', 0.22, 0, 0, i * 0.18));
  for (let i = 0; i < 26; i++) noise(0.05, 0.18 * rnd(0.4, 1), 'b', rnd(1200, 3500), rnd(-0.3, 0.3), 0, rnd(0, 1.6), 2);
};
const sfxStatic = (d) => noise(d || 0.5, 0.25, 'h', 800);
const sfxErr = () => { tone(200, 0.15, 'q', 0.12); tone(150, 0.2, 'q', 0.12, 0, 0, 0.15); };
const sfxSting = () => { tone(110, 1.6, 'w', 0.09, 0, 104); tone(116.5, 1.6, 'w', 0.07, 0, 110); tone(1760, 0.8, 's', 0.03, 0, 1700); };
const sfxBreath = (v, p) => { noise(1.2, 0.07 * v, 'b', 700, p, 400, 0, 2); noise(1.0, 0.05 * v, 'b', 500, p, 800, 1.4, 2); };
const sfxFar = () => {
  const p = rnd(-1, 1); // something far away: a thud or a few steps
  if (M.random() < 0.5) { noise(0.5, 0.18, 'l', 400, p); tone(50, 0.4, 's', 0.2, p, 35); }
  else for (let i = 0; i < 4; i++) sfxStep(0.5 + i * 0.15, p, i * 0.4);
};

// =====================================================================
// WORLD GEOMETRY — 3x2 venue grid (you sit in CONTROL and never leave)
//   0 COCINA   | 1 PITCH   | 2 CÓDIGO
//   3 SIESTA   | 4 CONTROL | 5 LOBBY
// =====================================================================
const RC = [[0, 0], [1, 0], [2, 0], [0, 1], [1, 1], [2, 1]];
const RNAME = ['COCINA', 'SALA DE PITCH', 'SALA DE CÓDIGO', 'SALA DE SIESTA', 'CONTROL', 'LOBBY'];
const RBG = [0x6e6a5c, 0x5a1a22, 0x34373e, 0x24335a, 0x202326, 0x5c5a58];
const DIRS = ['N', 'S', 'W', 'E'];
const OPP = { N: 'S', S: 'N', W: 'E', E: 'W' };
const DP = { N: [400, 104], S: [400, 552], W: [60, 300], E: [740, 300] };
const CTRL = 4;
const CDOOR = { W: { adj: 3, ad: 'E', a: 0 }, N: { adj: 1, ad: 'S', a: 1 }, E: { adj: 5, ad: 'W', a: 2 } };
const ADOOR = ['W', 'N', 'E'], SIDES = ['W', 'E']; // N is the open front hallway: no door
const ROOMS5 = [0, 1, 2, 3, 5];
const dPan = (d) => (d == 'W' ? -0.8 : d == 'E' ? 0.8 : 0);
const ek = (a, b) => (a < b ? a + '-' + b : b + '-' + a);
function nb(r, d) {
  const c = RC[r][0] + (d == 'E') - (d == 'W'), w = RC[r][1] + (d == 'S') - (d == 'N');
  return c < 0 || c > 2 || w < 0 || w > 1 ? -1 : w * 3 + c;
}
const dirTo = (a, b) => DIRS.find((d) => nb(a, d) == b);
function bfs(a, b, blk) {
  if (a == b) return [a];
  const prev = { [a]: -1 }, q = [a];
  while (q.length) {
    const r = q.shift();
    for (const d of DIRS) {
      const n = nb(r, d);
      if (n < 0 || n in prev || blk.has(ek(r, n))) continue;
      prev[n] = r;
      if (n == b) { const p = [b]; let k = b; while (prev[k] != -1) p.unshift((k = prev[k])); return p; }
      q.push(n);
    }
  }
  return null;
}
const gdist = (a, b) => M.abs(RC[a][0] - RC[b][0]) + M.abs(RC[a][1] - RC[b][1]);
// where people stand around in each room
const SPOTS = [
  [[200, 200], [400, 300], [560, 340], [380, 500]],
  [[300, 360], [400, 340], [520, 360], [400, 410]],
  [[400, 300], [360, 230], [600, 300], [400, 500]],
  [[300, 300], [460, 200], [400, 480], [200, 260]],
  [[400, 250]],
  [[400, 300], [320, 220], [600, 330], [400, 500]],
];
const PITCH_HOME = [400, 172], SLEEP_HOME = [210, 330], CHEF_HOME = [200, 200], CODER_HOME = [600, 222];
// the blind spot right outside each of your doors (no camera sees it)
const blindPt = (d) => { const c = CDOOR[d], p = DP[c.ad]; return [p[0] + (c.ad == 'W' ? 55 : c.ad == 'E' ? -55 : 0), p[1] + (c.ad == 'S' ? -45 : 0)]; };
const blindDoor = (e) => ADOOR.find((d) => { const c = CDOOR[d], p = DP[c.ad]; return e.r == c.adj && dist(e.x, e.y, p[0], p[1]) < 125; });

// =====================================================================
// NIGHTS — hl = seconds per in-game hour, grace = seconds a hunter waits
// in an open doorway before getting in
// N1: sleepwalker + coffee · N2: + pitcher · N3: + mentora · N4: + chef · N5: + coder
// =====================================================================
// [hl, grace, pitchOn, patience, pitchFast, wakeHour, drain, cookEvery, mentoraOn, coderEvery, mentoraSpeed, sleepRate]
const NIGHTS = [
  [30, 2.4, 0, 0, 105, 2, 0.07, 0, 0, 0, 50, 100],
  [34, 2.2, 1, 55, 115, 2, 0.07, 0, 0, 0, 55, 105],
  [38, 2.0, 1, 48, 125, 2, 0.075, 0, 1, 0, 58, 105],
  [42, 1.8, 1, 42, 135, 2, 0.075, 34, 1, 0, 62, 100],
  [46, 1.6, 1, 36, 148, 1, 0.08, 30, 1, 20, 68, 95],
];
const CALLS = [
  'RAFA|¿Aló? Soy Rafa, te llamo desde el aeropuerto, rapidito.|No salgas de la sala de control. Las puertas de los lados se cierran; el pasillo del frente no tiene puerta.|En la sala de siesta quedó uno durmiendo, y es sonámbulo. Si llega al pasillo del frente, no hagas NADA: ni puertas, ni cámaras, ni café.|Y nunca lo alumbres más de una vez. Cuida la energía y tómate un café. ¡Chao!',
  'RAFA|¡Sobreviviste! En la sala de pitch hay un cabro que no termina de presentar.|Si nadie le pasa las diapositivas se pone nervioso y viene por el pasillo del frente. El clicker funciona desde su cámara: mantén el botón 1.|Si llega al pasillo, encandílalo con la luz hasta que se vaya. Pero primero fíjate que no sea el sonámbulo.',
  'RAFA|Ya embarcamos. La mentora se quedó: nadie le pidió feedback en todo el finde.|No la mires mucho por la cámara... si te ve, corre a darte feedback.',
  'RAFA|Aterrizamos. El chef sigue en la cocina, afilando cuchillos.|Revisa su cámara seguido: si no lo miras, se acerca... y si sale corriendo, va directo a la puerta izquierda.',
  'NACHO|Hola, soy Nacho. Rafa se quedó dormido en el avión.|El de código dice que le faltan cinco minutos. Desde el sábado. Si la energía baja muy rápido, mira su cámara.|Es la última noche. Creo que ellos también lo saben. Así que—',
].map((s) => s.split('|'));

// =====================================================================
// GAME STATE
// =====================================================================
let S, mode = 'title', modeT = 0, saved = { night: 1 }, menuNight = 1, FX = null;
// the night in progress (reset by startNight)
let night, hl, grace, pitchOn, patience, pfast, wakeH, drain, cookOn, mentoraOn, coderOn, mspd, sueRate, nightLen, now, power, sueno, blackout, view, va, pan, panV, focus, camR, statA, light, doors, doorP, flash, plug, cutH, cof, cofT, cofHold, drink, lidY,
  blink, blinkT, blinkDur, dread, heartT, msgT, flick, scareT, breathT, phone, thought, thOnce, vigQ, vigOn, doomed, clicking, clickT, yawn1, yawn2,
  usage, lastView, lostTo, loseT, scrOn, scrDelay, E;
// how many times each control has been used: prompts fade once learned
const HINT = { light: 0, door: 0, cams: 0, slide: 0 };
const learned = (k, n) => HINT[k] >= (n || 3);

class HorrorPipeline extends Phaser.Renderer.WebGL.Pipelines.PostFXPipeline {
  constructor(game) {
    super({
      game, name: 'Horror',
      fragShader: `precision mediump float;
uniform sampler2D uMainSampler;uniform float uT,unv,uno,uab,udk,uwp;varying vec2 outTexCoord;
float R(vec2 c){return fract(sin(dot(c,vec2(12.9898,78.233)))*43758.5453);}
void main(){vec2 uv=outTexCoord;vec2 cc=uv-.5;
uv=.5+cc*(1.+dot(cc,cc)*(.06+.14*unv));
uv.x+=uwp*.004*sin(uv.y*40.+uT*9.);
float a=.0008+min(uab,1.5)*.0035;
vec4 c=texture2D(uMainSampler,uv);c.r=texture2D(uMainSampler,uv+vec2(a,0.)).r;c.b=texture2D(uMainSampler,uv-vec2(a,0.)).b;
float l=dot(c.rgb,vec3(.3,.59,.11));
c.rgb=mix(c.rgb,vec3(l*.3,l*1.6+.03,l*.4),unv);
c.rgb+=(R(floor(uv*vec2(400.,300.))+fract(uT)*91.)-.5)*(.05+uno);
c.rgb*=1.-.13*(sin(uv.y*1200.)*.5+.5)*(.35+unv);
c.rgb*=clamp(1.-dot(cc,cc)*(1.1+udk*2.4),0.,1.);
if(uv.x<0.||uv.x>1.||uv.y<0.||uv.y>1.)c.rgb=vec3(0.);
gl_FragColor=vec4(c.rgb,1.);}`,
    });
  }
  onPreRender() {
    const f = FX || {};
    this.set1f('uT', (f.t || 0) % 1000);
    for (const k of ['nv', 'no', 'ab', 'dk', 'wp']) this.set1f('u' + k, f[k] || 0);
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
const SPRF = {};
function buildSprites() {
  for (const role of ROLES) {
    const fr = SPR[CAST[role]];
    SPRF[role] = fr.map((s, i) => { spriteTex(role + i, parseCSEF(s, 24)); return role + i; });
    const rows = parseCSEF(fr[0], 24);
    let top = 0; while (rows[top].every((c) => c == '.')) top++;
    SPRF[role].top = top; // empty rows above the head
    spriteTex(role + 'H', rows.slice(top, top + 14)); // the face, for scares and the lens
  }
}
function buildFxTex() {
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

// ---- Camera shots: each camera is a fixed, high-corner perspective view of
// a specific scene (FNAF style). The world keeps its floor-plan coordinates;
// P() projects a floor point (x, y) at height h into the 1000px-wide shot.
const CF = 450, CAMH = 166.7, CY0 = 130, CX0 = 500, CAMW = 1000;
function P(x, y, h) { const s = CF / (700 - y); return [CX0 + (x - 400) * s, CY0 + (CAMH - (h || 0)) * s, s]; }
function quad(c, col, pts) { c.fillStyle = col; c.beginPath(); pts.forEach((p, i) => (i ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1]))); c.fill(); }
// a box standing on the floor: [x, y, w, d] footprint, height h
function box(c, [x, y, w, d], h, front, top, side) {
  const x2 = x + w, y2 = y + d;
  if (side) {
    if (x2 < 400) quad(c, side, [P(x2, y, 0), P(x2, y2, 0), P(x2, y2, h), P(x2, y, h)]);
    if (x > 400) quad(c, side, [P(x, y, 0), P(x, y2, 0), P(x, y2, h), P(x, y, h)]);
  }
  quad(c, top, [P(x, y, h), P(x2, y, h), P(x2, y2, h), P(x, y2, h)]);
  quad(c, front, [P(x, y2, 0), P(x2, y2, 0), P(x2, y2, h), P(x, y2, h)]);
}
function wallText(c, s, x, h, size, col) { const [sx, sy, k] = P(x, 96, h); c.fillStyle = col; c.font = 'bold ' + ((size * k) | 0) + 'px monospace'; c.textAlign = 'center'; c.fillText(s, sx, sy); }
const DOORQ = {
  N: [[352, 96, 0], [448, 96, 0], [448, 96, 150], [352, 96, 150]],
  W: [[48, 252, 0], [48, 348, 0], [48, 348, 150], [48, 252, 150]],
  E: [[752, 252, 0], [752, 348, 0], [752, 348, 150], [752, 252, 150]],
};
const doorPts = (d) => DOORQ[d].map((q) => P(...q));
const wallQ = (x, h0) => [P(x, 96, h0), P(x, 640, h0), P(x, 640, 220), P(x, 96, 220)];
function shell(c, r, floorA, floorB, wall, tile) {
  c.fillStyle = '#050506'; c.fillRect(0, 0, CAMW, H);
  quad(c, '#0d0d10', [P(48, 96, 220), P(752, 96, 220), P(752, 640, 220), P(48, 640, 220)]); // ceiling
  for (let y = 96; y < 640; y += tile) for (let x = 48; x < 752; x += tile)
    quad(c, ((x / tile | 0) + (y / tile | 0)) % 2 ? floorA : floorB, [P(x, y), P(x + tile, y), P(x + tile, y + tile), P(x, y + tile)]);
  quad(c, wall, [P(48, 96, 0), P(752, 96, 0), P(752, 96, 220), P(48, 96, 220)]);
  for (const x of [48, 752]) { quad(c, wall, wallQ(x, 4)); quad(c, 'rgba(0,0,0,.35)', wallQ(x, 4)); }
  quad(c, 'rgba(255,255,255,.06)', [P(48, 96, 20), P(752, 96, 20), P(752, 96, 26), P(48, 96, 26)]); // baseboard
  for (const d of ['N', 'W', 'E']) if (nb(r, d) >= 0) {
    quad(c, '#3a3d42', doorPts(d).map((p, i) => [p[0] + (i == 0 || i == 3 ? -4 : 4), p[1] - (i > 1 ? 6 : 0)]));
    quad(c, '#020202', doorPts(d));
    const t = DOORQ[d][3], [sx, sy, k] = P(t[0] + (d == 'N' ? 48 : 0), t[1] + (d == 'N' ? 0 : 48), 168);
    c.fillStyle = '#0c6'; c.fillRect(sx - 22 * k, sy - 6 * k, 44 * k, 12 * k); // exit sign
  }
}
function buildRooms() {
  const counter = ['#8d8778', '#b5b0a0', '#6d6758'], stand = ['#2f3f68', '#4a5c90', '#1f2f58'];
  // 0 COCINA: counters, stove, fridge, island with leftover food
  canvasTex('room0', CAMW, H, (c) => {
    shell(c, 0, '#c9c9c0', '#3a3a3a', '#6e6a5c', 64);
    wallText(c, 'BAJÓN 24/7', 560, 160, 26, '#eee');
    box(c, [60, 104, 250, 62], 60, ...counter);
    quad(c, '#222', [P(150, 112, 61), P(240, 112, 61), P(240, 150, 61), P(150, 150, 61)]);
    box(c, [630, 104, 100, 70], 170, '#d8d8d8', '#eee', '#aaa');
    box(c, [110, 405, 190, 70], 55, ...counter);
    box(c, [510, 410, 190, 80], 55, ...counter);
    for (const [x, y, col] of [[150, 420, '#e8d'], [200, 430, '#ec5'], [560, 430, '#d84'], [620, 440, '#eee']]) box(c, [x, y, 30, 20], 70, col, col, col);
  });
  // 1 SALA DE PITCH: the stage and the projector screen, seen from behind the audience
  canvasTex('room1', CAMW, H, (c) => {
    shell(c, 1, '#5a1a22', '#4a1219', '#2a2230', 48);
    quad(c, '#111', [P(230, 96, 120), P(570, 96, 120), P(570, 96, 212), P(230, 96, 212)]); // screen frame
    box(c, [100, 96, 600, 120], 30, '#16161b', '#2b2b33');
    wallText(c, 'DEMO DAY', 120, 180, 22, '#ffe');
    box(c, [528, 128, 34, 34], 75, '#665', '#998', '#554');
    for (const [ox, oy] of [[80, 395], [80, 465], [480, 395], [480, 465]]) for (let x = ox + 6; x < ox + 240; x += 30) box(c, [x, oy, 22, 22], 40, '#7a2030', '#9a3040', '#5a1020');
  });
  // 2 SALA DE CÓDIGO: rows of desks, one laptop still on
  canvasTex('room2', CAMW, H, (c) => {
    shell(c, 2, '#3c4048', '#34373e', '#26303a', 64);
    wallText(c, 'ENTREGAS HASTA LAS 12', 400, 170, 15, '#9cf');
    for (const [ox, oy] of [[80, 150], [490, 150], [80, 420], [490, 420]]) {
      box(c, [ox, oy, 230, 42], 48, '#6d5a42', '#8c7558', '#4d3a22');
      for (let x = ox + 10; x < ox + 200; x += 56) box(c, [x, oy + 6, 34, 6], 66, '#111', '#222', '#111');
    }
  });
  // 3 SALA DE SIESTA: mats and beanbags, his red beanbag in the middle
  canvasTex('room3', CAMW, H, (c) => {
    shell(c, 3, '#1f2c4a', '#24335a', '#1c1c2c', 96);
    wallText(c, 'SILENCIO · ZONA DE DESCANSO', 400, 160, 18, '#88a');
    for (let i = 0; i < 6; i++) { const x = 90 + i * 100, y = 230 + (i % 2) * 150; quad(c, '#344a7a', [P(x, y), P(x + 80, y), P(x + 80, y + 40), P(x, y + 40)]); }
    for (const [x, y, col] of [[135, 158, '#a33'], [650, 153, '#3a6'], [645, 468, '#c6c'], [SLEEP_HOME[0], SLEEP_HOME[1] + 20, '#c43']]) {
      const [sx, sy, k] = P(x, y); c.fillStyle = col; c.beginPath(); c.ellipse(sx, sy - 14 * k, 46 * k, 32 * k, 0, 0, PI * 2); c.fill();
    }
  });
  // 5 LOBBY: sponsor stands, the big banner, the inflatable banana
  canvasTex('room5', CAMW, H, (c) => {
    shell(c, 5, '#5c5a58', '#666462', '#3e4a40', 112);
    wallText(c, 'PLATANUS HACK 26 · SANTIAGO', 400, 165, 26, '#ffd400');
    box(c, [90, 128, 170, 60], 70, ...stand);
    wallText(c, 'SPONSORS', 175, 120, 16, '#ccc');
    box(c, [520, 440, 200, 50], 70, ...stand);
    box(c, [686, 108, 56, 62], 120, '#311', '#622', '#211');
  });
}

// ---- Office panorama (first person, FNAF-style) 1600x600 ----
const PW = 1600, PCX = 800;
const ODOOR = { W: [150, 140, 180, 300], N: [710, 150, 180, 255], E: [1270, 140, 180, 300] };
const OPANEL = { W: [348, 250], N: [906, 238], E: [1212, 250] };
const OCENTER = { W: 240, N: 800, E: 1360 };
const COFFEE_X = 1000, BREW = 5, SIP = 1.8; // coffee maker on the desk: look at it, it is focusable like a door
function buildOffice() {
  canvasTex('office', PW, H, (c) => {
    const R = (col, x, y, w, h) => { c.fillStyle = col; c.fillRect(x, y, w, h); };
    const T = (col, sz, s, x, y) => { c.fillStyle = col; c.font = 'bold ' + sz + 'px monospace'; c.fillText(s, x, y); };
    const g = c.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, '#1b1d22'); g.addColorStop(0.68, '#2a2d33'); g.addColorStop(0.681, '#111214'); g.addColorStop(1, '#060607');
    R(g, 0, 0, PW, H);
    R('#0c0d10', 0, 0, PW, 60);
    for (let x = 0; x < PW; x += 120) R('#16181c', x + 4, 6, 112, 46);
    for (let x = 0; x < PW; x += 16) { const k = (x / 16) % 2; R(k ? '#d8d8d0' : '#141414', x, 352, 16, 10); R(k ? '#141414' : '#d8d8d0', x, 362, 16, 10); }
    for (let row = 0; row < 8; row++) {
      const y0 = 408 + row * row * 3.2 + row * 8, y1 = 408 + (row + 1) * (row + 1) * 3.2 + (row + 1) * 8, s0 = 1 + row * 0.35, s1 = s0 + 0.35;
      for (let col = -24; col < 24; col++) quad(c, (row + col) % 2 ? '#1d1d1f' : '#0b0b0c', [[PCX + col * 40 * s0, y0], [PCX + (col + 1) * 40 * s0, y0], [PCX + (col + 1) * 40 * s1, y1], [PCX + col * 40 * s1, y1]]);
    }
    quad(c, 'rgba(0,0,0,.45)', [[0, 0], [110, 60], [110, 470], [0, 600]]);
    quad(c, 'rgba(0,0,0,.45)', [[PW, 0], [PW - 110, 60], [PW - 110, 470], [PW, 600]]);
    for (const d of ADOOR) {
      const [x, y, w, h] = ODOOR[d], [px, py] = OPANEL[d];
      R('#000', x, y, w, h);
      R('#41454c', x - 14, y - 16, w + 28, 16); R('#41454c', x - 14, y, 14, h); R('#41454c', x + w, y, 14, h);
      R('#0c6', x + w / 2 - 30, y - 40, 60, 18); T('#000', 12, 'SALIDA', x + w / 2 - 23, y - 26);
      T('#9aa', 11, d == 'W' ? '← SIESTA' : d == 'E' ? 'LOBBY →' : '↑ SALA DE PITCH', x + (d == 'N' ? 30 : 46), y + h + 26);
      R('#2a2c30', px - 4, py - 4, 48, 104); R('#4c5058', px, py, 40, 96); // door + light buttons
    }
    R('#e6c21a', 470, 120, 110, 150); T('#000', 15, 'PLATANUS', 480, 150); T('#000', 15, 'HACK 26', 488, 170);
    R('#d9dcd3', 960, 110, 200, 130); T('#245', 22, '¡NO DORMIR!', 990, 182);
    R('#c0392b', 1180, 90, 70, 90); ['¿YA', 'HICISTE', 'DEPLOY?'].forEach((s, i) => T('#fff', 10, s, 1190, 120 + i * 14));
    // desk, monitors, keyboard, pizza, coffee maker, rubber banana, phone
    R('#2f2922', 440, 470, 720, 130); R('#4a4034', 440, 460, 720, 14); R('#1d1914', 440, 474, 720, 6);
    for (const mx of [470, 1090]) { R('#0b0b0d', mx, 368, 130, 96); R('#16304e', mx + 8, 376, 114, 76); R('#0b0b0d', mx + 55, 462, 20, 8); }
    R('#1a1a1c', 630, 486, 160, 30); for (let i = 0; i < 28; i++) R('#333', 636 + (i % 14) * 11, 492 + (i > 13) * 10, 8, 6);
    R('#a33', 1050, 500, 80, 50); R('#d8b06a', 1056, 494, 68, 10); T('#fff', 10, 'PIZZA', 1072, 530);
    R('#1b1b1b', COFFEE_X - 30, 400, 60, 72); R('#333', COFFEE_X - 24, 408, 48, 20); R('#111', COFFEE_X - 14, 440, 28, 6); T('#fff', 9, 'CAFÉ', COFFEE_X - 12, 422);
    c.fillStyle = '#e6c21a'; c.beginPath(); c.ellipse(1250, 470, 16, 30, 0.4, 0, PI * 2); c.fill();
    R('#222', 800, 430, 60, 38); R('#444', 804, 434, 30, 30);
  });
  canvasTex('door', 180, 300, (c) => {
    c.fillStyle = '#4b4f57'; c.fillRect(0, 0, 180, 300);
    c.fillStyle = '#5d626b'; for (let y = 10; y < 300; y += 40) c.fillRect(8, y, 164, 4);
    c.fillStyle = '#d4a017'; for (let x = 0; x < 180; x += 30) c.fillRect(x, 262, 15, 22);
  });
}

// =====================================================================
// CREATE
// =====================================================================
let wC, rC, oC, uC, uiCam;
let bgImg, dynG, emG, projTxt, askTxt, lensImg, oBg, oG, oBeam, oDim, oLamp, oTop;
const eImg = {}, oImg = {}, oDoors = {};
// UI objects (u*) live in the uC layer, which the post-FX camera ignores
let uC1, uC2, uCall, uCallName, uCallTxt, uCam, uCamBar, uCardN, uG, uHour, uHud, uLPress, uLStat, uLid, uLid2, uMapT, uMsg, uMug, uNight, uPPress, uPaperEnd, uPow, uPr, uScr, uScrT, uScreen, uStat, uSue, uT1, uTMenu, uTab, uTh, uTitleBan, uTitleStat, uVig, uVigCap, uVigImg, uVigIn, uW1, uW2, uWDone, uWarn;
let zR, zO; // the sleeper's z's (or !! when angry)
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
  dynG = add(rC, S.add.graphics());
  projTxt = txt(rC, 0, 0, '', 18, '#111');
  for (const r of ROLES) eImg[r] = img(rC, r + '0', 0, 0, 0.5, 1);
  lensImg = img(rC, 'mentora0', 0, 0, 0.5, 0.2).setVisible(false);
  emG = add(rC, S.add.graphics());
  askTxt = txt(rC, 0, 0, '', 15, '#111').setVisible(false);
  zR = txt(rC, 0, 0, '', 16); zO = txt(oC, 0, 0, '', 22);
  // office
  oBg = img(oC, 'office', 0, 0, 0, 0);
  oG = add(oC, S.add.graphics());
  for (const r of ROLES) oImg[r] = img(oC, r + '0', 0, 0, 0.5, 1);
  for (const d of SIDES) oDoors[d] = img(oC, 'door', ODOOR[d][0], ODOOR[d][1], 0, 0);
  oTop = add(oC, S.add.graphics());
  oBeam = img(oC, 'cone', 0, 0, 0, 0.5).setBlendMode(1).setTint(0xfff0c0).setVisible(false);
  oLamp = img(oC, 'cone', PCX, 40, 0, 0.5).setBlendMode(1).setTint(0xffe2a0).setScale(1.9, 2.6);
  oDim = add(oC, S.add.graphics());

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
  uTab = rect(0, H, W, H, 0x0e1612);
  uHour = T(24, 22, '', 30, '#fff', 0, 0);
  uNight = T(26, 58, '', 14, '#aab', 0, 0);
  uPow = T(776, 22, '', 16, '#fff', 1, 0);
  uSue = T(776, 70, '', 12, '#c9b6ff', 1, 0);
  uCam = [T(40, 34, '', 20, '#bfffcf', 0, 0), T(600, 34, '● REC', 16, '#ff4444', 1, 0), T(40, 60, '', 13, '#8fdc9f', 0, 0), T(668, 474, 'STICK: CÁMARA · B3 BAJAR', 10, '#8fdc9f')];
  uMapT = [0, 1, 2, 3, 4, 5].map((i) => T(0, 0, i == CTRL ? 'TÚ' : 'CAM ' + (i + 1 - (i > CTRL)), 11, '#bfffcf'));
  uPr = [0, 1, 2].map(() => T(0, 0, '', 13, '#fff', 0.5, 0.5, { backgroundColor: '#000000cc', padding: { x: 6, y: 3 } }));
  uCamBar = T(400, 580, '▲  CÁMARAS', 14, '#cfe', 0.5, 0.5, { backgroundColor: '#1f3b2acc', padding: { x: 70, y: 4 } });
  uWarn = T(560, 580, '⚠', 34, '#ffd400'); // FNAF2-style warning next to the camera bar
  uMsg = T(400, 140, '', 22, '#fff', 0.5, 0.5, { stroke: '#000', strokeThickness: 5, align: 'center' });
  uTh = T(400, 530, '', 14, '#1a1a22', 0.5, 1, { backgroundColor: '#e9e6f2', padding: { x: 10, y: 6 }, wordWrap: { width: 420 }, align: 'center', fontStyle: 'italic bold' });
  // "MIENTRAS TANTO..." comic panel
  const v = (uVig = add(h, S.add.container(820, 118)));
  add(v, S.add.rectangle(0, 0, 240, 158, 0xffffff).setOrigin(0));
  uVigIn = add(v, S.add.rectangle(5, 5, 230, 148, 0x333333).setOrigin(0));
  uVigImg = img(v, 'pitcher0', 120, 118, 0.5, 1).setScale(3.4);
  txt(v, 5, 5, 'MIENTRAS TANTO...', 11, '#111', 0, 0, { backgroundColor: '#ffd400', padding: { x: 5, y: 2 } });
  uVigCap = txt(v, 120, 150, '', 11, '#fff', 0.5, 1, { backgroundColor: '#000000dd', padding: { x: 5, y: 3 }, wordWrap: { width: 216 }, align: 'center' });
  v.setAngle(-2).setVisible(false);
  // phone call
  uCall = add(h, S.add.container());
  add(uCall, S.add.rectangle(20, 470, 760, 96, 0x05060a, 0.88).setOrigin(0).setStrokeStyle(2, 0x3a4150));
  uCallName = txt(uCall, 40, 478, '', 14, '#ffd400', 0, 0);
  uCallTxt = txt(uCall, 40, 500, '', 15, '#e8e8f0', 0, 0, { wordWrap: { width: 720 }, lineSpacing: 4 });
  txt(uCall, 770, 562, 'MANTÉN START PARA COLGAR', 10, '#667', 1, 1);
  // drinking: a big mug rises in front of your face
  uMug = add(h, S.add.container(400, H + 200));
  const m = add(uMug, S.add.graphics());
  m.fillStyle(0xe8e2c8).fillRoundedRect(-110, -130, 220, 260, 24).lineStyle(26, 0xe8e2c8).strokeCircle(130, 0, 60).fillStyle(0x5a3416).fillEllipse(0, -120, 190, 34).fillStyle(0xc0392b).fillRect(-110, -20, 220, 40);
  txt(uMug, 0, 0, 'PLATANUS', 22);
  uScr = img(uC, 'pitcherH', 400, 330).setVisible(false);
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
function screen(m) { mode = m; modeT = 0; wC.setVisible(false); hideHud(); clearScreen(); }
function goTitle() {
  screen('title');
  const r = pick(ROLES); // a random opponent stares at you, close up
  uTitleBan = sAdd(S.add.image(200, 50 - SPRF[r].top * 18, r + '0').setScale(18).setOrigin(0.5, 0));
  uTitleStat = sAdd(S.add.tileSprite(0, 0, W, H, 'noise').setOrigin(0));
  uT1 = sText(440, 70, 'Five\nNights\nat\nPlatanus', 52, '#eee', 0, 0, { lineSpacing: -6 });
  sText(442, 350, 'La hackathon terminó. Ellos no.', 14, '#889', 0, 0.5);
  uTMenu = sText(440, 430, '', 22, '#fff', 0, 0.5);
}
function titleUpdate() {
  // the opponent stares out of the static, flickers and twitches now and then
  const tw = M.random() < 0.04;
  uTitleBan.setAlpha(M.random() < 0.06 ? 0.2 : 0.75).setAngle(tw ? rnd(-7, 7) : uTitleBan.angle * 0.9).setX(tw ? rnd(185, 215) : 200).setTint(tw ? 0xff8080 : 0x909090);
  uTitleStat.setTilePosition(rnd(0, 200), rnd(0, 150)).setAlpha(tw ? 0.4 : rnd(0.08, 0.16));
  uT1.setAlpha(M.random() < 0.03 ? 0.3 : 1);
  if (saved.night > 1) {
    if (pr('L')) menuNight = M.max(1, menuNight - 1), sfxBlip(1, 0, 400);
    if (pr('R')) menuNight = M.min(saved.night, menuNight + 1), sfxBlip(1, 0, 500);
    uTMenu.setText('◄ NOCHE ' + menuNight + ' ►  START');
  } else uTMenu.setText('PRESIONA START');
  uTMenu.setAlpha(0.6 + M.sin(modeT * 4) * 0.4);
  if (pr('S') || pr('1')) { sfxClick(); if (menuNight == 1) goPaper(0); else goCard(menuNight); }
}
// Newspaper: intro (0) or ending (1). It spins in and slams onto the table.
function goPaper(end) {
  screen('paper'); uPaperEnd = end;
  sRect(0x0b0907);
  const pc = sAdd(S.add.container(400, 300));
  const T = (y, s, sz, ex, x, o) => sText((x || 400) - 400, y - 300, s, sz, '#151515', o ?? 0.5, o ?? 0.5, Object.assign({ fontFamily: 'Georgia, serif' }, ex), pc);
  const R = (x, y, w, h, col) => sAdd(S.add.rectangle(x - 400, y - 300, w, h, col).setOrigin(0), pc);
  R(58, 18, 684, 566, 0xe9e2cc);
  T(62, 'EL DIARIO DEL HACK', 44);
  R(78, 92, 644, 3, 0x151515);
  T(110, (end ? 'SÁBADO 28' : 'DOMINGO 22') + ' DE NOVIEMBRE, 2026  ·  SANTIAGO', 11);
  T(156, end ? 'HACKATHON CONCLUYE SIN INCIDENTES' : '¡GANADORES VIAJAN A SAN FRANCISCO!', 31);
  T(212, end
    ? 'Tras cinco noches de turno, el recinto fue entregado a sus dueños sin daños. El guardia no quiso dar declaraciones, pero testigos aseguran que pidió "un café, el más grande que tengan".\n\nVecinos insisten en que, de noche, todavía se escuchan pasos adentro.'
    : 'Tras 36 horas sin dormir, el equipo ganador viaja a San Francisco junto a los organizadores. El recinto quedará cerrado cinco noches antes de ser devuelto.\n\nSE BUSCA GUARDIA NOCTURNO. Turno de 12 a 6 AM. Café ilimitado. No abandonar la sala de control. Llamar a Rafa.',
  20, { wordWrap: { width: 600 }, lineSpacing: 8 }, 100, 0);
  if (end) T(530, 'FIN', 48);
  pc.setScale(3).setAngle(-540).setAlpha(0);
  S.tweens.add({ targets: pc, scale: 1, angle: end ? 1.5 : -1.5, alpha: 1, duration: 1100, ease: 'Cubic.easeOut', onComplete: () => { sfxDoor(0); uiCam.shake(180, 0.008); } });
  uPPress = sText(400, 592, 'START · CONTINUAR', 12, '#888');
}
function paperUpdate() {
  uPPress.setAlpha(modeT > 1.6 ? 0.5 + M.sin(modeT * 4) * 0.5 : 0);
  if (modeT > 1.6 && anyPr()) { sfxClick(); if (uPaperEnd) goTitle(); else goCard(1); }
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
const mkE = (role, r, [x, y], st, o) => Object.assign({ role, r, x, y, st, fx: 1, t: 0, anim: 0, mv: 0, snd: rnd(0, 2), shake: 0, anger: 0 }, o);
function startNight(n) {
  clearScreen();
  night = n; [hl, grace, pitchOn, patience, pfast, wakeH, drain, cookOn, mentoraOn, coderOn, mspd, sueRate] = NIGHTS[n - 1]; nightLen = hl * 6; now = 0; power = 100; sueno = n == 1 ? 0 : 8; blackout = 0;
  view = 'office'; va = 0; pan = 400; panV = 0; focus = 'N'; camR = 1; statA = light = plug = cutH = cof = cofT = cofHold = drink = lidY = 0;
  doors = { W: 0, E: 0 }; doorP = { W: 0, E: 0 }; plug = -1; flash = 0;
  blink = 0; blinkT = rnd(8, 14); dread = heartT = msgT = flick = 0; scareT = rnd(14, 24); breathT = 3;
  const [nm, ...ln] = CALLS[n - 1];
  phone = { i: -1, ch: 0, t: -1.5, skip: 0, nm, ln }; thought = vigOn = doomed = null; thOnce = {}; vigQ = [];
  clicking = clickT = yawn1 = yawn2 = scrOn = 0; lastView = view;
  E = {
    pitcher: mkE('pitcher', 1, PITCH_HOME, 'PITCH', { slide: 1, bar: 1 }),
    sleeper: mkE('sleeper', 3, SLEEP_HOME, 'SLEEP', { wakeAt: rnd(wakeH, wakeH + 1) * hl }),
    mentora: mkE('mentora', 0, [400, 300], 'WANDER', { cool: 0 }),
    chef: mkE('chef', 0, CHEF_HOME, 'COOK', { p: 0, bang: 4 }),
    coder: mkE('coder', 2, CODER_HOME, 'TYPE', { plugT: coderOn ? rnd(8, 14) : 1e9 }),
  };
  mode = 'play'; modeT = 0;
  wC.setVisible(true); uHud.setVisible(true); uVig.setVisible(false);
  if (AC) ambG.gain.setTargetAtTime(1, AC.currentTime, 0.5);
  setMsg('', 0);
}
const hourOf = (t) => (t / hl) | 0;
const clockStr = (t) => (hourOf(t) || 12) + ':' + String(((t % hl) / hl * 60) | 0).padStart(2, '0') + ' AM';

// ---- thoughts & vignettes ----
function think(s, once, dur) {
  if (once) { if (thOnce[once]) return; thOnce[once] = 1; }
  thought = { s, t: dur || 3.4 };
}
const VIG = {
  pitch_out: ['pitcher', 1, 'SALA DE PITCH: nadie le pasó la diapositiva. Busca público...'],
  sleep_wake: ['sleeper', 3, 'SALA DE SIESTA: ...el sonámbulo se levantó.'],
  chef_go: ['chef', 0, 'COCINA: ¡el chef salió corriendo!'],
  coder_plug: ['coder', 2, 'SALA DE CÓDIGO: "solo necesito un enchufe más..."'],
  coder_go: ['coder', 2, 'SALA DE CÓDIGO: "¿quién me desenchufó?"'],
};
function vignette(k) {
  if (view == 'cams' && camR == VIG[k][1]) return; // you are already watching it
  if (vigQ.length < 3 && !(vigOn && vigOn.k == k)) vigQ.push(k);
}
function updateVignette(dt) {
  if (!vigOn && vigQ.length) {
    const k = vigQ.shift(), [, room, cap] = VIG[k];
    vigOn = { k, t: 0 };
    uVigIn.fillColor = room >= 0 ? RBG[room] : 0x400010;
    uVigCap.setText(cap);
    uVig.setVisible(true);
    sfxSting();
  }
  const v = vigOn;
  if (!v) return;
  v.t += dt;
  uVig.setX(v.t < 0.35 ? lerp(820, 548, v.t / 0.35) : v.t > 3.4 ? lerp(548, 820, (v.t - 3.4) / 0.35) : 548);
  const fr = SPRF[VIG[v.k][0]];
  uVigImg.setTexture(fr[((v.t * 5) | 0) % fr.length]);
  if (v.t > 3.75) { vigOn = null; uVig.setVisible(false); }
}

// =====================================================================
// MAIN UPDATE
// =====================================================================
function update(time, delta) {
  const dt = M.min(0.05, delta / 1000);
  modeT += dt;
  if (FX) { FX.t += dt; if (mode != 'play' && mode != 'scream') Object.assign(FX, { nv: 0, no: mode == 'title' ? 0.06 : 0.02, ab: 0.2, dk: 0.2, wp: 0 }); }
  if (mode == 'play') { playUpdate(dt); }
  else ({ title: titleUpdate, paper: paperUpdate, card: cardUpdate, scream: screamUpdate, lose: loseUpdate, win: winUpdate })[mode](dt);
  for (const k in pressed) pressed[k] = 0;
}
function playUpdate(dt) {
  now += dt;
  if (now >= nightLen) return winNight();
  updateCall(dt);
  input(dt);
  updateResources(dt);
  if (mode != 'play') return;
  updateBlink(dt);
  aiPitcher(dt); aiSleeper(dt); aiMentora(dt); aiChef(dt); aiCoder(dt);
  if (mode != 'play') return;
  updateDoom(dt);
  if (mode != 'play') return;
  audioCues(dt);
  updateThoughts(dt);
  updateVignette(dt);
  render(dt);
}

// ---- Phone call ----
function updateCall(dt) {
  const c = phone;
  if (c.i >= c.ln.length) return;
  c.t += dt;
  if (c.i < 0) {
    if (c.t > 0 && !c.rang) { c.rang = 1; sfxRing(); }
    if (c.t > 2.6) { c.i = 0; c.ch = 0; }
    return;
  }
  if (hd('S')) { if ((c.skip += dt) > 0.7) { c.i = c.ln.length; sfxClick(); return; } } else c.skip = 0;
  const line = c.ln[c.i], prev = c.ch | 0;
  c.ch = M.min(line.length, c.ch + dt * 34);
  if ((c.ch | 0) != prev && (c.ch | 0) % 2 == 0 && line[c.ch | 0] != ' ') sfxBlip(1, 0, c.nm == 'NACHO' ? rnd(180, 300) : rnd(320, 520));
  if (c.ch >= line.length && (c.hold = (c.hold || 0) + dt) > 1.6 + line.length * 0.025) { c.i++; c.ch = 0; c.hold = 0; if (c.i >= c.ln.length && night == 5) sfxStatic(1.2); }
}
const callOn = () => { const c = phone; return c.i < c.ln.length && (c.i >= 0 || c.t > 0); };

// =====================================================================
// INPUT — office (look around, doors, lights, coffee) and cameras
// =====================================================================
function input(dt) {
  const office = view == 'office';
  const dir = hd('R') - hd('L');
  panV = lerp(panV, office ? dir * 820 : 0, 1 - M.pow(0.0008, dt));
  pan = clamp(pan + panV * dt, 0, PW - W);
  let best = null, bd = 260;
  for (const d of ADOOR) { const dd = M.abs(OCENTER[d] - pan - 400); if (dd < bd) { bd = dd; best = d; } }
  if (M.abs(COFFEE_X - pan - 400) < 80) best = 'C';
  focus = best;
  va = clamp(va + (office ? -dt : dt) * 5, 0, 1);
  light = clicking = flash = 0;
  if (office) {
    if (drink > 0) return; // drinking: cup in front of your face
    if (pr('U') && !blackout) { view = 'cams'; statA = 0.9; sfxCam(); HINT.cams++; makeNoise(); return; }
    if (focus == 'C') {
      // coffee: hold B1 to brew a cup, wait for it, press B1 to drink it
      if (!cof && !blackout && hd('1')) { if ((cofHold += dt) > 0.6) { cofHold = 0; cof = 1; cofT = BREW; sfxCoffee(); makeNoise(); } }
      else cofHold = 0;
      if (cof > 1 && pr('1')) { cof = 0; drink = SIP; sfxEat(); makeNoise(); }
      return;
    }
    light = hd('1') && !blackout && focus ? 1 : 0;
    if (pr('1') && light) { sfxLight(); HINT.light++; flash = focus; power -= 0.4; } // each flash costs a bit of power
    if (pr('2') && focus) { toggleDoor(focus); HINT.door++; }
    return;
  }
  if (blackout) { view = 'office'; return; }
  const [c, r] = RC[camR];
  if (pr('3') || (pr('D') && (r == 1 || c == 1))) { view = 'office'; sfxCam(); makeNoise(); return; }
  const nc = clamp(c + pr('R') - pr('L'), 0, 2), nr = clamp(r + pr('D') - pr('U'), 0, 1);
  let n = nr * 3 + nc;
  if (n == CTRL) n = pr('L') ? 3 : pr('R') ? 5 : camR;
  if (n != camR) { camR = n; sfxCam(); statA = 0.85; }
  // B1 is this camera's action: the pitch room clicker, or the coder's cord
  clicking = hd('1') && camR == 1 && pitchOn;
  if (camR == 2 && plug >= 0 && hd('1')) { if ((cutH += dt) > 1.2) { cutH = 0; plug = -1; sfxErr(); setMsg('ENCHUFE CORTADO', 1.4); coderAngry(); } } else cutH = 0;
  if (clicking) {
    const p = E.pitcher;
    p.bar = M.min(1, p.bar + dt / 2.4); HINT.slide += dt / 2;
    if ((clickT = (clickT || 0) - dt) <= 0) { clickT = 0.45; p.slide++; sfxClick(); }
  }
}
function toggleDoor(d) {
  if (d == 'N') return think('El pasillo del frente no tiene puerta...', 'nodoor');
  if (blackout) { sfxErr(); think('No hay energía... las puertas no responden.', 'outdoor'); return; }
  doors[d] ^= 1;
  sfxDoor(dPan(d)); makeNoise();
}
// anything loud while the sleepwalker stands in the front hallway wakes him up
function makeNoise() { const s = E.sleeper; if (s.st == 'FRONT') wakeUp(s); }
const doorClosed = (d) => doorP[d] > 0.5;

// ---- Resources ----
function updateResources(dt) {
  for (const d of SIDES) doorP[d] = clamp(doorP[d] + (doors[d] ? dt : -dt) / 0.45, 0, 1);
  if (cof == 1 && (cofT -= dt) <= 0) { cof = 2; tone(880, 0.25, 's', 0.12, 0.3); } // ding
  if (drink > 0 && (drink -= dt) <= 0) { sueno = M.max(0, sueno - 60); setMsg('☕  -SUEÑO', 1.2); }
  if (!blackout) {
    // FNAF-style power: doors, door light, cameras and the coder's extension cord all drain
    let u = drain + (doorP.W > 0) * 0.14 + (doorP.E > 0) * 0.14 + light * 0.18 + (view == 'cams') * 0.07 + (cof == 1) * 0.1;
    if (plug >= 0) u += night >= 5 ? 0.3 : 0.25;
    usage = 1 + (doorP.W > 0) + (doorP.E > 0) + light + (view == 'cams') + (cof == 1) + (plug >= 0); // one bar per device
    if ((power -= u * dt) <= 0) powerOut();
  }
  sueno += dt * 100 / sueRate;
  if (sueno > 50 && !yawn1) { yawn1 = 1; sfxYawn(); think('*bostezo* Se me cierran los ojos... necesito un café.', 'sleepy'); }
  if (sueno > 75 && !yawn2) { yawn2 = 1; sfxYawn(); think('No... no te duermas. CAFÉ.', 'sleepy2'); }
  if (sueno < 40) yawn1 = yawn2 = 0;
  if (sueno >= 100) lose('sleep');
}
function powerOut() {
  power = light = cof = 0; blackout = 1; doors = { W: 0, E: 0 }; view = 'office';
  sfxErr(); noise(2, 0.4, 'l', 200, 0, 60);
  Object.assign(E.coder, { st: 'HUNT', huntT: 0, strike: rnd(8, 16) });
  think('No... no, no, no. Se cortó la luz.', 0, 3);
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
function updateThoughts(dt) {
  if (thought && (thought.t -= dt) <= 0) thought = null;
  if (callOn()) return;
  // somebody is standing in the front hallway: you only know who with the light
  if (view == 'office' && Object.values(E).some((e) => e.kd == 'N' && e.at > 0.3)) think('Algo respira en el pasillo del frente... (B1 una vez para ver quién es)', 'front', 4.5);
}

// ---- Perception ----
// 0 = not seen, 1 = seen on camera, 2 = door light right on it
function seen(e) {
  if (blinking()) return 0;
  if (view == 'cams') return va >= 1 && camR == e.r && !blackout && !blindDoor(e) ? 1 : 0;
  const bd = blindDoor(e);
  return bd && light && bd == focus && !doorClosed(bd) ? 2 : 0;
}
// closed doors block paths; wanderers and hunters never cut through your office
function blocked(all) {
  const b = new Set();
  for (const d of ADOOR) if (all || doorClosed(d)) b.add(ek(CTRL, CDOOR[d].adj));
  return b;
}
// walk towards (x, y) in room r through the doorways: 1 = arrived, -1 = no path
function go(e, r, x, y, sp, dt, blk) {
  e.mv = 0;
  if (e.r != r) {
    const p = bfs(e.r, r, blk || blocked());
    if (!p) return (e.stuck = 1), -1;
    e.stuck = 0;
    const d = dirTo(e.r, p[1]), dp = DP[d];
    if (walk(e, dp[0], dp[1], sp, dt)) {
      const o = DP[OPP[d]], od = OPP[d];
      e.r = p[1]; e.x = o[0] + (od == 'W' ? 6 : od == 'E' ? -6 : 0); e.y = o[1] + (od == 'N' ? 6 : od == 'S' ? -6 : 0);
    }
    return 0;
  }
  return walk(e, x, y, sp, dt);
}
function walk(e, x, y, sp, dt) {
  const d = dist(e.x, e.y, x, y), s = sp * dt;
  e.mv = 1;
  if (M.abs(x - e.x) > 2) e.fx = x > e.x ? 1 : -1;
  if (d <= s) { e.x = x; e.y = y; return 1; }
  e.x += (x - e.x) / d * s; e.y += (y - e.y) / d * s;
  return 0;
}
// Hunters walk (never through your office) to the nearest of your doors and
// stop in the doorway. If the door is still open after a short beat, they are
// in: the scare happens right there, nobody strolls up to your desk.
// Returns 'go' (on the way), 'wait' (in the doorway), 'in' (got in), 'shut' (door closed).
function hunt(e, sp, dt, front) {
  if (!e.kd) {
    if (front && Object.values(E).some((o) => o != e && o.kd == 'N')) return (e.mv = 0), 'go'; // one at a time in the hallway
    let bd = 99;
    for (const d of front ? ['N'] : SIDES) { const p = bfs(e.r, CDOOR[d].adj, blocked(1)); if (p && p.length < bd) { bd = p.length; e.kd = d; } }
    e.kd = e.kd || (front ? 'N' : 'W'); e.at = e.kt = 0; e.kn = 0.3; e.stay = rnd(10, 18); // how long they wait at a closed door
  }
  const b = blindPt(e.kd);
  if (go(e, CDOOR[e.kd].adj, b[0], b[1], sp, dt, blocked(1)) != 1) { e.at = 0; return 'go'; }
  e.mv = 0;
  if (doorClosed(e.kd)) {
    e.at = 0; // reopening gives you the whole beat again... if they are still there
    if ((e.kt += dt) > e.kn) { e.kn = e.kt + rnd(3, 6); sfxKnock(dPan(e.kd)); } // knocks every few seconds
    return 'shut';
  }
  return (e.at += dt) > grace ? 'in' : 'wait';
}
function leaveDoor(e) { e.kd = null; }
// pick a random spot somewhere in the venue (rs: candidate rooms)
function wander(e, sp, dt, rs, wt) {
  if (!e.goal) { const r = pick(rs), s = pick(SPOTS[r]); e.goal = [r, s[0], s[1]]; e.wait = wt(r); }
  const res = go(e, ...e.goal, sp, dt, blocked(1));
  if (res == 1) { e.mv = 0; if ((e.wait -= dt) <= 0) e.goal = null; }
  if (res < 0) e.goal = null;
}

// =====================================================================
// AI
// =====================================================================
function aiPitcher(dt) {
  const p = E.pitcher;
  p.anim += dt;
  if (p.st == 'PITCH') {
    go(p, 1, PITCH_HOME[0] + M.sin(now * 0.4) * 70, PITCH_HOME[1], 22, dt);
    if (!pitchOn) return; // night 1: he just pitches to the empty room
    // his patience runs out unless someone keeps passing slides
    if (!clicking) p.bar -= dt / patience;
    p.shake = p.bar < 0.35 ? (0.35 - p.bar) * 4 : 0;
    if (p.bar <= 0) { p.bar = p.fl = p.shake = 0; p.st = 'SEARCH'; p.need = night + (M.random() < 0.5); leaveDoor(p); vignette('pitch_out'); }
  } else if (p.st == 'SEARCH') {
    // passing slides from his camera still calls him back while he walks
    if (clicking && p.bar > 0.3) return away(p, '"¡AH! ¡SIGUIENTE DIAPOSITIVA!"', 0.5);
    const h = hunt(p, seen(p) ? 30 : pfast, dt, 1);
    if (h == 'in') return doom('pitcher', p);
    // in the hallway: keep flashing him until he gives up (each flash buys time)
    if (h == 'wait' && flash == 'N') {
      p.at = M.max(0, p.at - 0.8); p.shake = 1;
      if (++p.fl == 1) think('¡Es el de pitch! Sigue encandilándolo (B1)', 'pfl', 3);
      if (p.fl >= p.need) away(p, '"...ok, ok. Sin preguntas."', 0.4);
    }
  } else if (p.st == 'RETURN' && go(p, 1, PITCH_HOME[0], PITCH_HOME[1], 95, dt, blocked(1)) == 1) p.st = 'PITCH';
}
// send a hunter back home (pitcher: with some patience left)
function away(p, msg, bar) { p.st = 'RETURN'; p.bar = M.max(p.bar, bar); p.shake = 0; leaveDoor(p); setMsg(msg, 1.6); }
// THE SLEEPWALKER: sleeps in the siesta room, gets up now and then, wanders a
// bit and ends up standing in your front hallway (no door there). While he is
// there, any noise wakes him: doors, the tablet, the coffee maker. One flash of
// light to see who it is is fine; a second one (or holding it) wakes him too.
function aiSleeper(dt) {
  const s = E.sleeper;
  s.anim += dt;
  if (s.st == 'SLEEP') {
    s.mv = s.shake = 0;
    if (now > s.wakeAt) { s.st = 'WALK'; s.goal = null; s.n = 1 + (M.random() * 2 | 0); tone(300, 0.3, 't', 0.1, panOf(s), 500); vignette('sleep_wake'); }
  } else if (s.st == 'WALK') {
    // a couple of aimless stops, then off to your front hallway
    if (s.n > 0) { wander(s, 40, dt, ROOMS5, () => rnd(2, 5)); if (!s.goal) s.n--; return; }
    if (hunt(s, 40, dt, 1) != 'go') { s.st = 'FRONT'; s.t = rnd(8, 14); s.fl = s.lit = 0; }
  } else if (s.st == 'FRONT') {
    s.mv = 0; s.at = 1; // for the hallway thought
    s.lit = seen(s) == 2 ? s.lit + dt : 0;
    if (flash == 'N' && ++s.fl == 1) think('Es el sonámbulo... no hagas NADA hasta que se vaya.', 'slid', 4);
    if (s.fl > 1 || s.lit > 0.8) return wakeUp(s);
    if ((s.t -= dt) <= 0) { leaveDoor(s); s.st = 'HOME'; }
  } else if (s.st == 'HOME') {
    if (go(s, 3, SLEEP_HOME[0], SLEEP_HOME[1], 40, dt, blocked(1)) == 1) { s.st = 'SLEEP'; s.wakeAt = now + hl * rnd(1, 1.6) * (1.2 - night * 0.1); }
  } else if (s.st == 'ANGRY' && (s.t -= dt) <= 0) doom('sleeper', s);
}
function wakeUp(s) { s.st = 'ANGRY'; s.t = 0.7; s.shake = 1.4; tone(140, 0.6, 'w', 0.35, 0, 70); setMsg('"¡¿QUIÉN ANDA AHÍ?!"', 1.5); }
// LA MENTORA: she only comes closer while you watch her. Stare at her and she
// walks up to the lens; look away and she backs off. Once her face
// is pressed against the lens (LENS_T s of watching) she runs for the door
// nearest to her room. Follow her on the cameras (purple flag) or by ear.
const LENS_T = 2.2;
function aiMentora(dt) {
  const m = E.mentora, watched = view == 'cams' && va >= 1 && camR == m.r && !blindDoor(m) && !blinking();
  m.anim += dt;
  if (m.st == 'DOOM') return;
  if (m.st == 'COOL' && (m.cool -= dt) <= 0) m.st = 'WANDER';
  // a glance is free: the count resets the moment you look away. Past 1 s she
  // stops and stares back (your cue to switch); past 1.8 s she starts coming
  m.eye = mentoraOn && watched && m.st == 'WANDER' ? (m.eye || 0) + dt : 0;
  if (m.eye > 1.8) { m.st = 'LENS'; m.lt = 0; sfxMurmur(1, 0); }
  if (m.st == 'LENS') {
    m.mv = watched;
    if (!watched) { if ((m.lt -= dt * 0.6) <= 0) m.st = 'WANDER'; return; }
    // she comes straight at the camera until her face fills it
    m.lt += dt; m.fx = 1;
    m.x = lerp(m.x, 400, M.min(1, dt * 2));
    statA = M.max(statA, 0.1 + m.lt * 0.2);
    if (m.lt > LENS_T) {
      m.st = 'RUSH'; leaveDoor(m); sfxStatic(0.6); statA = 1; setMsg('"¡TE VI!"', 2);
      m.x = 400; m.y = 560; // she leaves the shot under the camera
    }
  } else if (m.st == 'RUSH') {
    const h = hunt(m, 130, dt);
    if (h == 'in') return doom('mentora', m);
    if (h == 'shut') { if (m.kt > 0.4) think('"¿Puedo pasar? Es un feedback cortito..."', 'mknock', 3); if (m.kt > m.stay) { m.st = 'COOL'; m.cool = 14; leaveDoor(m); m.goal = null; } }
  } else if ((m.shake = m.eye > 1 ? 0.5 : 0)) { m.mv = 0; m.fx = 1; }
  else wander(m, mspd, dt, ROOMS5, (r) => (r == 1 ? rnd(12, 22) : rnd(5, 10)));
}
// THE CHEF stays in the kitchen... while you keep an eye on him. Every moment
// the kitchen camera is not watched he gets closer to leaving: stove -> staring
// at the camera -> at the kitchen door -> gone, running to your left door.
// Closed door: he bangs on it (power loss, bigger each time) and goes back.
const CHEF_POS = [CHEF_HOME, [400, 340], [400, 480]];
function aiChef(dt) {
  const c = E.chef;
  c.anim += dt;
  if (c.st == 'COOK') {
    const st = c.p | 0, [x, y] = CHEF_POS[st];
    go(c, 0, x + (st ? 0 : M.sin(now) * 40), y, 60, dt);
    c.shake = st * 0.4; if (st) c.fx = 1;
    if (!cookOn) return;
    // watching the kitchen holds him (and slowly pushes him back)
    c.p = view == 'cams' && va >= 1 && camR == 0 && !blackout ? M.max(0, c.p - dt * 0.15) : c.p + dt * 3 / cookOn;
    if (c.p >= 3) { c.st = 'RUN'; c.shake = 0; leaveDoor(c); vignette('chef_go'); }
  } else if (c.st == 'RUN') {
    const h = hunt(c, 230, dt);
    if (h == 'in') return doom('chef', c);
    if (h == 'shut') { power -= c.bang; c.bang += 5; sfxKnock(-0.8); sfxKnock(-0.8); setMsg('*¡BAM! ¡BAM!*  -ENERGÍA', 1.6); leaveDoor(c); c.st = 'RETURN'; }
  } else if (c.st == 'RETURN' && go(c, 0, CHEF_HOME[0], CHEF_HOME[1], 70, dt, blocked(1)) == 1) { c.st = 'COOK'; c.p = 0; }
}
// THE CODER plugs his rig into your power. Cut the cord and he comes to complain.
// When the power is out, his face shows up in the dark doorway... and then he strikes.
function coderAngry() {
  const c = E.coder;
  if (c.st == 'HUNT' || c.st == 'COMPLAIN') return;
  c.st = 'WAIT'; c.t = rnd(1.5, 3); leaveDoor(c);
}
function aiCoder(dt) {
  const c = E.coder;
  c.anim += dt;
  if (c.st == 'TYPE') {
    go(c, 2, CODER_HOME[0], CODER_HOME[1], 40, dt);
    if (coderOn && plug < 0 && (c.plugT -= dt) <= 0) { plug = 2; sfxType(0.8, panOf(c)); vignette('coder_plug'); }
  } else if (c.st == 'BACK') { if (go(c, 2, CODER_HOME[0], CODER_HOME[1], 70, dt, blocked(1)) == 1) { c.st = 'TYPE'; c.plugT = coderOn * rnd(0.8, 1.2); } }
  else if (c.st == 'WAIT') { c.mv = 0; if ((c.t -= dt) <= 0) { c.st = 'COMPLAIN'; vignette('coder_go'); } }
  else if (c.st == 'COMPLAIN') {
    const h = hunt(c, 82, dt);
    if (h == 'in') return doom('coder', c);
    if (h == 'shut' && c.kt > c.stay) { c.st = 'BACK'; leaveDoor(c); }
  } else if (c.st == 'HUNT' && (c.huntT += dt) > c.strike) lose('coder');
}

// ---- Attacks ----
// When a threat gets in it does NOT scream right away: it waits behind you.
// The scare lands when you lower the camera or turn your head... or whenever
// it feels like it. Time keeps running.
function doom(why, e) {
  if (doomed) return;
  doomed = { why, t: 0, max: rnd(2.5, 6) };
  e.r = CTRL; // inside now, out of every camera and doorway
  e.ps = e.st; e.st = 'DOOM'; e.mv = 1; // keeps sounding exactly as before: no silence gives it away
}
function updateDoom(dt) {
  const d = doomed, lowered = lastView != 'office' && view == 'office';
  lastView = view;
  if (d && (((d.t += dt) > 0.35 && (lowered || (view == 'office' && (pr('L') || pr('R'))))) || d.t > d.max)) { view = 'office'; lose(d.why); }
}

// =====================================================================
// AUDIO CUES & SUSPENSE (everything is heard from the chair)
// =====================================================================
function audible(e) {
  const gd = gdist(e.r, CTRL);
  if (gd == 1) { const dp = DP[OPP[dirTo(CTRL, e.r)]]; return 0.25 + 0.5 * clamp(1 - dist(e.x, e.y, dp[0], dp[1]) / 500, 0, 1); }
  return [1, 0, 0.1, 0.03][gd];
}
const panOf = (e) => clamp(e.r == CTRL ? (e.x - 400) / 360 : (RC[e.r][0] - 1) * 0.75, -1, 1);
function audioCues(dt) {
  // no music that rises when danger is near: the dread only follows the clock and your sleepiness
  const d = M.max(0.15 + (now / nightLen) * 0.25, (sueno - 80) / 25);
  dread = lerp(dread, clamp(d, 0, 1), 1 - M.pow(0.2, dt));
  flick -= dt;
  if (flick < -6 && M.random() < dt * 0.06) flick = rnd(0.1, 0.35);
  if (!AC) return;
  muffle.frequency.setTargetAtTime(9000 - sueno * 60, AC.currentTime, 0.2);
  droneG.gain.setTargetAtTime(0.012 + dread * 0.09, AC.currentTime, 0.4);
  droneF.frequency.setTargetAtTime(90 + dread * 600, AC.currentTime, 0.4);
  for (const k in E) {
    const e = E[k];
    if ((e.snd -= dt) > 0) continue;
    const v = audible(e), pn = panOf(e), st = e.st == 'DOOM' ? e.ps : e.st; // sounds as if still on the way
    if (k == 'pitcher') {
      if (st == 'PITCH') {
        if (pitchOn && e.bar < 0.35) { sfxBabble(v * (1.6 - e.bar * 2), pn, 420 + (0.35 - e.bar) * 400); e.snd = 0.5 + e.bar * 2; }
        else { if (pitchOn) sfxBabble(v * 0.8, pn, 300); e.snd = rnd(0.6, 1.4); }
      } else if (st == 'SEARCH') { sfxBabble(v * 1.3, pn, 380); if (e.mv) sfxStep(v * 1.2, pn); e.snd = e.mv ? 0.33 : 0.9; }
      else { sfxStep(v, pn); e.snd = 0.45; }
    } else if (k == 'sleeper') {
      if (st == 'SLEEP') { sfxSnore(v, pn); e.snd = 2.8; }
      else { if (e.mv) sfxStep(v * 0.6, pn); e.snd = 1.4; } // slow shuffling steps
    } else if (k == 'mentora') {
      if (!mentoraOn) e.snd = 5;
      else if (st == 'RUSH') { sfxStep(v * 1.6, pn); tone(2400, 0.03, 'q', 0.04 * v, pn); e.snd = 0.2; } // fast heels
      else { sfxMurmur(v * 0.7, pn); e.snd = rnd(2.5, 4.5); }
    } else if (k == 'chef') {
      if (st == 'COOK') { noise(0.4, 0.05 * v, 'b', 2500, pn, 0, 0, 2); e.snd = rnd(1, 2); } // sizzling
      else { if (e.mv) sfxStep(v * 1.8, pn); e.snd = st == 'RUN' ? 0.16 : 0.4; } // running
    } else if (st == 'HUNT') { sfxType(1.5, -0.6); e.snd = M.max(0.08, 0.6 - e.huntT * 0.04); } // typing faster and faster, right outside
    else if (st == 'TYPE') { sfxType(v * 0.6, pn); e.snd = rnd(0.3, 0.8); }
    else { sfxStep(v * (st == 'COMPLAIN' ? 1.4 : 1), pn); e.snd = st == 'COMPLAIN' ? 0.3 : 0.4; }
  }
  // breathing right behind an open door
  if ((breathT -= dt) <= 0) { breathT = 3.2; for (const k in E) { const bd = blindDoor(E[k]); if (bd && !doorClosed(bd) && (k != 'mentora' || mentoraOn)) sfxBreath(0.8, dPan(bd)); } }
  if ((scareT -= dt) <= 0) { scareT = rnd(16, 34); sfxFar(); }
  if (dread > 0.35 && (heartT -= dt) <= 0) { sfxHeart(dread); heartT = lerp(1.1, 0.42, dread); }
}

// =====================================================================
// RENDER
// =====================================================================
const tick = (f) => ((now * f) | 0) % 2;
// when each character strikes its action pose (frame 1)
const POSE = {
  pitcher: (e) => e.st == 'PITCH' && tick(0.6), // points the clicker at the screen
  sleeper: (e) => e.st == 'SLEEP', // snoring
  mentora: (e) => e.eye > 1 || e.st == 'LENS' || e.st == 'RUSH', // points at you
  chef: (e) => e.p >= 1 || e.st == 'RUN', // knife up
  coder: (e) => e.st != 'TYPE', // laptop shut under his arm
};
function frameOf(e) {
  const fr = SPRF[e.role];
  return fr[e.mv && ((e.anim * 5) | 0) % 2 ? 2 : +!!POSE[e.role](e)];
}
function render(dt) {
  const camMode = view == 'cams' && va >= 1;
  rC.setVisible(camMode); oC.setVisible(!camMode);
  if (camMode) renderCam(camR); else renderOffice(dt);
  renderHud(dt);
  if (FX) Object.assign(FX, {
    nv: +camMode,
    no: (camMode ? 0.1 : 0.03) + statA * 0.5 + blackout * 0.05,
    ab: dread * 1.2 + (sueno > 70) * 0.4,
    dk: 0.2 + sueno / 170 + dread * 0.3,
    wp: M.max(0, (sueno - 85) / 15),
  });
}
function renderCam(r) {
  const p = E.pitcher;
  // FNAF-style slow pan: drift to one side, hold, drift back
  const ph = (now * 0.12 + r * 0.37) % 2;
  rC.x = -(CAMW - W) * clamp(((ph < 1 ? ph : 2 - ph) - 0.15) / 0.7, 0, 1);
  bgImg.setTexture('room' + r);
  dynG.clear(); emG.clear();
  for (const o of [projTxt, askTxt, lensImg, zR, ...Object.values(eImg)]) o.setVisible(false);
  const pts = (a) => a.map((q) => ({ x: q[0], y: q[1] }));
  // your doors as seen from this room, rolling down (the pitch room looks away from it)
  for (const d of ADOOR) if (r == CDOOR[d].adj && d != 'N' && doorP[d] > 0.02) {
    const q = doorPts(CDOOR[d].ad), f = doorP[d];
    dynG.fillStyle(0x5a5f66).fillPoints(pts([q[3], q[2], [q[2][0], q[2][1] + (q[1][1] - q[2][1]) * f], [q[3][0], q[3][1] + (q[0][1] - q[3][1]) * f]]), true);
  }
  // the coder's outlet blinks while he is plugged in
  if (plug == r) {
    const b = P(745, 470, 30);
    emG.fillStyle(tick(4) ? 0x44ff66 : 0x117722).fillRect(b[0] - 5, b[1] - 5, 10, 10);
  }
  if (r == 1) {
    // the projector screen
    const q = p.st != 'PITCH', [tx, ty] = P(400, 96, 172);
    dynG.fillStyle(q ? 0xffffff : 0xf4f1e0).fillPoints(pts([P(240, 96, 126), P(560, 96, 126), P(560, 96, 206), P(240, 96, 206)]), true);
    projTxt.setVisible(true).setPosition(tx, ty).setText(q ? '¿PREGUNTAS?' : 'DIAPOSITIVA ' + p.slide).setColor(q ? '#c00' : '#222');
  }
  // people in the shot, far to near
  const order = [];
  for (const k in E) {
    const e = E[k], im = eImg[k];
    if (e.r != r || blindDoor(e)) continue;
    const [sx, sy, s] = P(e.x, e.y), sc = 3.3 * s, sh = e.shake ? (M.random() - 0.5) * e.shake * 7 * s : 0, lying = k == 'sleeper' && e.st == 'SLEEP';
    im.setVisible(true).setTexture(frameOf(e)).setScale(sc).setFlipX(e.fx < 0).setRotation(lying ? -PI / 2 : 0).setOrigin(0.5, lying ? 0.5 : 1).setPosition(sx + sh, sy - (lying ? 10 * sc : 0));
    im.setTint((k == 'mentora' && !mentoraOn) || (k == 'chef' && !cookOn) || (k == 'coder' && !coderOn) ? 0x888888 : 0xffffff);
    im.depth = e.y; im.hx = sx; im.hy = sy - (lying ? 14 : 30) * sc; im.sc = sc;
    order.push(im);
  }
  // the mentora walking up to the lens: her face grows until it fills the screen
  const mm = E.mentora;
  if (mm.st == 'LENS' && mm.r == r) {
    eImg.mentora.setVisible(false);
    const k = clamp(mm.lt / LENS_T, 0, 1), [sx, sy, s] = P(400, 300);
    lensImg.setVisible(true).setTexture(frameOf(mm)).setScale(lerp(3.3 * s, 30, k * k)).setPosition(lerp(sx, W / 2 - rC.x, k) + (M.random() - 0.5) * k * 10, lerp(sy - lensImg.height * 2.6 * s, H * 0.3, k) + (M.random() - 0.5) * k * 10);
    order.push(lensImg); lensImg.depth = 1e4;
  }
  order.sort((a, b) => a.depth - b.depth).forEach((im) => rC.bringToTop(im));
  rC.bringToTop(emG); rC.bringToTop(projTxt);
  const pi = eImg.pitcher, ci = eImg.coder;
  if (ci.visible) emG.fillStyle(0x45ff7a, 0.18).fillCircle(ci.hx + 3 * ci.sc, ci.hy + 20 * ci.sc, 9 * ci.sc); // laptop glow
  if (pitchOn && p.st == 'PITCH' && p.bar < 0.35 && pi.visible) {
    // speech bubble: he wants the next slide
    const kk = 1 - p.bar / 0.35, bx = pi.hx + 140 + (M.random() - 0.5) * kk * 8, by = pi.hy - 40;
    dynG.fillStyle(0xffffff).fillRoundedRect(bx - 110, by - 22, 220, 34, 8).fillTriangle(bx - 100, by + 12, bx - 80, by + 12, bx - 112, by + 26);
    rC.bringToTop(dynG);
    askTxt.setVisible(true).setPosition(bx, by - 5).setText(kk > 0.6 ? '¡¡SIGUIENTE!!' : '¿SIGUIENTE DIAPOSITIVA?').setColor(kk > 0.6 ? '#c00' : '#111').setScale(1 + kk * 0.25);
    rC.bringToTop(askTxt);
  }
  const si = eImg.sleeper;
  if (si.visible) rC.bringToTop(zzz(zR, E.sleeper, si.hx, si.hy, si.sc / 2.6));
}
// floating z's over the sleeper (red !! when he is angry)
function zzz(t, s, x, y, k) {
  const a = s.st == 'ANGRY', b = (now * 0.8) % 1;
  return t.setVisible(true).setText(a ? '!!' : s.st == 'SLEEP' ? 'z Z' : 'z').setColor(a ? '#ff4040' : '#9fd8ff').setPosition(x + (6 + b * 8) * k, y - b * 22 * k).setAlpha(1 - b).setScale(k);
}
const pulse = () => 0.35 + M.sin(now * 6) * 0.2;
function renderOffice() {
  const fl = flick > 0 || blackout;
  oC.x = -pan;
  oG.clear(); oDim.clear(); oTop.clear();
  for (const d of ADOOR) {
    const [x, y, w, h] = ODOOR[d], q = doorP[d];
    if (light && focus == d && !doorClosed(d)) oG.fillStyle(0xfff0b0, 0.22).fillRect(x, y, w, h).fillStyle(0x4a463c, 0.5).fillRect(x, y + h - 60, w, 60);
    if (q != null) oDoors[d].setVisible(q > 0.01).setCrop(0, h * (1 - q), 180, h).setY(y - h * (1 - q)); // rolls down
  }
  zO.setVisible(false);
  for (const k in E) {
    const e = E[k], im = oImg[k], bd = blindDoor(e);
    let sx, sy, sc, tint = 0xffffff;
    im.setVisible(false);
    if ((k == 'mentora' && !mentoraOn) || e.st == 'DOOM') continue;
    const out = k == 'coder' && e.st == 'HUNT' && e.huntT > 3; // his glowing face in the dark
    if (out || (bd && !doorClosed(bd) && seen(e) == 2)) {
      // only your door light reveals who is standing there
      const [x, y, w, h] = ODOOR[out ? 'W' : bd];
      sx = x + w / 2 + (e.x - 400) * 0.05; sy = y + h - 6; sc = 3.6;
      if (out) tint = M.random() < 0.2 ? 0x1a4028 : 0x3aa060;
    } else continue;
    im.setVisible(true).setTexture(frameOf(e)).setScale(sc).setPosition(sx + (e.shake ? (M.random() - 0.5) * e.shake * 10 : 0), sy).setFlipX(e.fx < 0).setTint(tint).setRotation(k == 'sleeper' && e.st == 'SLEEP' ? -PI / 2 : 0);
    const top = sy - 24 * sc;
    if (k == 'coder') oG.fillStyle(0x45ff7a, 0.18 + (e.st == 'HUNT' ? M.random() * 0.15 : 0)).fillCircle(sx, top + 10 * sc, 9 * sc); // glasses glow
    if (k == 'sleeper') zzz(zO, e, sx, top, sc / 2.6);
  }
  // props drawn on top: door buttons, phone LED, coffee maker, lamp
  for (const d of ADOOR) {
    const [bx, by] = OPANEL[d], [x, y, w, h] = ODOOR[d];
    if (d != 'N') oTop.fillStyle(blackout ? 0x220000 : doors[d] ? 0xff2a2a : 0x5a1010).fillCircle(bx + 20, by + 26, 11); // the hallway has no door button
    oTop.fillStyle(blackout ? 0x111111 : light && focus == d ? 0xffffee : 0x4a4a44).fillCircle(bx + 20, by + 70, 11);
    if (focus == d) oTop.lineStyle(2, 0xffd400, pulse()).strokeRect(bx - 6, by - 6, 52, 108).strokeRect(x - 4, y - 4, w + 8, h + 8);
  }
  if (callOn() && tick(3)) oTop.fillStyle(0x33ff55).fillRect(842, 438, 8, 8);
  // coffee maker: LED (red = brewing, green = ready), the cup filling up, steam when ready
  const fill = cof == 1 ? 1 - cofT / BREW : cof / 2;
  oTop.fillStyle([0x331111, 0xff3322, 0x33ff55][cof]).fillRect(COFFEE_X + 16, 412, 6, 6);
  if (drink <= 0) oTop.fillStyle(0xe8e2c8).fillRect(COFFEE_X - 12, 448, 24, 22).fillStyle(0x5a3416).fillRect(COFFEE_X - 10, 468 - 18 * fill, 20, 18 * fill);
  if (cof == 1) oTop.fillRect(COFFEE_X - 1, 446, 2, 20 - 18 * fill);
  if (cof > 1) for (let i = 0; i < 3; i++) oTop.fillStyle(0xdddddd, 0.3).fillCircle(COFFEE_X + M.sin(now * 3 + i) * 6, 440 - ((now * 30 + i * 12) % 40), 5);
  if (focus == 'C') oTop.lineStyle(2, 0xffd400, pulse()).strokeRect(COFFEE_X - 36, 396, 72, 80);
  oBeam.setVisible(!!light);
  if (light) {
    const [x, y, w, h] = ODOOR[focus], tx = x + w / 2, ty = y + h * 0.6;
    oBeam.setPosition(PCX, 570).setRotation(M.atan2(ty - 570, tx - PCX)).setScale(dist(PCX, 570, tx, ty) / 230, 1).setAlpha(0.22 + M.random() * 0.04);
  }
  const sw = M.sin(now * 0.9) * 0.12;
  oLamp.setRotation(PI / 2 + sw).setAlpha(fl ? 0.02 : 0.14 + M.random() * 0.01).setPosition(PCX + sw * 60, 40);
  oDim.fillStyle(0, blackout ? 0.85 : fl ? 0.6 : 0.26).fillRect(0, 0, PW, H).fillStyle(0, 0.35).fillRect(0, 0, 120, H).fillRect(PW - 120, 0, 120, H);
  oC.bringToTop(oDim);
  // only what your light shows (or the coder's glow in the dark) is drawn over the darkness
  for (const k in oImg) if (oImg[k].visible && (oImg[k].tintTopLeft == 0xffffff || (k == 'coder' && blackout))) oC.bringToTop(oImg[k]);
  oC.bringToTop(oBeam);
  oC.bringToTop(zO);
}

// ---- HUD ----
function hideHud() {
  uHud.setVisible(false); uG.clear(); uStat.setAlpha(0);
  uLid.height = uLid2.height = 0;
  uScr.setVisible(false); uScrT.setText('');
}
function prompt(i, x, y, s, col, a) { uPr[i].setVisible(true).setText(s).setPosition(clamp(x, 80, 720), clamp(y, 20, 560)).setColor(col || '#fff').setAlpha(a ?? 1); }
function renderHud(dt) {
  const gr = uG, p = E.pitcher, office = view == 'office', cm = !office && va >= 1;
  gr.clear();
  uPr.forEach((t) => t.setVisible(false));
  uHour.setText((hourOf(now) || 12) + ' AM').setVisible(!cm);
  uNight.setText('NOCHE ' + night).setVisible(!cm);
  uPow.setText(blackout ? 'SIN ENERGÍA' : 'ENERGÍA ' + M.ceil(power) + '%').setColor(power < 20 ? '#ff5555' : '#fff');
  if (!blackout) { const u = M.min(usage, 5); for (let i = 0; i < 5; i++) gr.fillStyle(i < u ? (i < 2 ? 0x44dd66 : i < 4 ? 0xeecc33 : 0xee4444) : 0x222222).fillRect(668 + i * 22, 46, 18, 12); }
  gr.fillStyle(0x1a1430).fillRect(626, 88, 150, 10).fillStyle(sueno > 70 ? 0xb44dff : 0x7a5cff).fillRect(626, 88, 150 * clamp(sueno / 100, 0, 1), 10);
  uSue.setText(sueno > 70 ? 'SUEÑO ¡¡CAFÉ!!' : 'SUEÑO').setColor(sueno > 70 && M.sin(now * 8) > 0 ? '#ff77ff' : '#c9b6ff');
  uTab.setVisible(!office && va < 1).y = H * (1 - (office ? 0 : va)); // the tablet flipping up
  for (const t of [...uCam, ...uMapT]) t.setVisible(cm);
  if (cm) {
    uCam[0].setText('CAM ' + (camR + 1 - (camR > CTRL)) + ' · ' + RNAME[camR]);
    uCam[1].setAlpha(tick(2));
    uCam[2].setText(clockStr(now));
    gr.lineStyle(2, 0x6fdc8f, 0.7).strokeRect(20, 20, 760, 560);
    for (let i = 0; i < 6; i++) {
      const [c, r] = RC[i], x = 560 + c * 74, y = 372 + r * 44;
      gr.fillStyle(i == camR ? 0x2f8f4f : 0x0c2a16, 0.9).fillRect(x, y, 68, 38).lineStyle(1, 0x6fdc8f).strokeRect(x, y, 68, 38);
      uMapT[i].setPosition(x + 34, y + 19);
      if (E.mentora.st == 'RUSH' && E.mentora.r == i && tick(6)) gr.fillStyle(0xc77dff, 0.9).fillRect(x + 3, y + 3, 8, 8); // she is running through here
      if (i == 1 && pitchOn && p.bar < 0.35 && tick(4)) gr.fillStyle(0xff3344, 0.5).fillRect(x, y, 68, 38); // the pitcher is losing it
    }
    if (camR == 1 && pitchOn) {
      // FNAF2 music box style: a fixed pie timer on the camera UI
      const b = p.st == 'PITCH' ? p.bar : 0, urgent = b < 0.35, cx = 92, cy = 150;
      gr.fillStyle(0, 0.7).fillCircle(cx, cy, 44).fillStyle(0x1d3a26).fillCircle(cx, cy, 36);
      if (b > 0.005) gr.fillStyle(urgent ? (tick(4) ? 0xff3344 : 0xffd400) : 0x6fff8f).beginPath().slice(cx, cy, 36, -PI / 2, -PI / 2 + b * PI * 2).fillPath();
      gr.lineStyle(2, 0x6fdc8f).strokeCircle(cx, cy, 36);
      prompt(0, cx + 110, cy + 66, clicking ? '▶ PASANDO DIAPOSITIVAS...' : 'MANTÉN B1 · PASAR DIAPOSITIVAS', urgent ? '#ffd400' : '#fff', urgent || !learned('slide') ? 1 : 0.6);
    } else if (camR == 2 && plug >= 0) {
      prompt(0, 400, 330, cutH > 0 ? 'CORTANDO...' : 'MANTÉN B1 · CORTAR SU ENCHUFE', '#ff8888');
      gr.fillStyle(0xff8888).fillRect(350, 344, 100 * cutH / 1.2, 5);
    }
  }
  uCamBar.setVisible(office).setAlpha(blackout ? 0.35 : 1);
  // warning sign next to the camera bar when the pitcher is about to lose it
  const mr = E.mentora.st == 'RUSH' && E.mentora.kd; // she is running to that door
  uWarn.setVisible(office && (mr || (pitchOn && p.st == 'PITCH' && p.bar < 0.35))).setAlpha(tick(3) ? 1 : 0.3).setColor(mr ? '#c77dff' : '#ffd400').setPosition(mr ? (mr == 'W' ? 40 : 760) : 560, mr ? 300 : 580);
  if (office && !blackout && drink <= 0) {
    if (CDOOR[focus]) {
      // FNAF-style: the hints live inside the doorway you are looking at
      const [x, y, w, h] = ODOOR[focus], cx = x + w / 2 - pan, closed = doors[focus], a = learned('door') && learned('light') ? 0.55 : 1;
      if (focus != 'N') prompt(0, cx, y + h * 0.35, 'B2 · ' + (closed ? 'ABRIR' : 'CERRAR') + ' PUERTA', closed ? '#ff8888' : '#fff', a);
      if (!closed) prompt(1, cx, y + h * 0.35 + 34, focus == 'N' ? 'SIN PUERTA · B1 LUZ' : 'B1 · LUZ', '#ffe9a0', a);
    } else if (focus == 'C') {
      const cx = COFFEE_X - pan;
      prompt(0, cx, 372, ['MANTÉN B1 · PREPARAR CAFÉ', 'PREPARANDO... ' + M.ceil(cofT), 'B1 · TOMAR CAFÉ'][cof], cof > 1 ? '#7f7' : '#c9b6ff');
      gr.fillStyle(0xc9b6ff).fillRect(cx - 50, 386, 100 * cofHold / 0.6, 5);
    } else if (sueno > 45 || cof > 1) prompt(2, COFFEE_X - pan, 372, cof > 1 ? '☕ LISTO' : '☕ CAFÉ', sueno > 70 ? '#ff77ff' : '#c9b6ff', 0.75);
  }
  // static flickers when someone moves on the camera you are watching
  if (cm && Object.values(E).some((e) => e.r == camR && e.mv && !blindDoor(e))) statA = M.max(statA, 0.16);
  statA = M.max(0, statA - dt * 2.2);
  uStat.setAlpha(clamp(statA * 0.9 + blackout * 0.03, 0, 1)).setTilePosition(rnd(0, 200), rnd(0, 150));
  uMsg.setAlpha(clamp((msgT -= dt) * 2, 0, 1));
  uTh.setVisible(!!thought);
  if (thought) uTh.setText(thought.s).setPosition(400, callOn() ? 452 : 548).setAlpha(clamp(thought.t * 3, 0, 1));
  const c = phone;
  if (uCall.setVisible(callOn()).visible) {
    uCallName.setText(c.i < 0 ? '☎ LLAMADA ENTRANTE...' : '☎ ' + c.nm);
    uCallTxt.setText(c.i < 0 ? '' : c.ln[c.i].slice(0, c.ch | 0));
  }
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
const LOSE = {
  pitcher: ['pitcher', '¡¿PREGUNTAS?!', 'Encandílalo hasta que se vaya.'],
  sleeper: ['sleeper', '¡¿QUÉ HORA ES?!', 'Nunca despiertes a un sonámbulo.'],
  chef: ['chef', '¡A COMER!', 'Revisa la cocina seguido.'],
  coder: ['coder', '¡¿QUIÉN ME CORTÓ LA LUZ?!', 'Cinco minutos más...'],
  mentora: ['mentora', '¡TENGO UN FEEDBACK!', 'No la mires tanto.'],
  sleep: ['sleeper', '¿tú también?', 'TE QUEDASTE DORMIDO'],
};
function lose(why) {
  if (mode != 'play') return;
  lostTo = why; loseT = now; scrOn = 0;
  mode = 'scream'; modeT = 0;
  if (why == 'sleep') { uLid.height = uLid2.height = 310; uLid2.y = H - 310; scrDelay = 1.4; }
  else { view = 'office'; va = 0; scrDelay = 0; rC.setVisible(false); oC.setVisible(true); renderOffice(); } // the tablet drops: it is right there
  uScr.setTexture(LOSE[why][0] + 'H').setVisible(false);
}
function screamUpdate() {
  const t = modeT - scrDelay;
  if (t < 0) { if (FX) { FX.no = 0.02; FX.ab = 0; } return; }
  if (!scrOn) { scrOn = 1; if (AC) { ambG.gain.setTargetAtTime(0, AC.currentTime, 0.02); droneG.gain.setTargetAtTime(0, AC.currentTime, 0.02); } sfxScream(); S.cameras.main.shake(900, 0.03); uiCam.shake(900, 0.02); }
  uScr.setVisible(t < 1.4).setScale(20 + t * 30 + M.random() * 3).setPosition(400 + rnd(-12, 12), 330 + rnd(-12, 12)).setTint(M.random() < 0.3 ? 0xff5555 : 0xffffff).setAngle(rnd(-4, 4));
  uScrT.setText(t < 1.4 ? LOSE[lostTo][1] : '').setPosition(400 + rnd(-6, 6), 520 + rnd(-6, 6));
  uStat.setAlpha(t > 1.4 ? 1 : 0.2).setTilePosition(rnd(0, 200), rnd(0, 150));
  if (FX) Object.assign(FX, { ab: 3, no: 0.4, dk: 0.2, nv: 0 });
  if (t > 2.1) goLose();
}
function goLose() {
  screen('lose');
  sRect(0);
  uLStat = sAdd(S.add.tileSprite(0, 0, W, H, 'noise').setOrigin(0).setAlpha(0.08));
  sText(400, 170, 'PERDISTE', 64, '#d22', 0.5, 0.5, { stroke: '#000', strokeThickness: 6 });
  sText(400, 236, 'Eran las ' + clockStr(loseT) + ' · NOCHE ' + night, 18, '#aaa');
  sAdd(S.add.image(400, 440, LOSE[lostTo][0] + '0').setScale(6).setOrigin(0.5, 1).setTint(0x220000));
  sText(400, 472, LOSE[lostTo][2], 15, '#888', 0.5, 0.5, { fontStyle: 'italic bold' });
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
  if (modeT > 4 && (anyPr() || modeT > 8)) { if (night >= 5) goPaper(1); else goCard(night + 1); }
}
})();
