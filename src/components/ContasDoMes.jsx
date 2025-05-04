import React, { useState, useContext, useEffect } from "react";
import { GastosContext } from "../components/GastosContext";

const meses = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];
const mesesExtenso = ["JANEIRO", "FEVEREIRO", "MARÇO", "ABRIL", "MAIO", "JUNHO", "JULHO", "AGOSTO", "SETEMBRO", "OUTUBRO", "NOVEMBRO", "DEZEMBRO"];
const anos = [2025, 2026, 2027, 2028, 2029, 2030];

const naturezas = ["CASA", "COMBUSTÍVEL", "COMPRAS", "FARMÁCIA", "LANCHES", "MERCADO"];
const cartoes = ["Nenhum", "NUBANK", "C6 BLACK", "BANESCARD"];

const ContasDoMes = () => {
  const { gastos, setGastos } = useContext(GastosContext);
  const [ano, setAno] = useState(new Date().getFullYear());
  const [mes, setMes] = useState(new Date().getMonth());
  const [form, setForm] = useState({
    descricao: "",
    valor: "",
    data: "",
    cartao: "Nenhum",
    natureza: "",
    parcelas: "",
    limite: true
  });
  const [parcelado, setParcelado] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "valor") {
      const numeric = value.replace(/\D/g, "");
      const centavos = (parseInt(numeric || 0) / 100).toFixed(2);
      const formatted = centavos.replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      setForm({ ...form, valor: `R$ ${formatted}` });
    } else {
      setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    }
  };

  const parseNumber = (str) => parseFloat(str.replace(/[^\d,]/g, "").replace(",", ".")) || 0;

  const handleSubmit = () => {
    if (!form.descricao || !form.valor || !form.data || !form.natureza) return;
    setGastos((prev) => [...prev, { ...form, valor: parseNumber(form.valor) }]);
    setForm({ descricao: "", valor: "", data: "", cartao: "Nenhum", natureza: "", parcelas: "", limite: true });
    setParcelado(false);
  };

  const gastosFiltrados = gastos.filter((g) => {
    const data = new Date(g.data);
    return data.getFullYear() === ano && data.getMonth() === mes;
  });

  const total = gastosFiltrados.reduce((acc, g) => acc + parseFloat(g.valor), 0);

  return (
    <div style={{ backgroundColor: "#ffd700", minHeight: "100vh", padding: "2rem", textAlign: "center" }}>
      <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>CONTAS DO MÊS</h1>

      <select value={ano} onChange={(e) => setAno(parseInt(e.target.value))} style={{ padding: "0.5rem", marginBottom: "1rem" }}>
        {anos.map((a) => <option key={a} value={a}>{a}</option>)}
      </select>

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.5rem", marginBottom: "1rem" }}>
        {meses.map((m, i) => (
          <button
            key={m}
            onClick={() => setMes(i)}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: i === mes ? "#ffa500" : "#f0f0f0",
              border: "none",
              borderRadius: "8px",
              fontWeight: "bold"
            }}>
            {m}
          </button>
        ))}
      </div>

      <h2>{mesesExtenso[mes]}</h2>

      <div style={{ maxWidth: "400px", margin: "auto", display: "flex", flexDirection: "column", gap: "1rem" }}>
        <label>DESCRIÇÃO</label>
        <input name="descricao" value={form.descricao} onChange={handleChange} style={{ padding: "0.6rem", borderRadius: "8px" }} />

        <label>VALOR</label>
        <input name="valor" value={form.valor} onChange={handleChange} style={{ padding: "0.6rem", borderRadius: "8px" }} />

        <label>DATA DA COMPRA</label>
        <input type="date" name="data" value={form.data} onChange={handleChange} style={{ padding: "0.6rem", borderRadius: "8px" }} />

        <label>CARTÃO</label>
        <select name="cartao" value={form.cartao} onChange={handleChange} style={{ padding: "0.6rem", borderRadius: "8px" }}>
          {cartoes.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>

        <label>NATUREZA</label>
        <select name="natureza" value={form.natureza} onChange={handleChange} style={{ padding: "0.6rem", borderRadius: "8px" }}>
          <option value="">Selecione a Natureza</option>
          {naturezas.map((n) => <option key={n} value={n}>{n}</option>)}
        </select>

        <label>PARCELAS</label>
        <div style={{ textAlign: "left" }}>
          <input
            type="checkbox"
            checked={parcelado}
            onChange={() => setParcelado(!parcelado)}
            style={{ marginRight: "0.5rem" }}
          /> Possui Parcelas?
          {parcelado && (
            <input
              name="parcelas"
              value={form.parcelas}
              onChange={handleChange}
              placeholder="Nº de Parcelas"
              style={{ marginTop: "0.5rem", padding: "0.6rem", borderRadius: "8px", width: "100%" }}
            />
          )}
        </div>

        <label>
          <input
            type="checkbox"
            name="limite"
            checked={form.limite}
            onChange={handleChange}
            style={{ marginRight: "0.5rem" }}
          /> Contabilizar no Limite Diário?
        </label>

        <button onClick={handleSubmit} style={{ padding: "0.8rem", backgroundColor: "#001f3f", color: "white", fontWeight: "bold", border: "none", borderRadius: "8px" }}>Salvar</button>
      </div>

      <div style={{ marginTop: "2rem", fontWeight: "bold", fontSize: "1.2rem" }}>
        TOTAL GASTO: R$ {total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
      </div>
    </div>
  );
};

export default ContasDoMes;
