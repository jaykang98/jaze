import React, { useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEnvelope, faKey, faPalette, faPenNib, faUser, faBug, faTools, faCoffee, faMemory,
} from "@fortawesome/free-solid-svg-icons";
import { useAuthenticator } from "../../hooks/security/useAuthenticator";
import { ActivityConstructorProps } from "../../types/structureTypes";
import DisplayTable from "../../components/views/displayTable/DisplayTable";
import Button from "../../components/foundations/button/Button";
import DisplayGrid from "../../components/views/displayGrid/DisplayGrid";

let globalIsDecryptMode = false;

const toggleGlobalIsDecryptMode = () => {
    globalIsDecryptMode = !globalIsDecryptMode;
    alert(`Encryption is now ${globalIsDecryptMode ? "disabled" : "enabled"}.`);
};

type SettingOption = {
    id: string;
    displayLabel: string;
    actionLabel?: string;
    action: () => void;
    icon: typeof faEnvelope | typeof faKey | typeof faPalette | typeof faPenNib | typeof faUser | typeof faBug | typeof faTools;
    disabled: boolean;
};

const Settings: React.FC<ActivityConstructorProps> = ({ userID }) => {
    const { startAuth, logOut, isAuthenticated } = useAuthenticator();

    const confirmAction = (message: string, action: () => void) => {
        if (window.confirm(message)) {
            action();
        }
    };

    const settingsOptions: SettingOption[] = useMemo(() => [
        {
            id: "themeSwap",
            displayLabel: "Change Theme",
            actionLabel: "Dark Mode",
            action: () => document.body.style.backgroundColor = "Black",
            icon: faPalette,
            disabled: false,
        },
        {
            id: "author",
            displayLabel: "Author",
            actionLabel: "J Kang",
            action: () => console.log("Author: J Kang"),
            icon: faPenNib,
            disabled: true,
        },
        {
            id: "disableEnc",
            displayLabel: "Toggle Encryption",
            actionLabel: globalIsDecryptMode ? "Enable Encryption" : "Disable Encryption",
            action: toggleGlobalIsDecryptMode,
            icon: faKey,
            disabled: false,
        },
        {
            id: isAuthenticated() ? "loggedInUser" : "authenticate",
            displayLabel: "Authentication",
            actionLabel: isAuthenticated() ? "Log Out" : "Log In",
            action: isAuthenticated()
                ? () => confirmAction("Are you sure you want to log out?", logOut)
                : () => confirmAction("Now Launching an External Site (Last.FM)", startAuth),
            icon: faUser,
            disabled: false,
        },
    ], [isAuthenticated, startAuth, logOut]);

    const settingsTableData = settingsOptions.map(option => ([
        <FontAwesomeIcon key={`${option.id}-icon`} icon={option.icon} aria-hidden="true" className="iconStyle" />,
        option.displayLabel,
        option.disabled ? (
            option.actionLabel
        ) : (
            <Button key={`${option.id}-button`} onClick={option.action} disabled={option.disabled}>
                {option.actionLabel}
            </Button>
        )
    ]));

    const bugReportData = [
        [<FontAwesomeIcon icon={faCoffee} />, "Current Version", process.env.REACT_APP_VER],
        [<FontAwesomeIcon icon={faBug} />, "Report A Bug", <Button onClick={() => window.open("mailto:admin@jklmnopea.com?subject=Bug Report")}>Send Email</Button>],
        [<FontAwesomeIcon icon={faTools} />, "Contribute Code", <Button onClick={() => window.location.href = "https://github.com/jaykang98/jaze"}>Launch GitHub</Button>],
        [<FontAwesomeIcon icon={faMemory} />, "Forget Me (Delete Local Data)", <Button onClick={() => window.confirm("Are you sure you want to clear the local cache?") && localStorage.clear()}>Delete Data</Button>],
        [<FontAwesomeIcon icon={faCoffee} />, "Support Open Source Software", <Button onClick={() => window.location.href = "https://paypal.me/jklmnopea?country.x=US&locale.x=en_US"}>Donate</Button>],
    ];

    const primaryContent = (
        <>
            <h3>User Customization</h3>
            <p>Log out, Log in, Enable dark mode. That's pretty much it. Have ideas to improve the feature? Report a bug below!</p>
            <DisplayTable data={settingsTableData} />
        </>
    );

    const secondaryContent = (
        <>
            <h3>Technical Links & Settings</h3>
            <p>I appreciate your participation as a beta tester for my application. Your feedback has been invaluable in improving JaZe over time. Thanks to your contributions, I've been able to identify and fix bugs, as well as enhance the overall user experience.</p>
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