import React, { createContext, useState, useContext } from 'react';

const ClientContext = createContext();

export function ClientProvider({ children }) {
  const [clients, setClients] = useState([]);

  const addClient = (client) => {
    setClients([...clients, { ...client, id: Date.now() }]);
  };

  const deleteClient = (clientId) => {
    setClients(clients.filter(client => client.id !== clientId));
  };

  return (
    <ClientContext.Provider value={{ clients, addClient, deleteClient }}>
      {children}
    </ClientContext.Provider>
  );
}

export function useClients() {
  return useContext(ClientContext);
}