import React, { useState } from 'react';
import styles from './Main.module.css';
import Button from '../../ui/button/Button';
import Input from '../../ui/input/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCompactDisc, faMusic, faClock, faHourglassEnd } from '@fortawesome/free-solid-svg-icons';

const Main = () => {
    const [formData, setFormData] = useState({
        artist: '',
        album: '',
        track: '',
        startTimestamp: '',
        endTimestamp: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <section>
            <h2>Home</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <table className={styles.inputTable}>
                    <tbody>
                        <tr>
                            <td><FontAwesomeIcon icon={faUser} /></td>
                            <td>Artist</td>
                            <td>
                                <Input
                                    id="artist"
                                    type="text"
                                    name="artist"
                                    value={formData.artist}
                                    onChange={handleChange}
                                    placeholder="Enter artist name"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><FontAwesomeIcon icon={faCompactDisc} /></td>
                            <td>Album</td>
                            <td>
                                <Input
                                    id="album"
                                    type="text"
                                    name="album"
                                    value={formData.album}
                                    onChange={handleChange}
                                    placeholder="Enter album title"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><FontAwesomeIcon icon={faMusic} /></td>
                            <td>Track</td>
                            <td>
                                <Input
                                    id="track"
                                    type="text"
                                    name="track"
                                    value={formData.track}
                                    onChange={handleChange}
                                    placeholder="Enter track name"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><FontAwesomeIcon icon={faClock} /></td>
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
                        </tr>
                        <tr>
                            <td><FontAwesomeIcon icon={faHourglassEnd} /></td>
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
            <div id="results" className={styles.results}>
            </div>
        </section>
    );
};

export default Main;
