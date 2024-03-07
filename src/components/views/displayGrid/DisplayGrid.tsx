import React from 'react';
import TitleBar from '../../ui/activityTitleBar/ActivityTitleBar';
import ViewFrame from '../../../components/ui/viewFrame/ViewFrame';
import { ActivityConstructorProps } from 'types/structureTypes';

interface DisplayGridProps extends ActivityConstructorProps {
    primaryContent: React.ReactNode;
    primaryContentAnc?: React.ReactNode;
    secondaryContent?: React.ReactNode;
    secondaryContentAnc?: React.ReactNode;
    title?:string;
    primaryWidth?:number;
    secondaryWidth?:number;

}

const DisplayGrid: React.FC<DisplayGridProps> = ({ userID, primaryContent, primaryContentAnc, secondaryContent, secondaryContentAnc, title, primaryWidth=50, secondaryWidth=50 }) => {
  return (
    <>
      <TitleBar userID={userID} title={title} />
      <section>
        <ViewFrame splitPercentage={primaryWidth}>
          {primaryContent}
          {primaryContentAnc}
        </ViewFrame>
        <ViewFrame splitPercentage={secondaryWidth}>
          {secondaryContent}
          {secondaryContentAnc}
        </ViewFrame>
      </section>
    </>
  );
};
export default DisplayGrid;