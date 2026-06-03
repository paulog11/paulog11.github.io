// GET /api/review/due?limit=20
// Returns review_items where due <= now and suspended = false, ordered by due asc.
// Production seam: add requireAuth(req, res) call here when Phase 0 lands.

import { db } from '../../db/client.js'
import { reviewItems } from '../../db/schema.js'
import { lte, eq, and, asc } from 'drizzle-orm'

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })

  const limit = Math.min(parseInt(req.query?.limit ?? '20', 10), 100)
  const now = new Date()

  const items = await db
    .select()
    .from(reviewItems)
    .where(and(lte(reviewItems.due, now), eq(reviewItems.suspended, false)))
    .orderBy(asc(reviewItems.due))
    .limit(limit)

  return res.status(200).json({ items, count: items.length })
}
