import React from 'react';
import ReactDOM from 'react-dom';
import './assets/main.css';
import Navbar from './components/Navbar';
import Keys from './components/Keys';

ReactDOM.render(
  <React.StrictMode>
    <div className="flex flex-col h-screen bg-gray-100">
      <Navbar />
      <div className="flex justify-center flex-grow">
        <div className="h-full w-full lg:max-w-screen-lg">
          <Keys />
        </div>
      </div>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);
