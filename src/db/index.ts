import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } from '../config';
import * as schema from './schema';

// Cria a conexão com o banco de dados
const connection = await mysql.createConnection({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  multipleStatements: true,
});

export const db = drizzle(connection, { schema, mode: 'default' });

// Exporta as tabelas
export const { usersTable, videosTable, shortsTable } = schema;

// Exporta os tipos
export type { User, NewUser, Video, NewVideo, Short, NewShort } from './schema';
