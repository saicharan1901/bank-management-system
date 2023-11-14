// pages/api/delete.js
import pool from '../../../db';

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const { id } = req.query;

    if (typeof id !== 'string' || isNaN(parseInt(id))) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    try {
      const connection = await pool.getConnection();
      const deleteDataSQL = 'DELETE FROM dbms_project.loan WHERE LoanId = ?';
      const result = await connection.query(deleteDataSQL, [parseInt(id, 10)]);
      connection.release();
 
      if (result[0].affectedRows === 1) {
        res.status(200).json({ message: 'Data deleted successfully.' });
      } else { 
        res.status(404).json({ error: 'Row not found with the given ID' });
      }
    } catch (error) {
      console.error('Error deleting data:', error);
      res.status(500).json({ error: 'Error deleting data.' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
