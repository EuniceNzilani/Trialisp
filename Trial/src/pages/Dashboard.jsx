
function Dashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Dashboard
      </h1>

      <p className="text-gray-600 mb-6">
        Welcome to your ISP management system.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500">Total PPPoE Accounts</h2>
          <p className="text-3xl font-bold mt-3">0</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500">Hotspot Accounts</h2>
          <p className="text-3xl font-bold mt-3">0</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500">Active Customers</h2>
          <p className="text-3xl font-bold mt-3">0</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
