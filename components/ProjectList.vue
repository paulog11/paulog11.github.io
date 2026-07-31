<template>
  <div class="min-h-screen bg-[#070A12] text-[#E8E3D8] font-body px-5 py-10 sm:px-10 sm:py-16">
    <div class="max-w-2xl mx-auto">

      <header class="mb-10">
        <h1 class="font-display text-3xl sm:text-4xl text-[#FFB347]">Paulo Gonzales</h1>
        <p class="mt-3 text-[#E8E3D8]/90">
          Project catalog — software built by Paulo Gonzales, software engineer.
        </p>
        <p class="mt-5 flex flex-wrap gap-x-6 gap-y-2">
          <a
            href="./projects/profile/"
            class="text-[#FFB347] underline decoration-[#FFB347]/40 underline-offset-4 hover:decoration-[#FFB347] rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB347]"
          >Profile</a>
          <a
            href="./assets/Paulo_Gonzales_Resume_SoftwareEngineer.pdf"
            download="Paulo_Gonzales_Resume_SoftwareEngineer.pdf"
            class="text-[#FFB347] underline decoration-[#FFB347]/40 underline-offset-4 hover:decoration-[#FFB347] rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB347]"
          >Resume (PDF)</a>
        </p>
      </header>

      <section>
        <h2 class="font-display text-xl text-[#FFB347] mb-4">Projects</h2>

        <ul class="flex flex-col gap-4">
          <li
            v-for="p in projects"
            :key="p.id"
            class="border border-[#E8E3D8]/15 rounded-md p-4"
          >
            <a
              v-if="p.status !== 'coming-soon'"
              :href="p.url"
              class="block group rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB347]"
            >
              <h3 class="font-display text-lg text-[#E8E3D8] group-hover:text-[#FFB347] group-hover:underline underline-offset-4">
                {{ p.title }}
              </h3>
              <p class="mt-1 text-sm text-[#E8E3D8]/70">{{ p.tagline }}</p>
              <p class="mt-1 text-sm text-[#E8E3D8]/45">{{ p.description }}</p>
              <p class="mt-2 font-mono text-xs text-[#E8E3D8]/45">
                {{ p.category }} · {{ p.year }} · {{ p.tools.join(', ') }} · {{ statusLabel(p.status) }}
              </p>
            </a>
            <div v-else class="opacity-70">
              <h3 class="font-display text-lg text-[#E8E3D8]">
                {{ p.title }}
                <span class="ml-2 align-middle text-[0.65rem] uppercase tracking-wide text-[#FF2D55]">Planned</span>
              </h3>
              <p class="mt-1 text-sm text-[#E8E3D8]/70">{{ p.tagline }}</p>
              <p class="mt-1 text-sm text-[#E8E3D8]/45">{{ p.description }}</p>
              <p class="mt-2 font-mono text-xs text-[#E8E3D8]/45">
                {{ p.category }} · {{ p.year }} · {{ p.tools.join(', ') }} · {{ statusLabel(p.status) }}
              </p>
            </div>
          </li>
        </ul>
      </section>

    </div>
  </div>
</template>

<script setup>
defineProps({
  projects: { type: Array, required: true },
})

function statusLabel(status) {
  if (status === 'live')        return 'live'
  if (status === 'WIP')         return 'in progress'
  if (status === 'coming-soon') return 'planned'
  return status
}
</script>
