export const PLAYER_COLORS = ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#ff9ff3'];

export const WIN_SCORE = 200;

export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function buildDeck() {
  const deck = [];

  // Numbered cards 0-12: 0 appears 1×, 1 appears 1×, N≥2 appears N×
  // 1 + 1 + 2+3+4+5+6+7+8+9+10+11+12 = 2 + 77 = 79 number cards
  deck.push({ type: 'number', value: 0, id: 'n0_0' });
  deck.push({ type: 'number', value: 1, id: 'n1_0' });
  for (let val = 2; val <= 12; val++) {
    for (let i = 0; i < val; i++) {
      deck.push({ type: 'number', value: val, id: `n${val}_${i}` });
    }
  }

  // Score Modifier cards (orange): +2, +4, +6, +8, +10, x2 — 1 each = 6 total
  const modifiers = [
    { special: 'mod_plus2',  label: '+2',  modValue: 2,  isMultiplier: false },
    { special: 'mod_plus4',  label: '+4',  modValue: 4,  isMultiplier: false },
    { special: 'mod_plus6',  label: '+6',  modValue: 6,  isMultiplier: false },
    { special: 'mod_plus8',  label: '+8',  modValue: 8,  isMultiplier: false },
    { special: 'mod_plus10', label: '+10', modValue: 10, isMultiplier: false },
    { special: 'mod_x2',    label: '×2',  modValue: 2,  isMultiplier: true  },
  ];
  modifiers.forEach((m, i) => deck.push({ type: 'modifier', ...m, id: `mod_${i}`, value: 0 }));

  // Action cards: 3× Freeze, 3× Flip Three, 3× Second Chance = 9 total
  for (let i = 0; i < 3; i++) deck.push({ type: 'action', special: 'freeze',       id: `fr_${i}`,  value: 0 });
  for (let i = 0; i < 3; i++) deck.push({ type: 'action', special: 'flipthree',    id: `ft_${i}`,  value: 0 });
  for (let i = 0; i < 3; i++) deck.push({ type: 'action', special: 'secondchance', id: `sc_${i}`,  value: 0 });

  // Total: 79 + 6 + 9 = 94 cards ✓
  return shuffle(deck);
}
