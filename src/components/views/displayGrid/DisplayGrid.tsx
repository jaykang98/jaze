import React from 'react';
import TitleBar from '../../ui/activityTitleBar/ActivityTitleBar';
import ViewFrame from '../../structure/viewFrame/ViewFrame';
import { ActivityConstructorProps } from 'types/structureTypes';

interface DisplayGridProps extends ActivityConstructorProps {
      primaryContent: React.ReactNode;
  primaryContentAnc?: React.ReactNode;
  secondaryContent?: React.ReactNode;
  secondaryContentAnc?: React.ReactNode;
  title?:string;
}

const DisplayGrid: React.FC<DisplayGridProps> = ({ userID, primaryContent, primaryContentAnc, secondaryContent, secondaryContentAnc, title }) => {
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
export default DisplayGrid;