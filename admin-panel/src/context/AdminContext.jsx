import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialOrders, initialDealers, initialServiceRequests, initialProducts } from '../data/mockData';

const AdminContext = createContext();

export function AdminProvider({ children }) {
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('califnco_admin_orders');
    return saved ? JSON.parse(saved) : initialOrders;
  });

  const [dealers, setDealers] = useState(() => {
    const saved = localStorage.getItem('califnco_admin_dealers');
    return saved ? JSON.parse(saved) : initialDealers;
  });

  const [services, setServices] = useState(() => {
    const saved = localStorage.getItem('califnco_admin_services');
    return saved ? JSON.parse(saved) : initialServiceRequests;
  });

  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('califnco_admin_products');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  useEffect(() => {
    localStorage.setItem('califnco_admin_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('califnco_admin_dealers', JSON.stringify(dealers));
  }, [dealers]);

  useEffect(() => {
    localStorage.setItem('califnco_admin_services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('califnco_admin_products', JSON.stringify(products));
  }, [products]);

  // Order Actions
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId ? { ...order, orderStatus: newStatus } : order
      )
    );
  };

  // Dealer Actions (Mandatory Requirement)
  const approveDealer = (dealerId) => {
    setDealers(prev =>
      prev.map(dealer =>
        dealer.id === dealerId
          ? { ...dealer, status: 'approved', reviewedDate: new Date().toISOString() }
          : dealer
      )
    );
  };

  const rejectDealer = (dealerId, reason = "Documentation does not meet minimum eligibility criteria") => {
    setDealers(prev =>
      prev.map(dealer =>
        dealer.id === dealerId
          ? { ...dealer, status: 'rejected', reviewedDate: new Date().toISOString(), rejectionReason: reason }
          : dealer
      )
    );
  };

  // Service Desk Actions
  const updateServiceStatus = (serviceId, newStatus, technician) => {
    setServices(prev =>
      prev.map(service => {
        if (service.id === serviceId) {
          const updated = { ...service, status: newStatus };
          if (technician) updated.technicianAssigned = technician;
          return updated;
        }
        return service;
      })
    );
  };

  // Product Actions
  const toggleProductStock = (productId) => {
    setProducts(prev =>
      prev.map(p => (p.id === productId ? { ...p, stock: p.stock > 0 ? 0 : 25 } : p))
    );
  };

  const updateProductPrices = (productId, retailPrice, wholesalePrice) => {
    setProducts(prev =>
      prev.map(p =>
        p.id === productId
          ? { ...p, price: Number(retailPrice), wholesalePrice: Number(wholesalePrice) }
          : p
      )
    );
  };

  // Metrics
  const stats = {
    totalRevenue: orders
      .filter(o => o.paymentStatus === 'Paid')
      .reduce((sum, o) => sum + o.total, 0),
    totalOrders: orders.length,
    pendingOrders: orders.filter(o => o.orderStatus === 'Pending').length,
    approvedDealers: dealers.filter(d => d.status === 'approved').length,
    pendingDealers: dealers.filter(d => d.status === 'pending').length,
    openServices: services.filter(s => s.status !== 'Completed').length,
    totalProducts: products.length
  };

  return (
    <AdminContext.Provider
      value={{
        orders,
        dealers,
        services,
        products,
        stats,
        updateOrderStatus,
        approveDealer,
        rejectDealer,
        updateServiceStatus,
        toggleProductStock,
        updateProductPrices
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) throw new Error('useAdmin must be used within an AdminProvider');
  return context;
}
