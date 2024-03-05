import React from 'react';
import TitleBar from '../../ui/activityTitleBar/ActivityTitleBar';
import ViewFrame from '../../structure/viewFrame/ViewFrame';
import { ActivityFrameProps } from 'types/structureTypes';

interface DisplayPageProps extends ActivityFrameProps {
  primaryContent: React.ReactNode;
  primaryContentAnc?: React.ReactNode;
  secondaryContent?: React.ReactNode;
}

const DisplayPage: React.FC<DisplayPageProps> = ({ userID, primaryContent, primaryContentAnc, secondaryContent }) => {
  return (
    <>
      <TitleBar userID={userID} title={'About'} />
      <section>
        <ViewFrame splitPercentage={50}>
          {primaryContent}
          {primaryContentAnc}
        </ViewFrame>
        <ViewFrame>
          {secondaryContent}
        </ViewFrame>
      </section>
    </>
  );
};
export default DisplayPage;