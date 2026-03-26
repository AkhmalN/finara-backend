import { postgresConfig } from "@/lib/postgresConfig";
import { QueryResult } from "pg";

const db = {
  query: async (text: string, params?: unknown[]): Promise<QueryResult> => {
    return postgresConfig.pool.query(text, params);
  },

  getOne: async <T>(text: string, params?: unknown[]): Promise<T | null> => {
    const result = await postgresConfig.pool.query(text, params);
    return result.rows[0] || null;
  },

  getMany: async <T>(text: string, params?: unknown[]): Promise<T[]> => {
    const result = await postgresConfig.pool.query(text, params);
    return result.rows;
  },

  close: async () => {
    await postgresConfig.pool.end();
  },
};

export default db;
