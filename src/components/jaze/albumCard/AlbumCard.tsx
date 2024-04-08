import React from "react";
import styles from "./AlbumCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface AlbumCardProps {
  src: string;
  alt: string;
  caption: string;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ src, alt, caption }) => {
  return (
    <div className={styles.albumCard}>
        <img src={src} alt={alt} className={styles.albumImage} />
          <div className={styles.container}>
            <FontAwesomeIcon icon={faSpotify as IconProp} />
            <figcaption className={styles.caption}>{caption}</figcaption>
        </div>
    </div>
  );
};

export default AlbumCard;
