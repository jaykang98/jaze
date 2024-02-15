import React, { useState, useEffect } from 'react';
import styles from './Main.module.css';
import Button from '../../ui/button/Button';
import Input from '../../ui/input/Input';
import OptionList from '../../ui/optionList/OptionList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCompactDisc, faMusic, faClock, faHourglassEnd } from '@fortawesome/free-solid-svg-icons';
import TimeSelectionRow from '../../ui/timeSelectionRow/TimeSelectionRow';

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

const Main: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        artist: '',
        album: '',
        track: '',
        startTimestamp: '',
        endTimestamp: '',
    });

    const [options, setOptions] = useState<Options>({
        artists: [],
        albums: [],
        tracks: [],
    });

    interface FetchAPIParams {
        limit: number;
    }

    const fetchAPI = async (method: string, params: FetchAPIParams): Promise<any> => {
        const apiKey = '053905e1fc8b0de378dc341a24ec68c7';
        const user = localStorage.getItem('userID');
        const url = `https://ws.audioscrobbler.com/2.0/?method=${method}&user=${user}&period=12month&limit=${params.limit}&api_key=${apiKey}&format=json`;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Fetch error:', error);
            return null;
        }
    };



    useEffect(() => {
        const fetchData = async () => {
            const artistsData = await fetchAPI('user.gettopartists', { limit: 4 });
            const albumsData = await fetchAPI('user.gettopalbums', { limit: 4 });
            const tracksData = await fetchAPI('user.gettoptracks', { limit: 4 });


            setOptions({
                artists: artistsData?.topartists?.artist ?? [],
                albums: albumsData?.topalbums?.album ?? [],
                tracks: tracksData?.toptracks?.track ?? [],
            });
        };

        fetchData();
    }, []);

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


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
                            <td>
                                <OptionList options={options.artists} onSelect={(option) => handleOptionSelect('artist', option)} />
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
                            <td>
                                <OptionList options={options.albums} onSelect={(option) => handleOptionSelect('album', option)} />
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
                            <td>
                                <OptionList options={options.tracks} onSelect={(option) => handleOptionSelect('track', option)} />
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
                            <td>
                                <TimeSelectionRow
                                    label="Start Time"
                                    timestamp={formData.startTimestamp}
                                    onChange={handleChange}
                                    onYearSelect={(year) => setFormData({ ...formData, startTimestamp: `${year}-01-01T00:00` })}
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
                            <td>
                                <TimeSelectionRow
                                    label="End Time"
                                    timestamp={formData.endTimestamp}
                                    onChange={handleChange}
                                    onYearSelect={(year) => setFormData({ ...formData, endTimestamp: `${year}-01-01T00:00` })}
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
