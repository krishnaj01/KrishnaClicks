import dotenv from 'dotenv';
dotenv.config();

const createImageTable = `
    CREATE TABLE IF NOT EXISTS images (
    id SERIAL PRIMARY KEY,
    img_url VARCHAR(255) NOT NULL UNIQUE,
    date BIGINT
    )
    `;

const createAdminTable = `
    CREATE TABLE IF NOT EXISTS siteadmin (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
    )
    `;

const createAdmin = `
    INSERT INTO siteadmin (username, password) VALUES ($1, $2)
    `;

const checkAdmin = `
    SELECT * FROM siteadmin WHERE username = $1
    `;

const insertImage = `
    INSERT INTO images (img_url, date) VALUES ($1, $2)
    `;

const getImages = `
    SELECT * FROM images
    ORDER BY date DESC
    OFFSET $1 LIMIT $2
    `;

const getSingleImage = `
    SELECT * FROM images WHERE id = $1
    `;

const getImageByUrl = `
  SELECT * FROM images WHERE img_url = $1;
`;

const deleteImage = `
    DELETE FROM images WHERE id = $1
    `;

export { createAdminTable, createImageTable, createAdmin, checkAdmin, insertImage, getImages, getSingleImage, getImageByUrl, deleteImage };


// id, img_url