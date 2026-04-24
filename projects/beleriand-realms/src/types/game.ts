export enum Faction {
  FreePeoples = 'FreePeoples',
  Morgoth = 'Morgoth',
  Neutral = 'Neutral',
}

export enum CardType {
  Character = 'Character',
  Artifact = 'Artifact',
  Champion = 'Champion',
  GreatBeast = 'GreatBeast',
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

export interface CardEffect {
  description: string;
  reward?: EffectReward;
}

export type CombatTargetType = 'Stronghold' | 'MarketCard'

export type CombatEvent =
  | { type: 'StrongholdDamaged'; strongholdId: string; remainingHealth: number }
  | { type: 'StrongholdDestroyed'; strongholdId: string; faction: Faction }
  | { type: 'MarketCardDefeated'; card: Card; rewardTriggered: boolean }

export type CombatResult =
  | { success: true; events: CombatEvent[] }
  | { success: false; reason: string }

export interface Card {
  id: string;
  name: string;
  type: CardType;
  faction: Faction;
  cost: number;
  attack: number;
  resources: number;
  fateGeneration: number;
  effect?: CardEffect;
}

export interface Stronghold {
  id: string;
  name: string;
  faction: Faction;
  maxHealth: number;
  currentHealth: number;
  innateAbility: string;
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
}

export interface PlayerState {
  deck: Card[];
  hand: Card[];
  discard: Card[];
  inPlay: Card[];
  resources: number;
  attack: number;
}
