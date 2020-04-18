import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { useTranslation } from 'react-i18next';
import { useRouteMatch } from 'react-router-dom';
import YouTubePlayer from '../../components/YouTubePlayer';
import { ReactComponent as GamepadIcon } from '../../svgs/gamepad.svg';
import { IRoom, IRoomParams } from '../../types';
import { roomDocRef } from '../../firestore-refs';
import VideoChat from '../../components/VideoChat';
import { ReactComponent as Logo } from '../../svgs/logo.svg';
import * as youtube from '../../clients/youtube';
import { getCurrentUserUID } from '../../utils';
import Button from '../../components/Button';
import useRoomId from '../../hooks/use-room-id';
import useProcessing from '../../hooks/use-processing';

export default () => {
  const { t } = useTranslation();
  const match = useRouteMatch<IRoomParams>();
  const [room, setRoom] = useState<IRoom>();
  const roomId = useRoomId();
  const processingRemoteOwner = useProcessing();

  useEffect(() => {
    roomDocRef(roomId)
      .get()
      .then((res) => {
        setRoom(res.data()!);
      });
  }, [roomId]);

  useEffect(() => {
    return roomDocRef(roomId).onSnapshot((roomSnapshot) => {
      const room = roomSnapshot.data();
      setRoom(room);
    });
  }, [roomId]);

  useEffect(() => {
    if (!room || !room.video.id) {
      return;
    }

    // youtube.list(room.video.id).then((res) => console.log(res));
  }, [room]);

  async function handleGetRemote() {
    processingRemoteOwner.start();
    await roomDocRef(roomId).set(
      { remoteOwner: getCurrentUserUID() } as IRoom,
      {
        merge: true,
      }
    );
    processingRemoteOwner.stop();
  }

  const hasRemote = room?.remoteOwner === getCurrentUserUID();

  return (
    <div className={styles.wrapper}>
      <header data-header className={styles.header}>
        <div data-content className={styles.content}>
          <div data-logo className={styles.logo}>
            <Logo />
          </div>
          <div className={styles.search}>
            <div className={styles.searchBox}>
              <input type="text" placeholder={t('Search for videos...')} />
            </div>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.leftPane}>
          <div className={styles.playerWrapper}>
            <YouTubePlayer videoId={room?.video.id} />
          </div>
          <div className={styles.remoteStateIndicaator}>
            <span className={styles.innerFlex}>
              <GamepadIcon className={styles.icon} />
              <div className={styles.removeState}>
                {hasRemote
                  ? t("You've got the remote")
                  : t("They've got the remote")}
              </div>
            </span>
            {!hasRemote && (
              <Button
                size="sm"
                onClick={handleGetRemote}
                showSpinner={processingRemoteOwner.state}
              >
                Get Remote
              </Button>
            )}
          </div>
        </div>
        <div className={styles.rightPane}>
          <VideoChat room={room} />
        </div>
      </main>

      <div>
        <a
          href={
            'https://console.firebase.google.com/u/0/project/the-gives/' +
            'database/firestore/data~2Frooms~2F' +
            roomId
          }
          rel="noopener noreferrer"
          target="_blank"
        >
          Firestore
        </a>
      </div>
    </div>
  );
};
