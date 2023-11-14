import React, { useState } from 'react';
import Select from 'react-select';
import { useRouter } from 'next/router';

export default function ApplyAccount({ query }) {
  const [AccountType, setAccountType] = useState('');
  const [Balance, setBalance] = useState('');
  const router = useRouter();
  const branchId = router.query.branchId;

  const accountTypeOptions = [
    { value: 'Savings', label: 'Savings' },
    { value: 'Current', label: 'Current' },
    { value: 'Fixed Deposit', label: 'Fixed Deposit' },
    { value: 'Recurring Deposit', label: 'Recurring Deposit' },
  ];

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/open-account', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ AccountType, Balance, branchId }),
    });

    if (response.status === 201) {
      console.log('Account data inserted successfully');
    } else {
      const data = await response.json();
      console.error('Error:', data.error);
    }
  };

  return (
    <div className="bg-gradient-to-r from-green-400 to-green-600 h-screen flex flex-col items-center justify-center">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-green-600 mb-4">Apply for an Account</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label htmlFor="AccountType" className="block text-sm font-medium text-gray-600">
              Account Type:
            </label>
            <Select
              options={accountTypeOptions}
              value={accountTypeOptions.find((option) => option.value === AccountType)}
              onChange={(selectedOption) => setAccountType(selectedOption.value)}
              className="mt-1"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="Balance" className="block text-sm font-medium text-gray-600">
              Balance:
            </label>
            <input
              type="number"
              id="Balance"
              value={Balance}
              onChange={(e) => setBalance(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Apply
          </button>
        </form>
      </div>
    </div>
  );
}
