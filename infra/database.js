import { Client } from "pg";

async function query(queryInfo) {
  const client = new Client({
    port: process.env.POSTGRES_PORT,
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    ssl: process.env.NODE_ENV === "production",
  });

  try {
    await client.connect();
    const result = await client.query(queryInfo);
    return result;
  } catch (ex) {
    console.log("Deu erro pai!", ex);
  } finally {
    await client.end();
  }
}

export default {
  query: query,
};
