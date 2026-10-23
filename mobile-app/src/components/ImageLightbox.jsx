import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function ImageLightbox({ image, title, onClose }) {
  const { theme } = useTheme();
  const [zoomLevel, setZoomLevel] = useState(1);

  if (!image) return null;

  const handleToggleZoom = () => {
    setZoomLevel(prev => (prev === 1 ? 1.8 : prev === 1.8 ? 2.5 : 1));
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.88)',
        backdropFilter: 'blur(8px)',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}
    >
      {/* Top Bar */}
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '500px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px',
          color: '#ffffff'
        }}
      >
        <div>
          <p style={{ fontSize: '14px', fontWeight: '700' }}>{title}</p>
          <p style={{ fontSize: '11px', color: '#94a3b8' }}>Tap image to zoom ({zoomLevel}x)</p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={handleToggleZoom}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              backgroundColor: 'rgba(255,255,255,0.2)',
              color: '#fff',
              fontSize: '12px',
              fontWeight: '700'
            }}
          >
            🔍 Zoom {zoomLevel}x
          </button>
          <button
            onClick={onClose}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.2)',
              color: '#fff',
              fontSize: '16px',
              fontWeight: '800'
            }}
          >
            ✕
          </button>
        </div>
      </div>

      {/* Image Container */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          handleToggleZoom();
        }}
        style={{
          width: '100%',
          maxWidth: '500px',
          height: '420px',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '16px',
          backgroundColor: '#000',
          cursor: 'zoom-in'
        }}
      >
        <img
          src={image}
          alt={title}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain',
            transform: `scale(${zoomLevel})`,
            transition: 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        />
      </div>
    </div>
  );
}
