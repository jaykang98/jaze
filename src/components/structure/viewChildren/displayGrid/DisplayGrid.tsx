import React from "react";
import ViewFrame from "../../viewFrame/ViewFrame";
import { ActivityConstructorProps } from "types/structureTypes";
import Styles from "./DisplayGrid.module.css";
interface ViewFrameInfo {
  content: React.ReactNode;
  viewWidth?: number;
}

interface DisplayGridProps extends ActivityConstructorProps {
  title?: string;
  viewFrames: ViewFrameInfo[];
}

const DisplayGrid: React.FC<DisplayGridProps> = ({ viewFrames }) => {
  const totalSpecifiedWidth = viewFrames.reduce(
    (acc, { viewWidth }) => acc + (viewWidth || 0),
    0,
  );
  const unspecifiedFramesCount = viewFrames.filter(
    ({ viewWidth }) => viewWidth === undefined,
  ).length;
  const remainingWidthPerFrame =
    (100 - totalSpecifiedWidth) / unspecifiedFramesCount;

  return (
    <>
      <section style={{ display: "flex", flexDirection: "row" }}>
        {viewFrames.map((frame, index) => (
          <ViewFrame
            key={index}
            splitPercentage={frame.viewWidth || remainingWidthPerFrame}
          >
            {frame.content}
          </ViewFrame>
        ))}
      </section>
    </>
  );
};

export default DisplayGrid;
