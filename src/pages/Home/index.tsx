import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import cx from 'classnames';
import styles from './index.module.scss';
import { useTranslation } from 'react-i18next';
import { ReactComponent as Hero } from '../../svgs/hero.svg';
import gsap, { Back } from 'gsap';
import { useLocation, Link, useHistory } from 'react-router-dom';
import { ReactComponent as Logo } from '../../svgs/logo.svg';
import SearchResults from '../../components/SearchResults';
import { useTransition } from 'react-route-transition';

type TMode = 'home' | 'search' | 'search-immediate';

export default () => {
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [mode, setMode] = useState<TMode>('home');
  const location = useLocation();
  const reactRouterHistory = useHistory();
  const [hasQuery] = useState(new URLSearchParams(location.search).has('q'));

  useTransition({
    handlers: [
      {
        from: '*',
        to: '/',
        onEnter: async () => {
          await gsap.fromTo(
            '[data-search-input]',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5 }
          );
        },
      },
    ],
  });

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.has('q')) {
      setQuery(searchParams.get('q')!);
    }
  }, [location]);

  useEffect(() => {
    const newMode = query.trim() === '' ? 'home' : 'search';
    if (newMode !== mode) {
      setMode(newMode);
    }
  }, [query, mode]);

  useEffect(() => {
    if (query.trim()) {
      reactRouterHistory.replace('/?q=' + query);
    } else {
      reactRouterHistory.replace('/');
    }
  }, [query, reactRouterHistory]);

  useEffect(() => {
    if (mode === 'search' || mode === 'search-immediate') {
      const duration = 0.6;

      gsap.timeline().to('[data-logo]', {
        scale: 0.6,
        y: -17,
        duration,
        ease: Back.easeInOut.config(1.7),
      });
      gsap.timeline().to('[data-tagline]', {
        opacity: 0,
        pointerEvents: 'none',
        duration,
        ease: Back.easeInOut.config(1.7),
      });
      gsap.timeline().to('[data-header], [data-content]', {
        height: 90,
        duration,
        ease: Back.easeInOut.config(1.7),
        delay: 0.2,
      });
      gsap.timeline().to('[data-hero]', {
        opacity: 0,
        duration,
        pointerEvents: 'none',
        ease: Back.easeInOut.config(1.7),
      });
    } else {
    }
  }, [mode]);

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
  }

  return (
    <div className={styles.wrapper}>
      <header
        data-header
        className={cx(styles.header, hasQuery && styles.mini)}
      >
        <div data-content className={styles.content}>
          <div data-logo className={styles.logo}>
            <Link to="/">
              <Logo />
            </Link>
          </div>
          <div data-tagline className={styles.tagline}>
            {t('Watch videos with friends.')}
          </div>
          <div className={styles.search}>
            <div className={styles.searchBox}>
              <input
                data-search-input
                value={query}
                ref={inputRef}
                type="text"
                placeholder={t('Search for videos...')}
                onChange={handleSearchChange}
              />
            </div>
          </div>
          <Hero data-hero className={styles.hero} />
        </div>
      </header>
      <main className={styles.main}>
        <SearchResults query={query} size="lg" />
      </main>
    </div>
  );
};
