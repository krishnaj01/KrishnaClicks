import pg from 'pg';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { createAdmin, createAdminTable, createImageTable } from '../database/queries.js';

dotenv.config();

const { Pool } = pg;
const neonConnectionString = process.env.NEONDB_POSTGRESQL_CONNECTION_STRING;

const url = new URL(neonConnectionString);
const sslModeFromEnv = url.searchParams.get('sslmode');
const normalizedSslMode =
  sslModeFromEnv === 'prefer' || sslModeFromEnv === 'require' || sslModeFromEnv === 'verify-ca'
    ? 'verify-full'
    : (sslModeFromEnv || 'verify-full');
const channelBinding = url.searchParams.get('channel_binding');

const poolConfig = {
  host: url.hostname,
  port: Number(url.port || 5432),
  user: decodeURIComponent(url.username),
  password: decodeURIComponent(url.password),
  database: url.pathname.replace(/^\//, ''),
  ssl: {
    rejectUnauthorized: true,
  },
  enableChannelBinding: channelBinding === 'require' || channelBinding === 'prefer',
};

const pool = new Pool({
  ...poolConfig,
});

async function connectDB() {
  try {
    const client = await pool.connect();
    console.log('Connected to Neon PostgreSQL database...');
    client.release();
  } catch (err) {
    console.error('Error connecting to the database:', err);
    return null;
  }
}

async function initializeDatabase() {
    try {
        const client = await pool.connect();
        console.log('Database initialized...');

        // Create Tables
        await client.query(createAdminTable);
        const res = await client.query(`SELECT * FROM siteadmin`);
        
        if (res.rows.length === 0) {
            const username = process.env.ADMIN_USERNAME;
            const password = process.env.ADMIN_PASSWORD;
          const hashedPassword = await bcrypt.hash(password, 12);

          await client.query(createAdmin, [username, hashedPassword]);
        }

        await client.query(createImageTable);

        client.release();
    } catch (err) {
        console.error('Error initializing database:', err);
        return null;
    }
}

export { pool, connectDB, initializeDatabase };