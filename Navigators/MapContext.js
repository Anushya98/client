import React, { createContext, useContext, useState } from 'react';

const MapContext = createContext();

export const MapProvider = ({ children }) => {
  const [locations, setLocations] = useState([]);

  const addLocation = (location) => {
    setLocations((prevLocations) => [...prevLocations, location]);
  };

  const removeLastLocation = () => {
    setLocations((prevLocations) => prevLocations.slice(0, -1));
  };

  return (
    <MapContext.Provider value={{ locations, addLocation, removeLastLocation }}>
      {children}
    </MapContext.Provider>
  );
};

export const useMap = () => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error('useMap must be used within a MapProvider');
  }
  return context;
};
