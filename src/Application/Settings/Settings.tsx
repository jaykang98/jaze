import React, { useEffect, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faKey, faPalette, faPenNib, faCoffee, faBug, faTools, faCashRegister, faMoneyBill, faMoneyBillWave, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { ActivityConstructorProps } from "../../types/structureTypes";
import { useViewTitle } from "../../contexts/ViewTitleContexts";
import { useConfig } from "../../globals/useConfig";
import { useLocalStorage } from "../../hooks/utils/useLocalStorage";
import { faGit, faGithub, faGithubSquare, faLastfmSquare, faSpotify } from "@fortawesome/free-brands-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import DisplayTable from "../../components/views/displayTable/DisplayTable";
import Button from "../../components/foundations/button/Button";
import JaZeAuth from "../../hooks/authentication/jazeAuth";
import DisplayGrid from "../../components/views/displayGrid/DisplayGrid";

const Settings: React.FC<ActivityConstructorProps> = () => {
    const [lastFmObject, spotifyObject] = JaZeAuth();

    const { getItem } = useLocalStorage();
    const { toggleDarkMode, toggleDecryptionMode } = useConfig();
    const { setTitle } = useViewTitle();

    const isDecrypted = getItem("isDecrypted");

    const isFMAuthenticated = lastFmObject.isFMAuthenticated;
    const startAuthFM = lastFmObject.startAuthFM;
    const logFMOut = lastFmObject.logFMOut;

    const startAuthSpotify = spotifyObject.startAuthSpotify;
    const logSpotifyOut = spotifyObject.logSpotifyOut;
    const isSpotifyLoggedIn = spotifyObject.isSpotifyLoggedIn;

  useEffect(() => {
    setTitle("Settings");
  }, [setTitle]);

  const firstNode = useMemo(
    () => [
      {
        displayLabel: "Last.FM Account",
        action: !isFMAuthenticated() ? startAuthFM : logFMOut,
        actionLabel: !isFMAuthenticated() ? "Log In" : "Log Out",
        icon: faLastfmSquare as IconProp,
        disabled: false,
      },
      {
        displayLabel: "Spotify Account",
        action: !isSpotifyLoggedIn() ? startAuthSpotify : logSpotifyOut,
        actionLabel: !isSpotifyLoggedIn() ? "Log In" : "Log Out",
        icon: faSpotify as IconProp,
      },
      {
        displayLabel: "Store Data Securely",
        action: toggleDecryptionMode,
        actionLabel: isDecrypted ? "Encrypt Data" : "Decrypt Data",
        icon: faKey,
        disabled: false,
      },
      {
        displayLabel: "Current Theme Mode",
        action: toggleDarkMode,
        actionLabel: getItem("isDarkMode") ? "Dark Mode" : "Light Mode",
        icon: faPalette,
        disabled: false,
      },
    ],
    [
      isFMAuthenticated,
      startAuthFM,
      logFMOut,
      isSpotifyLoggedIn,
      startAuthSpotify,
      logSpotifyOut,
      isDecrypted,
      toggleDecryptionMode,
      getItem,
      toggleDarkMode,
    ],
  );

  const settingsTableData = firstNode.map((option) => [
    <FontAwesomeIcon
      key={`${option.displayLabel}-icon`}
      icon={option.icon}
      aria-hidden="true"
    />,
    option.displayLabel,
    <Button
      key={`${option.displayLabel}-button`}
      onClick={option.action}
      disabled={option.disabled}
    >
      {option.actionLabel}
    </Button>,
  ]);

  const secondNode = [
    [<FontAwesomeIcon icon={faPenNib} />, "Author Name", "J Kang"],
    [
      <FontAwesomeIcon icon={faCoffee} />,
      "Current Version",
      "JaZe " + process.env.REACT_APP_VER,
    ],
    [
    <FontAwesomeIcon icon={faGithub as IconDefinition} />,
      "Contribute on GitHub",
      <Button
        onClick={() =>
          (window.location.href = "https://github.com/jaykang98/jaze")
        }
          icon={faBug}

      >
        Fix Bugs
      </Button>,
    ],
    [
      <FontAwesomeIcon icon={faCoffee} />,
      "Support Open Source Software",
      <Button
        onClick={() =>
          (window.location.href =
              "https://paypal.me/jklmnopea?country.x=US&locale.x=en_US")

          }
        icon={faMoneyBillWave}
      >
        Donate
      </Button>,
    ],
  ];

  return (
    <DisplayGrid
      title="Settings"
      viewFrames={[
        {
          content: (
            <>
              <p>
                Adjust your preferences for a personalized experience. JaZe
                offers a number of customization options, including Last.FM
                login, disabling local encryption (faster, but less secure),
                clearing all saved information, and dark mode. Enjoy!
              </p>
              <ul>
                <li>
                  Use the Last.FM Authentication Framework to view data about
                  your music
                </li>
                <li>
                  Store some of the data locally and securely to save on query
                  requests
                </li>
                <li>
                  View your top ten musicians, albums, and tracks of all time.
                  AND the number of scrobbles!
                </li>
                <li>Create a Last.FM account from the click of a button</li>
                <li>
                  Enable DEBUG_MODE to view more information and disable
                  encryption
                </li>
                <li>Quick links for quick actions!</li>
              </ul>
            </>
          ),
          viewWidth: 100,
        },
        {
          content: (
            <>
              <h3>Customize JaZe</h3>
              <DisplayTable data={settingsTableData} />
              <DisplayTable data={secondNode} />
            </>
          ),
          viewWidth: 100,
        },
      ]}
    />
  );
};

export default Settings;
