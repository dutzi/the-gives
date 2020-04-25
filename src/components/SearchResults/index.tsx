import React, { useState, useEffect, useCallback } from 'react';
import cx from 'classnames';
import styles from './index.module.scss';
import { IVideo } from '../../types';
import { useTransitionHistory } from 'react-route-transition';
import debounce from 'lodash.debounce';
import { useInView } from 'react-intersection-observer';
import * as youtube from '../../clients/youtube';
import { useTranslation } from 'react-i18next';
import firebase from 'firebase/app';
import createRoom from '../../clients/create-room';
import { useDispatch } from 'react-redux';
import uiSlice from '../../state/reducers/ui-slice';
import { useTypedSelector } from '../../state/store';

export default ({ query, size }: { query: string; size: 'md' | 'lg' }) => {
  const [videos, setVideos] = useState<IVideo[]>([]);
  const history = useTransitionHistory();
  const [loadingMoreRef, inView] = useInView();
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [nextPageToken, setNextPageToken] = useState<string>();
  const isYoutubeDown = useTypedSelector((state) => state.ui.isYoutubeDown);

  const dispatch = useDispatch();

  const search = useCallback(
    debounce(async (query: string, nextPageToken?: string) => {
      try {
        const response = await youtube.search({
          query,
          nextPageToken,
          useFallback: isYoutubeDown,
        });

        if (!response || !response.items) {
          return;
        }

        setVideos((videos) => [
          ...videos,
          ...(response.items ?? [])
            .filter((result) => result.id?.kind === 'youtube#video')
            .map((result) => ({
              id: result.id?.videoId,
              title: result.snippet?.title,
              description: result.snippet?.description,
              thumbnail: result.snippet?.thumbnails?.medium?.url,
            })),
        ]);

        setNextPageToken(response.nextPageToken);
      } catch (err) {
        dispatch(uiSlice.actions.setIsYoutubeDown(true));
      }
    }, 250),
    [isYoutubeDown]
  );

  useEffect(() => {
    setNextPageToken(undefined);
    setVideos([]);
  }, [query]);

  useEffect(() => {
    if (inView && nextPageToken) {
      search(query, nextPageToken);
    }
  }, [inView, search, query, nextPageToken]);

  async function handleVideoClick(video: IVideo, e: React.MouseEvent) {
    e.preventDefault();
    const room = await createRoom(video);
    history.push(`/w/${room.id}`);
  }

  useEffect(() => {
    if (!query) {
      return;
    }

    search(query);
  }, [query, search, isYoutubeDown]);

  function handleSubmitEmail(e: React.FormEvent) {
    e.preventDefault();
    firebase.firestore().collection('emails').add({ email });
    alert('Thanks! I will email you once this is fixed!');
  }

  return (
    <div className={cx(styles.wrapper, styles[size])}>
      {isYoutubeDown && !videos.length && (
        <div className={styles.disclaimer}>
          <div className={styles.contact}>
            {t(
              'This got big really quick. I maxed out the number of API calls I can make ' +
                'to YouTube. Search will show other results for now. Leave your Email below ' +
                "and I'll email you once this has sorted out."
            )}
          </div>
          <div>
            <form className={styles.emailForm} onSubmit={handleSubmitEmail}>
              <input
                type="text"
                value={email}
                placeholder="john@example.com"
                className={styles.email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="margin-h-md" />
              <input className={styles.submit} type="submit"></input>
            </form>
          </div>
        </div>
      )}
      {isYoutubeDown && !!videos.length && (
        <div className={styles.quota}>
          {t(
            "I've exceeded YouTube's quota. You can still paste YouTube links in search field above."
          )}

          <div className={styles.footnote}>
            {t(
              'Here are some John Oliver clips instead of what you searched for. Sorry. 😕'
            )}
          </div>
        </div>
      )}
      {videos.map((video) => (
        <a
          key={video.id}
          href={`/create-room/yt_${video.id}`}
          onClick={handleVideoClick.bind(null, video)}
          className={styles.video}
        >
          <img
            alt="thumbnail"
            className={styles.thumbnail}
            src={video.thumbnail}
          />
          <div className={styles.metadata}>
            <div
              className={styles.title}
              dangerouslySetInnerHTML={{ __html: video.title ?? '' }}
            />
            <div className={styles.description}>{video.description}</div>
          </div>
        </a>
      ))}
      {!!videos.length && !!nextPageToken && (
        <div ref={loadingMoreRef} className={styles.spinner}>
          Loading More Video...
        </div>
      )}
    </div>
  );
};
