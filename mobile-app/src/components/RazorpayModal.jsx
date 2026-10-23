import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function RazorpayModal({ amount, customerName, customerEmail, customerPhone, onSuccess, onDismiss }) {
  const { theme } = useTheme();
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [upiId, setUpiId] = useState('rajesh@okhdfcbank');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayNow = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const generatedPaymentId = `pay_rzp_test_${Math.random().toString(36).substring(2, 10).toUpperCase()}${Date.now().toString().slice(-4)}`;
      onSuccess({
        paymentId: generatedPaymentId,
        paymentMethod: paymentMethod === 'UPI' ? `Razorpay UPI (${upiId})` : `Razorpay ${paymentMethod}`,
        amount
      });
    }, 1500);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(5px)',
        zIndex: 120,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          color: '#0f172a'
        }}
      >
        {/* Razorpay Blue Header */}
        <div style={{ backgroundColor: '#0c2340', padding: '18px 20px', color: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '18px', fontWeight: '800', letterSpacing: '-0.02em' }}>Razorpay</span>
              <span style={{ fontSize: '10px', backgroundColor: '#f59e0b', color: '#000', fontWeight: '800', padding: '2px 6px', borderRadius: '4px' }}>
                TEST MODE
              </span>
            </div>
            <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>
              Califnco Water Technologies Pvt Ltd
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '11px', color: '#94a3b8' }}>Amount to Pay</p>
            <p style={{ fontSize: '20px', fontWeight: '800', color: '#38bdf8' }}>
              ₹{amount.toLocaleString('en-IN')}
            </p>
          </div>
        </div>

        {/* Customer Info Strip */}
        <div style={{ backgroundColor: '#f8fafc', padding: '10px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748b' }}>
          <span>{customerName} • {customerPhone}</span>
          <span style={{ fontFamily: 'monospace' }}>rzp_test_CalifncoDemo</span>
        </div>

        {/* Payment Methods */}
        <div style={{ padding: '20px' }}>
          <p style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.04em', marginBottom: '12px' }}>
            Choose Payment Mode
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
            {[
              { id: 'UPI', label: 'UPI (Google Pay, PhonePe, Paytm, QR)', icon: '📱' },
              { id: 'Cards', label: 'Credit / Debit Card (Visa, Mastercard, RuPay)', icon: '💳' },
              { id: 'NetBanking', label: 'NetBanking (All Indian Banks)', icon: '🏦' },
              { id: 'COD', label: 'Cash / Pay on Doorstep Delivery', icon: '💵' }
            ].map((mode) => (
              <label
                key={mode.id}
                onClick={() => setPaymentMethod(mode.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: `1.5px solid ${paymentMethod === mode.id ? '#0284c7' : '#e2e8f0'}`,
                  backgroundColor: paymentMethod === mode.id ? '#f0f9ff' : '#ffffff',
                  cursor: 'pointer'
                }}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === mode.id}
                  onChange={() => setPaymentMethod(mode.id)}
                  style={{ accentColor: '#0284c7' }}
                />
                <span style={{ fontSize: '16px' }}>{mode.icon}</span>
                <span style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b' }}>{mode.label}</span>
              </label>
            ))}
          </div>

          {paymentMethod === 'UPI' && (
            <div style={{ marginBottom: '20px', padding: '12px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <label style={{ fontSize: '11px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>
                Enter Virtual Payment Address (VPA / UPI ID):
              </label>
              <input
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 10px',
                  borderRadius: '6px',
                  border: '1px solid #cbd5e1',
                  fontSize: '13px',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          )}

          {paymentMethod === 'Cards' && (
            <div style={{ marginBottom: '20px', padding: '12px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px', color: '#64748b' }}>
              <p>Test Card Number: <strong>4111 •••• •••• 4444</strong></p>
              <p>Expiry: <strong>12/28</strong> | CVV: <strong>123</strong> (Zero OTP needed in test mode)</p>
            </div>
          )}

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={onDismiss}
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                backgroundColor: '#ffffff',
                color: '#475569',
                fontSize: '13px',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              onClick={handlePayNow}
              disabled={isProcessing}
              style={{
                flex: 2,
                padding: '12px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: '#0284c7',
                color: '#ffffff',
                fontSize: '14px',
                fontWeight: '800',
                cursor: isProcessing ? 'wait' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              {isProcessing ? (
                <span>Verifying with Razorpay...</span>
              ) : (
                <span>Pay ₹{amount.toLocaleString('en-IN')} (Test)</span>
              )}
            </button>
          </div>
        </div>

        {/* Security badge */}
        <div style={{ padding: '8px 20px', backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0', textAlign: 'center', fontSize: '10px', color: '#94a3b8' }}>
          🔒 Secured by 256-bit Razorpay PCI-DSS Level 1 Encryption
        </div>
      </div>
    </div>
  );
}
