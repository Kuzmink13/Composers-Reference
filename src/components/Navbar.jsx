import React, { Component } from 'react';

class Navbar extends Component {
  state = {};
  render() {
    return (
      <div className="p-2 bg-white border-b border-gray-400">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Composer's Reference
        </h1>
      </div>
    );
  }
}

export default Navbar;
