import {Pool} from 'pg';
import dotenv from'dotenv';

dotenv.config();

console.log(process.env.DATABASE_URL)

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

console.log("database connected successfully")
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Database connection error:", err);
  } else {
    console.log(res.rows);
  }
});

export default pool;