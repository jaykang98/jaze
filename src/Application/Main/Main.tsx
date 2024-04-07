import React, { useEffect, useState } from "react";
import { FormData, ActivityConstructorProps } from "../../types/structureTypes";
import { useViewTitle } from "../../contexts/ViewTitleContexts";

import MainForm from "../../components/ui/mainForm/MainForm";
import DisplayGrid from "../../components/views/displayGrid/DisplayGrid";
import styles from "src/globals/globalStyles.css";

const Main: React.FC<ActivityConstructorProps> = () => {
  const [formData, setFormData] = useState<FormData>({
    selectionType: "track",
  });
  const { setTitle } = useViewTitle();
  const handleSetFormData = (newFormData: FormData) => setFormData(newFormData);
  useEffect(() => {
    setTitle("Main");
  }, [setTitle]);

  const formContent = (
    <MainForm
      formData={formData}
      setFormData={handleSetFormData}
      selectionType={formData.selectionType}
    />
  );
  const mainContent = (
    <div>
      <h3>View Listening Patterns Over Time</h3>
      <span className={styles.description}>
        JaZe is a tool that you can use to display your Last.FM data. Created by
        J Kang in 2024, written in TypeScript. From one stats nerd to another,
        enjoy! Enjoy exploring, and let me know what you think! To view data,
        enter a selection type (artist, album, or track) and a timestamp. Then,
        let JaZe do the rest.
        {formContent}
      </span>
    </div>
  );

  return (
    <DisplayGrid
      title={"Main"}
      viewFrames={[
        {
          content: mainContent,
          viewWidth: 100,
        },
      ]}
    />
  );
};

export default Main;
