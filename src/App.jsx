import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import CalculadoraRapida from "./components/CalculadoraRapida";
import ContasDoMes from "./components/ContasDoMes";
import GraficoGastos from "./components/GraficoGastos";
import HistoricoGastos from "./components/HistoricoGastos";
import LimiteDiario from "./components/LimiteDiario";
import Login from "./components/Login";
import { GastosProvider } from "./components/GastosContext";
import { Calculator, Plus, PieChart, FileText, Target } from "lucide-react";

const getHighlightColor = (path) => {
  switch (path) {
    case "/calculadora": return "#001f3f";
    case "/contas": return "#ffd700";
    case "/graficos": return "#556b2f";
    case "/historico": return "#7f8fa6";
    case "/limite": return "#3b5998";
    default: return "transparent";
  }
};

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const buttons = [
    { label: "CALCULADORA", path: "/calculadora", icon: <Calculator size={20} /> },
    { label: "CONTAS DO MÊS", path: "/contas", icon: <Plus size={20} /> },
    { label: "GRÁFICOS", path: "/graficos", icon: <PieChart size={20} /> },
    { label: "HISTÓRICO", path: "/historico", icon: <FileText size={20} /> },
    { label: "LIMITE DIÁRIO", path: "/limite", icon: <Target size={20} /> }
  ];

  return (
    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", backgroundColor: "#eee", padding: "0.5rem 0", borderBottom: "2px solid #ccc" }}>
      {buttons.map((btn) => (
        <button
          key={btn.path}
          onClick={() => navigate(btn.path)}
          style={{
            backgroundColor: location.pathname === btn.path ? getHighlightColor(btn.path) : "transparent",
            color: location.pathname === btn.path ? "white" : "black",
            border: "none",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.5rem 1rem",
            borderRadius: "10px",
            fontWeight: "bold",
            fontSize: "0.85rem",
            cursor: "pointer"
          }}
        >
          <span>{btn.label}</span> {btn.icon}
        </button>
      ))}
    </div>
  );
};

const App = () => {
  return (
    <GastosProvider>
      <Router>
        <Login>
          <Sidebar />
          <Routes>
            <Route path="/" element={<CalculadoraRapida />} />
            <Route path="/calculadora" element={<CalculadoraRapida />} />
            <Route path="/contas" element={<ContasDoMes />} />
            <Route path="/graficos" element={<GraficoGastos />} />
            <Route path="/historico" element={<HistoricoGastos />} />
            <Route path="/limite" element={<LimiteDiario />} />
          </Routes>
        </Login>
      </Router>
    </GastosProvider>
  );
};

export default App;
