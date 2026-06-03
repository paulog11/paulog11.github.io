// GET /api/review/recent?limit=5
// Returns the most recent distinct corrections from mistakes, for prompt adaptation.
// Production seam: add requireAuth(req, res) call here when Phase 0 lands.

import { db } from '../../db/client.js'
import { mistakes } from '../../db/schema.js'
import { desc } from 'drizzle-orm'

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })

  const limit = Math.min(parseInt(req.query?.limit ?? '5', 10), 20)

  const rows = await db
    .select({ userText: mistakes.userText, correction: mistakes.correction })
    .from(mistakes)
    .orderBy(desc(mistakes.createdAt))
    .limit(limit)

  return res.status(200).json({ mistakes: rows })
}
