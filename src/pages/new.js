// pages/deleteData.js
import { useState } from 'react';

export default function DeleteData() {
  const [id, setId] = useState('');

  const handleIdChange = (e) => {
    setId(e.target.value);
  };

  const handleDeleteFromTable = async () => {
    try {
      const response = await fetch(`/api/delete?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Data deleted successfully.');
        setId(''); // Clear the input field after a successful delete
      } else {
        console.error('Error deleting data.');
      }
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  return (
    <div className="container mx-auto mt-10 text-black items-center justify-center">
      <h1 className="text-3xl font-bold mb-4 text-white">Delete Data from SQL Table</h1>
      <div className="mb-4">
        <input
          type="number"
          placeholder="ID"
          className="border p-2"
          value={id}
          onChange={handleIdChange}
        />
      </div>
      <button
        onClick={handleDeleteFromTable}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Delete from Table
      </button>
    </div>
  );
}
