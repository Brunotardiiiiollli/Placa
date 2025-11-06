import { mysqlTable, serial, varchar, datetime, int, text, json } from 'drizzle-orm/mysql-core';
import { sql } from 'drizzle-orm';

// Função helper para timestamps
const timestamps = {
  createdAt: datetime('created_at', { mode: 'date' }).notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: datetime('updated_at', { mode: 'date' }).notNull()
    .default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`),
} as const;

export const usersTable = mysqlTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  ...timestamps,
});

export const videosTable = mysqlTable('videos', {
  id: serial('id').primaryKey(),
  userId: int('user_id').notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  url: varchar('url', { length: 512 }).notNull(),
  thumbnailUrl: varchar('thumbnail_url', { length: 512 }),
  status: varchar('status', { length: 50 }).notNull().default('pending'),
  metadata: json('metadata'),
  ...timestamps,
});

export const shortsTable = mysqlTable('shorts', {
  id: serial('id').primaryKey(),
  userId: int('user_id').notNull(),
  videoId: int('video_id').notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  status: varchar('status', { length: 50 }).notNull().default('pending'),
  metadata: json('metadata'),
  ...timestamps,
});

// Tipos inferidos das tabelas
type User = typeof usersTable.$inferSelect;
type NewUser = typeof usersTable.$inferInsert;

type Video = typeof videosTable.$inferSelect;
type NewVideo = typeof videosTable.$inferInsert;

type Short = typeof shortsTable.$inferSelect;
type NewShort = typeof shortsTable.$inferInsert;

export type { User, NewUser, Video, NewVideo, Short, NewShort };
