import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

// Apply saved theme before mount to avoid flash of wrong theme
try {
  if (localStorage.getItem('japandash:theme') === 'dark') {
    document.documentElement.classList.add('dark')
  }
} catch {}

createApp(App).mount('#app')
