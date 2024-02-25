import React, { useEffect, useState } from "react";
import styles from "./Main.module.css";
import Button from "../../ui/button/Button";
import Input from "../../ui/input/Input";
import OptionList from "../../ui/optionList/OptionList";
import { MainProps } from "./MainProps";
import getUserData from "../../utils/getUserData";
import {FormData } from "./FormData"
const Main: React.FC<MainProps> = ({ userID, error }) => {
    const [formData, setFormData] = useState<FormData>({ artist: '', album: '', track: '', startTimestamp: '', endTimestamp: '' });
    const [options, setOptions] = useState<any>([]); // Consider defining a more specific type for options.
    const [selectionType, setSelectionType] = useState<"artist" | "album" | "track">("track");

    const { userInfo, userTopAlbums, userTopArtists, userTopTracks } = getUserData(userID);


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleOptionSelect = (type: keyof FormData, option: { name: string }) => {
        setFormData((prevState) => ({
            ...prevState,
            [type]: option.name,
        }));
    };


    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newType = e.target.value as "artist" | "album" | "track";
        setSelectionType(newType);
    };
    


    return (
        <section>
            <h2>Home</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <table className={styles.inputTable}>
                    <tbody>
                        <tr>
                            <td></td>
                            <td>
                                <select value={selectionType} onChange={handleTypeChange}>
                                    <option value="track">Track</option>
                                    <option value="artist">Artist</option>
                                    <option value="album">Album</option>
                                </select>
                            </td>
                            <td>
                                <Input
                                    id={selectionType}
                                    type="text"
                                    name={selectionType}
                                    value={formData[selectionType]}
                                    onChange={handleChange}
                                    placeholder={`Enter ${selectionType} name`}
                                />
                            </td>
                            <td>
                                <OptionList
                                    userID={userID}
                                    options={options[`${selectionType}s`]}
                                    onSelect={(option) => handleOptionSelect(selectionType, option)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td>
                                <Button type="submit">Submit</Button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
            <div id="results" className={styles.results}></div>
        </section>
    );
};

export default Main;