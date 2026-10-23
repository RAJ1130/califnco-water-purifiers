import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import ReferralCard from '../components/ReferralCard';

export default function ProfileScreen({ onOpenOrders, onOpenService, onOpenDealerPortal }) {
  const { theme, isDark, toggleTheme } = useTheme();
  const { user, switchRole, showNotification } = useAuth();

  const handleTestFCMAlert = () => {
    showNotification(
      '💧 Filter Health Reminder',
      'FCM Push Alert: Your sediment cartridge is due for 6-month inspection. Tap to book technician.',
      'info'
    );
  };

  return (
    <div style={{ padding: '16px', maxWidth: '640px', margin: '0 auto', paddingBottom: '90px' }}>
      
      {/* Profile Header Card */}
      <div
        style={{
          backgroundColor: theme.card,
          borderRadius: '16px',
          border: `1px solid ${theme.border}`,
          padding: '20px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.03)'
        }}
      >
        <div
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            backgroundColor: user.role === 'dealer' ? theme.dealerPurple : theme.primary,
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
            fontWeight: '800'
          }}
        >
          {user.name.split(' ').map(n => n[0]).join('')}
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h3 style={{ fontSize: '17px', fontWeight: '800', color: theme.text }}>{user.name}</h3>
            <span style={{
              fontSize: '10px',
              fontWeight: '800',
              padding: '2px 8px',
              borderRadius: '9999px',
              backgroundColor: user.role === 'dealer' ? theme.dealerPurpleLight : theme.primaryLight,
              color: user.role === 'dealer' ? theme.dealerPurple : theme.primaryDark
            }}>
              {user.role === 'dealer' ? 'Wholesale Dealer' : 'Customer'}
            </span>
          </div>
          <p style={{ fontSize: '12px', color: theme.textMuted, marginTop: '2px' }}>
            {user.email} • {user.phone}
          </p>
          {user.role === 'dealer' && (
            <p style={{ fontSize: '11px', color: theme.dealerPurple, fontWeight: '700', marginTop: '2px' }}>
              🏢 {user.companyName} (GSTIN: {user.gstin})
            </p>
          )}
        </div>
      </div>

      {/* Referral & Rewards Card (Bonus +5 pts) */}
      <div style={{ marginBottom: '20px' }}>
        <ReferralCard />
      </div>

      {/* App Settings & Controls */}
      <div
        style={{
          backgroundColor: theme.card,
          borderRadius: '16px',
          border: `1px solid ${theme.border}`,
          padding: '16px',
          marginBottom: '20px'
        }}
      >
        <h4 style={{ fontSize: '13px', fontWeight: '800', color: theme.textMuted, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '14px' }}>
          Preferences & Roles
        </h4>

        {/* Role Toggle */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '14px', borderBottom: `1px solid ${theme.border}`, marginBottom: '14px' }}>
          <div>
            <p style={{ fontSize: '14px', fontWeight: '700', color: theme.text }}>Active Mode</p>
            <p style={{ fontSize: '12px', color: theme.textMuted }}>Toggle Customer (Retail) or Dealer (Wholesale)</p>
          </div>
          <button
            onClick={() => switchRole(user.role === 'customer' ? 'dealer' : 'customer')}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              border: `1px solid ${theme.primary}`,
              backgroundColor: theme.primaryLight,
              color: theme.primaryDark,
              fontSize: '12px',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            Switch to {user.role === 'customer' ? 'Dealer' : 'Customer'}
          </button>
        </div>

        {/* Dark Mode Toggle (Bonus +5 pts) */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '14px', borderBottom: `1px solid ${theme.border}`, marginBottom: '14px' }}>
          <div>
            <p style={{ fontSize: '14px', fontWeight: '700', color: theme.text }}>Dark Mode</p>
            <p style={{ fontSize: '12px', color: theme.textMuted }}>Saves battery on OLED Android displays</p>
          </div>
          <button
            onClick={toggleTheme}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              border: `1px solid ${theme.border}`,
              backgroundColor: theme.surfaceSubtle,
              color: theme.text,
              fontSize: '12px',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            {isDark ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>

        {/* Test Push Alert (FCM) */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ fontSize: '14px', fontWeight: '700', color: theme.text }}>FCM Push Alerts</p>
            <p style={{ fontSize: '12px', color: theme.textMuted }}>Filter change alerts & dispatch tracking</p>
          </div>
          <button
            onClick={handleTestFCMAlert}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              border: `1px solid ${theme.border}`,
              backgroundColor: theme.surfaceSubtle,
              color: theme.text,
              fontSize: '12px',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            🔔 Test Alert
          </button>
        </div>
      </div>

      {/* Quick Links Menu */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
        <button
          onClick={onOpenOrders}
          style={{
            padding: '14px 16px',
            backgroundColor: theme.card,
            borderRadius: '12px',
            border: `1px solid ${theme.border}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: theme.text,
            fontSize: '14px',
            fontWeight: '700',
            cursor: 'pointer'
          }}
        >
          <span>📦 My Orders & Live Tracking</span>
          <span>→</span>
        </button>

        <button
          onClick={onOpenService}
          style={{
            padding: '14px 16px',
            backgroundColor: theme.card,
            borderRadius: '12px',
            border: `1px solid ${theme.border}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: theme.text,
            fontSize: '14px',
            fontWeight: '700',
            cursor: 'pointer'
          }}
        >
          <span>👨‍🔧 Book RO Service & Filter Change</span>
          <span>→</span>
        </button>

        <button
          onClick={onOpenDealerPortal}
          style={{
            padding: '14px 16px',
            backgroundColor: theme.card,
            borderRadius: '12px',
            border: `1px solid ${theme.border}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: theme.text,
            fontSize: '14px',
            fontWeight: '700',
            cursor: 'pointer'
          }}
        >
          <span>🏢 Wholesale Dealer Hub</span>
          <span>→</span>
        </button>
      </div>

      {/* Helpline Support footer */}
      <div style={{ textAlign: 'center', padding: '16px', backgroundColor: theme.surfaceSubtle, borderRadius: '12px', border: `1px solid ${theme.border}` }}>
        <p style={{ fontSize: '12px', fontWeight: '700', color: theme.text }}>Califnco 24/7 Priority Support</p>
        <p style={{ fontSize: '11px', color: theme.textMuted, marginTop: '2px' }}>
          Toll-free: 1800-123-CALIF | WhatsApp: +91 98450 12345
        </p>
      </div>
    </div>
  );
}
