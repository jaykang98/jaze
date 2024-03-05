// Settings.tsx
import React, { useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faKey, faPalette, faPenNib, faUser, faBug, faTools, faCoffee } from "@fortawesome/free-solid-svg-icons";
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

  const settingsOptions: SettingOption[] = useMemo(() => {
    const changeThemeAction = () => {
      document.body.style.backgroundColor = "Black";
    };

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
    ];

    const authOption: SettingOption = isAuthenticated()
      ? {
          id: "loggedInUser",
          displayLabel: "Authentication",
          actionLabel: "Log Out",
          action: logOut,
          icon: faUser,
          disabled: false,
        }
      : {
          id: "authenticate",
          displayLabel: "Authentication",
          actionLabel: "Log In",
          action: startAuth,
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
  ];

  const versionData = [
    [
      <span>Version</span>,
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
      <DisplayTable data={[...bugReportData, ...versionData]} />
    </>
  );
  const secondaryContentAnc = (
    <>
      I sincerely appreciate your participation as a beta tester for my application. 
      Your feedback and insights have been invaluable in shaping and improving the product. 
      Thanks to your contributions, I've been able to identify and fix bugs, as well as 
      enhance the overall user experience. Your dedication and willingness to explore new features 
      and provide honest feedback have played a crucial role in the development process.
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
