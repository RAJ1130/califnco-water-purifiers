import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import productsData from '../data/products.json';

export default function DealerPortalScreen({ onOpenCatalog }) {
  const { theme } = useTheme();
  const { user, applyDealer } = useAuth();
  const { addToCart } = useCart();

  const [companyName, setCompanyName] = useState(user.companyName || '');
  const [gstin, setGstin] = useState(user.gstin || '');
  const [phone, setPhone] = useState(user.phone || '');

  const isApproved = user.role === 'dealer' && user.dealerStatus === 'approved';

  const fastMovingWholesale = productsData.filter(p => p.wholesalePrice < 2500).slice(0, 4);

  const handleApply = (e) => {
    e.preventDefault();
    applyDealer(companyName, gstin, phone);
  };

  return (
    <div style={{ padding: '16px', maxWidth: '640px', margin: '0 auto', paddingBottom: '90px' }}>
      
      {/* Dealer Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, #7e22ce 0%, #4c1d95 100%)',
          borderRadius: '16px',
          padding: '24px 20px',
          color: '#ffffff',
          marginBottom: '20px',
          boxShadow: '0 10px 15px -3px rgba(126, 34, 206, 0.3)'
        }}
      >
        <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', backgroundColor: 'rgba(255,255,255,0.2)', padding: '3px 8px', borderRadius: '4px', fontWeight: '800' }}>
          Califnco B2B Trade Network
        </span>
        <h2 style={{ fontSize: '22px', fontWeight: '800', marginTop: '8px', lineHeight: 1.2 }}>
          Wholesale Dealer Hub
        </h2>
        <p style={{ fontSize: '13px', color: '#e9d5ff', marginTop: '6px', lineHeight: 1.4 }}>
          Access factory-direct wholesale pricing (30%–45% off retail), bulk carton dispatch, and tax invoicing with input credit.
        </p>

        {isApproved && (
          <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid rgba(255,255,255,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: '12px', fontWeight: '700' }}>{user.companyName}</p>
              <p style={{ fontSize: '11px', color: '#d8b4fe', fontFamily: 'monospace' }}>GSTIN: {user.gstin}</p>
            </div>
            <span style={{ fontSize: '11px', fontWeight: '800', backgroundColor: '#10b981', color: '#fff', padding: '3px 8px', borderRadius: '9999px' }}>
              ✓ Verified Dealer
            </span>
          </div>
        )}
      </div>

      {/* Dealer Benefits */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
        <div style={{ backgroundColor: theme.card, padding: '14px', borderRadius: '12px', border: `1px solid ${theme.border}` }}>
          <span style={{ fontSize: '20px' }}>💰</span>
          <h4 style={{ fontSize: '13px', fontWeight: '800', color: theme.text, marginTop: '6px' }}>High Trade Margins</h4>
          <p style={{ fontSize: '11px', color: theme.textMuted, marginTop: '2px' }}>Save 30% to 45% on pumps, membranes & filters</p>
        </div>
        <div style={{ backgroundColor: theme.card, padding: '14px', borderRadius: '12px', border: `1px solid ${theme.border}` }}>
          <span style={{ fontSize: '20px' }}>🚚</span>
          <h4 style={{ fontSize: '13px', fontWeight: '800', color: theme.text, marginTop: '6px' }}>Bulk Pallet Shipping</h4>
          <p style={{ fontSize: '11px', color: theme.textMuted, marginTop: '2px' }}>Free freight on orders exceeding ₹25,000</p>
        </div>
        <div style={{ backgroundColor: theme.card, padding: '14px', borderRadius: '12px', border: `1px solid ${theme.border}` }}>
          <span style={{ fontSize: '20px' }}>📄</span>
          <h4 style={{ fontSize: '13px', fontWeight: '800', color: theme.text, marginTop: '6px' }}>GST Tax Invoicing</h4>
          <p style={{ fontSize: '11px', color: theme.textMuted, marginTop: '2px' }}>Claim full Input Tax Credit (ITC) for business</p>
        </div>
        <div style={{ backgroundColor: theme.card, padding: '14px', borderRadius: '12px', border: `1px solid ${theme.border}` }}>
          <span style={{ fontSize: '20px' }}>⚡</span>
          <h4 style={{ fontSize: '13px', fontWeight: '800', color: theme.text, marginTop: '6px' }}>Express Technician AMC</h4>
          <p style={{ fontSize: '11px', color: theme.textMuted, marginTop: '2px' }}>Priority spare replacements under warranty</p>
        </div>
      </div>

      {/* Fast Moving Wholesale Spares Pack */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '800', color: theme.text }}>
            High-Volume Trade Spares (Quick Add)
          </h3>
          <button
            onClick={onOpenCatalog}
            style={{ fontSize: '12px', color: theme.dealerPurple, fontWeight: '700', border: 'none', background: 'none', cursor: 'pointer' }}
          >
            All 50+ Items →
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {fastMovingWholesale.map((item) => (
            <div
              key={item.id}
              style={{
                backgroundColor: theme.card,
                borderRadius: '12px',
                border: `1px solid ${theme.border}`,
                padding: '12px 14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }}
                />
                <div>
                  <h4 style={{ fontSize: '12px', fontWeight: '700', color: theme.text }}>{item.name}</h4>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: '2px' }}>
                    <span style={{ fontSize: '14px', fontWeight: '800', color: theme.dealerPurple }}>
                      ₹{item.wholesalePrice}
                    </span>
                    <span style={{ fontSize: '11px', color: theme.textLight, textDecoration: 'line-through' }}>
                      ₹{item.price}
                    </span>
                    <span style={{ fontSize: '10px', color: theme.textMuted }}>
                      (MOQ: {item.minWholesaleQty || 5} pcs)
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => addToCart(item, item.minWholesaleQty || 5)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: theme.dealerPurple,
                  color: '#fff',
                  fontSize: '11px',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                + Add MOQ Pack
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Button to open Wholesale Catalog */}
      <button
        onClick={onOpenCatalog}
        style={{
          width: '100%',
          padding: '14px',
          borderRadius: '12px',
          border: 'none',
          backgroundColor: theme.dealerPurple,
          color: '#ffffff',
          fontSize: '14px',
          fontWeight: '800',
          cursor: 'pointer'
        }}
      >
        Open 50+ Wholesale Products Catalog
      </button>
    </div>
  );
}
