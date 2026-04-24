import { ref, computed, watch } from 'vue'

export interface TutorialStep {
  title: string
  body: string
  highlightId?: string
  actionPrompt?: string
}

const STEPS: TutorialStep[] = [
  {
    title: 'Welcome to Beleriand Realms',
    body: "You command the Free Peoples — Elves, Men, and their allies — defending Beleriand against Morgoth's shadow. This tutorial walks you through your first turn.",
  },
  {
    title: 'Your Stronghold',
    highlightId: 'player-stronghold',
    body: 'Gondolin is your Stronghold. The health bar tracks remaining hit points. If it reaches zero, Morgoth wins. Guard it carefully.',
  },
  {
    title: "Morgoth's Stronghold",
    highlightId: 'enemy-stronghold',
    body: "Angband is Morgoth's fortress at the top of the board. Your ultimate goal is to reduce its health to zero.",
  },
  {
    title: 'The Fate Track',
    highlightId: 'fate-track',
    body: 'The Fate Track shows who holds the balance of power. The marker starts at centre. Gold means Light is prevailing; dark red means Shadow is winning. Card effects and abilities shift it.',
  },
  {
    title: 'Attack & Resource Pools',
    highlightId: 'player-pool',
    body: 'These counters track your Attack (⚔) and Resources (◈) for this turn. Playing cards from your hand fills these pools. Both reset to zero when your turn ends.',
  },
  {
    title: 'Your Hand',
    highlightId: 'player-hand',
    body: "These are your cards. Each shows its Attack (⚔), Resources (◈), Cost (the circle top-left), and a Fate value (✦). Playing a card immediately adds its Attack and Resources to your pools.",
    actionPrompt: 'Click any card in your hand to play it.',
  },
  {
    title: 'Cards in Play',
    highlightId: 'in-play-zone',
    body: 'Played cards appear here, scaled down to save space. Their values are already counted in your pools. All cards in play are discarded when you end your turn.',
  },
  {
    title: 'The Beleriand Row',
    highlightId: 'beleriand-row',
    body: 'This shared market holds up to 6 cards. You can attack Morgoth-faction cards by spending Attack equal to their Cost. When a card is defeated, its reward fires and a replacement is drawn from the deck.',
  },
  {
    title: 'End Your Turn',
    highlightId: 'end-turn-btn',
    body: "When you're done, click End Turn. Your hand and played cards move to your discard pile, pools reset to zero, and you draw 5 new cards. The turn then passes to Morgoth.",
    actionPrompt: 'Click End Turn to pass to Morgoth and finish the tutorial.',
  },
]

// ── Module-singleton state ─────────────────────────────────────────────────
// Shared across all useTutorial() calls so HelpModal, GameView, and
// TutorialDrawer all read from the same reactive source.

const isActive = ref(false)
const currentIndex = ref(0)

function clearHighlight(): void {
  document.querySelectorAll<HTMLElement>('.tutorial-highlight').forEach((el) =>
    el.classList.remove('tutorial-highlight'),
  )
}

function applyHighlight(id?: string): void {
  clearHighlight()
  if (!id) return
  const el = document.getElementById(id)
  if (el) el.classList.add('tutorial-highlight')
}

// Watchers run at module scope so the highlight updates regardless of which
// component called next() or prev().
watch(currentIndex, (idx) => {
  if (isActive.value) applyHighlight(STEPS[idx].highlightId)
})

watch(isActive, (active) => {
  if (active) {
    applyHighlight(STEPS[currentIndex.value].highlightId)
  } else {
    clearHighlight()
  }
})

// ── Public composable ──────────────────────────────────────────────────────

export function useTutorial() {
  const step = computed(() => STEPS[currentIndex.value])
  const stepNumber = computed(() => currentIndex.value + 1)
  const totalSteps = STEPS.length
  const isFirst = computed(() => currentIndex.value === 0)
  const isLast = computed(() => currentIndex.value === STEPS.length - 1)

  function start(): void {
    currentIndex.value = 0
    isActive.value = true
  }

  function stop(): void {
    isActive.value = false
  }

  function next(): void {
    if (!isLast.value) currentIndex.value++
  }

  function prev(): void {
    if (!isFirst.value) currentIndex.value--
  }

  // Called by GameView when the player plays a card — auto-advances from the
  // "Your Hand" step so the tutorial feels responsive.
  function onCardPlayed(): void {
    if (isActive.value && step.value.highlightId === 'player-hand') {
      setTimeout(next, 500)
    }
  }

  // Called by GameView when the player clicks End Turn — finishes the tutorial
  // if on the last step.
  function onTurnEnded(): void {
    if (isActive.value && isLast.value) {
      setTimeout(stop, 400)
    }
  }

  return {
    isActive,
    step,
    stepNumber,
    totalSteps,
    isFirst,
    isLast,
    start,
    stop,
    next,
    prev,
    onCardPlayed,
    onTurnEnded,
  }
}
