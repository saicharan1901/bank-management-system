// pages/api/branches.js

import mysql from 'mysql2/promise';

export default async (req, res) => {
  if (req.method === 'GET') {
    const { bankCode } = req.query;

    try {
      // Create a new MySQL pool inline
      const pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'sql@123',
        database: 'dbms_project',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
      });

      // Fetch branches for the specified bank code
      const [branches] = await pool.query('SELECT * FROM Branch WHERE BankCode = ?', [bankCode]);

      pool.end(); // Release the connection after the query

      res.status(200).json(branches);
    } catch (error) {
      console.error('Error fetching branches:', error);
      res.status(500).json({ error: 'An error occurred while fetching branches' });
    }
  } else {
    res.status(405).end(); // Method not allowed
  }
};
