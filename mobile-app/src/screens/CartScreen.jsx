import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrdersContext';
import MapLocationPicker from '../components/MapLocationPicker';
import RazorpayModal from '../components/RazorpayModal';

export default function CartScreen({ onContinueShopping, onOrderSuccess }) {
  const { theme } = useTheme();
  const { user } = useAuth();
  const {
    items,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    walletDiscount,
    total,
    useWalletCredits,
    setUseWalletCredits,
    isDealer
  } = useCart();
  const { placeOrder } = useOrders();

  const [showMapPicker, setShowMapPicker] = useState(false);
  const [showRazorpay, setShowRazorpay] = useState(false);

  const handlePaymentSuccess = (paymentData) => {
    setShowRazorpay(false);
    const newOrder = placeOrder({
      items,
      subtotal,
      discount: walletDiscount,
      total,
      address: user.address,
      paymentId: paymentData.paymentId,
      paymentMethod: paymentData.paymentMethod
    });
    clearCart();
    if (onOrderSuccess) onOrderSuccess(newOrder);
  };

  if (items.length === 0) {
    return (
      <div style={{ padding: '40px 16px', textAlign: 'center', maxWidth: '480px', margin: '0 auto' }}>
        <div style={{ fontSize: '54px', marginBottom: '16px' }}>🛒</div>
        <h3 style={{ fontSize: '18px', fontWeight: '800', color: theme.text }}>Your Cart is Empty</h3>
        <p style={{ fontSize: '13px', color: theme.textMuted, marginTop: '6px', marginBottom: '24px' }}>
          Explore our range of 50+ water purifiers, commercial dispensers, booster pumps, and genuine spares.
        </p>
        <button
          onClick={onContinueShopping}
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
          Browse Product Catalog
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '16px', maxWidth: '640px', margin: '0 auto', paddingBottom: '90px' }}>
      <h2 style={{ fontSize: '20px', fontWeight: '800', color: theme.text, marginBottom: '16px' }}>
        Shopping Cart ({items.length} items)
      </h2>

      {/* Cart Items List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
        {items.map((item) => {
          const itemPrice = isDealer ? item.wholesalePrice : item.price;
          return (
            <div
              key={item.id}
              style={{
                backgroundColor: theme.card,
                borderRadius: '12px',
                border: `1px solid ${theme.border}`,
                padding: '12px',
                display: 'flex',
                gap: '12px',
                alignItems: 'center'
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{ width: '64px', height: '64px', borderRadius: '8px', objectFit: 'cover' }}
              />

              <div style={{ flex: 1 }}>
                <h4 style={{ fontSize: '13px', fontWeight: '700', color: theme.text, lineHeight: 1.3 }}>
                  {item.name}
                </h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                  <span style={{ fontSize: '14px', fontWeight: '800', color: isDealer ? theme.dealerPurple : theme.primary }}>
                    ₹{itemPrice.toLocaleString('en-IN')}
                  </span>
                  {isDealer && (
                    <span style={{ fontSize: '10px', color: theme.dealerPurple, fontWeight: '700' }}>
                      (Wholesale)
                    </span>
                  )}
                </div>
              </div>

              {/* Quantity Controls */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', border: `1px solid ${theme.border}`, borderRadius: '6px', backgroundColor: theme.surfaceSubtle }}>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    style={{ width: '26px', height: '26px', border: 'none', background: 'none', cursor: 'pointer', color: theme.text, fontWeight: '700' }}
                  >
                    -
                  </button>
                  <span style={{ minWidth: '24px', textAlign: 'center', fontSize: '12px', fontWeight: '700', color: theme.text }}>
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    style={{ width: '26px', height: '26px', border: 'none', background: 'none', cursor: 'pointer', color: theme.text, fontWeight: '700' }}
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{ border: 'none', background: 'none', color: '#ef4444', fontSize: '11px', cursor: 'pointer', fontWeight: '600' }}
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Delivery Address Card with OpenStreetMap Button */}
      <div
        style={{
          backgroundColor: theme.card,
          borderRadius: '12px',
          border: `1px solid ${theme.border}`,
          padding: '16px',
          marginBottom: '20px'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <h4 style={{ fontSize: '13px', fontWeight: '800', color: theme.text }}>
            📍 Delivery Location (OpenStreetMap)
          </h4>
          <button
            onClick={() => setShowMapPicker(true)}
            style={{
              padding: '4px 10px',
              borderRadius: '6px',
              border: `1px solid ${theme.primary}`,
              backgroundColor: theme.primaryLight,
              color: theme.primaryDark,
              fontSize: '11px',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            Change Pin
          </button>
        </div>
        <p style={{ fontSize: '13px', fontWeight: '600', color: theme.text }}>
          {user.name} ({user.phone})
        </p>
        <p style={{ fontSize: '12px', color: theme.textMuted, marginTop: '2px' }}>
          {user.address.street}, {user.address.city}, {user.address.state} - {user.address.pincode}
        </p>
      </div>

      {/* Referral Discount Toggle (Bonus +5 pts) */}
      {user.walletCredits > 0 && (
        <div
          style={{
            backgroundColor: theme.surfaceSubtle,
            borderRadius: '12px',
            border: `1px dashed ${theme.success}`,
            padding: '14px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <p style={{ fontSize: '13px', fontWeight: '700', color: theme.text }}>
              🎁 Apply Referral Credits
            </p>
            <p style={{ fontSize: '11px', color: theme.textMuted }}>
              Available wallet credits: ₹{user.walletCredits}
            </p>
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '700', color: theme.success }}>
            <input
              type="checkbox"
              checked={useWalletCredits}
              onChange={(e) => setUseWalletCredits(e.target.checked)}
              style={{ width: '16px', height: '16px', accentColor: theme.success }}
            />
            Apply ₹{user.walletCredits} Off
          </label>
        </div>
      )}

      {/* Bill Breakdown */}
      <div
        style={{
          backgroundColor: theme.card,
          borderRadius: '12px',
          border: `1px solid ${theme.border}`,
          padding: '16px',
          marginBottom: '24px'
        }}
      >
        <h4 style={{ fontSize: '14px', fontWeight: '800', color: theme.text, marginBottom: '12px' }}>
          Order Summary
        </h4>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: theme.textMuted, marginBottom: '6px' }}>
          <span>Subtotal</span>
          <span>₹{subtotal.toLocaleString('en-IN')}</span>
        </div>
        {walletDiscount > 0 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: theme.success, marginBottom: '6px', fontWeight: '600' }}>
            <span>Referral Wallet Discount</span>
            <span>- ₹{walletDiscount.toLocaleString('en-IN')}</span>
          </div>
        )}
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: theme.textMuted, marginBottom: '8px' }}>
          <span>Doorstep Technician Delivery & Install</span>
          <span style={{ color: theme.success, fontWeight: '700' }}>FREE</span>
        </div>
        <div style={{ borderTop: `1px solid ${theme.border}`, paddingTop: '10px', display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: '800', color: theme.text }}>
          <span>Total Payable</span>
          <span>₹{total.toLocaleString('en-IN')}</span>
        </div>
      </div>

      {/* Checkout Button */}
      <button
        onClick={() => setShowRazorpay(true)}
        style={{
          width: '100%',
          padding: '16px',
          borderRadius: '12px',
          border: 'none',
          backgroundColor: isDealer ? theme.dealerPurple : theme.primary,
          color: '#ffffff',
          fontSize: '15px',
          fontWeight: '800',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          boxShadow: '0 4px 6px -1px rgba(2, 132, 199, 0.3)'
        }}
      >
        <span>🔒 Pay ₹{total.toLocaleString('en-IN')} via Razorpay Test</span>
      </button>

      {/* Modals */}
      {showMapPicker && (
        <MapLocationPicker
          onClose={() => setShowMapPicker(false)}
        />
      )}

      {showRazorpay && (
        <RazorpayModal
          amount={total}
          customerName={user.name}
          customerEmail={user.email}
          customerPhone={user.phone}
          onSuccess={handlePaymentSuccess}
          onDismiss={() => setShowRazorpay(false)}
        />
      )}
    </div>
  );
}
