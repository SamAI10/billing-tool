import React from 'react';
import { useClients } from '../contexts/ClientContext';
import { useInvoices } from '../contexts/InvoiceContext';

function Dashboard() {
  const { clients } = useClients();
  const { invoices } = useInvoices();

  const totalAmount = invoices.reduce((sum, invoice) => sum + (invoice.amount || 0), 0);
  const pendingInvoices = invoices.filter(invoice => invoice.status === 'pending').length;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Total Factures</h2>
          <p className="text-3xl">{totalAmount.toFixed(2)} €</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Factures en attente</h2>
          <p className="text-3xl">{pendingInvoices}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Clients</h2>
          <p className="text-3xl">{clients.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;