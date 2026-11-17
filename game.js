// =====================================================================
// 5 NOCHES EN PLATANUS — Platanus Hack 26: Santiago
// La hackathon terminó. Los ganadores vuelan a San Francisco con Rafa y
// Nacho. Tú te quedaste con el turno de noche. No todos se fueron.
//
// You never leave the chair. Cameras are your eyes, the breaker board is
// your budget, doors are your last line.
// =====================================================================

const W = 800, H = 600;
const SAVE_KEY = 'fnap26-progress';
const M = Math, PI = M.PI;
const rnd = (a, b) => a + M.random() * (b - a);
const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
const dist = (ax, ay, bx, by) => M.hypot(ax - bx, ay - by);
const lerp = (a, b, t) => a + (b - a) * t;
const angD = (a, b) => { let d = a - b; while (d > PI) d -= 2 * PI; while (d < -PI) d += 2 * PI; return d; };
const pick = (a) => a[(M.random() * a.length) | 0];
const hex = (c) => '#' + c.toString(16).padStart(6, '0');

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
for (const [code, keys] of Object.entries(CABINET_KEYS)) {
  const act = code.startsWith('START') ? 'S' : code.slice(3);
  for (const k of keys) KEY2ACT[k.length === 1 ? k.toLowerCase() : k] = act;
}
const held = {}, pressed = {};
const hd = (a) => !!held[a];
const pr = (a) => !!pressed[a];
const anyPr = () => pr('1') || pr('2') || pr('3') || pr('4') || pr('5') || pr('6') || pr('S');

