import { neon } from "@neondatabase/serverless";

let client: ReturnType<typeof neon> | null = null;

export function getDb() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) return null;
  if (!client) client = neon(connectionString);
  return client;
}
