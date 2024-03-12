import React, { useEffect, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faKey, faPalette, faPenNib, faUser, faBug, faTools, faCoffee, faMemory,
} from "@fortawesome/free-solid-svg-icons";
import { useAuthenticator } from "../../hooks/security/useAuthenticator";
import { ActivityConstructorProps } from "../../types/structureTypes";
import DisplayTable from "../../components/views/displayTable/DisplayTable";
import Button from "../../components/foundations/button/Button";
import DisplayGrid from "../../components/views/displayGrid/DisplayGrid";
import { useViewTitle } from "../../contexts/ViewTitleContexts";

let globalIsDecryptMode = false;

const toggleGlobalIsDecryptMode = () => {

    globalIsDecryptMode = !globalIsDecryptMode;
    alert(`Local Encryption is now ${globalIsDecryptMode ? "disabled" : "enabled"}.`);
};

const Settings: React.FC<ActivityConstructorProps> = ({ userID }) => {
    const { setTitle } = useViewTitle();

    useEffect(() => {
        setTitle("Settings");
    }, [setTitle]);
    const { startAuth, isAuthenticated } = useAuthenticator();

    const settingsOptions = useMemo(() => [
        {
            displayLabel: "Enable Last.FM Integration",
            action: isAuthenticated() ? () => { } : startAuth,
            actionLabel: isAuthenticated() ? "Enabled" : "Enable",
            icon: faUser,
            disabled: isAuthenticated(),
        },
        {
            displayLabel: "Toggle Local Encryption",
            action: toggleGlobalIsDecryptMode,
            actionLabel: globalIsDecryptMode ? "Enable Encryption" : "Disable Encryption",
            icon: faKey,
            disabled: false,
        },
        {
            displayLabel: "Delete Local Data",
            action: () => window.confirm("Are you sure you want to clear the local cache? This will log you out and force reload the page.") && localStorage.clear(),
            actionLabel: "Delete",
            icon: faMemory,
            disabled: false,
        },
        {
            id: "themeSwap",
            displayLabel: "Change Theme",
            actionLabel: "Dark Mode",
            action: () => document.body.style.backgroundColor = "Black",
            icon: faPalette,
            disabled: false,
        },
    ], [isAuthenticated, startAuth]);

    const settingsTableData = settingsOptions.map(option => ([
        <FontAwesomeIcon key={`${option.displayLabel}-icon`} icon={option.icon} aria-hidden="true" className="iconStyle" />,
        option.displayLabel,
        <Button key={`${option.displayLabel}-button`} onClick={option.action} disabled={option.disabled}>
            {option.actionLabel}
        </Button>
    ]));

    const bugReportData = [
        [<FontAwesomeIcon icon={faPenNib} />, "Author", "J Kang"],
        [<FontAwesomeIcon icon={faCoffee} />, "Current Version", "JaZe " + process.env.REACT_APP_VER],
        [<FontAwesomeIcon icon={faBug} />, "Report A Bug", <Button onClick={() => window.open("mailto:admin@jklmnopea.com?subject=Bug Report")}>Send Email</Button>],
        [<FontAwesomeIcon icon={faTools} />, "Contribute Code", <Button onClick={() => window.location.href = "https://github.com/jaykang98/jaze"}>Launch GitHub</Button>],
        [<FontAwesomeIcon icon={faCoffee} />, "Support Open Source Software", <Button onClick={() => window.location.href = "https://paypal.me/jklmnopea?country.x=US&locale.x=en_US"}>Donate</Button>],
    ];

    const primaryContent = (
        <>
            <h3>Customize JaZe</h3>
            <p>Adjust your preferences for a personalized experience. JaZe offers a number of customization options, including Last.FM login, disabling local encryption (faster, but less secure), clearing all saved information, and dark mode. Enjoy!</p>
            <DisplayTable data={settingsTableData} />
        </>
    );

    const secondaryContent = (
        <>
            <h3>Features and More Information</h3>
            <ul>
                <li>Use the Last.FM Authentication Framework to view data about your music</li>
                <li>Store some of the data locally and securely to save on query requests</li>
                <li>View your top ten musicians, albums, and tracks of all time. AND the number of scrobbles!</li>
                <li>Create a Last.FM account from the click of a button </li>
                <li>Enable DEBUG_MODE to view more information and disable encryption</li>
                <li>Quick links for quick actions!</li>
            </ul>
            <DisplayTable data={bugReportData} />
        </>
    );

    return (
        <DisplayGrid
            title="Settings"
            userID={userID}
            viewFrames={[
                {
                    content: primaryContent,
                    viewWidth: 100,
                },
                {
                    content: secondaryContent,
                    viewWidth: 100,
                },
            ]}
        />
    );
};

export default Settings;
