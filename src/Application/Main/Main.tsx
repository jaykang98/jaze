import React, { useState } from "react";
import styles from "src/types/App.module.css";
import GenerateDataForm from "../../components/ui/generateDataForm/GenerateDataForm";
import ViewFrame from "../../components/structure/viewFrame/ViewFrame";
import { FormData, ActivityFrameProps } from "../../types/structureTypes";
import TitleBar from "../../components/ui/activityTitleBar/ActivityTitleBar";

const Main: React.FC<ActivityFrameProps> = ({ userID }) => {
  const [formData, setFormData] = useState<FormData>({
    selectionType: "track",
  });

  const handleSetFormData = (newFormData: FormData) => {
    setFormData(newFormData);
  };

  return (
    <>
      <TitleBar userID={userID} title={"Main"} />
      <ViewFrame splitPercentage={30}>
        {process.env.REACT_APP_IS_DEBUG ? (
          <>
            <div>
              <h3>JaZe: Does Things</h3>
              <p className={styles.description}>
                This application helps you manage your music data effectively.
                Explore various functionalities provided to enhance your
                experience.
              </p>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className={styles.form}>
              <GenerateDataForm
                formData={formData}
                setFormData={handleSetFormData}
                selectionType={formData.selectionType}
                userID={userID}
              />
            </form>
          </>
        ) : (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <p>Under Construction</p>
          </div>
        )}
      </ViewFrame>
    </>
  );
};

export default Main;
