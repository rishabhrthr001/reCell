
import React from 'react';

const formatCurrency = (amount: number | string) => {
  const num = typeof amount === 'string' ? parseFloat(amount.replace(/[^0-9.]/g, '')) : amount;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(num);
};

const AdminDashboard: React.FC = () => {
  const stats = [
    { label: 'Monthly Revenue', value: 452800, change: '+12%', color: 'text-green-600' },
    { label: 'Devices Sourced', value: '124', change: '+8%', color: 'text-blue-600' },
    { label: 'Scheduled Pickups', value: '18', change: '-2%', color: 'text-orange-600' },
    { label: 'Avg Payout', value: 41200, change: '+4%', color: 'text-indigo-600' },
  ];

  const requests = [
    { id: 'ORD-7721', device: 'iPhone 15 Pro Max', customer: 'Alice Smith', status: 'Pending', price: 94000, date: '2024-05-20' },
    { id: 'ORD-7722', device: 'Galaxy S24 Ultra', customer: 'Bob Jones', status: 'Completed', price: 82000, date: '2024-05-19' },
    { id: 'ORD-7723', device: 'Pixel 8 Pro', customer: 'Charlie Brown', status: 'Scheduled', price: 65000, date: '2024-05-21' },
    { id: 'ORD-7724', device: 'Nothing Phone (2)', customer: 'David Wilson', status: 'In Review', price: 38000, date: '2024-05-18' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-10 space-y-1">
        <h1 className="text-4xl font-black text-gray-900 tracking-tight">System <span className="text-indigo-600">Control</span></h1>
        <p className="text-gray-500 font-bold uppercase text-xs tracking-widest">Global Operations Command</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((s, idx) => (
          <div key={idx} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition">
            <p className="text-xs font-black text-gray-400 mb-2 uppercase tracking-widest">{s.label}</p>
            <div className="flex items-end justify-between">
              <h3 className="text-3xl font-black text-gray-900">
                {typeof s.value === 'number' ? formatCurrency(s.value) : s.value}
              </h3>
              <span className={`text-xs font-black px-2 py-1 rounded-md bg-gray-50 ${s.color}`}>{s.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[2rem] border-2 border-gray-50 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
          <h2 className="text-xl font-black text-gray-900 tracking-tight">Recent Sell Requests</h2>
          <button className="text-xs font-black text-indigo-600 uppercase tracking-widest border-b-2 border-indigo-600">Export Logs</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                <th className="px-8 py-6">Request ID</th>
                <th className="px-8 py-6">Device</th>
                <th className="px-8 py-6">Vendor/User</th>
                <th className="px-8 py-6">State</th>
                <th className="px-8 py-6">Quote</th>
                <th className="px-8 py-6">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 bg-white">
              {requests.map((req) => (
                <tr key={req.id} className="hover:bg-indigo-50/30 transition">
                  <td className="px-8 py-6 font-mono text-xs font-bold text-gray-400">{req.id}</td>
                  <td className="px-8 py-6">
                    <p className="font-black text-gray-900 text-sm">{req.device}</p>
                  </td>
                  <td className="px-8 py-6 text-sm font-bold text-gray-600">{req.customer}</td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                      req.status === 'Completed' ? 'bg-green-100 text-green-700' :
                      req.status === 'Pending' ? 'bg-orange-100 text-orange-700' :
                      req.status === 'Scheduled' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 font-black text-gray-900 text-sm">{formatCurrency(req.price)}</td>
                  <td className="px-8 py-6 text-xs font-bold text-gray-400">{req.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
