// pages/home2.js

import { useEffect, useState } from 'react';
import Link from 'next/link';

const Home2 = ({ query }) => {
  const [branches, setBranches] = useState([]);
  const bankCode = query.BankCode;

  const fetchBranches = async () => {
    try {
      const response = await fetch(`/api/branches?bankCode=${bankCode}`);
      if (response.ok) {
        const data = await response.json();
        setBranches(data);
      } else {
        console.error('Error fetching branches:', response.status);
      }
    } catch (error) {
      console.error('Error fetching branches:', error.message);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, [bankCode]);

  return (
    <div className="bg-gradient-to-r from-blue-400 to-blue-600  h-screen flex flex-col items-center justify-center">
      <div className="container mx-auto justify-center place-content-center p-4 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-blue-600 mb-4">
          Branches for Bank Code: {bankCode}
        </h1>
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-2">Branch Data:</h2>
          <ul>
            {branches.map((branch) => (
              <li className="text-lg mb-4" key={branch.Branch_id}>
                {branch.Name}
                <div className="mt-2">
                  <Link href={`/apply-loan?branchId=${branch.Branch_id}`}>
                    <button className="mr-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
                      Apply for Loan
                    </button>
                  </Link>
                  <Link href={`/apply-account?branchId=${branch.Branch_id}`}>
                    <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300">
                      Apply for Account
                    </button>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

Home2.getInitialProps = async ({ query }) => {
  return { query };
};

export default Home2;
