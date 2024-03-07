// File: src/components/ui/viewSection/ViewSection.tsx
import React from "react";
import styles from "./ViewSection.module.css"

interface ViewSectionProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const ViewSection: React.FC<ViewSectionProps> = ({ children, style }) => {
  return (
    <div style={style}>
      {children}
    </div>
  );
};

export default ViewSection;
