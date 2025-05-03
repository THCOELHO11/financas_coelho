import React, { useState } from "react";

const CalculadoraRapida = () => {
  const [valores, setValores] = useState({
    thiago: "",
    aline: "",
    extra: "",
    c6: "",
    nubank: "",
    banescard: "",
    cea: "",
    aluguel: "",
    energia: "",
    vivo: "",
    internet: "",
    gremio: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const numeric = value.replace(/\D/g, "");
    const centavos = (parseInt(numeric || 0) / 100).toFixed(2);
    const formatted = centavos.replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    setValores({ ...valores, [name]: `R$ ${formatted}` });
  };

  const parseNumber = (str) => parseFloat(str.replace(/[^\d,]/g, "").replace(",", ".")) || 0;

  const total =
    parseNumber(valores.thiago) +
    parseNumber(valores.aline) +
    parseNumber(valores.extra) -
    (parseNumber(valores.c6) +
      parseNumber(valores.nubank) +
      parseNumber(valores.banescard) +
      parseNumber(valores.cea) +
      parseNumber(valores.aluguel) +
      parseNumber(valores.energia) +
      parseNumber(valores.vivo) +
      parseNumber(valores.internet) +
      parseNumber(valores.gremio));

  const boxStyle = {
    width: "100%",
    maxWidth: "300px",
    padding: "1.2rem",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    marginBottom: "2rem",
    textAlign: "left"
  };

  const inputStyle = {
    margin: "0.5rem 0",
    padding: "0.7rem",
    borderRadius: "6px",
    border: "1px solid #ccc",
    width: "100%",
    maxWidth: "240px",
    fontSize: "1rem",
    textAlign: "center"
  };

  const labelStyle = {
    display: "block",
    marginTop: "0.8rem",
    fontWeight: "bold",
    fontSize: "0.95rem",
    color: "#333"
  };

  return (
    <div style={{ backgroundColor: '#001f3f', minHeight: '100vh', padding: '2rem 1rem', color: 'white', textAlign: 'center' }}>
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>CALCULADORA RÁPIDA</h1>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem" }}>
        <div style={{ ...boxStyle, backgroundColor: "#d4f4d4" }}>
          <h2 style={{ color: "#004d00", textAlign: "center" }}>RECEITAS</h2>
          <label style={labelStyle}>THIAGO:</label>
          <input name="thiago" value={valores.thiago} onChange={handleChange} style={inputStyle} />
          <label style={labelStyle}>ALINE:</label>
          <input name="aline" value={valores.aline} onChange={handleChange} style={inputStyle} />
          <label style={labelStyle}>EXTRA:</label>
          <input name="extra" value={valores.extra} onChange={handleChange} style={inputStyle} />
        </div>

        <div style={{ ...boxStyle, backgroundColor: "#ffdada" }}>
          <h2 style={{ color: "#800000", textAlign: "center" }}>DESPESAS</h2>
          <label style={labelStyle}>C6 BLACK:</label>
          <input name="c6" value={valores.c6} onChange={handleChange} style={inputStyle} />
          <label style={labelStyle}>NUBANK:</label>
          <input name="nubank" value={valores.nubank} onChange={handleChange} style={inputStyle} />
          <label style={labelStyle}>BANESCARD:</label>
          <input name="banescard" value={valores.banescard} onChange={handleChange} style={inputStyle} />
          <label style={labelStyle}>C&A:</label>
          <input name="cea" value={valores.cea} onChange={handleChange} style={inputStyle} />
          <label style={labelStyle}>ALUGUEL:</label>
          <input name="aluguel" value={valores.aluguel} onChange={handleChange} style={inputStyle} />
          <label style={labelStyle}>ENERGIA:</label>
          <input name="energia" value={valores.energia} onChange={handleChange} style={inputStyle} />
          <label style={labelStyle}>VIVO:</label>
          <input name="vivo" value={valores.vivo} onChange={handleChange} style={inputStyle} />
          <label style={labelStyle}>INTERNET:</label>
          <input name="internet" value={valores.internet} onChange={handleChange} style={inputStyle} />
          <label style={labelStyle}>GRÊMIO:</label>
          <input name="gremio" value={valores.gremio} onChange={handleChange} style={inputStyle} />
        </div>

        <div style={{ ...boxStyle, backgroundColor: '#e0e0e0', color: '#000', textAlign: 'center' }}>
          <h2 style={{ margin: 0 }}>TOTAL</h2>
          <p style={{ fontSize: '1.6rem', fontWeight: 'bold', margin: 0 }}>R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
        </div>
      </div>
    </div>
  );
};

export default CalculadoraRapida;
