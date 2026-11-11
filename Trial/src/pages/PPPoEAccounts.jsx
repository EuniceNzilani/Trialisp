
import React, { useState } from 'react';

function PPPoEAccounts() {
  const [showForm, setShowForm] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [profile, setProfile] = useState('default');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [accounts, setAccounts] = useState([]);

  // Open and close the account creation form
  const handleAddClick = () => {
    setShowForm((previous) => !previous);
  };

  // Create PPPoE account through the backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage('');
    setMessageType('');

    try {
      const response = await fetch(
        'http://localhost:5000/api/pppoe',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username.trim(),
            password,
            profile: profile.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || 'Failed to create PPPoE account'
        );
      }

      // Add the successfully created account to the list
      setAccounts((previous) => [
        ...previous,
        data.account,
      ]);

      setMessage('PPPoE account created successfully!');
      setMessageType('success');

      // Reset the form
      setUsername('');
      setPassword('');
      setProfile('default');
      setShowForm(false);

    } catch (error) {
      console.error('PPPoE creation error:', error);

      setMessage(
        error.message || 'Unable to create PPPoE account'
      );
      setMessageType('error');

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">

      {/* PAGE HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            PPPoE Accounts
          </h1>

          <p className="text-gray-500 mt-1">
            Manage your MikroTik PPPoE accounts
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddClick}
          className="relative z-10 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg cursor-pointer transition-colors"
        >
          {showForm ? 'Close Form' : '+ Add PPPoE Account'}
        </button>

      </div>

      {/* SUCCESS / ERROR MESSAGE */}
      {message && (
        <div
          role="status"
          className={`rounded-lg border p-4 ${
            messageType === 'success'
              ? 'bg-green-50 border-green-200 text-green-800'
              : 'bg-red-50 border-red-200 text-red-800'
          }`}
        >
          {message}
        </div>
      )}

      {/* CREATE ACCOUNT FORM */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-lg p-6 space-y-5"
        >

          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">
              Create PPPoE Account
            </h2>

            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="text-gray-500 hover:text-gray-800 cursor-pointer text-xl"
              aria-label="Close form"
            >
              ×
            </button>
          </div>

          {/* USERNAME */}
          <div>
            <label
              htmlFor="pppoe-username"
              className="block mb-2 font-medium text-gray-700"
            >
              Username
            </label>

            <input
              id="pppoe-username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="customer001"
              required
              maxLength={64}
              autoComplete="off"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label
              htmlFor="pppoe-password"
              className="block mb-2 font-medium text-gray-700"
            >
              Password
            </label>

            <input
              id="pppoe-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter PPPoE password"
              required
              minLength={8}
              maxLength={128}
              autoComplete="new-password"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* PROFILE */}
          <div>
            <label
              htmlFor="pppoe-profile"
              className="block mb-2 font-medium text-gray-700"
            >
              PPPoE Profile
            </label>

            <input
              id="pppoe-profile"
              type="text"
              value={profile}
              onChange={(e) => setProfile(e.target.value)}
              placeholder="default"
              required
              maxLength={64}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <p className="text-sm text-gray-500 mt-1">
              Enter an existing PPP profile configured on MikroTik.
            </p>
          </div>

          {/* FORM ACTIONS */}
          <div className="flex flex-wrap gap-3 pt-2">

            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating...' : 'Create Account'}
            </button>

            <button
              type="button"
              onClick={() => setShowForm(false)}
              disabled={loading}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg cursor-pointer disabled:opacity-50"
            >
              Cancel
            </button>

          </div>

        </form>
      )}

      {/* RECENTLY CREATED ACCOUNTS */}
      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Recently Created Accounts
        </h2>

        {accounts.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">
              No accounts created in this session.
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Create a PPPoE account to see it here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">

              <thead>
                <tr className="border-b text-gray-600">
                  <th className="py-3 px-2">Username</th>
                  <th className="py-3 px-2">Profile</th>
                  <th className="py-3 px-2">Status</th>
                </tr>
              </thead>

              <tbody>
                {accounts.map((account) => (
                  <tr
                    key={account.username}
                    className="border-b last:border-0"
                  >
                    <td className="py-4 px-2 font-medium text-gray-800">
                      {account.username}
                    </td>

                    <td className="py-4 px-2 text-gray-600">
                      {account.profile}
                    </td>

                    <td className="py-4 px-2">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                        Created
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}

      </div>

    </div>
  );
}

export default PPPoEAccounts;
