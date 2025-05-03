import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState(false);

  const verificarSenha = (e) => {
    e.preventDefault();
    if (senha === '11102019') {
      onLogin();
    } else {
      setErro(true);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f8f8f8',
      fontFamily: 'Arial',
      padding: '2rem'
    }}>
      <h1 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>FINANÇAS FAMÍLIA COELHO</h1>

      <form
        onSubmit={verificarSenha}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          width: '100%',
          maxWidth: '300px'
        }}
      >
        <div style={{ position: 'relative' }}>
          <input
            type={mostrarSenha ? 'text' : 'password'}
            inputMode="numeric"
            placeholder="Digite a senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            style={{
              width: '100%',
              padding: '0.7rem',
              fontSize: '1rem',
              borderRadius: '8px',
              border: '1px solid #ccc',
              textAlign: 'center',
              paddingRight: '2.5rem'
            }}
          />
          <button
            type="button"
            onClick={() => setMostrarSenha(!mostrarSenha)}
            style={{
              position: 'absolute',
              top: '50%',
              right: '0.5rem',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1.2rem'
            }}
            aria-label="Alternar visibilidade da senha"
          >
            {mostrarSenha ? '❌' : '👁️'}
          </button>
        </div>

        {erro && <p style={{ color: 'red', fontSize: '0.9rem', textAlign: 'center' }}>Senha incorreta</p>}

        <button
          type="submit"
          style={{
            padding: '0.7rem',
            backgroundColor: '#001f3f',
            color: '#fff',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;
