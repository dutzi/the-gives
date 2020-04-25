import React, { useEffect, useRef, useState } from 'react';
import cx from 'classnames';
import styles from './index.module.scss';
import { useTranslation } from 'react-i18next';
import { ReactComponent as Hero } from '../../svgs/hero.svg';
import gsap, { Back } from 'gsap';
import { useLocation, Link, useHistory } from 'react-router-dom';
import { ReactComponent as Logo } from '../../svgs/logo.svg';
import SearchResults from '../../components/SearchResults';
import { useTransition, useTransitionHistory } from 'react-route-transition';
import DarkModeButton from '../../components/DarkModeButton';
import Footer from '../../components/Footer';
import CookiePolicyMessage from '../../components/CookiePolicyMessage';
import { isYouTubeLink, getYouTubeVideoId } from '../../utils';
import createRoom from '../../clients/create-room';
import { IVideo } from '../../types';
import ProductHunt from '../../components/ProductHunt';
import useIsMobile from '../../hooks/use-is-mobile';
import ChromeStoreLink from '../../components/ChromeStoreLink';
import useTrackPageView from '../../hooks/use-track-page-view';

type TMode = 'home' | 'search' | 'search-immediate';

export default () => {
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [mode, setMode] = useState<TMode>('home');
  const location = useLocation();
  const reactRouterHistory = useHistory();
  const history = useTransitionHistory();
  const [hasQuery] = useState(new URLSearchParams(location.search).has('q'));
  const isMobile = useIsMobile();
  useTrackPageView();

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
    const value = e.target.value;

    setQuery(value);
  }

  async function handleKeyDown(e: React.KeyboardEvent) {
    if (e.keyCode === 13 && isYouTubeLink(query)) {
      const videoId = getYouTubeVideoId(query);

      if (!videoId) {
        return;
      }

      const room = await createRoom({ id: videoId } as IVideo);
      history.push(`/w/${room.id}`);
    }
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
          {/* {!isMobile && !query && <ProductHunt />} */}
          <div data-tagline className={styles.tagline}>
            {t('Watch videos while video chatting with friends.')}
          </div>
          <div className={styles.search}>
            <div className={styles.searchBox}>
              <input
                data-search-input
                value={query}
                ref={inputRef}
                type="text"
                placeholder={
                  isMobile
                    ? t('Paste YouTube URL, or search')
                    : t('Paste YouTube URL, or search for videos...')
                }
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>
          <Hero data-hero className={styles.hero} />
        </div>
        {/* {!isMobile && !!query && <DarkModeButton />} */}
      </header>
      <main className={styles.main}>
        {/* {!query && <ChromeStoreLink />} */}
        {!isYouTubeLink(query) && <SearchResults query={query} size="lg" />}
      </main>
      <CookiePolicyMessage />
      <Footer />
    </div>
  );
};
