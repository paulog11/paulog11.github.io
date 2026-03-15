<template>
  <WidgetFrame title="Shadowing Practice" icon="🎙" span="double" collapsible>
    <div class="space-y-3">
      <!-- Channel selector -->
      <div class="flex gap-1.5 overflow-x-auto pb-1">
        <button
          v-for="ch in shadowing.channels"
          :key="ch.id"
          class="flex-shrink-0 px-3 py-1.5 text-xs rounded-full border transition-colors"
          :class="shadowing.selectedChannelId.value === ch.id
            ? 'bg-ai text-white border-ai'
            : 'border-koshi text-sumi hover:bg-koshi/40'"
          @click="shadowing.selectChannel(ch.id)"
        >
          {{ ch.name }}
        </button>
      </div>

      <!-- Level filter + random pick -->
      <div class="flex items-center gap-2">
        <div class="flex gap-1">
          <button
            class="px-2 py-1 text-[0.65rem] rounded border transition-colors"
            :class="!shadowing.filterLevel.value ? 'bg-sumi text-white border-sumi' : 'border-koshi text-usuzumi hover:bg-koshi/40'"
            @click="shadowing.filterLevel.value = ''"
          >
            All
          </button>
          <button
            v-for="lvl in ['N5', 'N4', 'N3', 'N2', 'N1']"
            :key="lvl"
            class="px-2 py-1 text-[0.65rem] rounded border transition-colors"
            :class="shadowing.filterLevel.value === lvl ? 'bg-sumi text-white border-sumi' : 'border-koshi text-usuzumi hover:bg-koshi/40'"
            @click="shadowing.filterLevel.value = lvl"
          >
            {{ lvl }}
          </button>
        </div>
        <button
          class="ml-auto px-3 py-1 text-xs rounded-md bg-beni/10 text-beni hover:bg-beni/20 transition-colors"
          @click="shadowing.randomPick()"
        >
          🎲 Random
        </button>
      </div>

      <!-- Video embed -->
      <div v-if="shadowing.selectedVideo.value" class="space-y-2">
        <div class="aspect-video rounded-lg overflow-hidden bg-sumi/5">
          <iframe
            :src="`https://www.youtube.com/embed/${shadowing.selectedVideoId.value}`"
            class="w-full h-full"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          />
        </div>
        <div class="flex items-center justify-between">
          <p class="text-sm font-medium">{{ shadowing.selectedVideo.value.title }}</p>
          <button
            class="text-xs px-2 py-1 rounded transition-colors"
            :class="shadowing.isCompleted(shadowing.selectedVideoId.value)
              ? 'bg-matcha/15 text-matcha'
              : 'bg-koshi/50 text-usuzumi hover:bg-koshi'"
            @click="shadowing.markCompleted(shadowing.selectedVideoId.value)"
          >
            {{ shadowing.isCompleted(shadowing.selectedVideoId.value) ? '✓ Completed' : 'Mark Done' }}
          </button>
        </div>
      </div>

      <!-- Video list -->
      <div class="max-h-48 overflow-y-auto space-y-1 pr-1">
        <div
          v-for="video in shadowing.filteredVideos.value"
          :key="video.id"
          class="flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer transition-colors"
          :class="shadowing.selectedVideoId.value === video.id ? 'bg-ai-light/50' : 'hover:bg-koshi/30'"
          @click="shadowing.selectVideo(video.id)"
        >
          <span v-if="shadowing.isCompleted(video.id)" class="text-matcha text-xs">✓</span>
          <span v-else class="text-usuzumi/40 text-xs">○</span>
          <span class="text-sm flex-1 truncate">{{ video.title }}</span>
          <span class="px-1.5 py-0.5 text-[0.55rem] rounded bg-ai-light text-ai font-medium">{{ video.level }}</span>
          <span class="text-[0.65rem] text-usuzumi tabular-nums">{{ video.duration }}</span>
        </div>
        <p v-if="shadowing.filteredVideos.value.length === 0" class="text-center text-usuzumi text-xs py-3">
          No videos for this filter
        </p>
      </div>

      <!-- Channel link -->
      <a
        v-if="shadowing.selectedChannel.value"
        :href="shadowing.selectedChannel.value.channelUrl"
        target="_blank"
        rel="noopener"
        class="block text-center text-[0.65rem] text-ai hover:underline"
      >
        Visit {{ shadowing.selectedChannel.value.name }} on YouTube →
      </a>

      <!-- Shadowing tips -->
      <details class="text-xs text-usuzumi">
        <summary class="cursor-pointer hover:text-sumi">Shadowing tips</summary>
        <ul class="mt-1.5 ml-4 space-y-1 list-disc">
          <li>Listen to a short phrase, then immediately repeat it aloud</li>
          <li>Focus on mimicking rhythm, pitch, and intonation</li>
          <li>Start with slow content, gradually increase speed</li>
          <li>Don't worry about understanding every word at first</li>
          <li>Repeat the same video multiple times for best results</li>
        </ul>
      </details>
    </div>
  </WidgetFrame>
</template>

<script setup>
import WidgetFrame from '../WidgetFrame.vue'
import { useShadowing } from '../../composables/useShadowing.js'

const shadowing = useShadowing()
</script>
