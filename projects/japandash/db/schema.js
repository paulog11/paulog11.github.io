import { pgTable, serial, text, real, integer, boolean, jsonb, timestamp } from 'drizzle-orm/pg-core'

export const reviewItems = pgTable('review_items', {
  id:           serial('id').primaryKey(),
  userId:       text('user_id').notNull().default('local'),
  type:         text('type').notNull(),            // 'mistake' | 'grammar' | 'vocab' | 'dictation' | 'journal'
  payload:      jsonb('payload').notNull(),         // { context: { userText, correction, scenario, level } }
  due:          timestamp('due', { withTimezone: true }).notNull().defaultNow(),
  intervalDays: real('interval_days').notNull().default(0),
  ease:         real('ease').notNull().default(2.5),
  reps:         integer('reps').notNull().default(0),
  lapses:       integer('lapses').notNull().default(0),
  suspended:    boolean('suspended').notNull().default(false),
  createdAt:    timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt:    timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})

export const reviewLog = pgTable('review_log', {
  id:          serial('id').primaryKey(),
  itemId:      integer('item_id').notNull().references(() => reviewItems.id),
  rating:      text('rating').notNull(),            // 'again' | 'hard' | 'good' | 'easy'
  reviewedAt:  timestamp('reviewed_at', { withTimezone: true }).notNull().defaultNow(),
  elapsedMs:   integer('elapsed_ms'),
})

export const mistakes = pgTable('mistakes', {
  id:           serial('id').primaryKey(),
  userId:       text('user_id').notNull().default('local'),
  userText:     text('user_text').notNull(),
  correction:   text('correction').notNull(),
  source:       text('source').notNull().default('conversation'),
  scenario:     text('scenario'),
  level:        text('level'),
  reviewItemId: integer('review_item_id').references(() => reviewItems.id),
  createdAt:    timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})
