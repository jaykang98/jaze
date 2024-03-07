// File: src/components/DualView.tsx
import React, { useRef, useEffect, useState } from "react";
import ViewSection from "../../structure/viewSection/ViewSection";

interface ViewFrameProps {
  children: React.ReactNode;
  splitPercentage?: number;
}

const ViewFrame: React.FC<ViewFrameProps> = ({
  children,
  splitPercentage = 50,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [adjustedSplit, setAdjustedSplit] = useState(splitPercentage);
  const validChildren = React.Children.toArray(children).slice(0, 2);

  useEffect(() => {
    const adjustSplitPercentage = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const minChildWidth = 200;
        const maxChildWidth = 500;
        let newSplit = splitPercentage;

        if (containerWidth * (splitPercentage / 100) < minChildWidth) {
          newSplit = (minChildWidth / containerWidth) * 100;
        } else if (containerWidth * (splitPercentage / 100) > maxChildWidth) {
          newSplit = (maxChildWidth / containerWidth) * 100;
        }

        setAdjustedSplit(newSplit);
      }
    };

    adjustSplitPercentage();
    window.addEventListener("resize", adjustSplitPercentage);

    return () => {
      window.removeEventListener("resize", adjustSplitPercentage);
    };
  }, [splitPercentage]);

  return (
    <div ref={containerRef}>
      <ViewSection style={{ width: `${adjustedSplit}%` }}>
        {validChildren[0]}
      </ViewSection>
      <ViewSection style={{ width: `${100 - adjustedSplit}%` }}>
        {validChildren[1]}
      </ViewSection>
    </div>
  );
};

export default ViewFrame;
