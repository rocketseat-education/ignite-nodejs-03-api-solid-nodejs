import { doublePrecision, pgTable, text, uuid } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

import { checkIns } from '@/lib/drizzle/schema'

export const gyms = pgTable('gyms', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  phone: text('phone'),
  latitude: doublePrecision('latitude').notNull(),
  longitude: doublePrecision('longitude').notNull(),
})

export const gymsRelations = relations(gyms, ({ many }) => {
  return {
    checkIns: many(checkIns),
  }
})

export type Gym = typeof gyms.$inferSelect
export type GymInsert = typeof gyms.$inferInsert
