import React from 'react';
import styles from './index.module.scss';
import { ReactComponent as Logo } from '../../svgs/logo.svg';
import { version } from '../../../package.json';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useTrackPageView from '../../hooks/use-track-page-view';

export default () => {
  const { t } = useTranslation();
  useTrackPageView();

  return (
    <div className={styles.wrapper}>
      <Link to="/">
        <Logo />
      </Link>
      <p className={styles.version}>
        {t('Version')} {version}
      </p>
      <p>
        This site makes use of fonts from{' '}
        <a href="https://fontawesome.com/">Font Awesome</a>.
      </p>
      <div className={styles.flex1}></div>
      <Footer />
    </div>
  );
};
