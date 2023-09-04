import {
  mysqlTable,
  mysqlSchema,
  AnyMySqlColumn,
  primaryKey,
  int,
  varchar,
  timestamp,
  date,
  index,
  mysqlEnum,
} from 'drizzle-orm/mysql-core';
import { sql } from 'drizzle-orm';

export const organizations = mysqlTable(
  'organizations',
  {
    id: int('id').autoincrement().notNull(),
    name: varchar('name', { length: 255 }).notNull(),
    description: varchar('description', { length: 255 }).notNull(),
    createdAt: timestamp('created_at', { mode: 'string' })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { mode: 'string' })
      .defaultNow()
      .onUpdateNow()
      .notNull(),
  },
  (table) => {
    return {
      organizationsId: primaryKey(table.id),
    };
  }
);

export const persons = mysqlTable(
  'persons',
  {
    id: int('id').autoincrement().notNull(),
    firstname: varchar('firstname', { length: 255 }).notNull(),
    lastname: varchar('lastname', { length: 255 }).notNull(),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    birthday: date('birthday', { mode: 'string' }).notNull(),
  },
  (table) => {
    return {
      personsId: primaryKey(table.id),
    };
  }
);

export const users = mysqlTable(
  'users',
  {
    id: int('id').autoincrement().notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    role: mysqlEnum('role', [
      'buyer',
      'member',
      'club admin',
      'school admin',
      'super admin',
    ]),
    personId: int('person_id').notNull(),
  },
  (table) => {
    return {
      personIdIdx: index('person_id_idx').on(table.personId),
      usersId: primaryKey(table.id),
    };
  }
);
