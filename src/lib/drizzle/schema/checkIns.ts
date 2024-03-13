import { pgTable, timestamp, uuid } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

import { gyms, users } from '@/lib/drizzle/schema'

export const checkIns = pgTable('check_ins', {
  id: uuid('id').defaultRandom().primaryKey(),
  created_at: timestamp('created_at').notNull().defaultNow(),
  validated_at: timestamp('validated_at'),
  user_id: uuid('user_id')
    .references(() => users.id)
    .notNull(),
  gym_id: uuid('gym_id')
    .references(() => gyms.id)
    .notNull(),
})

export const checkInsRelations = relations(checkIns, ({ one }) => {
  return {
    user: one(users, { fields: [checkIns.user_id], references: [users.id] }),
    gym: one(gyms, { fields: [checkIns.gym_id], references: [gyms.id] }),
  }
})

export type CheckIn = typeof checkIns.$inferSelect
export type CheckInInsert = typeof checkIns.$inferInsert
