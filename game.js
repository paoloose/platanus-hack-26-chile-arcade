// =====================================================================
// 5 NOCHES EN PLATANUS — Platanus Hack 26: Santiago
// La hackathon terminó. Los ganadores vuelan a San Francisco con Rafa y
// Nacho. Tú te quedaste con el turno de noche. No todos se fueron.
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
const ROLE_COL = { pitcher: 0xff3344, sleeper: 0x7fd0ff, mentora: 0xc77dff, chef: 0xff9a2e, coder: 0x45ff7a, ghost: 0xffffff };

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
function out(vol, pan) {
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
  const g = out(vol, pan);
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
  const g = out(vol, pan);
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
  coffee: (p) => { for (let i = 0; i < 10; i++) noise(0.1, 0.12, 'bandpass', rnd(300, 900), p, 0, i * 0.12, 6); tone(880, 0.1, 'sine', 0.1, p, 0, 1.3); },
  applause: (v, p) => { for (let i = 0; i < 26; i++) noise(0.05, 0.12 * v * rnd(0.4, 1), 'bandpass', rnd(1200, 3500), p + rnd(-0.3, 0.3), 0, rnd(0, 1.6), 2); },
  ring: () => { for (let i = 0; i < 2; i++) { tone(440, 0.9, 'sine', 0.07, 0, 0, i * 1.3); tone(480, 0.9, 'sine', 0.07, 0, 0, i * 1.3); } },
  heart: (v) => { tone(55, 0.12, 'sine', 0.35 * v, 0, 40); tone(50, 0.14, 'sine', 0.25 * v, 0, 38, 0.2); },
  plates: (v, p) => { for (let i = 0; i < 6; i++) tone(rnd(2000, 4000), 0.15, 'triangle', 0.06 * v, p, 0, i * 0.04); },
  eat: () => { for (let i = 0; i < 5; i++) noise(0.06, 0.2, 'bandpass', 500, 0, 0, i * 0.15, 3); },
  trip: (p) => { noise(0.35, 0.5, 'lowpass', 600, p); tone(150, 0.3, 'square', 0.15, p, 50); },
  zip: () => noise(0.6, 0.2, 'bandpass', 2500, 0, 5000, 0, 8),
  scream: () => {
    noise(1.4, 0.9, 'bandpass', 1500, 0, 700, 0, 0.7);
    tone(90, 1.4, 'sawtooth', 0.5, 0, 45); tone(740, 1.2, 'square', 0.25, 0, 300);
    for (let i = 0; i < 10; i++) tone(rnd(600, 1600), 0.08, 'sawtooth', 0.25, rnd(-1, 1), 0, i * 0.1);
  },
  six: () => {
    [523, 659, 784, 1046, 784, 1046].forEach((f, i) => tone(f, 0.5, 'triangle', 0.22, 0, 0, i * 0.18));
    SFX.applause(1.5, 0);
  },
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
// WORLD GEOMETRY — 3x2 venue grid
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
const SEAT = [400, 345];
const CHAIR = [400, 468];
const CDOOR = { W: { adj: 3, ad: 'E', a: 0 }, N: { adj: 1, ad: 'S', a: 1 }, E: { adj: 5, ad: 'W', a: 2 } };
const ADOOR = ['W', 'N', 'E'];
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
const LECTERN = [545, 190], COFFEE = [700, 196], SINK = [130, 196], LAPTOP = [600, 196], STRIP = [528, 432];
const PITCH_HOME = [400, 172], SLEEP_HOME = [210, 330], CHEF_HOME = [200, 200], CODER_HOME = [600, 222];

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
function hitObs(r, x, y) {
  for (const o of OBS[r]) if (x > o[0] - 9 && x < o[0] + o[2] + 9 && y > o[1] - 5 && y < o[1] + o[3] + 4) return true;
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
  { hl: 30, slides: 14, slide: 3.4, pfast: 112, wake: [2, 3], drain: 0.12, cook: 0, mentora: 0, coder: 0, mspd: 50, sue: 120 },
  { hl: 34, slides: 15, slide: 3.2, pfast: 122, wake: [2, 3], drain: 0.12, cook: 0, mentora: 1, coder: 0, mspd: 55, sue: 115 },
  { hl: 38, slides: 16, slide: 3.0, pfast: 130, wake: [2, 3], drain: 0.115, cook: 40, mentora: 1, coder: 0, mspd: 58, sue: 110 },
  { hl: 42, slides: 17, slide: 2.75, pfast: 140, wake: [2, 3], drain: 0.1, cook: 38, mentora: 1, coder: 1, mspd: 62, sue: 105 },
  { hl: 46, slides: 18, slide: 2.45, pfast: 152, wake: [1, 2], drain: 0.1, cook: 34, mentora: 1, coder: 2, mspd: 68, sue: 100 },
];
const CALLS = [
  ['RAFA', 'rafa', [
    '¿Aló? ¿Aló? Hola, soy Rafa. Te llamo desde la puerta de embarque, así que rapidito.',
    'Gracias por tomar el turno. La hackathon terminó y todos se fueron... bueno, casi todos.',
    'Hay un cabro en la sala de pitch que todavía no termina de presentar. Atiéndelo de vez en cuando. No le gusta presentar solo.',
    'Y en la sala de siesta quedó alguien durmiendo... déjalo dormir, ¿ya?',
    'Ah, y hay café en el lobby. Lo vas a necesitar. ¡Me llaman, chao!',
  ]],
  ['RAFA', 'rafa', [
    '¡Hola de nuevo! Sobreviviste. Te dije que era fácil.',
    'Oye, la mentora se quedó. Dice que nadie le pidió feedback en todo el fin de semana.',
    'Anda buscando a alguien que esté trabajando. Es buena onda, solo habla harto. Si te pilla... paciencia.',
    'Nos vemos, ¡ya casi embarcamos!',
  ]],
  ['RAFA', 'rafa', [
    'Hola, aterrizamos en San Francisco. Hace frío.',
    'Oye, el chef sigue cocinando. No sé para quién. Si te ofrece algo... tú verás.',
    'Yo después del bajón del sábado quedé raja. Y no le cierres la puerta en la cara, que se ofende.',
  ]],
  ['RAFA', 'rafa', [
    'Hola... ¿sigues ahí? Qué bueno.',
    'El de la sala de código dice que le faltan cinco minutos. Desde el sábado.',
    'Cuida la luz, que el edificio no es nuestro... y él está enchufado a todo. A todo.',
  ]],
  ['NACHO', 'nacho', [
    'Hola, soy Nacho. Rafa se quedó dormido en el avión.',
    'Oye... es la última noche. Mañana devolvemos el edificio.',
    'Creo que ellos también lo saben. Así que—',
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
const HINT = { look: 0, light: 0, door: 0, cams: 0, camnav: 0, pa: 0, stand: 0, flash: 0, run: 0, suit: 0 };
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
  const c = t.getContext();
  draw(c, w, h);
  t.refresh();
  return t;
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
  canvasTex('light', 128, 128, (c) => {
    const g = c.createRadialGradient(64, 64, 0, 64, 64, 64);
    g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(0.5, 'rgba(255,255,255,.65)');
    g.addColorStop(0.8, 'rgba(255,255,255,.2)'); g.addColorStop(1, 'rgba(255,255,255,0)');
    c.fillStyle = g; c.fillRect(0, 0, 128, 128);
  });
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

// ---- Room backgrounds ----
function px(c, col, x, y, w, h) { c.fillStyle = col; c.fillRect(x, y, w, h); }
function roomBase(c, r, floorA, floorB, wall, tile) {
  for (let y = 96; y < 560; y += tile) for (let x = 48; x < 752; x += tile)
    px(c, (((x / tile) | 0) + ((y / tile) | 0)) % 2 ? floorA : floorB, x, y, tile, tile);
  px(c, wall, 0, 0, W, 96); px(c, '#000', 0, 90, W, 6);
  px(c, '#0a0a0e', 0, 0, 48, H); px(c, '#0a0a0e', 752, 0, 48, H); px(c, '#0a0a0e', 0, 560, W, 40);
  px(c, 'rgba(255,255,255,.05)', 0, 70, W, 4);
  for (const d of DIRS) {
    if (nb(r, d) < 0) continue;
    if (d == 'N') { px(c, '#030303', 352, 18, 96, 78); px(c, '#555', 346, 14, 6, 82); px(c, '#555', 448, 14, 6, 82); px(c, '#555', 346, 12, 108, 6); }
    if (d == 'S') px(c, '#030303', 352, 560, 96, 40);
    if (d == 'W') px(c, '#030303', 0, 252, 48, 96);
    if (d == 'E') px(c, '#030303', 752, 252, 48, 96);
  }
}
function furn(c, r, col, top) {
  for (const o of OBS[r]) {
    px(c, 'rgba(0,0,0,.45)', o[0] + 6, o[1] + 8, o[2], o[3]);
    px(c, col, o[0], o[1] - 12, o[2], o[3] + 12);
    px(c, top, o[0], o[1] - 12, o[2], 10);
  }
}
function buildRooms() {
  canvasTex('room0', W, H, (c) => {
    roomBase(c, 0, '#c9c9c0', '#3a3a3a', '#6e6a5c', 32);
    furn(c, 0, '#8d8778', '#b5b0a0');
    px(c, '#222', 170, 112, 70, 34);
    for (let i = 0; i < 4; i++) { c.strokeStyle = '#a33'; c.lineWidth = 3; c.beginPath(); c.arc(185 + (i % 2) * 38, 122 + ((i / 2) | 0) * 16, 6, 0, PI * 2); c.stroke(); }
    px(c, '#9ab', 100, 112, 50, 30); px(c, '#567', 108, 118, 34, 18);
    px(c, '#ddd', 640, 96, 80, 70); px(c, '#999', 700, 110, 6, 30);
    px(c, '#e8d', 130, 395, 30, 20); px(c, '#ec5', 170, 398, 26, 16); px(c, '#d84', 210, 396, 40, 18);
    c.fillStyle = '#ddd'; c.font = 'bold 14px monospace'; c.fillText('BAJÓN 24/7', 520, 40);
  });
  canvasTex('room1', W, H, (c) => {
    roomBase(c, 1, '#5a1a22', '#4a1219', '#2a2230', 24);
    px(c, '#2b2b33', 100, 110, 600, 110); px(c, '#3c3c46', 100, 110, 600, 8); px(c, '#16161b', 100, 214, 600, 10);
    furn(c, 1, '#26262c', '#3d3d46');
    for (const o of OBS[1].slice(1)) for (let x = o[0] + 6; x < o[0] + o[2]; x += 30) px(c, '#7a2030', x, o[1] - 10, 22, 22);
    px(c, '#665', 528, 116, 34, 46); px(c, '#998', 524, 112, 42, 8);
    px(c, '#111', 240, 6, 320, 82);
    c.fillStyle = '#ffe'; c.font = 'bold 12px monospace'; c.fillText('DEMO DAY', 60, 40);
  });
  canvasTex('room2', W, H, (c) => {
    roomBase(c, 2, '#3c4048', '#34373e', '#26303a', 40);
    furn(c, 2, '#6d5a42', '#8c7558');
    for (const o of OBS[2]) for (let x = o[0] + 10; x < o[0] + o[2] - 30; x += 56) { px(c, '#222', x, o[1] - 10, 34, 20); px(c, '#111', x + 4, o[1] - 8, 26, 12); }
    c.fillStyle = '#9cf'; c.font = 'bold 13px monospace'; c.fillText('NO SE ACEPTAN ENTREGAS DESPUÉS DE LAS 12', 210, 50);
    for (let i = 0; i < 20; i++) px(c, pick(['#e33', '#fd3', '#3d6', '#39f']), rnd(60, 740), rnd(240, 360), 6, 6);
  });
  canvasTex('room3', W, H, (c) => {
    roomBase(c, 3, '#1f2c4a', '#24335a', '#1c1c2c', 48);
    for (let i = 0; i < 6; i++) px(c, '#344a7a', 90 + i * 100, 230 + (i % 2) * 150, 80, 40);
    for (const o of OBS[3]) { c.fillStyle = pick(['#a33', '#3a6', '#c6c', '#e94']); c.beginPath(); c.ellipse(o[0] + o[2] / 2, o[1] + o[3] / 2 - 8, o[2] / 2 + 4, o[3] / 2 + 6, 0, 0, PI * 2); c.fill(); }
    c.fillStyle = '#88a'; c.font = 'bold 13px monospace'; c.fillText('SILENCIO · ZONA DE DESCANSO', 270, 50);
    c.fillStyle = '#c43'; c.beginPath(); c.ellipse(210, 345, 40, 26, 0, 0, PI * 2); c.fill();
  });
  canvasTex('room4', W, H, (c) => {
    roomBase(c, 4, '#2a2e33', '#23272b', '#2b3036', 32);
    furn(c, 4, '#4a4238', '#665b4e');
    for (let i = 0; i < 3; i++) { px(c, '#111', 300 + i * 70, 350, 58, 30); px(c, '#1b3a5c', 304 + i * 70, 354, 50, 22); }
    px(c, '#333', 378, 450, 44, 40); px(c, '#222', 384, 488, 32, 8);
    px(c, '#ddd', 520, 420, 22, 10);
    c.fillStyle = '#e6c21a'; c.fillRect(78, 462, 52, 70); c.fillStyle = '#000'; c.font = 'bold 11px monospace'; c.fillText('TRAJE', 84, 500);
    c.fillStyle = '#9aa'; c.font = 'bold 12px monospace'; c.fillText('CONTROL · SEGURIDAD', 320, 50);
    c.fillStyle = '#e6c21a'; c.fillRect(600, 20, 70, 50); c.fillStyle = '#000'; c.fillText('PLATANUS', 604, 48);
  });
  canvasTex('room5', W, H, (c) => {
    roomBase(c, 5, '#5c5a58', '#666462', '#3e4a40', 56);
    furn(c, 5, '#2f3f68', '#4a5c90');
    px(c, '#311', 686, 96, 56, 74); px(c, '#622', 692, 104, 44, 30); px(c, '#000', 704, 140, 20, 16);
    c.fillStyle = '#fff'; c.font = 'bold 10px monospace'; c.fillText('CAFÉ', 699, 124);
    px(c, '#9cd', 230, 560, 340, 40);
    c.fillStyle = '#ffd400'; c.font = 'bold 16px monospace'; c.fillText('PLATANUS HACK 26 · SANTIAGO', 250, 50);
    c.fillStyle = '#ccc'; c.font = 'bold 11px monospace'; c.fillText('SPONSORS', 140, 150); c.fillText('STAND', 590, 460);
  });
}

// ---- Office panorama (first person, FNAF-style) 1600x600 ----
const PW = 1600, PCX = 800;
const ODOOR = { W: [150, 140, 180, 300], N: [710, 150, 180, 255], E: [1270, 140, 180, 300] };
const OPANEL = { W: [348, 250], N: [906, 238], E: [1212, 250] };
const OCENTER = { W: 240, N: 800, E: 1360 };
function buildOffice() {
  canvasTex('office', PW, H, (c) => {
    const g = c.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, '#1b1d22'); g.addColorStop(0.68, '#2a2d33'); g.addColorStop(0.681, '#111214'); g.addColorStop(1, '#060607');
    c.fillStyle = g; c.fillRect(0, 0, PW, H);
    c.fillStyle = '#0c0d10'; c.fillRect(0, 0, PW, 60);
    for (let x = 0; x < PW; x += 120) { c.fillStyle = '#16181c'; c.fillRect(x + 4, 6, 112, 46); }
    // FNAF checker stripe
    for (let x = 0; x < PW; x += 16) { c.fillStyle = (x / 16) % 2 ? '#d8d8d0' : '#141414'; c.fillRect(x, 352, 16, 10); c.fillStyle = (x / 16) % 2 ? '#141414' : '#d8d8d0'; c.fillRect(x, 362, 16, 10); }
    // checker floor in perspective
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
    // childish drawings of the team (FNAF homage)
    for (const [x, y] of [[600, 290], [650, 300], [990, 292], [1110, 300]]) {
      c.fillStyle = '#ece7da'; c.fillRect(x, y, 44, 48); c.strokeStyle = pick(['#c33', '#36c', '#393', '#c90']); c.lineWidth = 2;
      c.beginPath(); c.arc(x + 22, y + 15, 8, 0, PI * 2); c.moveTo(x + 22, y + 23); c.lineTo(x + 22, y + 38); c.moveTo(x + 12, y + 29); c.lineTo(x + 32, y + 29); c.stroke();
    }
    c.fillStyle = '#ddd'; c.beginPath(); c.arc(420, 100, 26, 0, PI * 2); c.fill(); c.fillStyle = '#222'; c.beginPath(); c.arc(420, 100, 22, 0, PI * 2); c.fill();
    // desk
    c.fillStyle = '#2f2922'; c.fillRect(440, 470, 720, 130);
    c.fillStyle = '#4a4034'; c.fillRect(440, 460, 720, 14); c.fillStyle = '#1d1914'; c.fillRect(440, 474, 720, 6);
    for (const mx of [480, 1000]) { c.fillStyle = '#0b0b0d'; c.fillRect(mx, 368, 130, 96); c.fillStyle = '#16304e'; c.fillRect(mx + 8, 376, 114, 76); c.fillStyle = '#0b0b0d'; c.fillRect(mx + 55, 462, 20, 8); }
    c.fillStyle = '#1a1a1c'; c.fillRect(630, 486, 160, 30); c.fillStyle = '#333'; for (let i = 0; i < 14; i++) { c.fillRect(636 + i * 11, 492, 8, 6); c.fillRect(636 + i * 11, 502, 8, 6); }
    c.fillStyle = '#a33'; c.fillRect(1050, 500, 80, 50); c.fillStyle = '#d8b06a'; c.fillRect(1056, 494, 68, 10); c.fillStyle = '#fff'; c.font = 'bold 10px monospace'; c.fillText('PIZZA', 1072, 530);
    c.fillStyle = '#ddb'; c.fillRect(860, 470, 22, 30); c.fillStyle = '#5a3a1a'; c.fillRect(862, 472, 18, 6);
    c.fillStyle = '#2a7'; c.fillRect(900, 474, 16, 30); c.fillStyle = '#0d4'; c.fillRect(900, 474, 16, 6);
    c.fillStyle = '#ece6c8'; c.fillRect(520, 490, 70, 50); c.fillStyle = '#999'; for (let i = 0; i < 5; i++) c.fillRect(526, 498 + i * 8, 50, 2);
    c.fillStyle = '#e6c21a'; c.beginPath(); c.ellipse(1140, 470, 16, 30, 0.4, 0, PI * 2); c.fill(); c.fillStyle = '#000'; c.fillRect(1134, 458, 3, 3); c.fillRect(1142, 456, 3, 3);
    c.fillStyle = '#222'; c.fillRect(800, 430, 60, 38); c.fillStyle = '#444'; c.fillRect(804, 434, 30, 30);
    c.fillStyle = '#333'; c.fillRect(712, 446, 6, 26); c.fillRect(696, 468, 38, 6);
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
let bgImg, darkRT, dynG, emG, coneGlow, projTxt, roomLbl;
let pImg, eImg = {}, oImg = {}, ghostImg, oGhost;
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

  bgImg = S.add.image(0, 0, 'room0').setOrigin(0); rC.add(bgImg);
  dynG = S.add.graphics(); rC.add(dynG);
  projTxt = S.add.text(400, 46, '', { fontFamily: 'monospace', fontSize: '18px', color: '#111', fontStyle: 'bold', align: 'center' }).setOrigin(0.5); rC.add(projTxt);
  for (const role of ['pitcher', 'sleeper', 'mentora', 'chef', 'coder']) { eImg[role] = S.add.image(0, 0, role + '0').setOrigin(0.5, 1).setScale(2.6); rC.add(eImg[role]); }
  ghostImg = S.add.image(0, 0, 'ghost0').setOrigin(0.5, 1).setScale(2.6).setVisible(false); rC.add(ghostImg);
  pImg = S.add.image(0, 0, 'guard0').setOrigin(0.5, 1).setScale(2.6); rC.add(pImg);
  darkRT = S.add.renderTexture(0, 0, W, H).setOrigin(0); rC.add(darkRT);
  coneGlow = S.add.image(0, 0, 'cone').setOrigin(0, 0.5).setBlendMode(Phaser.BlendModes.ADD).setTint(0xffe9a8).setAlpha(0.1); rC.add(coneGlow);
  emG = S.add.graphics(); rC.add(emG);
  for (let i = 0; i < 14; i++) { const t = S.add.text(0, 0, 'z', { fontFamily: 'monospace', fontSize: '16px', color: '#9fd8ff', fontStyle: 'bold' }).setVisible(false); rC.add(t); zPoolR.push(t); }
  roomLbl = S.add.text(400, 112, '', { fontFamily: 'monospace', fontSize: '11px', color: '#556' }).setOrigin(0.5); rC.add(roomLbl);

  oBg = S.add.image(0, 0, 'office').setOrigin(0); oC.add(oBg);
  oG = S.add.graphics(); oC.add(oG);
  for (const role of ['pitcher', 'sleeper', 'mentora', 'chef', 'coder']) { oImg[role] = S.add.image(0, 0, role + '0').setOrigin(0.5, 1); oC.add(oImg[role]); }
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
  window.FNAP = { held, HINT, get G() { return G; }, get mode() { return mode; }, startNight, setMode: (m) => (mode = m) };
}

// =====================================================================
// UI
// =====================================================================
const TS = (sz, col, extra) => Object.assign({ fontFamily: 'monospace', fontSize: sz + 'px', color: col || '#fff', fontStyle: 'bold' }, extra || {});
function uText(x, y, s, sz, col, ox, oy, extra) { const t = S.add.text(x, y, s, TS(sz, col, extra)).setOrigin(ox ?? 0.5, oy ?? 0.5); uC.add(t); return t; }
function uRect(x, y, w, h, col, a) { const r = S.add.rectangle(x, y, w, h, col, a ?? 1).setOrigin(0); uC.add(r); return r; }
const KEYBOX = { backgroundColor: '#000000cc', padding: { x: 6, y: 3 } };
function buildUI() {
  ui.g = S.add.graphics(); uC.add(ui.g);
  ui.stat = S.add.tileSprite(0, 0, W, H, 'noise').setOrigin(0).setAlpha(0); uC.add(ui.stat);
  ui.tab = uRect(0, H, W, H, 0x0e1612);
  ui.suit = S.add.image(0, 0, 'suitov').setOrigin(0).setAlpha(0); uC.add(ui.suit);
  ui.hour = uText(24, 22, '12 AM', 30, '#fff', 0, 0);
  ui.night = uText(26, 58, 'NOCHE 1', 14, '#aab', 0, 0);
  ui.pow = uText(776, 22, '', 16, '#fff', 1, 0);
  ui.sue = uText(776, 70, 'SUEÑO', 12, '#c9b6ff', 1, 0);
  ui.camLbl = uText(40, 34, '', 20, '#bfffcf', 0, 0);
  ui.rec = uText(600, 34, '● REC', 16, '#ff4444', 1, 0);
  ui.camTime = uText(40, 60, '', 13, '#8fdc9f', 0, 0);
  ui.camHint = uText(668, 474, '', 10, '#8fdc9f', 0.5, 0.5);
  ui.mapT = [];
  for (let i = 0; i < 6; i++) ui.mapT.push(uText(0, 0, i == CTRL ? 'TÚ' : 'CAM ' + (i + 1 - (i > CTRL)), 11, '#bfffcf'));
  ui.pr = []; for (let i = 0; i < 4; i++) ui.pr.push(uText(0, 0, '', 13, '#fff', 0.5, 0.5, KEYBOX));
  ui.camBar = uText(400, 580, '▲  CÁMARAS', 14, '#cfe', 0.5, 0.5, { backgroundColor: '#1f3b2acc', padding: { x: 80, y: 4 } });
  ui.stand = uText(16, 582, '▼ LEVANTARSE', 12, '#aab', 0, 0.5, KEYBOX);
  ui.arrL = uText(16, 300, '◄', 30, '#fff'); ui.arrR = uText(784, 300, '►', 30, '#fff');
  ui.msg = uText(400, 140, '', 22, '#fff', 0.5, 0.5, { stroke: '#000', strokeThickness: 5, align: 'center' });
  ui.thG = S.add.graphics(); uC.add(ui.thG);
  ui.th = uText(400, 300, '', 14, '#1a1a22', 0.5, 1, { backgroundColor: '#e9e6f2', padding: { x: 10, y: 6 }, wordWrap: { width: 300 }, align: 'center', fontStyle: 'italic bold' });
  ui.vig = S.add.container(820, 118); uC.add(ui.vig);
  ui.vigBg = S.add.rectangle(0, 0, 240, 158, 0xffffff).setOrigin(0); ui.vig.add(ui.vigBg);
  ui.vigIn = S.add.rectangle(5, 5, 230, 148, 0x333333).setOrigin(0); ui.vig.add(ui.vigIn);
  ui.vigDots = S.add.tileSprite(5, 5, 230, 148, 'noise').setOrigin(0).setAlpha(0.12); ui.vig.add(ui.vigDots);
  ui.vigImg = S.add.image(120, 118, 'pitcher0').setOrigin(0.5, 1).setScale(3.4); ui.vig.add(ui.vigImg);
  ui.vigTop = S.add.text(5, 5, 'MIENTRAS TANTO...', TS(11, '#111', { backgroundColor: '#ffd400', padding: { x: 5, y: 2 } })); ui.vig.add(ui.vigTop);
  ui.vigCap = S.add.text(120, 150, '', TS(11, '#fff', { backgroundColor: '#000000dd', padding: { x: 5, y: 3 }, wordWrap: { width: 216 }, align: 'center' })).setOrigin(0.5, 1); ui.vig.add(ui.vigCap);
  ui.vig.setAngle(-2).setVisible(false);
  ui.call = S.add.container(0, 0); uC.add(ui.call);
  const cb = S.add.rectangle(20, 470, 760, 96, 0x05060a, 0.88).setOrigin(0).setStrokeStyle(2, 0x3a4150); ui.call.add(cb);
  ui.callImg = S.add.image(70, 556, 'rafa0').setOrigin(0.5, 1).setScale(3); ui.call.add(ui.callImg);
  ui.callName = S.add.text(128, 478, 'RAFA', TS(14, '#ffd400')); ui.call.add(ui.callName);
  ui.callTxt = S.add.text(128, 500, '', TS(15, '#e8e8f0', { wordWrap: { width: 630 }, lineSpacing: 4 })); ui.call.add(ui.callTxt);
  ui.callSkip = S.add.text(770, 562, 'MANTÉN START PARA COLGAR', TS(10, '#667')).setOrigin(1, 1); ui.call.add(ui.callSkip);
  ui.call.setVisible(false);
  ui.lid = uRect(0, 0, W, 0, 0x000000); ui.lid2 = uRect(0, H, W, 0, 0x000000);
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
  ['pitcher', 'sleeper', 'mentora', 'chef', 'coder'].forEach((r, i) => { const im = sAdd(S.add.image(140 + i * 130, 360, r + '0').setScale(4.5).setOrigin(0.5, 1).setTint(0x111111)); ui.titleFaces.push(im); });
  ui.titleBeam = sAdd(S.add.image(400, 620, 'cone').setOrigin(0, 0.5).setBlendMode(Phaser.BlendModes.ADD).setScale(2.4, 2).setTint(0xfff0c0).setAlpha(0.35));
  ui.t1 = sText(400, 92, '5 NOCHES', 64, '#f2f2f2', 0.5, 0.5, { stroke: '#300', strokeThickness: 8 });
  ui.t2 = sText(400, 152, 'EN PLATANUS', 40, '#ffd400', 0.5, 0.5, { stroke: '#300', strokeThickness: 6 });
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
  if (kind) ['pitcher', 'sleeper', 'mentora', 'chef', 'coder'].forEach((r, i) => sAdd(S.add.image(110 + i * 70 - 400, 330 - 300, r + '0').setScale(2).setOrigin(0.5, 1).setTint(0x5e5b52).setAlpha(0.55), pc));
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
    T(92, 488, 'SE BUSCA GUARDIA NOCTURNO. Turno de 12 a 6 AM, cinco noches. Café ilimitado. No se requiere experiencia. El edificio debe devolverse impecable. Llamar a Rafa.', 13, '#222', 0, 0, { wordWrap: { width: 312 }, lineSpacing: 2 });
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
    view: 'office', pan: 400, panV: 0, focus: 'N', cams: 0, camA: 0, camR: 1, statA: 0, light: 0, paCd: 0, lockT: 0,
    doors: { W: 0, N: 0, E: 0 }, shut: 0, piles: { W: 0, N: 0, E: 0 },
    pl: { r: CTRL, x: CHAIR[0], y: CHAIR[1], ang: -PI / 2, tang: -PI / 2, flash: 1, run: 0, carry: 0, trapT: 0, stunT: 0, stepT: 0, hold: 0, holdK: '', walkA: 0, moveT: 0 },
    suit: 0, suitP: 0, ac: 0, acT: rnd(10, 20), blink: 0, blinkT: rnd(8, 14), ghost: null, ghostT: rnd(6, 12), noises: [], dread: 0, heartT: 0, msgT: 0,
    call: { i: -1, ch: 0, t: -1.5, skip: 0, set: CALLS[n - 1] }, flick: 0, scareT: rnd(14, 24), breathT: 3,
    th: null, thOnce: {}, vig: [], vigOn: null, vigOnce: {}, bumpT: 0,
    E: {},
  };
  const E = G.E;
  E.pitcher = mkE('pitcher', 1, PITCH_HOME[0], PITCH_HOME[1], 'PITCH');
  E.pitcher.slides = cf.slides; E.pitcher.slideT = cf.slide; E.pitcher.pause = 0;
  E.sleeper = mkE('sleeper', 3, SLEEP_HOME[0], SLEEP_HOME[1], 'SLEEP');
  E.sleeper.wakeAt = rnd(cf.wake[0], cf.wake[1]) * cf.hl; E.sleeper.anger = 0; E.sleeper.wm = 0;
  E.mentora = mkE('mentora', 0, 400, 300, 'WANDER'); E.mentora.cool = 0; E.mentora.goal = null;
  E.chef = mkE('chef', 0, CHEF_HOME[0], CHEF_HOME[1], 'COOK'); E.chef.cookT = cf.cook || 999;
  E.coder = mkE('coder', 2, CODER_HOME[0], CODER_HOME[1], 'TYPE'); E.coder.dis = 0;
  G.cables = [];
  if (cf.coder) {
    G.cables.push(mkCable([2, 1, 4]));
    if (cf.coder > 1) G.cables.push(mkCable([2, 5, 4]));
  }
  mode = 'play'; modeT = 0;
  setWorld(true); showHud();
  if (AC) ambG.gain.setTargetAtTime(1, AC.currentTime, 0.5);
  setMsg('', 0);
}
function mkCable(rooms) {
  const segs = rooms.map((r, i) => {
    const a = i == 0 ? [LAPTOP[0], LAPTOP[1] - 10] : DP[dirTo(r, rooms[i - 1])];
    const b = i == rooms.length - 1 ? STRIP : DP[dirTo(r, rooms[i + 1])];
    const mx = (a[0] + b[0]) / 2 + (a[1] == b[1] ? 0 : 60), my = (a[1] + b[1]) / 2 + (a[0] == b[0] ? 0 : 70);
    return { r, pts: [a, [mx, my], b] };
  });
  return { rooms, segs, cut: null, plugged: 1 };
}
const hourOf = (t) => (t / G.hl) | 0;
function clockStr(t) { const h = hourOf(t), mm = ((t % G.hl) / G.hl * 60) | 0; return (h == 0 ? 12 : h) + ':' + String(mm).padStart(2, '0') + ' AM'; }

// ---- thoughts & vignettes ----
// think(): the guard's inner voice. `once` keys only fire once per night.
function think(s, once, dur) {
  const g = G;
  if (once) { if (g.thOnce[once]) return; g.thOnce[once] = 1; }
  g.th = { s, t: dur || 3.2 };
}
// "MIENTRAS TANTO..." comic panels: [sprite, room color, caption]
const VIG = {
  pitch_low: ['pitcher', 1, 'SALA DE PITCH: "eh... ehh..." Le quedan pocas láminas.'],
  pitch_out: ['pitcher', 1, 'SALA DE PITCH: se acabaron las láminas. Busca público...'],
  sleep_wake: ['sleeper', 3, 'SALA DE SIESTA: ...alguien se despertó.'],
  sleep_mad: ['sleeper', -1, '¡EL DORMIDO SE ENOJÓ!'],
  chef_go: ['chef', 0, 'COCINA: ¡el bajón está listo! Va en camino...'],
  pile: ['chef', -1, 'Te dejaron platos en la puerta...'],
  coder_go: ['coder', 2, 'SALA DE CÓDIGO: "¿quién me desenchufó?"'],
  ment_see: ['mentora', -1, 'LA MENTORA vio una luz... "¿alguien trabajando?"'],
  power: ['coder', 4, 'QUEDA POCA ENERGÍA...'],
};
function vignette(k, skip) {
  const g = G;
  if (skip || (g.view == 'walk' && VIG[k][1] == g.pl.r)) return; // "meanwhile" only for elsewhere
  g.vigOnce[k] = (g.vigOnce[k] || 0) + 1;
  if (g.vig.length < 3 && !(g.vigOn && g.vigOn.k == k)) g.vig.push(k);
}
function updateVignette(dt) {
  const g = G;
  if (!g.vigOn && g.vig.length) {
    const k = g.vig.shift(), [role, room, cap] = VIG[k];
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
  if (g.view == 'office') officeInput(dt); else walkInput(dt);
  updateResources(dt);
  if (mode != 'play') return;
  updateBlink(dt);
  aiPitcher(dt); aiSleeper(dt); aiMentora(dt); aiChef(dt); aiCoder(dt);
  updateGhost(dt);
  g.acT -= dt; if (g.acT <= 0) { g.acT = rnd(14, 30); g.ac = 1; if (lRoom() == 5 || (g.cams && g.camR == 5)) noise(2.5, 0.12, 'lowpass', 300, 0.4, 900); }
  g.ac = M.max(0, g.ac - dt * 0.4);
  if (mode != 'play') return;
  checkAttacks();
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
  if (pr('4') && g.pl.trapT <= 0 && g.lockT <= 0 && g.n >= 2) {
    if (g.suitP == 0 || g.suitP == 1) { g.suitDir = g.suit ? -1 : 1; SFX.zip(); HINT.suit++; if (!g.suit) think('Hace calor aquí adentro... y da sueño.', 'suit'); }
  }
  if (g.suitDir) {
    g.suitP = clamp(g.suitP + g.suitDir * dt, 0, 1);
    if (g.suitP == 1 && g.suitDir > 0) { g.suit = 1; g.suitDir = 0; }
    if (g.suitP == 0 && g.suitDir < 0) { g.suit = 0; g.suitDir = 0; }
  }
}

// ---- Office: continuous FNAF-style look-around ----
function officeInput(dt) {
  const g = G;
  const dir = (hd('R') ? 1 : 0) - (hd('L') ? 1 : 0);
  g.panV = lerp(g.panV, g.cams ? 0 : dir * 820, 1 - M.pow(0.0008, dt));
  if (g.lockT > 0) { g.lockT -= dt; g.cams = 0; g.light = 0; g.panV *= 0.5; }
  g.pan = clamp(g.pan + g.panV * dt, 0, PW - W);
  if (dir && !g.cams) HINT.look += dt / 1.5;
  let best = null, bd = 260;
  for (const d of ADOOR) { const dd = M.abs(OCENTER[d] - (g.pan + 400)); if (dd < bd) { bd = dd; best = d; } }
  g.focus = best;
  g.camA = clamp(g.camA + (g.cams ? dt : -dt) * 5, 0, 1);
  if (g.lockT > 0) return;
  if (!g.cams) {
    if ((pr('U') || pr('3')) && !g.out) { g.cams = 1; SFX.cam(); g.statA = 0.9; HINT.cams++; }
    else if (pr('D')) { standUp(); HINT.stand++; return; }
    g.light = hd('1') && !g.out && !g.suit && g.focus ? 1 : 0;
    if (pr('1') && g.light) { SFX.light(); HINT.light++; }
    if (pr('2') && g.focus) { toggleDoor(g.focus); HINT.door++; }
  } else {
    g.light = 0;
    const [c, r] = RC[g.camR];
    if (pr('3') || (pr('D') && (r == 1 || c == 1))) { g.cams = 0; SFX.cam(); }
    else {
      let nc = c, nr = r;
      if (pr('L')) nc--; if (pr('R')) nc++; if (pr('U')) nr--; if (pr('D')) nr++;
      nc = clamp(nc, 0, 2); nr = clamp(nr, 0, 1);
      let n = nr * 3 + nc;
      if (n == CTRL) n = pr('L') ? 3 : pr('R') ? 5 : g.camR;
      if (n != g.camR) { g.camR = n; SFX.cam(); g.statA = 0.85; HINT.camnav++; }
      if (pr('2')) {
        if (g.paCd <= 0 && g.power > 3) { g.paCd = 8; g.power -= 3; addNoise(g.camR, 400, 300, 1.2, 'pa'); SFX.pa(); SFX.applause(0.25, 0); setMsg('ALTAVOZ: ' + RNAME[g.camR], 1.5); HINT.pa++; }
        else SFX.err();
      }
    }
    if (g.out) g.cams = 0;
  }
}
function toggleDoor(d) {
  const g = G;
  if (g.out) { SFX.err(); think('No hay energía... las puertas no responden.', 'outdoor'); return; }
  if (g.piles[d] >= 3) { SFX.err(); think('No cierra... hay platos atascando la puerta. Tendré que sacarlos.', 0, 3); return; }
  if (d == 'N') { g.doors.N = g.doors.N ? 0 : 1; SFX.shutter(0); }
  else { g.doors[d] = g.doors[d] ? 0 : 1; SFX.door(d == 'W' ? -0.7 : 0.7); }
}
const doorClosed = (d) => (d == 'N' ? G.shut > 0.5 : !!G.doors[d]);
function standUp() {
  const g = G;
  g.view = 'walk'; g.cams = 0; g.camA = 0; g.light = 0;
  g.pl.r = CTRL; g.pl.x = CHAIR[0]; g.pl.y = CHAIR[1] + 30; g.pl.ang = g.pl.tang = -PI / 2;
  SFX.step(1, 0);
  think(g.n == 1 ? 'A ver... ¿qué habrá allá afuera?' : 'Rápido. Las cámaras no me cuidan si no estoy sentado.', 'stand1');
}
function sitDown() {
  const g = G;
  g.view = 'office'; g.pan = 400; g.panV = 0; g.cams = 0;
  g.pl.x = CHAIR[0]; g.pl.y = CHAIR[1];
  SFX.step(1, 0);
}

// ---- Walking ----
function interactables() {
  const g = G, pl = g.pl, L = [];
  if (pl.r == 1) L.push({ k: 'clicker', x: LECTERN[0], y: LECTERN[1], rad: 60, hold: 0.6, txt: 'PASAR LÁMINA' });
  if (pl.r == 5) L.push({ k: 'coffee', x: COFFEE[0], y: COFFEE[1], rad: 60, hold: 1.4, txt: 'TOMAR CAFÉ' });
  if (pl.r == 0 && pl.carry) L.push({ k: 'wash', x: SINK[0], y: SINK[1], rad: 64, hold: 0.8, txt: 'LAVAR PLATOS' });
  if (pl.r == CTRL) {
    L.push({ k: 'chair', x: CHAIR[0], y: CHAIR[1], rad: 50, hold: 0, txt: 'SENTARSE' });
    const dp = { W: [96, 300], N: [400, 140], E: [704, 300] };
    for (const d of ADOOR) {
      if (G.piles[d] && !pl.carry) L.push({ k: 'pile', d, x: dp[d][0], y: dp[d][1], rad: 64, hold: 0.5, txt: 'RECOGER PLATOS (' + G.piles[d] + ')' });
      else L.push({ k: 'door', d, x: dp[d][0], y: dp[d][1], rad: 56, hold: 0, txt: (d == 'N' ? (G.doors.N ? 'ABRIR CORTINA' : 'CERRAR CORTINA') : G.doors[d] ? 'ABRIR PUERTA' : 'CERRAR PUERTA') });
    }
  }
  for (const c of g.cables) {
    if (!c.plugged) continue;
    for (const s of c.segs) if (s.r == pl.r) {
      const q = nearSeg(s.pts, pl.x, pl.y);
      if (q.d < 36) L.push({ k: 'cut', cable: c, x: q.x, y: q.y, rad: 36, hold: 1.0, txt: 'DESENCHUFAR CABLE' });
    }
  }
  if (pl.carry) L.push({ k: 'eat', x: pl.x, y: pl.y, rad: 999, hold: 1.2, txt: 'COMERSE LOS PLATOS (' + pl.carry + ')', low: 1 });
  return L;
}
function nearSeg(pts, x, y) {
  let best = { d: 1e9 };
  for (let i = 0; i < pts.length - 1; i++) {
    const [ax, ay] = pts[i], [bx, by] = pts[i + 1];
    const l2 = (bx - ax) ** 2 + (by - ay) ** 2;
    const t = clamp(((x - ax) * (bx - ax) + (y - ay) * (by - ay)) / (l2 || 1), 0, 1);
    const qx = ax + (bx - ax) * t, qy = ay + (by - ay) * t, d = dist(x, y, qx, qy);
    if (d < best.d) best = { d, x: qx, y: qy };
  }
  return best;
}
function walkInput(dt) {
  const g = G, pl = g.pl;
  if (pl.trapT > 0) {
    pl.trapT -= dt;
    if (pr('1') || pr('2') || pr('3')) pl.trapT -= 0.3;
    if (pl.trapT <= 0) { G.E.mentora.st = 'COOL'; G.E.mentora.cool = 14; }
    pl.walkA = 0;
    return;
  }
  if (pl.stunT > 0) { pl.stunT -= dt; return; }
  if (pr('1') && !g.suit) { pl.flash = pl.flash ? 0 : 1; SFX.light(); if (pl.flash) HINT.flash++; }
  if (g.suit) pl.flash = 0;
  let mx = (hd('R') ? 1 : 0) - (hd('L') ? 1 : 0), my = (hd('D') ? 1 : 0) - (hd('U') ? 1 : 0);
  const moving = mx || my;
  pl.run = hd('3') && !g.suit && !pl.carry && moving ? 1 : 0;
  if (pl.run) HINT.run += dt;
  pl.moveT = moving ? pl.moveT + dt : 0;
  const sp = g.suit ? 70 : pl.carry ? 95 : pl.run ? 215 : 128;
  if (moving) {
    const l = M.hypot(mx, my); mx /= l; my /= l;
    pl.tang = M.atan2(my, mx);
    moveAxis(pl, pl.x + mx * sp * dt, pl.y); moveAxis(pl, pl.x, pl.y + my * sp * dt);
    pl.walkA += dt * (pl.run ? 14 : 9);
    pl.stepT -= dt;
    if (pl.stepT <= 0) {
      pl.stepT = pl.run ? 0.24 : 0.36;
      SFX.step(pl.run ? 1.3 : 0.7, 0);
      if (pl.run) addNoise(pl.r, pl.x, pl.y, 0.55, 'run');
      if (pl.carry && M.random() < 0.3) { SFX.plates(0.6, 0); addNoise(pl.r, pl.x, pl.y, 0.6, 'plates'); }
      if (pl.run) for (const c of g.cables) if (c.plugged) for (const s of c.segs) if (s.r == pl.r && nearSeg(s.pts, pl.x, pl.y).d < 10) {
        pl.stunT = 0.9; SFX.trip(0); addNoise(pl.r, pl.x, pl.y, 1, 'trip'); think('¡Auch! El cable...', 0, 2); S.cameras.main.shake(200, 0.01);
      }
    }
  } else pl.walkA = 0;
  pl.ang += angD(pl.tang, pl.ang) * (1 - M.pow(0.00002, dt));
  roomTransition();
  const L = interactables();
  let tgt = null, best = 1e9;
  for (const it of L) { const d = it.low ? 998 : dist(pl.x, pl.y, it.x, it.y); if (d < it.rad && d < best) { best = d; tgt = it; } }
  g.tgt = tgt;
  if (tgt) {
    const key = tgt.k + (tgt.d || '');
    if (tgt.hold == 0) { if (pr('2')) doInteract(tgt); pl.hold = 0; }
    else if (hd('2')) {
      if (pl.holdK != key) { pl.holdK = key; pl.hold = 0; }
      pl.hold += dt;
      if (pl.hold >= tgt.hold) { doInteract(tgt); pl.hold = 0; pl.holdK = ''; }
    } else pl.hold = 0;
  } else pl.hold = 0;
}
function moveAxis(pl, nx, ny) {
  const g = G;
  const dN = M.abs(nx - 400) < 40, dW = M.abs(ny - 300) < 38;
  let bumped = null;
  const open = (d) => {
    const n = nb(pl.r, d); if (n < 0) return false;
    if (pl.r == CTRL && CDOOR[d] && doorClosed(d)) { bumped = 'in'; return false; }
    for (const cd of ADOOR) if (n == CTRL && CDOOR[cd].adj == pl.r && CDOOR[cd].ad == d && doorClosed(cd)) { bumped = 'out'; return false; }
    return true;
  };
  let minX = 62, maxX = 738, minY = 106, maxY = 552;
  if (dW && open('W')) minX = 20; if (dW && open('E')) maxX = 780;
  if (dN && open('N')) minY = 60; if (dN && open('S')) maxY = 590;
  const cx = clamp(nx, minX, maxX), cy = clamp(ny, minY, maxY);
  if (bumped && (cx != nx || cy != ny) && g.bumpT <= 0) {
    g.bumpT = 4; SFX.knock(0);
    think(bumped == 'out' ? 'Cerrada... la cerré desde adentro. Tendré que dar la vuelta.' : 'Está cerrada. Puedo abrirla aquí mismo.', 0, 3);
  }
  if (hitObs(pl.r, cx, cy)) return;
  pl.x = cx; pl.y = cy;
}
function roomTransition() {
  const g = G, pl = g.pl;
  let d = null;
  if (pl.x < 40) d = 'W'; else if (pl.x > 760) d = 'E'; else if (pl.y < 80) d = 'N'; else if (pl.y > 572) d = 'S';
  if (!d) return;
  const n = nb(pl.r, d);
  if (n < 0) return;
  pl.r = n;
  const p = DP[OPP[d]];
  if (d == 'W' || d == 'E') pl.x = p[0] + (d == 'W' ? -16 : 16);
  else pl.y = p[1] + (d == 'N' ? -8 : 10);
  ui.fade.setAlpha(0.85);
  SFX.step(1, 0);
  const first = ['Huele a completo... el chef sigue cocinando.', g.E.pitcher.st == 'PITCH' ? '¿Sigue presentando? ...Ese clicker en el atril.' : '¿Dónde está el que presentaba?', 'Todas las pantallas apagadas... menos una.', 'Shhh... alguien duerme. Mejor no alumbrarle la cara.', '', 'Café. Gracias, Rafa.'][n];
  if (first) think(first, 'room' + n);
}
function doInteract(t) {
  const g = G, pl = g.pl;
  if (t.k == 'chair') sitDown();
  else if (t.k == 'door') toggleDoor(t.d);
  else if (t.k == 'clicker') {
    const p = g.E.pitcher;
    p.slides = g.cf.slides; p.slideT = g.cf.slide;
    if (p.st == 'SEARCH') p.st = 'RETURN';
    SFX.click(); setMsg('"¡SIGUIENTE LÁMINA!"', 1.2);
    think('Listo. Eso lo mantendrá ocupado un rato.', 'click1');
  } else if (t.k == 'coffee') {
    g.sueno = M.max(0, g.sueno - 65); SFX.coffee(0); addNoise(5, COFFEE[0], COFFEE[1], 1, 'coffee'); setMsg('☕  -SUEÑO', 1.2);
    think('Ahh... mucho mejor. Pero esa máquina hace mucho ruido.', 'coffee1');
  } else if (t.k == 'pile') {
    pl.carry = g.piles[t.d]; g.piles[t.d] = 0; SFX.plates(1, 0); addNoise(CTRL, t.x, t.y, 0.7, 'plates');
    think('¿Los llevo al lavaplatos de la cocina... o me los como?', 'pile1');
  } else if (t.k == 'wash') {
    pl.carry = 0; SFX.plates(0.8, 0); setMsg('PLATOS LIMPIOS', 1);
  } else if (t.k == 'eat') {
    g.sueno += 10 * pl.carry; pl.carry = 0; SFX.eat(); setMsg('*ÑAM*  +SUEÑO', 1.2);
  } else if (t.k == 'cut') {
    const c = t.cable;
    c.plugged = 0; c.cut = { r: pl.r, x: t.x, y: t.y };
    SFX.click(); SFX.err(); setMsg('CABLE DESENCHUFADO', 1.2);
    think('Menos consumo... pero alguien va a venir a arreglarlo.', 'cut1');
    const cd = g.E.coder;
    if (cd.st == 'TYPE') { cd.st = 'WAIT'; cd.t = rnd(3, 6); cd.job = c; }
  }
}

// ---- Resources ----
function updateResources(dt) {
  const g = G;
  g.shut = clamp(g.shut + (g.doors.N ? dt : -dt) / 1.4, 0, 1);
  for (const d of ADOOR) if (g.piles[d] >= 3) { if (d == 'N') g.doors.N = 0; else g.doors[d] = 0; }
  if (!g.out) {
    let u = g.cf.drain;
    if (g.doors.W) u += 0.17; if (g.doors.E) u += 0.17; if (g.shut > 0) u += 0.24;
    if (g.light) u += 0.22; if (g.cams && g.view == 'office') u += 0.12;
    for (const c of g.cables) if (c.plugged) u += 0.2;
    g.use = u;
    g.power -= u * dt;
    if (g.power < 20 && !g.vigOnce.power) vignette('power');
    if (g.power <= 0) powerOut();
  }
  g.paCd -= dt; g.bumpT -= dt;
  g.sueno += dt * (100 / g.cf.sue) * (g.suit ? 2.4 : 1);
  if (g.sueno > 55) think('Se me cierran los ojos... necesito un café.', 'sleepy');
  if (g.sueno >= 100) return lose(g.suit ? 'springlock' : 'sleep');
}
function powerOut() {
  const g = G;
  g.power = 0; g.out = 1; g.doors = { W: 0, N: 0, E: 0 }; g.cams = 0; g.light = 0;
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
  const s = g.E.sleeper, p = g.E.pitcher, m = g.E.mentora;
  if (g.view == 'walk') {
    if (s.r == g.pl.r && s.st == 'SLEEP' && seen(s)) think('Está profundamente dormido. Que siga así.', 'sleepsee');
    if (s.r == g.pl.r && s.st == 'WANDER' && seen(s)) think('¿Está... caminando dormido? No lo despiertes. No lo alumbres.', 'walksee');
    if (p.st == 'SEARCH' && p.r == g.pl.r && seen(p)) think('¡Me vio! Si lo alumbro camina más lento...', 'psee');
    if (g.cf.mentora && m.r == g.pl.r && seen(m) && g.pl.flash) think('La mentora... viene hacia mi luz.', 'msee');
    for (const c of g.cables) for (const sg of c.segs) if (c.plugged && sg.r == g.pl.r && nearSeg(sg.pts, g.pl.x, g.pl.y).d < 120) think('Un cable que va hasta la sala de control. Está chupando energía.', 'cable');
  } else if (!g.cams) {
    const bd = blindDoor(s);
    if (bd && s.st == 'WANDER' && !doorClosed(bd)) think('Escucho ronquidos en la puerta... no prendas la luz. Ya se irá.', 'sleepdoor', 3.6);
  }
}

// ---- Perception ----
// 0 = not seen, 1 = seen, 2 = in flashlight/door light (direct light)
function seen(e) {
  const g = G, pl = g.pl;
  if (blinking()) return 0;
  if (g.view == 'walk') {
    if (e.r != pl.r) return 0;
    const d = dist(e.x, e.y, pl.x, pl.y);
    if (pl.flash && d < 420 && M.abs(angD(M.atan2(e.y - 20 - pl.y, e.x - pl.x), pl.ang)) < 0.44) return 2;
    if (d < 90 || pl.r == CTRL) return 1;
    if (pl.r == 1 && e.y < 330) return 1;
    return 0;
  }
  if (g.cams) return g.camR == e.r && !blindDoor(e) ? 1 : 0;
  const fi = g.focus ? CDOOR[g.focus].a : -1;
  if (e.r == CTRL) {
    const a = M.atan2(e.x - CHAIR[0], CHAIR[1] - e.y), sec = a < -0.55 ? 0 : a > 0.55 ? 2 : 1;
    if (g.light && sec == fi) return 2;
    return dist(e.x, e.y, SEAT[0], SEAT[1]) < 200 ? 1 : 0;
  }
  const bd = blindDoor(e);
  if (bd && g.light && bd == g.focus && !doorClosed(bd)) return 2;
  return 0;
}
function plTarget() { const g = G; return g.view == 'office' ? [CTRL, SEAT[0], SEAT[1]] : [g.pl.r, g.pl.x, g.pl.y]; }
function blockedSet(e) {
  const g = G, b = new Set();
  for (const d of ADOOR) if (doorClosed(d)) b.add(ek(CTRL, CDOOR[d].adj));
  const s = g.E.sleeper;
  if (e && e != s && s.st == 'SLEEP' && s.door) b.add(s.door);
  return b;
}
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
const atPl = (e, rad) => { const [r, x, y] = plTarget(); return e.r == r && dist(e.x, e.y, x, y) < (rad || 30); };

// =====================================================================
// AI
// =====================================================================
function aiPitcher(dt) {
  const g = G, p = g.E.pitcher, m = g.E.mentora;
  p.anim += dt;
  const audience = g.cf.mentora && m.r == 1 && m.st == 'WANDER' && m.y > 230;
  if (p.st == 'PITCH') {
    go(p, 1, PITCH_HOME[0] + M.sin(g.t * 0.4) * 70, PITCH_HOME[1], 22, dt);
    if (!audience) p.slideT -= dt;
    if (p.slideT <= 0) {
      p.slides--; p.slideT = g.cf.slide;
      if (p.slides == 3) vignette('pitch_low', g.n > 2);
      if (p.slides <= 0) { p.st = 'SEARCH'; p.pause = 0; vignette('pitch_out'); }
    }
  } else if (p.st == 'SEARCH') {
    if (p.pause > 0) { p.pause -= dt; p.mv = 0; return; }
    if (g.suit) { p.mv = 0; return; }
    const sp = seen(p) ? 30 : g.cf.pfast;
    const [r, x, y] = plTarget();
    if (go(p, r, x, y, sp, dt) == -1) go(p, 1, blindPt('N')[0], blindPt('N')[1], sp, dt);
    if (audience) { p.st = 'RETURN'; p.slides = 6; }
  } else if (p.st == 'RETURN') {
    if (go(p, 1, PITCH_HOME[0], PITCH_HOME[1], 95, dt)) p.st = 'PITCH';
  }
  for (const n of g.noises) if (n.kind == 'pa' && !n.pd && p.st == 'SEARCH' && gdist(n.r, p.r) <= 1) { n.pd = 1; p.pause = 4; }
}
function aiSleeper(dt) {
  const g = G, s = g.E.sleeper;
  s.anim += dt;
  const sv = seen(s);
  if (s.st == 'SLEEP') {
    s.mv = 0;
    if (sv == 2) { s.wm += dt; s.shake = s.wm; if (s.wm > 1.1) wakeSleeper(s); } else s.wm = M.max(0, s.wm - dt * 0.5);
    if (g.t > s.wakeAt && !s.slept) { s.slept = 1; wakeSleeper(s); }
    for (const n of g.noises) if (!n.sd && n.r == s.r && n.t > (s.sleptAt || 0) && (n.loud >= 1 || dist(n.x, n.y, s.x, s.y) < 150 * n.loud)) { n.sd = 1; wakeSleeper(s); }
    if (g.cf.mentora && g.E.mentora.r == s.r && dist(g.E.mentora.x, g.E.mentora.y, s.x, s.y) < 60 && g.E.mentora.st == 'WANDER') wakeSleeper(s);
    return;
  }
  if (s.st == 'WANDER') {
    if (sv == 2) s.anger += dt; else s.anger = M.max(0, s.anger - dt * 0.6);
    s.shake = s.anger / 1.5;
    if (s.anger >= 1.5) { s.st = 'ANGRY'; s.t = 11; tone(140, 0.5, 'sawtooth', 0.2, panOf(s), 70); vignette('sleep_mad'); return; }
    const nz = g.noises.filter((n) => g.t - n.t < 5 && gdist(n.r, s.r) <= 2).sort((a, b) => b.t - a.t)[0];
    if (nz && nz !== s.lastN) { s.lastN = nz; s.goal = [nz.r, nz.x, nz.y]; s.wait = rnd(3, 6); }
    if (!s.goal) {
      if (M.random() < 0.35) { const d = pick(ADOOR), b = blindPt(d); s.goal = [CDOOR[d].adj, b[0], b[1]]; s.wait = rnd(8, 14); }
      else { const r = (M.random() * 6) | 0, sp = pick(SPOTS[r]); s.goal = [r, sp[0], sp[1]]; s.wait = rnd(3, 7); }
    }
    if (go(s, s.goal[0], s.goal[1], s.goal[2], 44, dt)) { s.mv = 0; s.wait -= dt; if (s.wait <= 0) s.goal = null; }
    if (s.stuck) s.goal = null;
    if (atPl(s, 26) && g.view == 'walk') { s.anger += 1.0; g.pl.x += (g.pl.x - s.x) * 0.6; g.pl.y += (g.pl.y - s.y) * 0.6; }
    return;
  }
  if (s.st == 'ANGRY') {
    s.t -= dt; s.shake = 1.4;
    const [r, x, y] = plTarget();
    if (go(s, r, x, y, 165, dt) == -1) s.t -= dt * 2;
    if (s.t <= 0) fallAsleep(s);
  }
}
function wakeSleeper(s) { s.st = 'WANDER'; s.goal = null; s.anger = 0.3; s.door = null; s.wm = 0; tone(300, 0.3, 'triangle', 0.1, panOf(s), 500); vignette('sleep_wake'); }
function fallAsleep(s) {
  s.st = 'SLEEP'; s.anger = 0; s.shake = 0; s.door = null; s.wm = 0; s.sleptAt = G.t;
  for (const d of DIRS) { const p = DP[d], n = nb(s.r, d); if (n >= 0 && dist(s.x, s.y, p[0], p[1]) < 90) s.door = ek(s.r, n); }
}
function aiMentora(dt) {
  const g = G, m = g.E.mentora, pl = g.pl;
  m.anim += dt;
  const active = g.cf.mentora;
  if (m.st == 'TALK') { m.mv = 0; if (pl.trapT <= 0) { m.st = 'COOL'; m.cool = 14; } return; }
  if (m.st == 'OFFICE') { m.mv = 0; if (g.lockT <= 0) { m.st = 'COOL'; m.cool = 16; } return; }
  if (m.st == 'COOL') { m.cool -= dt; if (m.cool <= 0) m.st = 'WANDER'; }
  if (active && m.st == 'WANDER' && !g.suit) {
    const had = m.goal && m.goal[3] == 'pl';
    if (g.view == 'walk' && pl.flash && pl.r == m.r) m.goal = [pl.r, pl.x, pl.y, 'pl'];
    else if (g.view == 'walk' && pl.flash && gdist(pl.r, m.r) == 1 && M.random() < dt * 0.25) m.goal = [pl.r, pl.x, pl.y, 'pl'];
    else if (g.view == 'office' && g.light && M.random() < dt * 0.35 && gdist(m.r, CTRL) <= 2) m.goal = [CTRL, SEAT[0], SEAT[1], 'pl'];
    if (!had && m.goal && m.goal[3] == 'pl') vignette('ment_see');
    for (const n of g.noises) if (n.kind == 'pa' && !n.md && gdist(n.r, m.r) <= 2) { n.md = 1; m.goal = [n.r, 400, 320]; m.wait = rnd(10, 16); }
  }
  if (!m.goal) {
    const r = M.random() < 0.3 ? 1 : (M.random() * 6) | 0, sp = pick(SPOTS[r]);
    m.goal = [r, sp[0], sp[1]]; m.wait = r == 1 ? rnd(12, 22) : rnd(4, 9);
  }
  if (m.goal[3] == 'pl') { const [r, x, y] = plTarget(); m.goal = [r, x, y, 'pl']; if ((g.view == 'walk' && !pl.flash && M.random() < dt * 0.8) || g.suit) m.goal = null; }
  if (m.goal) {
    const res = go(m, m.goal[0], m.goal[1], m.goal[2], g.cf.mspd, dt);
    if (res == 1) { m.mv = 0; m.wait = (m.wait || 3) - dt; if (m.wait <= 0 && m.goal[3] != 'pl') m.goal = null; }
    if (res == -1 || m.stuck) m.goal = null;
  }
  if (!active || m.st != 'WANDER' || g.suit) return;
  const c = g.E.coder;
  if (g.cf.coder && c.r == m.r && dist(c.x, c.y, m.x, m.y) < 90 && c.dis <= 0) { c.dis = 15; m.goal = [m.r, m.x, m.y]; m.wait = 8; }
  if (atPl(m, 30)) {
    if (g.view == 'walk') { m.st = 'TALK'; pl.trapT = 4.5; setMsg('"¿PUEDO DARTE UN FEEDBACK?"', 2); think('¡Me atrapó! (machaca botones para zafar)', 0, 3); SFX.murmur(1, 0); }
    else { m.st = 'OFFICE'; g.lockT = 5; g.cams = 0; setMsg('"MMM... ¿Y CUÁL ES TU MODELO DE NEGOCIO?"', 3); think('No puedo hacer nada mientras me habla...', 0, 3); SFX.murmur(1, 0); }
    m.goal = null;
  }
}
function aiChef(dt) {
  const g = G, c = g.E.chef;
  c.anim += dt;
  if (!g.cf.cook) { go(c, 0, CHEF_HOME[0] + M.sin(g.t) * 40, CHEF_HOME[1], 30, dt); return; }
  if (c.st == 'COOK') {
    go(c, 0, CHEF_HOME[0] + M.sin(g.t) * 40, CHEF_HOME[1], 30, dt);
    c.cookT -= dt;
    if (c.cookT <= 0) { c.st = 'DELIVER'; c.chase = 22; SFX.bell(0.5, panOf(c)); vignette('chef_go'); }
  } else if (c.st == 'DELIVER') {
    const [r, x, y] = plTarget();
    if (go(c, r, x, y, 62, dt) == -1) {
      if (!c.kd) { let best = null, bd = 99; for (const d of ADOOR) { const p = bfs(c.r, CDOOR[d].adj, blockedSet(c)); if (p && p.length < bd) { bd = p.length; best = d; } } c.kd = best || 'N'; }
      const b = blindPt(c.kd);
      if (go(c, CDOOR[c.kd].adj, b[0], b[1], 62, dt) == 1) {
        c.kt = (c.kt || 0) + dt;
        if (c.kt > 0.1 && !c.knocked) { c.knocked = 1; SFX.knock(panOf(c)); if (g.view == 'office') think('Están golpeando la puerta...', 'knock'); }
        if (c.kt > 3) { g.piles[c.kd] = M.min(3, g.piles[c.kd] + 1); SFX.plates(0.8, panOf(c)); vignette('pile'); chefHome(c); }
      }
    } else { c.kd = null; c.kt = 0; c.knocked = 0; }
    if (g.view == 'walk' && g.pl.r != CTRL) { c.chase -= dt; if (c.chase <= 0) chefHome(c); }
  } else if (c.st == 'RETURN') {
    if (go(c, 0, CHEF_HOME[0], CHEF_HOME[1], 70, dt) == 1) { c.st = 'COOK'; c.cookT = g.cf.cook * rnd(0.8, 1.2); }
  }
}
function chefHome(c) { c.st = 'RETURN'; c.kd = null; c.kt = 0; c.knocked = 0; }
function aiCoder(dt) {
  const g = G, c = g.E.coder;
  c.anim += dt;
  if (c.dis > 0) { c.dis -= dt; c.mv = 0; return; }
  if (c.st == 'TYPE') { go(c, 2, CODER_HOME[0], CODER_HOME[1], 40, dt); if (g.cf.coder) { const j = g.cables.find((k) => !k.plugged); if (j) { c.st = 'WAIT'; c.t = rnd(2, 4); c.job = j; } } return; }
  if (c.st == 'WAIT') { c.mv = 0; c.t -= dt; if (c.t <= 0) { c.st = 'FIX'; vignette('coder_go'); } return; }
  if (c.st == 'FIX') {
    const k = c.job.cut;
    const res = go(c, k.r, k.x, k.y, 78, dt);
    if (res == -1) { const d = dirTo(CTRL, c.job.rooms[1]), b = blindPt(d); go(c, CDOOR[d].adj, b[0], b[1], 78, dt); }
    if (res == 1) { c.st = 'REPAIR'; c.t = 3; SFX.type(0.6, panOf(c)); }
    return;
  }
  if (c.st == 'REPAIR') { c.mv = 0; c.t -= dt; if (c.t <= 0) { c.job.plugged = 1; c.job.cut = null; c.st = 'BACK'; } return; }
  if (c.st == 'BACK') { if (go(c, 2, CODER_HOME[0], CODER_HOME[1], 70, dt) == 1) c.st = 'TYPE'; return; }
  if (c.st == 'HUNT') {
    const [r, x, y] = plTarget();
    c.huntT += dt;
    if (r == CTRL && c.r == CTRL && g.view == 'office') {
      c.mv = 0;
      if (!c.strike) c.strike = rnd(6, 16);
      c.strikeT = (c.strikeT || 0) + dt;
      if (c.strikeT > c.strike) lose('coder');
      return;
    }
    if (r == CTRL && g.view == 'office' && c.r != CTRL) { go(c, CTRL, 400, 140, 60, dt); return; }
    go(c, r, x, y, 70, dt);
  }
}
function updateGhost(dt) {
  const g = G;
  if (g.ghost) { g.ghost.t -= dt; if (g.ghost.t <= 0 || g.ghost.seenT > 0.3) g.ghost = null; return; }
  if (g.sueno < 70) return;
  g.ghostT -= dt;
  if (g.ghostT <= 0) {
    g.ghostT = rnd(4, 9);
    const r = g.view == 'walk' ? g.pl.r : g.cams ? g.camR : pick([3, 1, 5]);
    const sp = pick(SPOTS[r]);
    g.ghost = { r, x: sp[0], y: sp[1], t: rnd(1.5, 3), seenT: 0, door: g.view == 'office' && !g.cams ? pick(ADOOR) : null };
    if (g.cams) g.statA = 0.6;
    think('¿Qué fue eso? ...¿estoy viendo cosas?', 'ghost');
  }
}

// ---- Attacks ----
function checkAttacks() {
  const g = G, E = g.E;
  const p = E.pitcher;
  if (p.st == 'SEARCH' && !g.suit && atPl(p, g.view == 'office' ? 44 : 28)) return lose('pitcher');
  const s = E.sleeper;
  if (s.st == 'ANGRY' && atPl(s, g.view == 'office' ? 44 : 28)) return lose('sleeper');
  const c = E.chef;
  if (c.st == 'DELIVER' && atPl(c, g.view == 'office' ? 44 : 30)) {
    if (g.suit) return lose('chef');
    g.sueno += 28; SFX.eat(); setMsg('"¡COME, COME! ¡TE VES FLACO!"  +SUEÑO', 2.2); think('Ugh... después de comer me da sueño.', 'ate'); chefHome(c);
    if (g.sueno >= 100) return lose('sleep');
  }
  const k = E.coder;
  if ((k.st == 'FIX' || k.st == 'BACK' || k.st == 'REPAIR' || (k.st == 'HUNT' && g.view == 'walk')) && atPl(k, 28)) return lose('coder');
}

// =====================================================================
// AUDIO CUES & SUSPENSE
// =====================================================================
function lRoom() { return G.view == 'office' ? CTRL : G.pl.r; }
function audible(e) {
  const lr = lRoom();
  const gd = gdist(e.r, lr);
  if (gd == 0) return 1;
  if (gd == 1) { const d = dirTo(lr, e.r); const dp = DP[OPP[d]]; return 0.25 + 0.45 * clamp(1 - dist(e.x, e.y, dp[0], dp[1]) / 500, 0, 1); }
  return gd == 2 ? 0.09 : 0.03;
}
function panOf(e) {
  const g = G, lr = lRoom();
  if (e.r == lr) { if (g.view == 'walk') return clamp((e.x - g.pl.x) / 380, -1, 1); return clamp((e.x - 400) / 360, -1, 1); }
  return clamp((RC[e.r][0] - RC[lr][0]) * 0.7, -1, 1);
}
function audioCues(dt) {
  const g = G, E = g.E;
  let d = 0;
  const lr = lRoom();
  const p = E.pitcher; if (p.st == 'SEARCH') d = M.max(d, 1 - gdist(p.r, lr) * 0.3);
  const s = E.sleeper; if (s.st == 'ANGRY') d = M.max(d, 1 - gdist(s.r, lr) * 0.25); else if (s.st == 'WANDER') d = M.max(d, s.shake * 0.8, blindDoor(s) && g.view == 'office' ? 0.45 : 0);
  const c = E.coder; if (c.st == 'FIX' || c.st == 'HUNT') d = M.max(d, 0.9 - gdist(c.r, lr) * 0.3);
  if (E.chef.st == 'DELIVER') d = M.max(d, 0.5 - gdist(E.chef.r, lr) * 0.15);
  if (g.sueno > 80) d = M.max(d, (g.sueno - 80) / 25);
  g.dread = lerp(g.dread, clamp(d, 0, 1), 1 - M.pow(0.2, dt));
  // random flicker of the lights
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
      if (e.st == 'PITCH') { if (e.slides <= 3) { SFX.stutter(v, pn); e.snd = 1.1; } else { SFX.babble(v * 0.8, pn, 300); e.snd = rnd(0.5, 1.2); } }
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
      else { SFX.step(v, pn); e.snd = 0.4; }
    }
  }
  g.breathT -= dt;
  if (g.breathT <= 0) { g.breathT = 3.2; if (g.view == 'office') for (const k in E) { const bd = blindDoor(E[k]); if (bd && !doorClosed(bd) && (k != 'mentora' || g.cf.mentora)) SFX.breath(0.8, bd == 'W' ? -0.8 : bd == 'E' ? 0.8 : 0); } }
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
  const camMode = g.view == 'office' && g.cams && g.camA >= 1;
  const showRoom = g.view == 'walk' || camMode;
  rC.setVisible(showRoom); oC.setVisible(!showRoom);
  if (showRoom) renderRoom(camMode ? g.camR : g.pl.r, camMode, dt);
  else renderOffice(dt);
  renderHud(dt);
  if (FX) {
    FX.nv = camMode ? 1 : 0;
    FX.no = (camMode ? 0.1 : 0.03) + g.statA * 0.5 + (g.out ? 0.05 : 0);
    FX.ab = g.dread * 1.2 + (g.sueno > 70 ? 0.4 : 0);
    FX.dk = 0.2 + g.sueno / 170 + g.dread * 0.3;
    FX.wp = g.sueno > 85 ? (g.sueno - 85) / 15 : 0;
  }
}
function renderRoom(r, cam, dt) {
  const g = G, pl = g.pl, E = g.E;
  bgImg.setTexture('room' + r);
  dynG.clear(); emG.clear();
  roomLbl.setText(cam ? '' : RNAME[r]);
  for (const c of g.cables) for (const s of c.segs) if (s.r == r) {
    dynG.lineStyle(4, 0x111111, 1); dynG.beginPath(); dynG.moveTo(s.pts[0][0], s.pts[0][1]);
    for (let i = 1; i < s.pts.length; i++) dynG.lineTo(s.pts[i][0], s.pts[i][1]);
    dynG.strokePath();
    if (c.cut && c.cut.r == r) { dynG.fillStyle(0xffaa00, 1); dynG.fillCircle(c.cut.x, c.cut.y, 6); }
  }
  if (r == CTRL) { const dp = { W: [96, 330], N: [440, 130], E: [704, 330] }; for (const d of ADOOR) for (let i = 0; i < g.piles[d]; i++) { dynG.fillStyle(0xeeeeee, 1); dynG.fillEllipse(dp[d][0] + i * 6, dp[d][1] - i * 7, 30, 10); dynG.fillStyle(0xcc6633, 1); dynG.fillEllipse(dp[d][0] + i * 6, dp[d][1] - i * 7 - 2, 16, 5); } }
  const doorRect = (d) => { if (d == 'N') dynG.fillRect(352, 18, 96, 78); else if (d == 'S') dynG.fillRect(352, 560, 96, 40); else if (d == 'W') dynG.fillRect(0, 252, 48, 96); else dynG.fillRect(752, 252, 48, 96); };
  const closedSides = [];
  for (const d of ADOOR) {
    if (!doorClosed(d) && !(d == 'N' && g.shut > 0.05)) continue;
    dynG.fillStyle(0x5a5f66, 1);
    if (r == CTRL) { doorRect(d); closedSides.push(d); }
    else if (r == CDOOR[d].adj) { doorRect(CDOOR[d].ad); closedSides.push(CDOOR[d].ad); }
  }
  const p = E.pitcher;
  if (r == 1) {
    const q = p.st != 'PITCH';
    const done = g.cf.slides - p.slides + 1;
    dynG.fillStyle(q ? 0xffffff : 0xf4f1e0, 1); dynG.fillRect(246, 10, 308, 74);
    projTxt.setVisible(true).setText(q ? '¿PREGUNTAS?' : 'LÁMINA ' + done + '/' + g.cf.slides).setColor(q ? '#c00' : '#222');
    if (!q) { dynG.fillStyle(0x3366cc, 1); for (let i = 0; i < 5; i++) dynG.fillRect(270 + i * 20, 76 - (i + 1) * 4 - (done % 4) * 2, 12, (i + 1) * 4 + (done % 4) * 2); }
  } else projTxt.setVisible(false);
  if (r == 5) {
    const amp = 0.08 + g.ac * 0.5;
    let x = 171, y = 480, a = -PI / 2 + M.sin(g.t * 1.3) * amp;
    for (let i = 0; i < 9; i++) {
      const w = 22 - M.abs(i - 4) * 1.5;
      dynG.fillStyle(i == 8 ? 0x5a3a10 : i % 2 ? 0xf2cf1d : 0xe0b812, 1);
      dynG.fillRect(x - w / 2, y - 10, w, 14);
      if (i == 5) { dynG.fillStyle(0x111111, 1); dynG.fillRect(x - 6, y - 6, 4, 4); dynG.fillRect(x + 3, y - 6, 4, 4); }
      a += 0.12 + M.sin(g.t * 2.1 + i * 0.6) * amp * 0.6;
      x += M.cos(a) * 12; y += M.sin(a) * 12;
    }
  }
  for (const k in E) {
    const e = E[k], im = eImg[k];
    const vis = e.r == r && (!cam || !blindDoor(e));
    im.setVisible(vis);
    if (!vis) continue;
    im.setTexture(frameOf(e));
    const sh = e.shake ? (M.random() - 0.5) * e.shake * 7 : 0;
    im.setPosition(e.x + sh, e.y).setFlipX(e.fx < 0);
    if (k == 'sleeper' && e.st == 'SLEEP') im.setRotation(-PI / 2).setOrigin(0.5, 0.5).setPosition(e.x + sh, e.y - 10);
    else im.setRotation(0).setOrigin(0.5, 1);
    im.setTint(k == 'mentora' && !g.cf.mentora ? 0x888888 : 0xffffff);
    im.setDepth(e.y);
  }
  const gh = g.ghost;
  ghostImg.setVisible(!!(gh && gh.r == r && !gh.door));
  if (ghostImg.visible) { ghostImg.setPosition(gh.x, gh.y).setTexture(SPRF.ghost[((g.t * 6) | 0) % 4]).setAlpha(0.75); if (!cam && seen(gh) == 2) gh.seenT += dt; }
  pImg.setVisible(!cam && pl.r == r);
  if (!cam) {
    const bob = pl.walkA ? M.abs(M.sin(pl.walkA)) * 3 : 0;
    pImg.setTexture(g.suit ? SPRF.suit[0] : pl.walkA ? SPRF.guard[((pl.walkA / 1.6) | 0) % 2 ? 0 : 2] : SPRF.guard[0]);
    pImg.setPosition(pl.x, pl.y - bob).setFlipX(M.cos(pl.ang) < 0).setDepth(pl.y);
    if (pl.trapT > 0) pImg.x += M.sin(g.t * 40) * 2;
  }
  const order = [eImg.pitcher, eImg.sleeper, eImg.mentora, eImg.chef, eImg.coder, ghostImg, pImg].sort((a, b) => a.depth - b.depth);
  for (const im of order) rC.bringToTop(im);
  rC.bringToTop(darkRT); rC.bringToTop(coneGlow); rC.bringToTop(emG);
  for (const z of zPoolR) rC.bringToTop(z);
  rC.bringToTop(roomLbl);
  // ---- lighting ----
  darkRT.setVisible(!cam); coneGlow.setVisible(false);
  if (!cam) {
    const fl = g.flick > 0;
    darkRT.clear();
    // Control keeps its fluorescent lights on (while there is power); everywhere else is dark
    darkRT.fill(0x000000, g.out ? 0.975 : r == CTRL ? (fl ? 0.7 : 0.22) : fl ? 0.97 : 0.92);
    const L = (x, y, rad, a) => darkRT.stamp('light', null, x, y, { scale: rad / 64, alpha: a ?? 1, erase: true });
    L(pl.x, pl.y - 20, 95, 0.95);
    L(400, 330, 520, 0.08);
    if (pl.flash && !g.suit) {
      const f = M.random() < 0.03 ? 0.35 : 0.94 + M.random() * 0.06;
      const ox = pl.x, oy = pl.y - 22;
      const cfg = { originX: 0, originY: 0.5, scaleX: 1.75, scaleY: 1.65, rotation: pl.ang, alpha: f, erase: true };
      darkRT.stamp('cone', null, ox, oy, cfg);
      cfg.alpha = f * 0.6; darkRT.stamp('cone', null, ox, oy, cfg);
      coneGlow.setVisible(true).setPosition(ox, oy).setRotation(pl.ang).setScale(1.75, 1.65).setAlpha(0.12 * f);
    }
    if (r == 1) { L(400, 200, 240, 0.85); L(400, 60, 170, 1); }
    if (r == 2 && (E.coder.r == 2 || g.cf.coder)) L(LAPTOP[0], LAPTOP[1], 80, 0.6);
    if (r == 0) L(205, 130, 70, 0.4);
    if (r == 5) L(COFFEE[0], COFFEE[1] - 50, 60, 0.5);
    for (const k of ['pitcher', 'chef', 'coder', 'mentora']) { const e = E[k]; if (e.r == r && (k != 'mentora' || g.cf.mentora)) L(e.x, e.y - 30, 30, 0.25); }
  }
  // ---- emissives (always readable in the dark) ----
  for (const d of DIRS) if (nb(r, d) >= 0) {
    emG.lineStyle(2, 0x6a7a88, cam ? 0.2 : 0.45);
    if (d == 'N') emG.strokeRect(350, 16, 100, 80); else if (d == 'S') emG.strokeRect(350, 560, 100, 40); else emG.strokeRect(d == 'W' ? 0 : 752, 250, 48, 100);
    emG.fillStyle(0x00cc55, cam ? 0.5 : 0.9);
    if (d == 'N') emG.fillRect(380, 4, 40, 7); else if (d == 'S') emG.fillRect(380, 586, 40, 5); else emG.fillRect(d == 'W' ? 6 : 788, 266, 6, 30);
  }
  for (const d of closedSides) {
    emG.fillStyle(0xff2222, ((g.t * 2) | 0) % 2 ? 1 : 0.5);
    if (d == 'N') emG.fillRect(394, 50, 12, 12); else if (d == 'S') emG.fillRect(394, 572, 12, 10); else emG.fillRect(d == 'W' ? 18 : 770, 294, 12, 12);
  }
  for (const c of g.cables) for (const s of c.segs) if (s.r == r && c.plugged) {
    emG.fillStyle(((g.t * 3) | 0) % 2 ? 0x44ff66 : 0x117722, 1);
    for (const q of s.pts) emG.fillRect(q[0] - 3, q[1] - 3, 6, 6);
  }
  if (r == 5) { emG.fillStyle(0xff2222, 0.9); emG.fillRect(712, 150, 4, 4); }
  if (r == 1) { emG.fillStyle(0xffd400, 0.8); emG.fillRect(LECTERN[0] - 3, 120, 6, 6); }
  if (r == CTRL && !g.out) { emG.fillStyle(0x3a7acc, 0.5); for (let i = 0; i < 3; i++) emG.fillRect(304 + i * 70, 342, 50, 22); }
  const em = (e, col, ox, oy, s) => { emG.fillStyle(col, 0.95); emG.fillRect(e.x + ox, e.y + oy, s, s); };
  if (E.pitcher.r == r) em(E.pitcher, 0xff2222, E.pitcher.fx * 18, -40, 4);
  if (E.chef.r == r && E.chef.st != 'COOK') { emG.fillStyle(0xff8a2a, 0.35); emG.fillCircle(E.chef.x, E.chef.y - 34, 18); em(E.chef, 0xffbb55, -3, -36, 6); }
  if (E.coder.r == r) { emG.fillStyle(0x45ff7a, 0.22); emG.fillCircle(E.coder.x, E.coder.y - 34, 22); }
  if (E.mentora.r == r && g.cf.mentora) em(E.mentora, 0xc77dff, -E.mentora.fx * 14, -30, 5);
  if (!cam) for (const d of DIRS) {
    const n = nb(r, d); if (n < 0) continue;
    for (const k in E) {
      const e = E[k];
      if (e.r != n || (k == 'mentora' && !g.cf.mentora)) continue;
      const o = DP[OPP[d]], dd = dist(e.x, e.y, o[0], o[1]);
      if (dd > 280) continue;
      const a = (1 - dd / 280) * 0.5 * (0.7 + 0.3 * M.sin(g.t * 5));
      const [x, y] = DP[d];
      emG.fillStyle(ROLE_COL[k], a);
      if (d == 'N') emG.fillRect(356, 22, 88, 70); else if (d == 'S') emG.fillRect(356, 566, 88, 34); else emG.fillRect(d == 'W' ? 0 : 754, 256, 46, 88);
      if (k == 'sleeper') { emG.fillStyle(0x9fd8ff, a); emG.fillRect(x - 3, y - 50 + M.sin(g.t * 2) * 6, 6, 6); }
    }
  }
  updateZ(E.sleeper, dt);
  zPoolR.forEach((t, i) => {
    const z = E.sleeper.parts[i];
    if (!z || E.sleeper.r != r || (cam && blindDoor(E.sleeper))) { t.setVisible(false); return; }
    const ang = E.sleeper.st == 'ANGRY';
    t.setVisible(true).setText(ang ? '!' : 'z').setColor(ang ? '#ff4040' : '#9fd8ff').setPosition(E.sleeper.x + z.dx, E.sleeper.y - 40 + z.dy).setAlpha(z.l).setScale(0.8 + (1 - z.l) * 0.8);
  });
  if (cam && gh && gh.r == r) g.statA = M.max(g.statA, 0.25);
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
  updateZ(E.sleeper, dt);
  const fl = g.flick > 0 || g.out;
  if (!g.out) { oG.fillStyle(0x2a6ab0, 0.15 + M.random() * 0.03); for (const mx of [488, 1008]) oG.fillRect(mx, 376, 114, 76); oG.fillStyle(0x9fd0ff, 0.5); oG.fillRect(498, 390, 50, 3); oG.fillRect(1018, 400, 70, 3); }
  for (const d of ADOOR) {
    const [x, y, w, h] = ODOOR[d];
    const lit = g.light && g.focus == d && !doorClosed(d);
    if (lit) { oG.fillStyle(0xfff0b0, 0.22); oG.fillRect(x, y, w, h); oG.fillStyle(0x4a463c, 0.5); oG.fillRect(x, y + h - 60, w, 60); }
    for (let i = 0; i < g.piles[d]; i++) { oG.fillStyle(0xdddddd, 1); oG.fillEllipse(x + w / 2 + (i - 1) * 32, y + h + 34 - i * 4, 46, 14); oG.fillStyle(0xcc6633, 1); oG.fillEllipse(x + w / 2 + (i - 1) * 32, y + h + 31 - i * 4, 24, 6); }
    const im = oDoors[d];
    if (d == 'N') im.setVisible(g.shut > 0.01).setCrop(0, 255 * (1 - g.shut), 180, 255).setY(y - 255 * (1 - g.shut));
    else im.setVisible(!!g.doors[d]);
  }
  for (const k in E) {
    const e = E[k], im = oImg[k];
    im.setVisible(false);
    if (k == 'mentora' && !g.cf.mentora) continue;
    let sx, sy, sc, tint;
    const bd = blindDoor(e);
    if (e.r == CTRL) {
      const a = M.atan2(e.x - CHAIR[0], CHAIR[1] - e.y), dd = dist(e.x, e.y, CHAIR[0], CHAIR[1]);
      sx = PCX + a * 490; sc = clamp(1000 / dd, 2.8, 9.5); sy = 410 + (sc - 2.8) * 30;
      const sv = seen(e);
      tint = sv == 2 ? 0xffffff : k == 'coder' && g.out ? 0x3aa060 : dd < 280 && !g.out ? 0x55555f : 0x141418;
    } else if (bd && !doorClosed(bd)) {
      const [x, y, w, h] = ODOOR[bd];
      sx = x + w / 2 + (e.x - 400) * 0.05; sy = y + h - 6; sc = 3.6;
      tint = seen(e) == 2 ? 0xffffff : 0x0a0a0c;
    } else continue;
    im.setVisible(true).setTexture(frameOf(e)).setScale(sc).setPosition(sx + (e.shake ? (M.random() - 0.5) * e.shake * 10 : 0), sy).setFlipX(e.fx < 0).setTint(tint);
    im.setRotation(k == 'sleeper' && e.st == 'SLEEP' ? -PI / 2 : 0);
    const top = sy - 24 * sc;
    if (k == 'pitcher') { oG.fillStyle(0xff2222, 1); oG.fillRect(sx + e.fx * 6 * sc, top + 10 * sc, sc * 1.6, sc * 1.6); }
    if (k == 'chef') { oG.fillStyle(0xff8a2a, 0.3); oG.fillCircle(sx, top + 8 * sc, 8 * sc); }
    if (k == 'coder') { oG.fillStyle(0x45ff7a, 0.18 + (e.st == 'HUNT' ? M.random() * 0.15 : 0)); oG.fillCircle(sx, top + 10 * sc, 9 * sc); }
    if (k == 'mentora') { oG.fillStyle(0xc77dff, 0.9); oG.fillRect(sx - e.fx * 5 * sc, top + 12 * sc, sc * 2, sc * 1.5); }
    if (k == 'sleeper') zPoolO.forEach((t, i) => { const z = e.parts[i]; if (!z) return t.setVisible(false); t.setVisible(true).setText(e.st == 'ANGRY' ? '!' : 'z').setColor(e.st == 'ANGRY' ? '#ff4040' : '#9fd8ff').setPosition(sx + z.dx * sc * 0.4, top + z.dy * sc * 0.4).setAlpha(z.l); });
  }
  if (!(E.sleeper.r == CTRL || (blindDoor(E.sleeper) && !doorClosed(blindDoor(E.sleeper))))) zPoolO.forEach((t) => t.setVisible(false));
  const gh = g.ghost;
  oGhost.setVisible(!!(gh && gh.door && !doorClosed(gh.door)));
  if (oGhost.visible) {
    const [x, y, w, h] = ODOOR[gh.door];
    const lit = g.light && g.focus == gh.door;
    oGhost.setTexture(SPRF.ghost[((g.t * 6) | 0) % 4]).setScale(3.6).setPosition(x + w / 2, y + h - 6).setTint(lit ? 0xffffff : 0x1a1a1a);
    if (lit) gh.seenT += dt;
  }
  // ---- props drawn on top: fan, button panels, clock, phone LED, lamp ----
  const fa = g.t * 22;
  oTop.fillStyle(0x2a2a2e, 1); oTop.fillCircle(715, 440, 26);
  oTop.fillStyle(0x55585e, 1); for (let i = 0; i < 3; i++) { const a = fa + i * 2.094; oTop.fillTriangle(715, 440, 715 + M.cos(a) * 24, 440 + M.sin(a) * 24, 715 + M.cos(a + 0.6) * 24, 440 + M.sin(a + 0.6) * 24); }
  oTop.fillStyle(0x111111, 1); oTop.fillCircle(715, 440, 5);
  for (const d of ADOOR) {
    const [bx, by] = OPANEL[d];
    const closed = !!g.doors[d];
    const jam = g.piles[d] >= 3;
    oTop.fillStyle(g.out ? 0x220000 : closed ? 0xff2a2a : jam ? 0x884400 : 0x5a1010, 1); oTop.fillCircle(bx + 20, by + 26, 11);
    oTop.fillStyle(g.out ? 0x111111 : g.light && g.focus == d ? 0xffffee : 0x4a4a44, 1); oTop.fillCircle(bx + 20, by + 70, 11);
    if (g.focus == d && !g.cams) { oTop.lineStyle(2, 0xffd400, 0.35 + M.sin(g.t * 6) * 0.2); oTop.strokeRect(bx - 6, by - 6, 52, 108); }
  }
  const hA = (hourOf(g.t) / 12) * PI * 2 - PI / 2, mA = ((g.t % g.hl) / g.hl) * PI * 2 - PI / 2;
  oTop.lineStyle(3, 0xdddddd, 1); oTop.lineBetween(420, 100, 420 + M.cos(hA) * 12, 100 + M.sin(hA) * 12);
  oTop.lineStyle(2, 0xdddddd, 1); oTop.lineBetween(420, 100, 420 + M.cos(mA) * 18, 100 + M.sin(mA) * 18);
  if (callOn() && ((g.t * 3) | 0) % 2) { oTop.fillStyle(0x33ff55, 1); oTop.fillRect(842, 438, 8, 8); }
  oBeam.setVisible(!!g.light);
  if (g.light) {
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
  for (const k of ['hour', 'night', 'pow', 'sue', 'camLbl', 'rec', 'camTime', 'camHint', 'msg', 'camBar', 'stand', 'arrL', 'arrR', 'th']) ui[k] && ui[k].setVisible(false);
  ui.pr && ui.pr.forEach((t) => t.setVisible(false));
  ui.mapT && ui.mapT.forEach((t) => t.setVisible(false));
  ui.g && ui.g.clear(); ui.thG && ui.thG.clear(); ui.call && ui.call.setVisible(false); ui.vig && ui.vig.setVisible(false);
  ui.stat && ui.stat.setAlpha(0); ui.suit && ui.suit.setAlpha(0); ui.tab && (ui.tab.y = H);
  ui.lid && (ui.lid.height = 0, ui.lid2.height = 0);
  ui.scr && ui.scr.setVisible(false); ui.scrT && ui.scrT.setText('');
  ui.fade && ui.fade.setAlpha(0);
}
function prompt(i, x, y, s, col, a) { ui.pr[i].setVisible(true).setText(s).setPosition(clamp(x, 80, 720), clamp(y, 20, 560)).setColor(col || '#fff').setAlpha(a ?? 1); }
function renderHud(dt) {
  const g = G, gr = ui.g, pl = g.pl;
  gr.clear();
  ui.pr.forEach((t) => t.setVisible(false));
  ui.hour.setText((hourOf(g.t) == 0 ? 12 : hourOf(g.t)) + ' AM');
  ui.night.setText('NOCHE ' + g.n);
  ui.pow.setText(g.out ? 'SIN ENERGÍA' : 'ENERGÍA ' + M.ceil(g.power) + '%').setColor(g.power < 20 ? '#ff5555' : '#ffffff');
  if (!g.out) { const u = clamp(M.round((g.use || 0) / 0.18), 1, 5); for (let i = 0; i < 5; i++) { gr.fillStyle(i < u ? (i < 2 ? 0x44dd66 : i < 4 ? 0xeecc33 : 0xee4444) : 0x222222, 1); gr.fillRect(668 + i * 22, 46, 18, 12); } }
  gr.fillStyle(0x1a1430, 1); gr.fillRect(626, 88, 150, 10);
  gr.fillStyle(g.sueno > 70 ? 0xb44dff : 0x7a5cff, 1); gr.fillRect(626, 88, 150 * clamp(g.sueno / 100, 0, 1), 10);
  ui.sue.setText(g.sueno > 70 ? 'SUEÑO ¡¡CAFÉ!!' : 'SUEÑO').setColor(g.sueno > 70 && M.sin(g.t * 8) > 0 ? '#ff77ff' : '#c9b6ff');
  const office = g.view == 'office';
  ui.tab.y = H * (1 - (office ? g.camA : 0)); ui.tab.setVisible(office && g.camA > 0 && g.camA < 1); // tablet only while flipping
  const cm = office && g.cams && g.camA >= 1;
  ui.hour.setVisible(!cm); ui.night.setVisible(!cm);
  for (const k of ['camLbl', 'rec', 'camTime', 'camHint']) ui[k].setVisible(cm);
  ui.mapT.forEach((t) => t.setVisible(cm));
  if (cm) {
    ui.camLbl.setText('CAM ' + (g.camR + 1 - (g.camR > CTRL)) + ' · ' + RNAME[g.camR]);
    ui.rec.setAlpha(((g.t * 2) | 0) % 2);
    ui.camTime.setText(clockStr(g.t));
    gr.lineStyle(2, 0x6fdc8f, 0.7); gr.strokeRect(20, 20, 760, 560);
    const mx = 560, my = 372;
    for (let i = 0; i < 6; i++) {
      const [c, r] = RC[i], x = mx + c * 74, y = my + r * 44;
      gr.fillStyle(i == g.camR ? 0x2f8f4f : 0x0c2a16, 0.9); gr.fillRect(x, y, 68, 38);
      gr.lineStyle(1, 0x6fdc8f, 1); gr.strokeRect(x, y, 68, 38);
      ui.mapT[i].setPosition(x + 34, y + 19);
      if (i == 1 && (g.E.pitcher.slides <= 3 || g.E.pitcher.st == 'SEARCH') && ((g.t * 4) | 0) % 2) { gr.fillStyle(0xff3344, 1); gr.fillRect(x + 54, y + 4, 10, 10); }
    }
    ui.camHint.setText(g.paCd > 0 ? 'ALTAVOZ: ESPERA ' + M.ceil(g.paCd) + 's' : (learned('camnav', 2) ? '' : 'STICK: CÁMARA · ') + 'B2 ALTAVOZ · B3 BAJAR');
    if (!learned('pa', 1) && g.paCd <= 0) prompt(0, 400, 330, 'B2 · ALTAVOZ: hacer ruido en esta sala', '#bfffcf');
  }
  // office prompts: on the button panel of the door you are looking at
  ui.camBar.setVisible(office && !g.cams && !g.out && g.lockT <= 0);
  ui.stand.setVisible(office && !g.cams && g.lockT <= 0);
  const showArr = office && !g.cams && !learned('look', 2);
  ui.arrL.setVisible(showArr && g.pan > 40).setAlpha(0.4 + M.sin(g.t * 5) * 0.4);
  ui.arrR.setVisible(showArr && g.pan < PW - W - 40).setAlpha(0.4 + M.sin(g.t * 5) * 0.4);
  if (office && !g.cams && g.focus && g.lockT <= 0 && !g.out) {
    const [bx, by] = OPANEL[g.focus], sx = bx - g.pan, side = g.focus == 'E' ? -1 : 1;
    const closed = !!g.doors[g.focus], jam = g.piles[g.focus] >= 3;
    const nm = g.focus == 'N' ? 'CORTINA' : 'PUERTA';
    const a = learned('door', 3) && learned('light', 3) ? 0.6 : 1;
    prompt(0, sx + 20 + side * 82, by + 26, jam ? 'ATASCADA' : 'B2 ' + (closed ? 'ABRIR ' : 'CERRAR ') + nm, jam ? '#ffaa55' : closed ? '#ff8888' : '#fff', a);
    if (!g.suit) prompt(1, sx + 20 + side * 60, by + 70, 'B1 LUZ', '#ffe9a0', a);
  }
  if (office && !g.cams && g.n >= 2 && !learned('suit', 2) && g.lockT <= 0) prompt(2, 690, 540, 'B4 · TRAJE DE PLÁTANO', '#ffd400');
  // walking prompts: on the object itself
  if (g.view == 'walk' && pl.trapT <= 0) {
    if (g.tgt) {
      const t = g.tgt, ox = t.low ? pl.x : t.x, oy = t.low ? pl.y - 80 : t.y - 52;
      prompt(0, ox, oy, 'B2 · ' + t.txt);
      if (t.hold && pl.hold > 0) { gr.fillStyle(0x000000, 0.6); gr.fillRect(ox - 40, oy + 14, 80, 6); gr.fillStyle(0xffd400, 1); gr.fillRect(ox - 40, oy + 14, 80 * pl.hold / t.hold, 6); }
    }
    if (!pl.flash && !g.suit && pl.r != CTRL && !learned('flash', 2)) prompt(1, pl.x, pl.y + 26, 'B1 · LINTERNA', '#ffe9a0');
    else if (pl.moveT > 1.5 && !learned('run', 2) && !g.suit && !pl.carry) prompt(1, pl.x, pl.y + 26, 'B3 · CORRER (hace ruido)', '#ccc');
    if (pl.r == CTRL && g.n >= 2 && !learned('suit', 2) && dist(pl.x, pl.y, 104, 500) < 120) prompt(2, 104, 440, 'B4 · TRAJE DE PLÁTANO', '#ffd400');
  }
  if (g.view == 'walk' && pl.trapT > 0) prompt(0, pl.x, pl.y - 80, '¡MACHACA B1 B2 B3!', '#ff9');
  if (cm) for (const k in g.E) { const e = g.E[k]; if (e.r == g.camR && e.mv && !blindDoor(e)) g.statA = M.max(g.statA, 0.16); }
  g.statA = M.max(0, g.statA - dt * 2.2);
  ui.stat.setAlpha(clamp(g.statA * 0.9 + (g.out ? 0.03 : 0), 0, 1)).setTilePosition(rnd(0, 200), rnd(0, 150));
  g.msgT -= dt; ui.msg.setAlpha(clamp(g.msgT * 2, 0, 1));
  // inner thought bubble
  ui.thG.clear();
  if (g.th) {
    const a = clamp(g.th.t * 3, 0, 1);
    const wk = g.view == 'walk';
    const bx = wk ? clamp(pl.x, 170, 630) : 400, by = wk ? clamp(pl.y - 90, 130, 520) : callOn() ? 440 : 530;
    ui.th.setVisible(true).setText(g.th.s).setPosition(bx, by).setAlpha(a);
    if (wk) { ui.thG.fillStyle(0xe9e6f2, a); ui.thG.fillCircle(pl.x + 6, pl.y - 62, 5); ui.thG.fillCircle(pl.x + 2, pl.y - 74, 7); }
  } else ui.th.setVisible(false);
  const c = g.call, on = callOn();
  ui.call.setVisible(on);
  if (on) {
    ui.callName.setText(c.i < 0 ? 'LLAMADA ENTRANTE...' : c.set[0]);
    ui.callImg.setTexture(SPRF[c.set[1]][c.i >= 0 && ((g.t * 8) | 0) % 2 ? 1 : 0]);
    ui.callTxt.setText(c.i < 0 ? '' : c.set[2][c.i].slice(0, c.ch | 0));
  }
  ui.suit.setAlpha(office ? g.suitP * 0.97 : g.suitP * 0.25);
  const bl = g.blink > 0 ? M.sin(clamp(1 - g.blink / g.blinkDur, 0, 1) * PI) : 0;
  ui.lid.height = bl * 310; ui.lid2.y = H - bl * 310; ui.lid2.height = bl * 310;
  ui.fade.setAlpha(M.max(0, ui.fade.alpha - dt * 5));
  if ((g.lockT > 0 && office) || (g.view == 'walk' && pl.trapT > 0)) { gr.fillStyle(0x2a1040, 0.35); gr.fillRect(0, 0, W, H); }
}

// =====================================================================
// LOSE / WIN
// =====================================================================
const SCREAM = {
  pitcher: ['pitcher', '¡¿PREGUNTAS?!'], sleeper: ['sleeper', '¡¿QUÉ HORA ES?!'], coder: ['coder', '¡NO ME DESENCHUFES!'],
  chef: ['chef', '¡PLÁTANO FRITO!'], sleep: ['sleeper', '¿tú también?'], springlock: ['suit', '*CLACK*'],
};
const LOSE_TIP = {
  pitcher: 'Alguien quería público.', sleeper: 'A nadie le gusta que le alumbren la cara.', coder: 'Cinco minutos más...',
  chef: 'Un plátano frente al chef. Mala idea.', sleep: 'TE QUEDASTE DORMIDO', springlock: 'TE DORMISTE CON EL TRAJE PUESTO',
};
function lose(why) {
  if (mode != 'play' || window.FNAP_GOD) return;
  const g = G;
  g.why = why; g.loseT = g.t;
  mode = 'scream'; modeT = 0;
  hideHud();
  const [role, txt] = SCREAM[why];
  if (why == 'sleep') { ui.fade.setAlpha(1); g.scrDelay = 1.6; } else g.scrDelay = 0.55; // a beat of silence first
  ui.scr.setTexture(role + 'H').setVisible(false);
  ui.scrT.setText('');
  ui.scrTxt = txt;
  if (AC) { ambG.gain.setTargetAtTime(0, AC.currentTime, 0.02); droneG.gain.setTargetAtTime(0, AC.currentTime, 0.02); }
}
function screamUpdate(dt) {
  const g = G;
  modeT += dt;
  if (modeT < g.scrDelay) { if (FX) { FX.no = 0.02; FX.ab = 0; } return; }
  const t = modeT - g.scrDelay;
  if (!g.scrOn) { g.scrOn = 1; SFX.scream(); S.cameras.main.shake(900, 0.03); uiCam.shake(900, 0.02); ui.fade.setAlpha(0); }
  ui.scr.setVisible(t < 1.4).setScale(20 + t * 30 + M.random() * 3).setPosition(400 + rnd(-12, 12), 330 + rnd(-12, 12)).setTint(M.random() < 0.3 ? 0xff5555 : 0xffffff).setAngle(rnd(-4, 4));
  ui.scrT.setText(t < 1.4 ? ui.scrTxt : '').setPosition(400 + rnd(-6, 6), 520 + rnd(-6, 6));
  ui.stat.setAlpha(t > 1.4 ? 1 : 0.2).setTilePosition(rnd(0, 200), rnd(0, 150));
  if (FX) { FX.ab = 3; FX.no = 0.4; FX.dk = 0.2; }
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
