// pages/index.js

import { useEffect, useState } from 'react';
import Link from 'next/link';

const Home = () => {
  const [details, setDetails] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/banks');
      if (response.ok) {
        const data = await response.json();
        setDetails(data);
      } else {
        setError('Error fetching data: ' + response.status);
      }
    } catch (error) {
      setError('Error fetching data: ' + error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-gradient-to-b from-blue-500 to-purple-500 h-screen flex items-center justify-center">
      <div className="text-center">
        {error && <p className="text-red-500 text-2xl mb-4">{error}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {details.map((detail) => (
            <Link key={detail.Code} href={`/home2?BankCode=${detail.Code}`}>
              <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white p-6 rounded-lg transform hover:scale-105 transition duration-300">
                <p className="text-xl font-semibold mb-2">View Branches for</p>
                <p className="text-2xl font-bold">{detail.BankName}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
