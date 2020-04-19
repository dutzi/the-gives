import React, { useState, useEffect, useCallback } from 'react';
import cx from 'classnames';
import styles from './index.module.scss';
import { IVideo } from '../../types';
import { roomColRef } from '../../firestore-refs';
import { getCurrentUserUID } from '../../utils';
import { useTransitionHistory } from 'react-route-transition';
import debounce from 'lodash.debounce';
import { useInView } from 'react-intersection-observer';
import * as youtube from '../../clients/youtube';

export default ({ query, size }: { query: string; size: 'md' | 'lg' }) => {
  const [videos, setVideos] = useState<IVideo[]>([]);
  const history = useTransitionHistory();
  const [loadingMoreRef, inView] = useInView();
  const [nextPageToken, setNextPageToken] = useState<string>();

  const search = useCallback(
    debounce(async (query: string, nextPageToken?: string) => {
      const response = await youtube.search({ query, nextPageToken });

      if (!response || !response.items) {
        return;
      }

      setVideos((videos) => [
        ...videos,
        ...response.items
          .filter((result) => result.id?.kind === 'youtube#video')
          .map((result) => ({
            id: result.id?.videoId,
            title: result.snippet?.title,
            description: result.snippet?.description,
            thumbnail: result.snippet?.thumbnails?.medium?.url,
          })),
      ]);

      setNextPageToken(response.nextPageToken);
    }, 250),
    []
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
    const room = await roomColRef().add({
      video,
      platform: 'youtube',
      remoteOwner: getCurrentUserUID(),
      host: getCurrentUserUID(),
    });
    history.push(`/w/${room.id}`);
  }

  useEffect(() => {
    if (!query) {
      return;
    }

    search(query);
  }, [query, search]);

  return (
    <div className={cx(styles.wrapper, styles[size])}>
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
