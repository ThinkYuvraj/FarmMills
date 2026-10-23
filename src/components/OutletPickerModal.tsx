import React, { useState, useEffect } from 'react';
import { FACTORY_OUTLETS, FactoryOutlet, calculateDistanceKm } from '../data/outlets';
import { MapPin, Navigation, Clock, Phone, CheckCircle2, Sparkles, X, ChevronRight, Store } from 'lucide-react';

interface OutletPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedOutlet: FactoryOutlet;
  onSelectOutlet: (outlet: FactoryOutlet) => void;
}

export const OutletPickerModal: React.FC<OutletPickerModalProps> = ({
  isOpen,
  onClose,
  selectedOutlet,
  onSelectOutlet
}) => {
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [locationNote, setLocationNote] = useState<string>('Sharing your location: MCC Signature Heights, Rajnagar Extension');

  // Default to MCC Signature Heights coordinates if user hasn't shared GPS yet
  const referenceCoords = userCoords || { lat: 28.7058, lng: 77.4265 };

  const handleDetectLocation = () => {
    setIsLocating(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserCoords(coords);
          setIsLocating(false);
          setLocationNote(`GPS location detected (${coords.lat.toFixed(2)}°, ${coords.lng.toFixed(2)}°)`);
        },
        () => {
          setIsLocating(false);
          // Fallback location near Rajnagar Extension / NCR
          setUserCoords({ lat: 28.6912, lng: 77.4211 });
          setLocationNote('Sharing your location: MCC Signature Heights, Rajnagar Extension');
        },
        { timeout: 8000 }
      );
    } else {
      setIsLocating(false);
      setLocationNote('Sharing your location: MCC Signature Heights, Rajnagar Extension');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content clay-card-static"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '680px',
          padding: '28px',
          borderRadius: '28px',
          background: '#FBFDF5',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: '#E1EBCB',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#3F6B2C'
              }}
            >
              <Store size={22} />
            </div>
            <div>
              <h2 style={{ fontSize: '22px', color: '#1E2B17', lineHeight: 1.2 }}>
                Select Your Milling Factory Outlet
              </h2>
              <span style={{ fontSize: '13px', color: '#5C6E52' }}>
                Pick where your grains and cold oils are milled fresh
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: '#EDF3DF',
              border: '1px solid #D3E0BC',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#1E2B17'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Current Location / Announcement Banner */}
        <div
          className="clay-inset"
          style={{
            padding: '14px 18px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            flexWrap: 'wrap'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <MapPin size={18} color="#3F6B2C" />
            <div>
              <b style={{ fontSize: '13.5px', color: '#1E2B17', display: 'block' }}>
                {locationNote}
              </b>
              <span style={{ fontSize: '12px', color: '#5C6E52' }}>
                Calculating direct distances from your area to factory outlets
              </span>
            </div>
          </div>

          <button
            onClick={handleDetectLocation}
            disabled={isLocating}
            className="clay-btn-secondary"
            style={{ padding: '8px 16px', fontSize: '12.5px', gap: '6px' }}
          >
            <Navigation size={14} color="#3F6B2C" />
            <span>{isLocating ? 'Locating...' : 'Detect GPS'}</span>
          </button>
        </div>

        {/* Outlets List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {FACTORY_OUTLETS.map((outlet) => {
            const isSelected = selectedOutlet.id === outlet.id;
            const distance = calculateDistanceKm(
              referenceCoords.lat,
              referenceCoords.lng,
              outlet.latitude,
              outlet.longitude
            );

            return (
              <div
                key={outlet.id}
                onClick={() => {
                  onSelectOutlet(outlet);
                  onClose();
                }}
                className={`clay-card ${isSelected ? 'selected-outlet' : ''}`}
                style={{
                  padding: '18px 20px',
                  cursor: 'pointer',
                  borderColor: isSelected ? '#3F6B2C' : 'rgba(211, 224, 188, 0.7)',
                  borderWidth: isSelected ? '2px' : '1.5px',
                  background: isSelected ? '#F2F6E6' : '#FBFDF5',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <b style={{ fontSize: '17px', color: isSelected ? '#3F6B2C' : '#1E2B17' }}>
                        {outlet.name}
                      </b>
                      {outlet.isPrimary && (
                        <span className="clay-badge" style={{ fontSize: '11px', padding: '3px 10px' }}>
                          Primary Hub
                        </span>
                      )}
                      <span
                        style={{
                          background: '#E1EBCB',
                          color: '#2E5220',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          fontSize: '11.5px',
                          fontWeight: 700
                        }}
                      >
                        {distance} km away
                      </span>
                    </div>

                    <p style={{ fontSize: '13.5px', color: '#435538', marginTop: '4px', lineHeight: 1.4 }}>
                      {outlet.address}, {outlet.city}
                    </p>
                  </div>

                  <div
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: isSelected ? '#3F6B2C' : '#EDF3DF',
                      border: '1.5px solid #3F6B2C',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff',
                      flexShrink: 0
                    }}
                  >
                    {isSelected && <CheckCircle2 size={16} />}
                  </div>
                </div>

                {/* Outlet Features & Schedule */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    fontSize: '12px',
                    color: '#5C6E52',
                    flexWrap: 'wrap',
                    paddingTop: '8px',
                    borderTop: '1px solid rgba(211, 224, 188, 0.6)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Sparkles size={13} color="#D4A346" />
                    <span>{outlet.speciality}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={13} />
                    <span>{outlet.timing}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Phone size={13} />
                    <span>{outlet.phone}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info */}
        <p style={{ fontSize: '12px', color: '#7E9171', marginTop: '18px', textAlign: 'center' }}>
          Orders are routed directly to the selected mill for same-day slow stone milling and immediate dispatched packing.
        </p>
      </div>
    </div>
  );
};
