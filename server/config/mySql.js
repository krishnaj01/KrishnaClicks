import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { createAdmin, createAdminTable, createDB, createImageTable } from '../database/queries.js';
dotenv.config();

// Create a connection pool
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10, // Set a limit to avoid overloading
    queueLimit: 0
});

// Database and Table Creation
async function connectDB() {
    try {
        const db = await pool.getConnection();
        
        const mysqlDB = process.env.MYSQL_DATABASE;
        console.log(`Connected to ${mysqlDB} database...`);


        // Create Tables
        await db.query(createAdminTable);
        const [admin] = await db.query(`SELECT * FROM siteadmin`);

        if (!admin.length) {
            const username = process.env.ADMIN_USERNAME;
            const password = process.env.ADMIN_PASSWORD;

            const hashedPassword = await bcrypt.hash(password, 12);

            await db.query(createAdmin, [username, hashedPassword]);
        }

        await db.query(createImageTable);


        db.release();

    } catch (err) {
        console.error('Error initializing database:', err);
        return null;
    }
}

async function initializeDatabase() {
    try {
        const initialDb = await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD
        });

        console.log('Connected to MySQL...');
        await initialDb.query(createDB); // Create database if not exists
        await initialDb.end(); // Close initial connection after DB creation

        await connectDB(); // Initialize tables and admin user

    } catch (err) {
        console.error('Error setting up database:', err);
    }
}

export { connectDB , initializeDatabase, pool };