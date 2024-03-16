import React from "react";
import styles from "./ViewSection.module.css";
import { ViewSectionProps } from "types/structureTypes";

const ViewSection: React.FC<ViewSectionProps> = ({ children, style }) => {
  const isEmptyContent = React.Children.count(children) === 0;
  const sectionClassName = isEmptyContent
    ? styles.viewSectionEmpty
    : styles.viewSection;

  return (
    <div className={sectionClassName} style={style}>
      {children}
    </div>
  );
};

export default ViewSection;
