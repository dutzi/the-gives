import React, { useEffect, useState, useCallback, useRef } from 'react';
import cx from 'classnames';
import styles from './index.module.scss';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import YouTubePlayer from '../../components/YouTubePlayer';
import { ReactComponent as GamepadIcon } from '../../svgs/gamepad.svg';
import { ReactComponent as FireIcon } from '../../svgs/fire.svg';
import { ReactComponent as ClipboardIcon } from '../../svgs/clipboard.svg';
import { ReactComponent as ExpandIcon } from '../../svgs/expand.svg';
import { ReactComponent as CompressIcon } from '../../svgs/compress.svg';
import { IRoom, IVideo } from '../../types';
import { roomDocRef } from '../../firestore-refs';
import VideoChat from '../../components/VideoChat';
import { ReactComponent as Logo } from '../../svgs/logo.svg';
import {
  getCurrentUserUID,
  showAdminTools,
  isMobile,
  isYouTubeLink,
  getYouTubeVideoId,
} from '../../utils';
import Button from '../../components/Button';
import useRoomId from '../../hooks/use-room-id';
import useProcessing from '../../hooks/use-processing';
import { useTransitionHistory, useTransition } from 'react-route-transition';
import usePlayerSync from './use-player-sync';
import gsap, { Back } from 'gsap';
import DarkModeButton from '../../components/DarkModeButton';
import useLocalStorage from '../../hooks/use-local-storage';
import createRoom from '../../clients/create-room';
import useIsMobile from '../../hooks/use-is-mobile';
import useTrackPageView from '../../hooks/use-track-page-view';
import Footer from '../../components/Footer';

const minChatWidth = 400;
const maxVideoWidthNoFullscreen = 640;

function calcVideoWidth(fullscreen: boolean) {
  return isMobile()
    ? window.innerWidth - 16 * 2
    : fullscreen
    ? Math.max(window.innerWidth * 0.666, window.innerWidth - minChatWidth)
    : maxVideoWidthNoFullscreen;
}

export default () => {
  const { t } = useTranslation();
  const [room, setRoom] = useState<IRoom>();
  const roomId = useRoomId();
  const processingRemoteOwner = useProcessing();
  const playerRef = useRef<any>(null);
  const history = useTransitionHistory();
  const [fullscreen, setFullscreen] = useLocalStorage('fullscreen', '0');
  const isMobile = useIsMobile();

  const initialVideoWidth = calcVideoWidth(fullscreen === '1');
  const initialVideoHeight = (initialVideoWidth * 9) / 16;

  useTrackPageView();

  const [playerSize, setPlayerSize] = useState({
    width: initialVideoWidth,
    height: initialVideoHeight,
  });

  const [showCopied, setShowCopied] = useState(false);

  const roomLinkRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    roomLinkRef.current?.focus();
  }, []);

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

  useEffect(() => {
    ga('send', 'pageview', window.location.pathname);
  }, []);

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

  async function handleSearchKeyDown(e: React.KeyboardEvent) {
    if (e.keyCode === 13) {
      const value = (e.target as HTMLInputElement).value;
      if (isYouTubeLink(value)) {
        const videoId = getYouTubeVideoId(value);

        if (!videoId) {
          return;
        }

        const room = await createRoom({ id: videoId } as IVideo);
        history.push(`/w/${room.id}`);
      } else {
        history.push('/?q=' + (e.target as HTMLInputElement).value);
      }
    }
  }

  useEffect(() => {
    function handleResize() {
      const width = calcVideoWidth(fullscreen === '1');
      setPlayerSize({ width, height: (width * 9) / 16 });
    }

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, [fullscreen]);

  function handleToggleFullscreen() {
    setFullscreen(fullscreen === '1' ? '0' : '1');
  }

  let remoteOwnerLabel = hasRemote
    ? isMobile
      ? t('Remote is yours')
      : t("You've got the remote")
    : isMobile
    ? t('Remote is theirs')
    : t("They've got the remote");

  function handleCopyRoomLink() {
    roomLinkRef.current?.select();
    document.execCommand('copy');
    setShowCopied(true);
    setTimeout(() => {
      setShowCopied(false);
    }, 1000);
  }

  return (
    <div
      className={cx(styles.wrapper, fullscreen === '1' && styles.fullscreen)}
    >
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
                placeholder={
                  isMobile
                    ? t('Search')
                    : t('Paste YouTube URL, or search for videos...')
                }
                onKeyDown={handleSearchKeyDown}
              />
            </div>
          </div>
        </div>
        {/* <DarkModeButton /> */}
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
                  {isMobile ? t('Get It') : t('Get Remote')}
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
          <div className={styles.copyableInput}>
            <input
              ref={roomLinkRef}
              className={styles.shareLink}
              value={showCopied ? t('Copied!')! : window.location.href}
              onFocus={handleShareFocus}
            />
            <button className={styles.copyButton} onClick={handleCopyRoomLink}>
              <ClipboardIcon />
            </button>
          </div>
          <div className="margin-h-md" />
          <div>
            {t('(share this link with a friend so they can join your room)')}
          </div>
        </div>
        <div className="margin-h-lg" />
        {!isMobile && (
          <div className={styles.actions}>
            <button
              className={styles.iconButton}
              onClick={handleToggleFullscreen}
            >
              {fullscreen === '0' ? <ExpandIcon /> : <CompressIcon />}
              {fullscreen === '0'
                ? t('Enter Fullscreen')
                : t('Exit Fullscreen')}
            </button>
          </div>
        )}
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
              className={styles.iconButton}
            >
              <FireIcon />
              {t('Firestore')}
            </a>
          </div>
        )}
      </main>
      <div className={styles.spacer} />
      <Footer />
    </div>
  );
};
