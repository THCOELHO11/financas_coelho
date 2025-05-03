import React, { createContext, useState } from 'react';

export const GastosContext = createContext();

export const GastosProvider = ({ children }) => {
  const [gastos, setGastos] = useState([]);

  const adicionarGasto = (novo) => {
    setGastos(prev => [...prev, novo]);
  };

  const removerGasto = (index) => {
    setGastos(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <GastosContext.Provider value={{ gastos, adicionarGasto, removerGasto }}>
      {children}
    </GastosContext.Provider>
  );
};