import venues from '../data/tokyo-venues.json'

export function searchVenues({ area, guests, eventType }) {
  return venues.filter((venue) => {
    if (area && area !== 'all') {
      if (venue.area.toLowerCase() !== area.toLowerCase()) return false
    }
    if (guests) {
      if (venue.capacity.max < guests) return false
    }
    if (eventType && eventType !== 'all') {
      if (!venue.types.includes(eventType)) return false
    }
    return true
  })
}

export function getAreas() {
  const areas = [...new Set(venues.map((v) => v.area))].sort()
  return areas
}

export function getEventTypes() {
  const types = [...new Set(venues.flatMap((v) => v.types))].sort()
  return types
}

export function getAmenities() {
  const amenities = [...new Set(venues.flatMap((v) => v.amenities))].sort()
  return amenities
}
