import React, { useState } from "react";
import styles from "./Main.module.css";
import Button from "../../components/button/Button";
import {
  ViewProps,
  FormData,
  Options,
  OptionType,
} from "../../types/componentTypes";
import InputSelection from "../../components/input/InputSelection";

const Main: React.FC<ViewProps> = () => {
  const [formData, setFormData] = useState<FormData>({
    artist: "",
    album: "",
    track: "",
    startTimestamp: "",
    endTimestamp: "",
  });
  const [selectionType, setSelectionType] = useState<
    "artist" | "album" | "track"
  >("track");
  const [options] = useState<Options>({
    artists: [],
    albums: [],
    tracks: [],
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectionType(event.target.value as "artist" | "album" | "track");
  };

  const handleOptionSelect = (type: keyof FormData, option: OptionType) => {
    setFormData((prev) => ({ ...prev, [type]: option.name }));
  };

  return (
    <section>
      <h2>Home</h2>
      <form onSubmit={(e) => e.preventDefault()} className={styles.form}>
        <table className={styles.inputTable}>
          <tbody>
            <InputSelection
              selectionType={selectionType}
              formData={formData}
              handleChange={handleChange}
              handleTypeChange={handleTypeChange}
              options={options}
              handleOptionSelect={handleOptionSelect}
            />
            <tr>
              <td colSpan={3}>
                <Button type="submit">Submit</Button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </section>
  );
};

export default Main;
