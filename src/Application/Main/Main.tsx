// src/components/Main.tsx
import React, { useState } from "react";
import { FormData, ActivityConstructorProps } from "../../types/structureTypes";

import MainForm from "../../components/ui/mainForm/MainForm";
import DisplayGrid from "../../components/views/displayGrid/DisplayGrid";
import styles from "src/globals/globalStyles.css";

const Main: React.FC<ActivityConstructorProps> = ({ userID }) => {
  const [formData, setFormData] = useState<FormData>({
    selectionType: "track",
  });

  const handleSetFormData = (newFormData: FormData) => setFormData(newFormData);
  const formContent = (
    <MainForm
      formData={formData}
      setFormData={handleSetFormData}
      selectionType={formData.selectionType}
      userID={userID}
    />
  );
  const mainContent = (
    <div>
      <h3>JaZe: Does Things</h3>
      <p className={styles.description}>
        This application helps you manage your music data effectively. Explore
        various functionalities provided to enhance your experience.
        {formContent}
      </p>
      
    </div>
  );



  return (
    <DisplayGrid
      title={"Main"}
      userID={userID}
      viewFrames={[
        {
          content:mainContent,
          viewWidth:100,
        },
      ]}
    />
  );
};

export default Main;
