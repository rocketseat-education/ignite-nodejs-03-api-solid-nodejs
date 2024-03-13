import { pgEnum, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

import { checkIns } from '@/lib/drizzle/schema'

export const userRoleEnum = pgEnum('user_role', ['ADMIN', 'MEMBER'])

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password_hash: text('password_hash').notNull(),
  role: userRoleEnum('role').default('MEMBER').notNull(),
  created_at: timestamp('created_at').notNull().defaultNow(),
})

export const usersRelations = relations(users, ({ one, many }) => {
  return {
    checkIns: many(checkIns),
  }
})

export type User = typeof users.$inferSelect
export type UserInsert = typeof users.$inferInsert
