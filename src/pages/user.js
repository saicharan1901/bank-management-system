import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const UserDashboard = () => {
  const [accountData, setAccountData] = useState([]);
  const [loanData, setLoanData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/database'); // Adjust the API route as needed
      if (response.ok) {
        const data = await response.json();
        // Filter data for accounts and loans based on your API response structure
        const accounts = data.filter((item) => item.type === 'account');
        const loans = data.filter((item) => item.type === 'loan');
        setAccountData(accounts);
        setLoanData(loans);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data when the component loads
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 0.2, duration: 0.5 } },
  };

  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h1 className="text-3xl font-semibold mb-6">User Dashboard</h1>

      <motion.div
        className="mb-8"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-2xl font-semibold mb-2">Accounts</h2>
        <ul>
          {accountData.map((account) => (
            <li key={account.id} className="mb-2">
              Account Type: {account.accountType}, Balance: ${account.balance}
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.div
        className="mb-8"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-2xl font-semibold mb-2">Loans</h2>
        <ul>
          {loanData.map((loan) => (
            <li key={loan.id} className="mb-2">
              Loan Type: {loan.loanType}, Amount: ${loan.amount}
            </li>
          ))}
        </ul>
      </motion.div>

      <Link href="/apply-loan">
        <motion.button
          className="px-4 py-2 bg-blue-500 text-white rounded-md font-semibold mr-4 hover:bg-blue-600"
          whileHover={{ scale: 1.05 }}
        >
          Apply for a Loan
        </motion.button>
      </Link>

      <Link href="/update-profile">
        <motion.button
          className="px-4 py-2 bg-green-500 text-white rounded-md font-semibold mt-2 hover:bg-green-600"
          whileHover={{ scale: 1.05 }}
        >
          Edit Your Profile
        </motion.button>
      </Link>
    </motion.div>
  );
};

export default UserDashboard;
