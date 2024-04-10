import React, { useEffect, useState } from "react";
import styles from "./AlbumCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { spotifySearch } from "../../../hooks/dataManagement/search";

interface AlbumCardProps {
    src: string;
    alt: string;
    caption: string;
    type?: string;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ src, alt, caption, type }) => {
    const [url, setUrl] = useState<string>('');

    useEffect(() => {
        const fetchUrl = async () => {
            const result = await spotifySearch(type, caption);
            setUrl(result.toString());
        };

        fetchUrl();
    }, [type, caption]);

    return (
        <><div className={styles.albumCard} onClick={() => window.location.href = url }>
        <img src={src} alt={alt} className={styles.albumImage} /><div className={styles.container}>
                <FontAwesomeIcon icon={faSpotify as IconProp} />
                <span className={styles.caption}>{caption}</span>
            </div>
        </div></>
    );
};

export default AlbumCard;
