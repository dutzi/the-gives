import React, { useEffect, useRef, useState, useCallback } from 'react';
import styles from './index.module.scss';
import { useTranslation } from 'react-i18next';
import { ReactComponent as Hero } from '../../svgs/hero.svg';
import gsap, { Back } from 'gsap';
import * as youtube from '../../clients/youtube';
import debounce from 'lodash.debounce';

type TMode = 'home' | 'search';

interface IVideo {
  id?: string;
  title?: string;
  description?: string;
  thumbnail?: string;
}

export default () => {
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [mode, setMode] = useState<TMode>('home');
  const [videos, setVideos] = useState<IVideo[]>([]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    setMode(query.trim() === '' ? 'home' : 'search');
  }, [query]);

  useEffect(() => {
    if (mode === 'search') {
      gsap.timeline().to('[data-logo]', {
        scale: 0.6,
        y: -17,
        duration: 0.6,
        ease: Back.easeInOut.config(1.7),
      });
      gsap.timeline().to('[data-tagline]', {
        opacity: 0,
        pointerEvents: 'none',
        duration: 0.6,
        ease: Back.easeInOut.config(1.7),
      });
      gsap.timeline().to('[data-header], [data-content]', {
        height: 90,
        duration: 0.6,
        ease: Back.easeInOut.config(1.7),
        delay: 0.2,
      });
      gsap.timeline().to('[data-hero]', {
        opacity: 0,
        duration: 0.6,
        ease: Back.easeInOut.config(1.7),
      });
    } else {
    }
  }, [mode]);

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
  }

  const search = useCallback(
    debounce(async (query: string) => {
      const results = await youtube.search(query);

      if (!results) {
        return;
      }

      setVideos(
        results.map((result) => ({
          id: result.id?.videoId,
          title: result.snippet?.title,
          description: result.snippet?.description,
          thumbnail: result.snippet?.thumbnails?.medium?.url,
        }))
      );
    }, 250),
    []
  );

  useEffect(() => {
    if (!query) {
      return;
    }

    search(query);
  }, [query, search]);

  return (
    <div className={styles.wrapper}>
      <header data-header className={styles.header}>
        <div data-content className={styles.content}>
          <div data-logo className={styles.logo}>
            THE.GIVES
          </div>
          <div data-tagline className={styles.tagline}>
            {t('Watch video with friends.')}
          </div>
          <div className={styles.search}>
            <div className={styles.searchBox}>
              <input
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

      <div className={styles.searchResults}>
        {videos.map((video) => (
          <a
            key={video.id}
            href={`/create-room/${video.id}`}
            className={styles.video}
          >
            <img
              alt="thumbnail"
              className={styles.thumbnail}
              src={video.thumbnail}
            />
            <div className={styles.metadata}>
              <div className={styles.title}>{video.title}</div>
              <div className={styles.description}>{video.description}</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
