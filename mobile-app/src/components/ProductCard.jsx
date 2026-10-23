import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product, onSelectProduct, onOpenLightbox }) {
  const { theme } = useTheme();
  const { addToCart, isDealer } = useCart();

  const price = isDealer ? product.wholesalePrice : product.price;
  const discountPercent = Math.round(((product.price - product.wholesalePrice) / product.price) * 100);

  return (
    <div
      style={{
        backgroundColor: theme.card,
        borderRadius: '14px',
        border: `1px solid ${theme.border}`,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 2px 4px rgba(0,0,0,0.03)',
        position: 'relative',
        transition: 'transform 0.15s ease'
      }}
    >
      {/* Product Image */}
      <div 
        style={{ position: 'relative', width: '100%', height: '160px', backgroundColor: '#f1f5f9' }}
      >
        <img
          src={product.image}
          alt={product.name}
          onClick={() => onSelectProduct(product)}
          style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer' }}
        />

        {/* Category Tag */}
        <span style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          backgroundColor: 'rgba(15, 23, 42, 0.75)',
          color: '#ffffff',
          fontSize: '10px',
          fontWeight: '700',
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
          padding: '3px 8px',
          borderRadius: '6px',
          backdropFilter: 'blur(4px)'
        }}>
          {product.category}
        </span>

        {/* Zoom Lightbox Pill Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenLightbox(product);
          }}
          style={{
            position: 'absolute',
            bottom: '8px',
            right: '8px',
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            border: 'none',
            borderRadius: '50%',
            width: '28px',
            height: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '13px',
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(0,0,0,0.15)'
          }}
          title="Zoom Product Photo"
        >
          🔍
        </button>
      </div>

      {/* Content */}
      <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        
        {/* Rating */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
          <span style={{ color: '#f59e0b', fontSize: '12px' }}>★</span>
          <span style={{ fontSize: '11px', fontWeight: '700', color: theme.text }}>{product.rating}</span>
          <span style={{ fontSize: '10px', color: theme.textLight }}>({product.reviewsCount})</span>
        </div>

        {/* Title */}
        <h3
          onClick={() => onSelectProduct(product)}
          style={{
            fontSize: '13px',
            fontWeight: '700',
            color: theme.text,
            lineHeight: 1.3,
            marginBottom: '8px',
            cursor: 'pointer',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            minHeight: '34px'
          }}
        >
          {product.name}
        </h3>

        {/* Pricing Area */}
        <div style={{ marginTop: 'auto', paddingTop: '6px' }}>
          {isDealer ? (
            <div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                <span style={{ fontSize: '16px', fontWeight: '800', color: theme.dealerPurple }}>
                  ₹{product.wholesalePrice.toLocaleString('en-IN')}
                </span>
                <span style={{ fontSize: '11px', color: theme.textLight, textDecoration: 'line-through' }}>
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                <span style={{
                  fontSize: '9px',
                  fontWeight: '800',
                  padding: '2px 5px',
                  borderRadius: '4px',
                  backgroundColor: theme.successLight,
                  color: theme.success
                }}>
                  {discountPercent}% OFF WHOLESALE
                </span>
                <span style={{ fontSize: '10px', color: theme.textMuted }}>
                  MOQ: {product.minWholesaleQty || 1}
                </span>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
              <span style={{ fontSize: '16px', fontWeight: '800', color: theme.primary }}>
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              <span style={{ fontSize: '10px', color: theme.textMuted }}>MRP incl. tax</span>
            </div>
          )}
        </div>

        {/* Action Button */}
        <button
          onClick={() => addToCart(product, isDealer ? (product.minWholesaleQty || 1) : 1)}
          style={{
            marginTop: '10px',
            width: '100%',
            padding: '8px 12px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: isDealer ? theme.dealerPurple : theme.primary,
            color: '#ffffff',
            fontSize: '12px',
            fontWeight: '700',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            transition: 'opacity 0.2s'
          }}
        >
          <span>🛒 Add {isDealer ? `(${product.minWholesaleQty || 1} pcs)` : ''}</span>
        </button>

      </div>
    </div>
  );
}
