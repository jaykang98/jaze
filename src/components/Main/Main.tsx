import React, { useState } from 'react';
import styles from './Main.module.css';
import Button from '../../ui/button/Button'; // Adjust the path as necessary
import Input from '../../ui/input/Input'; // Adjust the path as necessary

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
        <section className={styles.formContainer}>
            <form onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                    <label htmlFor="artist">Artist</label>
                    <Input
                        id="artist"
                        type="text"
                        name="artist"
                        value={formData.artist}
                        onChange={handleChange}
                        placeholder="Enter artist name" label={''}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="album">Album</label>
                    <Input
                        id="album"
                        type="text"
                        name="album"
                        value={formData.album}
                        onChange={handleChange}
                        placeholder="Enter album title" label={''}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="track">Track</label>
                    <Input
                        id="track"
                        type="text"
                        name="track"
                        value={formData.track}
                        onChange={handleChange}
                        placeholder="Enter track name" label={''}                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="startTimestamp">Start Time</label>
                    <Input
                        id="startTimestamp"
                        type="datetime-local"
                        name="startTimestamp"
                        value={formData.startTimestamp}
                        onChange={handleChange}
                        placeholder="Start timestamp" label={''}                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="endTimestamp">End Time</label>
                    <Input
                        id="endTimestamp"
                        type="datetime-local"
                        name="endTimestamp"
                        value={formData.endTimestamp}
                        onChange={handleChange}
                        placeholder="End timestamp" label={''}                    />
                </div>
                <Button type="submit">Submit</Button>
            </form>
            <div id="results" className={styles.results}>
                
            </div>

        </section>

    );
};

export default Main;
