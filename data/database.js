import mysql from "mysql2";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "lashnode",
  port: 3306,
});

export const db = pool.promise();
