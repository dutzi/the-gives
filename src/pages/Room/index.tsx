import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { useTranslation } from 'react-i18next';
import { useRouteMatch } from 'react-router-dom';
import YouTubePlayer from '../../components/YouTubePlayer';
import { ReactComponent as GamepadIcon } from '../../svgs/gamepad.svg';
import { IRoom } from '../../types';
import { roomDocRef } from '../../firestore-refs';

interface IRoomParams {
  roomId: string;
}

export default () => {
  const { t } = useTranslation();
  const match = useRouteMatch<IRoomParams>();
  const [room, setRoom] = useState<IRoom>();

  useEffect(() => {
    roomDocRef(match.params.roomId)
      .get()
      .then((res) => {
        setRoom(res.data()!);
      });
  }, [match.params.roomId]);

  return (
    <div className={styles.wrapper}>
      <header data-header className={styles.header}>
        <div data-content className={styles.content}>
          <div data-logo className={styles.logo}>
            THE.GIVES
          </div>
          <div className={styles.search}>
            <div className={styles.searchBox}>
              <input type="text" placeholder={t('Search for videos...')} />
            </div>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.playerWrapper}>
          <YouTubePlayer videoId={room?.video.id} />
          <div className={styles.remoteStateIndicaator}>
            <GamepadIcon className={styles.icon} />
            <div className={styles.removeState}>{t('You have the remote')}</div>
          </div>
        </div>
      </main>
    </div>
  );
};
