import pg from 'pg'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const pool = new pg.Pool({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
})

async function verifyPool() {
  const client = await pool.connect();
  try {
    await client.query('SELECT 1');
    console.log('PostgreSQL pool connected successfully.');
  } catch (err) {
    console.error('Failed to connect to PostgreSQL:', err);
  } finally{
    client.release();
  }
}

verifyPool();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(process.env.WEBSITE_PORT, () => {
  console.log(`Server is running on port ${process.env.WEBSITE_PORT}`);
});