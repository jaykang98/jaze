import React from "react";
import styles from "./UserCard.module.css";
import { useLocalStorage } from "../../../hooks/utils/useLocalStorage";
import { faLastfmSquare, faSpotify } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

const UserCard: React.FC<{ src: string, alt: string }> = ({ src, alt }) => {
    const { getItem } = useLocalStorage();
    const userProfile = JSON.parse(getItem("SpotifyUserData") || '{}');
    const userData = JSON.parse(getItem("lastFMUserData") || '{}');

    return (
        <div className={styles.userCard}>
            <img src={src} alt={alt} className={styles.userImage} />
            <div className={styles.container}>
                <FontAwesomeIcon icon={faSpotify as IconProp} />
                {userProfile.external_urls?.spotify ? (
                    <a href={userProfile.external_urls.spotify} key="spotify-link" className={styles.link}>
                        Spotify: {userProfile.display_name}
                    </a>
                ) : (
                    <span className={styles.link}> Spotify: Not Logged In</span>
                )}
            </div>
            <div className={styles.container}>
                <FontAwesomeIcon icon={faLastfmSquare as IconProp} />
                {userData.user?.url ? (
                    <a href={userData.user.url} key="lastfm-link" className={styles.link}>
                        Last.FM: {userData.user.name}
                    </a>
                ) : (
                    <span className={styles.link}> Last.FM: Not Logged In</span>
                )}
            </div>
        </div>
    );

};

export default UserCard;
