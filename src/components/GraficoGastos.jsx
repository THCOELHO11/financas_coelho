import React, { useContext, useState } from "react";
import { GastosContext } from "../components/GastosContext";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#00C49F", "#FFBB28"];
const meses = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];
const nomesMeses = ["JANEIRO", "FEVEREIRO", "MARÇO", "ABRIL", "MAIO", "JUNHO", "JULHO", "AGOSTO", "SETEMBRO", "OUTUBRO", "NOVEMBRO", "DEZEMBRO"];
const anos = [2025, 2026, 2027, 2028, 2029, 2030];

const GraficoGastos = () => {
  const { gastos } = useContext(GastosContext);
  const hoje = new Date();
  const [mesSelecionado, setMesSelecionado] = useState(hoje.getMonth());
  const [anoSelecionado, setAnoSelecionado] = useState(hoje.getFullYear());

  const gastosFiltrados = gastos.filter(g => g.mes === mesSelecionado && g.ano === anoSelecionado);
  const porNatureza = gastosFiltrados.reduce((acc, g) => {
    acc[g.natureza] = (acc[g.natureza] || 0) + parseFloat(g.valor.replace(/[^\d,]/g, '').replace(',', '.'));
    return acc;
  }, {});
  const porCartao = gastosFiltrados.filter(g => g.cartao).reduce((acc, g) => {
    acc[g.cartao] = (acc[g.cartao] || 0) + parseFloat(g.valor.replace(/[^\d,]/g, '').replace(',', '.'));
    return acc;
  }, {});

  const dataNatureza = Object.entries(porNatureza).map(([natureza, valor]) => ({ name: natureza, value: valor }));
  const dataCartao = Object.entries(porCartao).map(([cartao, valor]) => ({ name: cartao, value: valor }));
  const total = dataNatureza.reduce((acc, item) => acc + item.value, 0);

  return (
    <div style={{ backgroundColor: '#c9e4d3', minHeight: '100vh', padding: '2rem 1rem', textAlign: 'center' }}>
      <h1 style={{ fontSize: "1.5rem", marginBottom: "1.5rem" }}>GRÁFICOS DE GASTOS</h1>

      <div>
        <label style={{ fontWeight: 'bold' }}>Ano:</label><br />
        <select value={anoSelecionado} onChange={(e) => setAnoSelecionado(Number(e.target.value))} style={{ margin: '0.5rem 0 1rem', fontSize: '1rem', padding: '0.3rem' }}>
          {anos.map((ano) => (
            <option key={ano} value={ano}>{ano}</option>
          ))}
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '0.5rem', justifyContent: 'center', maxWidth: '500px', margin: '0 auto 1rem' }}>
        {meses.map((mes, index) => (
          <button
            key={mes}
            onClick={() => setMesSelecionado(index)}
            style={{
              backgroundColor: mesSelecionado === index ? '#ffa500' : '#f0f0f0',
              padding: '0.4rem 0.6rem',
              borderRadius: '6px',
              fontWeight: 'bold'
            }}>
            {mes}
          </button>
        ))}
      </div>

      <h2 style={{ marginBottom: '1rem' }}>{nomesMeses[mesSelecionado]}</h2>

      <div style={{ background: '#fff', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', padding: '1rem', margin: '0 auto', maxWidth: '700px' }}>
        <h3 style={{ marginBottom: '1rem' }}>Gastos por Natureza</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={dataNatureza} dataKey="value" cx="50%" cy="50%" outerRadius={100} label={({ name, value }) => `${name}\n${((value/total)*100).toFixed(1)}%\nR$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}>
              {dataNatureza.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div style={{ background: '#fff', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', padding: '1rem', margin: '2rem auto', maxWidth: '700px' }}>
        <h3 style={{ marginBottom: '1rem' }}>Gastos por Cartão</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={dataCartao} layout="vertical" margin={{ left: 50 }}>
            <XAxis type="number" hide />
            <YAxis dataKey="name" type="category" tick={{ fontWeight: 'bold' }} />
            <Bar dataKey="value" fill="#007bff" barSize={15} label={{ position: 'right', formatter: (value) => `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` }} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GraficoGastos;
