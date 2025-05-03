import React, { useState } from 'react';

const CalculadoraRapida = () => {
  const [valores, setValores] = useState({
    thiago: '',
    aline: '',
    extra: '',
    c6: '',
    nubank: '',
    banestes: '',
    cea: '',
    aluguel: '',
    energia: '',
    vivo: '',
    internet: '',
    gremio: ''
  });

  const formatCurrencyInput = (input) => {
    const cleaned = input.replace(/\D/g, '');
    const number = parseFloat(cleaned) / 100;
    return isNaN(number)
      ? ''
      : number.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const cleaned = value.replace(/\D/g, '');
    setValores({ ...valores, [name]: cleaned });
  };

  const parseValor = (valor) => parseFloat((parseInt(valor || '0', 10) / 100).toFixed(2));

  const somarReceitas = () =>
    parseValor(valores.thiago) + parseValor(valores.aline) + parseValor(valores.extra);

  const somarDespesas = () =>
    parseValor(valores.c6) + parseValor(valores.nubank) + parseValor(valores.banescard) +
    parseValor(valores.cea) + parseValor(valores.aluguel) + parseValor(valores.energia) +
    parseValor(valores.vivo) + parseValor(valores.internet) + parseValor(valores.gremio);

  const total = somarReceitas() - somarDespesas();

  const campoInput = (label, name) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', alignItems: 'center', gap: '0.5rem' }}>
      <label style={{ fontWeight: 'bold', minWidth: '80px', fontSize: '0.9rem' }}>{label}</label>
      <input
        type="text"
        name={name}
        value={formatCurrencyInput(valores[name])}
        onChange={handleChange}
        style={{ flex: 1, minWidth: '0', padding: '0.4rem', borderRadius: '5px', border: '1px solid #ccc', textAlign: 'right' }}
      />
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#001F3F', padding: '1rem', color: '#fff', fontFamily: 'Arial' }}>
      <h1 style={{ textAlign: 'center', textTransform: 'uppercase', fontSize: '1.5rem' }}>Calculadora Rápida</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center', marginTop: '1rem' }}>
        {/* RECEITAS */}
        <div style={{ backgroundColor: '#ccffcc', padding: '1rem', borderRadius: '10px', width: '100%', maxWidth: '320px', color: '#000' }}>
          <h2 style={{ textAlign: 'center', fontSize: '1.2rem' }}>RECEITAS</h2>
          {campoInput('THIAGO:', 'thiago')}
          {campoInput('ALINE:', 'aline')}
          {campoInput('EXTRA:', 'extra')}
        </div>

        {/* DESPESAS */}
        <div style={{ backgroundColor: '#ffcccc', padding: '1rem', borderRadius: '10px', width: '100%', maxWidth: '320px', color: '#000' }}>
          <h2 style={{ textAlign: 'center', fontSize: '1.2rem' }}>DESPESAS</h2>
          {campoInput('C6 BLACK:', 'c6')}
          {campoInput('NUBANK:', 'nubank')}
          {campoInput('BANESTES:', 'banestes')}
          {campoInput('C&A:', 'cea')}
          {campoInput('ALUGUEL:', 'aluguel')}
          {campoInput('ENERGIA:', 'energia')}
          {campoInput('VIVO:', 'vivo')}
          {campoInput('INTERNET:', 'internet')}
          {campoInput('GRÊMIO:', 'gremio')}
        </div>
      </div>

      {/* TOTAL */}
      <div style={{ marginTop: '2rem', fontSize: '1.2rem', textAlign: 'center' }}>
        <strong style={{ color: '#fff' }}>TOTAL:</strong> {total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })}
      </div>
    </div>
  );
};

export default CalculadoraRapida;