// =====================================================================
// SPRITES (PCSEF) — temporary art reused from previous editions
// =====================================================================
const P_PAL=[0x333d8d,0xd3cde7,0x000000,0xf5765d,0x140c81,0x6e2100,0xd11717,0x08b8ea,0xf7bb1b,0xbf921f,0xa41c1c,0x006092,0xff6600,0x254c93,0x019000,0x9f5611,0xffc7ba,0xfefdfe,0x7b768e,0xaba4c1,0x915f01,0x362400,0xdeac92,0xab8169,0x7c6822,0x004d3d,0x5b4d00,0x5e2e00,0xc1b087,0x002e83,0x24222a,0x4e4b5b,0x390800,0x206100,0x7ec43f,0xf6629d];
const SPR={
"Blue Demon":['~9.7A8.9.2A1B5A7.8.3A4B2A7.8.3A2B2C2B7.8.4A1B2C2B7.8.5A4B7.9.3A2B3D7.9.4A3B8.9.1.5A9.7.7A1D1A8.6.2A2D3A2D1A8.5.1A1E3D1F1A4D8.5.1A1E3D2F4D1F7.5.1A1E4D2F3D1F1D6.5.1A1E6D1F2D1F1D6.5.1A2E5D1F2D8.5.1A2E2A3D3A8.5.1A2E9A7.5.1A2E2A2B1.2A2B7.^8.3A1B1.3A1B7.8.4A1.5A6.8.5A9.2.','~~~~~8.7A9.8.2A1B5A8.7.3A4B2A8.7.3A2B2C2B8.7.4A1B2C2B8.7.5A4B8.8.3A2B3D8.7.5A3B9.4.9A1A9.1.2.3A3D4A1D1A9.1.2.2A4D3A3D9.1.1.2A4D1F1A5D9.1.1.2A3D2F6D6.2A2.1.1A1E3D1F7D4.4A2.1.1A1E2D2E2A5D2.3B3A2.1.1A5E9A2B4A2.1.1A3E2.9A6A2.1.1A1E4.9A2A6.8.7A9.','~~9.1.7A7.9.1.2A1B5A6.9.3A4B2A6.9.3A2B2C2B6.9.4A1B2C2B6.9.5A4B6.9.1.3A2B3D6.9.1.4A3B1.4D2.9.1.6A1.6D1.8.6A1D1A1F6D1.7.2A1D2F1A3D1F1D3.2D1.6.1A1E3D2F3D1F7.6.1A1E4D2F2D1F7.6.1A1E6D1F1D8.6.1A2E5D1F1D8.6.1A2E2A3D3A7.6.1A2E7A2B6.6.1A2E2A2B1.2A2B6.6.1A2E2A2B1.3A1B6.8.1E3A1B1.4A6.9.4A1.5A5.9.5A9.1.'],
"La Parka":['~9.3C2G2C8.9.2C1G4B1C7.8.3C1G3B2G7.8.3C1G4B1G7.8.3C1G2B2C1B7.8.3C1G1C3B1C7.8.2C2G3B2C7.8.3G2C3B8.8.2G5C9.9.4C2B1C8.8.1C1B2C>7.1C1B2C5B8.6.2C1B5C1B2C7.6.2C1B2C5B2C6.6.1C1B6C1B3C6.6.1C1B4C4B8.6.1C1B1.5C1B1C8.8.9C7.8.2C1B1C1.2C1B1C7.^8.2C1B1C1.4C7.8.2C1B1C1.5C6.8.5C9.2.','~7.3C2G2C9.1.7.2C1G4B1C9.6.3C1G3B2G9.6.3C1G4B1G9.6.3C1G2B2C1B9.3.2C1.3C1G1C3B1C9.3.1C1B3C2G3B2C9.3.2C1B2C1G2C3B9.1.4.1C2B7C9.1.5.2C2B3C1B2C9.7.1C1B3C1B3C8.8.2C5B1C8.8.4C1B3C8.9.2C4B1C8.9.4C1B2C8.9.1.2C4B8.9.1.3C1B3C7.9.2.7C6.9.2.2C1B3C1B6.9.3.2C1B2C1B1C5.9.3.2C1B4C5.9.3.8C4.9.4.3C8.','~~9.1.3C2G2C7.9.1.2C1G4B1C6.9.3C1G3B2G6.9.3C1G4B1G6.9.3C1G2B2C1B6.9.3C1G1C3B1C6.9.2C2G3B2C6.9.3G2C3B4C3.9.2G7C3B1C2.8.1C1B4C1B1C2B3C1B1C1.7.1C1B2C5B2C2.3C1.7.1C1B5C1B1C8.7.1C2B1C5B8.7.3C1B3C1B1C8.8.4C4B8.9.5C1B1C8.9.9C6.9.2C1B1C1.2C1B1C6.^9.2C1B1C1.4C6.9.2C1B1C1.5C5.9.5C9.1.'],
"KeMonito":['~~~~~~~9.1.5H9.9.1.6H8.9.3H4I8.9.3H1I2C1I8.9.3H3I1C8.9.4H1I2J8.9.4H3I1.2K5.9.3H2K2H3L5.9.1H2L1H1L2I2L6.9.4H1L2I8.9.4L3I8.9.5H2I8.^9.1.1L5H8.9.2L2H1.1L1H8.9.1L2H2.1L1H8.9.3K2.2K8.','~~~~~~~~~~~~~~9.5.5H5.9.4.7H4.9.7H4I4.7.1H1L7H1I2C1I4.6.1H1L8H3I1C4.3.1K3H1L5H2L2H1I2J4.3.1K3L2H3I3H2L3I4.3.1K5H4I3H3L5.3.1K5H3I2.1L4H1K4.3.1K2H9.2L1H2K4.','~~~~~9.2.5H8.9.2.6H7.9.1.3H4I7.9.1.3H1I2C1I7.9.1.3H3I1C1.2L1K3.9.1.4H1I2J3L1K3.9.1.4H3I2L5.9.3H2K2H2L6.9.1H2L1H1L2I1L7.9.4H1L2I8.9.4L3I8.9.5H2I8.^9.1.1L5H8.9.2L2H1.1L1H8.9.1L2H2.1L1H8.9.3K2.2K8.~~'],
"Psycho Clown":['9.3.1M9.2.9.2.1M>9.2.3M9.1.9.1.1B3M1B9.9.2B1N1B1N2B8.8.3B3N2B8.8.2B2N1C2N1B8.8.2B2N2C1N2G7.8.2B4N1B1C8.8.3B1N1B1N1C1G8.8.3B1N1B1C2G8.8.1C5B1F2G7.8.5C2D1C1G7.7.3D1C2D1C1D1C8.7.3D1N2D3C1D7.8.2D1N5C1D1N6.9.7C2N6.9.7N2D6.9.8N7.8.4N1.4N7.8.4N2.2O8.9.2O3.2O8.9.2O3.4G6.9.4G9.2.','~9.3.1M9.2.9.2.1M>9.2.3M9.1.9.1.1B3M1B9.9.2B1N1B1N2B8.9.2B3N2B8.8.2B2N1C2N1B8.8.2B2N2C1N2G7.8.2B4N1B1C8.8.3B1N1B1N1C1G8.8.3B1N1B1C2G8.9.5B1.2G7.8.2D2C2D2.1G7.5.5D2C2D9.1.4.5D4C1D9.1.3.4D1F6C9.1.3.3N2F5C7.2G2.3.3D1F7C6.2G2.3.2D2.2N5C2.1N3O2G2.7.9N1N3O2G2.7.9N1N1O6.7.5N>8.7N9.','9.5.1M9.9.4.2M9.9.4.3M8.9.3.1B3M1B7.9.2.2B1N1B1N2B6.9.1.3B3N2B6.9.1.2B2N1C2N1B6.9.1.2B2N2C1N2G5.9.1.2B4N1B1C6.9.1.3B1N1B1N1C1G3D1N2.9.1.3B1N1B1C2G2D2N1D1.9.1.1C5B3G1D1N2D1.9.1D5C2D1C1G2.2D1.8.3D5C1D7.8.4D5C7.9.2D2N1D3C7.9.1.2N2D3C7.9.1.1N3D3N7.9.1.8N6.9.4N1.4N6.^9.1.2O3.2O7.9.1.2O3.4G5.9.1.2G>'],
"Platanus":['9.2.1C>9.1.2J2I9.1.9.1.1J4I9.9.2J4I9.9.1J2I3P9.8.2J1I4Q9.8.1J2I1Q1C1Q1C9.8.1J2I4Q9.^8.1J2I3J9.1.8.1J5I1C9.7.1C1J5I1C9.6.2C1J5I2C8.5.3C1J5I2C8.5.2C1.1J5I2C1Q7.5.2C1.1J5I1.1C1Q7.5.2C1.2J4I9.1.5.2C1.1C1J4I9.1.5.2Q1.1C1J4I9.1.8.2C1J4I9.8.2C2J3I9.8.2C1.2J3I8.8.2C2.4J1I7.7.3C2.2C9.1.','~~~~~~9.4.2Q9.1C7.2Q2.3C9.1C7.2C1.3C9.1.1C1.1J5.2C1.2C9.2.2C1I1J4.2C1.2C9.2.2C2I1J3.3C1.2C9.1.1.3I3J2.2C1.2C9.1.1C5I6J2C5J5.1C9I2I2C4I3J3.2.9I1I2C6I3J1.3.9I2I1J4Q3I1J1C4.9I1I1J2Q1C1Q1P3I1C6.8I1J4Q1P3I1.9.6.2Q1C1Q1P2I2.~~~~','~~9.7.4J1C3.9.5.3J3I1C3.9.4.2J4I5.9.3.2J4I6.9.2.1J3I3P6.9.2.1J2I1Q1C1Q1C6.9.1.1J2I4Q7.9.1J3I3J8.9.1J6I8.9.1C5I9.8.2C5I9.^7.2C1J5I9.6.3C1J5I9.6.2C1.2J4I9.6.2Q1.1C1J4I9.6.1Q2.1C1J4I9.9.2C1J4I8.9.2C2J3I8.9.2C1.2J3I7.9.2C2.4J1I6.9.3C1.3C8.'],
"El Santo":['~9.7R8.9.8R7.8.4R4B1R7.8.4R1B1C2B1R7.8.4R1B2C2B7.8.4R5B7.9.3R2B3D7.9.4R3B8.9.1.5R9.7.1B4D1R2D1R8.6.1B4D2R2D1R1D7.5.1B4D2R4D1F1D6.5.4D2R5D1F2D5.4.4D1F7D1F2D5.4.4D1F6D2F1D6.5.4D1F5R3D6.5.1B1S3D1F4R2D7.5.1B1S3D7R7.5.1B2S2R2S1.2R2S7.^5.1B2S3R1S1.3R1S7.8.4R1.5R6.8.5R9.2.','~~~~~8.7R9.8.4R>7.4R4B1R8.7.4R1B1C2B1R8.7.4R1B2C1B1R8.7.4R5B8.8.4R1B3D8.7.1T4R3B9.4.3B1T2D1R3D9.1.2.3B4D2R3D9.1.2.2B4D2R4D9.1.1.2B4D1F6D9.1.1.2B3D2F6D6.2R2.1.1B1S3D1F7D4.4R2.1.1B1S2D2S2R5D2.3S3R2.1.1B5S9R2S4R2.1.1B3S2.9R6R2.1.1B1S4.9R2R6.8.7R9.','~~9.1.7R7.9.1.8R6.9.4R3B2R6.9.4R1B1C2B1R6.9.4R1B2C1B1R6.9.4R5B6.9.1.3R2B3D6.9.1.4R3B1.4D2.9.2B5R1.6D1.8.2B3D1R1D1R1F6D1.7.2B1D2F1R3D1F1D3.2D1.6.1B1S3D2F3D1F7.6.1B1S4D2F2D1F7.6.1B1S6D1F1D8.6.1B2S5D1F1D8.6.1B2S2R3D3R7.6.1B2S7R2S6.6.1B2S2R2S1.2R2S6.6.1B2S2R2S1.3R1S6.8.1S3R1S1.4R6.9.4R1.5R5.9.5R9.1.'],
"Cumbiambera":['9.1.1I9.4.9.1I1U1I3V9.8.2A1I5V8.8.1A1I1A2V3W8.8.1G1A2V2W1C1W8.7.1G1I1G2X2W1C1W8.8.1G2V1I4W8.9.1.1V1X3W9.9.2.1X1W1G9.1.9.1.3G2R9.9.1W5R1W8.8.2W5R2W7.7.2W1.2T4R2W6.6.2W9R3W4.5.4I4R2I3A2W4.4.1R3A6I2A2G1R5.4.2R2G6A2G3R5.4.1T2R7G3R2I1R4.5.1T9R3I1A1G1R3.6.4T1X3R2I2A2G1R3.9.3X1.2R2A2G2R3.8.3W3.5R5.7.2W5.1W1X8.7.3W2.>','8.1I9.6.7.1I1U1I9.5.6.2A1I4V9.2.6.1A1I1A5V9.1.6.1G1A2V4W9.1.5.1G1I1G1V1W1C1W1C1W9.1.6.1G2V1W1C1W1C1W9.1.8.1I5W1I9.9.1.3W6.2W3.2.2W5.1G3X1G3.3W1R3.2.1R4W3R3G3R3W1I1R3.2.1R1I1.3W7R3W1.1I1R3.1.1R1G1A1I3.2T3R2T3.1R1I1A1R2.1.1R1G1A1I2R2.5T3.1R2I1A1R2.1.1R1G2A1I9R3R1I2A1R2.1.1R2G2A1I9R2I2A1G1R2.1.2R1G2A2I7R2I2A1G2R2.2.2R1G2A3I3R3I2A1G2R3.3.1R2G3A5I3A2G1R4.3.2R3G7A3G1R5.4.3R9G2R6.6.9R1R8.9.2W1.2W9.1.8.3W1.3W9.','8.1I9.6.7.1I1U1I3V9.2.6.2A1I5V9.1.6.1A1I1A2V3W9.1.6.1G1A2V2W1C1W9.1.5.1G1I1G2X2W1C1W9.1.6.1G2V1I4W4.2W4.8.1V1X3W4.3W1R3.9.1X1W1G4.2W1I1A1G1R2.6.2R3G2R2.2W1.1I1A1G1R2.5.8R3W2.1I1A1G1R2.5.3W5R2W3.1I1A1G1R2.4.2W2.4T2R3.2I1A1G1R2.4.2W3.1T5R1.2I1A1G2R2.3.1I3W8R2I1A1G1R4.2.1R2A3I6R2I1A2G1R4.2.1R2G2A2I4R2I1A2G1R5.2.2R2G2A6I2A1G1R6.3.2R2G7A2G1R7.4.3R8G2R7.5.9R1R9.7.2W3.2W9.1.7.2W3.1W1X9.1.7.3W2.3W9.','~~8.1I9.6.7.1I1U1I9.5.6.2A1I4V9.2.6.1A1I1A5V9.1.6.1G1A2V4W9.1.5.1G1I1G1V1W1C1W1C1W9.1.6.1G2V1W1C1W1C1W9.1.8.1I5W1I9.9.1G3W1G9.1.7.2R5G2R4W4.6.9R1R6W2.6.1X2W4R1T5.1I3W1.7.3W3T5R1I2A1R2.5.1A1I1R3W5R2I2A1G1R2.4.2A2I1R3W3R2I2A1G2R2.3.1R1G2A3I2X1R3I2A1G2R3.3.1R2G3A5I3A2G1R4.3.2R3G7A3G1R5.4.3R9G2R6.5.1W9R1R8.4.4W4.2W9.1.3.3W6.3W9.'],
"Rolo con ruana":['9.1.2C>9.1C2V>^7.5C>7.5V>9.2V1X1C1X1C9.9.1V5X9.9.1.2X2R1X9.9.2.1X>9.1Y1Z3U1Z2Y7.8.2Y2Z1U2Z2Y1a6.7.2a2Y1Z1U1Z2Y2a6.7.2a2Y1Z1U1Z1Y1a1b1c6.6.2c2a1Y2Z3b2c6.6.3c1a2Y1Z2X2c7.5.2X1c1.2a1Y1Z2X1c8.4.1G2X2.2a1Y1Z2Y1a8.3.1G1d1I3.2a1Y1Z2Y1a8.3.1G1d1I3.2a1Y2e1Y1a8.4.1d4.2a1e2f1e1a8.9.1.1e1f1e2f9.9.1.3f1e2f8.9.1.3f1.2f8.9.1.2g3.3g6.','~9.1.2C>9.1C2V>3.2I4.1C4V1C9.2.2d2I1.9C1C7.1.3G2X1.9V1V7.4.1X1c3.2V1X1C1X1C9.5.2c2.1V5X9.5.2c3.2X2R1X9.6.3c1Y1Z2X1U1Z2Y7.7.1c1Y2Z2U2Z2Y1a1.2c2X1.7.2a1Z2U2Z2Y1a4c2X1.7.1Y1a4Z2Y2a2c5.6.2Y1a3Z3Y1a8.5.2Y1a3Z3Y2f8.4.3Y1a1Z2a1Y1a4f4.1g2.5.1Y2a1Z1a9f1.2g2.6.1a2Z1a5f1e1.3f2g2.7.1Z2a3f2e1f2.2f2g2.9.2a2.3f8.9.5.2f8.^9.5.2g8.9.5.4g6.','9.1.5C9.9.1C5V1C8.2.2G5.1C5V1C8.1.3d1G3.9C1C6.1.1d1I2X3.9V1V3.2X1.2.1I2X1c3.1V1X1C1X1C1X1V4.2X2.4.2c3.1V5X1V4.2c2.5.2c1Y2.1X2R2X4.2c3.5.2c3Y1.2X3.2Y3c3.6.2a2Y1Z3U1Z3Y2c4.7.1a2Y2Z1U2Z2Y1a6.7.2a2Y1Z1U1Z2Y2a6.8.1a2Y1Z1U1Z1Y3a6.8.2a1Y3Z1Y3a6.8.2a2Y1Z2Y2a7.8.3a1Y1Z2Y1a8.7.4a1Y1Z2Y1a8.6.5a1Y1Z2Y2a7.6.5a1Y1Z2Y3a6.5.6a1Y1Z2Y3a6.5.1a2.5e2f2e1a6.7.3f3a1e3f7.7.3f2.>6.4g5.3g6.'],
"La Palenquera":['8.2h4.1h2.1h6.9.1h1J1I1J3K2i6.8.1h1.1I1J1I1J3K2M1h4.9.1.1J1I1J1I3K3M4.9.1.9X5.9.2.7X6.9.3.5G7.9.2.1G1I5G6.9.1.1G1I1A1G1b2P1G6.9.1.1G1I1A1b4P6.9.2.1I1A1b1C2P1C6.9.2.2A2P2K1P6.9.3.1b5P6.9.1.2I1.2P2.2I5.9.1P2A6I1A1P4.7.3P2G6A3P3.6.3P3.5G2.2P3.4.3P5.5I2.2P3.3.1R2G6.5I1.3P3.4.1R3G2A8I2P4.4.2R3G2A1I5A1I1A5.5.2R3G1A1I5A1I2G4.6.2R4G5I2G1R4.5.2P3R8G1R5.4.4P1.9R6.4.2P9.2P7.5.1P9.2P7.9.6.3P6.','~~~8.2h4.1h2.1h6.9.1h1J1I1J3K2i6.8.1h1.1I1J1I1J3K2M1h4.9.1.1J1I1J1I3K3M4.9.1.9X5.9.2.7X6.9.3.5G7.9.2.1G1I5G6.9.1.1G1I1A1G1b2P1G6.9.1.1G1I1A1b4P4.1h1.9.2.1I1A1b1C2P1C3.3K9.2.2A2P2K1P3.3K9.3.1b5P4.2P4.2G2.2P2I1.2P2.2I2.2P1.3.1R1G1.4P2A6I1A1P1.2P1.3.1R1G3P2.2G6A5P1.3.1R2G6.5G2.3P2.3.1R2G6.5I7.4.1R2G3A8I6.4.2R2G3A1I5A1I1A5.5.2R3G1A1I5A1I2G4.6.2R4G5I2G1R4.7.3R8G1R1P4.9.9R3P3.9.1.3P6.3P2.','5.2h4.1h2.1h9.6.1h1J1I1J3K2i9.5.1h1.1I1J1I1J3K2M1h7.7.1J1I1J1I3K3M7.7.9X8.8.7X9.9.5G9.1.8.1G1I3G1I9.1.7.1G2I1b3P1I9.7.1G1I1b4P1I9.8.1I1P1C2P1C9.1.8.1A2P2K1P9.1.9.1b4P9.1.7.2I1.2P2.2I8.1.1P2.3P2A6I1A2P6.1.6P2G6A6P3.1R2G1I5.5G5.3P2.1R1G2A2I3.1J5I6.1I2.1R2G2A2I3J9I2A1G2.1.1R2G2A9I1I4A1G1R2.1.2R2G3A1I5A1I3A2G2R2.2.2R2G2A1I5A1I2A2G2R3.3.2R4G5I3G3R4.4.3R8G3R6.6.9R1R8.8.2P2.2P9.1.7.3P2.2P9.1.7.3P2.3P9.'],
"Marimonda":['7.7H1.3A6.5.1A3j1H3j1H5A5.4.2A1j2e1i2e1j1H5A5.3.3A1j2e1i2e1j1H5A5.3.3A3j1i3j1H5A5.3.4A2H1i4H5A5.4.3A1H1I1i3I1H4A6.7.1H1U1i3U1H9.1.8.1H1i3H9.2.7.1R1M1i2A2M2R8.6.2R1M3A2M3R7.5.3R1M1R1A1R2M3R7.4.3R1.1M2X6R7.4.2R2.1M2X5T8.4.1R2X1.1M1R1A1R2M9.1.5.2X1.1I3R2I9.1.8.2I1M1I1M1I9.1.8.1M5I9.1.9.1M1I1M1I2P1I2i6.9.1.2I2P1M1I2i6.9.1.2I5.1i6.9.1I1M9.4.9.2i9.4.8.3i9.4.','~~~5.3A9.3A4.4.5A7H5A3.^4.5A3j1H3j5A3.4.5A1j2e1i2e1j5A3.^5.4A3j1i3j4A4.9.1H2I1i2I1H8.9.1H2U1i2U1H8.6.3R1M2H1i2H1M3R5.5.4R2M1A1i1A2M4R4.4.3R2.2M1R1A1R2M2.3R3.4.2R3.2M1R1A1R2M3.2R3.4.2X3.2M1R1A1R2M3.2X3.4.2X2.2I1M1R1A1R1M2I2.2X3.6.1I1M4I1R2I1M3I1M4.6.3I1M1I1M1I1M3I1M2I4.6.1M2I8.1I1M5.6.2I1M8.1M1I5.7.2i8.2i5.6.3i8.3i4.','4.3A1.7H1.3A5.3.5A3j1H3j5A4.3.5A1j2e1i2e1j5A4.^3.5A3j1i3j5A1.2X1.3.5A3H1i3H5A1.2X1.4.4A1H2I1i2I1H4A2.2R1.8.1H2U1i2U1H4.3R2.9.2H1i2H3.5R2.8.2M1A1i1A2M5R4.7.1R2M3A2M4R5.5.3R2M1R1A1R2M9.4.3R1.2M1R1A1R2M9.3.3R2.2M1R1A1R2M9.3.2R3.2M1R1A1R1M1I1M8.2.3R4.1I2R2I1M1I8.1.2X1R5.1I1M1I1M3I1M7.1.2X5.1M2I3.1M2I7.8.1I1M4.1I1M8.8.2I4.1M1I8.8.1M2I3.2i8.8.2I1M3.3i7.9.2i9.4.8.3i9.4.','6.3A1.7H2A5.5.5A1H3j1H3j2A4.5.5A1H1j2e1i2e1j2A4.^5.5A1H3j1i3j2A4.5.5A4H1i2H3A4.6.4A1H3I1i1I1H2A5.9.1.1H3U1i1U1H7.9.2.3H1i1H8.8.2R2M2A1i1M1R7.7.3R2M3A1M1R7.7.2R1.2M1R1A1R1M1R7.^7.2R1.2M1R1A1R1M2R6.7.3R1X1M1R1A1R1M2R1X5.8.1R2X1I3R1I1.2X5.9.1.1I1M1I1M2I8.6.1i1M1I1.5I1M8.6.1i3I1M1I1M1I1M1I8.6.2i1M2I1M1I1.3I7.6.1i2.1I1M2I2.1M1I7.9.6.1I1M7.9.6.2i7.9.6.3i6.'],
};
const CH = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%&*()_+-=[]{};:,/<?`"';
const CLR = {};
for (let i = 0; i < P_PAL.length; i++) CLR[CH[i]] = P_PAL[i];
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
// Cast -> borrowed sprite (placeholders until the real art exists)
const CAST = {
  guard: 'Blue Demon', pitcher: 'Cumbiambera', sleeper: 'KeMonito', mentora: 'La Palenquera',
  chef: 'Psycho Clown', coder: 'La Parka', suit: 'Platanus', ghost: 'Marimonda',
  rafa: 'Rolo con ruana', nacho: 'El Santo',
};
const ROLES = ['pitcher', 'sleeper', 'mentora', 'chef', 'coder'];

// =====================================================================
// AUDIO (pure WebAudio synthesis)
// =====================================================================
let AC = null, master, muffle, noiseBuf, ambG, droneG, droneF;
function initAudio() {
  if (AC) { if (AC.state !== 'running') AC.resume(); return; }
  try { AC = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { return; }
  const comp = AC.createDynamicsCompressor();
  comp.threshold.value = -16; comp.ratio.value = 5;
  comp.connect(AC.destination);
  muffle = AC.createBiquadFilter(); muffle.type = 'lowpass'; muffle.frequency.value = 9000;
  muffle.connect(comp);
  master = AC.createGain(); master.gain.value = 0.8; master.connect(muffle);
  const len = AC.sampleRate * 2;
  noiseBuf = AC.createBuffer(1, len, AC.sampleRate);
  const d = noiseBuf.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = M.random() * 2 - 1;
  // Ambience: fluorescent hum + room tone
  ambG = AC.createGain(); ambG.gain.value = 0; ambG.connect(master);
  const hum = AC.createOscillator(); hum.type = 'sawtooth'; hum.frequency.value = 50;
  const hf = AC.createBiquadFilter(); hf.type = 'lowpass'; hf.frequency.value = 180;
  const hg = AC.createGain(); hg.gain.value = 0.05;
  hum.connect(hf); hf.connect(hg); hg.connect(ambG); hum.start();
  const rn = AC.createBufferSource(); rn.buffer = noiseBuf; rn.loop = true;
  const rf = AC.createBiquadFilter(); rf.type = 'lowpass'; rf.frequency.value = 400;
  const rg = AC.createGain(); rg.gain.value = 0.05;
  rn.connect(rf); rf.connect(rg); rg.connect(ambG); rn.start();
  // Dread drone: detuned saws that open up as danger grows
  droneG = AC.createGain(); droneG.gain.value = 0; droneF = AC.createBiquadFilter(); droneF.type = 'lowpass'; droneF.frequency.value = 120;
  droneF.connect(droneG); droneG.connect(master);
  for (const f of [41, 41.6, 61.7]) { const o = AC.createOscillator(); o.type = 'sawtooth'; o.frequency.value = f; o.connect(droneF); o.start(); }
}
function out(pan) {
  const g = AC.createGain(); g.gain.value = 0;
  if (AC.createStereoPanner) { const p = AC.createStereoPanner(); p.pan.value = clamp(pan || 0, -1, 1); g.connect(p); p.connect(master); }
  else g.connect(master);
  return g;
}
// tone(freq, dur, type, vol, pan, freqEnd, delay)
function tone(f, dur, type, vol, pan, f2, dl) {
  if (!AC || vol <= 0.002) return;
  const t = AC.currentTime + (dl || 0);
  const o = AC.createOscillator(); o.type = type || 'square';
  o.frequency.setValueAtTime(f, t);
  if (f2) o.frequency.exponentialRampToValueAtTime(M.max(20, f2), t + dur);
  const g = out(pan);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + 0.008);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g); o.start(t); o.stop(t + dur + 0.02);
}
// noise(dur, vol, filterType, freq, pan, freqEnd, delay, q)
function noise(dur, vol, ft, f, pan, f2, dl, q) {
  if (!AC || vol <= 0.002) return;
  const t = AC.currentTime + (dl || 0);
  const s = AC.createBufferSource(); s.buffer = noiseBuf;
  s.playbackRate.value = rnd(0.8, 1.2);
  const fl = AC.createBiquadFilter(); fl.type = ft || 'lowpass'; fl.frequency.setValueAtTime(f || 1000, t);
  if (q) fl.Q.value = q;
  if (f2) fl.frequency.exponentialRampToValueAtTime(f2, t + dur);
  const g = out(pan);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  s.connect(fl); fl.connect(g); s.start(t, rnd(0, 1.5)); s.stop(t + dur + 0.05);
}
const SFX = {
  step: (v, p, dl) => { noise(0.07, 0.09 * v, 'lowpass', 300, p, 0, dl); tone(70, 0.06, 'sine', 0.06 * v, p, 0, dl); },
  blip: (v, p, f) => tone(f || rnd(260, 520), 0.06, 'square', 0.05 * v, p),
  babble: (v, p, base) => { for (let i = 0; i < 5; i++) if (M.random() < 0.8) tone((base || 300) * rnd(0.8, 1.5), 0.05, 'square', 0.045 * v, p, 0, i * 0.075); },
  snore: (v, p) => { noise(1.1, 0.16 * v, 'bandpass', 220, p, 650, 0, 4); noise(0.9, 0.12 * v, 'bandpass', 600, p, 200, 1.25, 4); },
  murmur: (v, p) => { for (let i = 0; i < 4; i++) tone(rnd(170, 240), 0.14, 'triangle', 0.07 * v, p, 0, i * 0.16); },
  squeak: (v, p) => tone(rnd(1700, 2300), 0.07, 'sine', 0.05 * v, p, rnd(2000, 2600)),
  bell: (v, p) => { tone(1320, 0.8, 'sine', 0.12 * v, p); tone(1980, 0.6, 'sine', 0.06 * v, p); },
  type: (v, p) => { for (let i = 0; i < 4; i++) noise(0.02, 0.12 * v, 'highpass', 3000, p, 0, i * rnd(0.05, 0.11)); },
  door: (p) => { noise(0.25, 0.5, 'lowpass', 500, p); tone(55, 0.3, 'sine', 0.5, p, 35); },
  shutter: (p) => { noise(1.3, 0.25, 'lowpass', 260, p); for (let i = 0; i < 8; i++) noise(0.03, 0.2, 'highpass', 1500, p, 0, i * 0.15); },
  knock: (p) => { for (let i = 0; i < 3; i++) { noise(0.08, 0.4, 'lowpass', 350, p, 0, i * 0.22); tone(90, 0.1, 'sine', 0.3, p, 60, i * 0.22); } },
  cam: () => noise(0.12, 0.18, 'highpass', 1500),
  light: () => tone(120, 0.05, 'square', 0.05),
  click: () => { tone(1800, 0.02, 'square', 0.08); noise(0.02, 0.1, 'highpass', 3000); },
  breaker: (on) => { noise(0.08, 0.5, 'lowpass', 900); tone(on ? 140 : 90, 0.12, 'square', 0.15, 0, on ? 180 : 60); },
  coffee: () => { for (let i = 0; i < 8; i++) noise(0.12, 0.12, 'bandpass', rnd(300, 900), 0.3, 0, i * 0.14, 6); },
  ding: () => tone(880, 0.25, 'sine', 0.12, 0.3),
  applause: (v, p) => { for (let i = 0; i < 26; i++) noise(0.05, 0.12 * v * rnd(0.4, 1), 'bandpass', rnd(1200, 3500), p + rnd(-0.3, 0.3), 0, rnd(0, 1.6), 2); },
  ring: () => { for (let i = 0; i < 2; i++) { tone(440, 0.9, 'sine', 0.07, 0, 0, i * 1.3); tone(480, 0.9, 'sine', 0.07, 0, 0, i * 1.3); } },
  yawn: () => { tone(330, 1.2, 'sawtooth', 0.05, 0, 160); noise(1.2, 0.08, 'bandpass', 500, 0, 250, 0, 2); },
  heart: (v) => { tone(55, 0.12, 'sine', 0.35 * v, 0, 40); tone(50, 0.14, 'sine', 0.25 * v, 0, 38, 0.2); },
  plates: (v, p) => { for (let i = 0; i < 6; i++) tone(rnd(2000, 4000), 0.15, 'triangle', 0.06 * v, p, 0, i * 0.04); },
  eat: () => { for (let i = 0; i < 5; i++) noise(0.06, 0.2, 'bandpass', 500, 0, 0, i * 0.15, 3); },
  zip: () => noise(0.6, 0.2, 'bandpass', 2500, 0, 5000, 0, 8),
  scream: () => {
    noise(1.4, 0.9, 'bandpass', 1500, 0, 700, 0, 0.7);
    tone(90, 1.4, 'sawtooth', 0.5, 0, 45); tone(740, 1.2, 'square', 0.25, 0, 300);
    for (let i = 0; i < 10; i++) tone(rnd(600, 1600), 0.08, 'sawtooth', 0.25, rnd(-1, 1), 0, i * 0.1);
  },
  six: () => { [523, 659, 784, 1046, 784, 1046].forEach((f, i) => tone(f, 0.5, 'triangle', 0.22, 0, 0, i * 0.18)); SFX.applause(1.5, 0); },
  static: (d) => noise(d || 0.5, 0.25, 'highpass', 800),
  stutter: (v, p) => { tone(330, 0.12, 'square', 0.05 * v, p, 300); tone(330, 0.12, 'square', 0.05 * v, p, 300, 0.25); },
  pa: () => { tone(988, 0.2, 'sine', 0.1); tone(784, 0.3, 'sine', 0.1, 0, 0, 0.2); },
  err: () => { tone(200, 0.15, 'square', 0.12); tone(150, 0.2, 'square', 0.12, 0, 0, 0.15); },
  sting: () => { tone(110, 1.6, 'sawtooth', 0.09, 0, 104); tone(116.5, 1.6, 'sawtooth', 0.07, 0, 110); tone(1760, 0.8, 'sine', 0.03, 0, 1700); },
  thud: () => { noise(0.4, 0.5, 'lowpass', 300); tone(60, 0.4, 'sine', 0.5, 0, 40); },
  breath: (v, p) => { noise(1.2, 0.07 * v, 'bandpass', 700, p, 400, 0, 2); noise(1.0, 0.05 * v, 'bandpass', 500, p, 800, 1.4, 2); },
  far: () => {
    const k = (M.random() * 4) | 0, p = rnd(-1, 1);
    if (k == 0) { noise(0.5, 0.18, 'lowpass', 400, p); tone(50, 0.4, 'sine', 0.2, p, 35); }
    else if (k == 1) for (let i = 0; i < 4; i++) SFX.step(0.5 + i * 0.15, p, i * 0.4);
    else if (k == 2) { for (let i = 0; i < 3; i++) tone(rnd(500, 700), 0.15, 'triangle', 0.03, p, 0, i * 0.2); }
    else noise(1.5, 0.06, 'bandpass', 1200, p, 300, 0, 6);
  },
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
const SEAT = [400, 345];   // where a threat "reaches" you
const CHAIR = [400, 468];
const CDOOR = { W: { adj: 3, ad: 'E', a: 0 }, N: { adj: 1, ad: 'S', a: 1 }, E: { adj: 5, ad: 'W', a: 2 } };
const ADOOR = ['W', 'N', 'E'];
const ROOMS5 = [0, 1, 2, 3, 5]; // rooms with a camera and a breaker
const ek = (a, b) => (a < b ? a + '-' + b : b + '-' + a);
function nb(r, d) {
  const c = RC[r][0] + (d == 'E') - (d == 'W'), w = RC[r][1] + (d == 'S') - (d == 'N');
  return c < 0 || c > 2 || w < 0 || w > 1 ? -1 : w * 3 + c;
}
function dirTo(a, b) { for (const d of DIRS) if (nb(a, d) == b) return d; return null; }
function bfs(a, b, blk) {
  if (a == b) return [a];
  const prev = { [a]: -1 }, q = [a];
  while (q.length) {
    const r = q.shift();
    for (const d of DIRS) {
      const n = nb(r, d);
      if (n < 0 || n in prev || (blk && blk.has(ek(r, n)))) continue;
      prev[n] = r;
      if (n == b) { const p = [b]; let k = b; while (prev[k] != -1) { k = prev[k]; p.unshift(k); } return p; }
      q.push(n);
    }
  }
  return null;
}
const gdist = (a, b) => M.abs(RC[a][0] - RC[b][0]) + M.abs(RC[a][1] - RC[b][1]);

const OBS = [
  [[60, 104, 250, 62], [630, 104, 100, 70], [110, 405, 190, 70], [510, 410, 190, 80]],
  [[528, 128, 34, 34], [80, 395, 240, 28], [80, 465, 240, 28], [480, 395, 240, 28], [480, 465, 240, 28]],
  [[80, 150, 230, 42], [490, 150, 230, 42], [80, 420, 230, 42], [490, 420, 230, 42]],
  [[95, 130, 80, 56], [610, 125, 80, 56], [600, 440, 90, 56]],
  [[288, 372, 224, 52], [66, 470, 76, 82], [658, 470, 80, 82]],
  [[686, 108, 56, 62], [90, 128, 170, 60], [520, 440, 200, 50], [150, 470, 42, 34]],
];
const SPOTS = [
  [[200, 200], [400, 300], [560, 340], [380, 500]],
  [[300, 360], [400, 340], [520, 360], [400, 520]],
  [[400, 300], [360, 230], [600, 300], [400, 500]],
  [[300, 300], [460, 200], [400, 480], [200, 260]],
  [[400, 250], [200, 300], [600, 300]],
  [[400, 300], [320, 220], [600, 330], [400, 500]],
];
const OUTLET = [[700, 300], [700, 470], [400, 470], [400, 470], [0, 0], [300, 300]]; // where the coder plugs in each room
const PITCH_HOME = [400, 172], SLEEP_HOME = [210, 330], CHEF_HOME = [200, 200], CODER_HOME = [600, 222], LAPTOP = [600, 196];

function segBlocked(r, x1, y1, x2, y2) {
  const n = M.ceil(dist(x1, y1, x2, y2) / 12);
  for (const o of OBS[r]) {
    const ax = o[0] - 14, ay = o[1] - 14, bx = o[0] + o[2] + 14, by = o[1] + o[3] + 14;
    for (let i = 1; i < n; i++) {
      const x = x1 + (x2 - x1) * i / n, y = y1 + (y2 - y1) * i / n;
      if (x > ax && x < bx && y > ay && y < by) return true;
    }
  }
  return false;
}
const blindPt = (d) => { const c = CDOOR[d], p = DP[c.ad]; return [p[0] + (c.ad == 'W' ? 55 : c.ad == 'E' ? -55 : 0), p[1] + (c.ad == 'S' ? -45 : 0)]; };
function blindDoor(e) {
  for (const d of ADOOR) {
    const c = CDOOR[d];
    if (e.r == c.adj) { const p = DP[c.ad]; if (dist(e.x, e.y, p[0], p[1]) < 125) return d; }
  }
  return null;
}

// =====================================================================
// NIGHTS — hl = seconds per in-game hour (night 1 lasts 3 minutes)
// =====================================================================
const NIGHTS = [
  // N1: sleeper + coffee + board · N2: + pitcher · N3: + mentora (and the suit) · N4: + chef · N5: + coder
  { hl: 30, pitch: 0, ask: [0, 0], pat: 0, pfast: 105, wake: [2, 3], sw: 14, drain: 0.07, cook: 0, mentora: 0, coder: 0, mspd: 50, sue: 100 },
  { hl: 34, pitch: 1, ask: [0, 0], pat: 55, pfast: 115, wake: [2, 3], sw: 12, drain: 0.07, cook: 0, mentora: 0, coder: 0, mspd: 55, sue: 105 },
  { hl: 38, pitch: 1, ask: [0, 0], pat: 48, pfast: 125, wake: [2, 3], sw: 11, drain: 0.075, cook: 0, mentora: 1, coder: 0, mspd: 58, sue: 105 },
  { hl: 42, pitch: 1, ask: [0, 0], pat: 42, pfast: 135, wake: [2, 3], sw: 10, drain: 0.075, cook: 34, mentora: 1, coder: 0, mspd: 62, sue: 100 },
  { hl: 46, pitch: 1, ask: [0, 0], pat: 36, pfast: 148, wake: [1, 2], sw: 9, drain: 0.08, cook: 30, mentora: 1, coder: 20, mspd: 68, sue: 95 },
];
const CALLS = [
  ['RAFA', 'rafa', [
    '¿Aló? ¿Aló? Hola, soy Rafa. Te llamo desde la puerta de embarque, así que rapidito.',
    'La hackathon terminó y todos se fueron... bueno, casi todos. No salgas de la sala de control, ¿ya? Para eso están las cámaras.',
    'En la sala de siesta quedó alguien durmiendo. Déjalo dormir. La luz de cada sala se maneja desde el tablero... y la luz es cara.',
    'Ah, hay una cafetera en el escritorio. La vas a necesitar. ¡Me llaman, chao!',
  ]],
  ['RAFA', 'rafa', [
    '¡Hola de nuevo! Sobreviviste. Te dije que era fácil.',
    'Oye, hay un cabro en la sala de pitch que todavía no termina de presentar. No le gusta presentar solo.',
    'Tiene que ir pasando diapositivas, si no se pone nervioso. El clicker funciona desde la cámara de esa sala... mantenlo apretado.',
  ]],
  ['RAFA', 'rafa', [
    'Hola, ya casi embarcamos. Oye, la mentora se quedó. Dice que nadie le pidió feedback en todo el fin de semana.',
    'Anda buscando a alguien que esté trabajando. Si te ve... va a querer darte feedback. Mucho feedback. Le encantan los aplausos.',
    'Ah, y en el casillero hay un traje de plátano. Por si acaso.',
  ]],
  ['RAFA', 'rafa', [
    'Hola, aterrizamos en San Francisco. Hace frío.',
    'Oye, el chef sigue cocinando. No sé para quién. Si te ofrece algo... tú verás.',
    'Yo después del bajón del sábado quedé raja. Y no le cierres la puerta en la cara, que se ofende.',
  ]],
  ['NACHO', 'nacho', [
    'Hola, soy Nacho. Rafa se quedó dormido en el avión.',
    'El de la sala de código dice que le faltan cinco minutos. Desde el sábado. Si la energía baja muy rápido, revisa el tablero.',
    'Oye... es la última noche. Mañana devolvemos el edificio. Creo que ellos también lo saben. Así que—',
  ]],
];

// =====================================================================
// GAME STATE
// =====================================================================
let S;
let G = null;
let mode = 'title';
let modeT = 0;
let saved = { night: 1 };
let menuNight = 1;
let FX = null;
// How many times each control has been used: prompts fade once learned
const HINT = { look: 0, light: 0, door: 0, cams: 0, camnav: 0, pa: 0, slide: 0, panel: 0, coffee: 0, suit: 0 };
const learned = (k, n) => HINT[k] >= (n || 3);

class HorrorPipeline extends Phaser.Renderer.WebGL.Pipelines.PostFXPipeline {
  constructor(game) {
    super({
      game, name: 'Horror',
      fragShader: `precision mediump float;
