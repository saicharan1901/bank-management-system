import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';


export default function Banker() {
  const router = useRouter();
  const branchId = router.query.branchId;

  const [accountID, setAccountID] = useState('');
  const [newAccountStatus, setNewAccountStatus] = useState('');
  const [loanId, setLoanId] = useState('');
  const [newLoanStatus, setNewLoanStatus] = useState('');
  const [loanMessage, setLoanMessage] = useState('');
  const [accountMessage, setAccountMessage] = useState('');
  const [details, setDetails] = useState([]);


  const handleUpdateLoanStatus = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/update-loan', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ loanId, newLoanStatus }),
    });

    if (response.status === 200) {
      setLoanMessage('Loan status updated successfully');
      setLoanId('');
    } else {
      const data = await response.json();
      setLoanMessage(data.error);
    }
  };

  const handleUpdateAccountStatus = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/update-account', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ accountID, newAccountStatus }),
    });

    if (response.status === 200) {
      setAccountMessage('Account status updated successfully');
      setAccountID('');
    } else {
      const data = await response.json();
      setAccountMessage(data.error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch('/api/customers');
      if (response.ok) {
        const data = await response.json();
        setDetails(data);
      }
    } catch (error) {
      setError('Error fetching data: ' + error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (

    <div className="min-h-screen bg-gray-100 flex items-center justify-center">

      <div className="max-w-2xl p-8 shadow-lg rounded-lg bg-white text-gray-800">
        <div className='text-center mb-10 font-bold text-3xl'>
          Welcome to Branch {branchId}
        </div>
        <div className="flex flex-col md:flex-row gap-5">
          <div className="w-full md:w-1/2 mb-8">
            <div className="p-4 bg-indigo-700 text-white rounded-t-lg text-center md:text-left">
              <h2 className="text-2xl font-semibold">Update Loan Status</h2>
            </div>
            <div className="p-4 bg-white border-t border-b border-indigo-700 rounded-b-lg">
              <form onSubmit={handleUpdateLoanStatus} className="space-y-4">
                <div className="mb-4">
                  <label htmlFor="loanId" className="block text-sm font-medium text-gray-600">
                    Loan ID:
                  </label>
                  <input
                    type="number"
                    id="loanId"
                    value={loanId}
                    onChange={(e) => setLoanId(e.target.value)}
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="newLoanStatus" className="block text-sm font-medium text-gray-600">
                    New Status:
                  </label>
                  <select
                    id="newLoanStatus"
                    value={newLoanStatus}
                    onChange={(e) => setNewLoanStatus(e.target.value)}
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                  >
                    <option value="">Select Status</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                >
                  Update Status
                </button>
                {loanMessage && <p className="mt-4 text-red-600">{loanMessage}</p>}
              </form>
            </div>
          </div>
          <div className="w-full md:w-1/2 mb-8">
            <div className="p-4 bg-green-700 text-white rounded-t-lg text-center md:text-left">
              <h2 className="text-2xl font-semibold">Update Account Status</h2>
            </div>
            <div className="p-4 bg-white border-t border-b border-green-700 rounded-b-lg">
              <form onSubmit={handleUpdateAccountStatus} className="space-y-4">
                <div className="mb-4">
                  <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-600">
                    Account Number:
                  </label>
                  <input
                    type="number"
                    id="accountNumber"
                    value={accountID}
                    onChange={(e) => setAccountID(e.target.value)}
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="newAccountStatus" className="block text-sm font-medium text-gray-600">
                    New Status:
                  </label>
                  <select
                    id="newAccountStatus"
                    value={newAccountStatus}
                    onChange={(e) => setNewAccountStatus(e.target.value)}
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                  >
                    <option value="">Select Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300"
                >
                  Update Status
                </button>
                {accountMessage && <p className="mt-4 text-red-600">{accountMessage}</p>}
              </form>
            </div>
          </div>
        </div>
        <hr className="my-8 border-b border-gray-300" />
        <Link href={`/loandetails?branchId=${branchId}`}>
          <p className="px-6 py-3.5 text-base font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Loan Details</p>
        </Link>

        <Link href={`/accountdetails?branchId=${branchId}`}>
          <p className="px-6 py-3.5 text-base font-medium text-white bg-blue-700 hover:bg-blue-800 mt-3 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Account Details</p>
        </Link>
      </div>
    </div>
  );

}
