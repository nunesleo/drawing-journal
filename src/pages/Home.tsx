import React from 'react';
import { Link } from 'react-router-dom';

//Importing components
import NavBar from '../components/NavBar';

const Home: React.FC = () => {
  return (
    <>
    <NavBar />
    <section className="min-h-screen w-full bg-purple-100 flex flex-row items-center justify-center">
      <div className='w-2/3 h-full flex flex-row space-x-6 items-center justify-center'>
        <div className="w-2/3 h-full bg-white rounded-md shadow-md p-6 flex flex-col justify-center">
          <h1 className="text-lg font-bold">Welcome to your drawing journal!</h1>
          <p>When was the last time you drew?</p>
          <p>This project is a chance for you to express yourself through drawing!</p>
          <p>Keep track of your day, how you felt and what you want to remember</p>
        </div>
        <div className='w-1/3 bg-white rounded-md flex flex-col p-6 space-y-2'>
          <Link to="/history">
            <button className="w-full bg-white shadow-md p-6 rounded-md">
              Your Journal
            </button>
          </Link>
          <Link to="/draw">
            <button className="w-full bg-purple-600 text-white p-2 rounded-md">
              Create new drawing
            </button>
          </Link>
        </div>
      </div>
    </section>
    </>
  );
};

export default Home;
