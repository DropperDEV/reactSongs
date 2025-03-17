import { useEffect, useState } from "react";

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;
const AUTH_URL = `https://api.genius.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

function Login() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      fetch("https://genius-auth.onrender.com/get-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
        credentials: "include", // Importante para enviar cookies
      })
        .then((res) => res.json())
        .then(() => setIsAuthenticated(true))
        .catch((err) => console.error(err));
    }
  }, []);

  return (
    <div>
      {!isAuthenticated ? (
        <a href={AUTH_URL}>Login com Genius</a>
      ) : (
        <button onClick={() => fetch("https://genius-auth.onrender.com/logout", { credentials: "include" })}>
          Sair
        </button>
      )}
    </div>
  );
}

export default Login;
