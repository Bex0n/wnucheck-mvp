// components/Smartphone.tsx
import React, { ReactNode } from 'react';
import styles from '@/styles/Smartphone.module.css';

type SmartphoneProps = {
  children?: ReactNode;
};

const Smartphone: React.FC<SmartphoneProps> = ({ children }) => {
  return (
    <div className={styles.smart}>
      <div id="dettaglio">
        <div id="sensore" className={styles.sensore}></div>
        <div id="microfono" className={styles.microfono}></div>
      </div>
      <div id="acenzione-button" className={styles.acenzioneButton}></div>
      <div id="volume-su" className={styles.volumeSu}></div>
      <div id="volume-giu" className={styles.volumeGiu}></div>
      <div id="schermo" className={styles.schermo}>
        {children}
      </div>
      <div id="bottone" className={styles.bottone}></div>
    </div>
  );
};

export default Smartphone;
