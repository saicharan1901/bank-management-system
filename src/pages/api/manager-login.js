import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { bankCode, branchId, managerName } = req.query;

    if (!bankCode || !branchId || !managerName) {
      res.status(400).json({ error: 'Please provide all the required information.' });
      return;
    }

    // Create a MySQL pool
    const pool = mysql.createPool({
      host: 'localhost', // or '127.0.0.1'
      user: 'root',
      password: 'sql@123',
      database: 'dbms_project',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    try {
      const query = 'SELECT * FROM branch WHERE BankCode = ? AND Branch_id = ? AND ManagerName = ?';
      const [rows] = await pool.query(query, [bankCode, branchId, managerName]);

      if (rows.length === 1) {
        res.status(200).json({ message: 'Login successful' });
      } else {
        res.status(403).json({ error: 'Invalid information or you are not a bank manager.' });
      }
    } catch (error) {
      console.error('Error checking login:', error);
      res.status(500).json({ error: 'An error occurred while checking login' });
    } finally {
      pool.end();
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
