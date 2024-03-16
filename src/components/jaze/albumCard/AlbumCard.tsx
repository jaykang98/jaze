import React from "react";
import styles from "./AlbumCard.module.css";

interface AlbumCardProps {
  src: string;
  alt: string;
  caption: string;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ src, alt, caption }) => {
  return (
    <div className={styles.albumCard}>
      <img src={src} alt={alt} className={styles.albumImage} />
      <figcaption className={styles.caption}>{caption}</figcaption>
    </div>
  );
};

export default AlbumCard;
