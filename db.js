// db.js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost', // or '127.0.0.1'
  user: 'root',
  password: 'sql@123',
  database: 'dbms_project', 
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;
