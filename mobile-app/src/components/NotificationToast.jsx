import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function NotificationToast() {
  const { notification } = useAuth();
  const { theme } = useTheme();

  if (!notification) return null;

  const bgMap = {
    success: '#10b981',
    info: '#0284c7',
    warning: '#f59e0b',
    danger: '#ef4444'
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 200,
        width: '90%',
        maxWidth: '420px',
        backgroundColor: theme.surface,
        borderRadius: '12px',
        border: `1px solid ${theme.border}`,
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2)',
        overflow: 'hidden',
        display: 'flex',
        animation: 'slideDown 0.3s ease'
      }}
    >
      <div style={{ width: '6px', backgroundColor: bgMap[notification.type] || '#0284c7' }} />
      <div style={{ padding: '12px 16px', flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h5 style={{ fontSize: '13px', fontWeight: '800', color: theme.text }}>
            {notification.title}
          </h5>
          <span style={{ fontSize: '10px', color: theme.textLight }}>FCM / Push Alert</span>
        </div>
        <p style={{ fontSize: '12px', color: theme.textMuted, marginTop: '2px', lineHeight: 1.3 }}>
          {notification.message}
        </p>
      </div>
    </div>
  );
}
