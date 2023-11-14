import React, { useState } from 'react';
import Select from 'react-select';
import { useRouter } from 'next/router';

export default function ApplyLoan({ query }) {
  const [LoanType, setLoanType] = useState('');
  const [Amount, setAmount] = useState('');
  const router = useRouter();
  const branchId = router.query.branchId;

  const loanTypesOptions = [
    { value: 'Car Loan', label: 'Car Loan' },
    { value: 'Home Loan', label: 'Home Loan' },
    { value: 'Personal Loan', label: 'Personal Loan' },
    { value: 'Student Loan', label: 'Student Loan' },
  ]

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/bank', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ LoanType, Amount, branchId }),
    });

    if (response.status === 201) {
      console.log('Loan data inserted successfully');
    } else {
      const data = await response.json();
      console.error('Error:', data.error);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-400 to-blue-600 h-screen flex flex-col items-center justify-center">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-blue-600 mb-4">Apply for a Loan</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label htmlFor="LoanType" className="block text-sm font-medium text-gray-600">
              Loan Type:
            </label>
            <Select
              options={loanTypesOptions}
              value={loanTypesOptions.find((option) => option.value === LoanType)}
              onChange={(selectedOption) => setLoanType(selectedOption.value)}
              className="mt-1"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="Amount" className="block text-sm font-medium text-gray-600">
              Amount:
            </label>
            <input
              type="number"
              id="Amount"
              value={Amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300 focus:outline-none focus:ring focus:ring-green-300"
          >
            Apply
          </button>
        </form>
      </div>
    </div>
  );
}
