// src/types/drizzle.d.ts
import { PgTableWithColumns } from 'drizzle-orm/pg-core';
import { MySqlTableWithColumns } from 'drizzle-orm/mysql-core';
import { SQLiteTableWithColumns } from 'drizzle-orm/sqlite-core';

// Tipagem genérica para tabelas Drizzle
export type DrizzleTable<T> = 
  | PgTableWithColumns<T>
  | MySqlTableWithColumns<T>
  | SQLiteTableWithColumns<T>;
