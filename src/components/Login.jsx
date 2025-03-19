import { useEffect, useState } from "react";

function Login({ setIsAuthenticated, isAuthenticated }) {
  const [account, setAccount] = useState(null); // Altere o estado de 'account' para null inicialmente

  // Checa se o usuário está autenticado e pega dados da conta apenas uma vez
  useEffect(() => {
    fetch("http://localhost:5000/check-auth", {
      credentials: "include", // Envia o cookie de autenticação
    })
      .then((res) => res.json())
      .then((data) => {
        setIsAuthenticated(data.isAuthenticated);
      })
      .catch((err) => console.error("Erro ao verificar autenticação:", err));

    if (isAuthenticated) {
      // Apenas busca dados da conta se o usuário estiver autenticado
      fetch("http://localhost:5000/account-info", {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => setAccount(data.response.user))
        .catch((err) => console.error("Erro ao pegar os dados da conta:", err));
    }
  }, [isAuthenticated, setIsAuthenticated]); // Atualize o efeito para não criar loop infinito

  // Lida com a ação de logout
  function onClickHandler() {
    fetch("http://localhost:5000/logout", {
      credentials: "include", // Envia o cookie de autenticação
    })
      .then(() => {
        setIsAuthenticated(false); // Atualiza o estado após logout
        window.location.reload()

      })
      .catch((err) => console.error("Erro ao fazer logout:", err));
  }

  return (
    <div className="sessionArea">
      {account && <img src={account.avatar.medium.url} alt="Account image" />}
      <p>{account && account.name }</p>
      {!isAuthenticated ? (
        // Se não autenticado, exibe o link de login
        <a href="http://localhost:5000/login">Entrar</a>
      ) : (
        <button onClick={onClickHandler}>Sair</button>
      )}
    </div>
  );
}

export default Login;
