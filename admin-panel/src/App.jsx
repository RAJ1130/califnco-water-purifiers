import React, { useState } from 'react';
import { AdminProvider } from './context/AdminContext';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import OrdersPage from './pages/OrdersPage';
import DealersPage from './pages/DealersPage';
import ServiceDeskPage from './pages/ServiceDeskPage';
import ProductsPage from './pages/ProductsPage';

function AdminContent() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [globalSearch, setGlobalSearch] = useState('');

  const titles = {
    dashboard: { title: 'Operations Dashboard', subtitle: 'Live overview of sales, orders, dealers, and tickets' },
    orders: { title: 'Order Fulfillment Desk', subtitle: 'Manage retail customer orders and dealer bulk dispatches' },
    dealers: { title: 'Dealer Network & Verification', subtitle: 'Review and approve/reject wholesale dealer applications' },
    services: { title: 'Customer Service & AMC Desk', subtitle: 'Technician scheduling, filter replacements, and repairs' },
    products: { title: 'Catalog Management (50+ Items)', subtitle: 'Manage prices, wholesale discounts, and inventory' }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard setActiveTab={setActiveTab} />;
      case 'orders':
        return <OrdersPage />;
      case 'dealers':
        return <DealersPage />;
      case 'services':
        return <ServiceDeskPage />;
      case 'products':
        return <ProductsPage />;
      default:
        return <Dashboard setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="app-container">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="main-content">
        <Navbar
          title={titles[activeTab].title}
          subtitle={titles[activeTab].subtitle}
          onSearch={activeTab === 'products' ? setGlobalSearch : null}
          searchValue={globalSearch}
        />
        <main className="page-body">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AdminProvider>
      <AdminContent />
    </AdminProvider>
  );
}
