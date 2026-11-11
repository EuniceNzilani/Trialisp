
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

import Sidebar from './components/sidebar.jsx';
import TopNav from './components/topnav.jsx';

import Dashboard from './pages/Dashboard.jsx';
import PPPoEAccounts from './pages/PPPoEAccounts.jsx';
import HotspotAccounts from './pages/HotspotAccounts.jsx';

import './index.css';

function Home() {
  const [activePage, setActivePage] = useState('dashboard');

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />;

      case 'pppoe':
        return <PPPoEAccounts />;

      case 'hotspot':
        return <HotspotAccounts />;

      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Left Sidebar */}
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      {/* Right content section */}
      <div className="flex-1 min-w-0 flex flex-col">

        {/* Top Navigation */}
        <TopNav activePage={activePage} />

        {/* Page Content */}
        <main className="flex-1 p-8">
          {renderPage()}
        </main>

      </div>
    </div>
  );
}

export default Home;

ReactDOM.createRoot(
  document.getElementById('root')
).render(<Home />);
