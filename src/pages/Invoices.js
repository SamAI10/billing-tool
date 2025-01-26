import React, { useState } from 'react';
import { useInvoices } from '../contexts/InvoiceContext';
import { useClients } from '../contexts/ClientContext';

function Invoices() {
  const { invoices, addInvoice, updateInvoiceStatus } = useInvoices();
  const { clients } = useClients();
  const [showForm, setShowForm] = useState(false);
  const [newInvoice, setNewInvoice] = useState({
    clientId: '',
    amount: '',
    description: '',
    items: [{ description: '', quantity: 1, price: 0 }]
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const client = clients.find(c => c.id === parseInt(newInvoice.clientId));
    const calculatedAmount = newInvoice.items.reduce(
      (sum, item) => sum + (item.quantity * item.price),
      0
    );

    addInvoice({
      ...newInvoice,
      amount: calculatedAmount,
      date: new Date().toISOString(),
      clientName: client?.name || 'Client inconnu'
    });
    setNewInvoice({
      clientId: '',
      amount: '',
      description: '',
      items: [{ description: '', quantity: 1, price: 0 }]
    });
    setShowForm(false);
  };

  const addItem = () => {
    setNewInvoice({
      ...newInvoice,
      items: [...newInvoice.items, { description: '', quantity: 1, price: 0 }]
    });
  };

  const updateItem = (index, field, value) => {
    const updatedItems = newInvoice.items.map((item, i) => {
      if (i === index) {
        return { ...item, [field]: field === 'quantity' || field === 'price' ? Number(value) : value };
      }
      return item;
    });

    setNewInvoice({
      ...newInvoice,
      items: updatedItems
    });
  };

  const removeItem = (index) => {
    setNewInvoice({
      ...newInvoice,
      items: newInvoice.items.filter((_, i) => i !== index)
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Factures</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Nouvelle Facture
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-xl max-w-4xl w-full m-4">
            <h2 className="text-xl font-bold mb-4">Nouvelle Facture</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Client</label>
                <select
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={newInvoice.clientId}
                  onChange={(e) => setNewInvoice({ ...newInvoice, clientId: e.target.value })}
                >
                  <option value="">Sélectionnez un client</option>
                  {clients.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-medium">Articles</h3>
                  <button
                    type="button"
                    onClick={addItem}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    + Ajouter un article
                  </button>
                </div>
                
                {newInvoice.items.map((item, index) => (
                  <div key={index} className="flex gap-4 items-start mb-4">
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Description"
                        className="w-full rounded-md border-gray-300"
                        value={item.description}
                        onChange={(e) => updateItem(index, 'description', e.target.value)}
                        required
                      />
                    </div>
                    <div className="w-24">
                      <input
                        type="number"
                        placeholder="Quantité"
                        className="w-full rounded-md border-gray-300"
                        value={item.quantity}
                        onChange={(e) => updateItem(index, 'quantity', e.target.value)}
                        min="1"
                        required
                      />
                    </div>
                    <div className="w-32">
                      <input
                        type="number"
                        placeholder="Prix"
                        className="w-full rounded-md border-gray-300"
                        value={item.price}
                        onChange={(e) => updateItem(index, 'price', e.target.value)}
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Supprimer
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Notes</label>
                <textarea
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows="3"
                  value={newInvoice.description}
                  onChange={(e) => setNewInvoice({ ...newInvoice, description: e.target.value })}
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Créer la facture
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Montant</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {invoices.map((invoice) => (
              <tr key={invoice.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(invoice.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{invoice.clientName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{invoice.amount.toFixed(2)} €</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={invoice.status}
                    onChange={(e) => updateInvoiceStatus(invoice.id, e.target.value)}
                    className="rounded-md border-gray-300 text-sm"
                  >
                    <option value="pending">En attente</option>
                    <option value="paid">Payée</option>
                    <option value="cancelled">Annulée</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-blue-600 hover:text-blue-900 mr-4">
                    Voir
                  </button>
                  <button className="text-blue-600 hover:text-blue-900">
                    Imprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Invoices;