import dotenv from 'dotenv';
dotenv.config();

const createDB = `CREATE DATABASE IF NOT EXISTS ${process.env.MYSQL_DATABASE}`;

const createImageTable = `
    CREATE TABLE IF NOT EXISTS images (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    img_url VARCHAR(255) NOT NULL,
    date BIGINT NOT NULL DEFAULT (UNIX_TIMESTAMP())
    )
    `;

const createAdminTable = `
    CREATE TABLE IF NOT EXISTS siteadmin (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
    )
    `;

const createAdmin = `
    INSERT INTO siteadmin (username, password) VALUES (?, ?)
    `;

const checkAdmin = `
    SELECT * FROM siteadmin WHERE username = ?
    `;

const insertImage = `
    INSERT INTO images (img_url, date) VALUES (? ,?)
    `;

const getImages = `
    SELECT * FROM images
    ORDER BY date DESC
    LIMIT ?, ?
    `;

const getSingleImage = `
    SELECT * FROM images WHERE id = ?
    `;

const getImageByUrl = `
  SELECT * FROM images WHERE img_url = ?;
`;

const deleteImage = `
    DELETE FROM images WHERE id = ?
    `;

export { createDB, createAdminTable, createImageTable, createAdmin, checkAdmin, insertImage, getImages, getSingleImage, getImageByUrl, deleteImage };


// id, img_url