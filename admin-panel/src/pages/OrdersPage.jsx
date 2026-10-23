import React, { useState } from 'react';
import { Eye, CheckCircle2, Truck, Package, Clock, XCircle, Search, Filter, Printer } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

export default function OrdersPage() {
  const { orders, updateOrderStatus } = useAdmin();
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = statusFilter === 'ALL' || order.orderStatus.toUpperCase() === statusFilter;
    const matchesRole = roleFilter === 'ALL' || order.userRole.toUpperCase() === roleFilter;
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerPhone.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesRole && matchesSearch;
  });

  return (
    <div>
      {/* Filters Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
        
        {/* Status Pills */}
        <div style={{ display: 'flex', gap: '8px', background: '#e2e8f0', padding: '4px', borderRadius: '10px' }}>
          {['ALL', 'PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`filter-tab ${statusFilter === st ? 'active' : ''}`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Role Toggle & Search */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: '8px',
              border: '1px solid var(--border)',
              fontSize: '13px',
              fontWeight: '600',
              backgroundColor: '#fff'
            }}
          >
            <option value="ALL">All Order Types</option>
            <option value="CUSTOMER">Retail Customers Only</option>
            <option value="DEALER">Wholesale Dealers Only</option>
          </select>

          <div className="search-input" style={{ width: '240px' }}>
            <Search size={15} color="#64748b" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '13px' }}
            />
          </div>
        </div>

      </div>

      {/* Orders Table */}
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Customer / Dealer</th>
              <th>Type</th>
              <th>Items & Qty</th>
              <th>Total Amount</th>
              <th>Payment Info</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan="9" style={{ textAlign: 'center', padding: '36px', color: 'var(--text-muted)' }}>
                  No orders found matching the filter criteria.
                </td>
              </tr>
            ) : (
              filteredOrders.map((ord) => (
                <tr key={ord.id}>
                  <td style={{ fontWeight: '700', color: '#0284c7' }}>{ord.id}</td>
                  <td style={{ fontSize: '12px', color: '#64748b' }}>
                    {new Date(ord.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </td>
                  <td>
                    <div>
                      <p style={{ fontWeight: '600', color: '#0f172a' }}>{ord.customerName}</p>
                      <p style={{ fontSize: '12px', color: '#64748b' }}>{ord.customerPhone}</p>
                    </div>
                  </td>
                  <td>
                    <span style={{ 
                      fontSize: '11px', 
                      fontWeight: '700', 
                      padding: '3px 8px', 
                      borderRadius: '4px',
                      backgroundColor: ord.userRole === 'dealer' ? '#f3e8ff' : '#f1f5f9',
                      color: ord.userRole === 'dealer' ? '#7e22ce' : '#475569'
                    }}>
                      {ord.userRole === 'dealer' ? 'Wholesale' : 'Retail'}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontWeight: '600' }}>
                        {ord.items.reduce((sum, item) => sum + item.quantity, 0)} units
                      </span>
                      <span style={{ fontSize: '12px', color: '#94a3b8' }}>({ord.items.length} SKUs)</span>
                    </div>
                  </td>
                  <td style={{ fontWeight: '800', color: '#0f172a' }}>
                    ₹{ord.total.toLocaleString('en-IN')}
                  </td>
                  <td>
                    <div>
                      <span className={`badge badge-${ord.paymentStatus.toLowerCase()}`}>
                        {ord.paymentStatus}
                      </span>
                      <p style={{ fontSize: '11px', color: '#64748b', marginTop: '2px', fontFamily: 'monospace' }}>
                        {ord.paymentId}
                      </p>
                    </div>
                  </td>
                  <td>
                    <span className={`badge badge-${ord.orderStatus.toLowerCase()}`}>
                      {ord.orderStatus}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => setSelectedOrder(ord)}
                        className="btn btn-outline btn-sm"
                        title="View Full Order Details"
                      >
                        <Eye size={14} /> View
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ padding: '24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '800' }}>Order Details: {selectedOrder.id}</h3>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  Placed on {new Date(selectedOrder.createdAt).toLocaleString('en-IN')}
                </p>
              </div>
              <button 
                onClick={() => setSelectedOrder(null)}
                style={{ fontSize: '20px', color: '#94a3b8', padding: '4px' }}
              >
                &times;
              </button>
            </div>

            <div style={{ padding: '24px' }}>
              {/* Customer & Delivery Card */}
              <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '10px', border: '1px solid var(--border)', marginBottom: '20px' }}>
                <h5 style={{ fontSize: '13px', textTransform: 'uppercase', color: '#64748b', fontWeight: '700', letterSpacing: '0.05em', marginBottom: '8px' }}>
                  Delivery & Contact Information
                </h5>
                <p style={{ fontWeight: '700', fontSize: '15px' }}>{selectedOrder.customerName}</p>
                <p style={{ fontSize: '13px', color: '#475569' }}>{selectedOrder.customerPhone} • {selectedOrder.customerEmail}</p>
                {selectedOrder.companyName && (
                  <p style={{ fontSize: '12px', color: '#7e22ce', fontWeight: '600', marginTop: '4px' }}>
                    🏢 {selectedOrder.companyName} (GSTIN: {selectedOrder.gstin})
                  </p>
                )}
                <p style={{ fontSize: '13px', color: '#334155', marginTop: '6px' }}>
                  📍 {selectedOrder.address.street}, {selectedOrder.address.city}, {selectedOrder.address.state} - {selectedOrder.address.pincode}
                </p>
              </div>

              {/* Items List */}
              <h5 style={{ fontSize: '13px', textTransform: 'uppercase', color: '#64748b', fontWeight: '700', letterSpacing: '0.05em', marginBottom: '12px' }}>
                Purchased Items ({selectedOrder.items.length})
              </h5>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', border: '1px solid var(--border)', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img src={item.image} alt={item.name} style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '6px' }} />
                      <div>
                        <p style={{ fontSize: '14px', fontWeight: '600' }}>{item.name}</p>
                        <p style={{ fontSize: '12px', color: '#64748b' }}>₹{item.price.toLocaleString('en-IN')} × {item.quantity} unit(s)</p>
                      </div>
                    </div>
                    <p style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </p>
                  </div>
                ))}
              </div>

              {/* Price Calculation */}
              <div style={{ borderTop: '1px dashed var(--border)', paddingTop: '12px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#64748b', marginBottom: '4px' }}>
                  <span>Subtotal</span>
                  <span>₹{selectedOrder.subtotal.toLocaleString('en-IN')}</span>
                </div>
                {selectedOrder.discount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#10b981', marginBottom: '4px' }}>
                    <span>Special Discount</span>
                    <span>- ₹{selectedOrder.discount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: '800', color: '#0f172a', marginTop: '8px' }}>
                  <span>Total Amount Paid</span>
                  <span>₹{selectedOrder.total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Status Update Dropdown */}
              <div style={{ padding: '16px', backgroundColor: '#f1f5f9', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ fontSize: '12px', fontWeight: '700', color: '#475569' }}>Change Order Status:</p>
                  <p style={{ fontSize: '11px', color: '#64748b' }}>Updates customer live order tracker</p>
                </div>
                <select
                  value={selectedOrder.orderStatus}
                  onChange={(e) => {
                    updateOrderStatus(selectedOrder.id, e.target.value);
                    setSelectedOrder({ ...selectedOrder, orderStatus: e.target.value });
                  }}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '8px',
                    border: '1px solid var(--border)',
                    fontSize: '13px',
                    fontWeight: '700',
                    backgroundColor: '#ffffff'
                  }}
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <div style={{ padding: '16px 24px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button 
                onClick={() => window.print()}
                className="btn btn-outline"
                style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <Printer size={15} /> Print Packing Slip
              </button>
              <button onClick={() => setSelectedOrder(null)} className="btn btn-primary">
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
