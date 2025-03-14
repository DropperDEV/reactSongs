import React from "react";

export const SongCard = ({ item }) => {
  return (
    <li className="song-card">
      <img
        src={item.result.song_art_image_thumbnail_url}
        alt={item.result.title}
      />

      <div className="mt-4">
        <h3>{item.result.title}</h3>
        <div className="content">
          <div className="rating">
            <p>{item.result.primary_artist_names}</p>
            <p>{item.result.release_date_with_abbreviated_month_for_display}</p>
          </div>
        </div>
      </div>
    </li>
  );
};
