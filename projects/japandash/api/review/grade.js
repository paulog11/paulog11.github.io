// POST /api/review/grade
// Body: { itemId, rating, elapsedMs? }   rating: 'again' | 'hard' | 'good' | 'easy'
// Updates review_items schedule and inserts a review_log row.
// Production seam: add requireAuth(req, res) call here when Phase 0 lands.

import { db } from '../../db/client.js'
import { reviewItems, reviewLog } from '../../db/schema.js'
import { eq } from 'drizzle-orm'
import { nextSchedule } from '../../src/utils/srs.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { itemId, rating, elapsedMs } = req.body ?? {}
  if (!itemId || !rating) return res.status(400).json({ error: 'itemId and rating required' })
  if (!['again', 'hard', 'good', 'easy'].includes(rating)) {
    return res.status(400).json({ error: 'rating must be again|hard|good|easy' })
  }

  const [item] = await db.select().from(reviewItems).where(eq(reviewItems.id, itemId)).limit(1)
  if (!item) return res.status(404).json({ error: 'Item not found' })

  const schedule = nextSchedule(item, rating)

  const [updated] = await db
    .update(reviewItems)
    .set({ ...schedule, updatedAt: new Date() })
    .where(eq(reviewItems.id, itemId))
    .returning()

  await db.insert(reviewLog).values({ itemId, rating, elapsedMs: elapsedMs ?? null })

  return res.status(200).json({ item: updated })
}
