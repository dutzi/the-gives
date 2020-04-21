import React from 'react';
import styles from './index.module.scss';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import useLocalStorage from '../../hooks/use-local-storage';

export default () => {
  const [closedCookieMessage, setClosedCookieMessage] = useLocalStorage(
    'closedCookieMessage',
    false
  );
  const { t } = useTranslation();

  function handleClose(e: React.MouseEvent) {
    e.preventDefault();

    setClosedCookieMessage(true);
  }

  if (closedCookieMessage) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <Trans i18nKey="cookieDisclaimer">
        We use cookies to ensure that we give you the best experience on our
        website. To learn more, click <Link to="/cookies">here</Link>, or{' '}
        <a
          href="#/dismiss"
          onClick={handleClose}
          className={styles.closeButton}
        >
          {t('dismiss')}
        </a>
        .
      </Trans>
    </div>
  );
};
