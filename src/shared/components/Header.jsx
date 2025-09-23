import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-green-600 text-white py-4 shadow-md w-screen">
      <div className="flex justify-between items-center px-4 max-w-7xl mx-auto">
        <div className="flex items-center space-x-3">
          <h1 className="text-2xl font-bold font-bubblegum">Chuyến xe bác ái</h1>
        </div>
        <nav className="space-x-6">
          <Link to="/" className="text-white hover:text-yellow-300 transition-colors">Home</Link>
          <Link to="/about" className="text-white hover:text-yellow-300 transition-colors">About</Link>
          <Link to="/contact" className="text-white hover:text-yellow-300 transition-colors">Contact</Link>
          <Link to="/fund" className="text-white hover:text-yellow-300 transition-colors">Fund</Link>
          <Link to="/journey" className="text-white hover:text-yellow-300 transition-colors">Journey</Link>
          <Link to="/members" className="text-white hover:text-yellow-300 transition-colors">Members</Link>
          <Link to="/services" className="text-white hover:text-yellow-300 transition-colors">Services</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;