import React from "react";
import { fetchUserData } from "../../hooks/dataManagement/fetchUserData";
import DisplayGrid from "../../components/views/displayGrid/DisplayGrid";
import { ActivityConstructorProps } from "types/structureTypes";
import styles from "./Tops.module.css";

const Tops: React.FC<ActivityConstructorProps> = ({ userID }) => {
  const { albumData, artistData, trackData, error, loading } =
    fetchUserData(userID);

  const formatNumber = (number: number) => new Intl.NumberFormat().format(number);
  const getLargeImage = (images: Array<{ size: string; "#text": string }>) =>
    images.find((image) => image.size === "large")?.["#text"] || "";

  const dataToJSX = (data: any, type: 'artist' | 'album' | 'track') => {
    let items = [];
    switch (type) {
      case 'artist':
        items = data?.topartists.artist.slice(0, 10) || [];
        break;
      case 'album':
        items = data?.topalbums.album.slice(0, 10) || [];
        break;
      case 'track':
        items = data?.toptracks.track.slice(0, 10) || [];
        break;
    }

    return (
      <>
        {items.map((item: any, index: number) => (
          <React.Fragment key={index}>
            <span className={styles.dataNode}>{`${index + 1}. ${item.name} - ${formatNumber(
              +item.playcount
            )} scrobbles`}</span>
            <br />
          </React.Fragment>
        ))}
      </>
    );
  };

  const renderLargeImage = (data: any, type: 'artist' | 'album' | 'track') => {
    let items = [];
    switch (type) {
      case 'artist':
        items = data?.topartists.artist.slice(0, 1) || [];
        break;
      case 'album':
        items = data?.topalbums.album.slice(0, 1) || [];
        break;
      case 'track':
        items = data?.toptracks.track.slice(0, 1) || [];
        break;
    }

    return items.map((item: any, index: number) => (
      <div key={index} className={styles.imageContainer}>
        <img
          src={getLargeImage(item.image)}
          alt={item.name}
          className={styles.largeImage}
        />
        <figcaption className={styles.caption}>{item.name}</figcaption>
      </div>
    ));
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
        </>
      }
      primaryWidth={50}
      secondaryContent={
        <>
          <h2>Top Tracks</h2>
          {dataToJSX(trackData, "track")}
        </>
      }
      primaryContentAnc={renderLargeImage(albumData, "album")}
      secondaryContentAnc={renderLargeImage(trackData, "track")}
    />
  );
};

export default Tops;
