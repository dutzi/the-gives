import React, { useState, useRef } from 'react';
import styles from './index.module.scss';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useOnClickOutside from '../../hooks/use-on-click-outside';
import { TSupportedLanguages } from '../../i18n';
import { useDispatch } from 'react-redux';
import { uiThunks } from '../../state/reducers/ui-slice';

export default () => {
  const { t } = useTranslation();
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const languageSelectorRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  useOnClickOutside(languageSelectorRef, () => {
    setShowLanguageSelector(false);
  });

  function handleShowLanguageSelector(e: React.MouseEvent) {
    e.preventDefault();

    setShowLanguageSelector(true);
  }

  function handleSelectLanguage(language: TSupportedLanguages) {
    dispatch(uiThunks.setLanguage(language));
    setShowLanguageSelector(false);
  }

  function handleToggleDarkMode(e: React.MouseEvent) {
    e.preventDefault();
    localStorage.setItem(
      'colorSchema',
      localStorage.getItem('colorSchema') === 'light' ? 'dark' : 'light'
    );
    document.body.classList.toggle('dark');
  }

  return (
    <div className={styles.wrapper}>
      <a
        href="mailto:the@dutzi.party"
        target="_blank"
        rel="noreferrer noopener"
      >
        {t('Contact')}
      </a>
      <span className={styles.middleDot}>·</span>
      <Link to="/privacy-policy">{t('Privacy Policy')}</Link>
      <span className={styles.middleDot}>·</span>
      <Link to="/terms-of-service">{t('Terms of Service')}</Link>
      <span className={styles.middleDot}>·</span>
      <div className={styles.languageSelector}>
        {showLanguageSelector && (
          <div className={styles.languages} ref={languageSelectorRef}>
            <button
              onClick={handleSelectLanguage.bind(null, 'en')}
              className={styles.languageButton}
            >
              English
            </button>
            <button
              onClick={handleSelectLanguage.bind(null, 'he')}
              className={styles.languageButton}
            >
              עברית
            </button>
          </div>
        )}
        <a href="#/language" onClick={handleShowLanguageSelector}>
          {t('Language')}
        </a>
      </div>
      <span className={styles.middleDot}>·</span>
      <a href="#/toggle-dark-mode" onClick={handleToggleDarkMode}>
        {t('Toggle Dark Mode')}
      </a>
      <span className={styles.middleDot}>·</span>
      <Link to="/about">{t('About')}</Link>
    </div>
  );
};