uniform sampler2D uMainSampler;uniform float uT,uNv,uNo,uAb,uDk,uWp;varying vec2 outTexCoord;
float R(vec2 c){return fract(sin(dot(c,vec2(12.9898,78.233)))*43758.5453);}
void main(){vec2 uv=outTexCoord;vec2 cc=uv-.5;
uv=.5+cc*(1.+dot(cc,cc)*(.06+.14*uNv));
float wob=uWp*.004*sin(uv.y*40.+uT*9.);uv.x+=wob;
float a=.0008+min(uAb,1.5)*.0035;
vec4 c=texture2D(uMainSampler,uv);c.r=texture2D(uMainSampler,uv+vec2(a,0.)).r;c.b=texture2D(uMainSampler,uv-vec2(a,0.)).b;
float l=dot(c.rgb,vec3(.3,.59,.11));
vec3 nv=vec3(l*.3,l*1.6+.03,l*.4);
c.rgb=mix(c.rgb,nv,uNv);
float n=R(floor(uv*vec2(400.,300.))+fract(uT)*91.);
c.rgb+=(n-.5)*(.05+uNo);
c.rgb*=1.-.13*(sin(uv.y*1200.)*.5+.5)*(.35+uNv);
float v=1.-dot(cc,cc)*(1.1+uDk*2.4);c.rgb*=clamp(v,0.,1.);
if(uv.x<0.||uv.x>1.||uv.y<0.||uv.y>1.)c.rgb=vec3(0.);
gl_FragColor=vec4(c.rgb,1.);}`,
    });
  }
  onPreRender() {
    const f = FX || {};
    this.set1f('uT', (f.t || 0) % 1000);
    this.set1f('uNv', f.nv || 0);
    this.set1f('uNo', f.no || 0);
    this.set1f('uAb', f.ab || 0);
    this.set1f('uDk', f.dk || 0);
    this.set1f('uWp', f.wp || 0);
  }
}

const config = {
  type: Phaser.AUTO,
  width: W, height: H,
  parent: 'game-root',
  backgroundColor: '#000000',
  pixelArt: true,
  scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH, width: W, height: H },
  pipeline: { Horror: HorrorPipeline },
  scene: { create, update },
};
new Phaser.Game(config);

// =====================================================================
// TEXTURE GENERATION
// =====================================================================
function canvasTex(key, w, h, draw) {
  const t = S.textures.createCanvas(key, w, h);
  draw(t.getContext(), w, h);
  t.refresh();
}
function spriteTex(key, rows) {
  canvasTex(key, rows[0].length, rows.length, (c) => {
    rows.forEach((row, y) => row.forEach((ch, x) => {
      const col = CLR[ch];
      if (col != null) { c.fillStyle = hex(col); c.fillRect(x, y, 1, 1); }
    }));
  });
}
const SPRF = {};
function buildSprites() {
  for (const role in CAST) {
    const fr = SPR[CAST[role]];
    SPRF[role] = fr.map((s, i) => { const k = role + i; spriteTex(k, parseCSEF(s, 24)); return k; });
    const rows = parseCSEF(fr[0], 24);
    let top = 0; while (top < rows.length && rows[top].every((c) => c == '.')) top++;
    spriteTex(role + 'H', rows.slice(top, top + 14));
  }
}
function buildFxTex() {
  canvasTex('cone', 256, 160, (c) => {
    const img = c.createImageData(256, 160), sp = 0.42;
    for (let i = 0; i < 256 * 160; i++) {
      const x = i % 256, dy = ((i / 256) | 0) - 80, d = M.hypot(x, dy), a = M.abs(M.atan2(dy, x + 0.001));
      let v = 0;
      if (a < sp && d < 256) v = M.max(0, (1 - (a / sp) ** 3) * (1 - (d / 256) ** 2.2));
      if (d < 16) v = M.max(v, 0.7 * (1 - d / 16));
      img.data[i * 4] = img.data[i * 4 + 1] = img.data[i * 4 + 2] = 255;
      img.data[i * 4 + 3] = (v * 255) | 0;
    }
    c.putImageData(img, 0, 0);
  });
  canvasTex('noise', 200, 150, (c) => {
    const img = c.createImageData(200, 150);
    for (let i = 0; i < 200 * 150; i++) { const v = (M.random() * 255) | 0; img.data[i * 4] = img.data[i * 4 + 1] = img.data[i * 4 + 2] = v; img.data[i * 4 + 3] = 255; }
    c.putImageData(img, 0, 0);
  });
  canvasTex('suitov', W, H, (c) => {
    c.fillStyle = '#e6c21a'; c.fillRect(0, 0, W, H);
    c.fillStyle = '#b08a10';
    for (let i = 0; i < 9; i++) c.fillRect(0, i * 70 + 20, W, 6);
    c.globalCompositeOperation = 'destination-out';
    c.beginPath(); c.ellipse(260, 290, 150, 110, -0.1, 0, PI * 2); c.fill();
    c.beginPath(); c.ellipse(540, 290, 150, 110, 0.1, 0, PI * 2); c.fill();
    c.globalCompositeOperation = 'source-over';
    c.strokeStyle = '#5a4300'; c.lineWidth = 14;
    c.beginPath(); c.ellipse(260, 290, 150, 110, -0.1, 0, PI * 2); c.stroke();
    c.beginPath(); c.ellipse(540, 290, 150, 110, 0.1, 0, PI * 2); c.stroke();
  });
}

// ---- Camera shots: each camera is a fixed, high-corner perspective view of
// a specific scene (FNAF style). The world keeps its floor-plan coordinates;
// P() projects a floor point (x, y) at height h into the 1000px-wide shot.
const CF = 450, CAMH = 166.7, CY0 = 130, CX0 = 500, CAMW = 1000;
function P(x, y, h) { const s = CF / (700 - y); return [CX0 + (x - 400) * s, CY0 + (CAMH - (h || 0)) * s, s]; }
function quad(c, col, pts) { c.fillStyle = col; c.beginPath(); pts.forEach((p, i) => (i ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1]))); c.closePath(); c.fill(); }
// a box standing on the floor: [x, y, w, d] footprint, height h
function box(c, o, h, front, top, side) {
  const [x, y, w, d] = o, x2 = x + w, y2 = y + d;
  if (side) {
    if (x2 < 400) quad(c, side, [P(x2, y, 0), P(x2, y2, 0), P(x2, y2, h), P(x2, y, h)]);
    if (x > 400) quad(c, side, [P(x, y, 0), P(x, y2, 0), P(x, y2, h), P(x, y, h)]);
  }
  quad(c, top, [P(x, y, h), P(x2, y, h), P(x2, y2, h), P(x, y2, h)]);
  quad(c, front, [P(x, y2, 0), P(x2, y2, 0), P(x2, y2, h), P(x, y2, h)]);
}
function wallText(c, s, x, h, size, col) { const [sx, sy, k] = P(x, 96, h); c.fillStyle = col; c.font = 'bold ' + ((size * k) | 0) + 'px monospace'; c.textAlign = 'center'; c.fillText(s, sx, sy); c.textAlign = 'left'; }
const DOORQ = {
  N: [[352, 96, 0], [448, 96, 0], [448, 96, 150], [352, 96, 150]],
  W: [[48, 252, 0], [48, 348, 0], [48, 348, 150], [48, 252, 150]],
  E: [[752, 252, 0], [752, 348, 0], [752, 348, 150], [752, 252, 150]],
};
const doorPts = (d) => DOORQ[d].map((q) => P(q[0], q[1], q[2]));
function shell(c, r, floorA, floorB, wall, tile) {
  c.fillStyle = '#050506'; c.fillRect(0, 0, CAMW, H);
  quad(c, '#0d0d10', [P(48, 96, 220), P(752, 96, 220), P(752, 640, 220), P(48, 640, 220)]); // ceiling
  // floor tiles in perspective
  for (let y = 96; y < 640; y += tile) for (let x = 48; x < 752; x += tile)
    quad(c, (((x / tile) | 0) + ((y / tile) | 0)) % 2 ? floorA : floorB, [P(x, y), P(x + tile, y), P(x + tile, y + tile), P(x, y + tile)]);
  quad(c, wall, [P(48, 96, 0), P(752, 96, 0), P(752, 96, 220), P(48, 96, 220)]);
  quad(c, 'rgba(0,0,0,.25)', [P(48, 96, 0), P(48, 640, 0), P(48, 640, 220), P(48, 96, 220)]);
  quad(c, wall, [P(48, 96, 4), P(48, 640, 4), P(48, 640, 220), P(48, 96, 220)]);
  quad(c, 'rgba(0,0,0,.35)', [P(48, 96, 4), P(48, 640, 4), P(48, 640, 220), P(48, 96, 220)]);
  quad(c, wall, [P(752, 96, 4), P(752, 640, 4), P(752, 640, 220), P(752, 96, 220)]);
  quad(c, 'rgba(0,0,0,.35)', [P(752, 96, 4), P(752, 640, 4), P(752, 640, 220), P(752, 96, 220)]);
  quad(c, 'rgba(255,255,255,.06)', [P(48, 96, 20), P(752, 96, 20), P(752, 96, 26), P(48, 96, 26)]); // baseboard
  for (const d of ['N', 'W', 'E']) if (nb(r, d) >= 0) {
    quad(c, '#3a3d42', doorPts(d).map((p, i) => [p[0] + (i == 0 || i == 3 ? -4 : 4), p[1] - (i > 1 ? 6 : 0)]));
    quad(c, '#020202', doorPts(d));
    const t = DOORQ[d][3]; const [sx, sy, k] = P(t[0] + (d == 'N' ? 48 : 0), t[1] + (d == 'N' ? 0 : 48), 168);
    c.fillStyle = '#0c6'; c.fillRect(sx - 22 * k, sy - 6 * k, 44 * k, 12 * k);
  }
}
function buildRooms() {
  // 0 COCINA: counters, stove, fridge, island with leftover food
  canvasTex('room0', CAMW, H, (c) => {
    shell(c, 0, '#c9c9c0', '#3a3a3a', '#6e6a5c', 64);
    wallText(c, 'BAJÓN 24/7', 560, 160, 26, '#eee');
    box(c, [60, 104, 250, 62], 60, '#8d8778', '#b5b0a0', '#6d6758');
    quad(c, '#222', [P(150, 112, 61), P(240, 112, 61), P(240, 150, 61), P(150, 150, 61)]);
    box(c, [630, 104, 100, 70], 170, '#d8d8d8', '#eee', '#aaa');
    quad(c, '#999', [P(700, 174, 60), P(706, 174, 60), P(706, 174, 140), P(700, 174, 140)]);
    box(c, [110, 405, 190, 70], 55, '#8d8778', '#b5b0a0', '#6d6758');
    box(c, [510, 410, 190, 80], 55, '#8d8778', '#b5b0a0', '#6d6758');
    for (const [x, y, col] of [[150, 420, '#e8d'], [200, 430, '#ec5'], [560, 430, '#d84'], [620, 440, '#eee']]) box(c, [x, y, 30, 20], 70, col, col, col);
  });
  // 1 SALA DE PITCH: the stage and the projector screen, seen from behind the audience
  canvasTex('room1', CAMW, H, (c) => {
    shell(c, 1, '#5a1a22', '#4a1219', '#2a2230', 48);
    quad(c, '#111', [P(230, 96, 120), P(570, 96, 120), P(570, 96, 212), P(230, 96, 212)]); // screen frame
    box(c, [100, 96, 600, 120], 30, '#16161b', '#2b2b33');
    wallText(c, 'DEMO DAY', 120, 180, 22, '#ffe');
    box(c, [528, 128, 34, 34], 75, '#665', '#998', '#554');
    for (const o of OBS[1].slice(1)) for (let x = o[0] + 6; x < o[0] + o[2]; x += 30) box(c, [x, o[1], 22, 22], 40, '#7a2030', '#9a3040', '#5a1020');
  });
  // 2 SALA DE CÓDIGO: rows of desks, one laptop still on
  canvasTex('room2', CAMW, H, (c) => {
    shell(c, 2, '#3c4048', '#34373e', '#26303a', 64);
    wallText(c, 'NO SE ACEPTAN ENTREGAS DESPUÉS DE LAS 12', 400, 170, 15, '#9cf');
    for (const o of OBS[2]) {
      box(c, o, 48, '#6d5a42', '#8c7558', '#4d3a22');
      for (let x = o[0] + 10; x < o[0] + o[2] - 30; x += 56) box(c, [x, o[1] + 6, 34, 6], 66, '#111', '#222', '#111');
    }
  });
  // 3 SALA DE SIESTA: mats and beanbags, his red beanbag in the middle
  canvasTex('room3', CAMW, H, (c) => {
    shell(c, 3, '#1f2c4a', '#24335a', '#1c1c2c', 96);
    wallText(c, 'SILENCIO · ZONA DE DESCANSO', 400, 160, 18, '#88a');
    for (let i = 0; i < 6; i++) { const x = 90 + i * 100, y = 230 + (i % 2) * 150; quad(c, '#344a7a', [P(x, y), P(x + 80, y), P(x + 80, y + 40), P(x, y + 40)]); }
    const bean = (x, y, rad, col) => { const [sx, sy, k] = P(x, y, 0); c.fillStyle = col; c.beginPath(); c.ellipse(sx, sy - 14 * k, rad * k, rad * 0.7 * k, 0, 0, PI * 2); c.fill(); };
    for (const o of OBS[3]) bean(o[0] + o[2] / 2, o[1] + o[3] / 2, 46, pick(['#a33', '#3a6', '#c6c', '#e94']));
    bean(SLEEP_HOME[0], SLEEP_HOME[1] + 20, 44, '#c43');
  });
  // 5 LOBBY: sponsor stands, the big banner, the inflatable banana
  canvasTex('room5', CAMW, H, (c) => {
    shell(c, 5, '#5c5a58', '#666462', '#3e4a40', 112);
    wallText(c, 'PLATANUS HACK 26 · SANTIAGO', 400, 165, 26, '#ffd400');
    box(c, [90, 128, 170, 60], 70, '#2f3f68', '#4a5c90', '#1f2f58');
    wallText(c, 'SPONSORS', 175, 120, 16, '#ccc');
    box(c, [520, 440, 200, 50], 70, '#2f3f68', '#4a5c90', '#1f2f58');
    box(c, [686, 108, 56, 62], 120, '#311', '#622', '#211');
  });
}

// ---- Office panorama (first person, FNAF-style) 1600x600 ----
const PW = 1600, PCX = 800;
const ODOOR = { W: [150, 140, 180, 300], N: [710, 150, 180, 255], E: [1270, 140, 180, 300] };
const OPANEL = { W: [348, 250], N: [906, 238], E: [1212, 250] };
const OCENTER = { W: 240, N: 800, E: 1360 };
const COFFEE_X = 1000; // coffee maker on the desk (look at it: it is focusable like a door)
function buildOffice() {
  canvasTex('office', PW, H, (c) => {
    const g = c.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, '#1b1d22'); g.addColorStop(0.68, '#2a2d33'); g.addColorStop(0.681, '#111214'); g.addColorStop(1, '#060607');
    c.fillStyle = g; c.fillRect(0, 0, PW, H);
    c.fillStyle = '#0c0d10'; c.fillRect(0, 0, PW, 60);
    for (let x = 0; x < PW; x += 120) { c.fillStyle = '#16181c'; c.fillRect(x + 4, 6, 112, 46); }
    for (let x = 0; x < PW; x += 16) { c.fillStyle = (x / 16) % 2 ? '#d8d8d0' : '#141414'; c.fillRect(x, 352, 16, 10); c.fillStyle = (x / 16) % 2 ? '#141414' : '#d8d8d0'; c.fillRect(x, 362, 16, 10); }
    for (let row = 0; row < 8; row++) {
      const y0 = 408 + row * row * 3.2 + row * 8, y1 = 408 + (row + 1) * (row + 1) * 3.2 + (row + 1) * 8;
      for (let col = -24; col < 24; col++) {
        const s0 = 1 + row * 0.35, s1 = 1 + (row + 1) * 0.35;
        c.fillStyle = (row + col) % 2 ? '#1d1d1f' : '#0b0b0c';
        c.beginPath(); c.moveTo(PCX + col * 40 * s0, y0); c.lineTo(PCX + (col + 1) * 40 * s0, y0); c.lineTo(PCX + (col + 1) * 40 * s1, y1); c.lineTo(PCX + col * 40 * s1, y1); c.fill();
      }
    }
    c.fillStyle = 'rgba(0,0,0,.45)';
    c.beginPath(); c.moveTo(0, 0); c.lineTo(110, 60); c.lineTo(110, 470); c.lineTo(0, 600); c.fill();
    c.beginPath(); c.moveTo(PW, 0); c.lineTo(PW - 110, 60); c.lineTo(PW - 110, 470); c.lineTo(PW, 600); c.fill();
    for (const d of ADOOR) {
      const [x, y, w, h] = ODOOR[d];
      c.fillStyle = '#000'; c.fillRect(x, y, w, h);
      c.fillStyle = '#41454c'; c.fillRect(x - 14, y - 16, w + 28, 16); c.fillRect(x - 14, y, 14, h); c.fillRect(x + w, y, 14, h);
      c.fillStyle = '#2b2e33'; c.fillRect(x - 14, y - 16, w + 28, 3);
      c.fillStyle = '#0c6'; c.fillRect(x + w / 2 - 30, y - 40, 60, 18); c.fillStyle = '#000'; c.font = 'bold 12px monospace'; c.fillText('SALIDA', x + w / 2 - 23, y - 26);
      c.fillStyle = '#9aa'; c.font = 'bold 11px monospace'; c.fillText(d == 'W' ? '← SIESTA' : d == 'E' ? 'LOBBY →' : '↑ SALA DE PITCH', x + (d == 'N' ? 30 : 46), y + h + 26);
      const [px0, py0] = OPANEL[d];
      c.fillStyle = '#2a2c30'; c.fillRect(px0 - 4, py0 - 4, 48, 104); c.fillStyle = '#4c5058'; c.fillRect(px0, py0, 40, 96);
      c.fillStyle = '#151618'; c.beginPath(); c.arc(px0 + 20, py0 + 26, 13, 0, PI * 2); c.fill(); c.beginPath(); c.arc(px0 + 20, py0 + 70, 13, 0, PI * 2); c.fill();
    }
    c.fillStyle = '#e6c21a'; c.fillRect(470, 120, 110, 150); c.fillStyle = '#000'; c.font = 'bold 15px monospace'; c.fillText('PLATANUS', 480, 150); c.fillText('HACK 26', 488, 170);
    c.fillStyle = '#7a5c00'; c.beginPath(); c.ellipse(525, 220, 30, 12, -0.5, 0, PI * 2); c.fill();
    c.fillStyle = '#d9dcd3'; c.fillRect(960, 110, 200, 130); c.fillStyle = '#245'; c.font = 'bold 12px monospace';
    ['SÁB 18:00 PITCH', 'SÁB 23:00 BAJÓN', 'DOM 06:00 ENTREGA', 'DOM 12:00 PREMIOS', '¡NO DORMIR!'].forEach((s, i) => c.fillText(s, 972, 132 + i * 21));
    c.strokeStyle = '#c33'; c.lineWidth = 2; c.beginPath(); c.moveTo(970, 214); c.lineTo(1100, 236); c.stroke();
    c.fillStyle = '#c0392b'; c.fillRect(1180, 90, 70, 90); c.fillStyle = '#fff'; c.font = 'bold 10px monospace'; c.fillText('¿YA', 1196, 120); c.fillText('HICISTE', 1188, 134); c.fillText('DEPLOY?', 1188, 148);
    for (const [x, y] of [[600, 290], [650, 300], [990, 292], [1110, 300]]) {
      c.fillStyle = '#ece7da'; c.fillRect(x, y, 44, 48); c.strokeStyle = pick(['#c33', '#36c', '#393', '#c90']); c.lineWidth = 2;
      c.beginPath(); c.arc(x + 22, y + 15, 8, 0, PI * 2); c.moveTo(x + 22, y + 23); c.lineTo(x + 22, y + 38); c.moveTo(x + 12, y + 29); c.lineTo(x + 32, y + 29); c.stroke();
    }
    c.fillStyle = '#ddd'; c.beginPath(); c.arc(420, 100, 26, 0, PI * 2); c.fill(); c.fillStyle = '#222'; c.beginPath(); c.arc(420, 100, 22, 0, PI * 2); c.fill();
    // desk
    c.fillStyle = '#2f2922'; c.fillRect(440, 470, 720, 130);
    c.fillStyle = '#4a4034'; c.fillRect(440, 460, 720, 14); c.fillStyle = '#1d1914'; c.fillRect(440, 474, 720, 6);
    for (const mx of [470, 1090]) { c.fillStyle = '#0b0b0d'; c.fillRect(mx, 368, 130, 96); c.fillStyle = '#16304e'; c.fillRect(mx + 8, 376, 114, 76); c.fillStyle = '#0b0b0d'; c.fillRect(mx + 55, 462, 20, 8); }
    c.fillStyle = '#1a1a1c'; c.fillRect(630, 486, 160, 30); c.fillStyle = '#333'; for (let i = 0; i < 14; i++) { c.fillRect(636 + i * 11, 492, 8, 6); c.fillRect(636 + i * 11, 502, 8, 6); }
    c.fillStyle = '#a33'; c.fillRect(1050, 500, 80, 50); c.fillStyle = '#d8b06a'; c.fillRect(1056, 494, 68, 10); c.fillStyle = '#fff'; c.font = 'bold 10px monospace'; c.fillText('PIZZA', 1072, 530);
    // coffee maker
    c.fillStyle = '#1b1b1b'; c.fillRect(COFFEE_X - 30, 400, 60, 72); c.fillStyle = '#333'; c.fillRect(COFFEE_X - 24, 408, 48, 20);
    c.fillStyle = '#111'; c.fillRect(COFFEE_X - 14, 440, 28, 6); 
    c.fillStyle = '#fff'; c.font = 'bold 9px monospace'; c.fillText('CAFÉ', COFFEE_X - 12, 422);
    c.fillStyle = '#ece6c8'; c.fillRect(520, 490, 70, 50); c.fillStyle = '#999'; for (let i = 0; i < 5; i++) c.fillRect(526, 498 + i * 8, 50, 2);
    c.fillStyle = '#e6c21a'; c.beginPath(); c.ellipse(1250, 470, 16, 30, 0.4, 0, PI * 2); c.fill(); c.fillStyle = '#000'; c.fillRect(1244, 458, 3, 3); c.fillRect(1252, 456, 3, 3);
    c.fillStyle = '#222'; c.fillRect(800, 430, 60, 38); c.fillStyle = '#444'; c.fillRect(804, 434, 30, 30);
    c.fillStyle = '#333'; c.fillRect(712, 446, 6, 26); c.fillRect(696, 468, 38, 6);
    // breaker box under the desk + banana suit locker
    c.fillStyle = '#3a3d42'; c.fillRect(456, 520, 80, 70); c.fillStyle = '#ffd400'; c.fillRect(466, 528, 60, 10); c.fillStyle = '#000'; c.font = 'bold 9px monospace'; c.fillText('TABLERO', 472, 536);
    c.fillStyle = '#e6c21a'; c.fillRect(1440, 380, 70, 120); c.fillStyle = '#000'; c.font = 'bold 12px monospace'; c.fillText('TRAJE', 1452, 446);
  });
  canvasTex('door', 180, 300, (c) => {
    c.fillStyle = '#4b4f57'; c.fillRect(0, 0, 180, 300);
    c.fillStyle = '#5d626b'; for (let y = 10; y < 300; y += 40) c.fillRect(8, y, 164, 4);
    c.fillStyle = '#d4a017'; for (let x = 0; x < 180; x += 30) c.fillRect(x, 262, 15, 22);
  });
  canvasTex('shutter', 180, 255, (c) => {
    for (let y = 0; y < 255; y += 12) { c.fillStyle = y % 24 ? '#5a5f66' : '#4a4e55'; c.fillRect(0, y, 180, 12); c.fillStyle = '#2d3035'; c.fillRect(0, y + 10, 180, 2); }
  });
}

// =====================================================================
// CREATE
// =====================================================================
let wC, rC, oC, uC;
let bgImg, dynG, emG, projTxt, askTxt;
let eImg = {}, oImg = {}, ghostImg, oGhost;
let oBg, oDoors = {}, oG, oBeam, oDim, oLamp, oTop;
let ui = {};
let zPoolR = [], zPoolO = [];
let uiCam;

function create() {
  S = this;
  buildSprites(); buildFxTex(); buildRooms(); buildOffice();

  window.addEventListener('keydown', (e) => {
    const a = KEY2ACT[e.key.length === 1 ? e.key.toLowerCase() : e.key];
    initAudio();
    if (!a) return;
    if (!held[a]) pressed[a] = 1;
    held[a] = 1;
  });
  window.addEventListener('keyup', (e) => {
    const a = KEY2ACT[e.key.length === 1 ? e.key.toLowerCase() : e.key];
    if (a) held[a] = 0;
  });

  wC = S.add.container(0, 0);
  rC = S.add.container(0, 0); wC.add(rC);
  oC = S.add.container(0, 0); wC.add(oC);
  uC = S.add.container(0, 0);

  // camera feed renderer
  bgImg = S.add.image(0, 0, 'room0').setOrigin(0); rC.add(bgImg);
  dynG = S.add.graphics(); rC.add(dynG);
  projTxt = S.add.text(400, 46, '', { fontFamily: 'monospace', fontSize: '18px', color: '#111', fontStyle: 'bold', align: 'center' }).setOrigin(0.5); rC.add(projTxt);
  for (const role of ROLES) { eImg[role] = S.add.image(0, 0, role + '0').setOrigin(0.5, 1).setScale(2.6); rC.add(eImg[role]); }
  askTxt = S.add.text(0, 0, '', { fontFamily: 'monospace', fontSize: '15px', color: '#111', fontStyle: 'bold' }).setOrigin(0.5).setVisible(false);
  ghostImg = S.add.image(0, 0, 'ghost0').setOrigin(0.5, 1).setScale(2.6).setVisible(false); rC.add(ghostImg);
  emG = S.add.graphics(); rC.add(emG);
  for (let i = 0; i < 14; i++) { const t = S.add.text(0, 0, 'z', { fontFamily: 'monospace', fontSize: '16px', color: '#9fd8ff', fontStyle: 'bold' }).setVisible(false); rC.add(t); zPoolR.push(t); }

  // office renderer
  oBg = S.add.image(0, 0, 'office').setOrigin(0); oC.add(oBg);
  oG = S.add.graphics(); oC.add(oG);
  for (const role of ROLES) { oImg[role] = S.add.image(0, 0, role + '0').setOrigin(0.5, 1); oC.add(oImg[role]); }
  oGhost = S.add.image(0, 0, 'ghost0').setOrigin(0.5, 1).setVisible(false); oC.add(oGhost);
  for (const d of ADOOR) { const [x, y] = ODOOR[d]; oDoors[d] = S.add.image(x, y, d == 'N' ? 'shutter' : 'door').setOrigin(0); oC.add(oDoors[d]); }
  oTop = S.add.graphics(); oC.add(oTop);
  oBeam = S.add.image(0, 0, 'cone').setOrigin(0, 0.5).setBlendMode(Phaser.BlendModes.ADD).setTint(0xfff0c0).setVisible(false); oC.add(oBeam);
  oLamp = S.add.image(PCX, 40, 'cone').setOrigin(0, 0.5).setBlendMode(Phaser.BlendModes.ADD).setTint(0xffe2a0).setRotation(PI / 2).setScale(1.9, 2.6).setAlpha(0.13); oC.add(oLamp);
  oDim = S.add.graphics(); oC.add(oDim);
  for (let i = 0; i < 14; i++) { const t = S.add.text(0, 0, 'z', { fontFamily: 'monospace', fontSize: '22px', color: '#9fd8ff', fontStyle: 'bold' }).setVisible(false); oC.add(t); zPoolO.push(t); }

  buildUI();

  const mc = S.cameras.main;
  uiCam = S.cameras.add(0, 0, W, H);
  mc.ignore(uC); uiCam.ignore(wC);
  if (S.game.renderer.type === Phaser.WEBGL) { mc.setPostPipeline('Horror'); FX = { t: 0, nv: 0, no: 0, ab: 0, dk: 0, wp: 0 }; }

  loadSave();
  goTitle();
  window.FNAP = { held, HINT, get G() { return G; }, get mode() { return mode; }, startNight, setPower };
}

// =====================================================================
// UI
// =====================================================================
const TS = (sz, col, extra) => Object.assign({ fontFamily: 'monospace', fontSize: sz + 'px', color: col || '#fff', fontStyle: 'bold' }, extra || {});
function uText(x, y, s, sz, col, ox, oy, extra) { const t = S.add.text(x, y, s, TS(sz, col, extra)).setOrigin(ox ?? 0.5, oy ?? 0.5); uC.add(t); return t; }
function uRect(x, y, w, h, col, a) { const r = S.add.rectangle(x, y, w, h, col, a ?? 1).setOrigin(0); uC.add(r); return r; }
const KEYBOX = { backgroundColor: '#000000cc', padding: { x: 6, y: 3 } };
// breaker panel layout: switch slots in a 3x2 grid mirroring the venue map
const BRK = (i) => [148 + RC[i][0] * 180, 182 + RC[i][1] * 168];
function buildUI() {
  ui.lid = uRect(0, 0, W, 0, 0x000000); ui.lid2 = uRect(0, H, W, 0, 0x000000); // eyelids: over the scene, under the UI
  ui.g = S.add.graphics(); uC.add(ui.g);
  ui.stat = S.add.tileSprite(0, 0, W, H, 'noise').setOrigin(0).setAlpha(0); uC.add(ui.stat);
  ui.tab = uRect(0, H, W, H, 0x0e1612);
  ui.suit = S.add.image(0, 0, 'suitov').setOrigin(0).setAlpha(0); uC.add(ui.suit);
  // breaker board overlay
  ui.bk = S.add.container(0, H); uC.add(ui.bk);
  ui.bkG = S.add.graphics(); ui.bk.add(ui.bkG);
  ui.bk.add(S.add.text(400, 132, 'TABLERO ELÉCTRICO', TS(20, '#ffd400')).setOrigin(0.5));
  ui.bkT = {};
  for (const i of [...ROOMS5, CTRL]) {
    const [x, y] = BRK(i);
    ui.bkT[i] = [S.add.text(x + 74, y + 14, i == CTRL ? 'PRINCIPAL' : RNAME[i], TS(12, '#ddd')).setOrigin(0.5), S.add.text(x + 74, y + 128, '', TS(11, '#aaa', { align: 'center' })).setOrigin(0.5)];
    ui.bk.add(ui.bkT[i]);
  }
  ui.bkHint = S.add.text(400, 548, 'CARGA MÁX 6: SALAS, PUERTAS, LUZ, CÁMARAS Y CAFÉ SUMAN · B2 ON/OFF · B3 CERRAR', TS(11, '#bbb')).setOrigin(0.5); ui.bk.add(ui.bkHint);
  ui.hour = uText(24, 22, '12 AM', 30, '#fff', 0, 0);
  ui.night = uText(26, 58, 'NOCHE 1', 14, '#aab', 0, 0);
  ui.pow = uText(776, 22, '', 16, '#fff', 1, 0);
  ui.sue = uText(776, 70, 'SUEÑO', 12, '#c9b6ff', 1, 0);
  ui.camLbl = uText(40, 34, '', 20, '#bfffcf', 0, 0);
  ui.rec = uText(600, 34, '● REC', 16, '#ff4444', 1, 0);
  ui.camTime = uText(40, 60, '', 13, '#8fdc9f', 0, 0);
  ui.camHint = uText(668, 474, '', 10, '#8fdc9f', 0.5, 0.5);
  ui.noSig = uText(400, 260, 'SIN SEÑAL', 40, '#bfffcf', 0.5, 0.5);
  ui.noSig2 = uText(400, 304, 'esta sala no tiene energía · actívala en el TABLERO', 13, '#8fdc9f', 0.5, 0.5);
  ui.mapT = [];
  for (let i = 0; i < 6; i++) ui.mapT.push(uText(0, 0, i == CTRL ? 'TÚ' : 'CAM ' + (i + 1 - (i > CTRL)), 11, '#bfffcf'));
  ui.pr = []; for (let i = 0; i < 5; i++) ui.pr.push(uText(0, 0, '', 13, '#fff', 0.5, 0.5, KEYBOX));
  ui.camBar = uText(400, 580, '▲  CÁMARAS', 14, '#cfe', 0.5, 0.5, { backgroundColor: '#1f3b2acc', padding: { x: 70, y: 4 } });
  ui.bkBar = uText(16, 582, '▼ TABLERO', 12, '#ffd400', 0, 0.5, KEYBOX);
  ui.arrL = uText(16, 300, '◄', 30, '#fff'); ui.arrR = uText(784, 300, '►', 30, '#fff');
  ui.msg = uText(400, 140, '', 22, '#fff', 0.5, 0.5, { stroke: '#000', strokeThickness: 5, align: 'center' });
  ui.th = uText(400, 530, '', 14, '#1a1a22', 0.5, 1, { backgroundColor: '#e9e6f2', padding: { x: 10, y: 6 }, wordWrap: { width: 420 }, align: 'center', fontStyle: 'italic bold' });
  // "MIENTRAS TANTO..." comic panel
  ui.vig = S.add.container(820, 118); uC.add(ui.vig);
  ui.vig.add(S.add.rectangle(0, 0, 240, 158, 0xffffff).setOrigin(0));
  ui.vigIn = S.add.rectangle(5, 5, 230, 148, 0x333333).setOrigin(0); ui.vig.add(ui.vigIn);
  ui.vigDots = S.add.tileSprite(5, 5, 230, 148, 'noise').setOrigin(0).setAlpha(0.12); ui.vig.add(ui.vigDots);
  ui.vigImg = S.add.image(120, 118, 'pitcher0').setOrigin(0.5, 1).setScale(3.4); ui.vig.add(ui.vigImg);
  ui.vig.add(S.add.text(5, 5, 'MIENTRAS TANTO...', TS(11, '#111', { backgroundColor: '#ffd400', padding: { x: 5, y: 2 } })));
  ui.vigCap = S.add.text(120, 150, '', TS(11, '#fff', { backgroundColor: '#000000dd', padding: { x: 5, y: 3 }, wordWrap: { width: 216 }, align: 'center' })).setOrigin(0.5, 1); ui.vig.add(ui.vigCap);
  ui.vig.setAngle(-2).setVisible(false);
  // phone call
  ui.call = S.add.container(0, 0); uC.add(ui.call);
  ui.call.add(S.add.rectangle(20, 470, 760, 96, 0x05060a, 0.88).setOrigin(0).setStrokeStyle(2, 0x3a4150));
  ui.callImg = S.add.image(70, 556, 'rafa0').setOrigin(0.5, 1).setScale(3); ui.call.add(ui.callImg);
  ui.callName = S.add.text(128, 478, 'RAFA', TS(14, '#ffd400')); ui.call.add(ui.callName);
  ui.callTxt = S.add.text(128, 500, '', TS(15, '#e8e8f0', { wordWrap: { width: 630 }, lineSpacing: 4 })); ui.call.add(ui.callTxt);
  ui.call.add(S.add.text(770, 562, 'MANTÉN START PARA COLGAR', TS(10, '#667')).setOrigin(1, 1));
  ui.call.setVisible(false);
  ui.mug = S.add.container(400, H + 200); uC.add(ui.mug);
  { const m = S.add.graphics(); m.fillStyle(0xe8e2c8, 1); m.fillRoundedRect(-110, -130, 220, 260, 24); m.lineStyle(26, 0xe8e2c8, 1); m.strokeCircle(130, 0, 60); m.fillStyle(0x5a3416, 1); m.fillEllipse(0, -120, 190, 34); m.fillStyle(0xc0392b, 1); m.fillRect(-110, -20, 220, 40); ui.mug.add(m); ui.mug.add(S.add.text(0, 0, 'PLATANUS', TS(22, '#fff')).setOrigin(0.5)); }
  ui.mug.setVisible(false);
  ui.fade = uRect(0, 0, W, H, 0x000000, 0);
  ui.scr = S.add.image(400, 330, 'pitcherH').setScale(24).setVisible(false); uC.add(ui.scr);
  ui.scrT = uText(400, 520, '', 40, '#fff', 0.5, 0.5, { stroke: '#000', strokeThickness: 8 });
  ui.screen = S.add.container(0, 0); uC.add(ui.screen);
}
function clearScreen() { ui.screen.removeAll(true); }
function sAdd(o, c) { (c || ui.screen).add(o); return o; }
function sText(x, y, s, sz, col, ox, oy, extra, c) { return sAdd(S.add.text(x, y, s, TS(sz, col, extra)).setOrigin(ox ?? 0.5, oy ?? 0.5), c); }

// =====================================================================
// SAVE
// =====================================================================
function storage() {
  if (window.platanusArcadeStorage) return window.platanusArcadeStorage;
  return {
    async get(k) { try { const v = localStorage.getItem(k); return v == null ? { found: false } : { found: true, value: JSON.parse(v) }; } catch (e) { return { found: false }; } },
    async set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { } },
  };
}
async function loadSave() {
  try {
    const r = await storage().get(SAVE_KEY);
    if (r && r.found && r.value && typeof r.value.night === 'number') saved.night = clamp(r.value.night | 0, 1, 5), menuNight = saved.night;
    if (mode == 'title') goTitle();
  } catch (e) { }
}
function writeSave() { storage().set(SAVE_KEY, { night: saved.night }).catch(() => { }); }

// =====================================================================
// SCREENS
// =====================================================================
function setWorld(v) { wC.setVisible(v); }
function goTitle() {
  mode = 'title'; modeT = 0; G = null;
  setWorld(false); hideHud(); clearScreen();
  ui.titleFaces = [];
  ROLES.forEach((r, i) => { const im = sAdd(S.add.image(140 + i * 130, 360, r + '0').setScale(4.5).setOrigin(0.5, 1).setTint(0x111111)); ui.titleFaces.push(im); });
  ui.titleBeam = sAdd(S.add.image(400, 620, 'cone').setOrigin(0, 0.5).setBlendMode(Phaser.BlendModes.ADD).setScale(2.4, 2).setTint(0xfff0c0).setAlpha(0.35));
  ui.t1 = sText(400, 92, '5 NOCHES', 64, '#f2f2f2', 0.5, 0.5, { stroke: '#300', strokeThickness: 8 });
  sText(400, 152, 'EN PLATANUS', 40, '#ffd400', 0.5, 0.5, { stroke: '#300', strokeThickness: 6 });
  sText(400, 196, 'La hackathon terminó. Ellos no.', 15, '#99a');
  ui.tMenu = sText(400, 450, '', 20, '#fff');
  ui.tSub = sText(400, 484, '', 14, '#889');
  sText(400, 580, 'PLATANUS HACK 26 · SANTIAGO', 11, '#444');
}
function titleUpdate(dt) {
  modeT += dt;
  const lx = 400 + M.sin(modeT * 0.7) * 330;
  const ang = M.atan2(250 - 620, lx - 400);
  ui.titleBeam.setRotation(ang).setAlpha(0.3 + (M.random() < 0.05 ? -0.25 : 0));
  ui.titleFaces.forEach((im, i) => {
    const d = M.abs(angD(M.atan2(330 - 620, im.x - 400), ang));
    im.setTint(d < 0.12 ? 0xffffff : d < 0.22 ? 0x777777 : 0x161616);
    im.y = 360 + M.sin(modeT * 3 + i) * 2;
  });
  ui.t1.setAlpha(M.random() < 0.03 ? 0.3 : 1);
  if (saved.night > 1) {
    if (pr('L')) menuNight = M.max(1, menuNight - 1), SFX.blip(1, 0, 400);
    if (pr('R')) menuNight = M.min(saved.night, menuNight + 1), SFX.blip(1, 0, 500);
    ui.tMenu.setText('◄  NOCHE ' + menuNight + '  ►');
    ui.tSub.setText(menuNight == 1 ? 'START · NUEVA PARTIDA' : 'START · CONTINUAR');
  } else { ui.tMenu.setText('PRESIONA START'); ui.tSub.setText(''); }
  ui.tMenu.setAlpha(0.6 + M.sin(modeT * 4) * 0.4);
  if (pr('S') || pr('1')) { SFX.click(); if (menuNight == 1) goPaper(0); else goCard(menuNight); }
}
// Newspaper: intro (0) or ending (1). It spins in and slams onto the table.
function goPaper(kind) {
  mode = 'paper'; modeT = 0; ui.paperKind = kind;
  setWorld(false); hideHud(); clearScreen();
  sAdd(S.add.rectangle(0, 0, W, H, 0x0b0907).setOrigin(0));
  const pc = S.add.container(400, 300); sAdd(pc);
  const ser = { fontFamily: 'Georgia, serif' };
  const T = (x, y, s, sz, col, ox, oy, ex) => sText(x - 400, y - 300, s, sz, col, ox, oy, Object.assign({}, ser, ex || {}), pc);
  const Rr = (x, y, w, h, col) => sAdd(S.add.rectangle(x - 400, y - 300, w, h, col).setOrigin(0), pc);
  Rr(58, 18, 684, 566, 0xe9e2cc).setStrokeStyle(2, 0xb9b29c);
  T(400, 58, 'EL DIARIO DEL HACK', 44, '#151515');
  Rr(78, 86, 644, 3, 0x151515); Rr(78, 112, 644, 1, 0x151515);
  T(400, 100, kind ? 'SÁBADO 28 DE NOVIEMBRE, 2026  ·  SANTIAGO  ·  EDICIÓN DE LA MAÑANA' : 'DOMINGO 22 DE NOVIEMBRE, 2026  ·  SANTIAGO  ·  EDICIÓN ESPECIAL', 11, '#333');
  T(400, 148, kind ? 'HACKATHON CONCLUYE SIN INCIDENTES' : '¡GANADORES VIAJAN A SAN FRANCISCO!', 31, '#111', 0.5, 0.5, { fontStyle: 'bold' });
  T(400, 180, kind ? 'Recinto devuelto impecable tras cinco noches de guardia' : 'Rafael y Nacho acompañan al equipo campeón de Platanus Hack 26', 14, '#333', 0.5, 0.5, { fontStyle: 'italic' });
  Rr(78, 200, 340, 222, 0x77746a);
  const roles = kind ? ['rafa', 'guard', 'nacho'] : ['rafa', 'guard', 'nacho', 'suit'];
  roles.forEach((r, i) => sAdd(S.add.image(140 + i * (kind ? 110 : 84) - 400, 412 - 300, r + '0').setScale(3.4).setOrigin(0.5, 1).setTint(0x3a3a3a), pc));
  if (kind) ROLES.forEach((r, i) => sAdd(S.add.image(110 + i * 70 - 400, 330 - 300, r + '0').setScale(2).setOrigin(0.5, 1).setTint(0x5e5b52).setAlpha(0.55), pc));
  sAdd(S.add.tileSprite(78 - 400, 200 - 300, 340, 222, 'noise').setOrigin(0).setAlpha(0.15), pc);
  T(248, 434, kind ? 'Foto: el edificio, devuelto impecable. (¿quiénes son esos del fondo?)' : 'Foto: Rafa y Nacho junto al equipo campeón.', 11, '#333', 0.5, 0.5, { fontStyle: 'italic' });
  const body = kind
    ? 'Tras cinco noches de turno, el recinto de la hackathon fue entregado a sus dueños sin daños. El guardia de turno no quiso dar declaraciones, pero testigos aseguran que pidió "un café, por favor, el más grande que tengan".'
    : 'Tras 36 horas sin dormir, el equipo ganador de Platanus Hack 26 viaja a San Francisco junto a los organizadores. "Lo que pasa en la hackathon, se queda en la hackathon", declaró Rafa antes de embarcar. El recinto permanecerá cerrado cinco noches antes de ser devuelto.';
  T(436, 202, body, 15, '#1d1d1d', 0, 0, { wordWrap: { width: 286 }, lineSpacing: 5 });
  Rr(78, 448, 340, 3, 0x151515); Rr(436, 448, 286, 3, 0x151515);
  if (!kind) {
    Rr(78, 458, 340, 116, 0xf6f0dc).setStrokeStyle(2, 0x111111);
    T(248, 474, '— AVISO CLASIFICADO —', 13, '#111', 0.5, 0.5, { fontStyle: 'bold' });
    T(92, 488, 'SE BUSCA GUARDIA NOCTURNO. Turno de 12 a 6 AM, cinco noches. Café ilimitado. No se requiere experiencia. No abandonar la sala de control. Llamar a Rafa.', 13, '#222', 0, 0, { wordWrap: { width: 312 }, lineSpacing: 2 });
  } else T(248, 512, 'FIN', 48, '#151515', 0.5, 0.5, { fontStyle: 'bold' });
  T(436, 458, kind ? 'OTRAS NOTICIAS' : 'BREVES', 13, '#111', 0, 0, { fontStyle: 'bold' });
  T(436, 478, kind
    ? '• Sala de pitch: "todavía me falta una lámina".\n• Cocina reporta récord: 4.000 completos.\n• Mentora busca equipo para dar feedback.'
    : '• Cocina: récord de 3.000 completos servidos.\n• Equipo de código pide "cinco minutos más".\n• Se busca dueño de puf rojo en sala de siesta.', 12, '#222', 0, 0, { wordWrap: { width: 286 }, lineSpacing: 4 });
  pc.setScale(3).setAngle(-540).setAlpha(0);
  S.tweens.add({ targets: pc, scale: 1, angle: kind ? 1.5 : -1.5, alpha: 1, duration: 1100, ease: 'Cubic.easeOut', onComplete: () => { SFX.thud(); uiCam.shake(180, 0.008); } });
  ui.pPress = sText(400, 592, 'START · CONTINUAR', 12, '#888');
}
function paperUpdate(dt) {
  modeT += dt;
  ui.pPress.setAlpha(modeT > 1.6 ? 0.5 + M.sin(modeT * 4) * 0.5 : 0);
  if (modeT > 1.6 && anyPr()) { SFX.click(); if (ui.paperKind) goTitle(); else goCard(1); }
}
function goCard(n) {
  mode = 'card'; modeT = 0; ui.cardN = n;
  setWorld(false); hideHud(); clearScreen();
  sAdd(S.add.rectangle(0, 0, W, H, 0x000000).setOrigin(0));
  ui.c1 = sText(400, 270, '12:00 AM', 54, '#fff');
  ui.c2 = sText(400, 330, 'NOCHE ' + n, 26, '#aab');
  SFX.static(0.4);
}
function cardUpdate(dt) {
  modeT += dt;
  const a = modeT < 0.4 ? modeT / 0.4 : modeT > 2.2 ? M.max(0, 1 - (modeT - 2.2) / 0.4) : 1;
  ui.c1.setAlpha(a * (M.random() < 0.04 ? 0.4 : 1)); ui.c2.setAlpha(a);
  if (modeT > 2.6 || (modeT > 0.6 && pr('S'))) startNight(ui.cardN);
}

// =====================================================================
// NIGHT SETUP
// =====================================================================
function mkE(role, r, x, y, st) { return { role, r, x, y, st, fx: 1, t: 0, anim: 0, mv: 0, snd: rnd(0, 2), parts: [], shake: 0 }; }
function startNight(n) {
  clearScreen();
  const cf = NIGHTS[n - 1];
  G = {
    n, cf, hl: cf.hl, len: cf.hl * 6, t: 0, power: 100, sueno: n == 1 ? 0 : 8, out: 0,
    // view: 'office' | 'cams' | 'panel' (with flip animation va)
    view: 'office', va: 0, pan: 400, panV: 0, focus: 'N', camR: 1, bkSel: 1, statA: 0, light: 0, paCd: 0, lockT: 0,
    doors: { W: 0, N: 0, E: 0 }, shut: 0, piles: { W: 0, N: 0, E: 0 }, jamHold: 0,
    pw: { 0: 1, 1: 1, 2: 1, 3: 0, 5: 1 }, plug: -1, trip: 0, over: 0, resetH: 0, load: 0, cof: 0, cofT: 0, cofHold: 0, drink: 0, dp: { W: 0, N: 0, E: 0 }, lidY: 0,
    suit: 0, suitP: 0, ac: 0, acT: rnd(10, 20), blink: 0, blinkT: rnd(8, 14), ghost: null, ghostT: rnd(6, 12), noises: [], dread: 0, heartT: 0, msgT: 0,
    call: { i: -1, ch: 0, t: -1.5, skip: 0, set: CALLS[n - 1] }, flick: 0, scareT: rnd(14, 24), breathT: 3,
    th: null, thOnce: {}, vig: [], vigOn: null, vigOnce: {},
    E: {},
  };
  const E = G.E;
  E.pitcher = mkE('pitcher', 1, PITCH_HOME[0], PITCH_HOME[1], 'PITCH');
  E.pitcher.slide = 1; E.pitcher.bar = 1; E.pitcher.pause = 0; E.pitcher.lure = null;
  E.sleeper = mkE('sleeper', 3, SLEEP_HOME[0], SLEEP_HOME[1], 'SLEEP');
  E.sleeper.wakeAt = rnd(cf.wake[0], cf.wake[1]) * cf.hl; E.sleeper.anger = 0; E.sleeper.wm = 0;
  E.mentora = mkE('mentora', 0, 400, 300, 'WANDER'); E.mentora.cool = 0; E.mentora.goal = null;
  E.chef = mkE('chef', 0, CHEF_HOME[0], CHEF_HOME[1], 'COOK'); E.chef.cookT = cf.cook || 999;
  E.coder = mkE('coder', 2, CODER_HOME[0], CODER_HOME[1], 'TYPE'); E.coder.dis = 0; E.coder.plugT = cf.coder ? rnd(8, 14) : 1e9;
  mode = 'play'; modeT = 0;
  setWorld(true); showHud();
  if (AC) ambG.gain.setTargetAtTime(1, AC.currentTime, 0.5);
  setMsg('', 0);
}
const hourOf = (t) => (t / G.hl) | 0;
function clockStr(t) { const h = hourOf(t), mm = ((t % G.hl) / G.hl * 60) | 0; return (h == 0 ? 12 : h) + ':' + String(mm).padStart(2, '0') + ' AM'; }
const powered = (r) => !G.out && !G.trip && !!G.pw[r];
const CAP = 6; // breaker capacity in load units
// Everything you run takes load: lit rooms, closed doors, door light, cameras, coffee, the coder's theft.
function loadNow() {
  const g = G; let l = 0;
  for (const r of ROOMS5) if (g.pw[r]) l++;
  for (const d of ADOOR) if (g.doors[d]) l++;
  if (g.light) l++;
  if (g.view == 'cams') l++;
  if (g.cof == 1) l += 2;
  if (g.plug >= 0 && g.pw[g.plug]) l += 2;
  return l;
}
function trip() {
  const g = G;
  g.trip = 1; g.over = 0; g.doors = { W: 0, N: 0, E: 0 }; g.light = 0; if (g.cof == 1) g.cof = 0;
  if (g.view == 'cams') g.view = 'office';
  SFX.breaker(0); noise(1.2, 0.35, 'lowpass', 250, 0, 60);
  think('¡Saltó el automático! Las puertas se abrieron... (▼ TABLERO → PRINCIPAL → mantén B2)', 0, 4.5);
}

// ---- thoughts & vignettes ----
function think(s, once, dur) {
  const g = G;
  if (once) { if (g.thOnce[once]) return; g.thOnce[once] = 1; }
  g.th = { s, t: dur || 3.4 };
}
const VIG = {
  pitch_ask: ['pitcher', 1, 'SALA DE PITCH: "¿...siguiente diapositiva? ¿hola?"'],
  pitch_out: ['pitcher', 1, 'SALA DE PITCH: nadie le pasó la diapositiva. Busca público...'],
  pitch_dark: ['pitcher', 1, 'SALA DE PITCH: se apagó el proyector. "¿Hola? ¿Público?"'],
  sleep_wake: ['sleeper', 3, 'SALA DE SIESTA: ...alguien se despertó.'],
  sleep_mad: ['sleeper', -1, '¡EL DORMIDO SE ENOJÓ!'],
  chef_go: ['chef', 0, 'COCINA: ¡el bajón está listo! Va en camino...'],
  pile: ['chef', -1, 'Te dejaron platos en la puerta...'],
  coder_plug: ['coder', 2, 'SALA DE CÓDIGO: "solo necesito un enchufe más..."'],
  coder_go: ['coder', 2, 'SALA DE CÓDIGO: "¿quién me cortó la luz?"'],
  ment_see: ['mentora', -1, 'LA MENTORA miró a la cámara... "¡te vi! tengo un feedback"'],
  power: ['coder', 4, 'QUEDA POCA ENERGÍA...'],
};
function vignette(k, skip) {
  const g = G;
  if (skip || (g.view == 'cams' && g.camR == VIG[k][1])) return; // you are already watching it
  g.vigOnce[k] = (g.vigOnce[k] || 0) + 1;
  if (g.vig.length < 3 && !(g.vigOn && g.vigOn.k == k)) g.vig.push(k);
}
function updateVignette(dt) {
  const g = G;
  if (!g.vigOn && g.vig.length) {
    const k = g.vig.shift(), [, room, cap] = VIG[k];
    g.vigOn = { k, t: 0 };
    ui.vigIn.fillColor = room >= 0 ? RBG[room] : 0x400010;
    ui.vigImg.setTint(room == 4 ? 0x333333 : 0xffffff);
    ui.vigCap.setText(cap);
    ui.vig.setVisible(true).setX(820);
    SFX.sting();
  }
  const v = g.vigOn;
  if (!v) return;
  v.t += dt;
  ui.vig.setX(v.t < 0.35 ? lerp(820, 548, v.t / 0.35) : v.t > 3.4 ? lerp(548, 820, (v.t - 3.4) / 0.35) : 548);
  const fr = SPRF[VIG[v.k][0]];
  ui.vigImg.setTexture(fr[((v.t * 5) | 0) % fr.length]);
  ui.vigDots.setTilePosition(rnd(0, 100), rnd(0, 100));
  if (v.t > 3.75) { g.vigOn = null; ui.vig.setVisible(false); }
}

// =====================================================================
// MAIN UPDATE
// =====================================================================
function update(time, delta) {
  const dt = M.min(0.05, delta / 1000);
  if (FX) FX.t += dt;
  if (mode == 'title') titleUpdate(dt);
  else if (mode == 'paper') paperUpdate(dt);
  else if (mode == 'card') cardUpdate(dt);
  else if (mode == 'play') { const ts = window.FNAP_TS || 1; for (let i = 0; i < ts && mode == 'play'; i++) playUpdate(dt); }
  else if (mode == 'scream') screamUpdate(dt);
  else if (mode == 'lose') loseUpdate(dt);
  else if (mode == 'win') winUpdate(dt);
  if (FX && mode != 'play' && mode != 'scream') { FX.nv = 0; FX.no = mode == 'title' ? 0.06 : 0.02; FX.ab = 0.2; FX.dk = 0.2; FX.wp = 0; }
  for (const k in pressed) pressed[k] = 0;
}

function playUpdate(dt) {
  const g = G;
  g.t += dt; modeT += dt;
  if (g.t >= g.len) return winNight();
  updateCall(dt);
  updateSuit(dt);
  input(dt);
  updateResources(dt);
  if (mode != 'play') return;
  updateBlink(dt);
  aiPitcher(dt); aiSleeper(dt); aiMentora(dt); aiChef(dt); aiCoder(dt);
  updateGhost(dt);
  g.acT -= dt; if (g.acT <= 0) { g.acT = rnd(14, 30); g.ac = 1; }
  g.ac = M.max(0, g.ac - dt * 0.4);
  if (mode != 'play') return;
  checkAttacks();
  updateDoom(dt);
  if (mode != 'play') return;
  audioCues(dt);
  updateThoughts(dt);
  updateVignette(dt);
  g.noises = g.noises.filter((n) => g.t - n.t < 6);
  render(dt);
}

// ---- Phone call ----
function updateCall(dt) {
  const c = G.call;
  if (c.i >= c.set[2].length) return;
  c.t += dt;
  if (c.i == -1) {
    if (c.t > 0 && !c.rang) { c.rang = 1; SFX.ring(); }
    if (c.t > 2.6) { c.i = 0; c.ch = 0; c.t = 0; }
    return;
  }
  if (hd('S')) { c.skip += dt; if (c.skip > 0.7) { c.i = c.set[2].length; SFX.click(); return; } } else c.skip = 0;
  const line = c.set[2][c.i];
  const prevCh = c.ch | 0;
  c.ch = M.min(line.length, c.ch + dt * 34);
  if ((c.ch | 0) != prevCh && (c.ch | 0) % 2 == 0 && line[c.ch | 0] != ' ') SFX.blip(1, 0, c.set[1] == 'nacho' ? rnd(180, 300) : rnd(320, 520));
  if (c.ch >= line.length) { c.hold = (c.hold || 0) + dt; if (c.hold > 1.6 + line.length * 0.025) { c.i++; c.ch = 0; c.hold = 0; if (c.i >= c.set[2].length && G.n == 5) SFX.static(1.2); } }
}
const callOn = () => { const c = G.call; return c.i < c.set[2].length && (c.i >= 0 || c.t > 0); };

// ---- Suit ----
function updateSuit(dt) {
  const g = G;
  if (pr('4') && g.view == 'office' && g.n >= 3) {
    if (g.suitP == 0 || g.suitP == 1) { g.suitDir = g.suit ? -1 : 1; SFX.zip(); HINT.suit++; if (!g.suit) think('Hace calor aquí adentro... y da sueño.', 'suit'); }
  }
  if (g.suitDir) {
    g.suitP = clamp(g.suitP + g.suitDir * dt, 0, 1);
    if (g.suitP == 1 && g.suitDir > 0) { g.suit = 1; g.suitDir = 0; }
    if (g.suitP == 0 && g.suitDir < 0) { g.suit = 0; g.suitDir = 0; }
  }
}

// =====================================================================
// INPUT — office (look around, doors, lights, coffee), cameras, breaker board
// =====================================================================
function openView(v) { const g = G; g.view = v; g.statA = v == 'cams' ? 0.9 : 0; SFX.cam(); if (v == 'cams') HINT.cams++; if (v == 'panel') HINT.panel++; }
function input(dt) {
  const g = G;
  const dir = (hd('R') ? 1 : 0) - (hd('L') ? 1 : 0);
  const office = g.view == 'office';
  g.panV = lerp(g.panV, office ? dir * 820 : 0, 1 - M.pow(0.0008, dt));
  g.pan = clamp(g.pan + g.panV * dt, 0, PW - W);
  if (dir && office) HINT.look += dt / 1.5;
  let best = null, bd = 260;
  for (const d of ADOOR) { const dd = M.abs(OCENTER[d] - (g.pan + 400)); if (dd < bd) { bd = dd; best = d; } }
  if (M.abs(COFFEE_X - (g.pan + 400)) < 80) best = 'C';
  g.focus = best;
  g.va = clamp(g.va + (office ? -dt : dt) * 5, 0, 1);
  g.light = 0; g.clicking = 0;
  if (office) {
    if (g.drink > 0) return; // drinking: cup in front of your face
    if (pr('U') && !g.out && !g.trip) return openView('cams');
    if (pr('D') && !g.out) return openView('panel');
    if (g.focus == 'C') { coffeeInput(dt); return; }
    g.light = hd('1') && !g.out && !g.suit && g.focus ? 1 : 0;
    if (pr('1') && g.light) { SFX.light(); HINT.light++; }
    if (g.focus && g.piles[g.focus] >= 3) {
      // jammed door: hold B2 to eat the plates and clear it
      if (hd('2')) { g.jamHold += dt; if (g.jamHold > 1.4) { g.sueno += 8 * g.piles[g.focus]; g.piles[g.focus] = 0; g.jamHold = 0; SFX.eat(); setMsg('*ÑAM*  +SUEÑO', 1.2); } }
      else g.jamHold = 0;
    } else if (pr('2') && g.focus) { toggleDoor(g.focus); HINT.door++; }
    return;
  }
  if (g.out) { g.view = 'office'; return; }
  if (g.view == 'cams') {
    const [c, r] = RC[g.camR];
    if (pr('3') || (pr('D') && (r == 1 || c == 1))) { g.view = 'office'; SFX.cam(); return; }
    let nc = c, nr = r;
    if (pr('L')) nc--; if (pr('R')) nc++; if (pr('U')) nr--; if (pr('D')) nr++;
    nc = clamp(nc, 0, 2); nr = clamp(nr, 0, 1);
    let n = nr * 3 + nc;
    if (n == CTRL) n = pr('L') ? 3 : pr('R') ? 5 : g.camR;
    if (n != g.camR) { g.camR = n; SFX.cam(); g.statA = 0.85; HINT.camnav++; }
    if (pr('1')) {
      if (g.paCd <= 0 && g.power > 3 && !g.trip) { g.paCd = 10; g.power -= 2; addNoise(g.camR, 400, 300, 1.2, 'pa'); SFX.pa(); SFX.applause(0.25, 0); setMsg('ALTAVOZ: ¡APLAUSOS EN ' + RNAME[g.camR] + '!', 1.6); HINT.pa++; think('Aplausos grabados... quien los escuche va a ir para allá.', 'pa1', 3.5); }
      else SFX.err();
    }
    // the remote clicker only works through the pitch room camera, with power
    g.clicking = hd('2') && g.camR == 1 && powered(1) && g.cf.pitch;
    if (g.clicking) {
      const p = g.E.pitcher;
      p.bar = M.min(1, p.bar + dt / 2.4); HINT.slide += dt / 2;
      g.clickT = (g.clickT || 0) - dt;
      if (g.clickT <= 0) { g.clickT = 0.45; p.slide++; SFX.click(); }
    }
    return;
  }
  // breaker board
  const [c, r] = RC[g.bkSel];
  if (pr('3') || (pr('U') && r == 0)) { g.view = 'office'; SFX.cam(); return; }
  let nc = c, nr = r;
  if (pr('L')) nc--; if (pr('R')) nc++; if (pr('U')) nr--; if (pr('D')) nr++;
  nc = clamp(nc, 0, 2); nr = clamp(nr, 0, 1);
  let n = nr * 3 + nc;
  if (n != g.bkSel) { g.bkSel = n; SFX.blip(0.6, 0, 300); g.resetH = 0; }
  if (g.bkSel == CTRL) {
    if (g.trip && hd('2')) { g.resetH += dt; if (g.resetH > 1.5) { g.trip = 0; g.resetH = 0; SFX.breaker(1); SFX.ding(); think('Volvió la luz.', 0, 2); } }
    else g.resetH = 0;
  } else if (pr('2')) setPower(g.bkSel, !g.pw[g.bkSel]);
}
// Coffee: look at the machine, hold B1 to brew, wait, press B1 to drink.
function coffeeInput(dt) {
  const g = G;
  if (g.cof == 0) {
    if (hd('1') && !g.out && !g.trip) { g.cofHold += dt; if (g.cofHold > 0.6) { g.cof = 1; g.cofT = 4; g.cofHold = 0; g.power -= 1.5; SFX.coffee(); addNoise(CTRL, 400, 400, 0.85, 'coffee'); } }
    else g.cofHold = 0;
  } else if (g.cof == 2 && pr('1')) { g.cof = 0; g.drink = 1.3; HINT.coffee++; SFX.eat(); }
}
function setPower(r, on) {
  const g = G;
  g.pw[r] = on ? 1 : 0;
  SFX.breaker(on);
  if (!on && (r == g.plug || r == 2)) coderAngry(r);
  if (!on && r == 1) think('Sin proyector... el de la sala de pitch se va a quedar sin presentación.', 'pdark');
  if (on && r == 3) think('Si dejo la luz de la siesta prendida... lo voy a despertar.', 'siestaOn');
}
function toggleDoor(d) {
  const g = G;
  if (g.out) { SFX.err(); think('No hay energía... las puertas no responden.', 'outdoor'); return; }
  if (g.trip) { SFX.err(); think('Sin corriente: saltó el automático. Hay que reiniciarlo en el TABLERO.', 0, 3); return; }
  if (d == 'N') { g.doors.N = g.doors.N ? 0 : 1; SFX.shutter(0); }
  else { g.doors[d] = g.doors[d] ? 0 : 1; SFX.door(d == 'W' ? -0.7 : 0.7); }
}
const doorClosed = (d) => G.dp[d] > 0.5;

// ---- Resources ----
function updateResources(dt) {
  const g = G;
  for (const d of ADOOR) g.dp[d] = clamp(g.dp[d] + (g.doors[d] ? dt : -dt) / (d == 'N' ? 1.2 : 0.45), 0, 1);
  g.shut = g.dp.N;
  if (g.cof == 1) { g.cofT -= dt; if (g.cofT <= 0) { g.cof = 2; SFX.ding(); think('Café listo. (mira la cafetera y presiona B1)', 'cofready'); } }
  if (g.drink > 0) { g.drink -= dt; if (g.drink <= 0) { g.sueno = M.max(0, g.sueno - 60); setMsg('☕  -SUEÑO', 1.2); think('Ahh... mucho mejor.', 'coffee1'); } }
  for (const d of ADOOR) if (g.piles[d] >= 3) { if (d == 'N') g.doors.N = 0; else g.doors[d] = 0; }
  g.load = g.trip ? 0 : loadNow();
  if (!g.out && !g.trip && g.load > CAP) {
    // overload: a couple of seconds of alarm to undo it, then the breaker trips
    g.over += dt;
    if (((g.over * 3) | 0) != (((g.over - dt) * 3) | 0)) tone(1200, 0.12, 'square', 0.1);
    think('¡Sobrecarga! Apaga algo o salta el automático...', 'overload', 3);
    if (g.over > 1.6) trip();
  } else g.over = 0;
  if (!g.out) {
    const u = g.cf.drain + (g.trip ? 0 : g.load * 0.045);
    g.use = u;
    g.power -= u * dt;
    if (g.power < 20 && !g.vigOnce.power) vignette('power');
    if (g.power <= 0) powerOut();
  }
  g.paCd -= dt;
  g.sueno += dt * (100 / g.cf.sue) * (g.suit ? 2.4 : 1);
  if (g.sueno > 50 && !g.yawn1) { g.yawn1 = 1; SFX.yawn(); think('*bostezo* Se me cierran los ojos... necesito un café.', 'sleepy'); }
  if (g.sueno > 75 && !g.yawn2) { g.yawn2 = 1; SFX.yawn(); think('No... no te duermas. CAFÉ.', 'sleepy2'); }
  if (g.sueno < 40) g.yawn1 = g.yawn2 = 0;
  if (g.sueno >= 100) return lose(g.suit ? 'springlock' : 'sleep');
}
function powerOut() {
  const g = G;
  g.power = 0; g.out = 1; g.doors = { W: 0, N: 0, E: 0 }; g.view = 'office'; g.light = 0; g.cof = 0;
  SFX.err(); noise(2, 0.4, 'lowpass', 200, 0, 60);
  const c = g.E.coder; c.st = 'HUNT'; c.huntT = 0;
  think('No... no, no, no. Se cortó la luz.', 0, 3);
}
function updateBlink(dt) {
  const g = G;
  if (g.blink > 0) { g.blink -= dt; return; }
  if (g.sueno < 30) return;
  g.blinkT -= dt;
  if (g.blinkT <= 0) {
    const s = (g.sueno - 30) / 70;
    g.blink = lerp(0.14, 0.6, s);
    g.blinkDur = g.blink;
    g.blinkT = lerp(9, 2.2, s) * rnd(0.7, 1.3);
  }
}
const blinking = () => G.blink > 0;
function addNoise(r, x, y, loud, kind) { G.noises.push({ r, x, y, loud, kind, t: G.t }); }
function setMsg(s, t) { ui.msg.setText(s); G.msgT = t; }
function updateThoughts(dt) {
  const g = G;
  if (g.th) { g.th.t -= dt; if (g.th.t <= 0) g.th = null; }
  const s = g.E.sleeper, p = g.E.pitcher;
  if (callOn()) return;
  if (g.cf.pitch && p.st == 'PITCH' && p.bar < 0.35 && !(g.view == 'cams' && g.camR == 1)) think('El de pitch se está poniendo nervioso... (cámara 2, mantén B2)', 'pask', 4);
  if (g.view == 'office') {
    const bd = blindDoor(s);
    if (bd && s.st == 'WANDER' && !doorClosed(bd)) think('Escucho ronquidos en la puerta... no prendas la luz. Ya se irá.', 'sleepdoor', 3.6);
  }
  if (g.view == 'cams' && g.camR == 3 && powered(3) && s.st == 'SLEEP') think('Está durmiendo. Si dejo la luz prendida mucho rato... se va a despertar.', 'sleepcam', 4);
  if (g.plug >= 0 && g.pw[g.plug]) think('La energía baja muy rápido... ¿alguien se colgó de un circuito? (TABLERO)', 'plugthink', 4);
}

// ---- Perception ----
// 0 = not seen, 1 = seen (camera / dim office), 2 = door light right on it
function seen(e) {
  const g = G;
  if (blinking()) return 0;
  if (g.view == 'cams') return g.va >= 1 && g.camR == e.r && powered(e.r) && !blindDoor(e) ? 1 : 0;
  if (g.view != 'office') return 0;
  const fi = CDOOR[g.focus] ? CDOOR[g.focus].a : -1;
  if (e.r == CTRL) {
    const a = M.atan2(e.x - CHAIR[0], CHAIR[1] - e.y), sec = a < -0.55 ? 0 : a > 0.55 ? 2 : 1;
    if (g.light && sec == fi) return 2;
    return dist(e.x, e.y, SEAT[0], SEAT[1]) < 200 ? 1 : 0;
  }
  const bd = blindDoor(e);
  if (bd && g.light && bd == g.focus && !doorClosed(bd)) return 2;
  return 0;
}
function blockedSet(e) {
  const g = G, b = new Set();
  for (const d of ADOOR) if (doorClosed(d)) b.add(ek(CTRL, CDOOR[d].adj));
  const s = g.E.sleeper;
  if (e && e != s && s.st == 'SLEEP' && s.door) b.add(s.door);
  return b;
}
// paths that avoid crossing the control room (for wandering, not hunting)
function wb(e) { const b = blockedSet(e); for (const d of ADOOR) b.add(ek(CTRL, CDOOR[d].adj)); return b; }
function go(e, r, x, y, sp, dt, blk) {
  e.mv = 0;
  if (sp <= 0) return 0;
  if (e.r != r) {
    const p = bfs(e.r, r, blk || blockedSet(e));
    if (!p) { e.stuck = 1; return -1; }
    e.stuck = 0;
    const n = p[1], d = dirTo(e.r, n), dp = DP[d];
    if (walk(e, dp[0], dp[1], sp, dt)) {
      const o = DP[OPP[d]];
      e.r = n; e.x = o[0] + (OPP[d] == 'W' ? 6 : OPP[d] == 'E' ? -6 : 0); e.y = o[1] + (OPP[d] == 'N' ? 6 : OPP[d] == 'S' ? -6 : 0);
    }
    return 0;
  }
  return walk(e, x, y, sp, dt);
}
function walk(e, x, y, sp, dt) {
  let tx = x, ty = y;
  if (segBlocked(e.r, e.x, e.y, x, y) && dist(e.x, e.y, 400, 300) > 10) { tx = 400; ty = 300; }
  const d = dist(e.x, e.y, tx, ty), s = sp * dt;
  e.mv = 1;
  if (M.abs(tx - e.x) > 2) e.fx = tx > e.x ? 1 : -1;
  if (d <= s) { e.x = tx; e.y = ty; return tx == x && ty == y ? 1 : 0; }
  e.x += (tx - e.x) / d * s; e.y += (ty - e.y) / d * s;
  return 0;
}
// everyone who hunts you heads for the seat in front of your desk
const goYou = (e, sp, dt) => go(e, CTRL, SEAT[0], SEAT[1], sp, dt);
const atYou = (e) => e.r == CTRL && dist(e.x, e.y, SEAT[0], SEAT[1]) < 44;
// wait at the nearest closed door when every way in is shut
function waitAtDoor(e, sp, dt) {
  if (!e.kd) { let best = null, bd = 99; for (const d of ADOOR) { const p = bfs(e.r, CDOOR[d].adj, blockedSet(e)); if (p && p.length < bd) { bd = p.length; best = d; } } e.kd = best || 'N'; }
  const b = blindPt(e.kd);
  return go(e, CDOOR[e.kd].adj, b[0], b[1], sp, dt) == 1;
}

// =====================================================================
// AI
// =====================================================================
function aiPitcher(dt) {
  const g = G, p = g.E.pitcher, m = g.E.mentora;
  p.anim += dt;
  const audience = g.cf.mentora && m.r == 1 && m.st == 'WANDER' && m.y > 230 && powered(1);
  if (p.st == 'PITCH') {
    go(p, 1, PITCH_HOME[0] + M.sin(g.t * 0.4) * 70, PITCH_HOME[1], 22, dt);
    if (!g.cf.pitch) return; // night 1: he just pitches to the empty room
    if (!powered(1)) { p.st = 'SEARCH'; p.bar = 0; p.kd = null; vignette('pitch_dark'); return; }
    // his patience runs out unless someone keeps passing slides (or listens to him)
    const was = p.bar;
    if (!audience && !g.clicking) p.bar -= dt / g.cf.pat;
    if (was >= 0.35 && p.bar < 0.35) vignette('pitch_ask', g.n > 3);
    p.shake = p.bar < 0.35 ? (0.35 - p.bar) * 4 : 0;
    if (p.bar <= 0) { p.bar = 0; p.st = 'SEARCH'; p.shake = 0; p.kd = null; vignette('pitch_out'); }
  } else if (p.st == 'SEARCH') {
    if (g.clicking && p.bar > 0.3) { p.st = 'RETURN'; setMsg('"¡AH! ¡SIGUIENTE DIAPOSITIVA!"', 1.4); }
    if (p.lure) { p.lure.t -= dt; go(p, p.lure.r, 400, 320, g.cf.pfast * 0.7, dt); if (p.lure.t <= 0) p.lure = null; return; }
    if (g.suit) { p.mv = 0; return; } // a mascot is not an audience
    const sp = seen(p) ? 30 : g.cf.pfast;
    if (goYou(p, sp, dt) == -1) waitAtDoor(p, sp, dt); else p.kd = null;
    if (audience) p.st = 'RETURN';
  } else if (p.st == 'RETURN') {
    if (go(p, 1, PITCH_HOME[0], PITCH_HOME[1], 95, dt, p.r == CTRL ? null : wb(p)) == 1) { p.st = 'PITCH'; p.bar = M.max(p.bar, 0.5); }
  }
  for (const n of g.noises) if (n.kind == 'pa' && !n.pd && p.st == 'SEARCH' && gdist(n.r, p.r) <= 2) { n.pd = 1; p.lure = { r: n.r, t: 7 }; } // applause = an audience
}
function aiSleeper(dt) {
  const g = G, s = g.E.sleeper;
  s.anim += dt;
  const sv = seen(s);
  if (s.st == 'SLEEP') {
    s.mv = 0;
    // a lit siesta room slowly wakes him up; darkness lets him settle back
    if (powered(s.r) && s.r == 3) s.wm += dt; else s.wm = M.max(0, s.wm - dt * 0.3);
    s.shake = s.wm / g.cf.sw;
    if (s.wm >= g.cf.sw) wakeSleeper(s);
    if (g.t > s.wakeAt && !s.slept) { s.slept = 1; wakeSleeper(s); }
    for (const n of g.noises) if (!n.sd && n.t > (s.sleptAt || 0) && ((n.r == s.r && n.loud >= 1) || (gdist(n.r, s.r) <= 1 && n.loud >= 0.8))) { n.sd = 1; s.wm += n.r == s.r ? 99 : g.cf.sw * 0.45; }
    if (g.cf.mentora && g.E.mentora.r == s.r && dist(g.E.mentora.x, g.E.mentora.y, s.x, s.y) < 60 && g.E.mentora.st == 'WANDER') wakeSleeper(s);
    return;
  }
  if (s.st == 'WANDER') {
    if (sv == 2) s.anger += dt; else s.anger = M.max(0, s.anger - dt * 0.6);
    s.shake = s.anger / 1.5;
    if (s.anger >= 1.5) { s.st = 'ANGRY'; s.t = 11; s.kd = null; tone(140, 0.5, 'sawtooth', 0.2, panOf(s), 70); vignette('sleep_mad'); return; }
    const nz = g.noises.filter((n) => g.t - n.t < 5 && gdist(n.r, s.r) <= 2).sort((a, b) => b.t - a.t)[0];
    if (nz && nz !== s.lastN) { s.lastN = nz; s.goal = nz.r == CTRL ? [CDOOR.W.adj, ...blindPt('W')] : [nz.r, nz.x, nz.y]; s.wait = rnd(3, 6); }
    if (!s.goal) {
      if (M.random() < 0.4) { const d = pick(ADOOR), b = blindPt(d); s.goal = [CDOOR[d].adj, b[0], b[1]]; s.wait = rnd(8, 14); }
      else { const r = pick(ROOMS5), sp = pick(SPOTS[r]); s.goal = [r, sp[0], sp[1]]; s.wait = rnd(3, 7); }
    }
    if (go(s, s.goal[0], s.goal[1], s.goal[2], 44, dt, wb(s)) == 1) { s.mv = 0; s.wait -= dt; if (s.wait <= 0) s.goal = null; }
    if (s.stuck) s.goal = null;
    return;
  }
  if (s.st == 'ANGRY') {
    s.t -= dt; s.shake = 1.4;
    if (goYou(s, 165, dt) == -1) { if (waitAtDoor(s, 165, dt)) s.t -= dt * 2; }
    if (s.t <= 0) fallAsleep(s);
  }
}
function wakeSleeper(s) { s.st = 'WANDER'; s.goal = null; s.anger = 0.3; s.door = null; s.wm = 0; s.shake = 0; tone(300, 0.3, 'triangle', 0.1, panOf(s), 500); vignette('sleep_wake'); }
function fallAsleep(s) {
  s.st = 'SLEEP'; s.anger = 0; s.shake = 0; s.door = null; s.wm = 0; s.sleptAt = G.t; s.slept = 1;
  for (const d of DIRS) { const p = DP[d], n = nb(s.r, d); if (n >= 0 && dist(s.x, s.y, p[0], p[1]) < 90) s.door = ek(s.r, n); }
}
// LA MENTORA: she wants to give feedback to whoever is working. If you watch
// her on camera (or light her at your door) she notices you and comes for your
// office. Don't stare; lure her away with applause on the speaker.
function aiMentora(dt) {
  const g = G, m = g.E.mentora;
  m.anim += dt;
  const active = g.cf.mentora;
  if (m.st == 'DOOM') return;
  if (m.st == 'COOL') { m.cool -= dt; if (m.cool <= 0) m.st = 'WANDER'; }
  if (active && !g.suit) {
    const watched = (g.view == 'cams' && g.va >= 1 && g.camR == m.r && powered(m.r) && !blindDoor(m) && !blinking()) || seen(m) == 2;
    m.eye = watched ? M.min(1.6, (m.eye || 0) + dt) : M.max(0, (m.eye || 0) - dt * 0.25);
    if (m.st == 'WANDER' && m.eye > 1.2) { m.st = 'STALK'; m.kd = null; m.kt = 0; m.knocked = 0; vignette('ment_see'); SFX.murmur(1, panOf(m)); }
    for (const n of g.noises) if (n.kind == 'pa' && !n.md && gdist(n.r, m.r) <= 2) { n.md = 1; m.st = 'WANDER'; m.eye = 0; m.goal = [n.r, 400, 330]; m.wait = rnd(10, 15); }
  }
  if (m.st == 'STALK') {
    if (g.suit) { m.st = 'COOL'; m.cool = 8; return; }
    if (goYou(m, g.cf.mspd * 1.25, dt) == -1) {
      if (waitAtDoor(m, g.cf.mspd, dt)) {
        m.kt += dt;
        if (m.kt > 0.1 && !m.knocked) { m.knocked = 1; SFX.knock(panOf(m)); think('"¿Puedo pasar? Es un feedback cortito..."', 0, 3); }
        if (m.kt > 12) { m.st = 'COOL'; m.cool = 12; m.knocked = 0; m.goal = null; }
      }
    } else { m.kd = null; m.kt = 0; m.knocked = 0; }
    return;
  }
  if (!m.goal) {
    const lit = ROOMS5.filter((r) => powered(r));
    const r = lit.length && M.random() < 0.8 ? pick(lit) : pick(ROOMS5), sp = pick(SPOTS[r]);
    m.goal = [r, sp[0], sp[1]]; m.wait = r == 1 ? rnd(12, 22) : rnd(5, 10);
  }
  const res = go(m, m.goal[0], m.goal[1], m.goal[2], g.cf.mspd, dt, wb(m));
  if (res == 1) { m.mv = 0; m.wait = (m.wait || 3) - dt; if (m.wait <= 0) m.goal = null; }
  if (res == -1 || m.stuck) m.goal = null;
  if (!active) return;
  const c = g.E.coder;
  if (g.cf.coder && c.r == m.r && dist(c.x, c.y, m.x, m.y) < 90 && c.dis <= 0) { c.dis = 15; m.goal = [m.r, m.x, m.y]; m.wait = 8; }
}
function aiChef(dt) {
  const g = G, c = g.E.chef;
  c.anim += dt;
  if (!g.cf.cook) { go(c, 0, CHEF_HOME[0] + M.sin(g.t) * 40, CHEF_HOME[1], 30, dt); return; }
  if (c.st == 'COOK') {
    go(c, 0, CHEF_HOME[0] + M.sin(g.t) * 40, CHEF_HOME[1], 30, dt);
    c.cookT -= dt * (powered(0) ? 1 : 0.4); // cooking in the dark is slower
    if (c.cookT <= 0) { c.st = 'DELIVER'; c.kd = null; c.kt = 0; c.knocked = 0; SFX.bell(0.5, panOf(c)); vignette('chef_go'); }
  } else if (c.st == 'DELIVER') {
    for (const n of g.noises) if (n.kind == 'pa' && !n.cd && gdist(n.r, c.r) <= 2) { n.cd = 1; c.lure = n.r; }
    if (c.lure != null) { if (go(c, c.lure, 400, 320, 70, dt) == 1) { c.lure = null; c.st = 'RETURN'; SFX.plates(0.5, panOf(c)); } return; }
    if (goYou(c, 62, dt) == -1) {
      if (waitAtDoor(c, 62, dt)) {
        c.kt = (c.kt || 0) + dt;
        if (c.kt > 0.1 && !c.knocked) { c.knocked = 1; SFX.knock(panOf(c)); think('Están golpeando la puerta...', 'knock'); }
        if (c.kt > 3) { g.piles[c.kd] = M.min(3, g.piles[c.kd] + 1); SFX.plates(0.8, panOf(c)); vignette('pile'); if (g.piles[c.kd] >= 3) think('Platos atascando la puerta... no cierra. Si mantengo B2 me los como.', 'jam', 4); c.st = 'RETURN'; }
      }
    } else { c.kd = null; c.kt = 0; c.knocked = 0; }
  } else if (c.st == 'RETURN') {
    if (go(c, 0, CHEF_HOME[0], CHEF_HOME[1], 70, dt, wb(c)) == 1) { c.st = 'COOK'; c.cookT = g.cf.cook * rnd(0.8, 1.2); }
  }
}
// The coder steals power from a lit circuit. Cut it (or his own room) and he comes for you.
function coderAngry(r) {
  const c = G.E.coder;
  if (c.st == 'HUNT' || c.st == 'COMPLAIN') return;
  c.st = 'WAIT'; c.t = rnd(1.5, 3); c.kd = null; c.kt = 0;
  G.plug = -1;
}
function aiCoder(dt) {
  const g = G, c = g.E.coder;
  c.anim += dt;
  if (c.dis > 0 && c.st != 'HUNT') { c.dis -= dt; c.mv = 0; return; }
  if (c.st == 'TYPE') {
    go(c, 2, CODER_HOME[0], CODER_HOME[1], 40, dt);
    if (!g.cf.coder) return;
    c.plugT -= dt;
    const opts = ROOMS5.filter((r) => r != 2 && powered(r));
    if (c.plugT <= 0 && opts.length && g.plug < 0) { c.st = 'PLUG'; c.target = pick(opts); }
    return;
  }
  if (c.st == 'PLUG') {
    if (!powered(c.target)) { c.st = 'BACK'; return; }
    const o = OUTLET[c.target];
    if (go(c, c.target, o[0], o[1], 70, dt, wb(c)) == 1) { c.t = (c.t || 0) + dt; if (c.t > 2) { c.t = 0; g.plug = c.target; c.st = 'BACK'; SFX.type(0.8, panOf(c)); vignette('coder_plug'); } }
    return;
  }
  if (c.st == 'BACK') { if (go(c, 2, CODER_HOME[0], CODER_HOME[1], 70, dt, wb(c)) == 1) { c.st = 'TYPE'; c.plugT = g.cf.coder * rnd(0.8, 1.2); } return; }
  if (c.st == 'WAIT') { c.mv = 0; c.t -= dt; if (c.t <= 0) { c.st = 'COMPLAIN'; vignette('coder_go'); } return; }
  if (c.st == 'COMPLAIN') {
    if (goYou(c, 82, dt) == -1) {
      if (waitAtDoor(c, 82, dt)) {
        c.kt += dt;
        if (c.kt > 0.1 && !c.knocked) { c.knocked = 1; SFX.knock(panOf(c)); }
        if (c.kt > 6) { c.st = 'BACK'; c.knocked = 0; }
      }
    } else { c.kd = null; c.kt = 0; c.knocked = 0; }
    return;
  }
  if (c.st == 'HUNT') {
    c.huntT += dt;
    if (c.r == CTRL) {
      c.mv = 0;
      if (!c.strike) c.strike = rnd(6, 16);
      c.strikeT = (c.strikeT || 0) + dt;
      if (c.strikeT > c.strike) lose('coder');
      return;
    }
    go(c, CTRL, 400, 140, 60, dt);
  }
}
function updateGhost(dt) {
  const g = G;
  if (g.ghost) { g.ghost.t -= dt; if (g.ghost.t <= 0 || g.ghost.seenT > 0.3) g.ghost = null; return; }
  if (g.sueno < 70) return;
  g.ghostT -= dt;
  if (g.ghostT <= 0) {
    g.ghostT = rnd(4, 9);
    const r = g.view == 'cams' ? g.camR : pick([3, 1, 5]);
    const sp = pick(SPOTS[r]);
    g.ghost = { r, x: sp[0], y: sp[1], t: rnd(1.5, 3), seenT: 0, door: g.view == 'office' ? pick(ADOOR) : null };
    if (g.view == 'cams') g.statA = 0.6;
    think('¿Qué fue eso? ...¿estoy viendo cosas?', 'ghost');
  }
}

// ---- Attacks ----
// When a threat reaches you it does NOT scream right away: it waits, silent,
// behind you. The scare lands when you lower the camera, close the board or
// turn your head... or whenever it feels like it. Time keeps running.
function doom(why, e) {
  const g = G;
  if (g.doom) return;
  g.doom = { why, e, t: 0, max: rnd(3, 8) };
  e.st = 'DOOM'; e.mv = 0; e.snd = 1e9;
}
function updateDoom(dt) {
  const g = G, d = g.doom;
  if (!d) { g.lastView = g.view; return; }
  d.t += dt;
  const ready = d.t > 0.35;
  const lowered = g.lastView != 'office' && g.view == 'office';
  const turned = g.view == 'office' && (pr('L') || pr('R'));
  g.lastView = g.view;
  if ((ready && (lowered || turned)) || d.t > d.max) { g.view = 'office'; lose(d.why); }
}
function checkAttacks() {
  const g = G, E = g.E;
  if (g.doom) return;
  if (E.pitcher.st == 'SEARCH' && !g.suit && atYou(E.pitcher)) return doom('pitcher', E.pitcher);
  if (E.sleeper.st == 'ANGRY' && atYou(E.sleeper)) return doom('sleeper', E.sleeper);
  const c = E.chef;
  if (c.st == 'DELIVER' && atYou(c)) {
    if (g.suit) return doom('chef', c);
    g.sueno += 28; SFX.eat(); setMsg('"¡COME, COME! ¡TE VES FLACO!"  +SUEÑO', 2.2); think('Ugh... después de comer me da sueño.', 'ate'); c.st = 'RETURN';
    if (g.sueno >= 100) return lose('sleep');
  }
  if (E.coder.st == 'COMPLAIN' && atYou(E.coder)) return doom('coder', E.coder);
  if (E.mentora.st == 'STALK' && atYou(E.mentora)) return doom('mentora', E.mentora);
}

// =====================================================================
// AUDIO CUES & SUSPENSE (everything is heard from the chair)
// =====================================================================
function audible(e) {
  const gd = gdist(e.r, CTRL);
  if (gd == 0) return 1;
  if (gd == 1) { const d = dirTo(CTRL, e.r); const dp = DP[OPP[d]]; return 0.25 + 0.5 * clamp(1 - dist(e.x, e.y, dp[0], dp[1]) / 500, 0, 1); }
  return gd == 2 ? 0.1 : 0.03;
}
function panOf(e) {
  if (e.r == CTRL) return clamp((e.x - 400) / 360, -1, 1);
  return clamp((RC[e.r][0] - 1) * 0.75, -1, 1);
}
function audioCues(dt) {
  const g = G, E = g.E;
  // No music that rises when danger is near: only footsteps tell you. The
  // background dread only follows the clock and your sleepiness.
  let d = 0.15 + (g.t / g.len) * 0.25;
  if (g.sueno > 80) d = M.max(d, (g.sueno - 80) / 25);
  g.dread = lerp(g.dread, clamp(d, 0, 1), 1 - M.pow(0.2, dt));
  g.flick -= dt;
  if (g.flick < -6 && M.random() < dt * 0.06) g.flick = rnd(0.1, 0.35);
  if (!AC) return;
  muffle.frequency.setTargetAtTime(9000 - g.sueno * 60, AC.currentTime, 0.2);
  droneG.gain.setTargetAtTime(0.012 + g.dread * 0.09, AC.currentTime, 0.4);
  droneF.frequency.setTargetAtTime(90 + g.dread * 600, AC.currentTime, 0.4);
  for (const k in E) {
    const e = E[k];
    e.snd -= dt;
    if (e.snd > 0) continue;
    const v = audible(e), pn = panOf(e);
    if (k == 'pitcher') {
      if (e.st == 'PITCH') { if (g.cf.pitch && e.bar < 0.35) { SFX.babble(v * (1.6 - e.bar * 2), pn, 420 + (0.35 - e.bar) * 400); e.snd = 0.5 + e.bar * 2; } else { if (g.cf.pitch) SFX.babble(v * 0.8, pn, 300); e.snd = rnd(0.6, 1.4); } }
      else if (e.st == 'SEARCH') { SFX.babble(v * 1.3, pn, 380); if (e.mv) SFX.step(v * 1.2, pn); e.snd = e.mv ? 0.33 : 0.9; }
      else { SFX.step(v, pn); e.snd = 0.45; }
    } else if (k == 'sleeper') {
      if (e.st == 'SLEEP') { SFX.snore(v, pn); e.snd = 2.8; }
      else if (e.st == 'WANDER') { SFX.snore(v * 0.7, pn); if (e.mv) SFX.step(v * 0.6, pn); e.snd = e.mv ? 1.4 : 2.6; }
      else { SFX.step(v * 1.6, pn); tone(rnd(200, 300), 0.12, 'sawtooth', 0.12 * v, pn, 120); e.snd = 0.22; }
    } else if (k == 'mentora') {
      if (!g.cf.mentora) { e.snd = 5; continue; }
      SFX.murmur(v * 0.7, pn); e.snd = rnd(2.5, 4.5);
    } else if (k == 'chef') {
      if (e.st == 'DELIVER' || e.st == 'RETURN') { if (e.mv) SFX.squeak(v, pn); e.snd = 0.42; }
      else { noise(0.4, 0.05 * v, 'bandpass', 2500, pn, 0, 0, 2); e.snd = rnd(1, 2); }
    } else if (k == 'coder') {
      if (e.st == 'HUNT') { SFX.type(v * 1.5, pn); e.snd = M.max(0.08, 0.6 - (e.strikeT || e.huntT) * 0.04); }
      else if (e.st == 'TYPE') { SFX.type(v * 0.6, pn); e.snd = rnd(0.3, 0.8); }
      else { SFX.step(v * (e.st == 'COMPLAIN' ? 1.4 : 1), pn); e.snd = e.st == 'COMPLAIN' ? 0.3 : 0.4; }
    }
  }
  g.breathT -= dt;
  if (g.breathT <= 0) { g.breathT = 3.2; for (const k in E) { const bd = blindDoor(E[k]); if (bd && !doorClosed(bd) && (k != 'mentora' || g.cf.mentora)) SFX.breath(0.8, bd == 'W' ? -0.8 : bd == 'E' ? 0.8 : 0); } }
  g.scareT -= dt;
  if (g.scareT <= 0) { g.scareT = rnd(16, 34); SFX.far(); }
  g.heartT -= dt;
  if (g.dread > 0.35 && g.heartT <= 0) { SFX.heart(g.dread); g.heartT = lerp(1.1, 0.42, g.dread); }
}

// =====================================================================
// RENDER
// =====================================================================
function frameOf(e) {
  const fr = SPRF[e.role];
  if (fr.length >= 4) return fr[((e.anim * (e.mv ? 6 : 2.5)) | 0) % fr.length];
  if (e.mv) return fr[((e.anim * 5) | 0) % 2 ? 0 : 2];
  return fr[0];
}
function render(dt) {
  const g = G;
  const camMode = g.view == 'cams' && g.va >= 1;
  rC.setVisible(camMode); oC.setVisible(!camMode);
  updateZ(g.E.sleeper, dt);
  if (camMode) renderCam(g.camR, dt); else renderOffice(dt);
  renderHud(dt);
  if (FX) {
    FX.nv = camMode ? 1 : 0;
    FX.no = (camMode ? 0.1 : 0.03) + g.statA * 0.5 + (g.out ? 0.05 : 0);
    FX.ab = g.dread * 1.2 + (g.sueno > 70 ? 0.4 : 0);
    FX.dk = 0.2 + g.sueno / 170 + g.dread * 0.3;
    FX.wp = g.sueno > 85 ? (g.sueno - 85) / 15 : 0;
  }
}
function renderCam(r, dt) {
  const g = G, E = g.E;
  const on = powered(r);
  // FNAF-style slow pan: drift to one side, hold, drift back
  const ph = (g.t * 0.12 + r * 0.37) % 2, k = ph < 1 ? ph : 2 - ph;
  rC.x = -(CAMW - W) * clamp((k - 0.15) / 0.7, 0, 1);
  bgImg.setTexture('room' + r).setVisible(on);
  dynG.clear(); emG.clear();
  projTxt.setVisible(false); askTxt.setVisible(false);
  for (const k2 in E) eImg[k2].setVisible(false);
  ghostImg.setVisible(false);
  zPoolR.forEach((t) => t.setVisible(false));
  if (!on) { g.statA = M.max(g.statA, 0.55); return; }
  const pts = (a) => a.map((p) => ({ x: p[0], y: p[1] }));
  // closed control doors as seen from this room (the pitch room looks away from it)
  for (const d of ADOOR) if (r == CDOOR[d].adj && CDOOR[d].ad != 'S' && g.dp[d] > 0.02) {
    const q = doorPts(CDOOR[d].ad), f = g.dp[d];
    dynG.fillStyle(0x5a5f66, 1);
    dynG.fillPoints(pts([q[3], q[2], [q[2][0], q[2][1] + (q[1][1] - q[2][1]) * f], [q[3][0], q[3][1] + (q[0][1] - q[3][1]) * f]]), true);
  }
  // plates left outside a control door
  for (const d of ADOOR) if (r == CDOOR[d].adj) for (let i = 0; i < g.piles[d]; i++) {
    const [bx, by] = blindPt(d), [sx, sy, s] = P(bx + i * 10, by + 20, i * 6);
    dynG.fillStyle(0xeeeeee, 1); dynG.fillEllipse(sx, sy, 34 * s, 12 * s); dynG.fillStyle(0xcc6633, 1); dynG.fillEllipse(sx, sy - 2 * s, 18 * s, 6 * s);
  }
  // the coder's extension cord, from the doorway to the outlet
  if (g.plug == r) {
    const o = OUTLET[r], dd = DP[dirTo(r, gdist(r, 2) == 1 ? 2 : bfs(r, 2)[1])];
    const a = P(dd[0], dd[1]), m = P((dd[0] + o[0]) / 2 + 30, (dd[1] + o[1]) / 2 + 40), b = P(o[0], o[1]);
    dynG.lineStyle(4, 0x111111, 1); dynG.beginPath(); dynG.moveTo(a[0], a[1]); dynG.lineTo(m[0], m[1]); dynG.lineTo(b[0], b[1]); dynG.strokePath();
    emG.fillStyle(((g.t * 4) | 0) % 2 ? 0x44ff66 : 0x117722, 1); emG.fillRect(b[0] - 5, b[1] - 5, 10, 10);
  }
  const p = E.pitcher;
  if (r == 1) {
    const q = p.st == 'SEARCH' || p.st == 'RETURN';
    dynG.fillStyle(q ? 0xffffff : 0xf4f1e0, 1);
    dynG.fillPoints(pts([P(240, 96, 126), P(560, 96, 126), P(560, 96, 206), P(240, 96, 206)]), true);
    const [tx, ty] = P(400, 96, 172);
    projTxt.setVisible(true).setPosition(tx, ty).setText(q ? '¿PREGUNTAS?' : 'DIAPOSITIVA ' + p.slide).setColor(q ? '#c00' : '#222');
    if (!q) { dynG.fillStyle(0x3366cc, 1); for (let i = 0; i < 5; i++) { const [bx, by] = P(290 + i * 22, 96, 132); dynG.fillRect(bx, by - (i + 1) * 4 - (p.slide % 4) * 2, 12, (i + 1) * 4 + (p.slide % 4) * 2); } }
  }
  if (r == 5) {
    const amp = 0.08 + g.ac * 0.5, [bx, by, s] = P(171, 480);
    let x = bx, y = by, a = -PI / 2 + M.sin(g.t * 1.3) * amp;
    for (let i = 0; i < 9; i++) {
      const w = (22 - M.abs(i - 4) * 1.5) * s;
      dynG.fillStyle(i == 8 ? 0x5a3a10 : i % 2 ? 0xf2cf1d : 0xe0b812, 1);
      dynG.fillRect(x - w / 2, y - 10 * s, w, 14 * s);
      if (i == 5) { dynG.fillStyle(0x111111, 1); dynG.fillRect(x - 6 * s, y - 6 * s, 4 * s, 4 * s); dynG.fillRect(x + 3 * s, y - 6 * s, 4 * s, 4 * s); }
      a += 0.12 + M.sin(g.t * 2.1 + i * 0.6) * amp * 0.6;
      x += M.cos(a) * 12 * s; y += M.sin(a) * 12 * s;
    }
  }
  // people in the shot, far to near
  const order = [];
  for (const k2 in E) {
    const e = E[k2], im = eImg[k2];
    if (e.r != r || blindDoor(e)) continue;
    const [sx, sy, s] = P(e.x, e.y), sc = 3.3 * s;
    const sh = e.shake ? (M.random() - 0.5) * e.shake * 7 * s : 0;
    im.setVisible(true).setTexture(frameOf(e)).setScale(sc).setFlipX(e.fx < 0);
    if (k2 == 'sleeper' && e.st == 'SLEEP') im.setRotation(-PI / 2).setOrigin(0.5, 0.5).setPosition(sx + sh, sy - 10 * sc);
    else im.setRotation(0).setOrigin(0.5, 1).setPosition(sx + sh, sy);
    im.setTint((k2 == 'mentora' && !g.cf.mentora) || (k2 == 'chef' && !g.cf.cook) || (k2 == 'coder' && !g.cf.coder) ? 0x888888 : 0xffffff);
    if (k2 == 'mentora' && e.eye > 0.3 && g.cf.mentora) { im.setScale(sc * (1 + e.eye * 0.15)).setFlipX(false); if (M.random() < e.eye * 0.15) g.statA = M.max(g.statA, 0.4); }
    im.depth = e.y; im.hx = sx; im.hy = sy - (k2 == 'sleeper' && e.st == 'SLEEP' ? 14 : 30) * sc; im.sc = sc;
    order.push(im);
  }
  const gh = g.ghost;
  if (gh && gh.r == r && !gh.door) { const [sx, sy, s] = P(gh.x, gh.y); ghostImg.setVisible(true).setPosition(sx, sy).setScale(3.3 * s).setTexture(SPRF.ghost[((g.t * 6) | 0) % 4]).setAlpha(0.75); gh.seenT += dt * 0.3; g.statA = M.max(g.statA, 0.25); }
  order.sort((a, b) => a.depth - b.depth).forEach((im) => rC.bringToTop(im));
  rC.bringToTop(emG); rC.bringToTop(projTxt); rC.add(askTxt); rC.bringToTop(askTxt);
  const pi = eImg.pitcher, ci = eImg.coder;
  if (pi.visible) { emG.fillStyle(0xff2222, 0.95); emG.fillRect(pi.hx + p.fx * 6 * pi.sc, pi.hy + 6 * pi.sc, 1.5 * pi.sc, 1.5 * pi.sc); }
  if (ci.visible) { emG.fillStyle(0x45ff7a, 0.22); emG.fillCircle(ci.hx, ci.hy, 9 * ci.sc); }
  if (g.cf.pitch && r == 1 && pi.visible && p.st == 'PITCH') {
    // circular patience meter over his head
    const cx = pi.hx, cy = pi.hy - 70, col = p.bar < 0.35 ? 0xff3344 : 0x6fff8f;
    dynG.lineStyle(10, 0x000000, 0.6); dynG.strokeCircle(cx, cy, 26);
    dynG.lineStyle(8, col, 1); dynG.beginPath(); dynG.arc(cx, cy, 26, -PI / 2, -PI / 2 + p.bar * PI * 2, false); dynG.strokePath();
    rC.bringToTop(dynG);
  }
  if (g.cf.pitch && p.st == 'PITCH' && p.bar < 0.35 && pi.visible) {
    const kk = 1 - p.bar / 0.35, bx = pi.hx + 140 + (M.random() - 0.5) * kk * 8, by = pi.hy - 40;
    dynG.fillStyle(0xffffff, 1); dynG.fillRoundedRect(bx - 110, by - 22, 220, 34, 8); dynG.fillTriangle(bx - 100, by + 12, bx - 80, by + 12, bx - 112, by + 26);
    rC.bringToTop(dynG); rC.bringToTop(askTxt);
    askTxt.setVisible(true).setPosition(bx, by - 5).setText(kk > 0.6 ? '¡¡SIGUIENTE!!' : '¿SIGUIENTE DIAPOSITIVA?').setColor(kk > 0.6 ? '#c00' : '#111').setScale(1 + kk * 0.25);
  }
  const s = E.sleeper, si = eImg.sleeper;
  zPoolR.forEach((t, i) => {
    const z = s.parts[i];
    if (!z || !si.visible) return;
    const ang = s.st == 'ANGRY', k3 = si.sc / 2.6;
    t.setVisible(true).setText(ang ? '!' : 'z').setColor(ang ? '#ff4040' : '#9fd8ff').setPosition(si.hx + z.dx * k3, si.hy + z.dy * k3).setAlpha(z.l).setScale((0.8 + (1 - z.l) * 0.8) * k3);
    rC.bringToTop(t);
  });
}
function updateZ(s, dt) {
  s.zT = (s.zT || 0) - dt;
  if (s.zT <= 0) { s.zT = s.st == 'SLEEP' ? 0.55 : s.st == 'ANGRY' ? 0.15 : 0.9; if (s.parts.length < 14) s.parts.push({ dx: rnd(-6, 10), dy: 0, l: 1 }); }
  for (const z of s.parts) { z.dy -= dt * 22; z.dx += dt * 8; z.l -= dt * 0.45; }
  s.parts = s.parts.filter((z) => z.l > 0);
}
function renderOffice(dt) {
  const g = G, E = g.E;
  oC.x = -g.pan;
  oG.clear(); oDim.clear(); oTop.clear();
  const fl = g.flick > 0 || g.out;
  if (!g.out) { oG.fillStyle(0x2a6ab0, 0.15 + M.random() * 0.03); for (const mx of [478, 1098]) oG.fillRect(mx, 376, 114, 76); oG.fillStyle(0x9fd0ff, 0.5); oG.fillRect(488, 390, 50, 3); oG.fillRect(1108, 400, 70, 3); }
  for (const d of ADOOR) {
    const [x, y, w, h] = ODOOR[d];
    const lit = g.light && g.focus == d && !doorClosed(d);
    if (lit) { oG.fillStyle(0xfff0b0, 0.22); oG.fillRect(x, y, w, h); oG.fillStyle(0x4a463c, 0.5); oG.fillRect(x, y + h - 60, w, 60); }
    for (let i = 0; i < g.piles[d]; i++) { oG.fillStyle(0xdddddd, 1); oG.fillEllipse(x + w / 2 + (i - 1) * 32, y + h + 34 - i * 4, 46, 14); oG.fillStyle(0xcc6633, 1); oG.fillEllipse(x + w / 2 + (i - 1) * 32, y + h + 31 - i * 4, 24, 6); }
    const im = oDoors[d];
    const hh = d == 'N' ? 255 : 300, q = g.dp[d];
    im.setVisible(q > 0.01).setCrop(0, hh * (1 - q), 180, hh).setY(y - hh * (1 - q));
  }
  zPoolO.forEach((t) => t.setVisible(false));
  for (const k in E) {
    const e = E[k], im = oImg[k];
    im.setVisible(false);
    if ((k == 'mentora' && !g.cf.mentora) || e.st == 'DOOM') continue;
    let sx, sy, sc, tint;
    const bd = blindDoor(e);
    if (e.r == CTRL) {
      const a = M.atan2(e.x - CHAIR[0], CHAIR[1] - e.y), dd = dist(e.x, e.y, CHAIR[0], CHAIR[1]);
      sx = PCX + a * 490; sc = clamp(1000 / dd, 2.8, 9.5); sy = 410 + (sc - 2.8) * 30;
      tint = seen(e) == 2 ? 0xffffff : k == 'coder' && g.out ? 0x3aa060 : dd < 280 && !g.out ? 0x55555f : 0x141418;
    } else if (bd && !doorClosed(bd) && seen(e) == 2) {
      // only your door light reveals who is standing there
      const [x, y, w, h] = ODOOR[bd];
      sx = x + w / 2 + (e.x - 400) * 0.05; sy = y + h - 6; sc = 3.6;
      tint = 0xffffff;
    } else continue;
    im.setVisible(true).setTexture(frameOf(e)).setScale(sc).setPosition(sx + (e.shake ? (M.random() - 0.5) * e.shake * 10 : 0), sy).setFlipX(e.fx < 0).setTint(tint);
    im.setRotation(k == 'sleeper' && e.st == 'SLEEP' ? -PI / 2 : 0);
    const top = sy - 24 * sc;
    if (k == 'pitcher') { oG.fillStyle(0xff2222, 1); oG.fillRect(sx + e.fx * 6 * sc, top + 10 * sc, sc * 1.6, sc * 1.6); }
    if (k == 'chef') { oG.fillStyle(0xff8a2a, 0.3); oG.fillCircle(sx, top + 8 * sc, 8 * sc); }
    if (k == 'coder') { oG.fillStyle(0x45ff7a, 0.18 + (e.st == 'HUNT' ? M.random() * 0.15 : 0)); oG.fillCircle(sx, top + 10 * sc, 9 * sc); }
    if (k == 'mentora') { oG.fillStyle(0xc77dff, 0.9); oG.fillRect(sx - e.fx * 5 * sc, top + 12 * sc, sc * 2, sc * 1.5); }
    if (k == 'sleeper') zPoolO.forEach((t, i) => { const z = e.parts[i]; if (z) t.setVisible(true).setText(e.st == 'ANGRY' ? '!' : 'z').setColor(e.st == 'ANGRY' ? '#ff4040' : '#9fd8ff').setPosition(sx + z.dx * sc * 0.4, top + z.dy * sc * 0.4).setAlpha(z.l); });
  }
  const gh = g.ghost;
  oGhost.setVisible(!!(gh && gh.door && !doorClosed(gh.door)));
  if (oGhost.visible) {
    const [x, y, w, h] = ODOOR[gh.door];
    const lit = g.light && g.focus == gh.door;
    oGhost.setTexture(SPRF.ghost[((g.t * 6) | 0) % 4]).setScale(3.6).setPosition(x + w / 2, y + h - 6).setTint(lit ? 0xffffff : 0x1a1a1a);
    if (lit) gh.seenT += dt;
  }
  // props drawn on top: fan, button panels, clock, phone LED, coffee steam, lamp
  const fa = g.t * 22;
  oTop.fillStyle(0x2a2a2e, 1); oTop.fillCircle(715, 440, 26);
  oTop.fillStyle(0x55585e, 1); for (let i = 0; i < 3; i++) { const a = fa + i * 2.094; oTop.fillTriangle(715, 440, 715 + M.cos(a) * 24, 440 + M.sin(a) * 24, 715 + M.cos(a + 0.6) * 24, 440 + M.sin(a + 0.6) * 24); }
  oTop.fillStyle(0x111111, 1); oTop.fillCircle(715, 440, 5);
  for (const d of ADOOR) {
    const [bx, by] = OPANEL[d];
    const closed = !!g.doors[d], jam = g.piles[d] >= 3;
    oTop.fillStyle(g.out ? 0x220000 : closed ? 0xff2a2a : jam ? 0x884400 : 0x5a1010, 1); oTop.fillCircle(bx + 20, by + 26, 11);
    oTop.fillStyle(g.out ? 0x111111 : g.light && g.focus == d ? 0xffffee : 0x4a4a44, 1); oTop.fillCircle(bx + 20, by + 70, 11);
    if (g.focus == d && g.view == 'office') { oTop.lineStyle(2, 0xffd400, 0.35 + M.sin(g.t * 6) * 0.2); oTop.strokeRect(bx - 6, by - 6, 52, 108); oTop.strokeRect(ODOOR[d][0] - 4, ODOOR[d][1] - 4, ODOOR[d][2] + 8, ODOOR[d][3] + 8); }
  }
  const hA = (hourOf(g.t) / 12) * PI * 2 - PI / 2, mA = ((g.t % g.hl) / g.hl) * PI * 2 - PI / 2;
  oTop.lineStyle(3, 0xdddddd, 1); oTop.lineBetween(420, 100, 420 + M.cos(hA) * 12, 100 + M.sin(hA) * 12);
  oTop.lineStyle(2, 0xdddddd, 1); oTop.lineBetween(420, 100, 420 + M.cos(mA) * 18, 100 + M.sin(mA) * 18);
  if (callOn() && ((g.t * 3) | 0) % 2) { oTop.fillStyle(0x33ff55, 1); oTop.fillRect(842, 438, 8, 8); }
  // coffee maker: LED, cup filling, steam
  oTop.fillStyle(g.cof == 1 ? 0xff3322 : g.cof == 2 ? 0x33ff55 : 0x331111, 1); oTop.fillRect(COFFEE_X + 16, 412, 6, 6);
  const fill = g.cof == 1 ? 1 - g.cofT / 4 : g.cof == 2 ? 1 : 0;
  if (g.drink <= 0) { oTop.fillStyle(0xe8e2c8, 1); oTop.fillRect(COFFEE_X - 12, 448, 24, 22); oTop.fillStyle(0x5a3416, 1); oTop.fillRect(COFFEE_X - 10, 468 - 18 * fill, 20, 18 * fill); }
  if (g.cof == 1) { oTop.fillStyle(0x5a3416, 1); oTop.fillRect(COFFEE_X - 1, 446, 2, 20 - 18 * fill); }
  if (g.cof) for (let i = 0; i < 3; i++) { oTop.fillStyle(0xdddddd, 0.3); oTop.fillCircle(COFFEE_X + M.sin(g.t * 3 + i) * 6, 440 - ((g.t * 30 + i * 12) % 40), 5); }
  if (g.focus == 'C' && g.view == 'office') { oTop.lineStyle(2, 0xffd400, 0.35 + M.sin(g.t * 6) * 0.2); oTop.strokeRect(COFFEE_X - 36, 396, 72, 80); }
  oBeam.setVisible(!!g.light);
  if (g.light && ODOOR[g.focus]) {
    const [x, y, w, h] = ODOOR[g.focus];
    const bx = PCX, by = 570, tx = x + w / 2, ty = y + h * 0.6;
    oBeam.setPosition(bx, by).setRotation(M.atan2(ty - by, tx - bx)).setScale(dist(bx, by, tx, ty) / 230, 1).setAlpha(0.22 + M.random() * 0.04);
  }
  const sw = M.sin(g.t * 0.9) * 0.12;
  oLamp.setRotation(PI / 2 + sw).setAlpha(fl ? 0.02 : 0.14 + M.random() * 0.01).setPosition(PCX + sw * 60, 40);
  oTop.lineStyle(2, 0x222222, 1); oTop.lineBetween(PCX, 0, PCX + sw * 60, 40);
  oTop.fillStyle(fl ? 0x333322 : 0xfff2b0, 1); oTop.fillCircle(PCX + sw * 60, 44, 7);
  oDim.fillStyle(0x000000, g.out ? 0.85 : fl ? 0.6 : 0.26);
  oDim.fillRect(0, 0, PW, H);
  oDim.fillStyle(0x000000, 0.35); oDim.fillRect(0, 0, 120, H); oDim.fillRect(PW - 120, 0, 120, H);
  oC.bringToTop(oDim);
  for (const k in oImg) if (oImg[k].visible && (oImg[k].tintTopLeft == 0xffffff || (k == 'coder' && g.out))) oC.bringToTop(oImg[k]);
  if (g.out && E.coder.r == CTRL) { const im = oImg.coder; oG.fillStyle(0x45ff7a, 0.12 + M.random() * 0.08); oG.fillCircle(im.x, im.y - 40 * im.scaleX * 0.5, 40 * im.scaleX * 0.5); oC.bringToTop(oG); oC.bringToTop(im); }
  oC.bringToTop(oBeam);
  for (const z of zPoolO) oC.bringToTop(z);
}

// ---- HUD ----
function showHud() { for (const k of ['hour', 'night', 'pow', 'sue', 'msg']) ui[k].setVisible(true); ui.g.setVisible(true); }
function hideHud() {
  for (const k of ['hour', 'night', 'pow', 'sue', 'camLbl', 'rec', 'camTime', 'camHint', 'msg', 'camBar', 'bkBar', 'arrL', 'arrR', 'th', 'noSig', 'noSig2']) ui[k] && ui[k].setVisible(false);
  ui.pr && ui.pr.forEach((t) => t.setVisible(false));
  ui.mapT && ui.mapT.forEach((t) => t.setVisible(false));
  ui.g && ui.g.clear(); ui.call && ui.call.setVisible(false); ui.vig && ui.vig.setVisible(false);
  ui.stat && ui.stat.setAlpha(0); ui.suit && ui.suit.setAlpha(0); ui.tab && (ui.tab.y = H); ui.bk && (ui.bk.y = H);
  ui.lid && (ui.lid.height = 0, ui.lid2.height = 0);
  ui.scr && ui.scr.setVisible(false); ui.scrT && ui.scrT.setText('');
  ui.fade && ui.fade.setAlpha(0);
}
function prompt(i, x, y, s, col, a) { ui.pr[i].setVisible(true).setText(s).setPosition(clamp(x, 80, 720), clamp(y, 20, 560)).setColor(col || '#fff').setAlpha(a ?? 1); }
function renderHud(dt) {
  const g = G, gr = ui.g;
  gr.clear();
  ui.pr.forEach((t) => t.setVisible(false));
  ui.hour.setText((hourOf(g.t) == 0 ? 12 : hourOf(g.t)) + ' AM');
  ui.night.setText('NOCHE ' + g.n);
  ui.pow.setText(g.out ? 'SIN ENERGÍA' : 'ENERGÍA ' + M.ceil(g.power) + '%').setColor(g.power < 20 ? '#ff5555' : '#ffffff');
  // breaker load: one box per unit of capacity, red when you go over
  if (!g.out) for (let i = 0; i < CAP + 2; i++) { const over = i >= CAP, f = i < (g.trip ? 0 : g.load); gr.fillStyle(f ? (over ? 0xff3333 : i >= CAP - 1 ? 0xeecc33 : 0x44dd66) : over ? 0x2a0a0a : 0x222222, f && over && ((g.t * 6) | 0) % 2 ? 0.4 : 1); gr.fillRect(626 + i * 19, 46, 15, 12); }
  if (g.trip) { ui.pow.setText('¡AUTOMÁTICO!').setColor(((g.t * 3) | 0) % 2 ? '#ff4444' : '#ffaa44'); }
  gr.fillStyle(0x1a1430, 1); gr.fillRect(626, 88, 150, 10);
  gr.fillStyle(g.sueno > 70 ? 0xb44dff : 0x7a5cff, 1); gr.fillRect(626, 88, 150 * clamp(g.sueno / 100, 0, 1), 10);
  ui.sue.setText(g.sueno > 70 ? 'SUEÑO ¡¡CAFÉ!!' : 'SUEÑO').setColor(g.sueno > 70 && M.sin(g.t * 8) > 0 ? '#ff77ff' : '#c9b6ff');
  const office = g.view == 'office', cm = g.view == 'cams' && g.va >= 1, bk = g.view == 'panel';
  // flip-up animations: green tablet for cameras, metal breaker box for the panel
  ui.tab.y = H * (1 - (g.view == 'cams' ? g.va : 0)); ui.tab.setVisible(g.view == 'cams' && g.va < 1);
  ui.bk.y = bk ? H * (1 - g.va) : H; ui.bk.setVisible(bk);
  ui.hour.setVisible(!cm && !bk); ui.night.setVisible(!cm && !bk);
  for (const k of ['camLbl', 'rec', 'camTime', 'camHint']) ui[k].setVisible(cm);
  ui.mapT.forEach((t) => t.setVisible(cm));
  const nos = cm && !powered(g.camR);
  ui.noSig.setVisible(nos).setAlpha(0.6 + M.random() * 0.4); ui.noSig2.setVisible(nos);
  if (cm) {
    ui.camLbl.setText('CAM ' + (g.camR + 1 - (g.camR > CTRL)) + ' · ' + RNAME[g.camR]);
    ui.rec.setAlpha(((g.t * 2) | 0) % 2);
    ui.camTime.setText(clockStr(g.t));
    gr.lineStyle(2, 0x6fdc8f, 0.7); gr.strokeRect(20, 20, 760, 560);
    const mx = 560, my = 372;
    for (let i = 0; i < 6; i++) {
      const [c, r] = RC[i], x = mx + c * 74, y = my + r * 44;
      gr.fillStyle(i == g.camR ? 0x2f8f4f : i != CTRL && !powered(i) ? 0x0a0a0a : 0x0c2a16, 0.9); gr.fillRect(x, y, 68, 38);
      gr.lineStyle(1, 0x6fdc8f, 1); gr.strokeRect(x, y, 68, 38);
      ui.mapT[i].setPosition(x + 34, y + 19).setAlpha(i == CTRL || powered(i) ? 1 : 0.35);
      if (i == 1 && g.cf.pitch) { const b = g.E.pitcher.st == 'PITCH' ? g.E.pitcher.bar : 0; gr.lineStyle(3, b < 0.35 && ((g.t * 4) | 0) % 2 ? 0xff3344 : 0x6fdc8f, 1); gr.beginPath(); gr.arc(x + 58, y + 10, 6, -PI / 2, -PI / 2 + M.max(0.05, b) * PI * 2, false); gr.strokePath(); }
    }
    ui.camHint.setText(g.paCd > 0 ? 'ALTAVOZ: ESPERA ' + M.ceil(g.paCd) + 's · B3 BAJAR' : (learned('camnav', 2) ? '' : 'STICK: CÁMARA · ') + 'B1 ALTAVOZ · B3 BAJAR');
    if (g.camR == 1 && powered(1) && g.cf.pitch) {
      const p = g.E.pitcher, urgent = p.bar < 0.35;
      prompt(0, 400, 330, g.clicking ? '▶ PASANDO DIAPOSITIVAS...' : 'MANTÉN B2 · PASAR DIAPOSITIVAS', urgent ? '#ffd400' : '#fff', urgent || !learned('slide', 3) ? 1 : 0.5);
    } else if (!learned('pa', 1) && g.paCd <= 0 && powered(g.camR)) prompt(0, 400, 330, 'B1 · ALTAVOZ: hacer ruido en esta sala', '#bfffcf');
  }
  if (bk) renderPanel(gr);
  // office prompts: on the panel of the door you are looking at
  ui.camBar.setVisible(office).setAlpha(g.out || g.trip ? 0.35 : 1);
  ui.bkBar.setVisible(office).setAlpha(g.out ? 0.35 : 1);
  const showArr = office && !learned('look', 2);
  ui.arrL.setVisible(showArr && g.pan > 40).setAlpha(0.4 + M.sin(g.t * 5) * 0.4);
  ui.arrR.setVisible(showArr && g.pan < PW - W - 40).setAlpha(0.4 + M.sin(g.t * 5) * 0.4);
  if (office && !g.out && g.drink <= 0) {
    if (g.focus && ODOOR[g.focus]) {
      // FNAF-style: the hints live inside the doorway you are looking at
      const [x, y, w, h] = ODOOR[g.focus], cx = x + w / 2 - g.pan;
      const closed = !!g.doors[g.focus], jam = g.piles[g.focus] >= 3;
      const nm = g.focus == 'N' ? 'CORTINA' : 'PUERTA';
      const a = learned('door', 3) && learned('light', 3) ? 0.55 : 1;
      prompt(0, cx, y + h * 0.35, jam ? 'MANTÉN B2 · COMER PLATOS' : 'B2 · ' + (closed ? 'ABRIR ' : 'CERRAR ') + nm, jam ? '#ffaa55' : closed ? '#ff8888' : '#fff', jam ? 1 : a);
      if (jam && g.jamHold > 0) { gr.fillStyle(0xffaa55, 1); gr.fillRect(cx - 50, y + h * 0.35 + 14, 100 * g.jamHold / 1.4, 5); }
      if (!g.suit && !closed) prompt(1, cx, y + h * 0.35 + 34, 'B1 · LUZ', '#ffe9a0', a);
    } else if (g.focus == 'C') {
      const cx = COFFEE_X - g.pan;
      prompt(0, cx, 372, g.cof == 0 ? 'MANTÉN B1 · PREPARAR CAFÉ' : g.cof == 1 ? 'PREPARANDO... ' + M.ceil(g.cofT) : 'B1 · TOMAR CAFÉ', g.cof == 2 ? '#7f7' : '#c9b6ff');
      if (g.cof == 0 && g.cofHold > 0) { gr.fillStyle(0xc9b6ff, 1); gr.fillRect(cx - 50, 386, 100 * g.cofHold / 0.6, 5); }
    } else if (g.sueno > 45 || g.cof == 2) prompt(2, clamp(COFFEE_X - g.pan, 90, 710), 372, g.cof == 2 ? '☕ CAFÉ LISTO' : '☕ CAFÉ', g.sueno > 70 ? '#ff77ff' : '#c9b6ff', 0.75);
    if (g.n >= 3 && !learned('suit', 2)) prompt(3, 690, 540, 'B4 · TRAJE DE PLÁTANO', '#ffd400');
  }
  if (g.view == 'cams' || office) for (const k in g.E) { const e = g.E[k]; if (cm && e.r == g.camR && e.mv && !blindDoor(e)) g.statA = M.max(g.statA, 0.16); }
  g.statA = M.max(0, g.statA - dt * 2.2);
  ui.stat.setAlpha(clamp(g.statA * 0.9 + (g.out ? 0.03 : 0), 0, 1)).setTilePosition(rnd(0, 200), rnd(0, 150));
  g.msgT -= dt; ui.msg.setAlpha(clamp(g.msgT * 2, 0, 1));
  if (g.th) ui.th.setVisible(true).setText(g.th.s).setPosition(400, callOn() ? 452 : bk ? 590 : 548).setAlpha(clamp(g.th.t * 3, 0, 1));
  else ui.th.setVisible(false);
  const c = g.call, on = callOn();
  ui.call.setVisible(on);
  if (on) {
    ui.callName.setText(c.i < 0 ? 'LLAMADA ENTRANTE...' : c.set[0]);
    ui.callImg.setTexture(SPRF[c.set[1]][c.i >= 0 && ((g.t * 8) | 0) % 2 ? 1 : 0]);
    ui.callTxt.setText(c.i < 0 ? '' : c.set[2][c.i].slice(0, c.ch | 0));
  }
  ui.suit.setAlpha(office ? g.suitP * 0.97 : g.suitP * 0.3);
  const bl = g.blink > 0 ? M.sin(clamp(1 - g.blink / g.blinkDur, 0, 1) * PI) : 0;
  const droop = clamp((g.sueno - 45) / 55, 0, 1) * (150 + M.sin(g.t * 1.3) * 18); // eyelids hang lower the sleepier you are
  g.lidY = lerp(g.lidY, droop, 1 - M.pow(0.1, dt));
  const lh = M.max(g.lidY, bl * 310);
  ui.lid.height = lh; ui.lid2.y = H - lh; ui.lid2.height = lh;
  // drinking: a big mug rises in front of your face
  ui.mug.setVisible(g.drink > 0);
  if (g.drink > 0) { const k = 1 - g.drink / 1.3; ui.mug.setY(H + 40 - M.sin(k * PI) * 330).setAngle(-k * 40); }
  ui.fade.setAlpha(M.max(0, ui.fade.alpha - dt * 5));
}
// Breaker board: one switch per room, laid out like the venue map
function renderPanel() {
  const g = G, b = ui.bkG;
  b.clear();
  b.fillStyle(0x24272c, 0.97); b.fillRect(90, 110, 620, 460);
  b.lineStyle(4, 0x4a4f57, 1); b.strokeRect(90, 110, 620, 460);
  b.fillStyle(0xffd400, 1); for (let x = 96; x < 704; x += 24) b.fillRect(x, 116, 12, 4);
  for (const i of [...ROOMS5, CTRL]) {
    const [x, y] = BRK(i), sel = g.bkSel == i;
    b.fillStyle(sel ? 0x3a3f48 : 0x2d3036, 1); b.fillRect(x, y, 148, 150);
    b.lineStyle(2, sel ? 0xffd400 : 0x444a52, 1); b.strokeRect(x, y, 148, 150);
    const [lbl, sub] = ui.bkT[i];
    if (i == CTRL) {
      lbl.setColor('#ffd400');
      if (g.trip) {
        sub.setText(g.resetH > 0 ? 'REINICIANDO...' : '¡SALTÓ!\nMANTÉN B2: REINICIAR').setColor('#ff5555');
        b.fillStyle(0x441111, 1); b.fillRect(x + 20, y + 40, 108, 60);
        b.fillStyle(0xffaa33, 1); b.fillRect(x + 24, y + 44, 100 * g.resetH / 1.5, 52);
      } else {
        sub.setText('CARGA ' + g.load + ' / ' + CAP + '\nENERGÍA ' + M.ceil(g.power) + '%').setColor(g.load > CAP ? '#ff5555' : '#aaa');
        b.fillStyle(0x111111, 1); b.fillRect(x + 20, y + 40, 108, 60);
        for (let k = 0; k < CAP; k++) { b.fillStyle(k < g.load ? (g.load > CAP ? 0xff3333 : 0x44dd66) : 0x2a2a2a, 1); b.fillRect(x + 26 + k * 17, y + 50, 13, 40); }
      }
      continue;
    }
    const on = !!g.pw[i], plug = g.plug == i && on;
    // lever
    b.fillStyle(0x111111, 1); b.fillRect(x + 54, y + 34, 40, 74);
    b.fillStyle(on ? 0x44dd66 : 0x777777, 1); b.fillRect(x + 58, on ? y + 38 : y + 72, 32, 32);
    b.fillStyle(on ? (plug && ((g.t * 6) | 0) % 2 ? 0xff3333 : 0x33ff66) : 0x331111, 1); b.fillCircle(x + 120, y + 44, 7);
    let s = on ? 'ENCENDIDA · carga 1' : 'APAGADA';
    if (plug) s = '¡SOBRECARGA!';
    else if (i == 1) s += on ? '\nproyector ON' : '\nproyector OFF';
    else if (i == 3 && on) s += '\n(lo despierta)';
    lbl.setColor(on ? '#fff' : '#888');
    sub.setText(s).setColor(plug ? '#ff5555' : on ? '#aaccaa' : '#777');
  }
}

// =====================================================================
// LOSE / WIN
// =====================================================================
const SCREAM = {
  pitcher: ['pitcher', '¡¿PREGUNTAS?!'], sleeper: ['sleeper', '¡¿QUÉ HORA ES?!'], coder: ['coder', '¡¿QUIÉN ME CORTÓ LA LUZ?!'],
  chef: ['chef', '¡PLÁTANO FRITO!'], mentora: ['mentora', '¡TENGO UN FEEDBACK!'], sleep: ['sleeper', '¿tú también?'], springlock: ['suit', '*CLACK*'],
};
const LOSE_TIP = {
  pitcher: 'Alguien quería público.', sleeper: 'A nadie le gusta que le alumbren la cara.', coder: 'Cinco minutos más...',
  chef: 'Un plátano frente al chef. Mala idea.', mentora: 'No la mires tanto.', sleep: 'TE QUEDASTE DORMIDO', springlock: 'TE DORMISTE CON EL TRAJE PUESTO',
};
function lose(why) {
  if (mode != 'play' || window.FNAP_GOD) return;
  const g = G;
  g.why = why; g.loseT = g.t;
  mode = 'scream'; modeT = 0;
  if (why != 'sleep') { g.view = 'office'; g.va = 0; rC.setVisible(false); oC.setVisible(true); renderOffice(0); } // the tablet drops: it is right there
  if (why == 'sleep') { ui.lid.height = ui.lid2.height = 310; ui.lid2.y = H - 310; g.scrDelay = 1.4; } else g.scrDelay = 0; // no warning beat: it just happens
  ui.scr.setTexture(SCREAM[why][0] + 'H').setVisible(false);
  ui.scrT.setText('');
  ui.scrTxt = SCREAM[why][1];
}
function screamUpdate(dt) {
  const g = G;
  modeT += dt;
  if (modeT < g.scrDelay) { if (FX) { FX.no = 0.02; FX.ab = 0; } return; }
  const t = modeT - g.scrDelay;
  if (!g.scrOn) { g.scrOn = 1; if (AC) { ambG.gain.setTargetAtTime(0, AC.currentTime, 0.02); droneG.gain.setTargetAtTime(0, AC.currentTime, 0.02); } SFX.scream(); S.cameras.main.shake(900, 0.03); uiCam.shake(900, 0.02); ui.fade.setAlpha(0); }
  ui.scr.setVisible(t < 1.4).setScale(20 + t * 30 + M.random() * 3).setPosition(400 + rnd(-12, 12), 330 + rnd(-12, 12)).setTint(M.random() < 0.3 ? 0xff5555 : 0xffffff).setAngle(rnd(-4, 4));
  ui.scrT.setText(t < 1.4 ? ui.scrTxt : '').setPosition(400 + rnd(-6, 6), 520 + rnd(-6, 6));
  ui.stat.setAlpha(t > 1.4 ? 1 : 0.2).setTilePosition(rnd(0, 200), rnd(0, 150));
  if (FX) { FX.ab = 3; FX.no = 0.4; FX.dk = 0.2; FX.nv = 0; }
  if (t > 2.1) goLose();
}
function goLose() {
  const g = G;
  mode = 'lose'; modeT = 0;
  setWorld(false); hideHud(); clearScreen();
  sAdd(S.add.rectangle(0, 0, W, H, 0x000000).setOrigin(0));
  ui.lStat = sAdd(S.add.tileSprite(0, 0, W, H, 'noise').setOrigin(0).setAlpha(0.08));
  sText(400, 170, 'PERDISTE', 64, '#d22', 0.5, 0.5, { stroke: '#000', strokeThickness: 6 });
  sText(400, 236, 'Eran las ' + clockStr(g.loseT) + ' · NOCHE ' + g.n, 18, '#aaa');
  sAdd(S.add.image(400, 440, SCREAM[g.why][0] + '0').setScale(6).setOrigin(0.5, 1).setTint(0x220000));
  sText(400, 472, LOSE_TIP[g.why], 15, '#888', 0.5, 0.5, { fontStyle: 'italic bold' });
  ui.lPress = sText(400, 540, 'START · REINTENTAR NOCHE ' + g.n, 16, '#fff');
}
function loseUpdate(dt) {
  modeT += dt;
  ui.lStat.setTilePosition(rnd(0, 200), rnd(0, 150));
  ui.lPress.setAlpha(modeT > 1.2 ? 0.5 + M.sin(modeT * 4) * 0.5 : 0);
  if (modeT > 1.2 && (pr('S') || pr('1'))) { SFX.click(); goCard(G.n); }
}
function winNight() {
  const g = G;
  mode = 'win'; modeT = 0;
  hideHud(); setWorld(false); clearScreen();
  if (AC) { ambG.gain.setTargetAtTime(0, AC.currentTime, 0.1); droneG.gain.setTargetAtTime(0, AC.currentTime, 0.1); }
  sAdd(S.add.rectangle(0, 0, W, H, 0x000000).setOrigin(0));
  ui.w1 = sText(400, 270, '5:59 AM', 60, '#fff');
  ui.w2 = sText(400, 340, '', 22, '#ffd400');
  if (g.n < 5) { saved.night = M.max(saved.night, g.n + 1); menuNight = saved.night; writeSave(); }
}
function winUpdate(dt) {
  modeT += dt;
  if (modeT > 1.6 && !ui.wDone) { ui.wDone = 1; ui.w1.setText('6:00 AM'); ui.w2.setText('NOCHE ' + G.n + ' SUPERADA'); SFX.six(); S.cameras.main.flash(300, 255, 255, 255); }
  if (modeT < 1.6) ui.w1.setText(M.random() < 0.15 ? '6:00 AM' : '5:59 AM');
  if (modeT > 4 && (anyPr() || modeT > 8)) { ui.wDone = 0; if (G.n >= 5) goPaper(1); else goCard(G.n + 1); }
}
