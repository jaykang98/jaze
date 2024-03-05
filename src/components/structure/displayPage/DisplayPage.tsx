import React from 'react';
import TitleBar from '../../ui/activityTitleBar/ActivityTitleBar';
import ViewFrame from '../../structure/viewFrame/ViewFrame';
import { ActivityFrameProps } from 'types/structureTypes';

interface DisplayPageProps extends ActivityFrameProps {
      primaryContent: React.ReactNode;
  primaryContentAnc?: React.ReactNode;
  secondaryContent?: React.ReactNode;
  secondaryContentAnc?: React.ReactNode;
  title?:string;
}

const DisplayPage: React.FC<DisplayPageProps> = ({ userID, primaryContent, primaryContentAnc, secondaryContent, secondaryContentAnc, title }) => {
  return (
    <>
      <TitleBar userID={userID} title={title} />
      <section>
        <ViewFrame splitPercentage={50}>
          {primaryContent}
          {primaryContentAnc}
        </ViewFrame>
        <ViewFrame>
          {secondaryContent}
          {secondaryContentAnc}
        </ViewFrame>
      </section>
    </>
  );
};
export default DisplayPage;