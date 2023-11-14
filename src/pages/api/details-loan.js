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
      // Retrieve branchId from query parameters
      const branchId = req.query.branchId;

      // Check if branchId is provided
      if (!branchId) {
        return res.status(400).json({ error: 'BranchId is required in the query parameters.' });
      }

      // Fetch rows from the loan table where branchId matches
      const [rows] = await pool.query('SELECT * FROM loan WHERE branch_id = ?', [branchId]);

      res.status(200).json(rows);
    } catch (error) {
      console.error('Error fetching data:', error.message);
      res.status(500).json({ error: 'Error fetching data' });
    }
  } else {
    res.status(405).end();
  }
};
