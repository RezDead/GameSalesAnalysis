import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import pool, { query } from './public/scripts/db.js'
import { GET_GAME_INFO, GET_GAMES } from './queries.js'

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// src/server.js
app.get('/api/games', async (req, res) => {
  try {
    // Parse page and limit from URL query (?page=1&limit=25), with safe defaults
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || 25)); // Cap at 100 max per page
    const offset = (page - 1) * limit;

    const gamesResult = await query(GET_GAMES, [limit, offset]);

    const countResult = await query('SELECT COUNT(*) FROM game');
    const totalGames = parseInt(countResult.rows[0].count, 10);
    const totalPages = Math.ceil(totalGames / limit);

    res.json({
      games: gamesResult.rows,
      pagination: {
        currentPage: page,
        totalPages,
        totalGames,
        limit,
      },
    });
  } catch (err) {
    console.error('Pagination query error:', err);
    res.status(500).json({ error: 'Failed to fetch games' });
  }
});

app.get('/api/games/:id', async (req, res) => {
  try {
    const result = await query(GET_GAME_INFO, [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Game not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Database query error:', err);
    res.status(500).json({ error: 'Failed to fetch game details' });
  }
});

app.listen(process.env.WEBSITE_PORT, () => {
  console.log(`Server is running on port ${process.env.WEBSITE_PORT}`);
});