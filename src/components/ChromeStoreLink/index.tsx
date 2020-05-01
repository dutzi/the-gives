import React from 'react';
import styles from './index.module.scss';
import { useTranslation } from 'react-i18next';

export default () => {
  const { t } = useTranslation();

  return (
    <a
      className={styles.wrapper}
      href="https://chrome.google.com/webstore/detail/njkgkdbagmmjjahkpdhjfcmaildijnjb"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img alt="Chrome Store Logo" src="/chrome-store-logo.png" />
      <div className={styles.rightCol}>
        <div className={styles.line1}>{t('Available on the')}</div>
        <div className={styles.line2}>{t('Chrome Web Store')}</div>
      </div>
    </a>
  );
};
