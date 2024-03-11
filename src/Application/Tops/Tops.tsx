import React from "react";
import { fetchUserData } from "../../hooks/dataManagement/fetchUserData";
import DisplayGrid from "../../components/views/displayGrid/DisplayGrid";
import DisplayTable from "../../components/views/displayTable/DisplayTable"; // Ensure this path is correct
import { ActivityConstructorProps } from "types/structureTypes";
import styles from "./Tops.module.css";

const Tops: React.FC<ActivityConstructorProps> = ({ userID }) => {
    const { albumData, artistData, trackData, error, loading } = fetchUserData(userID);

    const formatNumber = (number: number) => new Intl.NumberFormat().format(number);

    const getLargeImage = (images: Array<{ size: string; "#text": string }>) =>
        images.find((image) => image.size === "large")?.["#text"] || "";

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
                <h3></h3>
                <img src={getLargeImage(item.image)} alt={item.name} className={styles.largeImage} />
                <figcaption className={styles.caption}>{item.name}</figcaption>
            </div>
        ));
    };

    const dataToTable = (data: any, type: 'artist' | 'album' | 'track') => {
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

        const tableData = items.map((item: any, index: number) => ([
            `${index + 1}`,
            item.name,
            `${formatNumber(+item.playcount)} scrobbles`,
        ]));

        return <DisplayTable data={tableData} />;
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <><DisplayGrid
            userID={userID}
            title="Top Stats"
            viewFrames={[
                {
                    content: <>
                        {renderLargeImage(artistData, "artist")}
                        <h3>Your Top Artists (of all time)</h3>
                        {dataToTable(artistData, "artist")}
                    </>,
                    viewWidth: 100,
                },
                {
                    content: <>
                        {renderLargeImage(albumData, "album")}
                        <h3>Your Top Albums (of all time)</h3>
                        {dataToTable(albumData, "album")}
                    </>,
                    viewWidth: 100,
                },
            ]} /><DisplayGrid
                viewFrames={[
                    {
                        content: <>
                            {renderLargeImage(trackData, "track")}
                            <h3>Your Top Tracks (of all time)</h3>
                            {dataToTable(trackData, "track")}
                        </>,
                        viewWidth: 100,
                    },
                    {
                        content: <></>,
                        viewWidth: 100,
                    },
                ]} /></>
    );
};

export default Tops;