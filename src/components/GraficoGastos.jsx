import React, { useContext, useState } from 'react';
import { GastosContext } from "./GastosContext";
import {
  PieChart, Pie, Cell, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Label
} from 'recharts';

const meses = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];

const GraficoGastos = () => {
  const { gastos } = useContext(GastosContext);
  const hoje = new Date();
  const [anoAtual, setAnoAtual] = useState(hoje.getFullYear());
  const [mesAtual, setMesAtual] = useState(hoje.getMonth());

  const cores = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];

  const getIntervaloMes = () => {
    const inicio = new Date(anoAtual, mesAtual - 1, 26);
    const fim = new Date(anoAtual, mesAtual, 25);
    return { inicio, fim };
  };

  const filtrarGastos = () => {
    const { inicio, fim } = getIntervaloMes();
    return gastos.filter(g => {
      const data = new Date(g.data);
      return data >= inicio && data <= fim;
    });
  };

  const dadosFiltrados = filtrarGastos();

  const dadosPorNatureza = Object.values(
    dadosFiltrados.reduce((acc, g) => {
      acc[g.natureza] = acc[g.natureza] || { nome: g.natureza, valor: 0 };
      acc[g.natureza].valor += parseFloat(g.valor || 0);
      return acc;
    }, {})
  );

  const totalGeral = dadosPorNatureza.reduce((soma, item) => soma + item.valor, 0);
  const dadosPizza = dadosPorNatureza.map((item, index) => ({
    ...item,
    cor: cores[index % cores.length],
    percentual: ((item.valor / totalGeral) * 100).toFixed(1) + '%'
  }));

  const dadosPorCartao = Object.values(
    dadosFiltrados.reduce((acc, g) => {
      const key = g.cartao || 'Outros';
      acc[key] = acc[key] || { cartao: key, valor: 0 };
      acc[key].valor += parseFloat(g.valor || 0);
      return acc;
    }, {})
  );

  const renderCustomLabel = ({ cx, cy, midAngle, outerRadius, index }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 30;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    const entry = dadosPizza[index];

    return (
      <text x={x} y={y} fill="#333" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize={12}>
        <tspan x={x} dy="-1.2em">{entry.nome}</tspan>
        <tspan x={x} dy="1.2em">{entry.percentual}</tspan>
        <tspan x={x} dy="1.2em">R$ {entry.valor.toFixed(2)}</tspan>
      </text>
    );
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#c8e6c9', color: 'black', padding: '1rem', fontFamily: 'Arial' }}>
      <h1 style={{ textAlign: 'center', textTransform: 'uppercase', fontSize: '1.5rem' }}>Gráfico de Gastos</h1>
      <h2 style={{ textAlign: 'center', fontSize: '1.2rem' }}>{meses[mesAtual]}</h2>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.3rem' }}>
        {meses.map((mes, index) => (
          <button
            key={mes}
            onClick={() => setMesAtual(index)}
            style={{
              backgroundColor: mesAtual === index ? '#2e8b57' : '#ccc',
              color: mesAtual === index ? '#fff' : '#000',
              padding: '0.4rem 0.7rem',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '0.8rem'
            }}
          >
            {mes}
          </button>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <button onClick={() => setAnoAtual(anoAtual - 1)} style={{ marginRight: '0.5rem' }}>◀</button>
        <strong style={{ fontSize: '1rem' }}>{anoAtual}</strong>
        <button onClick={() => setAnoAtual(anoAtual + 1)} style={{ marginLeft: '0.5rem' }}>▶</button>
      </div>

      <div style={{ width: '100%', maxWidth: '100%', margin: '0 auto' }}>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={dadosPizza}
              dataKey="valor"
              nameKey="nome"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={renderCustomLabel}
              labelLine={true}
            >
              {dadosPizza.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.cor} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `R$ ${value.toFixed(2)}`} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div style={{ width: '100%', maxWidth: '100%', margin: '2rem auto' }}>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart
            data={dadosPorCartao}
            layout="vertical"
            margin={{ top: 20, right: 20, left: 30, bottom: 5 }}
            barCategoryGap={30}
            barSize={12}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" hide />
            <YAxis dataKey="cartao" type="category" width={80} tick={{ fontWeight: 'bold', fontSize: 12 }} />
            <Tooltip formatter={(value) => `R$ ${value.toFixed(2)}`} />
            <Bar dataKey="valor" fill="#4caf50">
              <Label dataKey="valor" position="right" formatter={(value) => `R$ ${value.toFixed(2)}`} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GraficoGastos;