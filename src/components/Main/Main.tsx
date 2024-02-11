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
            <form onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                    <label htmlFor="artist">
                        <FontAwesomeIcon icon={faUser} />
                        <span> Artist</span>
                    </label>
                    <Input
                        id="artist"
                        type="text"
                        name="artist"
                        value={formData.artist}
                        onChange={handleChange}
                        placeholder="Enter artist name"
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="album">
                        <FontAwesomeIcon icon={faCompactDisc} />
                        <span> Album</span>
                    </label>
                    <Input
                        id="album"
                        type="text"
                        name="album"
                        value={formData.album}
                        onChange={handleChange}
                        placeholder="Enter album title"
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="track">
                        <FontAwesomeIcon icon={faMusic} />
                        <span> Track</span>
                    </label>
                    <Input
                        id="track"
                        type="text"
                        name="track"
                        value={formData.track}
                        onChange={handleChange}
                        placeholder="Enter track name"
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="startTimestamp">
                        <FontAwesomeIcon icon={faClock} />
                        <span> Start Time</span>
                    </label>
                    <Input
                        id="startTimestamp"
                        type="datetime-local"
                        name="startTimestamp"
                        value={formData.startTimestamp}
                        onChange={handleChange}
                        placeholder="Start timestamp"
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="endTimestamp">
                        <FontAwesomeIcon icon={faHourglassEnd} />
                        <span> End Time</span>
                    </label>
                    <Input
                        id="endTimestamp"
                        type="datetime-local"
                        name="endTimestamp"
                        value={formData.endTimestamp}
                        onChange={handleChange}
                        placeholder="End timestamp"
                    />
                </div>
                <Button type="submit">Submit</Button>
            </form>
            <div id="results" className={styles.results}>
            </div>
        </section>
    );
};

export default Main;
