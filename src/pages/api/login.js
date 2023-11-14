const mysql = require('mysql2/promise');

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { LoanType, LoanStatus, Amount } = req.body;
        if (!LoanType || !Amount) {
            return res.status(400).json({ error: 'All fields are required' });
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
            const query = 'INSERT INTO Loan (LoanType, LoanStatus, Amount) VALUES (?,?,?)';
            const result = await pool.query(query, [LoanType, LoanStatus, Amount]);


            if (result[0].affectedRows === 1) {
                res.status(201).json({ message: 'Loan data inserted successfully' });
            } else {
                console.error('Failed to insert data:', result[0].message); // Log the actual error message
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
