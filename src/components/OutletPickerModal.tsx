import React, { useState, useEffect, useMemo } from 'react';
import { FACTORY_OUTLETS, FactoryOutlet, calculateDistanceKm, findNearestOutlet, lookupCoordsByQuery } from '../data/outlets';
import { api } from '../services/api';
import { MapPin, Navigation, Clock, Phone, CheckCircle2, Sparkles, X, Store, Search, AlertCircle, Compass, Check } from 'lucide-react';

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
  // Initialize coords from localStorage or fallback
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(() => {
    try {
      const saved = localStorage.getItem('farmers_mill_user_coords');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return null;
  });

  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [locationNote, setLocationNote] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('farmers_mill_location_label');
      if (saved) return saved;
    } catch (e) {}
    return 'Default Hub: MCC Signature Heights, Rajnagar Extension';
  });

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Active reference coordinates (defaults to primary hub MCC Signature Heights, Rajnagar Extension)
  const referenceCoords = useMemo(() => {
    return userCoords || { lat: 28.7058, lng: 77.4265 };
  }, [userCoords]);

  // Compute nearest outlet relative to current reference coordinates
  const nearestResult = useMemo(() => {
    return findNearestOutlet(referenceCoords.lat, referenceCoords.lng);
  }, [referenceCoords]);

  // Sort outlets by distance from user
  const sortedOutlets = useMemo(() => {
    let list = [...FACTORY_OUTLETS].map((outlet) => ({
      ...outlet,
      distance: calculateDistanceKm(referenceCoords.lat, referenceCoords.lng, outlet.latitude, outlet.longitude)
    }));

    if (selectedFilter !== 'all') {
      list = list.filter((o) => o.city.toLowerCase().includes(selectedFilter.toLowerCase()) || o.id === selectedFilter);
    }

    return list.sort((a, b) => a.distance - b.distance);
  }, [referenceCoords, selectedFilter]);

  // On mount or open, if coords don't exist, verify via server location API
  useEffect(() => {
    if (isOpen && !userCoords) {
      api.detectLocation().then((loc) => {
        if (loc && loc.latitude && loc.longitude) {
          const coords = { lat: loc.latitude, lng: loc.longitude };
          setUserCoords(coords);
          const label = `${loc.locality || loc.city || 'Rajnagar Extension, Ghaziabad'} (${loc.pincode || '201017'})`;
          setLocationNote(label);
          try {
            localStorage.setItem('farmers_mill_user_coords', JSON.stringify(coords));
            localStorage.setItem('farmers_mill_location_label', label);
          } catch (e) {}
        }
      }).catch(() => {});
    }
  }, [isOpen, userCoords]);

  // Handle GPS Auto-Detection with robust timeout and fallback
  const handleDetectLocation = () => {
    setIsLocating(true);
    setErrorMessage(null);

    if (!('geolocation' in navigator)) {
      handleFallbackLocation('Geolocation not supported by browser. Showing nearest NCR Hub.');
      return;
    }

    const geoTimeout = setTimeout(() => {
      handleFallbackLocation('Location request timed out. Using MCC Signature Heights, Rajnagar Extension.');
    }, 7000);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        clearTimeout(geoTimeout);
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setUserCoords(coords);
        setIsLocating(false);

        // Find nearest outlet and reverse geocode label
        const nearest = findNearestOutlet(coords.lat, coords.lng);
        const label = `GPS Detected (${coords.lat.toFixed(2)}°, ${coords.lng.toFixed(2)}°) · Nearest: ${nearest.outlet.name.split(',')[0]} (${nearest.distanceKm} km)`;
        setLocationNote(label);
        setErrorMessage(null);

        try {
          localStorage.setItem('farmers_mill_user_coords', JSON.stringify(coords));
          localStorage.setItem('farmers_mill_location_label', label);
        } catch (e) {}
      },
      (error) => {
        clearTimeout(geoTimeout);
        let msg = 'Using primary hub: MCC Signature Heights, Rajnagar Extension.';
        if (error.code === error.PERMISSION_DENIED) {
          msg = 'Location permission was denied. You can enter your 6-digit Pincode below.';
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          msg = 'GPS signal unavailable. Defaulted to MCC Signature Heights Hub.';
        } else if (error.code === error.TIMEOUT) {
          msg = 'GPS request timed out. Defaulted to Rajnagar Extension Hub.';
        }
        handleFallbackLocation(msg);
      },
      {
        enableHighAccuracy: true,
        timeout: 6000,
        maximumAge: 60000
      }
    );
  };

  const handleFallbackLocation = async (note: string) => {
    setIsLocating(false);
    setErrorMessage(note);
    try {
      const serverLoc = await api.detectLocation();
      const coords = {
        lat: serverLoc.latitude || 28.7058,
        lng: serverLoc.longitude || 77.4265
      };
      setUserCoords(coords);
      const label = `${serverLoc.locality || 'MCC Signature Heights, Rajnagar Extension'} (${serverLoc.pincode || '201017'})`;
      setLocationNote(label);
      try {
        localStorage.setItem('farmers_mill_user_coords', JSON.stringify(coords));
        localStorage.setItem('farmers_mill_location_label', label);
      } catch (e) {}
    } catch (e) {
      const coords = { lat: 28.7058, lng: 77.4265 };
      setUserCoords(coords);
      setLocationNote('MCC Signature Heights, Rajnagar Extension (201017)');
    }
  };

  // Handle Search Input (6-digit Pincode or City Name)
  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;

    const resolved = lookupCoordsByQuery(searchQuery.trim());
    if (resolved) {
      const coords = { lat: resolved.lat, lng: resolved.lng };
      setUserCoords(coords);
      setLocationNote(`Delivering to: ${resolved.label}`);
      setErrorMessage(null);
      try {
        localStorage.setItem('farmers_mill_user_coords', JSON.stringify(coords));
        localStorage.setItem('farmers_mill_location_label', `Delivering to: ${resolved.label}`);
      } catch (e) {}
    } else {
      setErrorMessage(`No exact mill found for "${searchQuery}". Showing closest Delhi NCR hub.`);
      // Default to Rajnagar
      setUserCoords({ lat: 28.7058, lng: 77.4265 });
    }
  };

  const handleQuickRegionSelect = (cityKeyword: string, customCoords: { lat: number; lng: number; label: string }) => {
    setUserCoords({ lat: customCoords.lat, lng: customCoords.lng });
    setLocationNote(customCoords.label);
    setErrorMessage(null);
    setSearchQuery('');
    try {
      localStorage.setItem('farmers_mill_user_coords', JSON.stringify({ lat: customCoords.lat, lng: customCoords.lng }));
      localStorage.setItem('farmers_mill_location_label', customCoords.label);
    } catch (e) {}
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 9999 }}>
      <div
        className="modal-content clay-card-static"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '680px',
          width: '94%',
          padding: '24px',
          borderRadius: '24px',
          background: '#FBFDF5',
          maxHeight: '92vh',
          overflowY: 'auto',
          boxSizing: 'border-box'
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
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
              <h2 style={{ fontSize: '20px', color: '#1E2B17', fontWeight: 700, margin: 0, lineHeight: 1.2 }}>
                Select Your Milling Factory Outlet
              </h2>
              <span style={{ fontSize: '13px', color: '#5C6E52' }}>
                Pick where your grains and cold oils are slow-stone milled fresh
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: '#EDF3DF',
              border: '1px solid #D3E0BC',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#1E2B17',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Current Location & GPS Trigger Banner */}
        <div
          className="clay-inset"
          style={{
            padding: '14px 16px',
            marginBottom: '16px',
            borderRadius: '16px',
            background: '#F2F6E6',
            border: '1px solid #D3E0BC',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            flexWrap: 'wrap'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: '220px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: '#3F6B2C',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                flexShrink: 0
              }}
            >
              <MapPin size={16} />
            </div>
            <div>
              <b style={{ fontSize: '13px', color: '#1E2B17', display: 'block', wordBreak: 'break-word' }}>
                {locationNote}
              </b>
              <span style={{ fontSize: '11.5px', color: '#5C6E52' }}>
                Calculated direct straight-line distance to factory mills
              </span>
            </div>
          </div>

          <button
            onClick={handleDetectLocation}
            disabled={isLocating}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: '#3F6B2C',
              color: '#ffffff',
              border: 'none',
              padding: '8px 14px',
              borderRadius: '10px',
              fontSize: '12.5px',
              fontWeight: 600,
              cursor: isLocating ? 'not-allowed' : 'pointer',
              boxShadow: '0 2px 6px rgba(63, 107, 44, 0.25)',
              transition: 'opacity 0.2s ease',
              opacity: isLocating ? 0.7 : 1
            }}
          >
            <Navigation size={14} className={isLocating ? 'animate-spin' : ''} />
            <span>{isLocating ? 'Detecting...' : 'Detect GPS'}</span>
          </button>
        </div>

        {/* Error / Notice Notification if GPS or Search failed */}
        {errorMessage && (
          <div
            style={{
              padding: '10px 14px',
              marginBottom: '14px',
              borderRadius: '12px',
              background: '#FFF5F0',
              border: '1px solid #F5C6BA',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '12px',
              color: '#A23B28'
            }}
          >
            <AlertCircle size={15} style={{ flexShrink: 0 }} />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Pincode & City Search Input */}
        <form onSubmit={handleSearchSubmit} style={{ marginBottom: '14px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: '#ffffff',
              border: '1.5px solid #D3E0BC',
              borderRadius: '12px',
              padding: '4px 6px 4px 12px',
              gap: '8px',
              boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.04)'
            }}
          >
            <Search size={16} style={{ color: '#5C6E52', flexShrink: 0 }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter 6-digit Pincode or City (e.g. 201017, Rajnagar, Noida, Gurugram)..."
              style={{
                border: 'none',
                outline: 'none',
                width: '100%',
                fontSize: '13px',
                color: '#1E2B17',
                background: 'transparent'
              }}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#7E9171',
                  cursor: 'pointer',
                  padding: '4px'
                }}
              >
                <X size={14} />
              </button>
            )}
            <button
              type="submit"
              style={{
                background: '#E1EBCB',
                color: '#1E2B17',
                border: 'none',
                padding: '7px 14px',
                borderRadius: '8px',
                fontSize: '12.5px',
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              Find Mill
            </button>
          </div>
        </form>

        {/* Quick Region Selector Chips */}
        <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '10px', marginBottom: '12px' }}>
          <button
            onClick={() => handleQuickRegionSelect('rajnagar', { lat: 28.7058, lng: 77.4265, label: 'MCC Signature Heights, Rajnagar Extension (201017)' })}
            style={{
              padding: '5px 10px',
              borderRadius: '8px',
              fontSize: '11.5px',
              fontWeight: 600,
              background: userCoords?.lat === 28.7058 ? '#3F6B2C' : '#EDF3DF',
              color: userCoords?.lat === 28.7058 ? '#ffffff' : '#1E2B17',
              border: '1px solid #D3E0BC',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            📍 Rajnagar Ext / Ghaziabad
          </button>
          <button
            onClick={() => handleQuickRegionSelect('noida', { lat: 28.6280, lng: 77.3649, label: 'Sector 62, Noida Electronic City (201309)' })}
            style={{
              padding: '5px 10px',
              borderRadius: '8px',
              fontSize: '11.5px',
              fontWeight: 600,
              background: userCoords?.lat === 28.6280 ? '#3F6B2C' : '#EDF3DF',
              color: userCoords?.lat === 28.6280 ? '#ffffff' : '#1E2B17',
              border: '1px solid #D3E0BC',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            📍 Noida Sec 62
          </button>
          <button
            onClick={() => handleQuickRegionSelect('gurugram', { lat: 28.5034, lng: 77.0865, label: 'Udyog Vihar Phase 4, Gurugram (122016)' })}
            style={{
              padding: '5px 10px',
              borderRadius: '8px',
              fontSize: '11.5px',
              fontWeight: 600,
              background: userCoords?.lat === 28.5034 ? '#3F6B2C' : '#EDF3DF',
              color: userCoords?.lat === 28.5034 ? '#ffffff' : '#1E2B17',
              border: '1px solid #D3E0BC',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            📍 Gurugram Udyog Vihar
          </button>
          <button
            onClick={() => handleQuickRegionSelect('bengaluru', { lat: 12.9719, lng: 77.6412, label: 'Indiranagar 12th Main, Bengaluru (560038)' })}
            style={{
              padding: '5px 10px',
              borderRadius: '8px',
              fontSize: '11.5px',
              fontWeight: 600,
              background: userCoords?.lat === 12.9719 ? '#3F6B2C' : '#EDF3DF',
              color: userCoords?.lat === 12.9719 ? '#ffffff' : '#1E2B17',
              border: '1px solid #D3E0BC',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            📍 Bengaluru Hub
          </button>
        </div>

        {/* Nearest Recommended Mill Highlight Banner */}
        {nearestResult && (
          <div
            style={{
              background: 'linear-gradient(135deg, #1E2B17 0%, #2E4522 100%)',
              color: '#ffffff',
              borderRadius: '16px',
              padding: '12px 16px',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              flexWrap: 'wrap'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Compass size={18} color="#D4A346" />
              <div>
                <span style={{ fontSize: '11px', color: '#D4A346', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Recommended Nearest Mill ({nearestResult.distanceKm} km away)
                </span>
                <div style={{ fontSize: '13.5px', fontWeight: 600, color: '#FBFDF5' }}>
                  {nearestResult.outlet.name}
                </div>
              </div>
            </div>

            {selectedOutlet.id !== nearestResult.outlet.id ? (
              <button
                onClick={() => {
                  onSelectOutlet(nearestResult.outlet);
                  onClose();
                }}
                style={{
                  background: '#D4A346',
                  color: '#1E2B17',
                  border: 'none',
                  padding: '6px 14px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Select Nearest Mill
              </button>
            ) : (
              <span style={{ fontSize: '11.5px', color: '#E1EBCB', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                <Check size={14} /> Currently Selected
              </span>
            )}
          </div>
        )}

        {/* Outlets List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {sortedOutlets.map((outlet) => {
            const isSelected = selectedOutlet.id === outlet.id;
            const isNearest = nearestResult?.outlet.id === outlet.id;

            return (
              <div
                key={outlet.id}
                onClick={() => {
                  onSelectOutlet(outlet);
                  onClose();
                }}
                className={`clay-card ${isSelected ? 'selected-outlet' : ''}`}
                style={{
                  padding: '16px 18px',
                  cursor: 'pointer',
                  borderRadius: '16px',
                  borderColor: isSelected ? '#3F6B2C' : 'rgba(211, 224, 188, 0.7)',
                  borderWidth: isSelected ? '2px' : '1px',
                  borderStyle: 'solid',
                  background: isSelected ? '#F2F6E6' : '#ffffff',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  position: 'relative',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                      <b style={{ fontSize: '15.5px', color: isSelected ? '#3F6B2C' : '#1E2B17' }}>
                        {outlet.name}
                      </b>
                      {outlet.isPrimary && (
                        <span
                          style={{
                            background: '#1E2B17',
                            color: '#FBFDF5',
                            fontSize: '10.5px',
                            fontWeight: 700,
                            padding: '2px 8px',
                            borderRadius: '6px'
                          }}
                        >
                          Primary Hub
                        </span>
                      )}
                      {isNearest && (
                        <span
                          style={{
                            background: '#D4A346',
                            color: '#1E2B17',
                            fontSize: '10.5px',
                            fontWeight: 700,
                            padding: '2px 8px',
                            borderRadius: '6px'
                          }}
                        >
                          Nearest
                        </span>
                      )}
                      <span
                        style={{
                          background: '#E1EBCB',
                          color: '#2E5220',
                          padding: '2px 8px',
                          borderRadius: '6px',
                          fontSize: '11px',
                          fontWeight: 700
                        }}
                      >
                        {outlet.distance} km away
                      </span>
                    </div>

                    <p style={{ fontSize: '13px', color: '#435538', margin: '4px 0 0', lineHeight: 1.4 }}>
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
                    gap: '14px',
                    fontSize: '11.5px',
                    color: '#5C6E52',
                    flexWrap: 'wrap',
                    paddingTop: '6px',
                    borderTop: '1px solid rgba(211, 224, 188, 0.6)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Sparkles size={12} color="#D4A346" />
                    <span>{outlet.speciality}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={12} />
                    <span>{outlet.timing}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Phone size={12} />
                    <span>{outlet.phone}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Notice */}
        <p style={{ fontSize: '11.5px', color: '#7E9171', marginTop: '16px', textAlign: 'center', lineHeight: 1.4 }}>
          Orders are assigned to the selected facility for morning cold milling at slow RPM (&lt;40 RPM) and immediate dispatched packing.
        </p>
      </div>
    </div>
  );
};
