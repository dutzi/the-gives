import React, { useEffect, useState, useCallback, useRef } from 'react';
import styles from './index.module.scss';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import YouTubePlayer from '../../components/YouTubePlayer';
import { ReactComponent as GamepadIcon } from '../../svgs/gamepad.svg';
import { IRoom } from '../../types';
import { roomDocRef } from '../../firestore-refs';
import VideoChat from '../../components/VideoChat';
import { ReactComponent as Logo } from '../../svgs/logo.svg';
import { getCurrentUserUID, showAdminTools, isMobile } from '../../utils';
import Button from '../../components/Button';
import useRoomId from '../../hooks/use-room-id';
import useProcessing from '../../hooks/use-processing';
import { useTransitionHistory, useTransition } from 'react-route-transition';
import usePlayerSync from './use-player-sync';
import gsap, { Back } from 'gsap';
import DarkModeButton from '../../components/DarkModeButton';

const initialVideoWidth = isMobile() ? window.innerWidth - 16 * 2 : 640;
const initialVideoHeight = (initialVideoWidth * 9) / 16;

export default () => {
  const { t } = useTranslation();
  const [room, setRoom] = useState<IRoom>();
  const roomId = useRoomId();
  const processingRemoteOwner = useProcessing();
  const playerRef = useRef<any>(null);
  const history = useTransitionHistory();
  const [playerSize, setPlayerSize] = useState({
    width: initialVideoWidth,
    height: initialVideoHeight,
  });

  useTransition({
    handlers: [
      {
        from: '*',
        to: '/',
        onLeave: async () => {
          await gsap.timeline().to('[data-search-input]', {
            // scale: 1.2916,
            // x: -120,
            // y: 25,
            // width: (600 * 1) / 1.2916,
            opacity: 0,
            y: -20,
            duration: 0.5,
            ease: Back.easeIn.config(1.2),
          });
        },
      },
    ],
  });

  const handleCurrentTimeChange = useCallback((currentTime: number) => {
    if (!playerRef.current) {
      throw new Error('playerRef missing');
    }

    playerRef.current.setCurrentTime(currentTime);
  }, []);

  const handleStateChange = useCallback((isPlaying) => {
    if (!playerRef.current) {
      throw new Error('playerRef missing');
    }

    playerRef.current.setState(isPlaying);
  }, []);

  const playerSync = usePlayerSync({
    // roomId,
    onCurrentTimeChange: handleCurrentTimeChange,
    onStateChange: handleStateChange,
  });

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

  function handleShareFocus(e: React.FocusEvent) {
    const input = e.currentTarget as HTMLInputElement;
    setTimeout(() => {
      input.setSelectionRange(0, input.value.length);
    }, 0);
    e.preventDefault();
    e.stopPropagation();
  }

  const hasRemote = room?.remoteOwner === getCurrentUserUID();

  function handleSearchKeyDown(e: React.KeyboardEvent) {
    if (e.keyCode === 13) {
      history.push('/?q=' + (e.target as HTMLInputElement).value);
    }
  }

  useEffect(() => {
    function handleResize() {
      const maxWidth = 640;
      const width = isMobile()
        ? window.innerWidth - 32
        : Math.min(maxWidth, window.innerWidth * 0.666);
      setPlayerSize({ width, height: (width * 9) / 16 });
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  function handleToggleFullscreen() {}

  let remoteOwnerLabel = hasRemote
    ? isMobile()
      ? t('Remote is yours')
      : t("You've got the remote")
    : isMobile()
    ? t('Remote is theirs')
    : t("They've got the remote");

  return (
    <div className={styles.wrapper}>
      <header data-header className={styles.header}>
        <div data-content className={styles.content}>
          <div data-logo className={styles.logo}>
            <Link to="/">
              <Logo />
            </Link>
          </div>
          <div className={styles.search}>
            <div className={styles.searchBox}>
              <input
                data-search-input
                type="text"
                placeholder={t('Search for videos...')}
                onKeyDown={handleSearchKeyDown}
              />
            </div>
          </div>
        </div>
        <DarkModeButton />
      </header>
      <main className={styles.container}>
        <div className={styles.videoAndVideoChat}>
          <div className={styles.leftPane}>
            <div
              className={styles.playerWrapper}
              style={{
                width: playerSize.width + 'px',
                height: playerSize.height + 'px',
              }}
            >
              <YouTubePlayer
                ref={playerRef}
                onStateChange={playerSync.handleStateChange}
                onCurrentTimeChange={playerSync.handleCurrentTimeChange}
                videoId={room?.video.id}
                width={playerSize.width}
                height={playerSize.height}
              />
            </div>
            <div className={styles.remoteStateIndicaator}>
              <span className={styles.innerFlex}>
                <GamepadIcon className={styles.icon} />
                <div className={styles.removeState}>{remoteOwnerLabel}</div>
              </span>
              {!hasRemote && (
                <Button
                  size="sm"
                  onClick={handleGetRemote}
                  showSpinner={processingRemoteOwner.state}
                  color="secondary"
                >
                  {isMobile() ? t('Get It') : t('Get Remote')}
                </Button>
              )}
            </div>
          </div>
          <div className={styles.rightPane}>
            <VideoChat room={room} />
          </div>
        </div>
        <div className="margin-h-lg" />
        <div className={styles.shareBox}>
          <input
            className={styles.shareLink}
            value={window.location.href}
            onFocus={handleShareFocus}
          />
          <div className="margin-h-md" />
          <div>
            {t('(share this link with a friend so they can join your room)')}
          </div>
        </div>
        <div className="margin-h-lg" />
        <div className={styles.actions}>
          <Button color="primary" onClick={handleToggleFullscreen}>
            {t('Enter Fullscreen')}
          </Button>
        </div>
        {showAdminTools() && (
          <div className={styles.adminTools}>
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
        )}
      </main>
    </div>
  );
};
