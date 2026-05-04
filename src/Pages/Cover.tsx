import { useRef, type ChangeEventHandler } from "react";
import styles from "./Cover.module.css";

export default function Cover() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onChangeCoverImage = () => {
    fileInputRef.current?.click();
  };

  const onCoverImageUpload:ChangeEventHandler<HTMLInputElement> = (e) => {
    const target = e.target;
    console.log(target?.files?.[0]);
    
  }

  return (
    <div className={styles.cover}>
      <img src="/cod_rink.png" alt="Cover" className={styles.image} />
      <button className={styles.button} onClick={onChangeCoverImage}>
        Changer de couverture
      </button>
      <input onChange={onCoverImageUpload} style={{ display: "none" }} ref={fileInputRef} type="file" />
    </div>
  );
}
