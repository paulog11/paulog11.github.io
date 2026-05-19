<template>
  <div class="h-full flex flex-col gap-4 font-tech text-[0.65rem] select-none">

    <!-- Identity -->
    <section class="flex flex-col gap-2 text-mecha-text/40 tracking-[0.1em]">
      <div class="flex justify-between">
        <span>Name</span>
        <span class="text-mecha-text/70">Paulo Gonzales</span>
      </div>
      <div class="flex justify-between">
        <span>Role</span>
        <span class="text-mecha-text/70">Software Engineer</span>
      </div>
      <div class="flex justify-between">
        <span>Location</span>
        <span class="text-mecha-text/70">Tokyo</span>
      </div>
    </section>

    <div class="h-px bg-mecha-accent/10" />

    <!-- CTA -->
    <section
      class="flex flex-col gap-3 p-3 border border-mecha-accent/25 bg-mecha-panel/60"
      style="
        clip-path: polygon(10px 0%,100% 0%,100% calc(100% - 10px),calc(100% - 10px) 100%,0% 100%,0% 10px);
        box-shadow: 0 0 15px rgba(255,122,0,0.4), inset 0 0 20px rgba(11,19,26,0.6);
      "
    >
      <a :href="profileUrl" target="_blank" rel="noopener" class="block">
        <MechaButton variant="primary" class="w-full justify-center">
          View Profile
        </MechaButton>
      </a>
      <a :href="resumeUrl" :download="resumeFilename" class="block">
        <MechaButton variant="ghost" class="w-full justify-center">
          Resume
        </MechaButton>
      </a>
    </section>

  </div>
</template>

<script setup>
import MechaButton from './MechaButton.vue'

defineProps({
  profileUrl:     { type: String, default: './projects/profile/' },
  resumeUrl:      { type: String, default: './assets/resume.pdf' },
  resumeFilename: { type: String, default: 'paulo-gonzales-resume.pdf' },
})
</script>
