// POST /api/review/mistakes
// Body: { userText, correction, scenario, level }
// Creates a review_items row + a mistakes row in one transaction.
// Production seam: add requireAuth(req, res) call here when Phase 0 lands.

import { db } from '../../db/client.js'
import { reviewItems, mistakes } from '../../db/schema.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { userText, correction, scenario, level } = req.body ?? {}
  if (!userText || !correction) return res.status(400).json({ error: 'userText and correction required' })

  const payload = { context: { userText, correction, scenario, level } }

  const [item] = await db.insert(reviewItems).values({ type: 'mistake', payload }).returning()
  const [mistake] = await db.insert(mistakes).values({
    userText,
    correction,
    scenario: scenario ?? null,
    level: level ?? null,
    reviewItemId: item.id,
  }).returning()

  return res.status(201).json({ item, mistake })
}
