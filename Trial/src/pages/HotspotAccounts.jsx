
function HotspotAccounts() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Hotspot Accounts
      </h1>

      <div className="bg-white p-6 rounded-xl shadow">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            Hotspot Customers
          </h2>

          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
            + Add Hotspot Account
          </button>
        </div>

        <p className="text-gray-500 mt-6">
          No hotspot accounts available.
        </p>
      </div>
    </div>
  );
}

export default HotspotAccounts;
