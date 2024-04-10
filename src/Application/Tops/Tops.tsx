import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Tops.module.css"
import {
  faGlobeAmericas,
  faCalendarAlt,
  faMusic,
  faUsers,
  faArrowAltCircleUp,
} from "@fortawesome/free-solid-svg-icons";
import DisplayGrid from "../../components/views/displayGrid/DisplayGrid";
import DisplayTable from "../../components/views/displayTable/DisplayTable";
import { ActivityConstructorProps } from "../../types/structureTypes";
import AlbumCard from "../../components/jaze/albumCard/AlbumCard";
import { useLocalStorage } from "../../hooks/utils/useLocalStorage";
import { useViewTitle } from "../../contexts/ViewTitleContexts";
import UserCard from "../../components/jaze/userCard/UserCard";
import { spotifySearch } from "../../hooks/dataManagement/search";

const Tops: React.FC<ActivityConstructorProps> = () => {
    const { getItem } = useLocalStorage();
    const { setTitle } = useViewTitle();

    const albumData = JSON.parse(getItem("lastFMAlbumData"));
    const artistData = JSON.parse(getItem("lastFMArtistData"));
    const trackData = JSON.parse(getItem("lastFMTrackData"));
    const userData = JSON.parse(getItem("lastFMUserData"));
    const userProfile = JSON.parse(getItem("SpotifyUserData"));
    const totalScrobbles = parseInt(userData?.user?.playcount || '0', 10);

    const formatNumber = (number: number) => new Intl.NumberFormat(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(number);
    const formatPercent = (number: number) => new Intl.NumberFormat(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(number);
    useEffect(() => {
        setTitle("Tops");
    }, [setTitle]);

  const getLargeImage = (images: Array<{ size: string; "#text": string }>) => images.find((image) => image.size === "large")?.["#text"] || "";
    const userImage = userProfile?.images?.[1]?.url;

    const renderItemContent = (
        data: any,
        type: "artist" | "album" | "track",
        isTable: boolean = false,
    ) => {
        if (!data || data.length === 0) {
            return <p>No {type} data available.</p>;
        }
        const dataType = type === "artist" ? data?.topartists :
            type === "album" ? data?.topalbums :
                data?.toptracks;
        const items = dataType[type].slice(0, isTable ? 10 : 1);

        const handleLinkClick = async (item: any, event: React.MouseEvent) => {
            event.preventDefault();
                window.location.href = await spotifySearch(type, item.name);
        };

        return isTable ? (
            <DisplayTable
                data={items.map((item: any, index: number) => [
                    `${index + 1}`,
                    <a href="#" onClick={(event) => handleLinkClick(item, event)} className={styles.link}>{item.name}</a>,
                    <a href={item.url} className={styles.link}>{formatNumber(+item.playcount)} scrobbles ({formatPercent(+item.playcount / totalScrobbles * 100)}%)</a>,
                ])}
            />
        ) : (
            items.map((item: any) => (
                <AlbumCard
                    key={item.name}
                    src={getLargeImage(item.image)}
                    alt={item.name}
                    caption={item.name}
                    type={type}
                />
            ))
        );
    };


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
          `${new Date(userData.user.registered?.unixtime * 1000 || Date.now()).toLocaleDateString()} (${new Date().getFullYear() - registrationDate.getFullYear() } years)`,
      ],
        [
            <FontAwesomeIcon key="playcount-icon" icon={faArrowAltCircleUp} />,
        "Total Scrobbles",
          formatNumber(totalScrobbles),
      ],
      [
        <FontAwesomeIcon key="playcount-icon" icon={faUsers} />,
        "Followers",
          formatNumber(parseInt(userProfile?.followers?.total || '0', 10) + parseInt(userData?.user?.subscriber || '0', 10)),
      ],
      [
        <FontAwesomeIcon key="playcount-icon" icon={faMusic} />,
        "Total Scrobbles",
          formatNumber(totalScrobbles),
      ],
    ];

    return <DisplayTable data={dataForDisplay} />;
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
                <h3>Your Top Artists of all time</h3>
                {renderItemContent(artistData, "artist", true)}
              </>
            ),
            viewWidth: 100,
          },
          {
            content: (
              <>
                {renderItemContent(albumData, "album")}
                <h3>Your Top Albums of all time</h3>
                {renderItemContent(albumData, "album", true)}
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
                <h3>Your Top Tracks of all time</h3>
                {renderItemContent(trackData, "track", true)}
              </>
            ),
            viewWidth: 100,
          },
          {
            content: (
              <>
                <UserCard
                  key="userImage"
                  src={userImage}
                  alt="User"
                />
                {renderUserInfo()}
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
