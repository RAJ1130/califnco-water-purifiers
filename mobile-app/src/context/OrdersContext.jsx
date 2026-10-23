import React, { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';

const OrdersContext = createContext();

export function OrdersProvider({ children }) {
  const { user, showNotification } = useAuth();
  const [orders, setOrders] = useState([
    {
      id: "ORD-98214",
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      items: [
        {
          id: "pur-001",
          name: "Califnco HydroPure Elite RO+UV+UF+Copper",
          price: 14999,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&auto=format&fit=crop&q=80"
        }
      ],
      total: 14998,
      paymentMethod: "Razorpay (Test Mode)",
      paymentId: "pay_rzp_test_K29jA9vB9812",
      orderStatus: "Delivered",
      deliveryAddress: user.address,
      estimatedDelivery: "Delivered on 22 Oct 2026",
      timeline: [
        { title: "Order Placed", time: "21 Oct, 10:30 AM", done: true },
        { title: "Razorpay Payment Verified", time: "21 Oct, 10:31 AM", done: true },
        { title: "Packed & Handed to Courier", time: "21 Oct, 04:00 PM", done: true },
        { title: "Delivered at Doorstep", time: "22 Oct, 02:15 PM", done: true }
      ]
    }
  ]);

  const placeOrder = ({ items, subtotal, discount, total, address, paymentId, paymentMethod }) => {
    const orderId = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder = {
      id: orderId,
      createdAt: new Date().toISOString(),
      items,
      subtotal,
      discount,
      total,
      paymentMethod: paymentMethod || "Razorpay Test",
      paymentId: paymentId || `pay_rzp_test_${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
      orderStatus: "Confirmed",
      deliveryAddress: address || user.address,
      estimatedDelivery: "2 business days",
      timeline: [
        { title: "Order Placed", time: "Just now", done: true },
        { title: "Razorpay Payment Verified", time: "Just now", done: true },
        { title: "Packing in Warehouse", time: "In progress", done: false },
        { title: "Dispatched with Technician", time: "Pending", done: false }
      ]
    };

    setOrders(prev => [newOrder, ...prev]);

    // Push alert & notification triggers (FCM + EmailJS + SMS)
    showNotification(
      '🎉 Order Confirmed!',
      `Order ${orderId} placed successfully. Razorpay ID: ${newOrder.paymentId}. Notification sent via Email & SMS.`,
      'success'
    );

    return newOrder;
  };

  return (
    <OrdersContext.Provider value={{ orders, placeOrder }}>
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrdersContext);
  if (!context) throw new Error('useOrders must be used within an OrdersProvider');
  return context;
}
