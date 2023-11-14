import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'sql@123',
  database: 'dbms_project',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default async (req, res) => {
  if (req.method === 'GET') {
    try {
      const [rows] = await pool.query('SELECT * FROM loan');
      res.status(200).json(rows);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching data' });
    }
  } else {
    res.status(405).end();
  }
};
