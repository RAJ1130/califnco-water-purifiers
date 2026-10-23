import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import productsData from '../data/products.json';

export default function CatalogScreen({ onSelectProduct, onOpenLightbox }) {
  const { theme } = useTheme();
  const { user, switchRole } = useAuth();
  const { isDealer } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'ALL', label: 'All Items (52)', icon: '✨' },
    { id: 'purifiers', label: 'Purifiers', icon: '💧' },
    { id: 'dispensers', label: 'Dispensers', icon: '🚰' },
    { id: 'pumps', label: 'RO Pumps', icon: '⚙️' },
    { id: 'filters', label: 'Filters & Membranes', icon: '🧪' },
    { id: 'spares', label: 'Spares & Parts', icon: '🔧' }
  ];

  const filteredProducts = productsData.filter((p) => {
    const matchesCategory = selectedCategory === 'ALL' || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ padding: '16px', maxWidth: '640px', margin: '0 auto' }}>
      
      {/* Role Banner / Wholesale Alert */}
      <div
        style={{
          padding: '12px 16px',
          borderRadius: '12px',
          backgroundColor: isDealer ? theme.dealerPurpleLight : theme.primaryLight,
          border: `1px solid ${isDealer ? theme.dealerPurple : theme.primary}`,
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div>
          <p style={{ fontSize: '13px', fontWeight: '800', color: isDealer ? theme.dealerPurple : theme.primaryDark }}>
            {isDealer ? '🏢 Wholesale Dealer Pricing Active' : '👤 Retail Customer Catalog'}
          </p>
          <p style={{ fontSize: '11px', color: isDealer ? '#6b21a8' : '#0369a1', marginTop: '2px' }}>
            {isDealer 
              ? 'Displaying 30-45% dealer wholesale prices for bulk ordering.' 
              : 'Best online retail prices with 1-year on-site warranty.'}
          </p>
        </div>
        <button
          onClick={() => switchRole(user.role === 'customer' ? 'dealer' : 'customer')}
          style={{
            padding: '6px 12px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: isDealer ? theme.dealerPurple : theme.primary,
            color: '#fff',
            fontSize: '11px',
            fontWeight: '700',
            cursor: 'pointer',
            whiteSpace: 'nowrap'
          }}
        >
          Switch to {user.role === 'customer' ? 'Dealer' : 'Customer'}
        </button>
      </div>

      {/* Search Bar */}
      <div style={{ marginBottom: '16px', position: 'relative' }}>
        <input
          type="text"
          placeholder="Search 50+ purifiers, filters, spares..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 16px',
            paddingLeft: '40px',
            borderRadius: '12px',
            border: `1px solid ${theme.border}`,
            backgroundColor: theme.surface,
            color: theme.text,
            fontSize: '14px',
            outline: 'none',
            boxSizing: 'border-box'
          }}
        />
        <span style={{ position: 'absolute', left: '14px', top: '12px', fontSize: '16px', color: theme.textLight }}>
          🔍
        </span>
      </div>

      {/* Category Pills */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '10px', marginBottom: '16px' }}>
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCategory(c.id)}
            style={{
              padding: '8px 14px',
              borderRadius: '20px',
              border: `1px solid ${selectedCategory === c.id ? (isDealer ? theme.dealerPurple : theme.primary) : theme.border}`,
              backgroundColor: selectedCategory === c.id 
                ? (isDealer ? theme.dealerPurple : theme.primary) 
                : theme.surface,
              color: selectedCategory === c.id ? '#ffffff' : theme.text,
              fontSize: '12px',
              fontWeight: '700',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>{c.icon}</span>
            <span>{c.label}</span>
          </button>
        ))}
      </div>

      {/* Products Count */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
        <p style={{ fontSize: '13px', fontWeight: '700', color: theme.textMuted }}>
          Showing {filteredProducts.length} Products
        </p>
        <span style={{ fontSize: '11px', color: theme.textLight }}>
          Verified Stock Available
        </span>
      </div>

      {/* Products Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: '14px',
          paddingBottom: '80px'
        }}
      >
        {filteredProducts.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            onSelectProduct={onSelectProduct}
            onOpenLightbox={onOpenLightbox}
          />
        ))}
      </div>
    </div>
  );
}
