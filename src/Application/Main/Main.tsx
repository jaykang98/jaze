import React, { useState } from "react";
import styles from "./Main.module.css";
import GenerateDataForm from "../../components/ui/generateDataForm/GenerateDataForm";
import ViewFrame from "../../components/ui/viewFrame/ViewFrame"; // Ensure this import path is correct
import { FormData, ActivityFrameProps } from "../../types/componentTypes";
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
            <ViewFrame>
            <div>
            <h3>JaZe: Does Things</h3>
            <p>This application helps you manage your music data effectively. Explore various functionalities provided to enhance your experience.</p>
        </div>
            <form onSubmit={(e) => e.preventDefault()} className={styles.form}>
                <GenerateDataForm
                    formData={formData}
                    setFormData={handleSetFormData}
                    selectionType={formData.selectionType}
                    userID={userID} />
            </form>
            </ViewFrame>
        </>
    );
};

export default Main;
