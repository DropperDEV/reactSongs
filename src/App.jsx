import { useEffect, useState } from "react";

const API_BASE_URL = "https://api.genius.com";

const API_ACESS_TOKEN = "";

const API_CONFIG = {
  method: "GET",
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${API_ACESS_TOKEN}`,
  },
};

function App() {
  const [artist, setArtist] = useState([]);
  const [searchedArtist, setSearchedArtist] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function fetchSearchedArtist(query) {
    if (!query) return; // Evita requisição desnecessária se o campo estiver vazio

    setIsLoading(true);
    setErrorMessage("");
    setArtist([]);

    try {
      const url = `${API_BASE_URL}/search?q=${encodeURIComponent(query)}`;
      const response = await fetch(url, API_CONFIG);

      if (!response.ok) {
        setErrorMessage("Something went wrong fetching the artist");
        return;
      }

      const data = await response.json();
      setArtist(data.response.hits || []);

    } catch (error) {
      setErrorMessage("Failed to fetch data. Please try again.");
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (searchedArtist) {
      fetchSearchedArtist(searchedArtist);
    }
  }, [searchedArtist]);

  return (
    <div className="App">
      <header>
        <img src="" alt="logo" />
        <p>
          react<span>Songs</span>
        </p>
        <div>
          <input
            type="text"
            placeholder="Pesquise por um artista"
            value={searchedArtist}
            onChange={(e) => setSearchedArtist(e.target.value)}
          />
        </div>
      </header>
      <main>
        <p>Resultados da busca</p>
        <ul>
          {isLoading ? (
            <p className="text-gray-200">Loading...</p>
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : artist.length > 0 ? (
            artist.map((item, index) => (
              <li key={index}>{item.result.full_title}</li>
            ))
          ) : (
            <p className="text-gray-400">Nenhum resultado encontrado.</p>
          )}
        </ul>
      </main>
    </div>
  );
}

export default App;
