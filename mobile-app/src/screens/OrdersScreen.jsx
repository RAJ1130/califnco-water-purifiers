import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useOrders } from '../context/OrdersContext';

export default function OrdersScreen({ onBrowseCatalog }) {
  const { theme } = useTheme();
  const { orders } = useOrders();

  if (orders.length === 0) {
    return (
      <div style={{ padding: '40px 16px', textAlign: 'center', maxWidth: '480px', margin: '0 auto' }}>
        <div style={{ fontSize: '50px', marginBottom: '16px' }}>📦</div>
        <h3 style={{ fontSize: '18px', fontWeight: '800', color: theme.text }}>No Orders Placed Yet</h3>
        <p style={{ fontSize: '13px', color: theme.textMuted, marginTop: '6px', marginBottom: '20px' }}>
          When you place orders via Razorpay test checkout, their live tracking status will appear here.
        </p>
        <button
          onClick={onBrowseCatalog}
          style={{
            padding: '12px 24px',
            borderRadius: '10px',
            border: 'none',
            backgroundColor: theme.primary,
            color: '#fff',
            fontSize: '14px',
            fontWeight: '700',
            cursor: 'pointer'
          }}
        >
          Explore Catalog
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '16px', maxWidth: '640px', margin: '0 auto', paddingBottom: '90px' }}>
      <h2 style={{ fontSize: '20px', fontWeight: '800', color: theme.text, marginBottom: '16px' }}>
        Order History & Live Tracking ({orders.length})
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {orders.map((order) => (
          <div
            key={order.id}
            style={{
              backgroundColor: theme.card,
              borderRadius: '14px',
              border: `1px solid ${theme.border}`,
              padding: '16px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.03)'
            }}
          >
            {/* Top Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${theme.border}`, paddingBottom: '10px', marginBottom: '12px' }}>
              <div>
                <span style={{ fontSize: '14px', fontWeight: '800', color: theme.primary }}>
                  {order.id}
                </span>
                <p style={{ fontSize: '11px', color: theme.textMuted, marginTop: '2px' }}>
                  Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{
                  fontSize: '11px',
                  fontWeight: '700',
                  padding: '3px 8px',
                  borderRadius: '9999px',
                  backgroundColor: order.orderStatus === 'Delivered' ? theme.successLight : theme.primaryLight,
                  color: order.orderStatus === 'Delivered' ? theme.success : theme.primaryDark
                }}>
                  ● {order.orderStatus}
                </span>
                <p style={{ fontSize: '14px', fontWeight: '800', color: theme.text, marginTop: '4px' }}>
                  ₹{order.total.toLocaleString('en-IN')}
                </p>
              </div>
            </div>

            {/* Items Thumbnails */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
              {order.items.map((it, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img
                    src={it.image}
                    alt={it.name}
                    style={{ width: '40px', height: '40px', borderRadius: '6px', objectFit: 'cover' }}
                  />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '12px', fontWeight: '700', color: theme.text }}>{it.name}</p>
                    <p style={{ fontSize: '11px', color: theme.textMuted }}>Qty: {it.quantity} • ₹{it.price.toLocaleString('en-IN')}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Live Timeline Tracker */}
            <div style={{ backgroundColor: theme.surfaceSubtle, borderRadius: '10px', padding: '12px', marginBottom: '12px' }}>
              <p style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: theme.textMuted, marginBottom: '8px' }}>
                Delivery Milestone Tracker
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {(order.timeline || [
                  { title: "Order Placed", done: true },
                  { title: "Razorpay Test Verified", done: true },
                  { title: "Dispatched from Hub", done: order.orderStatus !== 'Pending' },
                  { title: "Delivered to Doorstep", done: order.orderStatus === 'Delivered' }
                ]).map((step, sIdx) => (
                  <div key={sIdx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
                    <span style={{ color: step.done ? '#10b981' : '#94a3b8', fontWeight: '700' }}>
                      {step.done ? '✓' : '○'}
                    </span>
                    <span style={{ color: step.done ? theme.text : theme.textMuted, fontWeight: step.done ? '600' : '400' }}>
                      {step.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment & Address details */}
            <div style={{ fontSize: '11px', color: theme.textMuted, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
              <span>Payment ID: <strong style={{ color: theme.text, fontFamily: 'monospace' }}>{order.paymentId}</strong></span>
              <span>Method: {order.paymentMethod}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
