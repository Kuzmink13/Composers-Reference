import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

function Scales() {
  return (
    <div>
      <Navbar>
        <Link to="/" className="py-2">
          return to app
        </Link>
      </Navbar>
      <h1 className="font-bold text-3xl">Meet the Scales</h1>
    </div>
  );
}

export default Scales;
