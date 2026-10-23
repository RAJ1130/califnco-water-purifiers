import React from 'react';
import { Search, Bell, Sparkles, CheckCircle2 } from 'lucide-react';

export default function Navbar({ title, subtitle, onSearch, searchValue }) {
  return (
    <header className="header">
      <div>
        <h2 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-main)', letterSpacing: '-0.01em' }}>
          {title}
        </h2>
        {subtitle && (
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>
            {subtitle}
          </p>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {onSearch && (
          <div className="search-input" style={{ width: '280px' }}>
            <Search size={16} color="#64748b" />
            <input
              type="text"
              placeholder="Search by name, ID, phone..."
              value={searchValue || ''}
              onChange={(e) => onSearch(e.target.value)}
              style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '13px' }}
            />
          </div>
        )}

        {/* Live Vercel Status Tag */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 12px',
          backgroundColor: '#ecfdf5',
          borderRadius: '9999px',
          border: '1px solid #a7f3d0'
        }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981', display: 'inline-block' }}></span>
          <span style={{ fontSize: '12px', fontWeight: '700', color: '#047857' }}>Vercel Ready</span>
        </div>

        {/* User Pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingLeft: '8px', borderLeft: '1px solid var(--border)' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: '#0284c7',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '700',
            fontSize: '14px'
          }}>
            CA
          </div>
          <div>
            <p style={{ fontSize: '13px', fontWeight: '700', lineHeight: 1.2 }}>Califnco Admin</p>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Operations Lead</p>
          </div>
        </div>
      </div>
    </header>
  );
}
