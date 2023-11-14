import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Banker() {
    const router = useRouter();
    const branchId = router.query.branchId;
    const [accountData, setAccountData] = useState([]);
    const [selectedAccountId, setSelectedAccountId] = useState(null);

    const fetchAccountData = async () => {
        try {
            const response = await fetch(`/api/details-account?branchId=${branchId}`);
            if (response.ok) {
                const data = await response.json();
                setAccountData(data);
            } else {
                console.error('Error fetching account data:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching account data:', error.message);
        }
    };

    const handleDelete = async (accountid) => {

        if (window.confirm('Are you sure you want to delete this account?')) {
            try {
                const response = await fetch(`/api/deleteaccount?id=${accountid}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    fetchAccountData();
                    setSelectedAccountId(null);
                } else {
                    console.error('Error deleting account:', response.statusText);
                }
            } catch (error) {
                console.error('Error deleting account:', error.message);
            }
        }
    };

    useEffect(() => {
        if (branchId) {
            fetchAccountData();
        }
    }, [branchId]);

    return (
        <div className='min-h-screen bg-blue-200'>
            <div className="max-w-4xl mx-auto p-8 shadow-lg rounded-lg">
                <div className="mb-8">
                    <div className="p-4 bg-yellow-500 text-white rounded-t-lg">
                        <h2 className="text-xl">Account Details</h2>
                    </div>
                    <div className="p-4 bg-yellow-100 border-t border-b border-yellow-500 rounded-b-lg">
                        {accountData.length > 0 ? (
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="p-2">Account ID</th>
                                        <th className="p-2">Account Type</th>
                                        <th className="p-2">Account Status</th>
                                        <th className="p-2">Balance</th>
                                        <th className="p-2">Branch ID</th>
                                        <th className="p-2">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {accountData.map((account) => (
                                        <tr key={account.AccountID} className="border-t">
                                            <td className="p-2">{account.AccountID}</td>
                                            <td className="p-2">{account.AccountType}</td>
                                            <td className="p-2">{account.AccountStatus}</td>
                                            <td className="p-2">{account.Balance}</td>
                                            <td className="p-2">{account.branch_id}</td>
                                            <td className="p-2">
                                                <button
                                                    onClick={() => handleDelete(account.AccountID)}
                                                    className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300 mr-2"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                            </table>
                    ) : (
                    <p>No accounts in your branch as of now.</p>
                        )}
                </div>
            </div>
        </div>
        </div >
    );
}
