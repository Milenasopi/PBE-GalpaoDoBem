// // conexão com o banco através do .envs
require('dotenv').config();
// indica q vamos usar o banco de dados pg
const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

// pra poder usar a conexão em outros lugares
// module.exports = pool;


//para conexão com a Vercel
// require('dotenv').config();
// const { Pool } = require('pg');

// const pool = new Pool({
//     connectionString: process.env.DATABASE_URL,
//     ssl: {
//         rejectUnauthorized: false
//     }
// });

module.exports = pool;
