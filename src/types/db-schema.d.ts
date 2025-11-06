import { MySqlTableWithColumns } from 'drizzle-orm/mysql-core';

declare module '../db/schema' {
  export const users: MySqlTableWithColumns<{
    id: number;
    email: string;
    password: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  }>;

  export const videos: MySqlTableWithColumns<{
    id: number;
    userId: number;
    title: string;
    description: string | null;
    url: string;
    thumbnailUrl: string | null;
    status: string;
    metadata: any;
    createdAt: Date;
    updatedAt: Date;
  }>;

  export const shorts: MySqlTableWithColumns<{
    id: number;
    userId: number;
    videoId: number;
    title: string;
    description: string | null;
    status: string;
    metadata: any;
    createdAt: Date;
    updatedAt: Date;
  }>;

  export type User = {
    id: number;
    email: string;
    name: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
  };

  export type NewUser = Omit<User, 'id' | 'createdAt' | 'updatedAt'> & {
    password: string;
  };

  export type Video = {
    id: number;
    userId: number;
    title: string;
    description: string | null;
    url: string;
    thumbnailUrl: string | null;
    status: string;
    metadata: any;
    createdAt: Date;
    updatedAt: Date;
  };

  export type NewVideo = Omit<Video, 'id' | 'createdAt' | 'updatedAt'>;

  export type Short = {
    id: number;
    userId: number;
    videoId: number;
    title: string;
    description: string | null;
    status: string;
    metadata: any;
    createdAt: Date;
    updatedAt: Date;
  };

  export type NewShort = Omit<Short, 'id' | 'createdAt' | 'updatedAt'>;
}
