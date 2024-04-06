import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faGlobeAmericas,
  faCalendarAlt,
  faMusic,
} from "@fortawesome/free-solid-svg-icons";
import { fetchUserData } from "../../hooks/dataManagement/fetchUserData";
import DisplayGrid from "../../components/views/displayGrid/DisplayGrid";
import DisplayTable from "../../components/views/displayTable/DisplayTable";
import { ActivityConstructorProps } from "../../types/structureTypes";
import { useViewTitle } from "../../contexts/ViewTitleContexts";
import AlbumCard from "../../components/jaze/albumCard/AlbumCard";
import { useLocalStorage } from "../../hooks/utils/useLocalStorage";

const Tops: React.FC<ActivityConstructorProps> = () => {
  const { setTitle } = useViewTitle();
    const { getItem } = useLocalStorage();
    const lastFMUserData = JSON.parse(getItem("lastFMUserData"));
  useEffect(() => {
    setTitle("Tops");
  }, [setTitle]);
    const userData = JSON.parse(getItem("lastFMData"));
    const albumData = JSON.parse(getItem("lastFMAlbumData"));
    const artistData = JSON.parse(getItem("lastFMArtistData"));
    const userID = getItem("lastFMUserID");
    const trackData = JSON.parse(getItem("lastFMTrackData"));

  const { error, loading } =
    fetchUserData(userID);

  const formatNumber = (number: number) =>
    new Intl.NumberFormat().format(number);

  const getLargeImage = (images: Array<{ size: string; "#text": string }>) =>
    images.find((image) => image.size === "large")?.["#text"] || "";

  const userImage = userData?.user?.image?.[0]["#text"];

  const renderItemContent = (
    data: any,
    type: "artist" | "album" | "track",
    isTable: boolean = false,
  ) => {
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
          `${formatNumber(+item.playcount)} scrobbles`,
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const renderUserInfo = () => {
      if (!lastFMUserData ) return null;
    const { user } = lastFMUserData;
    const registrationDate = new Date(user.registered.unixtime * 1000);
    const yearsSinceRegistration =
      new Date().getFullYear() - registrationDate.getFullYear();

    const dataForDisplay: (string | JSX.Element)[][] = [
      [
        <FontAwesomeIcon key="name-icon" icon={faUserCircle} />,
        "Name",
        user.name,
      ],
      [
        <FontAwesomeIcon key="country-icon" icon={faGlobeAmericas} />,
        "Country",
        user.country,
      ],
      [
        <FontAwesomeIcon key="user-since-icon" icon={faCalendarAlt} />,
        "User Since",
        registrationDate.toLocaleDateString(),
      ],
      [
        <FontAwesomeIcon key="years-active-icon" icon={faCalendarAlt} />,
        "Years Active",
        `${yearsSinceRegistration} years`,
      ],
      [
        <FontAwesomeIcon key="playcount-icon" icon={faMusic} />,
        "Playcount",
        formatNumber(user.playcount),
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
                          caption={lastFMUserData.user.realname}
                />
                      <h3>Who is {lastFMUserData.user.name}???</h3>
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
