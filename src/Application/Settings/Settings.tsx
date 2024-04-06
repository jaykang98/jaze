import React, { useEffect, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faKey,
  faPalette,
  faPenNib,
  faCoffee,
  faBug,
  faTools,
  faCompactDisc,
} from "@fortawesome/free-solid-svg-icons";
import { lastAuth } from "../../hooks/authentication/lastAuth";
import { spotAuth } from "../../hooks/authentication/spotAuth";
import { ActivityConstructorProps } from "../../types/structureTypes";
import DisplayTable from "../../components/views/displayTable/DisplayTable";
import Button from "../../components/foundations/button/Button";
import DisplayGrid from "../../components/views/displayGrid/DisplayGrid";
import { useViewTitle } from "../../contexts/ViewTitleContexts";
import { config } from "../../globals/config";

const Settings: React.FC<ActivityConstructorProps> = ({ userID }) => {
    const { setTitle } = useViewTitle();
    const { startAuthSpotify, isSpotifyLoggedIn, logSpotifyOut } = spotAuth();
    const { startAuthFM, isFMAuthenticated, logFMOut } = lastAuth();
    const { isDarkMode, toggleDarkMode, isDecrypted, toggleDecryptionMode } = config();
    useEffect(() => {
        setTitle("Settings");
    }, [setTitle]);


    const firstNode = useMemo(
        () => [
            {
                displayLabel: "Last.FM Account",
                action: !isFMAuthenticated() ? startAuthFM : logFMOut,
                actionLabel: !isFMAuthenticated() ? "Log In" : "Log Out",
                icon: faUser,
                disabled: false,
            },
            {
                displayLabel: "Spotify Account",
                action: !isSpotifyLoggedIn() ? startAuthSpotify : logSpotifyOut,
                actionLabel: !isSpotifyLoggedIn() ? "Log In" : "Log Out",
                icon: faCompactDisc,
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
                actionLabel: isDarkMode ? "Light Mode" : "Dark Mode",
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
            isDarkMode,
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
      <FontAwesomeIcon icon={faBug} />,
      "Report A Bug",
      <Button
        onClick={() =>
          window.open("mailto:admin@jklmnopea.com?subject=Bug Report")
        }
      >
        Report
      </Button>,
    ],
    [
      <FontAwesomeIcon icon={faTools} />,
      "Make Contributions",
      <Button
        onClick={() =>
          (window.location.href = "https://github.com/jaykang98/jaze")
        }
      >
        Launch GitHub
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
      >
        $ Donate
      </Button>,
    ],
  ];

  return (
    <DisplayGrid
      title="Settings"
      userID={userID}
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
