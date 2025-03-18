import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useDebounce } from "react-use";
import { SongCard } from "./components/SongCard";
import Login from "./components/Login";

//const API_ACESS_TOKEN = import.meta.env.VITE_API_ACESS_KEY;

/*const API_CONFIG = {
  method: "GET",
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${API_ACESS_TOKEN}`,
  },
};*/

function App() {
  const [artist, setArtist] = useState([]);
  const [searchedArtist, setSearchedArtist] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchedArtist, setDebouncedSearchedArtist] = useState("");

  useDebounce(() => setDebouncedSearchedArtist(searchedArtist), 500, [
    searchedArtist,
  ]);

  async function fetchSearchedArtist(query) {
    if (!query) return;

    setIsLoading(true);
    setErrorMessage("");
    setArtist([]);

    try {
      /*const url = `https://cors-anywhere.herokuapp.com/https://api.genius.com/search?q=${encodeURIComponent(
        query
      )}`;

      const response = await fetch(url, API_CONFIG);*/
      const response = await fetch(`https://genius-auth.onrender.com/search?q=${encodeURIComponent(query)}`, {
        method: "GET",
        credentials: "include", 
      });

      const data = await response.json();
      console.log(data.response)
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
        <Login/>
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
