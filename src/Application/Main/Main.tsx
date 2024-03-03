import React, { useState } from "react";
import styles from "./Main.module.css";
import GenerateDataForm from "../../components/ui/generateDataForm/GenerateDataForm";
import DualView from "../../components/ui/dualView/DualView"; // Ensure this import path is correct
import { FormData, ViewProps } from "../../types/componentTypes";
import TitleBar from "../../components/ui/titleBar/TitleBar";

const Main: React.FC<ViewProps> = ({ userID }) => {
    const [formData, setFormData] = useState<FormData>({
        selectionType: "track",
    });

    const handleSetFormData = (newFormData: FormData) => {
        setFormData(newFormData);
    };

    const descriptionElement = (
        <section className={styles.settingsSection}>
            <div className={styles.mainBlurb}>
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
        </section>
    );


    return (
        <>
            <TitleBar userID={userID} title={"Main"} />
            <DualView splitPercentage={35}>
                {descriptionElement}
            </DualView>
        </>
    );
};

export default Main;
