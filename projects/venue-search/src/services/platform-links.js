// Deep link generators for Instabase and SpaceMarket
// Maps English area/station names → platform-specific URL segments

const INSTABASE_STATIONS = {
  Shibuya:     { code: 's1130205', ward: 'w13113' },
  Shinjuku:    { code: 's1130208', ward: 'w13104' },
  Roppongi:    { code: 's9930128', ward: 'w13103' },
  Ginza:       { code: 's1130101', ward: 'w13102' },
  Ebisu:       { code: 's1130204', ward: 'w13113' },
  Ikebukuro:   { code: 's1130207', ward: 'w13116' },
  Aoyama:      { code: 's9930401', ward: 'w13107' },
  Daikanyama:  { code: 's2640207', ward: 'w13113' },
  Nakameguro:  { code: 's2640206', ward: 'w13110' },
  Akihabara:   { code: 's1130101', ward: 'w13101' },
  Ueno:        { code: 's1130103', ward: 'w13106' },
}

const SPACEMARKET_STATIONS = {
  Shibuya:     { city: 'shibuya-ku--tokyo', station: '1130205' },
  Shinjuku:    { city: 'shinjuku-ku--tokyo', station: '1130208' },
  Roppongi:    { city: 'minato-ku--tokyo', station: '9930128' },
  Ginza:       { city: 'chuo-ku--tokyo', station: '1130101' },
  Ebisu:       { city: 'shibuya-ku--tokyo', station: '1130204' },
  Ikebukuro:   { city: 'toshima-ku--tokyo', station: '1130207' },
  Aoyama:      { city: 'minato-ku--tokyo', station: '9930401' },
  Daikanyama:  { city: 'shibuya-ku--tokyo', station: '2640207' },
  Nakameguro:  { city: 'meguro-ku--tokyo', station: '2640206' },
  Akihabara:   { city: 'chiyoda-ku--tokyo', station: '1130101' },
  Ueno:        { city: 'taito-ku--tokyo', station: '1130103' },
}

const SPACEMARKET_FEATURES = {
  party: 'party',
  workshop: 'rental-conference-room',
  meetup: 'rental-conference-room',
  corporate: 'rental-conference-room',
  photoshoot: 'photo-studio',
  wedding: 'party',
}

export function buildInstabaseUrl(area) {
  const station = INSTABASE_STATIONS[area]
  if (station) {
    return `https://www.instabase.jp/tokyo-${station.code}-rentalspace`
  }
  return 'https://www.instabase.jp/tokyo-rentalspace'
}

export function buildSpaceMarketUrl(area, eventType) {
  const station = SPACEMARKET_STATIONS[area]
  const feature = SPACEMARKET_FEATURES[eventType] || 'party'

  if (station) {
    return `https://spacemarket.com/features/${feature}/cities/${station.city}/stations/${station.station}`
  }
  return `https://spacemarket.com/features/${feature}/cities/shibuya-ku--tokyo`
}

export function getPlatformLinks(area, eventType) {
  return [
    {
      name: 'Instabase',
      nameJa: 'インスタベース',
      url: buildInstabaseUrl(area),
      description: '46,000+ venues across Japan',
      color: '#FF6B35',
    },
    {
      name: 'SpaceMarket',
      nameJa: 'スペースマーケット',
      url: buildSpaceMarketUrl(area, eventType),
      description: '20,000+ rental spaces',
      color: '#00C2B2',
    },
  ]
}

export function getAvailableAreas() {
  return Object.keys(INSTABASE_STATIONS)
}
