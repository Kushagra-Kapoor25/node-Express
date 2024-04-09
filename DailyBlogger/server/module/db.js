import pg from "pg";

const config = {
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "password",
  port: 5432,
};

export const db = new pg.Client(config);

export async function executeQuery(query, value = []) {
  const result = await db.query(query, value);
  return result.rows;
}
