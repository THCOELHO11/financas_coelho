import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate, Navigate } from "react-router-dom";
import CalculadoraRapida from "./components/CalculadoraRapida";
import ContasDoMes from "./components/ContasDoMes";
import GraficoGastos from "./components/GraficoGastos";
import HistoricoGastos from "./components/HistoricoGastos";
import LimiteDiario from "./components/LimiteDiario";
import { GastosProvider } from "./components/GastosContext";
import { Calculator, Plus, PieChart, FileText, Target } from "lucide-react";

const Senha = "11102019";

const Login = ({ onLogin }) => {
  const [pin, setPin] = useState("");
  const [erro, setErro] = useState(false);

  const handleDigit = (digit) => {
    if (pin.length < 8) {
      setPin(pin + digit);
      setErro(false);
    }
  };

  const handleDelete = () => {
    setPin(pin.slice(0, -1));
  };

  const handleSubmit = () => {
    if (pin === Senha) {
      onLogin();
    } else {
      setErro(true);
      setPin("");
    }
  };

  const dots = [...Array(8)].map((_, i) => (
    <span
      key={i}
      style={{
        height: "12px",
        width: "12px",
        margin: "0 4px",
        borderRadius: "50%",
        display: "inline-block",
        backgroundColor: i < pin.length ? "#fff" : "#999",
      }}
    />
  ));

  const renderButton = (val, onClick) => (
    <button
      key={val}
      onClick={() => onClick(val)}
      style={{
        width: "60px",
        height: "60px",
        margin: "8px",
        fontSize: "1.4rem",
        borderRadius: "12px",
        backgroundColor: "#fff",
        border: "none",
        boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
      }}
    >
      {val}
    </button>
  );

  return (
    <div style={{ backgroundColor: "#001f3f", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "white" }}>
      <h1 style={{ fontWeight: "bold", fontSize: "1.5rem", marginBottom: "1rem" }}>FINANÇAS FAMÍLIA COELHO</h1>
      <div>{dots}</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginTop: "1rem" }}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => renderButton(n, handleDigit))}
        {renderButton("←", handleDelete)}
        {renderButton(0, handleDigit)}
        {renderButton("✓", handleSubmit)}
      </div>
      {erro && <p style={{ color: "orange", marginTop: "1rem" }}>Senha incorreta. Tente novamente.</p>}
    </div>
  );
};

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    { icon: <Calculator size={20} />, path: "/calculadora" },
    { icon: <Plus size={20} />, path: "/contas" },
    { icon: <PieChart size={20} />, path: "/graficos" },
    { icon: <FileText size={20} />, path: "/historico" },
    { icon: <Target size={20} />, path: "/limite" },
  ];

  return (
    <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", padding: "0.6rem 0.8rem", backgroundColor: "#f5f5f5", borderBottom: "2px solid #ccc" }}>
      {items.map(({ icon, path }) => (
        <button
          key={path}
          onClick={() => navigate(path)}
          style={{
            backgroundColor: location.pathname === path ? "#003366" : "transparent",
            border: "none",
            padding: "0.6rem",
            borderRadius: "12px",
            color: location.pathname === path ? "white" : "black",
            cursor: "pointer"
          }}
        >
          {icon}
        </button>
      ))}
    </div>
  );
};

const AppRoutes = () => (
  <>
    <Sidebar />
    <Routes>
      <Route path="/" element={<Navigate to="/calculadora" />} />
      <Route path="/calculadora" element={<CalculadoraRapida />} />
      <Route path="/contas" element={<ContasDoMes />} />
      <Route path="/graficos" element={<GraficoGastos />} />
      <Route path="/historico" element={<HistoricoGastos />} />
      <Route path="/limite" element={<LimiteDiario />} />
    </Routes>
  </>
);

const App = () => {
  const [logado, setLogado] = useState(false);
  return (
    <GastosProvider>
      <Router>
        {logado ? <AppRoutes /> : <Login onLogin={() => setLogado(true)} />}
      </Router>
    </GastosProvider>
  );
};

export default App;
