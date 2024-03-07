// Settings.tsx
import React, { useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faKey, faPalette, faPenNib, faUser, faBug, faTools, faCoffee, faRobot, faMemory } from "@fortawesome/free-solid-svg-icons";
import { useAuthenticator } from "../../hooks/security/useAuthenticator";
import { ActivityConstructorProps } from "../../types/structureTypes";
import DisplayPage from "../../components/views/displayGrid/DisplayGrid";
import DisplayTable from "../../components/views/displayTable/DisplayTable";
import Button from "../../components/foundations/button/Button";

type SettingOption = {
  id: string;
  displayLabel: string;
  actionLabel?: string;
  action: () => void;
  icon: typeof faEnvelope | typeof faKey | typeof faPalette | typeof faPenNib | typeof faUser | typeof faBug | typeof faTools;
  disabled: boolean;
};

const Settings: React.FC<ActivityConstructorProps> = ({ userID }) => {
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
        displayLabel: " Change Theme",
        actionLabel: "Dark Mode",
        action: changeThemeAction,
        icon: faPalette,
        disabled: false,
      },
      {
        id: "author",
        displayLabel: " Author",
        actionLabel: "J Kang",
        action: () => console.log("Author: J Kang"),
        icon: faPenNib,
        disabled: true,
      },
    ];

    const authOption: SettingOption = isAuthenticated()
      ? {
          id: "loggedInUser",
          displayLabel: " Authentication",
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
      <span><FontAwesomeIcon icon={faRobot} /> Current Version</span>,
      <span>Jaze {process.env.REACT_APP_VER}</span>,
    ], 
    [
      <span><FontAwesomeIcon icon={faBug} /> Report A Bug</span>,
      <Button onClick={() => window.open('mailto:admin@jklmnopea.com?subject=Bug Report')}>Send Email</Button>
    ],
    [
      <span><FontAwesomeIcon icon={faTools} /> Contribute Code</span>,
      <Button onClick={() => window.location.href = 'https://github.com/jaykang98/jaze'}>Launch GitHub</Button>
    ],
       
    [
      <span><FontAwesomeIcon icon={faMemory} /> Forget Me (Delete Local Data)</span>,
      <Button onClick={() => confirmAction("Are you sure you want to clear the local cache?", () => localStorage.clear())}>Delete Data</Button>
    ],
    [
      <span><FontAwesomeIcon icon={faCoffee} /> Support Open Source Software</span>,
      <Button onClick={() => window.location.href = 'https://paypal.me/jklmnopea?country.x=US&locale.x=en_US'}>Donate</Button>
    ],
  ];


  const primaryContent = (
    <>
      <h3>User Customization</h3>
      <p>Log out, Log in, Enable dark mode. That's pretty much it. Have ideas to improve the feature? Report a bug below!</p>
    </>
  );
  const primaryContentAnc = (
    <>
      <DisplayTable data={settingsData} />
    </>
  );
  const secondaryContentAnc = (
    <>
      <DisplayTable data={[...bugReportData]} />
    </>
  );
  const secondaryContent = (
    <>
      <h3>Technical Links & Settings</h3>
      I appreciate your participation as a beta tester for my application. 
      Your feedback has been invaluable in improving JaZe over time. 
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