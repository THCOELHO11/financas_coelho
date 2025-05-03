import React, { useContext, useState } from 'react';
import { GastosContext } from "./GastosContext";

const meses = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
const naturezas = ['CASA', 'COMBUSTÍVEL', 'COMPRAS', 'FARMÁCIA', 'LANCHES', 'MERCADO'];
const cartoes = ['NUBANK', 'C6 BLACK', 'BANESCARD'];

const ContasDoMes = () => {
  const hoje = new Date();
  const [anoAtual, setAnoAtual] = useState(hoje.getFullYear());
  const [mesAtual, setMesAtual] = useState(hoje.getMonth());
  const { gastos, adicionarGasto } = useContext(GastosContext);

  const [form, setForm] = useState({
    descricao: '', valor: '', data: '', cartao: '', natureza: 'MERCADO', parcelado: false, parcelas: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    adicionarGasto(form);
    setForm({ descricao: '', valor: '', data: '', cartao: '', natureza: 'MERCADO', parcelado: false, parcelas: '' });
  };

  const getIntervaloMes = () => {
    const inicio = new Date(anoAtual, mesAtual - 1, 26);
    const fim = new Date(anoAtual, mesAtual, 25);
    return { inicio, fim };
  };

  const calcularTotalMes = () => {
    const { inicio, fim } = getIntervaloMes();
    return gastos
      .filter(d => {
        const data = new Date(d.data);
        return data >= inicio && data <= fim;
      })
      .reduce((total, d) => total + parseFloat(d.valor || 0), 0);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FFD700', color: '#000', padding: '1rem', fontFamily: 'Arial' }}>
      <h1 style={{ textAlign: 'center', textTransform: 'uppercase', fontSize: '1.5rem' }}>Contas do Mês</h1>
      <h2 style={{ textAlign: 'center', fontSize: '1.2rem' }}>{meses[mesAtual]}</h2>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.3rem' }}>
        {meses.map((mes, index) => (
          <button
            key={mes}
            onClick={() => setMesAtual(index)}
            style={{
              backgroundColor: mesAtual === index ? '#FFA500' : '#eee',
              color: mesAtual === index ? '#fff' : '#000',
              padding: '0.4rem 0.8rem',
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

      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <button onClick={() => setAnoAtual(anoAtual - 1)} style={{ marginRight: '0.5rem' }}>◀</button>
        <strong style={{ fontSize: '1rem' }}>{anoAtual}</strong>
        <button onClick={() => setAnoAtual(anoAtual + 1)} style={{ marginLeft: '0.5rem' }}>▶</button>
      </div>

      <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#fff8dc', color: '#000', padding: '1rem', borderRadius: '12px', textAlign: 'center' }}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>DESCRIÇÃO:</label>
          <input type="text" name="descricao" value={form.descricao} onChange={handleChange} style={{ width: '100%', padding: '0.4rem', borderRadius: '6px' }} />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>VALOR:</label>
          <input type="number" name="valor" value={form.valor} onChange={handleChange} style={{ width: '100%', padding: '0.4rem', borderRadius: '6px' }} />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>DATA:</label>
          <input type="date" name="data" value={form.data} onChange={handleChange} style={{ width: '100%', padding: '0.4rem', borderRadius: '6px' }} />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>CARTÃO (opcional):</label>
          <select name="cartao" value={form.cartao} onChange={handleChange} style={{ width: '100%', padding: '0.4rem', borderRadius: '6px' }}>
            <option value="">-- Selecione ou deixe em branco --</option>
            {cartoes.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>NATUREZA:</label>
          <select name="natureza" value={form.natureza} onChange={handleChange} style={{ width: '100%', padding: '0.4rem', borderRadius: '6px' }}>
            {naturezas.map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>
            <input type="checkbox" name="parcelado" checked={form.parcelado} onChange={handleChange} style={{ marginRight: '0.5rem' }} /> Parcelado
          </label>
        </div>

        {form.parcelado && (
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Quantas parcelas?</label>
            <input type="number" name="parcelas" value={form.parcelas} onChange={handleChange} style={{ width: '100%', padding: '0.4rem', borderRadius: '6px' }} />
          </div>
        )}

        <button type="submit" style={{ marginTop: '1rem', padding: '0.5rem 1rem', fontWeight: 'bold', backgroundColor: '#FFA500', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Adicionar</button>
      </form>

      <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '1.3rem' }}>
        <strong>TOTAL GASTO:</strong> {calcularTotalMes().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
      </div>
    </div>
  );
};

export default ContasDoMes;