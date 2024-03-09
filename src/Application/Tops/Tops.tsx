// FileName: Tops.tsx
import React, { useEffect, useState } from "react";
import { fetchUserData } from "../../hooks/dataManagement/fetchUserData";
import DisplayGrid from "../../components/views/displayGrid/DisplayGrid";
import { ActivityConstructorProps } from "types/structureTypes";
import styles from "./Tops.module.css"; // Assuming this import is correct

const Tops: React.FC<ActivityConstructorProps> = ({ userID }) => {
    const { albumData, artistData, trackData, error, loading } = fetchUserData(userID);

    const formatNumber = (number) => {
        return new Intl.NumberFormat().format(number);
    };

    const dataToJSX = (data, type) => {
        switch (type) {
            case "artist":
                return (
                    <div className={styles.dataNode}>
                        {data?.topartists.artist.slice(0, 10).map((artist, index) => (
                            <React.Fragment key={index}>
                                <span className={styles.dataNode}>{`${index + 1}. ${artist.name} - ${formatNumber(artist.playcount)} scrobbles`}</span>
                                <br />
                            </React.Fragment>
                        ))}
                    </div>
                );
            case "album":
                return (
                    <div className={styles.dataNode}>
                        {data?.topalbums.album.slice(0, 10).map((album, index) => (
                            <React.Fragment key={index}>
                                <span className={styles.dataNode}>{`${index + 1}. ${album.name} - ${formatNumber(album.playcount)} scrobbles`}</span>
                                <br />
                            </React.Fragment>
                        ))}
                    </div>
                );
            case "track":
                return (
                    <div className={styles.dataNode}>
                        {data?.toptracks.track.slice(0, 10).map((track, index) => (
                            <React.Fragment key={index}>
                                <span className={styles.dataNode}>{`${index + 1}. ${track.name} - ${formatNumber(track.playcount)} scrobbles`}</span>
                                <br />
                            </React.Fragment>
                        ))}
                    </div>
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