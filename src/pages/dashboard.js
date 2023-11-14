import React, { useState } from 'react';
import Select from 'react-select';

export default function ApplyLoan() {
  const [Name, setName] = useState('');
  const [PhoneNumber, setPhoneNumber] = useState('');
  const [Address, setAddress] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ Name, PhoneNumber, Address }),
    });

    if (response.status === 201) {
      console.log('Loan data inserted successfully');
      // You can add a success message or use window.location to navigate to another page
      window.location.href = '/home'; // Redirect to /home after a successful submission
    } else {
      const data = await response.json();
      console.error('Error:', data.error);
      // You can display an error message to the user
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 to-indigo-600">
      <div className="bg-white px-24 py-10 rounded-md shadow-lg">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-4">LOGIN</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label htmlFor="Name" className="block text-sm font-medium text-gray-600">
              Name:
            </label>
            <input
              type="text"
              id="Name"
              value={Name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="PhoneNumber" className="block text-sm font-medium text-gray-600">
              Phone Number:
            </label>
            <input
              type="text"
              id="PhoneNumber"
              value={PhoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="Address" className="block text-sm font-medium text-gray-600">
              Address:
            </label>
            <input
              type="text"
              id="Address"
              value={Address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 w-full"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}


