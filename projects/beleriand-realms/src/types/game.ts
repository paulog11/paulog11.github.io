export enum Faction {
  FreePeoples = 'FreePeoples',
  Morgoth = 'Morgoth',
  Neutral = 'Neutral',
}

export enum CardCategory {
  Troop = 'Troop',
  Hero = 'Hero',
  Vanguard = 'Vanguard',
}

export enum TurnPhase {
  Start = 'Start',
  Main = 'Main',
  Resolution = 'Resolution',
  End = 'End',
}

export enum PlayerId {
  PlayerOne = 'PlayerOne',
  PlayerTwo = 'PlayerTwo',
}

export type EffectReward =
  | { type: 'gainResources'; amount: number }
  | { type: 'gainAttack'; amount: number }
  | { type: 'drawCards'; count: number }
  | { type: 'adjustFate'; amount: number }
  | { type: 'dealDamage'; amount: number }
  | { type: 'trash' }

export interface CardEffect {
  description: string;
  reward?: EffectReward;
}

export type CombatTargetType = 'Stronghold' | 'MarketCard' | 'Vanguard'

export type CombatEvent =
  | { type: 'StrongholdDamaged'; strongholdId: string; remainingHealth: number }
  | { type: 'StrongholdDestroyed'; strongholdId: string; faction: Faction }
  | { type: 'MarketCardDefeated'; card: Card; rewardTriggered: boolean }
  | { type: 'VanguardDamaged'; instanceId: string; remainingHp: number }
  | { type: 'VanguardDestroyed'; instanceId: string; cardName: string }

export type CombatResult =
  | { success: true; events: CombatEvent[] }
  | { success: false; reason: string }

export interface Card {
  id: string;
  name: string;
  category: CardCategory;
  faction: Faction;
  cost: number;
  attack: number;
  resources: number;
  fateGeneration: number;
  // For Vanguard cards only: maximum HP when deployed as a field unit.
  hp?: number;
  effect?: CardEffect;
}

// A Vanguard card deployed to the field — persists across turns until HP reaches 0.
export interface VanguardInstance {
  card: Card;
  instanceId: string;
  currentHp: number;
}

// Invariant: -10 <= fateTrack <= 10
export type FateTrackPosition = number;

export const FATE_TRACK_MIN = -10;
export const FATE_TRACK_MAX = 10;

export const isValidFateTrackPosition = (n: number): n is FateTrackPosition =>
  Number.isInteger(n) && n >= FATE_TRACK_MIN && n <= FATE_TRACK_MAX;

export interface GameState {
  fateTrack: FateTrackPosition;
  turnPhase: TurnPhase;
  activePlayer: PlayerId;
  winner: Faction | null;
  // Damage dealt to market cards this turn (cardId → damage). Resets on end turn.
  marketDamage: Record<string, number>;
  // Bases destroyed per player this game.
  basesDestroyed: Record<PlayerId, number>;
  // The currently active (targetable) stronghold id per player.
  activeStrongholdId: Record<PlayerId, string | null>;
  // Set to a PlayerId when that player must choose a new active stronghold.
  pendingBaseChoice: PlayerId | null;
  // Set to a PlayerId when that player must trash a card from hand/inPlay/discard.
  pendingTrash: PlayerId | null;
}

export interface PlayerState {
  deck: Card[];
  hand: Card[];
  discard: Card[];
  inPlay: Card[];                // Troops & Heroes played this turn; cleared at end of turn
  vanguards: VanguardInstance[]; // Deployed Vanguards; persist until killed
  resources: number;
  attack: number;
  // IDs of in-play cards (or vanguard instanceIds) whose attack has been assigned this turn.
  attackAssigned: Set<string>;
}

export interface Stronghold {
  id: string;
  name: string;
  faction: Faction;
  maxHealth: number;
  currentHealth: number;
  innateAbility: string;
}
