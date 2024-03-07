import React from "react";
import styles from "./ViewSection.module.css";
import { ViewSectionProps } from "types/structureTypes";

const ViewSection: React.FC<ViewSectionProps> = ({ children, style }) => {
  return (
    <div className={styles.viewSection} style={style}>
      {children}
    </div>
  );
};

export default ViewSection;
