import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DashboardStats = ({ invoices }) => {
  // Préparer les données pour le graphique
  const prepareChartData = () => {
    const monthlyData = {};
    
    invoices.forEach(invoice => {
      const date = new Date(invoice.date);
      const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
      
      if (!monthlyData[monthYear]) {
        monthlyData[monthYear] = {
          month: monthYear,
          amount: 0,
          count: 0
        };
      }
      
      monthlyData[monthYear].amount += invoice.amount;
      monthlyData[monthYear].count += 1;
    });
    
    return Object.values(monthlyData).sort((a, b) => {
      const [aMonth, aYear] = a.month.split('/');
      const [bMonth, bYear] = b.month.split('/');
      return new Date(aYear, aMonth - 1) - new Date(bYear, bMonth - 1);
    });
  };

  const chartData = prepareChartData();

  const calculateStats = () => {
    const total = invoices.reduce((sum, inv) => sum + inv.amount, 0);
    const count = invoices.length;
    const average = count > 0 ? total / count : 0;
    const pendingAmount = invoices
      .filter(inv => inv.status === 'pending')
      .reduce((sum, inv) => sum + inv.amount, 0);

    return {
      total,
      count,
      average,
      pendingAmount
    };
  };

  const stats = calculateStats();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Total des ventes</h3>
          <p className="text-3xl font-bold text-blue-600">{stats.total.toFixed(2)} €</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Montant en attente</h3>
          <p className="text-3xl font-bold text-yellow-600">{stats.pendingAmount.toFixed(2)} €</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nombre de factures</h3>
          <p className="text-3xl font-bold text-green-600">{stats.count}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Moyenne par facture</h3>
          <p className="text-3xl font-bold text-purple-600">{stats.average.toFixed(2)} €</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Evolution des ventes</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#2563eb"
                strokeWidth={2}
                name="Montant"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;