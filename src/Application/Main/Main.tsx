/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import styles from "./Main.module.css";
import Button from "../../components/foundations/button/Button";
import {
  ViewProps,
  FormData,
} from "../../types/componentTypes";
import InputSelection from "../../components/ui/inputSelection/InputSelection";
import { useUserData } from '../../hooks/useUserData';
import { useAuthenticator } from "../../hooks/useAuthenticator"
import { Option } from "../../types/componentTypes";

const Main: React.FC<ViewProps> = () => {
    const { getUserID } = useAuthenticator();
    const { UserData, AlbumData, ArtistData, TrackData } = useUserData(getUserID());
    const [error, setError] = useState<string | null>(null);

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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectionType(event.target.value as "artist" | "album" | "track");
  };

  const handleOptionSelect = (type: keyof FormData, option: Option) => {
    setFormData((prev) => ({ ...prev, [type]: option.name }));
  };

  return (
    <section>
      <h2>Home</h2>
      <form onSubmit={(e) => e.preventDefault()} className={styles.form}>
        <table>
          <tbody>
            <InputSelection
              selectionType={selectionType}
              formData={formData}
              handleTypeChange={handleTypeChange}
              options={options}
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
