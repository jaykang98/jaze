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
                {/* Replace table with a more semantic structure if desired */}
                <div>
                    <Input
                        label="Artist"
                        type="text"
                        name="artist"
                        value={formData.artist}
                        onChange={handleChange}
                    />
                    <Input
                        label="Album"
                        type="text"
                        name="album"
                        value={formData.album}
                        onChange={handleChange}
                    />
                    <Input
                        label="Track"
                        type="text"
                        name="track"
                        value={formData.track}
                        onChange={handleChange}
                    />
                    <Input
                        label="Start Time"
                        type="datetime-local"
                        name="startTimestamp"
                        value={formData.startTimestamp}
                        onChange={handleChange}
                    />
                    <Input
                        label="End Time"
                        type="datetime-local"
                        name="endTimestamp"
                        value={formData.endTimestamp}
                        onChange={handleChange}
                    />
                    {/* Assuming Button component accepts an onClick prop for submit action */}
                    <Button onClick={handleSubmit}>Generate</Button>
                </div>
            </form>
            <div id="results" className={styles.results}>
                {/* Results can be displayed here */}
            </div>
        </section>
    );
};

export default Main;
