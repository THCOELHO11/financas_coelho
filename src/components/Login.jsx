import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ children }) => {
  const [input, setInput] = useState("");
  const [autenticado, setAutenticado] = useState(false);
  const [erro, setErro] = useState(false);
  const navigate = useNavigate();

  const senhaCorreta = "11102019";

  const handleClick = (numero) => {
    if (input.length < 8) {
      setInput((prev) => prev + numero);
    }
  };

  const handleLimpar = () => {
    setInput("");
    setErro(false);
  };

  const handleConfirmar = () => {
    if (input === senhaCorreta) {
      setAutenticado(true);
      navigate("/calculadora");
    } else {
      setErro(true);
      setInput("");
    }
  };

  if (autenticado) return children;

  return (
    <div style={{ backgroundColor: "#001f3f", height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", color: "white", padding: "1rem" }}>
      <h1 style={{ marginBottom: "1.5rem", textAlign: "center" }}>FINANÇAS FAMÍLIA COELHO</h1>
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              backgroundColor: i < input.length ? "#FFD700" : "#ccc"
            }}
          ></div>
        ))}
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 60px)",
        gap: "0.75rem",
        justifyContent: "center",
        marginBottom: "1.5rem"
      }}>
        {["1", "2", "3", "4", "5", "6", "7", "8", "9", "⌫", "0", "✓"].map((num, i) => (
          <button
            key={i}
            onClick={() => {
              if (num === "⌫") handleLimpar();
              else if (num === "✓") handleConfirmar();
              else handleClick(num);
            }}
            style={{
              backgroundColor: "#fff",
              color: "#001f3f",
              fontSize: "1.25rem",
              fontWeight: "bold",
              border: "none",
              borderRadius: "10px",
              padding: "0.8rem",
              cursor: "pointer"
            }}
          >
            {num}
          </button>
        ))}
      </div>

      {erro && <p style={{ color: "#ff4d4d", marginTop: "1rem", fontWeight: "bold" }}>Senha incorreta. Tente novamente.</p>}
    </div>
  );
};

export default Login;
