import React, { useState } from "react";
import styles from "./Main.module.css";
import Button from "../../components/foundations/button/Button";
import GenerateDataForm from "../../components/ui/generateDataForm/GenerateDataForm";
import { FormData, ViewProps } from "../../types/componentTypes";

const Main: React.FC<ViewProps> = ({ userID }) => {
    const [formData, setFormData] = useState<FormData>({
        selectionType: "track", // Correct usage of selectionType within formData
    });
    const handleSetFormData = (newFormData: FormData) => {
        setFormData(newFormData);
    };

    return (
        <section>
            <h2>Home</h2>
            <form onSubmit={(e) => e.preventDefault()} className={styles.form}>
                <GenerateDataForm
                    formData={formData}
                    setFormData={handleSetFormData}
                    selectionType={formData.selectionType} // Correctly pass selectionType
                    userID={userID}
                />
                <Button type="submit">Submit</Button>
            </form>
        </section>
    );
};

export default Main;