//import { useState } from "react";

function App() {
  //const [songs, setSongs] = useState([]);
  return (
    <div className="">
      <header>
        <img src="" alt="logo" />
        <p>
          react<span>Songs</span>
        </p>
        <div>
          <input type="text" placeholder="Pesquise por uma música" />
        </div>
      </header>
      <main>
        <p>Todas as músicas</p>
        <ul>
          {/* {songs.map((song) => (
            <div>
              <img src="" alt="song img" />
              <p>Artist</p>
              <p>Song name</p>
              <p>Song year</p>
            </div>
          ))} */}
        </ul>
      </main>
    </div>
  );
}

export default App;
