import React, { useMemo, useRef } from "react";

export const SongCard = ({ item, key}) => {
  const colors = [
    "bg-red-400",
    "bg-blue-400",
    "bg-green-400",
    "bg-yellow-400",
    "bg-purple-400",
    "bg-pink-400",
    "bg-indigo-400",
    "bg-teal-400",
    "bg-cyan-400",
    "bg-amber-400",
    "bg-lime-400",
    "bg-rose-400",
    "bg-fuchsia-400",
    "bg-sky-400",
    "bg-orange-400",
  ];
  const lastColorRef = useRef(null);

  const randomColor = useMemo(() => {
    let availableColors = colors.filter((color) => color !== lastColorRef.current);
    let newColor = availableColors[Math.floor(Math.random() * availableColors.length)];
    lastColorRef.current = newColor; 
    return newColor;
  }, [key]); 


  return (
    <li key={key} className={`song-card ${randomColor}`}>
      <img
        src={item.result.song_art_image_thumbnail_url}
        alt={item.result.title}
      />

      <div className="content">
        <div>
          {" "}
          <h3>{item.result.title}</h3>
        </div>

        <div className="rating">
        <p>{item.result.primary_artist_names}</p>
          <p>{item.result.release_date_with_abbreviated_month_for_display}</p>
        </div>
      </div>
    </li>
  );
};
