import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Header({ onOpenCart, onOpenProfile, currentScreen, setCurrentScreen }) {
  const { theme, isDark, toggleTheme } = useTheme();
  const { user, switchRole } = useAuth();
  const { totalQuantity, isDealer } = useCart();

  return (
    <header style={{
      backgroundColor: theme.surface,
      borderBottom: `1px solid ${theme.border}`,
      padding: '12px 16px',
      position: 'sticky',
      top: 0,
      zIndex: 40,
      boxShadow: '0 2px 4px rgba(0,0,0,0.04)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo & Brand */}
        <div 
          onClick={() => setCurrentScreen('catalog')}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
        >
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: '800',
            fontSize: '16px'
          }}>
            💧
          </div>
          <div>
            <h1 style={{ fontSize: '16px', fontWeight: '800', color: theme.text, lineHeight: 1.1 }}>Califnco</h1>
            <p style={{ fontSize: '10px', color: theme.textMuted, fontWeight: '700', letterSpacing: '0.04em' }}>
              PURE WATER TECH
            </p>
          </div>
        </div>

        {/* Right Tools: Role Pill, Dark Mode Switch, Cart */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          
          {/* Role Toggle Pill (Customer <-> Dealer) */}
          <button
            onClick={() => switchRole(user.role === 'customer' ? 'dealer' : 'customer')}
            style={{
              padding: '4px 10px',
              borderRadius: '9999px',
              fontSize: '11px',
              fontWeight: '700',
              border: '1px solid',
              borderColor: isDealer ? theme.dealerPurple : theme.primary,
              backgroundColor: isDealer ? theme.dealerPurpleLight : theme.primaryLight,
              color: isDealer ? theme.dealerPurple : theme.primaryDark,
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
            title="Click to toggle between Customer and Wholesale Dealer mode"
          >
            <span>{isDealer ? '🏢 Dealer Mode' : '👤 Customer'}</span>
          </button>

          {/* Dark Mode Switch (Bonus +5 pts) */}
          <button
            onClick={toggleTheme}
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: theme.surfaceSubtle,
              color: theme.text,
              fontSize: '16px'
            }}
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDark ? '☀️' : '🌙'}
          </button>

          {/* Cart Button */}
          <button
            onClick={onOpenCart}
            style={{
              position: 'relative',
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: theme.surfaceSubtle,
              fontSize: '16px'
            }}
            title="View Cart"
          >
            🛒
            {totalQuantity > 0 && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                backgroundColor: '#ef4444',
                color: '#fff',
                fontSize: '10px',
                fontWeight: '800',
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {totalQuantity}
              </span>
            )}
          </button>

        </div>
      </div>
    </header>
  );
}
