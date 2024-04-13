import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Tops.module.css";
import {
    faGlobeAmericas,
    faCalendarAlt,
    faUsers,
    faArrowAltCircleUp,
    IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import DisplayTable from "../../components/structure/viewChildren/displayTable/DisplayTable";
import DisplayGrid from "../../components/structure/viewChildren/displayGrid/DisplayGrid";
import { ActivityConstructorProps } from "../../types/structureTypes";
import AlbumCard from "../../components/jaze/albumCard/AlbumCard";
import { useLocalStorage } from "../../hooks/utils/useLocalStorage";
import { useViewTitle } from "../../contexts/ViewTitleContexts";
import UserCard from "../../components/jaze/userCard/UserCard";
import { spotifySearch } from "../../hooks/dataManagement/search";
import { faSpotify, faSquareLastfm } from "@fortawesome/free-brands-svg-icons";

const Tops: React.FC<ActivityConstructorProps> = () => {
    const { getItem } = useLocalStorage();
    const { setTitle } = useViewTitle();

    const albumData = JSON.parse(getItem("lastFMAlbumData"));
    const artistData = JSON.parse(getItem("lastFMArtistData"));
    const trackData = JSON.parse(getItem("lastFMTrackData"));
    const userData = JSON.parse(getItem("lastFMUserData"));
    const userProfile = JSON.parse(getItem("SpotifyUserData"));
    const totalScrobbles = parseInt(userData?.user?.playcount || "0", 10);

    const formatNumber = (number: number) =>
        new Intl.NumberFormat(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(number);
    const formatPercent = (number: number) =>
        new Intl.NumberFormat(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(number);
    useEffect(() => {
        setTitle("Tops");
    }, [setTitle]);

    const getLargeImage = (images: Array<{ size: string; "#text": string }>) =>
        images.find((image) => image.size === "large")?.["#text"] || "";
    const userImage = userProfile?.images?.[1]?.url;
    const renderUserInfo = () => {
        if (!userData || !userData.user) return <p>No data available.</p>;

        const registrationDate = new Date(
            userData.user.registered?.unixtime * 1000 || Date.now(),
        );

        const dataForDisplay = [
            [
                <FontAwesomeIcon key="country-icon" icon={faGlobeAmericas} />,
                "Country",
                userData.user.country,
            ],
            [
                <FontAwesomeIcon key="user-since-icon" icon={faCalendarAlt} />,
                "User Since",
                `${new Date(userData.user.registered?.unixtime * 1000 || Date.now()).toLocaleDateString()} (${new Date().getFullYear() - registrationDate.getFullYear()} years)`,
            ],
            [
                <FontAwesomeIcon key="playcount-icon" icon={faArrowAltCircleUp} />,
                "Total Scrobbles",
                formatNumber(totalScrobbles),
            ],
            [
                <FontAwesomeIcon key="playcount-icon" icon={faUsers} />,
                "Followers",
                formatNumber(
                    parseInt(userProfile?.followers?.total || "0", 10) +
                    parseInt(userData?.user?.subscriber || "0", 10),
                ),
            ],
        ];

        return <DisplayTable data={dataForDisplay} />;
    };

    const renderItemContent = (
        data: any,
        type: "artist" | "album" | "track",
        isTable: boolean = false,
    ) => {
        if (!data || data.length === 0) {
            return <p>No {type} data available.</p>;
        }

        const dataType =
            type === "artist"
                ? data?.topartists
                : type === "album"
                    ? data?.topalbums
                    : data?.toptracks;
        const items = dataType[type].slice(0, isTable ? 10 : 9);

        const handleLinkClick = async (item: any, event: React.MouseEvent) => {
            event.preventDefault();
            window.location.href = await spotifySearch(type, item.name);
        };

        return isTable
            ? renderTable(items, handleLinkClick)
            : renderGrid(items, type);
    };

    const renderTable = (items, handleLinkClick) => (
        <DisplayTable
            data={items.map((item: any, index: number) => [
                `${index + 1}`,
                <span>{item.name}</span>,
                <span className={styles.link}>
                    {formatNumber(+item.playcount)} scrobbles (
                    {formatPercent((+item.playcount / totalScrobbles) * 100)}%)
                </span>,
                <FontAwesomeIcon
                    href="#"
                    icon={faSpotify as IconDefinition}
                    onClick={(event) => handleLinkClick(item, event)}
                    className="styles.faIcon"
                ></FontAwesomeIcon>,
                <FontAwesomeIcon
                    icon={faSquareLastfm as IconDefinition}
                    onClick={(_event) => (window.location.href = item.url)}
                    className="styles.faIcon"
                ></FontAwesomeIcon>,
            ])}
        />
    );
    const renderGrid = (items, type) => {
        const sliceRanges = {
            track: [0, 3],
            artist: [3, 6],
            album: [6, 9],
        };

        return (
            <div className={styles.albumContainer}>
                {items.slice(...sliceRanges[type]).map((item: any) => (
                    <AlbumCard
                        key={item.name}
                        src={getLargeImage(item?.image)}
                        alt={item.name}
                        caption={item.name}
                        type={type}
                    />
                ))}
            </div>
        );
    };

    return (
        <>
            <DisplayGrid
                title="Top Stats"
                viewFrames={[
                    {
                        content: (
                            <>
                                {renderItemContent(artistData, "artist")}
                                {renderItemContent(artistData, "artist", true)}
                                <h3>Your Top Artists</h3>
                                <h1>of all time</h1>
                            </>
                        ),
                        viewWidth: 100,
                    },
                    {
                        content: (
                            <>
                                {renderItemContent(albumData, "album")}
                                {renderItemContent(albumData, "album", true)}
                                <h3>Your Top Albums</h3>
                                <h1>of all time</h1>
                            </>
                        ),
                        viewWidth: 100,
                    },
                ]}
            />

            <DisplayGrid
                viewFrames={[
                    {
                        content: (
                            <>
                                {renderItemContent(trackData, "track")}
                                {renderItemContent(trackData, "track", true)}
                                <h3>Your Top Tracks </h3>
                                <h1>of all time</h1>
                            </>
                        ),
                        viewWidth: 100,
                    },
                    {
                        content: (
                            <>
                                <div className={styles.albumContainer}>
                                    <UserCard key="userImage" src={userImage} alt="User" />
                                    {renderUserInfo()}
                                </div>
                                <h3>Your Profile</h3>
                                <h1>Information</h1>
                            </>
                        ),
                        viewWidth: 100,
                    },
                ]}
            />
        </>
    );
};

export default Tops;
