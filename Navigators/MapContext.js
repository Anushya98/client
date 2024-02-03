// MapContext.js (or wherever you manage locations)

import React, { createContext, useContext, useReducer } from 'react';

// Define your context and reducer

const MapContext = createContext();

const mapReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_LOCATION':
      return {
        ...state,
        locations: [...state.locations, action.payload],
      };
    // other cases as needed
    default:
      return state;
  }
};

const MapProvider = ({ children }) => {
  const [state, dispatch] = useReducer(mapReducer, { locations: [] });

  const addLocation = (location) => {
    dispatch({ type: 'ADD_LOCATION', payload: location });
  };

  // other functions and state variables as needed

  return (
    <MapContext.Provider
      value={{
        locations: state.locations,
        addLocation,
        // other values as needed
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

const useMap = () => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error('useMap must be used within a MapProvider');
  }
  return context;
};

export { MapProvider, useMap };
