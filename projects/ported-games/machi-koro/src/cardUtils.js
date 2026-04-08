import { TYPE, ICON } from './constants.js';

// CSS class name for a card's type color band
export function estTypeClass(type) {
  switch (type) {
    case TYPE.BLUE:   return 'est-blue';
    case TYPE.GREEN:  return 'est-green';
    case TYPE.RED:    return 'est-red';
    case TYPE.PURPLE: return 'est-purple';
    default: return '';
  }
}

// Human-readable label for a card type
export function estTypeLabel(type) {
  switch (type) {
    case TYPE.BLUE:   return 'Primary Industry';
    case TYPE.GREEN:  return 'Secondary Industry';
    case TYPE.RED:    return 'Restaurant';
    case TYPE.PURPLE: return 'Major Establishment';
    default: return '';
  }
}

// Emoji icon for an establishment's icon group
export function estIconEmoji(icon) {
  switch (icon) {
    case ICON.WHEAT: return '🌾';
    case ICON.COW:   return '🐄';
    case ICON.GEAR:  return '⚙️';
    case ICON.BREAD: return '🍞';
    case ICON.CUP:   return '☕';
    case ICON.TOWER: return '📡';
    default: return '🏠';
  }
}

// Formatted roll label: [2, 3] → "2-3", [9] → "9", [9, 10] → "9-10"
export function rollLabel(rolls) {
  if (!rolls || rolls.length === 0) return '';
  if (rolls.length === 1) return String(rolls[0]);
  const min = Math.min(...rolls);
  const max = Math.max(...rolls);
  return `${min}-${max}`;
}

// Emoji for a landmark
export function landmarkEmoji(id) {
  switch (id) {
    case 'train_station':  return '🚂';
    case 'shopping_mall':  return '🛍️';
    case 'amusement_park': return '🎡';
    case 'radio_tower':    return '📻';
    default: return '🏛️';
  }
}

// Background color for a card type (CSS hex)
export function estTypeColor(type) {
  switch (type) {
    case TYPE.BLUE:   return '#3a7bd5';
    case TYPE.GREEN:  return '#27ae60';
    case TYPE.RED:    return '#e74c3c';
    case TYPE.PURPLE: return '#8e44ad';
    default: return '#555';
  }
}

// Dice face label: single number shown in a roll badge
export function diceFace(n) {
  const faces = ['', '⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
  return faces[n] || String(n);
}
