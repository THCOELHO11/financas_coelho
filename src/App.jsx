import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import CalculadoraRapida from './components/CalculadoraRapida';
import ContasDoMes from './components/ContasDoMes';
import GraficoGastos from './components/GraficoGastos';
import HistoricoGastos from './components/HistoricoGastos';
import Login from './components/Login';
import { GastosProvider } from "./components/GastosContext";

const getHighlightColor = (path) => {
  switch (path) {
    case '/': return '#001f3f';
    case '/despesas': return '#FFD700';
    case '/grafico': return '#c8e6c9';
    case '/historico': return '#2f3e46';
    default: return 'transparent';
  }
};

const Sidebar = () => {
  const location = useLocation();

  const getStyle = (path) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '60px',
    marginBottom: '0.5rem',
    backgroundColor: location.pathname === path ? getHighlightColor(path) : 'transparent',
    borderLeft: location.pathname === path ? '4px solid #000' : '4px solid transparent',
    transition: 'all 0.3s',
    fontSize: '24px',
    color: '#000',
    textDecoration: 'none'
  });

  return (
    <div style={{
      width: '60px',
      backgroundColor: '#f0f0f0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: '1rem',
      height: '100vh',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 1000
    }}>
      <Link to="/" style={getStyle('/')}>🧮</Link>
      <Link to="/despesas" style={getStyle('/despesas')}>➕</Link>
      <Link to="/grafico" style={getStyle('/grafico')}>📊</Link>
      <Link to="/historico" style={getStyle('/historico')}>📋</Link>
    </div>
  );
};

const AppRoutes = () => (
  <div style={{ display: 'flex' }}>
    <Sidebar />
    <div style={{ marginLeft: '60px', flex: 1 }}>
      <Routes>
        <Route path="/" element={<CalculadoraRapida />} />
        <Route path="/despesas" element={<ContasDoMes />} />
        <Route path="/grafico" element={<GraficoGastos />} />
        <Route path="/historico" element={<HistoricoGastos />} />
      </Routes>
    </div>
  </div>
);

const App = () => {
  const [logado, setLogado] = useState(false);

  return (
    <GastosProvider>
      <Router>
        {!logado ? <Login onLogin={() => setLogado(true)} /> : <AppRoutes />}
      </Router>
    </GastosProvider>
  );
};

export default App;
