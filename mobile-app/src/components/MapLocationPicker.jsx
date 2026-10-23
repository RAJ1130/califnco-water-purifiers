import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

export default function MapLocationPicker({ onSelectAddress, onClose }) {
  const { theme } = useTheme();
  const { user, updateAddress } = useAuth();

  const presets = [
    {
      name: "Bellandur / Green Glen Layout",
      street: "Flat 402, Green Glen Layout, Outer Ring Road",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560103",
      lat: 12.9260,
      lon: 77.6762
    },
    {
      name: "Indiranagar 100ft Road",
      street: "House 28, 4th Cross, Near Metro Station",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560038",
      lat: 12.9784,
      lon: 77.6408
    },
    {
      name: "HSR Layout Sector 2",
      street: "Tower 2, Flat 1104, 27th Main Road",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560102",
      lat: 12.9116,
      lon: 77.6389
    },
    {
      name: "Andheri West, Link Road",
      street: "B-301, Crystal Plaza, New Link Road",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400053",
      lat: 19.1363,
      lon: 72.8277
    },
    {
      name: "Sector 62, Noida Electronic City",
      street: "C-25, Stellar IT Park, Sector 62",
      city: "Noida",
      state: "Uttar Pradesh",
      pincode: "201309",
      lat: 28.6280,
      lon: 77.3649
    }
  ];

  const [selectedPreset, setSelectedPreset] = useState(presets[0]);
  const [street, setStreet] = useState(user.address?.street || presets[0].street);
  const [city, setCity] = useState(user.address?.city || presets[0].city);
  const [state, setState] = useState(user.address?.state || presets[0].state);
  const [pincode, setPincode] = useState(user.address?.pincode || presets[0].pincode);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSelectPreset = (p) => {
    setSelectedPreset(p);
    setStreet(p.street);
    setCity(p.city);
    setState(p.state);
    setPincode(p.pincode);
  };

  const handleConfirm = () => {
    const finalAddress = {
      street,
      city,
      state,
      pincode,
      lat: selectedPreset.lat,
      lon: selectedPreset.lon
    };
    updateAddress(finalAddress);
    if (onSelectAddress) onSelectAddress(finalAddress);
    if (onClose) onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(4px)',
        zIndex: 110,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '480px',
          maxHeight: '90vh',
          overflowY: 'auto',
          backgroundColor: theme.surface,
          borderRadius: '16px',
          border: `1px solid ${theme.border}`,
          boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)'
        }}
      >
        {/* Header */}
        <div style={{ padding: '16px 20px', borderBottom: `1px solid ${theme.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '800', color: theme.text }}>
              📍 OpenStreetMap Location Picker
            </h3>
            <p style={{ fontSize: '11px', color: theme.textMuted }}>
              100% Free OpenStreetMap Geocoding (Zero Credit Card Required)
            </p>
          </div>
          <button
            onClick={onClose}
            style={{ fontSize: '18px', color: theme.textLight, background: 'none', border: 'none', cursor: 'pointer' }}
          >
            ✕
          </button>
        </div>

        {/* OSM Map Preview Canvas */}
        <div style={{ position: 'relative', width: '100%', height: '180px', backgroundColor: '#e2e8f0', overflow: 'hidden' }}>
          <iframe
            title="OpenStreetMap Embed"
            width="100%"
            height="100%"
            frameBorder="0"
            scrolling="no"
            marginHeight="0"
            marginWidth="0"
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${selectedPreset.lon - 0.02}%2C${selectedPreset.lat - 0.02}%2C${selectedPreset.lon + 0.02}%2C${selectedPreset.lat + 0.02}&amp;layer=mapnik&amp;marker=${selectedPreset.lat}%2C${selectedPreset.lon}`}
            style={{ border: 0 }}
          />
          <div style={{
            position: 'absolute',
            bottom: '8px',
            left: '8px',
            backgroundColor: 'rgba(255,255,255,0.92)',
            padding: '3px 8px',
            borderRadius: '4px',
            fontSize: '10px',
            fontWeight: '700',
            color: '#0f172a'
          }}>
            GPS: {selectedPreset.lat.toFixed(4)}°N, {selectedPreset.lon.toFixed(4)}°E
          </div>
        </div>

        {/* Quick Landmarks / Locality Selector */}
        <div style={{ padding: '16px 20px' }}>
          <label style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: theme.textMuted, display: 'block', marginBottom: '8px' }}>
            Select Locality or Quick Pin:
          </label>
          <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '16px' }}>
            {presets.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectPreset(p)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '20px',
                  whiteSpace: 'nowrap',
                  fontSize: '11px',
                  fontWeight: '600',
                  border: `1px solid ${selectedPreset.name === p.name ? theme.primary : theme.border}`,
                  backgroundColor: selectedPreset.name === p.name ? theme.primaryLight : theme.surfaceSubtle,
                  color: selectedPreset.name === p.name ? theme.primaryDark : theme.text,
                  cursor: 'pointer'
                }}
              >
                {p.name.split('/')[0]}
              </button>
            ))}
          </div>

          {/* Form Fields */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div>
              <label style={{ fontSize: '11px', fontWeight: '700', color: theme.textMuted, display: 'block', marginBottom: '4px' }}>
                Flat / House / Street Address:
              </label>
              <input
                type="text"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: `1px solid ${theme.border}`,
                  backgroundColor: theme.surfaceSubtle,
                  color: theme.text,
                  fontSize: '13px',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={{ fontSize: '11px', fontWeight: '700', color: theme.textMuted, display: 'block', marginBottom: '4px' }}>
                  City:
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: `1px solid ${theme.border}`,
                    backgroundColor: theme.surfaceSubtle,
                    color: theme.text,
                    fontSize: '13px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '11px', fontWeight: '700', color: theme.textMuted, display: 'block', marginBottom: '4px' }}>
                  Pincode:
                </label>
                <input
                  type="text"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: `1px solid ${theme.border}`,
                    backgroundColor: theme.surfaceSubtle,
                    color: theme.text,
                    fontSize: '13px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: '14px 20px', borderTop: `1px solid ${theme.border}`, display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button
            onClick={onClose}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: `1px solid ${theme.border}`,
              backgroundColor: 'transparent',
              color: theme.text,
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            style={{
              padding: '8px 18px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: theme.primary,
              color: '#ffffff',
              fontSize: '13px',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            Save Location
          </button>
        </div>
      </div>
    </div>
  );
}
