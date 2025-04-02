import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { createAdmin, createAdminTable, createDB, createImageTable } from '../database/queries.js';
dotenv.config();

// Database and Table Creation
async function connectDB() {
    try {
        // Initial Connection (No Database)
        const initialDb = await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD
        });

        console.log('Connected to MySQL...');

        const mysqlDB = process.env.MYSQL_DATABASE;

        // Create Database if not exists
        await initialDb.query(createDB);

        // Connect to the new database
        const db = await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: mysqlDB
        });

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


        return db;

    } catch (err) {
        console.error('Error initializing database:', err);
        return null;
    }
}

export default connectDB;