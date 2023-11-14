
// pages/index.js
import Link from 'next/link';

const Home = () => {
  return (
    <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 min-h-screen flex items-center justify-center">
      <div className="text-white text-center p-8">
        <h1 className="text-4xl font-bold mb-4 animate__animated animate__fadeIn animate__delay-1s">
          Bank Management System
        </h1>
        <p className="text-lg animate__animated animate__fadeIn animate__delay-2s">
          Welcome to our bank management system. Efficiently manage your bank accounts and loans.
        </p>
        <div className="mt-6">
          <Link href="/dashboard">
            <p className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-lg m-2 text-white animate__animated animate__fadeIn animate__delay-3s">
              Customer Login
            </p>
          </Link>
          <Link href="/manager">
            <p className="bg-green-700 hover:bg-green-800 px-4 py-2 rounded-lg m-2 text-white animate__animated animate__fadeIn animate__delay-3s">
              Bank Manager Login
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;

