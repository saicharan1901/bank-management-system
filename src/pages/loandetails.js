import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';


export default function Banker() {
    const router = useRouter();
    const branchId = router.query.branchId;
    const [loanData, setLoanData] = useState([]);


    const fetchLoanData = async () => {
        try {
            const response = await fetch(`/api/details-loan?branchId=${branchId}`);
            if (response.ok) {
                const data = await response.json();
                setLoanData(data);
            } else {
                console.error('Error fetching loan data:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching loan data:', error.message);
        }
    };

    useEffect(() => {
        if (branchId) {
            fetchLoanData();
        }
    }, [branchId]);

    const handleDelete = async (accountid) => {

        if (window.confirm('Are you sure you want to delete this account?')) {
            try {
                const response = await fetch(`/api/deleteloan?id=${accountid}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    fetchLoanData();
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
            fetchLoanData();
        }
    }, [branchId]);

    return (
        <div className='min-h-screen bg-blue-200'>
            <div className="max-w-4xl mx-auto p-8 shadow-lg rounded-lg">
                <div className="mb-8">
                    <div className="p-4 bg-yellow-500 text-white rounded-t-lg">
                        <h2 className="text-xl">Loan Details</h2>
                    </div>
                    <div className="p-4 bg-yellow-100 border-t border-b border-yellow-500 rounded-b-lg">
                        {loanData.length > 0 ? (
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="p-2">Loan ID</th>
                                        <th className="p-2">Loan Type</th>
                                        <th className="p-2">Loan Status</th>
                                        <th className="p-2">Amount</th>
                                        <th className="p-2">Branch ID</th>
                                        <th className="p-2">Interest Rate</th>
                                        <th className="p-2">Calculated Interest</th>
                                        <th className="p-2">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loanData.map((loan) => (
                                        <tr key={loan.LoanID} className="border-t">
                                            <td className="p-2">{loan.LoanID}</td>
                                            <td className="p-2">{loan.LoanType}</td>
                                            <td className="p-2">{loan.LoanStatus}</td>
                                            <td className="p-2">{loan.Amount}</td>
                                            <td className="p-2">{loan.branch_id}</td>
                                            <td className="p-2">{loan.InterestRate}</td>
                                            <td className="p-2">{loan.CalculatedInterest}</td>
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
                            <p>No loans in your branch as of now.</p>
                        )}
                    </div>
                </div>
                {/* ... (rest of your code) */}
            </div>
        </div>
    );
}
