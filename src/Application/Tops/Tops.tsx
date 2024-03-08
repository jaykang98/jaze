// FileName: Tops.tsx
import React, { useEffect, useState } from "react";
import { fetchUserData } from "../../hooks/dataManagement/fetchUserData";
import DisplayGrid from "../../components/views/displayGrid/DisplayGrid";
import { ActivityConstructorProps } from "types/structureTypes";

const Tops: React.FC<ActivityConstructorProps> = ({ userID }) => {
    const { albumData, artistData, trackData, error, loading } = fetchUserData(userID);
  
    // Convert data to JSX elements for rendering
    const dataToJSX = (data, type) => {
      switch (type) {
        case "artist":
          return (
            <ul>
              {data?.topartists.artist.slice(0, 10).map((artist, index) => (
                <li key={index}>{`${index + 1}. ${artist.name}`}</li>
              ))}
            </ul>
          );
        case "album":
          return (
            <ul>
              {data?.topalbums.album.slice(0, 10).map((album, index) => (
                <li key={index}>{`${index + 1}. ${album.artist.name} - ${album.name}`}</li>
              ))}
            </ul>
          );
        case "track":
          return (
            <ul>
              {data?.toptracks.track.slice(0, 10).map((track, index) => (
                <li key={index}>{`${index + 1}. ${track.artist.name} - ${track.name}`}</li>
              ))}
            </ul>
          );
        default:
          return null;
      }
    };
  
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
  
    return (
      <DisplayGrid
        userID={userID}
        title="Top Stats"
        primaryContent={
          <>
            <h2>Top Artists</h2>
            {dataToJSX(artistData, "artist")}
            <h2>Top Albums</h2>
            {dataToJSX(albumData, "album")}
            <h2>Top Tracks</h2>
            {dataToJSX(trackData, "track")}
          </>
        }
        primaryWidth={100}
      />
    );
  };
  
  export default Tops;
  