import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const { accountID, newAccountStatus } = req.body;

    if (!accountID || !newAccountStatus) {
      res.status(400).json({ error: 'Account ID and new status are required' });
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
      // Update the account status based on the provided AccountID
      const updateAccountQuery = 'UPDATE account SET AccountStatus = ? WHERE AccountID = ?';
      const [updateResult] = await pool.query(updateAccountQuery, [newAccountStatus, accountID]);

      if (updateResult.affectedRows === 1) {
        res.status(200).json({ message: 'Account status updated successfully' });
      } else {
        res.status(500).json({ error: 'Failed to update account status' });
      }
    } catch (error) {
      console.error('Error updating account status:', error);
      res.status(500).json({ error: 'An error occurred while updating account status' });
    } finally {
      pool.end();
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
