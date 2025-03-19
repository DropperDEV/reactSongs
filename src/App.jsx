import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useDebounce } from "react-use";
import { SongCard } from "./components/SongCard";
import Login from "./components/Login";

function App() {
  const [artist, setArtist] = useState([]);
  const [searchedArtist, setSearchedArtist] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchedArtist, setDebouncedSearchedArtist] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useDebounce(() => setDebouncedSearchedArtist(searchedArtist), 500, [
    searchedArtist,
  ]);

  async function fetchSearchedArtist(query) {
    if (!query) return;

    setIsLoading(true);
    setErrorMessage("");
    setArtist([]);

    try {
      const response = await fetch(
        `http://localhost:5000/search?q=${encodeURIComponent(query)}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await response.json();
      console.log(data.response);
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
      <aside>
        <header>
          <h1>
            <span>react</span>Songs
          </h1>
          <div className="search">
            <Search />
            <input
              type="text"
              placeholder="Pesquise por um artista"
              value={searchedArtist}
              onChange={(e) => setSearchedArtist(e.target.value)}
            />
          </div>
        </header>
        <Login
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
        />
      </aside>
      <section className="all-songs">
        <h2>Resultados da busca</h2>
        {isLoading ? (
          <p className="text-white-200">Carregando...</p>
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
    </main>
  );
}

export default App;
