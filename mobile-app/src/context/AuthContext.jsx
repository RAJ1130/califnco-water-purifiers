import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Demo default user profile
  const [user, setUser] = useState({
    uid: "usr-101",
    name: "Rajesh Sharma",
    email: "rajesh.sharma@example.com",
    phone: "+91 98450 12345",
    role: "customer", // 'customer' | 'dealer'
    companyName: "Aqua Solutions & Plumbing Spares",
    gstin: "29AAAAA0000A1Z5",
    dealerStatus: "approved", // 'pending' | 'approved' | 'rejected'
    referralCode: "CALIF-RAJESH",
    walletCredits: 500,
    address: {
      street: "Flat 402, Green Glen Layout, Bellandur",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560103"
    }
  });

  const [notification, setNotification] = useState(null);

  const showNotification = (title, message, type = 'info') => {
    setNotification({ title, message, type, id: Date.now() });
    setTimeout(() => {
      setNotification(null);
    }, 4500);
  };

  const switchRole = (newRole) => {
    setUser(prev => ({
      ...prev,
      role: newRole
    }));
    showNotification(
      'Role Switched',
      `Switched view to ${newRole === 'dealer' ? 'Wholesale Dealer' : 'Retail Customer'} mode.`,
      'success'
    );
  };

  const applyDealer = (companyName, gstin, phone) => {
    setUser(prev => ({
      ...prev,
      role: 'dealer',
      companyName,
      gstin,
      dealerStatus: 'pending'
    }));
    showNotification(
      'Application Submitted',
      'Dealer application submitted. Admin will review within 24 hours.',
      'info'
    );
  };

  const updateAddress = (newAddress) => {
    setUser(prev => ({
      ...prev,
      address: newAddress
    }));
    showNotification('Address Saved', 'Delivery location updated via OpenStreetMap.', 'success');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        switchRole,
        applyDealer,
        updateAddress,
        notification,
        showNotification
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
