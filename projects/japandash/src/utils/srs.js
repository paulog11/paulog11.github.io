const MIN_EASE = 1.3
const DAY = 86400000 // ms

/**
 * SM-2-lite SRS scheduler.
 * Returns the updated scheduling fields to save back to review_items.
 *
 * @param {object} item   - Current review_items row fields (intervalDays, ease, reps, lapses)
 * @param {string} rating - 'again' | 'hard' | 'good' | 'easy'
 * @param {number} now    - Current timestamp in ms (default: Date.now())
 * @returns {{ due: Date, intervalDays: number, ease: number, reps: number, lapses: number }}
 */
export function nextSchedule(item, rating, now = Date.now()) {
  let { intervalDays, ease, reps, lapses } = item

  switch (rating) {
    case 'again':
      lapses += 1
      ease = Math.max(MIN_EASE, ease - 0.2)
      intervalDays = 0
      return { due: new Date(now + 10 * 60 * 1000), intervalDays, ease, reps: 0, lapses }

    case 'hard':
      ease = Math.max(MIN_EASE, ease - 0.15)
      intervalDays = reps === 0 ? 1 : Math.max(1, intervalDays * 1.2)
      reps += 1
      return { due: new Date(now + intervalDays * DAY), intervalDays, ease, reps, lapses }

    case 'good':
      if (reps === 0)      intervalDays = 1
      else if (reps === 1) intervalDays = 3
      else                 intervalDays = Math.round(intervalDays * ease)
      reps += 1
      return { due: new Date(now + intervalDays * DAY), intervalDays, ease, reps, lapses }

    case 'easy':
      ease = Math.min(ease + 0.15, 4.0)
      if (reps === 0) intervalDays = 2
      else            intervalDays = Math.round(intervalDays * ease * 1.3)
      reps += 1
      return { due: new Date(now + intervalDays * DAY), intervalDays, ease, reps, lapses }

    default:
      throw new Error(`Unknown rating: ${rating}`)
  }
}
