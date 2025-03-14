import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useDebounce } from "react-use";
import { SongCard } from "./components/SongCard";
import { handleAuthCallback } from "./auth";




function App() {
  const [artist, setArtist] = useState([]);
  const [searchedArtist, setSearchedArtist] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchedArtist, setDebouncedSearchedArtist] = useState("");

  useEffect(() => {
    handleAuthCallback(); 
  }, []);

  useDebounce(() => setDebouncedSearchedArtist(searchedArtist), 500, [
    searchedArtist,
  ]);

  async function fetchSearchedArtist(query) {
    if (!query) return;

    const accessToken = localStorage.getItem("genius_token");

    if (!accessToken) {
      window.location.href = "https://genius-auth-backend.onrender.com/auth/genius";
      return;
    }

    setIsLoading(true);
    setErrorMessage("");
    setArtist([]);

    try {
      const url = `https://api.genius.com/search?q=${encodeURIComponent(query)}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`, // ✅ Autenticação com o token salvo
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem("genius_token"); 
          window.location.href = "https://genius-auth-backend.onrender.com/auth/genius"; 
        }
        setErrorMessage("Algo deu errado ao buscar o artista.");
        return;
      }

      const data = await response.json();
      setArtist(data.response.hits || []);
    } catch (error) {
      setErrorMessage("Falha ao buscar os dados. Tente novamente.");
      console.error("Erro ao buscar dados:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (debouncedSearchedArtist) {
      fetchSearchedArtist(debouncedSearchedArtist);
    }
  }, [debouncedSearchedArtist]);

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <h1>
            react<span>Songs</span>
          </h1>
          <div className="search">
            <div>
              <Search />
              <input
                type="text"
                placeholder="Pesquise por um artista"
                value={searchedArtist}
                onChange={(e) => setSearchedArtist(e.target.value)}
              />
            </div>
          </div>
        </header>
        <section className="all-songs">
          <h2>Resultados da busca</h2>
          {isLoading ? (
            <p>Carregando...</p>
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : artist.length > 0 ? (
            <ul>
              {artist.map((item) => (
                <SongCard item={item} key={item.result.id} />
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">Nenhum resultado encontrado.</p>
          )}
        </section>
      </div>
    </main>
  );
}

export default App;
