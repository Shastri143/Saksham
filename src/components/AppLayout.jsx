import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import Navbar from './Navbar.jsx';
import './AppLayout.css';

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState('');

  return (
    <div className="app-layout">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="app-main">
        <Navbar
          onMenuClick={() => setSidebarOpen(true)}
          search={search}
          onSearch={setSearch}
        />
        <main className="app-content">
          <Outlet context={{ search }} />
        </main>
      </div>
    </div>
  );
}
