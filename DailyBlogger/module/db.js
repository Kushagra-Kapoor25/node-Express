import pg from "pg";
import env from "dotenv";

env.config();

const config = {
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
};

export const db = new pg.Client(config);

export async function executeQuery(query, value = []) {
  const result = await db.query(query, value);
  return result.rows;
}
