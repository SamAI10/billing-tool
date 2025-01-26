import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-xl font-bold">Facturation</Link>
          <div className="flex space-x-4">
            <Link to="/" className="hover:text-blue-600">Dashboard</Link>
            <Link to="/invoices" className="hover:text-blue-600">Factures</Link>
            <Link to="/clients" className="hover:text-blue-600">Clients</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;