import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useService } from '../context/ServiceContext';
import { useAuth } from '../context/AuthContext';

export default function ServiceBookingScreen() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const { services, bookNewService } = useService();

  const [activeTab, setActiveTab] = useState('BOOK'); // 'BOOK' | 'MY_REQUESTS'
  const [serviceType, setServiceType] = useState('Filter Replacement & Sanitize');
  const [purifierModel, setPurifierModel] = useState('Califnco HydroPure Elite RO');
  const [preferredDate, setPreferredDate] = useState('2026-10-25');
  const [timeSlot, setTimeSlot] = useState('10:00 AM - 01:00 PM');
  const [description, setDescription] = useState('');

  const serviceOptions = [
    { title: 'Filter Replacement & Sanitize', desc: 'Replace Sediment, Carbon, and Mineralizer cartridges', icon: '🧪' },
    { title: 'New Purifier Installation', desc: 'Professional wall-mounting, plumbing inlet & electrical setup', icon: '🔧' },
    { title: 'Annual Maintenance Service (AMC)', desc: 'Full internal pump pressure check, TDS calibration, UV inspection', icon: '🛡️' },
    { title: 'Water Quality & TDS Testing', desc: 'Certified doorstep laboratory test of feed & RO output water', icon: '💧' },
    { title: 'Leakage / Breakdown Repair', desc: 'Solenoid valve, pump buzzing, low water flow resolution', icon: '⚡' }
  ];

  const handleBook = (e) => {
    e.preventDefault();
    bookNewService({
      serviceType,
      purifierModel,
      preferredDate,
      timeSlot,
      description: description || 'Routine maintenance and filter health check.'
    });
    setActiveTab('MY_REQUESTS');
  };

  return (
    <div style={{ padding: '16px', maxWidth: '640px', margin: '0 auto', paddingBottom: '90px' }}>
      
      {/* Tab Switcher */}
      <div style={{ display: 'flex', gap: '8px', backgroundColor: theme.surfaceSubtle, padding: '4px', borderRadius: '12px', marginBottom: '20px' }}>
        <button
          onClick={() => setActiveTab('BOOK')}
          style={{
            flex: 1,
            padding: '10px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: activeTab === 'BOOK' ? theme.primary : 'transparent',
            color: activeTab === 'BOOK' ? '#ffffff' : theme.text,
            fontSize: '13px',
            fontWeight: '700',
            cursor: 'pointer'
          }}
        >
          Book a Technician
        </button>
        <button
          onClick={() => setActiveTab('MY_REQUESTS')}
          style={{
            flex: 1,
            padding: '10px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: activeTab === 'MY_REQUESTS' ? theme.primary : 'transparent',
            color: activeTab === 'MY_REQUESTS' ? '#ffffff' : theme.text,
            fontSize: '13px',
            fontWeight: '700',
            cursor: 'pointer'
          }}
        >
          My Service Bookings ({services.length})
        </button>
      </div>

      {activeTab === 'BOOK' ? (
        <form onSubmit={handleBook}>
          {/* Service Type Selection */}
          <h3 style={{ fontSize: '15px', fontWeight: '800', color: theme.text, marginBottom: '12px' }}>
            Choose Service Requirement
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
            {serviceOptions.map((opt) => (
              <label
                key={opt.title}
                onClick={() => setServiceType(opt.title)}
                style={{
                  padding: '12px 14px',
                  borderRadius: '12px',
                  border: `1.5px solid ${serviceType === opt.title ? theme.primary : theme.border}`,
                  backgroundColor: serviceType === opt.title ? theme.primaryLight : theme.card,
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  cursor: 'pointer'
                }}
              >
                <input
                  type="radio"
                  name="serviceType"
                  checked={serviceType === opt.title}
                  onChange={() => setServiceType(opt.title)}
                  style={{ accentColor: theme.primary, marginTop: '2px' }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '16px' }}>{opt.icon}</span>
                    <h5 style={{ fontSize: '13px', fontWeight: '700', color: theme.text }}>{opt.title}</h5>
                  </div>
                  <p style={{ fontSize: '11px', color: theme.textMuted, marginTop: '2px' }}>{opt.desc}</p>
                </div>
              </label>
            ))}
          </div>

          {/* Purifier Model */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '12px', fontWeight: '700', color: theme.textMuted, display: 'block', marginBottom: '6px' }}>
              Water Purifier Model:
            </label>
            <input
              type="text"
              value={purifierModel}
              onChange={(e) => setPurifierModel(e.target.value)}
              placeholder="e.g. Califnco HydroPure Elite RO or other brand"
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '8px',
                border: `1px solid ${theme.border}`,
                backgroundColor: theme.surface,
                color: theme.text,
                fontSize: '13px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Date & Time Slot */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: '700', color: theme.textMuted, display: 'block', marginBottom: '6px' }}>
                Preferred Date:
              </label>
              <input
                type="date"
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: `1px solid ${theme.border}`,
                  backgroundColor: theme.surface,
                  color: theme.text,
                  fontSize: '13px',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            <div>
              <label style={{ fontSize: '12px', fontWeight: '700', color: theme.textMuted, display: 'block', marginBottom: '6px' }}>
                Preferred Time Slot:
              </label>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: `1px solid ${theme.border}`,
                  backgroundColor: theme.surface,
                  color: theme.text,
                  fontSize: '13px',
                  boxSizing: 'border-box'
                }}
              >
                <option value="10:00 AM - 01:00 PM">Morning (10 AM - 1 PM)</option>
                <option value="02:00 PM - 05:00 PM">Afternoon (2 PM - 5 PM)</option>
                <option value="05:00 PM - 08:00 PM">Evening (5 PM - 8 PM)</option>
              </select>
            </div>
          </div>

          {/* Notes / Issue description */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '12px', fontWeight: '700', color: theme.textMuted, display: 'block', marginBottom: '6px' }}>
              Problem Description / Note for Technician:
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Water taste is bitter, red filter LED blinking, low water pressure..."
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '8px',
                border: `1px solid ${theme.border}`,
                backgroundColor: theme.surface,
                color: theme.text,
                fontSize: '13px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Address notice */}
          <div style={{ padding: '12px', backgroundColor: theme.surfaceSubtle, borderRadius: '8px', border: `1px solid ${theme.border}`, marginBottom: '20px', fontSize: '12px', color: theme.textMuted }}>
            📍 Technician will visit your registered address: <strong>{user.address.street}, {user.address.city}</strong>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: '10px',
              border: 'none',
              backgroundColor: theme.primary,
              color: '#ffffff',
              fontSize: '14px',
              fontWeight: '800',
              cursor: 'pointer'
            }}
          >
            Confirm Technician Booking
          </button>
        </form>
      ) : (
        /* My Service Requests */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {services.map((srv) => (
            <div
              key={srv.id}
              style={{
                backgroundColor: theme.card,
                borderRadius: '14px',
                border: `1px solid ${theme.border}`,
                padding: '16px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <div>
                  <span style={{ fontSize: '11px', color: theme.primary, fontWeight: '800' }}>
                    {srv.id}
                  </span>
                  <h4 style={{ fontSize: '14px', fontWeight: '700', color: theme.text, marginTop: '2px' }}>
                    {srv.serviceType}
                  </h4>
                  <p style={{ fontSize: '12px', color: theme.textMuted }}>{srv.purifierModel}</p>
                </div>
                <span style={{
                  fontSize: '11px',
                  fontWeight: '700',
                  padding: '3px 8px',
                  borderRadius: '9999px',
                  backgroundColor: theme.infoLight,
                  color: theme.info
                }}>
                  {srv.status}
                </span>
              </div>

              <div style={{ padding: '10px 12px', backgroundColor: theme.surfaceSubtle, borderRadius: '8px', fontSize: '12px', color: theme.textMuted, marginBottom: '8px' }}>
                <p>📅 Schedule: <strong>{srv.preferredDate} ({srv.timeSlot})</strong></p>
                <p style={{ marginTop: '4px' }}>👨‍🔧 Technician: <strong>{srv.technicianAssigned}</strong></p>
              </div>

              <p style={{ fontSize: '11px', color: theme.textLight, fontStyle: 'italic' }}>
                "{srv.problemDescription}"
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
