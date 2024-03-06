// Settings.tsx
import React, { useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faKey, faPalette, faPenNib, faUser, faBug, faTools, faCoffee, faRobot, faMemory } from "@fortawesome/free-solid-svg-icons";
import { useAuthenticator } from "../../hooks/security/useAuthenticator";
import { ActivityFrameProps } from "../../types/structureTypes";
import DisplayPage from "../../components/structure/displayPage/DisplayPage";
import DisplayTable from "../../components/structure/displayTable/DisplayTable";
import Button from "../../components/foundations/button/Button";

type SettingOption = {
  id: string;
  displayLabel: string;
  actionLabel?: string;
  action: () => void;
  icon: typeof faEnvelope | typeof faKey | typeof faPalette | typeof faPenNib | typeof faUser | typeof faBug | typeof faTools;
  disabled: boolean;
};

const Settings: React.FC<ActivityFrameProps> = ({ userID }) => {
  const { isAuthenticated, startAuth, logOut } = useAuthenticator();

  const confirmAction = (message: string, action: () => void) => {
    if (window.confirm(message)) {
      action();
    }
  };

  const settingsOptions: SettingOption[] = useMemo(() => {
    const changeThemeAction = () => {
      document.body.style.backgroundColor = "Black";
    };

    const clearCacheAction = () => {
      confirmAction("Are you sure you want to clear the local cache?", () => localStorage.clear());
    };

    const authAction = isAuthenticated() ? () => confirmAction("Are you sure you want to log out?", logOut) : () => confirmAction("Are you sure you want to log in?", startAuth);

    const baseOptions: SettingOption[] = [
      {
        id: "themeSwap",
        displayLabel: "Change Theme",
        actionLabel: "Dark Mode",
        action: changeThemeAction,
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
        id: "coffee",
        displayLabel: "Buy me a coffee",
        actionLabel: "Pay me",
        action: () => window.location.href = 'https://paypal.me/jklmnopea?country.x=US&locale.x=en_US',
        icon: faCoffee,
        disabled: false,
      },
      {
        id: "clearCache",
        displayLabel: "Privacy Setting",
        actionLabel: "Clear Local Cache",
        action: clearCacheAction,
        icon: faMemory,
        disabled: false,
      },
    ];

    const authOption: SettingOption = isAuthenticated()
      ? {
          id: "loggedInUser",
          displayLabel: "Authentication",
          actionLabel: "Log Out",
          action: authAction,
          icon: faUser,
          disabled: false,
        }
      : {
          id: "authenticate",
          displayLabel: "Authentication",
          actionLabel: "Log In",
          action: authAction,
          icon: faKey,
          disabled: false,
        };

    return [authOption, ...baseOptions];
  }, [isAuthenticated, startAuth, logOut]);

  const settingsData = settingsOptions.map((option) => [
    <span key={option.id}>
      <FontAwesomeIcon icon={option.icon} aria-hidden="true" className="iconStyle" />
      {option.displayLabel}
    </span>,
    option.disabled ? (
      <span>{option.actionLabel}</span>
    ) : (
      <Button key={option.id} onClick={option.action} disabled={option.disabled}>
        {option.actionLabel}
      </Button>
    ),
  ]);

  const bugReportData = [
    [
      <span><FontAwesomeIcon icon={faBug} /> Report Bug</span>,
      <Button onClick={() => window.open('mailto:admin@jklmnopea.com?subject=Bug Report')}>Report</Button>
    ],
    [
      <span><FontAwesomeIcon icon={faTools} /> Fix Bug</span>,
      <Button onClick={() => window.location.href = 'https://github.com/jaykang98/jaze'}>Fix</Button>
    ],
    [
      <span><FontAwesomeIcon icon={faRobot} />Version</span>,
      <span>{process.env.REACT_APP_VER}</span>,
    ],
  ];


  const primaryContent = (
    <>
      <h3>Modify Properties</h3>
      <p>Many of these settings and properties are incredibly broken. Do not expect support for these use cases.</p>
    </>
  );
  const primaryContentAnc = (
    <>
      <DisplayTable data={settingsData} />
    </>
  );
  const secondaryContent = (
    <>
      <DisplayTable data={[...bugReportData]} />
    </>
  );
  const secondaryContentAnc = (
    <>
      I appreciate your participation as a beta tester for my application. 
      Your feedback has been invaluable in improving JaZe over titme. 
      Thanks to your contributions, I've been able to identify and fix bugs, as well as 
      enhance the overall user experience. 
    </>
  );

  return (
    <DisplayPage
      title="Settings"
      userID={userID}
      primaryContent={primaryContent}
      primaryContentAnc={primaryContentAnc}
      secondaryContent={secondaryContent}
      secondaryContentAnc={secondaryContentAnc}
    />
  );
};

export default Settings;