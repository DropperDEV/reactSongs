import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useDebounce } from "react-use";

const API_BASE_URL = "https://api.genius.com";

const API_ACESS_TOKEN = import.meta.env.VITE_API_ACESS_KEY;

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
      const url = `https://cors-anywhere.herokuapp.com/https://api.genius.com/search?q=${encodeURIComponent(
        query
      )}`;

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
    if (debouncedSearchedArtist) {
      fetchSearchedArtist(debouncedSearchedArtist);
    }
  }, [debouncedSearchedArtist]);

  return (
    <div className=" bg-amber-500">
      <header className="flex flex-row gap-4">
        <img src="" alt="logo" />
        <p className="text-amber-500 text-xl">
          react<span className="text-blue-500">Songs</span>
        </p>
        <div className="w-full bg-light-100/5 px-4 py-3 rounded-lg mt-10 max-w-3xl mx-auto">
          <div className="relative flex items-center">
            <Search/>
            <input
              type="text"
              placeholder="Pesquise por um artista"
              value={searchedArtist}
              onChange={(e) => setSearchedArtist(e.target.value)}
              className="w-full bg-transparent py-2 sm:pr-10 pl-10 text-base text-gray-200 placeholder-light-200 outline-hidden"
            />
          </div>
        </div>
      </header>
      <main>
        <p>Resultados da busca</p>
        <ul>
          {isLoading ? (
            <p className="text-white-200">Loading...</p>
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : artist.length > 0 ? (
            artist.map((item) => (
              <li key={item.result.id}>
                <img
                  src={item.result.song_art_image_thumbnail_url}
                  alt={item.result.title}
                />
                <p>{item.result.title}</p>
                <p>{item.result.primary_artist_names}</p>
                <p>
                  {item.result.release_date_with_abbreviated_month_for_display}
                </p>
                <p>{item.result.url}</p>
              </li>
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
