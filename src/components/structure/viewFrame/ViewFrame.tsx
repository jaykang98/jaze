import React, { useRef, useEffect, useState } from "react";
import classNames from "classnames";
import styles from "src/components/structure/viewFrame/ViewFrame.module.css";
import ViewSection from "../viewSection/ViewSection";
import { ViewFrameProps } from "types/structureTypes";

const isEmptyContent = (children: React.ReactNode): boolean => {
  const childrenArray = React.Children.toArray(children);
  return (
    childrenArray.length === 0 ||
    childrenArray.every(
      (child) =>
        React.isValidElement(child) &&
        child.type === React.Fragment &&
        React.Children.count(child.props.children) === 0,
    )
  );
};

const ViewFrame: React.FC<ViewFrameProps> = ({
  children,
  splitPercentage = 100,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [adjustedSplit, setAdjustedSplit] = useState(splitPercentage);
  const [firstChild, secondChild] = React.Children.toArray(children).slice(
    0,
    2,
  );
  const isContentEmpty = isEmptyContent([firstChild, secondChild]);

  const adjustSplitPercentage = () => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const minChildWidth = 0;
      const maxChildWidth = 1800;
      let newSplit =
        (Math.max(
          minChildWidth,
          Math.min(maxChildWidth, containerWidth * (splitPercentage / 100)),
        ) /
          containerWidth) *
        100;
      setAdjustedSplit(newSplit);
    }
  };

  useEffect(() => {
    adjustSplitPercentage();
    window.addEventListener("resize", adjustSplitPercentage);
    return () => window.removeEventListener("resize", adjustSplitPercentage);
  }, [splitPercentage]);

  return (
    <div
      ref={containerRef}
      className={classNames(styles.viewFrame, {
        [styles.empty]: isContentEmpty,
      })}
    >
      <ViewSection style={{ width: `${adjustedSplit}%` }}>
        {firstChild}
      </ViewSection>
      <ViewSection style={{ width: `${100 - adjustedSplit}%` }}>
        {secondChild}
      </ViewSection>
    </div>
  );
};

export default ViewFrame;
