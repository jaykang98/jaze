import React, { useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faKey, faPalette, faPenNib, faUser, faBug, faTools } from "@fortawesome/free-solid-svg-icons";
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
        id: "contact",
        displayLabel: "Contact",
        actionLabel: "kangjacob1@gmail.com",
        action: () => console.log("Contact: kangjacob1@gmail.com"),
        icon: faEnvelope,
        disabled: true,
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
      <Button onClick={() => window.location.href = 'https://google.com'}>Fix</Button>
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
      <h3>Misc</h3>
      <DisplayTable data={bugReportData} />
    </>
  );

  return (
    <DisplayPage
      title="Settings"
      userID={userID}
      primaryContent={primaryContent}
      primaryContentAnc={primaryContentAnc}
      secondaryContent={secondaryContent}
    />
  );
};

export default Settings;