import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

export default function ReferralCard() {
  const { theme } = useTheme();
  const { user, showNotification } = useAuth();
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(user.referralCode);
    setCopied(true);
    showNotification('Code Copied!', `Referral code ${user.referralCode} copied to clipboard.`, 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `Hey! Get ₹500 OFF on your Califnco Water Purifier order using my invite code: ${user.referralCode}! Clean, mineral-rich drinking water for home & office: https://califnco.com`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div
      style={{
        backgroundColor: theme.card,
        borderRadius: '16px',
        border: `1.5px solid ${theme.border}`,
        padding: '20px',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Decorative accent */}
      <div style={{
        position: 'absolute',
        top: '-20px',
        right: '-20px',
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.15) 0%, rgba(14, 165, 233, 0.05) 100%)',
        pointerEvents: 'none'
      }} />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '20px' }}>🎁</span>
          <h4 style={{ fontSize: '15px', fontWeight: '800', color: theme.text }}>
            Refer Friends & Earn ₹500
          </h4>
        </div>
        <span style={{
          fontSize: '11px',
          fontWeight: '800',
          padding: '3px 8px',
          borderRadius: '9999px',
          backgroundColor: theme.successLight,
          color: theme.success
        }}>
          Wallet: ₹{user.walletCredits}
        </span>
      </div>

      <p style={{ fontSize: '12px', color: theme.textMuted, lineHeight: 1.4, marginBottom: '16px' }}>
        Share your unique referral code. When a friend purchases any RO Purifier, they get <strong>₹500 instant discount</strong> and you earn <strong>₹500 wallet credits</strong>!
      </p>

      {/* Code Box */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 14px',
        backgroundColor: theme.surfaceSubtle,
        borderRadius: '10px',
        border: `1px dashed ${theme.primary}`,
        marginBottom: '14px'
      }}>
        <div>
          <span style={{ fontSize: '10px', color: theme.textMuted, fontWeight: '700', textTransform: 'uppercase' }}>
            Your Invite Code
          </span>
          <p style={{ fontSize: '16px', fontWeight: '800', color: theme.primary, letterSpacing: '0.05em' }}>
            {user.referralCode}
          </p>
        </div>
        <button
          onClick={handleCopyCode}
          style={{
            padding: '6px 12px',
            borderRadius: '6px',
            border: 'none',
            backgroundColor: theme.primary,
            color: '#fff',
            fontSize: '12px',
            fontWeight: '700',
            cursor: 'pointer'
          }}
        >
          {copied ? '✓ Copied' : 'Copy Code'}
        </button>
      </div>

      {/* WhatsApp Share Button */}
      <button
        onClick={handleShareWhatsApp}
        style={{
          width: '100%',
          padding: '10px',
          borderRadius: '10px',
          border: 'none',
          backgroundColor: '#25D366',
          color: '#ffffff',
          fontSize: '13px',
          fontWeight: '700',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          cursor: 'pointer'
        }}
      >
        <span>💬 Share on WhatsApp</span>
      </button>
    </div>
  );
}
