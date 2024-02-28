import React from 'react';
import styles from './About.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPenNib, faUser } from '@fortawesome/free-solid-svg-icons';
import { ViewProps } from 'types/componentTypes';
import { useUserData } from '../../hooks/useUserData';
import { useAuthenticator } from 'hooks/useAuthenticator';

const About: React.FC<ViewProps> = () => {
    const { getUserID } = useAuthenticator();
    const { userInfo } = useUserData(getUserID());

    const renderUserInfo = () => {
        if (!userInfo || !userInfo.user) return null;

        const { user } = userInfo;
        const image = user.image?.[0]['#text'];

        const userInfoArray = [
            { label: 'Name', value: user.name, isImage: true, image: image },
            { label: 'Country', value: user.country },
            { label: 'Age', value: user.age?.toString() },
            { label: 'Playcount', value: user.playcount.toString() },
        ];

        return userInfoArray.map((info, index) => {
            if (!info.value) return null;
            return (
                <tr key={index}>
                    <td>
                        <FontAwesomeIcon icon={index === 0 ? faUser : index === 1 ? faPenNib : faEnvelope} aria-hidden="true" />
                    </td>
                    <td>{info.label}:</td>
                    <td>
                        {info.isImage ? (
                            <div>
                                <img src={info.image} alt="User" className={styles.userImage} />
                                {info.value}
                            </div>
                        ) : (
                            info.value
                        )}
                    </td>
                </tr>
            );
        });
    };

    return (
        <section aria-labelledby="about-heading" aria-describedby="about-description">
            <h2 id="about-heading" className={styles.title}>About You</h2>
            <p id="about-description">
                This application generates visual representations of Last.FM data. Here is some basic information about you, based on your Last.FM profile!
            </p>
            <table className={styles.iconTable} aria-label="About information">
                <tbody>
                    {renderUserInfo()}
                </tbody>
            </table>
        </section>
    );
};

export default About;
