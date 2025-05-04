import React, { useContext, useState, useEffect } from "react";
import { GastosContext } from "../components/GastosContext";

const LimiteDiario = () => {
  const { gastos } = useContext(GastosContext);
  const [limites, setLimites] = useState([]);
  const [novoLimite, setNovoLimite] = useState({ valor: "", inicio: "", fim: "" });
  const [anoSelecionado, setAnoSelecionado] = useState(new Date().getFullYear());
  const [mesSelecionado, setMesSelecionado] = useState(new Date().getMonth());

  const meses = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];

  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name === "valor") {
      const numeric = value.replace(/\D/g, "");
      const centavos = (parseInt(numeric || 0) / 100).toFixed(2);
      const formatted = centavos.replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      setNovoLimite({ ...novoLimite, valor: `R$ ${formatted}` });
    } else {
      setNovoLimite({ ...novoLimite, [name]: value });
    }
  };

  const salvarLimite = () => {
    const inicio = new Date(novoLimite.inicio);
    const fim = new Date(novoLimite.fim);
    if (!isNaN(inicio) && !isNaN(fim)) {
      inicio.setDate(inicio.getDate() + 1);
      fim.setDate(fim.getDate() + 1);
      const novo = { ...novoLimite, inicio: inicio.toISOString(), fim: fim.toISOString(), mes: mesSelecionado, ano: anoSelecionado };
      setLimites((prev) => [...prev, novo]);
      setNovoLimite({ valor: "", inicio: "", fim: "" });
    }
  };

  const removerLimite = (index) => {
    setLimites((prev) => prev.filter((_, i) => i !== index));
  };

  const calcularSaldo = () => {
    const hoje = new Date();
    let saldo = 0;
    limites.forEach((limite) => {
      const inicio = new Date(limite.inicio);
      const fim = new Date(limite.fim);
      if (limite.ano === anoSelecionado && limite.mes === mesSelecionado && hoje >= inicio && hoje <= fim) {
        let diasDecorridos = 0;
        for (let d = new Date(inicio); d <= hoje; d.setDate(d.getDate() + 1)) diasDecorridos++;
        const valorDia = parseFloat(limite.valor.replace(/[^\d,]/g, "").replace(",", ".")) || 0;
        saldo += diasDecorridos * valorDia;
      }
    });
    const gastosDia = gastos.filter((g) => {
      const data = new Date(g.data);
      return g.limite && data.getFullYear() === anoSelecionado && data.getMonth() === mesSelecionado;
    });
    const totalGasto = gastosDia.reduce((sum, g) => sum + (parseFloat(g.valor.replace(/[^\d,]/g, "").replace(",", ".")) || 0), 0);
    return saldo - totalGasto;
  };

  return (
    <div style={{ backgroundColor: "#d9e6fc", minHeight: "100vh", padding: "2rem 1rem", textAlign: "center" }}>
      <h1 style={{ fontSize: "1.5rem", marginBottom: "1.5rem" }}>LIMITE DIÁRIO</h1>

      <div style={{ marginBottom: "1rem" }}>
        <select value={anoSelecionado} onChange={(e) => setAnoSelecionado(parseInt(e.target.value))}>
          {[2025, 2026, 2027, 2028, 2029, 2030].map((ano) => (
            <option key={ano} value={ano}>{ano}</option>
          ))}
        </select>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.5rem" }}>
        {meses.map((mes, i) => (
          <button
            key={mes}
            onClick={() => setMesSelecionado(i)}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "8px",
              backgroundColor: mesSelecionado === i ? "orange" : "#eee",
              border: "none",
              fontWeight: "bold",
              width: "60px"
            }}>
            {mes}
          </button>
        ))}
      </div>

      <div style={{ background: "white", padding: "2rem", borderRadius: "16px", marginTop: "2rem", maxWidth: "400px", margin: "2rem auto" }}>
        <h2>Limite Diário</h2>
        <input
          name="valor"
          placeholder="Valor diário"
          value={novoLimite.valor}
          onChange={handleInput}
          style={{ width: "100%", marginBottom: "1rem", padding: "0.8rem", fontSize: "1rem" }}
        />
        <input
          type="date"
          name="inicio"
          value={novoLimite.inicio}
          onChange={handleInput}
          style={{ width: "100%", marginBottom: "1rem", padding: "0.8rem", fontSize: "1rem" }}
        />
        <input
          type="date"
          name="fim"
          value={novoLimite.fim}
          onChange={handleInput}
          style={{ width: "100%", marginBottom: "1rem", padding: "0.8rem", fontSize: "1rem" }}
        />
        <button onClick={salvarLimite} style={{ padding: "0.6rem 2rem", backgroundColor: "#001f3f", color: "white", border: "none", borderRadius: "8px" }}>Salvar</button>
      </div>

      {limites.filter(l => l.ano === anoSelecionado && l.mes === mesSelecionado).map((limite, index) => (
        <div key={index} style={{ backgroundColor: '#fff', margin: '1rem auto', padding: '1rem', maxWidth: '500px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 'bold' }}>
          <span>{new Date(limite.inicio).toLocaleDateString()} a {new Date(limite.fim).toLocaleDateString()}</span>
          <span>{limite.valor}</span>
          <button onClick={() => removerLimite(index)} style={{ background: 'transparent', border: 'none', color: 'red', fontSize: '1.2rem' }}>🗑</button>
        </div>
      ))}

      {limites.some(l => l.ano === anoSelecionado && l.mes === mesSelecionado) && (
        <div style={{ backgroundColor: '#fff', padding: '1rem', borderRadius: '12px', margin: '2rem auto', maxWidth: '300px' }}>
          <h3>SALDO DISPONÍVEL</h3>
          <p style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>R$ {calcularSaldo().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
        </div>
      )}
    </div>
  );
};

export default LimiteDiario;
