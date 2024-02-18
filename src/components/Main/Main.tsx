import React, { useState } from "react";
import styles from "./Main.module.css";
import Button from "../../ui/button/Button";
import Input from "../../ui/input/Input";
import OptionList from "../../ui/optionList/OptionList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faHourglassEnd } from "@fortawesome/free-solid-svg-icons";
import TimeSelectionRow from "../../ui/timeSelectionRow/TimeSelectionRow";

interface FormData {
    artist: string;
    album: string;
    track: string;
    startTimestamp: string;
    endTimestamp: string;
}

interface Options {
    artists: Array<{ name: string }>;
    albums: Array<{ name: string }>;
    tracks: Array<{ name: string }>;
}
const Main = ({ userID, error, onViewChange }) => {
    React.useEffect(() => {
        onViewChange("Main");
    }, [onViewChange]);
    const [formData, setFormData] = useState<FormData>({
        artist: "",
        album: "",
        track: "",
        startTimestamp: "",
        endTimestamp: "",
    });

    const [options, setOptions] = useState<Options>({
        artists: [],
        albums: [],
        tracks: [],
    });

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
    const handleOptionSelect = (
        type: keyof FormData,
        option: { name: string },
    ) => {
        setFormData((prevState) => ({
            ...prevState,
            [type]: option.name,
        }));
    };
    const [selectionType, setSelectionType] = useState<
        "artist" | "album" | "track"
    >("track");

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
                                    options={options[`${selectionType}s`]}
                                    onSelect={(option) =>
                                        handleOptionSelect(selectionType, option)
                                    }
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <FontAwesomeIcon icon={faClock} />
                            </td>
                            <td>Start Time</td>
                            <td>
                                <Input
                                    id="startTimestamp"
                                    type="datetime-local"
                                    name="startTimestamp"
                                    value={formData.startTimestamp}
                                    onChange={handleChange}
                                    placeholder="Start timestamp"
                                />
                            </td>
                            <td>
                                <TimeSelectionRow
                                    label="Start Time"
                                    timestamp={formData.startTimestamp}
                                    onChange={handleChange}
                                    onYearSelect={(year) =>
                                        setFormData({
                                            ...formData,
                                            startTimestamp: `${year}-01-01T00:00`,
                                        })
                                    }
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <FontAwesomeIcon icon={faHourglassEnd} />
                            </td>
                            <td>End Time</td>
                            <td>
                                <Input
                                    id="endTimestamp"
                                    type="datetime-local"
                                    name="endTimestamp"
                                    value={formData.endTimestamp}
                                    onChange={handleChange}
                                    placeholder="End timestamp"
                                />
                            </td>
                            <td>
                                <TimeSelectionRow
                                    label="End Time"
                                    timestamp={formData.endTimestamp}
                                    onChange={handleChange}
                                    onYearSelect={(year) =>
                                        setFormData({
                                            ...formData,
                                            endTimestamp: `${year}-01-01T00:00`,
                                        })
                                    }
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
