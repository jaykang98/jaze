import React, { useEffect, useState } from "react";
import styles from "./Main.module.css";
import Button from "../../components/button/Button";
import { ViewProps, FormData, Options, OptionType } from "../../index.d"; // Ensure OptionType is imported
import { useAuthenticator } from "../../hooks/useAuthenticator";
import InputSelection from "../../components/input/InputSelection"; // Ensure correct path

const Main: React.FC<ViewProps> = ({ userID, error, onViewChange }) => {
  const { startAuth, fetchSession, setUserID, getUserID } = useAuthenticator();

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
  const [options, setOptions] = useState<Options>({
    artists: [],
    albums: [],
    tracks: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      if (userID) {
        try {
          const data = await fetchSession(userID);
        } catch (err) {
          console.error("Failed to fetch user data:", err);
        }
      }
    };
    fetchData();
  }, [userID]);

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
