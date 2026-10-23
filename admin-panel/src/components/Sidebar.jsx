import React from 'react';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Users, 
  Wrench, 
  Layers, 
  ShieldCheck, 
  ExternalLink,
  Droplets
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

export default function Sidebar({ activeTab, setActiveTab }) {
  const { stats } = useAdmin();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'orders', label: 'Orders', icon: ShoppingBag, badge: stats.pendingOrders ? `${stats.pendingOrders} new` : null, badgeColor: 'bg-amber-100 text-amber-800' },
    { id: 'dealers', label: 'Dealers Desk', icon: Users, badge: stats.pendingDealers ? `${stats.pendingDealers} pending` : null, badgeColor: 'bg-red-100 text-red-700' },
    { id: 'services', label: 'Service Desk', icon: Wrench, badge: stats.openServices ? `${stats.openServices}` : null, badgeColor: 'bg-blue-100 text-blue-700' },
    { id: 'products', label: 'Product Catalog', icon: Layers, count: stats.totalProducts }
  ];

  return (
    <aside className="sidebar">
      {/* Brand Header */}
      <div style={{ padding: '24px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 4px 6px -1px rgba(2, 132, 199, 0.3)' }}>
          <Droplets size={22} />
        </div>
        <div>
          <h1 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-main)', letterSpacing: '-0.02em', lineHeight: 1.2 }}>Califnco</h1>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Admin & Operations</p>
        </div>
      </div>

      {/* Nav Menu */}
      <nav style={{ padding: '16px 12px', flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                borderRadius: '10px',
                width: '100%',
                fontWeight: isActive ? '700' : '500',
                fontSize: '14px',
                color: isActive ? '#0284c7' : '#475569',
                backgroundColor: isActive ? '#e0f2fe' : 'transparent',
                transition: 'all 0.15s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Icon size={19} color={isActive ? '#0284c7' : '#64748b'} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span style={{ 
                  fontSize: '11px', 
                  fontWeight: '700', 
                  padding: '2px 8px', 
                  borderRadius: '9999px',
                  backgroundColor: item.badge.includes('new') ? '#fef3c7' : item.badge.includes('pending') ? '#fee2e2' : '#e0e7ff',
                  color: item.badge.includes('new') ? '#b45309' : item.badge.includes('pending') ? '#b91c1c' : '#3730a3'
                }}>
                  {item.badge}
                </span>
              )}
              {item.count && (
                <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: '600' }}>{item.count}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div style={{ padding: '16px 20px', borderTop: '1px solid var(--border)', backgroundColor: '#f8fafc' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <ShieldCheck size={16} color="#10b981" />
          <span style={{ fontSize: '12px', fontWeight: '600', color: '#065f46' }}>Firebase Spark Plan</span>
        </div>
        <p style={{ fontSize: '11px', color: '#64748b' }}>
          Razorpay Test Mode Active<br/>
          Vercel Production Target
        </p>
      </div>
    </aside>
  );
}
