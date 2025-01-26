import React, { createContext, useState, useContext } from 'react';

const InvoiceContext = createContext();

export function InvoiceProvider({ children }) {
  const [invoices, setInvoices] = useState([]);

  const addInvoice = (invoice) => {
    setInvoices([...invoices, { ...invoice, id: Date.now(), status: 'pending' }]);
  };

  const updateInvoiceStatus = (invoiceId, status) => {
    setInvoices(invoices.map(invoice =>
      invoice.id === invoiceId ? { ...invoice, status } : invoice
    ));
  };

  return (
    <InvoiceContext.Provider value={{ invoices, addInvoice, updateInvoiceStatus }}>
      {children}
    </InvoiceContext.Provider>
  );
}

export function useInvoices() {
  return useContext(InvoiceContext);
}