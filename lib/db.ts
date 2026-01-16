import { Pool } from 'pg';

// Strip sslmode from URL to avoid conflict with ssl config object
const connectionString = process.env.POSTGRES_URL?.replace(/[?&]sslmode=[^&]+/g, (match) =>
  match.startsWith('?') ? '?' : ''
).replace(/\?&/, '?').replace(/\?$/, '');

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

export async function query<T>(text: string, params?: unknown[]): Promise<T[]> {
  const result = await pool.query(text, params);
  return result.rows as T[];
}

export type Submission = {
  id: number;
  email: string;
  message: string | null;
  subscribed: boolean;
  created_at: Date;
};
