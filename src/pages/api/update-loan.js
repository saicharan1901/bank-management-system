import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const { loanId, newStatus } = req.body;
    if (!loanId || !newStatus) {
      return res.status(400).json({ error: 'Loan ID and new status are required' });
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
      const query = 'UPDATE Loan SET LoanStatus = ? WHERE LoanId = ?';
      const result = await pool.query(query, [newStatus, loanId]);

      if (result[0].affectedRows === 1) {
        res.status(200).json({ message: 'Loan status updated successfully' });
      } else {
        console.error('Failed to update loan status:', result[0].message); // Log the actual error message
        res.status(500).json({ error: 'An error occurred while updating loan status' });
      }
    } catch (error) {
      console.error('Error updating loan status:', error);
      res.status(500).json({ error: 'An error occurred while updating loan status' });
    } finally {
      // Release the connection after the query
      pool.end();
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
