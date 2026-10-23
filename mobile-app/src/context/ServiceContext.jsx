import React, { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';

const ServiceContext = createContext();

export function ServiceProvider({ children }) {
  const { user, showNotification } = useAuth();
  const [services, setServices] = useState([
    {
      id: "SRV-401",
      serviceType: "Annual Maintenance Service (AMC)",
      purifierModel: "Califnco HydroPure Elite RO",
      preferredDate: "2026-10-24",
      timeSlot: "10:00 AM - 01:00 PM",
      problemDescription: "Standard 6-month check and membrane inspection.",
      technicianAssigned: "Ravi Kumar (Senior Technician)",
      status: "Scheduled",
      createdAt: "2026-10-23T09:15:00Z"
    }
  ]);

  const bookNewService = ({ serviceType, purifierModel, preferredDate, timeSlot, description }) => {
    const ticketId = `SRV-${Math.floor(100 + Math.random() * 900)}`;
    const newService = {
      id: ticketId,
      serviceType,
      purifierModel: purifierModel || "Califnco Water Purifier",
      preferredDate,
      timeSlot,
      problemDescription: description,
      technicianAssigned: "Auto-assigning nearest certified tech...",
      status: "Requested",
      createdAt: new Date().toISOString()
    };

    setServices(prev => [newService, ...prev]);

    showNotification(
      'Service Booked!',
      `Technician appointment booked for ${preferredDate} (${timeSlot}). Ticket: ${ticketId}.`,
      'success'
    );

    return newService;
  };

  return (
    <ServiceContext.Provider value={{ services, bookNewService }}>
      {children}
    </ServiceContext.Provider>
  );
}

export function useService() {
  const context = useContext(ServiceContext);
  if (!context) throw new Error('useService must be used within a ServiceProvider');
  return context;
}
