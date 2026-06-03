import { drizzle } from 'drizzle-orm/pglite'
import { migrate } from 'drizzle-orm/pglite/migrator'
import { PGlite } from '@electric-sql/pglite'
import * as schema from './schema.js'
import { fileURLToPath } from 'url'
import { join, dirname } from 'path'

// Production seam: when DATABASE_URL is set (Neon), swap drizzle-orm/pglite
// for drizzle-orm/neon-http + @neondatabase/serverless here. Schema and
// migrations are reused unchanged.

const __dirname = dirname(fileURLToPath(import.meta.url))

const pglite = new PGlite(join(__dirname, '../.pglite'))
export const db = drizzle(pglite, { schema })

let _migrated = false

export async function runMigrations() {
  if (_migrated) return
  await migrate(db, { migrationsFolder: join(__dirname, '../drizzle') })
  _migrated = true
}
