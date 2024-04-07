import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faGlobeAmericas,
  faCalendarAlt,
  faMusic,
} from "@fortawesome/free-solid-svg-icons";
import DisplayGrid from "../../components/views/displayGrid/DisplayGrid";
import DisplayTable from "../../components/views/displayTable/DisplayTable";
import { ActivityConstructorProps } from "../../types/structureTypes";
import AlbumCard from "../../components/jaze/albumCard/AlbumCard";
import { useLocalStorage } from "../../hooks/utils/useLocalStorage";
import { useViewTitle } from "../../contexts/ViewTitleContexts";

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
  const userImage = userData?.user?.image?.[0]["#text"];

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
    const items = dataType[type].slice(0, isTable ? 10 : 1);

    return isTable ? (
      <DisplayTable
        data={items.map((item: any, index: number) => [
          `${index + 1}`,
          item.name,
            `${formatNumber(+item.playcount)} scrobbles (${formatPercent(+item.playcount / totalScrobbles * 100)}%)`,
            ``,
        ])}
      />
    ) : (
      items.map((item: any) => (
        <AlbumCard
          key={item.name}
          src={getLargeImage(item.image)}
          alt={item.name}
          caption={item.name}
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
        <FontAwesomeIcon key="name-icon" icon={faUserCircle} />,
        "Name",
        userData.user.name,
      ],
      [
        <FontAwesomeIcon key="country-icon" icon={faGlobeAmericas} />,
        "Country",
        userData.user.country,
      ],
      [
        <FontAwesomeIcon key="user-since-icon" icon={faCalendarAlt} />,
        "User Since",
         `${new Date(userData.user.registered?.unixtime * 1000 || Date.now()).toLocaleDateString()}`,
      ],
      [
        <FontAwesomeIcon key="years-active-icon" icon={faCalendarAlt} />,
        "Years Active",
          `${new Date().getFullYear() - registrationDate.getFullYear() } years`,
      ],
      [
        <FontAwesomeIcon key="playcount-icon" icon={faMusic} />,
        "Playcount",
          formatNumber(totalScrobbles),
      ],
      [
        <FontAwesomeIcon key="playcount-icon" icon={faMusic} />,
        "Spotify Account",
            <a href={userProfile.external_urls.spotify} key="spotify-link">{userProfile.display_name}</a>,
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
                <AlbumCard
                  key="userImage"
                  src={userImage}
                  alt="User"
                  caption={userData?.user?.realname}
                />
                <h3>Who is {userData?.user?.name}???</h3>
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
