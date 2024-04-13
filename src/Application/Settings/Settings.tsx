import React, { useEffect, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faKey,
    faPalette,
    faPenNib,
    faCoffee,
    faBug,
    faUser,
    faBrush,
    faLock,
    faLockOpen,
    faCodeMerge,
} from "@fortawesome/free-solid-svg-icons";
import { ActivityConstructorProps } from "../../types/structureTypes";
import { useViewTitle } from "../../contexts/ViewTitleContexts";
import { useConfig } from "../../contexts/useConfig";
import { useLocalStorage } from "../../hooks/utils/useLocalStorage";
import {
    faGithub,
    faLastfmSquare,
    faPaypal,
    faSpotify,
} from "@fortawesome/free-brands-svg-icons";
import Button from "../../components/foundations/button/Button";
import JaZeAuth from "../../hooks/authentication/jazeAuth";
import DisplayTable from "../../components/structure/viewChildren/displayTable/DisplayTable";
import DisplayGrid from "../../components/structure/viewChildren/displayGrid/DisplayGrid";

const Settings: React.FC<ActivityConstructorProps> = () => {
    const [lastUser, spotUser] = JaZeAuth();
    const { getItem } = useLocalStorage();
    const { toggleDarkMode, toggleDecryptionMode } = useConfig();
    const { setTitle } = useViewTitle();

    useEffect(() => {
        setTitle("Settings");
    }, [setTitle]);

    const settingsOptions = useMemo(
        () => [
            {
                displayLabel: "Last.FM",
                action: !lastUser.isFMAuthenticated()
                    ? lastUser.startAuthFM
                    : lastUser.logFMOut,
                actionLabel: !lastUser.isFMAuthenticated() ? "Log In" : "Log Out",
                icon: faLastfmSquare,
                secondaryIcon: faUser,
            },
            {
                displayLabel: "Spotify",
                action: !spotUser.isSpotifyLoggedIn()
                    ? spotUser.startAuthSpotify
                    : spotUser.logSpotifyOut,
                actionLabel: !spotUser.isSpotifyLoggedIn() ? "Log In" : "Log Out",
                icon: faSpotify,
                secondaryIcon: faUser,
            },
            {
                displayLabel: "Encryption",
                action: toggleDecryptionMode,
                actionLabel: getItem("isDecrypted") ? "Enable" : "Disable",
                icon: faKey,
                secondaryIcon: getItem("isDecrypted") ? faLock : faLockOpen,
            },
            {
                displayLabel: "Change Theme",
                action: toggleDarkMode,
                actionLabel: getItem("isDarkMode") ? "Dark Mode" : "Light Mode",
                icon: faPalette,
                secondaryIcon: faBrush,
            },
        ],
        [
            lastUser.isFMAuthenticated(),
            lastUser.startAuthFM,
            lastUser.logFMOut,
            spotUser.isSpotifyLoggedIn(),
            spotUser.startAuthSpotify,
            spotUser.logSpotifyOut,
            toggleDecryptionMode,
            getItem("isDecrypted"),
            toggleDarkMode,
            getItem("isDarkMode"),
        ],
    );

    const additionalSettings = [
        {
            displayLabel: "Author Name",
            action: null,
            actionLabel: "J Kang",
            icon: faPenNib,
            secondaryIcon: null,
        },
        {
            displayLabel: "Current Version",
            action: null,
            actionLabel: `JaZe ${process.env.REACT_APP_VER}`,
            icon: faCodeMerge,
            secondaryIcon: null,
        },
        {
            displayLabel: "GitHub",
            action: () =>
                (window.location.href = "https://github.com/jaykang98/jaze"),
            actionLabel: "Fix Bugs",
            icon: faGithub,
            secondaryIcon: faBug,
        },
        {
            displayLabel: "PayPal",
            action: () =>
            (window.location.href =
                "https://paypal.me/jklmnopea?country.x=US&locale.x=en_US"),
            actionLabel: "Donate",
            icon: faPaypal,
            secondaryIcon: faCoffee,
        },
    ];

    const formatTableData = (options) =>
        options.map((option) => [
            <FontAwesomeIcon
                key={`${option.displayLabel}-icon`}
                icon={option.icon}
                className="tableIcon"
            />,
            <span key={`${option.displayLabel}-label`} style={{ fontSize: "150%" }}>
                {option.displayLabel}
            </span>,
            option.action ? (
                <Button
                    key={`${option.displayLabel}-button`}
                    onClick={option.action}
                    icon={option.secondaryIcon}
                >
                    {option.actionLabel}
                </Button>
            ) : (
                <span key={`${option.displayLabel}-label`} style={{ fontSize: "150%" }}>
                    {option.actionLabel}
                </span>
            ),
        ]);

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
                            <h1>Customize</h1>
                            <h3>JaZe</h3>
                            <DisplayTable data={formatTableData(settingsOptions)} />
                            <DisplayTable data={formatTableData(additionalSettings)} />
                        </>
                    ),
                    viewWidth: 100,
                },
            ]}
        />
    );
};

export default Settings;
