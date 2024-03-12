// src/components/Main.tsx
import React, { useEffect, useState } from "react";
import { FormData, ActivityConstructorProps } from "../../types/structureTypes";

import MainForm from "../../components/ui/mainForm/MainForm";
import DisplayGrid from "../../components/views/displayGrid/DisplayGrid";
import styles from "src/globals/globalStyles.css";
import { useViewTitle } from "../../contexts/ViewTitleContexts";

const Main: React.FC<ActivityConstructorProps> = ({ userID }) => {
    const { setTitle } = useViewTitle();

    useEffect(() => {
        setTitle("Main"); 
    }, [setTitle]);
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
      <h3>View Listening Patterns Over Time</h3>
      <p className={styles.description}>
        JaZe is a tool that you can use to display your Last.FM data. 
        Created by J Kang in 2024, written in TypeScript. From one stats
        nerd to another, enjoy! Enjoy exploring, and let me know what you think!
        To view data, enter a selection type (artist, album, or track) and a timestamp. Then, 
        let JaZe do the rest.
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
