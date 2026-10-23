import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';

export default function ProductDetailScreen({ product, onBack, onOpenLightbox }) {
  const { theme } = useTheme();
  const { addToCart, isDealer } = useCart();

  const minQty = isDealer ? (product.minWholesaleQty || 5) : 1;
  const [qty, setQty] = useState(minQty);

  const price = isDealer ? product.wholesalePrice : product.price;
  const discountPercent = Math.round(((product.price - product.wholesalePrice) / product.price) * 100);

  return (
    <div style={{ padding: '16px', maxWidth: '640px', margin: '0 auto', paddingBottom: '90px' }}>
      
      {/* Back Button */}
      <button
        onClick={onBack}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 12px',
          borderRadius: '8px',
          backgroundColor: theme.surfaceSubtle,
          border: 'none',
          color: theme.text,
          fontSize: '13px',
          fontWeight: '700',
          cursor: 'pointer',
          marginBottom: '14px'
        }}
      >
        ← Back to Catalog
      </button>

      {/* Main Image with Zoom Trigger */}
      <div style={{ position: 'relative', width: '100%', height: '280px', borderRadius: '16px', overflow: 'hidden', backgroundColor: theme.surfaceSubtle, marginBottom: '16px' }}>
        <img
          src={product.image}
          alt={product.name}
          onClick={() => onOpenLightbox(product)}
          style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'zoom-in' }}
        />
        <button
          onClick={() => onOpenLightbox(product)}
          style={{
            position: 'absolute',
            bottom: '12px',
            right: '12px',
            backgroundColor: 'rgba(15, 23, 42, 0.8)',
            color: '#fff',
            border: 'none',
            borderRadius: '20px',
            padding: '6px 14px',
            fontSize: '12px',
            fontWeight: '700',
            cursor: 'pointer',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          🔍 Tap to Zoom Photo
        </button>
      </div>

      {/* Product Title & Category */}
      <div style={{ marginBottom: '14px' }}>
        <span style={{
          fontSize: '11px',
          fontWeight: '800',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          color: theme.primary,
          backgroundColor: theme.primaryLight,
          padding: '4px 10px',
          borderRadius: '6px'
        }}>
          {product.category}
        </span>
        <h2 style={{ fontSize: '20px', fontWeight: '800', color: theme.text, marginTop: '8px', lineHeight: 1.2 }}>
          {product.name}
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
          <span style={{ color: '#f59e0b', fontSize: '14px' }}>★ {product.rating}</span>
          <span style={{ fontSize: '12px', color: theme.textMuted }}>({product.reviewsCount} customer reviews)</span>
          <span style={{ fontSize: '12px', color: '#10b981', fontWeight: '700' }}>• In Stock ({product.stock} units)</span>
        </div>
      </div>

      {/* Pricing Comparison Card */}
      <div
        style={{
          padding: '16px',
          borderRadius: '12px',
          backgroundColor: isDealer ? theme.dealerPurpleLight : theme.surfaceSubtle,
          border: `1.5px solid ${isDealer ? theme.dealerPurple : theme.border}`,
          marginBottom: '20px'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: '700', color: isDealer ? theme.dealerPurple : theme.textMuted, textTransform: 'uppercase' }}>
              {isDealer ? 'Wholesale Dealer Price' : 'Customer Price'}
            </span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '2px' }}>
              <span style={{ fontSize: '24px', fontWeight: '800', color: isDealer ? theme.dealerPurple : theme.primary }}>
                ₹{price.toLocaleString('en-IN')}
              </span>
              {isDealer && (
                <span style={{ fontSize: '14px', color: theme.textLight, textDecoration: 'line-through' }}>
                  MRP ₹{product.price.toLocaleString('en-IN')}
                </span>
              )}
            </div>
          </div>

          {isDealer ? (
            <div style={{ textAlign: 'right' }}>
              <span style={{
                fontSize: '11px',
                fontWeight: '800',
                padding: '4px 8px',
                borderRadius: '6px',
                backgroundColor: theme.successLight,
                color: theme.success
              }}>
                {discountPercent}% WHOLESALE MARGIN
              </span>
              <p style={{ fontSize: '11px', color: theme.textMuted, marginTop: '4px' }}>
                Wholesale MOQ: {product.minWholesaleQty || 1} units
              </p>
            </div>
          ) : (
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '11px', color: '#10b981', fontWeight: '700' }}>
                Free Doorstep Installation
              </span>
              <p style={{ fontSize: '11px', color: theme.textMuted, marginTop: '2px' }}>
                All Taxes Included
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      <div style={{ marginBottom: '20px' }}>
        <h4 style={{ fontSize: '14px', fontWeight: '800', color: theme.text, marginBottom: '6px' }}>
          Product Overview
        </h4>
        <p style={{ fontSize: '13px', color: theme.textMuted, lineHeight: 1.5 }}>
          {product.description}
        </p>
      </div>

      {/* Key Specifications Grid */}
      {product.specs && (
        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ fontSize: '14px', fontWeight: '800', color: theme.text, marginBottom: '10px' }}>
            Technical Specifications
          </h4>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '10px',
            backgroundColor: theme.surface,
            padding: '14px',
            borderRadius: '12px',
            border: `1px solid ${theme.border}`
          }}>
            {Object.entries(product.specs).map(([key, val]) => (
              <div key={key}>
                <p style={{ fontSize: '11px', textTransform: 'capitalize', color: theme.textMuted, fontWeight: '600' }}>
                  {key.replace(/([A-Z])/g, ' $1')}
                </p>
                <p style={{ fontSize: '12px', fontWeight: '700', color: theme.text, marginTop: '2px' }}>
                  {val}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quantity & Add to Cart Bar */}
      <div style={{
        backgroundColor: theme.surface,
        borderTop: `1px solid ${theme.border}`,
        padding: '16px',
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 30,
        boxShadow: '0 -4px 10px rgba(0,0,0,0.06)'
      }}>
        <div style={{ width: '100%', maxWidth: '640px', display: 'flex', gap: '12px', alignItems: 'center' }}>
          {/* Quantity Selector */}
          <div style={{ display: 'flex', alignItems: 'center', border: `1.5px solid ${theme.border}`, borderRadius: '10px', padding: '4px', backgroundColor: theme.surfaceSubtle }}>
            <button
              onClick={() => setQty(prev => Math.max(minQty, prev - 1))}
              style={{ width: '32px', height: '32px', border: 'none', background: 'none', fontSize: '16px', fontWeight: '800', cursor: 'pointer', color: theme.text }}
            >
              -
            </button>
            <span style={{ minWidth: '36px', textAlign: 'center', fontSize: '14px', fontWeight: '800', color: theme.text }}>
              {qty}
            </span>
            <button
              onClick={() => setQty(prev => prev + 1)}
              style={{ width: '32px', height: '32px', border: 'none', background: 'none', fontSize: '16px', fontWeight: '800', cursor: 'pointer', color: theme.text }}
            >
              +
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => {
              addToCart(product, qty);
              onBack();
            }}
            style={{
              flex: 1,
              padding: '14px',
              borderRadius: '10px',
              border: 'none',
              backgroundColor: isDealer ? theme.dealerPurple : theme.primary,
              color: '#ffffff',
              fontSize: '14px',
              fontWeight: '800',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <span>Add {qty} Unit(s) to Cart • ₹{(price * qty).toLocaleString('en-IN')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
