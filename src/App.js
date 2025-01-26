import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Invoices from './pages/Invoices';
import Clients from './pages/Clients';
import { ClientProvider } from './contexts/ClientContext';
import { InvoiceProvider } from './contexts/InvoiceContext';

function App() {
  return (
    <ClientProvider>
      <InvoiceProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/clients" element={<Clients />} />
              </Routes>
            </main>
          </div>
        </Router>
      </InvoiceProvider>
    </ClientProvider>
  );
}

export default App;