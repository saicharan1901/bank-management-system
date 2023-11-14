const mysql = require('mysql2/promise');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { AccountType, Balance, branchId } = req.body;
    if (!AccountType || !Balance || !branchId) {
      return res.status(400).json({ error: 'AccountType, Balance, and branchId are required fields' });
    }

    // Create a new MySQL pool inline
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
      const query = 'INSERT INTO Account (AccountType, AccountStatus, Balance, branch_id) VALUES (?,?,?,?)';
      const result = await pool.query(query, [AccountType, 'Active', Balance, branchId]);

      if (result[0].affectedRows === 1) {
        res.status(201).json({ message: 'Account data inserted successfully' });
      } else {
        console.error('Failed to insert data:', result[0].message);
        res.status(500).json({ error: 'An error occurred while inserting data' });
      }
    } catch (error) {
      console.error('Error inserting data:', error);
      res.status(500).json({ error: 'An error occurred while inserting data' });
    } finally {
      // Release the connection after the query
      pool.end();
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
