import React from 'react';
import { Link } from 'react-router-dom';

//Importing components
import NavBar from '../components/NavBar';

const Home: React.FC = () => {
  return (
    <>
      <NavBar />
      <section className="min-h-screen w-full bg-purple-100 flex items-center justify-center">
        <div className="w-4/5 flex flex-row gap-8 p-8 items-center justify-center">
          <div className="w-3/5 bg-white rounded-lg shadow-lg p-8 flex flex-col space-y-4">
            <h1 className="text-2xl font-bold">Welcome to your drawing journal!</h1>
            <p>When was the last time you drew?</p>
            <p>This project is a chance for you to express yourself through drawing!</p>
            <p>Keep track of your day, how you felt, and what you want to remember.</p>

            <div className="w-full bg-white flex flex-row items-center space-x-4">
              <Link to="/history">
                <button className="w-full bg-white shadow-md p-4 rounded-lg font-medium hover:bg-gray-100">
                  Your Journal
                </button>
              </Link>
              <Link to="/draw">
                <button className="w-full bg-purple-600 shadow-md text-white p-4 rounded-lg font-medium hover:bg-purple-700">
                  Create new drawing
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
