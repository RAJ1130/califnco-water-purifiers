import React, { useState } from 'react';
import { Search, Edit3, Check, Filter, Layers, AlertCircle } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

export default function ProductsPage() {
  const { products, toggleProductStock, updateProductPrices } = useAdmin();
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [editPrice, setEditPrice] = useState('');
  const [editWholesale, setEditWholesale] = useState('');

  const categories = [
    { id: 'ALL', label: 'All Products (52)' },
    { id: 'purifiers', label: 'Water Purifiers' },
    { id: 'dispensers', label: 'Dispensers & Coolers' },
    { id: 'pumps', label: 'Booster Pumps' },
    { id: 'filters', label: 'Filters & Membranes' },
    { id: 'spares', label: 'Spares & Accessories' }
  ];

  const filteredProducts = products.filter((p) => {
    const matchesCat = selectedCategory === 'ALL' || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleOpenEdit = (product) => {
    setEditingProduct(product);
    setEditPrice(product.price);
    setEditWholesale(product.wholesalePrice);
  };

  const handleSavePrice = () => {
    if (editingProduct) {
      updateProductPrices(editingProduct.id, editPrice, editWholesale);
      setEditingProduct(null);
    }
  };

  return (
    <div>
      {/* Category Pills & Search */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
        
        <div style={{ display: 'flex', gap: '8px', background: '#e2e8f0', padding: '4px', borderRadius: '10px', flexWrap: 'wrap' }}>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`filter-tab ${selectedCategory === c.id ? 'active' : ''}`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="search-input" style={{ width: '280px' }}>
          <Search size={15} color="#64748b" />
          <input
            type="text"
            placeholder="Search 50+ products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '13px' }}
          />
        </div>
      </div>

      {/* Products Table */}
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Product Details</th>
              <th>Category</th>
              <th>Customer Retail Price</th>
              <th>Dealer Wholesale Price</th>
              <th>Dealer MOQ</th>
              <th>Inventory Stock</th>
              <th>Manage</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((p) => (
              <tr key={p.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img
                      src={p.image}
                      alt={p.name}
                      style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--border)' }}
                    />
                    <div>
                      <p style={{ fontWeight: '700', color: '#0f172a' }}>{p.name}</p>
                      <p style={{ fontSize: '11px', color: '#64748b', fontFamily: 'monospace' }}>{p.id}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <span style={{ 
                    fontSize: '11px', 
                    fontWeight: '700', 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.05em',
                    color: '#0284c7' 
                  }}>
                    {p.category}
                  </span>
                </td>
                <td>
                  <p style={{ fontWeight: '700', fontSize: '14px', color: '#0f172a' }}>
                    ₹{p.price.toLocaleString('en-IN')}
                  </p>
                </td>
                <td>
                  <div>
                    <p style={{ fontWeight: '700', fontSize: '14px', color: '#7e22ce' }}>
                      ₹{p.wholesalePrice.toLocaleString('en-IN')}
                    </p>
                    <span style={{ fontSize: '10px', color: '#10b981', fontWeight: '700' }}>
                      {Math.round(((p.price - p.wholesalePrice) / p.price) * 100)}% wholesale discount
                    </span>
                  </div>
                </td>
                <td>
                  <span style={{ fontSize: '12px', fontWeight: '600', color: '#475569' }}>
                    {p.minWholesaleQty || 1} units
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => toggleProductStock(p.id)}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '9999px',
                      fontSize: '11px',
                      fontWeight: '700',
                      border: '1px solid',
                      backgroundColor: p.stock > 0 ? '#ecfdf5' : '#fef2f2',
                      borderColor: p.stock > 0 ? '#a7f3d0' : '#fecaca',
                      color: p.stock > 0 ? '#047857' : '#b91c1c'
                    }}
                    title="Click to toggle stock"
                  >
                    {p.stock > 0 ? `${p.stock} In Stock` : 'Out of Stock'}
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleOpenEdit(p)}
                    className="btn btn-outline btn-sm"
                    style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    <Edit3 size={13} /> Edit Pricing
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editingProduct && (
        <div className="modal-overlay" onClick={() => setEditingProduct(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '480px' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)' }}>
              <h3 style={{ fontSize: '17px', fontWeight: '800' }}>Edit Product Pricing</h3>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{editingProduct.name}</p>
            </div>

            <div style={{ padding: '24px' }}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '13px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' }}>
                  Customer Retail Price (₹):
                </label>
                <input
                  type="number"
                  value={editPrice}
                  onChange={(e) => setEditPrice(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1px solid var(--border)',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '13px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' }}>
                  Dealer Wholesale Price (₹):
                </label>
                <input
                  type="number"
                  value={editWholesale}
                  onChange={(e) => setEditWholesale(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1px solid var(--border)',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}
                />
              </div>

              <p style={{ fontSize: '12px', color: '#64748b' }}>
                Dealer discount will be: <strong>{Math.round(((editPrice - editWholesale) / editPrice) * 100)}%</strong>
              </p>
            </div>

            <div style={{ padding: '16px 24px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button onClick={() => setEditingProduct(null)} className="btn btn-outline">
                Cancel
              </button>
              <button onClick={handleSavePrice} className="btn btn-primary">
                Save Prices
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
