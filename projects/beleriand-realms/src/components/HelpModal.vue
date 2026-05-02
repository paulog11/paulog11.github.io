<script setup lang="ts">
import { nextTick } from 'vue'
import { useTutorial } from '../composables/useTutorial'

const emit = defineEmits<{ close: [] }>()

const { start } = useTutorial()

function openTutorial(): void {
  emit('close')
  // Let the modal unmount before the first highlight is applied
  nextTick(start)
}
</script>

<template>
  <!-- Backdrop — click outside to close -->
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-sm"
    @click.self="emit('close')"
  >
    <div class="bg-card-bg border border-card-border rounded-2xl w-full max-w-lg mx-4 shadow-2xl flex flex-col max-h-[85vh]">

      <!-- Header -->
      <div class="flex items-center justify-between px-6 py-4 border-b border-card-border flex-shrink-0">
        <h2 class="text-ink font-display text-lg font-bold">Help &amp; Reference</h2>
        <button
          class="text-muted hover:text-ink transition-colors text-lg leading-none"
          aria-label="Close"
          @click="emit('close')"
        >
          ✕
        </button>
      </div>

      <!-- Scrollable body -->
      <div class="overflow-y-auto px-6 py-5 space-y-7">

        <!-- ── Card Symbols ─────────────────────────────────────────────── -->
        <section>
          <h3 class="text-free-peoples text-[10px] font-bold uppercase tracking-widest mb-3">Card Symbols</h3>
          <div class="space-y-3">

            <div class="flex items-start gap-3">
              <div class="w-8 h-8 rounded-full bg-card-border border border-muted/40 flex items-center justify-center text-ink text-xs font-bold flex-shrink-0">
                3
              </div>
              <div>
                <p class="text-ink text-sm font-semibold">Cost</p>
                <p class="text-muted text-xs mt-0.5 leading-relaxed">The circle top-left of each card. Attack needed to defeat this card from the Beleriand Row, or Resources needed to acquire it for your deck.</p>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <span class="text-morgoth-light text-xl w-8 text-center leading-8 flex-shrink-0">⚔</span>
              <div>
                <p class="text-ink text-sm font-semibold">Attack</p>
                <p class="text-muted text-xs mt-0.5 leading-relaxed">Added to your Attack pool when you play the card. Spend Attack to fight enemy cards in the Beleriand Row or strike the opposing Stronghold directly.</p>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <span class="text-free-peoples-light text-xl w-8 text-center leading-8 flex-shrink-0">◈</span>
              <div>
                <p class="text-ink text-sm font-semibold">Resources</p>
                <p class="text-muted text-xs mt-0.5 leading-relaxed">Added to your Resource pool when played. Spend Resources to acquire cards from the Beleriand Row and strengthen your deck.</p>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <span class="text-neutral-light text-xl w-8 text-center leading-8 flex-shrink-0">✦</span>
              <div>
                <p class="text-ink text-sm font-semibold">Fate Generation</p>
                <p class="text-muted text-xs mt-0.5 leading-relaxed">Passive influence on the Fate Track. Free Peoples cards generate positive fate (toward Light); Morgoth cards generate negative fate (toward Shadow). Only shown when non-zero.</p>
              </div>
            </div>

          </div>
        </section>

        <!-- ── Card Categories ────────────────────────────────────────── -->
        <section>
          <h3 class="text-free-peoples text-[10px] font-bold uppercase tracking-widest mb-3">Card Categories</h3>
          <div class="space-y-2">
            <div class="bg-parchment border border-card-border rounded-xl p-3">
              <p class="text-ink text-sm font-semibold">Troop</p>
              <p class="text-muted text-xs mt-1 leading-relaxed">Common soldiers and warriors. Played from hand each turn; go to discard at turn's end. Provide Attack and Resources.</p>
            </div>
            <div class="bg-parchment border border-card-border rounded-xl p-3">
              <p class="text-ink text-sm font-semibold">Hero</p>
              <p class="text-muted text-xs mt-1 leading-relaxed">Named champions with powerful abilities. Unique — one copy in the deck. Like Troops, they are played from hand and discarded at turn's end.</p>
            </div>
            <div class="bg-parchment border border-card-border rounded-xl p-3 border-l-4"
              :class="'border-l-morgoth'">
              <div class="flex items-center gap-2 mb-1">
                <p class="text-ink text-sm font-semibold">Vanguard</p>
                <span class="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-morgoth/10 text-morgoth-light border border-morgoth/30">Persists</span>
              </div>
              <p class="text-muted text-xs leading-relaxed">
                Powerful field units with <span class="text-ink font-semibold">HP</span>. Deploying one from hand places it on the field where it <strong>stays across turns</strong> until its HP is reduced to zero.
              </p>
              <ul class="text-muted text-xs mt-1.5 space-y-0.5 leading-relaxed list-disc list-inside">
                <li>Contributes its ⚔ Attack at the start of each of your turns</li>
                <li>Blocks the enemy Stronghold — opponents must defeat all your Vanguards first</li>
                <li>Cannot be attacked in the Beleriand Row — acquire with Resources to deploy</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- ── Factions ────────────────────────────────────────────────── -->
        <section>
          <h3 class="text-free-peoples text-[10px] font-bold uppercase tracking-widest mb-3">Factions</h3>
          <div class="space-y-2">
            <div class="flex items-start gap-3 bg-free-peoples-bg border border-free-peoples/30 rounded-xl p-3">
              <div class="w-3 h-3 rounded-full bg-free-peoples mt-0.5 flex-shrink-0"></div>
              <div>
                <p class="text-free-peoples text-sm font-semibold">Free Peoples</p>
                <p class="text-muted text-xs mt-0.5 leading-relaxed">Gold-bordered cards. Only Morgoth can attack them in the row. Generate positive fate.</p>
              </div>
            </div>
            <div class="flex items-start gap-3 bg-morgoth-bg border border-morgoth/30 rounded-xl p-3">
              <div class="w-3 h-3 rounded-full bg-morgoth mt-0.5 flex-shrink-0"></div>
              <div>
                <p class="text-morgoth-light text-sm font-semibold">Morgoth</p>
                <p class="text-muted text-xs mt-0.5 leading-relaxed">Crimson-bordered cards. Only the Free Peoples can attack them in the row. Generate negative fate.</p>
              </div>
            </div>
            <div class="flex items-start gap-3 bg-parchment border border-neutral/30 rounded-xl p-3">
              <div class="w-3 h-3 rounded-full bg-neutral mt-0.5 flex-shrink-0"></div>
              <div>
                <p class="text-neutral-light text-sm font-semibold">Neutral</p>
                <p class="text-muted text-xs mt-0.5 leading-relaxed">Slate-bordered cards. Cannot be attacked by either player. Either side may acquire them with Resources.</p>
              </div>
            </div>
          </div>
        </section>

        <!-- ── The Fate Track ──────────────────────────────────────────── -->
        <section>
          <h3 class="text-free-peoples text-[10px] font-bold uppercase tracking-widest mb-3">The Fate Track</h3>
          <p class="text-muted text-sm leading-relaxed">
            A slider from <span class="text-morgoth-light font-semibold">−10 (Shadow dominance)</span> to
            <span class="text-free-peoples font-semibold">+10 (Light dominance)</span>.
            The marker starts at zero. Cards with <span class="text-neutral-light">✦</span> values, and
            certain card abilities, move it. At ±7 one side holds clear dominance — future rules
            will translate this into a mechanical advantage.
          </p>
        </section>

      </div>

      <!-- Footer -->
      <div class="flex items-center justify-between px-6 py-4 border-t border-card-border flex-shrink-0">
        <button
          class="px-5 py-2 bg-free-peoples text-parchment rounded-lg text-sm font-semibold
                 hover:bg-free-peoples-dark transition-colors"
          @click="openTutorial"
        >
          ▶ Start Tutorial
        </button>
        <button
          class="text-muted text-sm hover:text-ink transition-colors"
          @click="emit('close')"
        >
          Close
        </button>
      </div>

    </div>
  </div>
</template>
