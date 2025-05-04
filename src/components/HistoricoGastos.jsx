import React, { useContext, useState } from "react";
import { GastosContext } from "../components/GastosContext";
import { Trash2 } from "lucide-react";

const meses = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];
const nomesMeses = ["JANEIRO", "FEVEREIRO", "MARÇO", "ABRIL", "MAIO", "JUNHO", "JULHO", "AGOSTO", "SETEMBRO", "OUTUBRO", "NOVEMBRO", "DEZEMBRO"];
const anos = [2025, 2026, 2027, 2028, 2029, 2030];

const HistoricoGastos = () => {
  const { gastos, removerGasto } = useContext(GastosContext);
  const hoje = new Date();
  const [mesSelecionado, setMesSelecionado] = useState(hoje.getMonth());
  const [anoSelecionado, setAnoSelecionado] = useState(hoje.getFullYear());

  const gastosFiltrados = gastos
    .filter(g => g.mes === mesSelecionado && g.ano === anoSelecionado)
    .sort((a, b) => new Date(b.data) - new Date(a.data));

  return (
    <div style={{ backgroundColor: '#3b4c5a', minHeight: '100vh', padding: '2rem 1rem', color: 'white', textAlign: 'center' }}>
      <h1 style={{ fontSize: "1.5rem", marginBottom: "1.5rem" }}>HISTÓRICO DE GASTOS</h1>

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
              color: '#000',
              padding: '0.4rem 0.6rem',
              borderRadius: '6px',
              fontWeight: 'bold'
            }}>
            {mes}
          </button>
        ))}
      </div>

      <h2 style={{ marginBottom: '1rem' }}>{nomesMeses[mesSelecionado]}</h2>

      <div style={{ marginTop: '2rem', maxWidth: '90%', margin: '0 auto' }}>
        {gastosFiltrados.map((g) => (
          <div key={g.id} style={{ backgroundColor: '#455564', borderRadius: '8px', padding: '0.8rem 1rem', marginBottom: '0.7rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'white', fontSize: '0.95rem' }}>
            <div style={{ textAlign: 'left', lineHeight: '1.3' }}>
              <div><strong>{g.descricao}</strong></div>
              <div>{g.valor}</div>
              <div>{new Date(g.data).toLocaleDateString('pt-BR')}</div>
              <div>{g.cartao || '---'}</div>
              <div>{g.natureza}</div>
              {g.parcelas && <div>{g.parcelas}x</div>}
            </div>
            <button onClick={() => removerGasto(g.id)} style={{ backgroundColor: 'transparent', border: 'none', color: '#ff6b6b', cursor: 'pointer' }}>
              <Trash2 size={20} />
            </button>
          </div>
        ))}
        {gastosFiltrados.length === 0 && <p style={{ marginTop: '2rem' }}>Nenhum gasto registrado neste mês.</p>}
      </div>
    </div>
  );
};

export default HistoricoGastos;
