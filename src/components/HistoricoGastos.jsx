import React, { useContext, useState } from 'react';
import { GastosContext } from "./GastosContext";
import { Trash2 } from 'lucide-react';

const meses = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];

const HistoricoGastos = () => {
  const { gastos, removerGasto } = useContext(GastosContext);
  const hoje = new Date();
  const [anoAtual, setAnoAtual] = useState(hoje.getFullYear());
  const [mesAtual, setMesAtual] = useState(hoje.getMonth());

  const getIntervaloMes = () => {
    const inicio = new Date(anoAtual, mesAtual - 1, 26);
    const fim = new Date(anoAtual, mesAtual, 25);
    return { inicio, fim };
  };

  const { inicio, fim } = getIntervaloMes();
  const registrosFiltrados = gastos
    .map((g, index) => ({ ...g, index }))
    .filter(g => {
      const d = new Date(g.data);
      return d >= inicio && d <= fim;
    })
    .sort((a, b) => new Date(b.data) - new Date(a.data));

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#2f3e46', color: '#fff', padding: '1rem', fontFamily: 'Arial' }}>
      <h1 style={{ textAlign: 'center', textTransform: 'uppercase', fontSize: '1.5rem' }}>Histórico de Gastos</h1>
      <h2 style={{ textAlign: 'center', fontSize: '1.2rem' }}>{meses[mesAtual]} / {anoAtual}</h2>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.3rem' }}>
        {meses.map((mes, index) => (
          <button
            key={mes}
            onClick={() => setMesAtual(index)}
            style={{
              backgroundColor: mesAtual === index ? '#1abc9c' : '#ccc',
              color: mesAtual === index ? '#fff' : '#000',
              padding: '0.4rem 0.8rem',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.8rem',
              fontWeight: 'bold'
            }}
          >
            {mes}
          </button>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <button onClick={() => setAnoAtual(anoAtual - 1)} style={{ marginRight: '0.5rem' }}>◀</button>
        <strong style={{ fontSize: '1rem' }}>{anoAtual}</strong>
        <button onClick={() => setAnoAtual(anoAtual + 1)} style={{ marginLeft: '0.5rem' }}>▶</button>
      </div>

      <div style={{ maxWidth: '100%', overflowX: 'auto' }}>
        {registrosFiltrados.length === 0 ? (
          <p style={{ textAlign: 'center', fontSize: '1rem' }}>Nenhum gasto registrado neste ciclo.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <tbody>
              {registrosFiltrados.map((r, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #555' }}>
                  <td style={{ padding: '0.7rem 0.4rem', minWidth: '120px' }}>{r.descricao}</td>
                  <td style={{ padding: '0.7rem 0.4rem' }}>{new Date(r.data).toLocaleDateString('pt-BR')}</td>
                  <td style={{ padding: '0.7rem 0.4rem' }}>{r.natureza}</td>
                  <td style={{ padding: '0.7rem 0.4rem' }}>{r.cartao || '-'}</td>
                  <td style={{ padding: '0.7rem 0.4rem', whiteSpace: 'nowrap' }}>R$ {parseFloat(r.valor).toFixed(2)}</td>
                  <td style={{ padding: '0.7rem 0.4rem', textAlign: 'center' }}>
                    <button onClick={() => removerGasto(r.index)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
                      <Trash2 size={16} color="#e74c3c" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default HistoricoGastos;