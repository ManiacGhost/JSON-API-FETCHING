import React, { useState } from 'react';
import { SelectedHeadingsContext } from './selectedHeadingsContext'

export const SelectedHeadingsProvider = ({ children }) => {
  const [selectedHeadings, setSelectedHeadings] = useState([]);

  return (
    <SelectedHeadingsContext.Provider value={[selectedHeadings, setSelectedHeadings]}>
      {children}
    </SelectedHeadingsContext.Provider>
  );
};