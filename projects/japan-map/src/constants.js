export const categoryColors = {
  battle: '#c0392b',
  political: '#2980b9',
  cultural: '#27ae60',
  disaster: '#e67e22'
}

export const categoryLabels = {
  battle: 'Battle',
  political: 'Political',
  cultural: 'Cultural',
  disaster: 'Disaster'
}

export const operatorColors = {
  jr: '#3da63a',
  metro: '#0078c8',
  toei: '#b51e82',
  private: '#e67e22'
}

export const operatorLabels = {
  jr: 'JR East',
  metro: 'Tokyo Metro',
  toei: 'Toei Subway',
  private: 'Private Railways'
}

export const tileLayers = {
  ja: {
    url: 'https://tile.openstreetmap.jp/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://osmf.jp/">OSMFJ</a>'
  },
  en: {
    url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/">CARTO</a>'
  }
}
