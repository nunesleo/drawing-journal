import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import Login from './Login';
import { auth } from './firebaseConfig';

const NavBar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      if (!user) {
        navigate('/');
      }
    });

    return () => unsubscribe();
  }, [navigate, location]);

  return (
    <nav className='bg-purple-600 w-full items-center flex flex-row text-white font-bold py-4 px-8 space-x-6'>
      <Link to="/">
        <p className='hover:underline'>Home</p>
      </Link>
      <Link to="/History">
        <p className='hover:underline'>Your Journal</p>
      </Link>
      <Link to="/draw">
        <p className='hover:underline'>Drawing of the day</p>
      </Link>
      <div className='flex flex-grow'></div>
      <div className='ml-auto bg-white text-black font-normal rounded-md p-2'>
        <Login isLoggedIn={isLoggedIn} />
      </div>
    </nav>
  );
};

export default NavBar;
