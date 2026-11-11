
import React, { useState } from 'react';
import { Bell, Settings, UserCircle } from 'lucide-react';

function TopNav({ activePage }) {
  const [showNotifications, setShowNotifications] = useState(false);

  const pageTitles = {
    dashboard: 'Dashboard',
    pppoe: 'PPPoE Accounts',
    hotspot: 'Hotspot Accounts',
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between">

      {/* Current page title */}
      <h2 className="text-lg font-semibold text-gray-800">
        {pageTitles[activePage] || 'Dashboard'}
      </h2>

      {/* Right side icons */}
      <div className="flex items-center gap-5">

        {/* Notifications */}
        <div className="relative">
          <button
            type="button"
            aria-label="Notifications"
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <Bell size={21} />
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-12 w-72 bg-white shadow-xl border border-gray-200 rounded-xl p-4 z-50">
              <h3 className="font-semibold text-gray-800 mb-2">
                Notifications
              </h3>
              <p className="text-sm text-gray-500">
                No new notifications.
              </p>
            </div>
          )}
        </div>

        {/* Settings */}
        <button
          type="button"
          aria-label="Settings"
          onClick={() => alert('Settings page coming soon')}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
        >
          <Settings size={21} />
        </button>

        {/* User profile */}
        <button
          type="button"
          aria-label="User profile"
          onClick={() => alert('Profile page coming soon')}
          className="text-blue-600"
        >
          <UserCircle size={30} />
        </button>

      </div>
    </header>
  );
}

export default TopNav;
