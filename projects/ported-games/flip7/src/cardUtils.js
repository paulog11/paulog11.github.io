export function cardClass(card) {
  if (card.type === 'number') return `card card-num-${card.value}`;
  if (card.type === 'modifier') return 'card card-modifier';
  if (card.special === 'freeze')        return 'card card-action-freeze';
  if (card.special === 'flipthree')     return 'card card-action-flipthree';
  if (card.special === 'secondchance')  return 'card card-action-secondchance';
  return 'card';
}

export function cardMain(card) {
  if (card.type === 'number') return card.value;
  if (card.type === 'modifier') return card.label;
  if (card.special === 'freeze')        return '❄️';
  if (card.special === 'flipthree')     return '×3';
  if (card.special === 'secondchance')  return '2nd';
  return '?';
}

export function cardLabel(card) {
  if (card.type === 'number') return '';
  if (card.type === 'modifier') return card.isMultiplier ? 'Multiplier' : 'Score +';
  if (card.special === 'freeze')        return 'Freeze';
  if (card.special === 'flipthree')     return 'Flip 3';
  if (card.special === 'secondchance')  return '2nd Chance';
  return '';
}

export function cardCorner(card) {
  if (card.type === 'number') return card.value;
  if (card.type === 'modifier') return card.label;
  if (card.special === 'freeze')        return '❄';
  if (card.special === 'flipthree')     return '×3';
  if (card.special === 'secondchance')  return '2nd';
  return '';
}

export function cardSuit(card) {
  if (card.type === 'number') return '◆';
  if (card.type === 'modifier') return card.isMultiplier ? '×' : '+';
  if (card.special === 'freeze')        return '❄';
  if (card.special === 'flipthree')     return '↺';
  if (card.special === 'secondchance')  return '★';
  return '';
}
