import React, { useState } from 'react';
import { useRouter } from 'next/router';

export default function Manager() {
  const [bankCode, setBankCode] = useState('');
  const [branchId, setBranchId] = useState('');
  const [managerName, setManagerName] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    if (!bankCode || !branchId || !managerName) {
      alert('Please provide all the required information.');
      return;
    }
      const response = await fetch(`/api/manager-login?bankCode=${bankCode}&branchId=${branchId}&managerName=${managerName}`);
  
    if (response.status === 200) {
      router.push(`/banker?branchId=${branchId}`);
    } else {
      alert('Invalid information or you are not a bank manager.');
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 to-indigo-600">
      <div className="bg-white p-8 rounded-md shadow-lg">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-4">Bank Manager Login</h2>
        <div className="mb-4">
          <label htmlFor="bankCode" className="block text-sm font-medium text-gray-600">
            Bank Code:
          </label>
          <input
            type="text"
            id="bankCode"
            value={bankCode}
            onChange={(e) => setBankCode(e.target.value)}
            className="mt-1 p-3 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="branchId" className="block text-sm font-medium text-gray-600">
            Branch ID:
          </label>
          <input
            type="text"
            id="branchId"
            value={branchId}
            onChange={(e) => setBranchId(e.target.value)}
            className="mt-1 p-3 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="managerName" className="block text-sm font-medium text-gray-600">
            Manager Name:
          </label>
          <input
            type="text"
            id="managerName"
            value={managerName}
            onChange={(e) => setManagerName(e.target.value)}
            className="mt-1 p-3 border border-gray-300 rounded w-full"
          />
        </div>
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 w-full"
        >
          Login
        </button>
      </div>
    </div>
  );
}
