import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faGlobeAmericas, faCalendarAlt, faMusic } from "@fortawesome/free-solid-svg-icons";
import { fetchUserData } from "../../hooks/dataManagement/fetchUserData";
import DisplayGrid from "../../components/views/displayGrid/DisplayGrid";
import DisplayTable from "../../components/views/displayTable/DisplayTable";
import { ActivityConstructorProps } from "../../types/structureTypes";
import styles from "./Tops.module.css";
import { useViewTitle } from "../../contexts/ViewTitleContexts";


const Tops: React.FC<ActivityConstructorProps> = ({ userID }) => {
    const { setTitle } = useViewTitle();

    useEffect(() => {
        setTitle("Tops of ALL TIME"); 
    }, [setTitle]);
    const { userData, albumData, artistData, trackData, error, loading } = fetchUserData(userID);

    const formatNumber = (number: number) => new Intl.NumberFormat().format(number);

    const getLargeImage = (images: Array<{ size: string; "#text": string }>) =>
        images.find((image) => image.size === "large")?.["#text"] || "";
    const userImage = userData?.user?.image?.[0]["#text"];
    const renderLargeImage = (data: any, type: 'artist' | 'album' | 'track') => {
        let items = [];
        switch (type) {
            case 'artist':
                items = data?.topartists?.artist.slice(0, 1) || [];
                break;
            case 'album':
                items = data?.topalbums?.album.slice(0, 1) || [];
                break;
            case 'track':
                items = data?.toptracks?.track.slice(0, 1) || [];
                break;
        }

        return items.map((item: any) => (
            <div key={item.name} className={styles.imageContainer}>
                <img src={getLargeImage(item.image)} alt={item.name} className={styles.largeImage} />
                <figcaption className={styles.caption}>{item.name}</figcaption>
            </div>
        ));
    };

    const dataToTable = (data: any, type: 'artist' | 'album' | 'track') => {
        let items = [];
        switch (type) {
            case 'artist':
                items = data?.topartists?.artist.slice(0, 10) || [];
                break;
            case 'album':
                items = data?.topalbums?.album.slice(0, 10) || [];
                break;
            case 'track':
                items = data?.toptracks?.track.slice(0, 10) || [];
                break;
        }

        return <DisplayTable data={items.map((item: any, index: number) => ([
            `${index + 1}`,
            item.name,
            `${formatNumber(+item.playcount)} scrobbles`,
        ]))} />;
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const renderUserInfo = () => {
        if (!userData || !userData.user) return null;
        const { user } = userData;
        const registrationDate = new Date(user.registered.unixtime * 1000);
        const yearsSinceRegistration = new Date().getFullYear() - registrationDate.getFullYear();

        const dataForDisplay: (string | JSX.Element)[][] = [
            [<FontAwesomeIcon key="name-icon" icon={faUserCircle} />, "Name", user.name],
            [<FontAwesomeIcon key="country-icon" icon={faGlobeAmericas} />, "Country", user.country],
            [<FontAwesomeIcon key="user-since-icon" icon={faCalendarAlt} />, "User Since", registrationDate.toLocaleDateString()],
            [<FontAwesomeIcon key="years-active-icon" icon={faCalendarAlt} />, "Years Active", `${yearsSinceRegistration} years`],
            [<FontAwesomeIcon key="playcount-icon" icon={faMusic} />, "Playcount", Number(user.playcount).toLocaleString()],
        ];

        return (
            <DisplayTable data={dataForDisplay} />
        );
    };

    return (
        <>
            <DisplayGrid
                title="Top Stats"
                userID={userID}
                viewFrames={[
                    {
                        content: <>
                            {renderLargeImage(artistData, "artist")}
                            <h3>Your Top Artists of all time</h3>
                            {dataToTable(artistData, "artist")}
                        </>,
                        viewWidth: 100,
                    },
                    {
                        content: <>
                            {renderLargeImage(albumData, "album")}
                            <h3>Your Top Albums of all time</h3>
                            {dataToTable(albumData, "album")}
                        </>,
                        viewWidth: 100,
                    },

                ]}
            />
            <DisplayGrid
                viewFrames={[
                    {
                        content: <>
                            {renderLargeImage(trackData, "track")}
                            <h3>Your Top Tracks of all time</h3>
                            {dataToTable(trackData, "track")}
                        </>,
                        viewWidth: 100,
                    },
                    {
                        content:
                            <>
                                <div key='userImage' className={styles.imageContainer}>
                                    <img src={userImage} alt="User" className={styles.userImage} />
                                    <figcaption className={styles.caption}>{userData.user.realname}</figcaption>
                                </div>
                                <h3>Who is {userData.user.name}???</h3>
                                {renderUserInfo()}
                            </>,                                
                        viewWidth: 100,
                    },
                ]}
            />
        </>
    );
};

export default Tops;
