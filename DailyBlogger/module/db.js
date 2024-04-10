import pg from "pg";
import env from "dotenv";

env.config();

const config = {
  user: process.env.user,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
};

export const db = new pg.Client(config);

export async function executeQuery(query, value = []) {
  const result = await db.query(query, value);
  return result.rows;
}
